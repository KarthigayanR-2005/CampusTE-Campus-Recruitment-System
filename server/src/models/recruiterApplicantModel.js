import databasePool from "../config/database.js";

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

function parseJsonArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (!value) {
    return [];
  }

  try {
    const parsedValue =
      typeof value === "string"
        ? JSON.parse(value)
        : value;

    return Array.isArray(parsedValue)
      ? parsedValue
      : [];
  } catch {
    return [];
  }
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

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function calculateMatchInformation({
  requiredSkills,
  studentSkills,
  studentCgpa,
  minimumCgpa,
}) {
  const studentSkillSet =
    new Set(
      studentSkills.map(
        normalizeText
      )
    );

  const matchedSkills =
    requiredSkills.filter(
      (skill) =>
        studentSkillSet.has(
          normalizeText(skill)
        )
    );

  const missingSkills =
    requiredSkills.filter(
      (skill) =>
        !studentSkillSet.has(
          normalizeText(skill)
        )
    );

  const skillScore =
    requiredSkills.length === 0
      ? 100
      : Math.round(
          (
            matchedSkills.length /
            requiredSkills.length
          ) * 100
        );

  const numericCgpa =
    Number(studentCgpa);

  const requiredCgpa =
    Number(minimumCgpa || 0);

  const cgpaScore =
    Number.isFinite(numericCgpa)
      ? Math.min(
          100,
          Math.round(
            (numericCgpa / 10) *
              100
          )
        )
      : 0;

  const eligibilityBonus =
    Number.isFinite(numericCgpa) &&
    numericCgpa >= requiredCgpa
      ? 10
      : 0;

  const matchScore =
    Math.min(
      100,
      Math.round(
        skillScore * 0.7 +
          cgpaScore * 0.2 +
          eligibilityBonus
      )
    );

  return {
    matchScore,
    skillScore,
    matchedSkills,
    missingSkills,
    matchedCount:
      matchedSkills.length,
    requiredCount:
      requiredSkills.length,
  };
}

function mapExperience(row) {
  return {
    experienceId: String(
      row.experience_id ||
        row.id ||
        ""
    ),

    company:
      row.company_name ||
      row.company ||
      "",

    role:
      row.role_title ||
      row.role ||
      row.job_title ||
      "",

    employmentType:
      row.employment_type || "",

    location:
      row.location || "",

    startDate:
      formatDate(row.start_date),

    endDate:
      formatDate(row.end_date),

    isCurrent:
      Boolean(
        row.is_current ||
        row.currently_working
      ),

    description:
      row.description || "",
  };
}

function mapStatusHistory(row) {
  const status =
    row.new_status;

  return {
    historyId:
      String(row.history_id),

    previousStatus:
      row.previous_status,

    status,

    statusLabel:
      statusInformation[status]
        ?.label || status,

    note:
      row.note || "",

    changedBy:
      row.changed_by_name ||
      "System",

    createdAt:
      formatDateTime(
        row.created_at
      ),
  };
}

function mapApplicant(
  row,
  {
    experiences = [],
    history = [],
  } = {}
) {
  const status =
    row.status || "applied";

  const skills =
    parseJsonArray(
      row.student_skills
    );

  const requiredSkills =
    parseJsonArray(
      row.required_skills
    );

  const matchInformation =
    calculateMatchInformation({
      requiredSkills,
      studentSkills: skills,
      studentCgpa: row.cgpa,
      minimumCgpa:
        row.minimum_cgpa,
    });

  const location = [
    row.city,
    row.state,
    row.country,
  ]
    .filter(Boolean)
    .join(", ");

  const initialHistory = [
    {
      historyId: "initial",
      previousStatus: null,
      status: "applied",
      statusLabel: "Applied",
      note:
        "Student submitted the application.",
      changedBy:
        row.student_name ||
        "Student",
      createdAt:
        formatDateTime(
          row.applied_at
        ),
    },
  ];

  const completeHistory =
    history.length > 0
      ? [
          ...initialHistory,
          ...history,
        ]
      : initialHistory;

  return {
    applicationId:
      String(row.application_id),

    jobId:
      String(row.job_id),

    studentUserId:
      String(
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

      degree:
        row.degree || "",

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

      location,

      city:
        row.city || "",

      state:
        row.state || "",

      country:
        row.country || "",

      summary:
        row.student_summary || "",

      skills,

      experiences,

      experienceCount:
        Number(
          row.experience_count || 0
        ),
    },

    job: {
      jobTitle:
        row.job_title || "",

      department:
        row.job_department || "",

      employmentType:
        row.employment_type || "",

      experience:
        row.experience_level || "",

      workMode:
        row.work_mode || "",

      city:
        row.job_city || "",

      country:
        row.job_country || "",

      minimumCgpa:
        row.minimum_cgpa === null
          ? null
          : Number(
              row.minimum_cgpa
            ),

      requiredSkills,
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

      available:
        Boolean(row.resume_id),
    },

    coverNote:
      row.cover_note || "",

    status,

    statusLabel:
      statusInformation[status]
        ?.label || status,

    progress:
      statusInformation[status]
        ?.progress || 0,

    match:
      matchInformation,

    appliedAt:
      formatDateTime(
        row.applied_at
      ),

    updatedAt:
      formatDateTime(
        row.updated_at
      ),

    withdrawnAt:
      formatDateTime(
        row.withdrawn_at
      ),

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

    statusHistory:
      completeHistory,

    canUpdateStatus:
      ![
        "selected",
        "rejected",
        "withdrawn",
      ].includes(status),

    isWithdrawn:
      status === "withdrawn",
  };
}

const applicantSelectQuery = `
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
    profile.degree,

    profile.department
      AS student_department,

    profile.cgpa,
    profile.graduation_year,
    profile.city,
    profile.state,
    profile.country,

    NULL
      AS student_summary,

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

    job.minimum_cgpa,
    job.required_skills,

    company.company_name,

    COALESCE(
      (
        SELECT JSON_ARRAYAGG(
          skill.skill_name
        )

        FROM student_skills
          AS skill

        WHERE skill.user_id =
          application.student_user_id
      ),
      JSON_ARRAY()
    ) AS student_skills,

    (
      SELECT COUNT(*)

      FROM student_experiences
        AS experience

      WHERE experience.user_id =
        application.student_user_id
    ) AS experience_count

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

export async function findRecruiterApplicants({
  recruiterUserId,
  jobId = null,
  status = "",
  search = "",
}) {
  const conditions = [
    "job.recruiter_user_id = ?",
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

  if (status) {
    conditions.push(
      "application.status = ?"
    );

    parameters.push(status);
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
        OR profile.department LIKE ?
        OR EXISTS (
          SELECT 1

          FROM student_skills
            AS searched_skill

          WHERE
            searched_skill.user_id =
              application.student_user_id

            AND searched_skill.skill_name
              LIKE ?
        )
      )
    `);

    parameters.push(
      searchValue,
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
        ${applicantSelectQuery}

        WHERE
          ${conditions.join(
            " AND "
          )}

        ORDER BY
          FIELD(
            application.status,
            'applied',
            'under_review',
            'shortlisted',
            'interview',
            'selected',
            'rejected',
            'withdrawn'
          ),

          application.applied_at
            DESC
      `,
      parameters
    );

  return rows.map(
    (row) => mapApplicant(row)
  );
}

export async function findStudentExperiences(
  studentUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT *

        FROM student_experiences

        WHERE user_id = ?

        ORDER BY
          start_date DESC,
          experience_id DESC
      `,
      [studentUserId]
    );

  return rows.map(
    mapExperience
  );
}

export async function findApplicationStatusHistory(
  applicationId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          history.history_id,
          history.previous_status,
          history.new_status,
          history.note,
          history.created_at,

          user.full_name
            AS changed_by_name

        FROM application_status_history
          AS history

        LEFT JOIN users AS user
          ON user.user_id =
             history.changed_by_user_id

        WHERE history.application_id = ?

        ORDER BY
          history.created_at ASC,
          history.history_id ASC
      `,
      [applicationId]
    );

  return rows.map(
    mapStatusHistory
  );
}

export async function findRecruiterApplicantById({
  recruiterUserId,
  applicationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${applicantSelectQuery}

        WHERE
          job.recruiter_user_id = ?
          AND application.application_id = ?

        LIMIT 1
      `,
      [
        recruiterUserId,
        applicationId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  const [
    experiences,
    history,
  ] = await Promise.all([
    findStudentExperiences(
      rows[0].student_user_id
    ),

    findApplicationStatusHistory(
      applicationId
    ),
  ]);

  return mapApplicant(
    rows[0],
    {
      experiences,
      history,
    }
  );
}

export async function updateRecruiterApplicantStatus({
  recruiterUserId,
  applicationId,
  status,
  note,
  interview,
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
      return null;
    }

    const previousStatus =
      rows[0].status;

    await connection.execute(
      `
        UPDATE student_job_applications

        SET
          status = ?,

          interview_date =
            CASE
              WHEN ? = 'interview'
              THEN ?
              ELSE interview_date
            END,

          interview_time =
            CASE
              WHEN ? = 'interview'
              THEN ?
              ELSE interview_time
            END,

          interview_mode =
            CASE
              WHEN ? = 'interview'
              THEN ?
              ELSE interview_mode
            END,

          interviewer_name =
            CASE
              WHEN ? = 'interview'
              THEN ?
              ELSE interviewer_name
            END,

          interview_details =
            CASE
              WHEN ? = 'interview'
              THEN ?
              ELSE interview_details
            END,

          status_updated_by_user_id = ?,

          status_updated_at =
            CURRENT_TIMESTAMP

        WHERE application_id = ?
      `,
      [
        status,

        status,
        interview?.date || null,

        status,
        interview?.time || null,

        status,
        interview?.mode || null,

        status,
        interview?.interviewer ||
          null,

        status,
        interview?.details || null,

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
        previousStatus,
        status,
        note || null,
      ]
    );

    await connection.commit();

    return findRecruiterApplicantById({
      recruiterUserId,
      applicationId,
    });
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function findRecruiterApplicantResume({
  recruiterUserId,
  applicationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          application.resume_id
            AS application_resume_id,

          application.resume_file_name
            AS application_resume_file_name,

          resume.*

        FROM student_job_applications
          AS application

        INNER JOIN recruiter_jobs
          AS job
          ON job.job_id =
             application.job_id

        LEFT JOIN student_resumes
          AS resume
          ON resume.resume_id =
             application.resume_id

        WHERE
          application.application_id = ?
          AND job.recruiter_user_id = ?

        LIMIT 1
      `,
      [
        applicationId,
        recruiterUserId,
      ]
    );

  return rows[0] || null;
}