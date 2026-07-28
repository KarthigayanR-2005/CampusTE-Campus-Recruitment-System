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

    return Array.isArray(parsedValue)
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

function mapPublishedJob(row) {
  return {
    jobId:
      String(row.job_id),

    company: {
      companyProfileId:
        row.company_profile_id
          ? String(
              row.company_profile_id
            )
          : null,

      companyName:
        row.company_name || "",

      industry:
        row.industry || "",

      website:
        row.website_url || "",

      headquarters:
        row.headquarters || "",

      recruiterName:
        row.recruiter_name || "",

      recruiterDesignation:
        row.recruiter_designation ||
        "",
    },

    jobTitle:
      row.job_title || "",

    department:
      row.department || "",

    employmentType:
      row.employment_type ||
      "Full-time",

    experience:
      row.experience_level ||
      "Fresher",

    salaryMin:
      row.salary_min === null
        ? ""
        : String(row.salary_min),

    salaryMax:
      row.salary_max === null
        ? ""
        : String(row.salary_max),

    city:
      row.city || "",

    country:
      row.country || "India",

    workMode:
      row.work_mode || "On-site",

    openings:
      String(row.openings || 1),

    applicationDeadline:
      formatDate(
        row.application_deadline
      ),

    minimumCgpa:
      String(
        row.minimum_cgpa ?? 0
      ),

    requiredSkills:
      parseJsonArray(
        row.required_skills
      ),

    preferredSkills:
      parseJsonArray(
        row.preferred_skills
      ),

    eligibleBranches:
      parseJsonArray(
        row.eligible_branches
      ),

    eligibleGraduationYears:
      parseJsonArray(
        row.eligible_graduation_years
      ).map(Number),

    jobDescription:
      row.job_description || "",

    responsibilities:
      row.responsibilities || "",

    requirements:
      row.candidate_requirements || "",

    publishedAt:
      formatDateTime(
        row.published_at
      ),

    updatedAt:
      formatDateTime(
        row.updated_at
      ),
  };
}

function mapJobInvitation(row) {
  const applicationDeadline =
    formatDate(
      row.application_deadline
    );

  const today =
    new Date()
      .toISOString()
      .slice(0, 10);

  const validJobStatuses = [
    "active",
    "published",
  ];

  const jobAvailable =
    validJobStatuses.includes(
      row.job_status
    ) &&
    Boolean(
      applicationDeadline
    ) &&
    applicationDeadline >= today;

  return {
    invitationId:
      String(
        row.invitation_id
      ),

    recruiterUserId:
      String(
        row.recruiter_user_id
      ),

    studentUserId:
      String(
        row.student_user_id
      ),

    status:
      row.invitation_status ||
      "sent",

    message:
      row.invitation_message ||
      "",

    invitedAt:
      formatDateTime(
        row.invited_at
      ),

    respondedAt:
      formatDateTime(
        row.responded_at
      ),

    updatedAt:
      formatDateTime(
        row.invitation_updated_at
      ),

    canRespond:
      row.invitation_status ===
      "sent",

    jobAvailable,

    recruiter: {
      fullName:
        row.recruiter_full_name ||
        row.recruiter_name ||
        "",

      email:
        row.recruiter_email || "",

      designation:
        row.recruiter_designation ||
        "",
    },

    company: {
      companyName:
        row.company_name || "",

      industry:
        row.industry || "",

      website:
        row.website_url || "",

      headquarters:
        row.headquarters || "",
    },

    job: {
      jobId:
        String(row.job_id),

      jobTitle:
        row.job_title || "",

      department:
        row.department || "",

      employmentType:
        row.employment_type || "",

      experience:
        row.experience_level || "",

      city:
        row.city || "",

      country:
        row.country || "",

      workMode:
        row.work_mode || "",

      applicationDeadline,

      status:
        row.job_status || "",
    },
  };
}

const publishedJobSelect = `
  SELECT
    job.job_id,
    job.job_title,
    job.department,
    job.employment_type,
    job.experience_level,
    job.salary_min,
    job.salary_max,
    job.city,
    job.country,
    job.work_mode,
    job.openings,
    job.application_deadline,
    job.minimum_cgpa,
    job.required_skills,
    job.preferred_skills,
    job.eligible_branches,
    job.eligible_graduation_years,
    job.job_description,
    job.responsibilities,
    job.candidate_requirements,
    job.published_at,
    job.updated_at,

    company.company_profile_id,
    company.company_name,
    company.industry,
    company.website_url,
    company.headquarters,
    company.recruiter_name,
    company.recruiter_designation

  FROM recruiter_jobs AS job

  INNER JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       job.recruiter_user_id

  WHERE
    job.status IN (
      'active',
      'published'
    )

    AND job.application_deadline
        IS NOT NULL

    AND job.application_deadline
        >= CURRENT_DATE
`;

const invitationSelectQuery = `
  SELECT
    invitation.invitation_id,
    invitation.recruiter_user_id,
    invitation.student_user_id,
    invitation.job_id,

    invitation.message
      AS invitation_message,

    invitation.status
      AS invitation_status,

    invitation.invited_at,
    invitation.responded_at,

    invitation.updated_at
      AS invitation_updated_at,

    recruiter.full_name
      AS recruiter_full_name,

    recruiter.email
      AS recruiter_email,

    job.job_title,
    job.department,
    job.employment_type,
    job.experience_level,
    job.city,
    job.country,
    job.work_mode,
    job.application_deadline,

    job.status
      AS job_status,

    company.company_name,
    company.industry,
    company.website_url,
    company.headquarters,
    company.recruiter_name,
    company.recruiter_designation

  FROM recruiter_candidate_invitations
    AS invitation

  INNER JOIN users
    AS recruiter
    ON recruiter.user_id =
       invitation.recruiter_user_id

  INNER JOIN recruiter_jobs
    AS job
    ON job.job_id =
       invitation.job_id

  LEFT JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       invitation.recruiter_user_id
`;

export async function findPublishedJobs() {
  const [rows] =
    await databasePool.execute(
      `
        ${publishedJobSelect}

        ORDER BY
          job.published_at DESC,
          job.updated_at DESC
      `
    );

  return rows.map(
    mapPublishedJob
  );
}

export async function findPublishedJobById(
  jobId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${publishedJobSelect}

        AND job.job_id = ?

        LIMIT 1
      `,
      [jobId]
    );

  return rows[0]
    ? mapPublishedJob(
        rows[0]
      )
    : null;
}

export async function findStudentEligibilityProfile(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          user.user_id,
          user.full_name,
          user.email,

          profile.department,
          profile.cgpa,
          profile.graduation_year

        FROM users AS user

        LEFT JOIN student_profiles
          AS profile
          ON profile.user_id =
             user.user_id

        WHERE
          user.user_id = ?

        LIMIT 1
      `,
      [userId]
    );

  if (!rows[0]) {
    return null;
  }

  return {
    userId:
      String(
        rows[0].user_id
      ),

    fullName:
      rows[0].full_name || "",

    email:
      rows[0].email || "",

    department:
      rows[0].department || "",

    cgpa:
      rows[0].cgpa === null
        ? null
        : Number(
            rows[0].cgpa
          ),

    graduationYear:
      rows[0].graduation_year ===
      null
        ? null
        : Number(
            rows[0].graduation_year
          ),
  };
}

export async function findStudentSkillNames(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT skill_name

        FROM student_skills

        WHERE user_id = ?

        ORDER BY skill_name ASC
      `,
      [userId]
    );

  return rows
    .map(
      (row) =>
        String(
          row.skill_name || ""
        ).trim()
    )
    .filter(Boolean);
}

export async function findStudentJobInvitations(
  studentUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${invitationSelectQuery}

        WHERE
          invitation.student_user_id = ?

        ORDER BY
          FIELD(
            invitation.status,
            'sent',
            'accepted',
            'declined'
          ),

          invitation.invited_at DESC,
          invitation.invitation_id DESC
      `,
      [studentUserId]
    );

  return rows.map(
    mapJobInvitation
  );
}

export async function findStudentJobInvitationById({
  studentUserId,
  invitationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${invitationSelectQuery}

        WHERE
          invitation.student_user_id = ?

          AND invitation.invitation_id = ?

        LIMIT 1
      `,
      [
        studentUserId,
        invitationId,
      ]
    );

  return rows[0]
    ? mapJobInvitation(
        rows[0]
      )
    : null;
}

export async function respondToStudentJobInvitation({
  studentUserId,
  invitationId,
  responseStatus,
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
            invitation.invitation_id,
            invitation.recruiter_user_id,
            invitation.student_user_id,
            invitation.job_id,
            invitation.status,

            student.full_name
              AS student_name,

            student.email
              AS student_email,

            job.job_title,

            company.company_name

          FROM recruiter_candidate_invitations
            AS invitation

          INNER JOIN users
            AS student
            ON student.user_id =
               invitation.student_user_id

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id =
               invitation.job_id

          LEFT JOIN recruiter_company_profiles
            AS company
            ON company.user_id =
               invitation.recruiter_user_id

          WHERE
            invitation.invitation_id = ?

            AND invitation.student_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          invitationId,
          studentUserId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    const invitationContext =
      rows[0];

    if (
      invitationContext.status !==
      "sent"
    ) {
      await connection.rollback();

      return {
        result:
          "already_responded",

        status:
          invitationContext.status,
      };
    }

    await connection.execute(
      `
        UPDATE recruiter_candidate_invitations

        SET
          status = ?,

          responded_at =
            CURRENT_TIMESTAMP

        WHERE
          invitation_id = ?

          AND student_user_id = ?
      `,
      [
        responseStatus,
        invitationId,
        studentUserId,
      ]
    );

    const accepted =
      responseStatus ===
      "accepted";

    const companyName =
      invitationContext.company_name ||
      "your company";

    await createNotification({
      recipientUserId:
        invitationContext
          .recruiter_user_id,

      actorUserId:
        studentUserId,

      category:
        "job",

      notificationType:
        accepted
          ? "candidate_invitation_accepted"
          : "candidate_invitation_declined",

      title:
        accepted
          ? "Candidate accepted invitation"
          : "Candidate declined invitation",

      message:
        `${invitationContext.student_name} ${
          accepted
            ? "accepted"
            : "declined"
        } your invitation for the ${invitationContext.job_title} position.`,

      actionUrl:
        "/recruiter/candidates",

      referenceType:
        "candidate_invitation",

      referenceId:
        invitationId,

      metadata: {
        invitationId:
          String(
            invitationId
          ),

        jobId:
          String(
            invitationContext.job_id
          ),

        jobTitle:
          invitationContext
            .job_title,

        companyName,

        studentUserId:
          String(
            studentUserId
          ),

        studentName:
          invitationContext
            .student_name,

        studentEmail:
          invitationContext
            .student_email,

        responseStatus,
      },

      connection,
    });

    await connection.commit();

    const invitation =
      await findStudentJobInvitationById({
        studentUserId,
        invitationId,
      });

    return {
      result:
        "success",

      invitation,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}