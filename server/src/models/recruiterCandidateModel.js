import databasePool from "../config/database.js";

import {
  createNotification,
} from "./notificationModel.js";

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

    return Array.isArray(
      parsedValue
    )
      ? parsedValue
      : [];
  } catch {
    return [];
  }
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

  return String(value).slice(
    0,
    10
  );
}

function calculateProfileScore({
  row,
  skills,
}) {
  let score = 0;

  if (row.full_name) {
    score += 5;
  }

  if (row.email) {
    score += 5;
  }

  if (row.phone) {
    score += 5;
  }

  if (row.institution) {
    score += 8;
  }

  if (row.degree) {
    score += 6;
  }

  if (row.department) {
    score += 6;
  }

  if (
    row.cgpa !== null &&
    row.cgpa !== undefined
  ) {
    score += 5;
  }

  if (row.graduation_year) {
    score += 5;
  }

  if (row.latest_resume_id) {
    score += 20;
  }

  score += Math.min(
    skills.length * 4,
    16
  );

  score += Math.min(
    Number(
      row.experience_count || 0
    ) * 4,
    8
  );

  score += Math.min(
    Number(
      row.project_count || 0
    ) * 4,
    8
  );

  score += Math.min(
    Number(
      row.certification_count || 0
    ) * 4,
    8
  );

  return Math.min(
    score,
    100
  );
}

function mapCandidate(row) {
  const skills =
    parseJsonArray(
      row.student_skills
    );

  const location = [
    row.city,
    row.state,
    row.country,
  ]
    .filter(Boolean)
    .join(", ");

  const profileScore =
    calculateProfileScore({
      row,
      skills,
    });

  const degreeParts = [
    row.degree,
    row.department,
  ].filter(Boolean);

  return {
    studentUserId:
      String(
        row.student_user_id
      ),

    fullName:
      row.full_name || "",

    email:
      row.email || "",

    phone:
      row.phone || "",

    institution:
      row.institution || "",

    degree:
      row.degree || "",

    department:
      row.department || "",

    headline:
      degreeParts.length > 0
        ? degreeParts.join(" · ")
        : "Student Candidate",

    cgpa:
      row.cgpa === null ||
      row.cgpa === undefined
        ? null
        : Number(
            row.cgpa
          ),

    graduationYear:
      row.graduation_year ===
        null ||
      row.graduation_year ===
        undefined
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

    skills,

    experienceCount:
      Number(
        row.experience_count ||
        0
      ),

    projectCount:
      Number(
        row.project_count ||
        0
      ),

    certificationCount:
      Number(
        row.certification_count ||
        0
      ),

    resume: {
      resumeId:
        row.latest_resume_id
          ? String(
              row.latest_resume_id
            )
          : null,

      fileName:
        row.latest_resume_name ||
        "",

      available:
        Boolean(
          row.latest_resume_id
        ),
    },

    profileScore,

    profileStatus:
      row.latest_resume_id
        ? "Ready"
        : "Resume Missing",

    saved:
      Boolean(
        row.is_saved
      ),
  };
}

function mapExperience(row) {
  return {
    experienceId:
      String(
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
      row.employment_type ||
      "",

    location:
      row.location || "",

    startDate:
      formatDate(
        row.start_date
      ),

    endDate:
      formatDate(
        row.end_date
      ),

    isCurrent:
      Boolean(
        row.is_current ||
        row.currently_working
      ),

    description:
      row.description || "",
  };
}

function mapProject(row) {
  return {
    projectId:
      String(
        row.project_id ||
        row.id ||
        ""
      ),

    title:
      row.project_title ||
      row.title ||
      row.name ||
      "Student Project",

    description:
      row.description || "",

    technologies:
      parseJsonArray(
        row.technologies ||
        row.technology_stack ||
        row.tech_stack
      ),

    projectUrl:
      row.project_url ||
      row.url ||
      row.github_url ||
      "",

    startDate:
      formatDate(
        row.start_date
      ),

    endDate:
      formatDate(
        row.end_date
      ),
  };
}

function mapCertification(row) {
  return {
    certificationId:
      String(
        row.certification_id ||
        row.id ||
        ""
      ),

    name:
      row.certification_name ||
      row.name ||
      row.title ||
      "Certification",

    issuer:
      row.issuing_organization ||
      row.issuer ||
      row.organization ||
      "",

    issueDate:
      formatDate(
        row.issue_date
      ),

    expiryDate:
      formatDate(
        row.expiry_date
      ),

    credentialUrl:
      row.credential_url ||
      row.certificate_url ||
      row.url ||
      "",
  };
}

const candidateSelectQuery = `
  SELECT
    student.user_id
      AS student_user_id,

    student.full_name,
    student.email,

    profile.phone,
    profile.institution,
    profile.degree,
    profile.department,
    profile.cgpa,
    profile.graduation_year,
    profile.city,
    profile.state,
    profile.country,

    COALESCE(
      (
        SELECT
          JSON_ARRAYAGG(
            skill.skill_name
          )

        FROM student_skills
          AS skill

        WHERE
          skill.user_id =
            student.user_id
      ),
      JSON_ARRAY()
    ) AS student_skills,

    (
      SELECT
        COUNT(*)

      FROM student_experiences
        AS experience

      WHERE
        experience.user_id =
          student.user_id
    ) AS experience_count,

    (
      SELECT
        COUNT(*)

      FROM student_projects
        AS project

      WHERE
        project.user_id =
          student.user_id
    ) AS project_count,

    (
      SELECT
        COUNT(*)

      FROM student_certifications
        AS certification

      WHERE
        certification.user_id =
          student.user_id
    ) AS certification_count,

    (
      SELECT
        resume.resume_id

      FROM student_resumes
        AS resume

      WHERE
        resume.user_id =
          student.user_id

      ORDER BY
        resume.updated_at DESC,
        resume.resume_id DESC

      LIMIT 1
    ) AS latest_resume_id,

    (
      SELECT
        resume.original_file_name

      FROM student_resumes
        AS resume

      WHERE
        resume.user_id =
          student.user_id

      ORDER BY
        resume.updated_at DESC,
        resume.resume_id DESC

      LIMIT 1
    ) AS latest_resume_name,

    EXISTS (
      SELECT
        1

      FROM recruiter_saved_candidates
        AS saved

      WHERE
        saved.recruiter_user_id = ?

        AND saved.student_user_id =
          student.user_id
    ) AS is_saved

  FROM users
    AS student

  LEFT JOIN student_profiles
    AS profile
    ON profile.user_id =
       student.user_id

  WHERE
    student.role = 'student'
`;

export async function findRecruiterCandidates({
  recruiterUserId,
  search = "",
  department = "",
  skill = "",
  minimumCgpa = 0,
  graduationYear = null,
}) {
  const conditions = [];

  const parameters = [
    recruiterUserId,
  ];

  if (search) {
    const searchValue =
      `%${search}%`;

    conditions.push(`
      (
        student.full_name LIKE ?
        OR student.email LIKE ?
        OR profile.institution LIKE ?
        OR profile.degree LIKE ?
        OR profile.department LIKE ?

        OR EXISTS (
          SELECT
            1

          FROM student_skills
            AS searched_skill

          WHERE
            searched_skill.user_id =
              student.user_id

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

  if (department) {
    conditions.push(
      "profile.department = ?"
    );

    parameters.push(
      department
    );
  }

  if (skill) {
    conditions.push(`
      EXISTS (
        SELECT
          1

        FROM student_skills
          AS filtered_skill

        WHERE
          filtered_skill.user_id =
            student.user_id

          AND filtered_skill.skill_name
            LIKE ?
      )
    `);

    parameters.push(
      `%${skill}%`
    );
  }

  if (
    Number(
      minimumCgpa
    ) > 0
  ) {
    conditions.push(
      "profile.cgpa >= ?"
    );

    parameters.push(
      Number(
        minimumCgpa
      )
    );
  }

  if (graduationYear) {
    conditions.push(
      "profile.graduation_year = ?"
    );

    parameters.push(
      graduationYear
    );
  }

  const additionalConditions =
    conditions.length > 0
      ? `AND ${conditions.join(
          " AND "
        )}`
      : "";

  const [rows] =
    await databasePool.execute(
      `
        ${candidateSelectQuery}

        ${additionalConditions}

        ORDER BY
          profile.cgpa DESC,
          student.full_name ASC
      `,
      parameters
    );

  return rows
    .map(
      mapCandidate
    )
    .sort(
      (
        first,
        second
      ) =>
        second.profileScore -
        first.profileScore
    );
}

export async function findRecruiterCandidateById({
  recruiterUserId,
  studentUserId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${candidateSelectQuery}

        AND student.user_id = ?

        LIMIT 1
      `,
      [
        recruiterUserId,
        studentUserId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  const [
    skillRows,
    experienceRows,
    projectRows,
    certificationRows,
  ] = await Promise.all([
    databasePool.execute(
      `
        SELECT *

        FROM student_skills

        WHERE
          user_id = ?

        ORDER BY
          skill_name ASC
      `,
      [
        studentUserId,
      ]
    ),

    databasePool.execute(
      `
        SELECT *

        FROM student_experiences

        WHERE
          user_id = ?

        ORDER BY
          start_date DESC,
          experience_id DESC
      `,
      [
        studentUserId,
      ]
    ),

    databasePool.execute(
      `
        SELECT *

        FROM student_projects

        WHERE
          user_id = ?

        ORDER BY
          project_id DESC
      `,
      [
        studentUserId,
      ]
    ),

    databasePool.execute(
      `
        SELECT *

        FROM student_certifications

        WHERE
          user_id = ?

        ORDER BY
          certification_id DESC
      `,
      [
        studentUserId,
      ]
    ),
  ]);

  const candidate =
    mapCandidate(
      rows[0]
    );

  return {
    ...candidate,

    skills:
      skillRows[0]
        .map(
          (row) =>
            row.skill_name ||
            row.name ||
            ""
        )
        .filter(Boolean),

    experiences:
      experienceRows[0].map(
        mapExperience
      ),

    projects:
      projectRows[0].map(
        mapProject
      ),

    certifications:
      certificationRows[0].map(
        mapCertification
      ),
  };
}

export async function saveRecruiterCandidate({
  recruiterUserId,
  studentUserId,
}) {
  const [studentRows] =
    await databasePool.execute(
      `
        SELECT
          user_id

        FROM users

        WHERE
          user_id = ?

          AND role = 'student'

        LIMIT 1
      `,
      [
        studentUserId,
      ]
    );

  if (!studentRows[0]) {
    return false;
  }

  await databasePool.execute(
    `
      INSERT INTO recruiter_saved_candidates (
        recruiter_user_id,
        student_user_id
      )
      VALUES (?, ?)

      ON DUPLICATE KEY UPDATE
        created_at = created_at
    `,
    [
      recruiterUserId,
      studentUserId,
    ]
  );

  return true;
}

export async function removeRecruiterSavedCandidate({
  recruiterUserId,
  studentUserId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM recruiter_saved_candidates

        WHERE
          recruiter_user_id = ?

          AND student_user_id = ?
      `,
      [
        recruiterUserId,
        studentUserId,
      ]
    );

  return (
    result.affectedRows > 0
  );
}

/*
|--------------------------------------------------------------------------
| Recruiter published/active job options
|--------------------------------------------------------------------------
*/

export async function findRecruiterCandidateJobOptions(
  recruiterUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          job_id,
          job_title,
          department,
          city,
          country,
          work_mode,
          status,
          application_deadline

        FROM recruiter_jobs

        WHERE
          recruiter_user_id = ?

          AND status IN (
            'active',
            'published'
          )

          AND application_deadline
            IS NOT NULL

          AND application_deadline
            >= CURRENT_DATE

        ORDER BY
          created_at DESC,
          job_id DESC
      `,
      [
        recruiterUserId,
      ]
    );

  return rows.map(
    (row) => ({
      jobId:
        String(
          row.job_id
        ),

      jobTitle:
        row.job_title || "",

      department:
        row.department || "",

      status:
        row.status || "",

      applicationDeadline:
        row.application_deadline
          ? formatDate(
              row.application_deadline
            )
          : "",

      location:
        row.work_mode ===
        "Remote"
          ? `Remote · ${
              row.country || ""
            }`
          : [
              row.city,
              row.country,
            ]
              .filter(Boolean)
              .join(", "),
    })
  );
}

/*
|--------------------------------------------------------------------------
| Invite candidate
|--------------------------------------------------------------------------
*/

export async function inviteRecruiterCandidate({
  recruiterUserId,
  studentUserId,
  jobId,
  message,
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
            student.user_id
              AS student_user_id,

            student.full_name
              AS student_name,

            student.email
              AS student_email,

            job.job_id,
            job.job_title,
            job.status,
            job.application_deadline,

            company.company_name

          FROM users
            AS student

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id = ?

          LEFT JOIN recruiter_company_profiles
            AS company
            ON company.user_id =
               job.recruiter_user_id

          WHERE
            student.user_id = ?

            AND student.role =
              'student'

            AND job.recruiter_user_id = ?

            AND job.status IN (
              'active',
              'published'
            )

            AND job.application_deadline
              IS NOT NULL

            AND job.application_deadline
              >= CURRENT_DATE

          LIMIT 1
        `,
        [
          jobId,
          studentUserId,
          recruiterUserId,
        ]
      );

    if (!rows[0]) {
      await connection
        .rollback();

      return null;
    }

    const context =
      rows[0];

    await connection.execute(
      `
        INSERT INTO recruiter_candidate_invitations (
          recruiter_user_id,
          student_user_id,
          job_id,
          message,
          status
        )
        VALUES (?, ?, ?, ?, 'sent')

        ON DUPLICATE KEY UPDATE
          message =
            VALUES(message),

          status =
            'sent',

          invited_at =
            CURRENT_TIMESTAMP,

          responded_at =
            NULL
      `,
      [
        recruiterUserId,
        studentUserId,
        jobId,
        message || null,
      ]
    );

    const companyName =
      context.company_name ||
      "A recruiter";

    await createNotification({
      recipientUserId:
        studentUserId,

      actorUserId:
        recruiterUserId,

      category:
        "job",

      notificationType:
        "recruiter_job_invitation",

      title:
        "Recruiter invitation received",

      message:
        `${companyName} invited you to explore the ${context.job_title} position.`,

      actionUrl:
        "/student/jobs",

      referenceType:
        "job",

      referenceId:
        jobId,

      metadata: {
        jobId:
          String(
            jobId
          ),

        jobTitle:
          context.job_title,

        companyName,

        recruiterMessage:
          message || "",

        applicationDeadline:
          formatDate(
            context.application_deadline
          ),
      },

      connection,
    });

    await connection.commit();

    return {
      studentUserId:
        String(
          studentUserId
        ),

      studentName:
        context.student_name,

      studentEmail:
        context.student_email,

      jobId:
        String(
          jobId
        ),

      jobTitle:
        context.job_title,

      companyName,

      message:
        message || "",

      status:
        "sent",

      applicationDeadline:
        formatDate(
          context.application_deadline
        ),
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function findRecruiterCandidateResume(
  studentUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT *

        FROM student_resumes

        WHERE
          user_id = ?

        ORDER BY
          updated_at DESC,
          resume_id DESC

        LIMIT 1
      `,
      [
        studentUserId,
      ]
    );

  return rows[0] || null;
}