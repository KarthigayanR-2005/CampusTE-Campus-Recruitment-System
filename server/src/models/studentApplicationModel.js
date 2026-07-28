import databasePool from "../config/database.js";

import {
  createNotification,
} from "./notificationModel.js";

const statusInformation = {
  applied: {
    label: "Applied",
    progress: 15,
  },

  under_review: {
    label: "Under Review",
    progress: 30,
  },

  shortlisted: {
    label: "Shortlisted",
    progress: 50,
  },

  interview: {
    label: "Interview",
    progress: 75,
  },

  selected: {
    label: "Selected",
    progress: 100,
  },

  rejected: {
    label: "Rejected",
    progress: 100,
  },

  withdrawn: {
    label: "Withdrawn",
    progress: 100,
  },
};

function formatDate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function createTimeline(row) {
  const currentStatus =
    row.status || "applied";

  const statusIndex = {
    applied: 0,
    under_review: 1,
    shortlisted: 2,
    interview: 3,
    selected: 4,
    rejected: 4,
    withdrawn: 4,
  };

  const currentIndex =
    statusIndex[currentStatus] ?? 0;

  const finalStage =
    currentStatus === "selected"
      ? "Selected"
      : currentStatus === "rejected"
        ? "Rejected"
        : currentStatus === "withdrawn"
          ? "Withdrawn"
          : "Final Decision";

  const stages = [
    "Application Submitted",
    "Under Review",
    "Shortlisted",
    "Interview",
    finalStage,
  ];

  return stages.map(
    (
      stage,
      index
    ) => ({
      stage,

      completed:
        index <= currentIndex,

      current:
        index === currentIndex,

      date:
        index === 0
          ? formatDate(
              row.applied_at
            )
          : index ===
              currentIndex
            ? formatDate(
                row.updated_at
              )
            : "",
    })
  );
}

function mapApplication(row) {
  const status =
    row.status || "applied";

  const statusData =
    statusInformation[status] ||
    statusInformation.applied;

  return {
    applicationId:
      String(
        row.application_id
      ),

    jobId:
      String(
        row.job_id
      ),

    company: {
      companyName:
        row.company_name || "",

      industry:
        row.industry || "",

      headquarters:
        row.headquarters || "",

      website:
        row.website_url || "",

      recruiterName:
        row.recruiter_name || "",

      recruiterDesignation:
        row.recruiter_designation ||
        "",
    },

    job: {
      jobTitle:
        row.job_title || "",

      department:
        row.department || "",

      employmentType:
        row.employment_type || "",

      experience:
        row.experience_level || "",

      workMode:
        row.work_mode || "",

      city:
        row.city || "",

      country:
        row.country || "",

      salaryMin:
        row.salary_min === null
          ? ""
          : String(
              row.salary_min
            ),

      salaryMax:
        row.salary_max === null
          ? ""
          : String(
              row.salary_max
            ),

      applicationDeadline:
        row.application_deadline
          ? String(
              row.application_deadline
            ).slice(
              0,
              10
            )
          : "",

      jobDescription:
        row.job_description || "",
    },

    resume: {
      resumeId:
        row.resume_id
          ? String(
              row.resume_id
            )
          : null,

      fileName:
        row.resume_file_name || "",
    },

    coverNote:
      row.cover_note || "",

    status,

    statusLabel:
      statusData.label,

    progress:
      statusData.progress,

    appliedAt:
      formatDate(
        row.applied_at
      ),

    updatedAt:
      formatDate(
        row.updated_at
      ),

    withdrawnAt:
      formatDate(
        row.withdrawn_at
      ),

    canWithdraw: [
      "applied",
      "under_review",
      "shortlisted",
      "interview",
    ].includes(status),

    timeline:
      createTimeline(row),
  };
}

const applicationSelectQuery = `
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
    application.withdrawn_at,

    job.job_title,
    job.department,
    job.employment_type,
    job.experience_level,
    job.salary_min,
    job.salary_max,
    job.city,
    job.country,
    job.work_mode,
    job.application_deadline,
    job.job_description,

    company.company_name,
    company.industry,
    company.headquarters,
    company.website_url,
    company.recruiter_name,
    company.recruiter_designation

  FROM student_job_applications
    AS application

  INNER JOIN recruiter_jobs
    AS job
    ON job.job_id =
       application.job_id

  INNER JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       job.recruiter_user_id
`;

export async function findLatestStudentResume(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          resume_id,
          original_file_name

        FROM student_resumes

        WHERE
          user_id = ?

        ORDER BY
          updated_at DESC

        LIMIT 1
      `,
      [
        userId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  return {
    resumeId:
      rows[0].resume_id,

    fileName:
      rows[0]
        .original_file_name ||
      "Student Resume.pdf",
  };
}

export async function findStudentApplicationByJob({
  userId,
  jobId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${applicationSelectQuery}

        WHERE
          application.student_user_id = ?

          AND application.job_id = ?

        LIMIT 1
      `,
      [
        userId,
        jobId,
      ]
    );

  return rows[0]
    ? mapApplication(
        rows[0]
      )
    : null;
}

export async function findStudentApplications(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${applicationSelectQuery}

        WHERE
          application.student_user_id = ?

        ORDER BY
          application.applied_at DESC,
          application.application_id DESC
      `,
      [
        userId,
      ]
    );

  return rows.map(
    mapApplication
  );
}

export async function findStudentApplicationById({
  userId,
  applicationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${applicationSelectQuery}

        WHERE
          application.student_user_id = ?

          AND application.application_id = ?

        LIMIT 1
      `,
      [
        userId,
        applicationId,
      ]
    );

  return rows[0]
    ? mapApplication(
        rows[0]
      )
    : null;
}

export async function createStudentApplication({
  userId,
  jobId,
  resumeId,
  resumeFileName,
  coverNote,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [contextRows] =
      await connection.execute(
        `
          SELECT
            job.job_id,
            job.job_title,
            job.recruiter_user_id,

            student.full_name
              AS student_name,

            student.email
              AS student_email

          FROM recruiter_jobs
            AS job

          INNER JOIN users
            AS student
            ON student.user_id = ?

          WHERE
            job.job_id = ?

          LIMIT 1
        `,
        [
          userId,
          jobId,
        ]
      );

    if (!contextRows[0]) {
      throw new Error(
        "Unable to find the job or Student account."
      );
    }

    const applicationContext =
      contextRows[0];

    const [result] =
      await connection.execute(
        `
          INSERT INTO student_job_applications (
            student_user_id,
            job_id,
            resume_id,
            resume_file_name,
            cover_note,
            status
          )
          VALUES (?, ?, ?, ?, ?, 'applied')
        `,
        [
          userId,
          jobId,
          resumeId,
          resumeFileName,
          coverNote || null,
        ]
      );

    const applicationId =
      result.insertId;

    await createNotification({
      recipientUserId:
        applicationContext
          .recruiter_user_id,

      actorUserId:
        userId,

      category:
        "application",

      notificationType:
        "new_application_received",

      title:
        "New application received",

      message:
        `${applicationContext.student_name} applied for the ${applicationContext.job_title} position.`,

      actionUrl:
        "/recruiter/applicants",

      referenceType:
        "application",

      referenceId:
        applicationId,

      metadata: {
        applicationId:
          String(
            applicationId
          ),

        jobId:
          String(
            applicationContext.job_id
          ),

        jobTitle:
          applicationContext
            .job_title,

        studentUserId:
          String(userId),

        studentName:
          applicationContext
            .student_name,

        studentEmail:
          applicationContext
            .student_email,

        resumeId:
          String(resumeId),

        resumeFileName,

        coverNote:
          coverNote || "",
      },

      connection,
    });

    await connection.commit();

    return findStudentApplicationById({
      userId,
      applicationId,
    });
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function withdrawStudentApplication({
  userId,
  applicationId,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [rows] =
      await connection.execute(
        `
          SELECT
            application.application_id,
            application.status,
            application.job_id,

            job.job_title,
            job.recruiter_user_id,

            student.full_name
              AS student_name,

            student.email
              AS student_email

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

          WHERE
            application.application_id = ?

            AND application.student_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          applicationId,
          userId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return null;
    }

    const applicationContext =
      rows[0];

    const withdrawableStatuses = [
      "applied",
      "under_review",
      "shortlisted",
      "interview",
    ];

    if (
      !withdrawableStatuses.includes(
        applicationContext.status
      )
    ) {
      await connection.rollback();

      return null;
    }

    const [result] =
      await connection.execute(
        `
          UPDATE student_job_applications

          SET
            status = 'withdrawn',

            withdrawn_at =
              CURRENT_TIMESTAMP,

            status_updated_by_user_id = ?,

            status_updated_at =
              CURRENT_TIMESTAMP

          WHERE
            application_id = ?

            AND student_user_id = ?

            AND status IN (
              'applied',
              'under_review',
              'shortlisted',
              'interview'
            )
        `,
        [
          userId,
          applicationId,
          userId,
        ]
      );

    if (
      result.affectedRows === 0
    ) {
      await connection.rollback();

      return null;
    }

    await connection.execute(
      `
        INSERT INTO application_status_history (
          application_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, ?, 'withdrawn', ?)
      `,
      [
        applicationId,
        userId,
        applicationContext.status,
        "Student withdrew the application.",
      ]
    );

    await createNotification({
      recipientUserId:
        applicationContext
          .recruiter_user_id,

      actorUserId:
        userId,

      category:
        "application",

      notificationType:
        "application_withdrawn",

      title:
        "Application withdrawn",

      message:
        `${applicationContext.student_name} withdrew the application for the ${applicationContext.job_title} position.`,

      actionUrl:
        "/recruiter/applicants",

      referenceType:
        "application",

      referenceId:
        applicationId,

      metadata: {
        applicationId:
          String(
            applicationId
          ),

        jobId:
          String(
            applicationContext.job_id
          ),

        jobTitle:
          applicationContext
            .job_title,

        studentUserId:
          String(userId),

        studentName:
          applicationContext
            .student_name,

        studentEmail:
          applicationContext
            .student_email,

        previousStatus:
          applicationContext.status,

        newStatus:
          "withdrawn",
      },

      connection,
    });

    await connection.commit();

    return findStudentApplicationById({
      userId,
      applicationId,
    });
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}