import databasePool from "../config/database.js";

function formatDate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value).slice(0, 10);
}

function formatDateTime(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function mapInterview(row) {
  const studentLocation = [
    row.student_city,
    row.student_state,
    row.student_country,
  ]
    .filter(Boolean)
    .join(", ");

  const jobLocation =
    row.work_mode === "Remote"
      ? `Remote · ${row.job_country || ""}`
      : [
          row.job_city,
          row.job_country,
        ]
          .filter(Boolean)
          .join(", ");

  return {
    applicationId: String(
      row.application_id
    ),

    jobId: String(row.job_id),

    studentUserId: String(
      row.student_user_id
    ),

    student: {
      fullName:
        row.student_name || "",

      email:
        row.student_email || "",

      phone:
        row.phone || "",

      institution:
        row.institution || "",

      department:
        row.student_department ||
        "",

      cgpa:
        row.cgpa === null
          ? null
          : Number(row.cgpa),

      graduationYear:
        row.graduation_year ===
        null
          ? null
          : Number(
              row.graduation_year
            ),

      location: studentLocation,
    },

    job: {
      jobTitle:
        row.job_title || "",

      department:
        row.job_department || "",

      employmentType:
        row.employment_type || "",

      workMode:
        row.work_mode || "",

      location: jobLocation,
    },

    company: {
      companyName:
        row.company_name || "",
    },

    resume: {
      resumeId:
        row.resume_id
          ? String(row.resume_id)
          : null,

      fileName:
        row.resume_file_name || "",
    },

    coverNote:
      row.cover_note || "",

    applicationStatus:
      row.status || "",

    interview: {
      date: formatDate(
        row.interview_date
      ),

      time:
        row.interview_time
          ? String(
              row.interview_time
            ).slice(0, 5)
          : "",

      mode:
        row.interview_mode || "",

      interviewer:
        row.interviewer_name ||
        "",

      details:
        row.interview_details ||
        "",
    },

    appliedAt:
      formatDateTime(
        row.applied_at
      ),

    updatedAt:
      formatDateTime(
        row.updated_at
      ),
  };
}

const interviewSelectQuery = `
  SELECT
    application.application_id,
    application.student_user_id,
    application.job_id,
    application.resume_id,
    application.resume_file_name,
    application.cover_note,
    application.status,
    application.applied_at,
    application.updated_at,
    application.interview_date,
    application.interview_time,
    application.interview_mode,
    application.interviewer_name,
    application.interview_details,

    student.full_name
      AS student_name,

    student.email
      AS student_email,

    profile.phone,
    profile.institution,

    profile.department
      AS student_department,

    profile.cgpa,
    profile.graduation_year,

    profile.city
      AS student_city,

    profile.state
      AS student_state,

    profile.country
      AS student_country,

    job.job_title,

    job.department
      AS job_department,

    job.employment_type,
    job.work_mode,

    job.city
      AS job_city,

    job.country
      AS job_country,

    company.company_name

  FROM student_job_applications
    AS application

  INNER JOIN recruiter_jobs
    AS job
    ON job.job_id =
       application.job_id

  INNER JOIN users
    AS student
    ON student.user_id =
       application.student_user_id

  LEFT JOIN student_profiles
    AS profile
    ON profile.user_id =
       application.student_user_id

  LEFT JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       job.recruiter_user_id
`;

export async function findRecruiterInterviews({
  recruiterUserId,
  search = "",
  jobId = null,
}) {
  const conditions = [
    "job.recruiter_user_id = ?",
    "application.status = 'interview'",
    "application.interview_date IS NOT NULL",
  ];

  const parameters = [
    recruiterUserId,
  ];

  if (jobId) {
    conditions.push(
      "application.job_id = ?"
    );

    parameters.push(jobId);
  }

  if (search) {
    const searchValue =
      `%${search}%`;

    conditions.push(`
      (
        student.full_name LIKE ?
        OR student.email LIKE ?
        OR job.job_title LIKE ?
        OR profile.institution LIKE ?
        OR application.interviewer_name LIKE ?
      )
    `);

    parameters.push(
      searchValue,
      searchValue,
      searchValue,
      searchValue,
      searchValue
    );
  }

  const [rows] =
    await databasePool.execute(
      `
        ${interviewSelectQuery}

        WHERE
          ${conditions.join(
            " AND "
          )}

        ORDER BY
          application.interview_date ASC,
          application.interview_time ASC,
          application.application_id ASC
      `,
      parameters
    );

  return rows.map(
    mapInterview
  );
}

export async function findRecruiterInterviewById({
  recruiterUserId,
  applicationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${interviewSelectQuery}

        WHERE
          job.recruiter_user_id = ?
          AND application.application_id = ?
          AND application.status = 'interview'
          AND application.interview_date IS NOT NULL

        LIMIT 1
      `,
      [
        recruiterUserId,
        applicationId,
      ]
    );

  return rows[0]
    ? mapInterview(rows[0])
    : null;
}

export async function rescheduleRecruiterInterview({
  recruiterUserId,
  applicationId,
  interviewDate,
  interviewTime,
  interviewMode,
  interviewerName,
  interviewDetails,
}) {
  const connection =
    await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] =
      await connection.execute(
        `
          SELECT
            application.status

          FROM student_job_applications
            AS application

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id =
               application.job_id

          WHERE
            application.application_id = ?
            AND job.recruiter_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          applicationId,
          recruiterUserId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result: "not_found",
      };
    }

    if (
      rows[0].status !==
      "interview"
    ) {
      await connection.rollback();

      return {
        result: "invalid_status",
      };
    }

    await connection.execute(
      `
        UPDATE student_job_applications

        SET
          interview_date = ?,
          interview_time = ?,
          interview_mode = ?,
          interviewer_name = ?,
          interview_details = ?,
          status_updated_by_user_id = ?,
          status_updated_at =
            CURRENT_TIMESTAMP

        WHERE application_id = ?
      `,
      [
        interviewDate,
        interviewTime,
        interviewMode,
        interviewerName,
        interviewDetails || null,
        recruiterUserId,
        applicationId,
      ]
    );

    await connection.execute(
      `
        INSERT INTO application_status_history (
          application_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        applicationId,
        recruiterUserId,
        "interview",
        "interview",
        `Interview rescheduled to ${interviewDate} at ${interviewTime}.`,
      ]
    );

    await connection.commit();

    const interview =
      await findRecruiterInterviewById({
        recruiterUserId,
        applicationId,
      });

    return {
      result: "success",
      interview,
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function cancelRecruiterInterview({
  recruiterUserId,
  applicationId,
  cancellationReason,
}) {
  const connection =
    await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] =
      await connection.execute(
        `
          SELECT
            application.status,
            application.interview_date,
            application.interview_time

          FROM student_job_applications
            AS application

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id =
               application.job_id

          WHERE
            application.application_id = ?
            AND job.recruiter_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          applicationId,
          recruiterUserId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result: "not_found",
      };
    }

    if (
      rows[0].status !==
      "interview"
    ) {
      await connection.rollback();

      return {
        result: "invalid_status",
      };
    }

    await connection.execute(
      `
        UPDATE student_job_applications

        SET
          status = 'shortlisted',
          interview_date = NULL,
          interview_time = NULL,
          interview_mode = NULL,
          interviewer_name = NULL,
          interview_details = NULL,
          status_updated_by_user_id = ?,
          status_updated_at =
            CURRENT_TIMESTAMP

        WHERE application_id = ?
      `,
      [
        recruiterUserId,
        applicationId,
      ]
    );

    await connection.execute(
      `
        INSERT INTO application_status_history (
          application_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, ?, ?, ?)
      `,
      [
        applicationId,
        recruiterUserId,
        "interview",
        "shortlisted",
        `Interview cancelled. Reason: ${cancellationReason}`,
      ]
    );

    await connection.commit();

    return {
      result: "success",
    };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}