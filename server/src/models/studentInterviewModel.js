import databasePool from "../config/database.js";

function formatDate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value
      .toISOString()
      .slice(0, 10);
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

function mapStudentInterview(row) {
  const jobLocation =
    row.work_mode === "Remote"
      ? [
          "Remote",
          row.job_country,
        ]
          .filter(Boolean)
          .join(" · ")
      : [
          row.job_city,
          row.job_country,
        ]
          .filter(Boolean)
          .join(", ");

  return {
    applicationId:
      String(
        row.application_id
      ),

    jobId:
      String(row.job_id),

    recruiterUserId:
      String(
        row.recruiter_user_id
      ),

    applicationStatus:
      row.status || "",

    company: {
      companyName:
        row.company_name || "",
    },

    job: {
      jobTitle:
        row.job_title || "",

      department:
        row.job_department || "",

      employmentType:
        row.employment_type || "",

      experienceLevel:
        row.experience_level || "",

      workMode:
        row.work_mode || "",

      city:
        row.job_city || "",

      country:
        row.job_country || "",

      location:
        jobLocation,
    },

    interview: {
      date:
        formatDate(
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

    statusUpdatedAt:
      formatDateTime(
        row.status_updated_at
      ),
  };
}

const studentInterviewSelectQuery = `
  SELECT
    application.application_id,
    application.student_user_id,
    application.job_id,
    application.status,
    application.applied_at,
    application.updated_at,
    application.status_updated_at,
    application.interview_date,
    application.interview_time,
    application.interview_mode,
    application.interviewer_name,
    application.interview_details,

    job.recruiter_user_id,
    job.job_title,

    job.department
      AS job_department,

    job.employment_type,
    job.experience_level,
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

  LEFT JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       job.recruiter_user_id
`;

export async function findStudentInterviews({
  studentUserId,
  search = "",
  jobId = null,
}) {
  const conditions = [
    "application.student_user_id = ?",
    "application.status = 'interview'",
    "application.interview_date IS NOT NULL",
  ];

  const parameters = [
    studentUserId,
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
        job.job_title LIKE ?
        OR job.department LIKE ?
        OR company.company_name LIKE ?
        OR application.interviewer_name LIKE ?
        OR application.interview_mode LIKE ?
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
        ${studentInterviewSelectQuery}

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
    mapStudentInterview
  );
}

export async function findStudentInterviewById({
  studentUserId,
  applicationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${studentInterviewSelectQuery}

        WHERE
          application.student_user_id = ?
          AND application.application_id = ?
          AND application.status = 'interview'
          AND application.interview_date IS NOT NULL

        LIMIT 1
      `,
      [
        studentUserId,
        applicationId,
      ]
    );

  return rows[0]
    ? mapStudentInterview(
        rows[0]
      )
    : null;
}