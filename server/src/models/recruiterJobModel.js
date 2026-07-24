import databasePool from "../config/database.js";

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

function mapRecruiterJob(row) {
  return {
    jobId:
      String(row.job_id),

    companyName:
      row.company_name || "",

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
        row.minimum_cgpa ?? 6.5
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

    status:
      row.status || "draft",

    applicantCount:
      Number(
        row.applicant_count || 0
      ),

    publishedAt:
      row.published_at || null,

    closedAt:
      row.closed_at || null,

    createdAt:
      row.created_at || null,

    updatedAt:
      row.updated_at || null,
  };
}

const jobSelectFields = `
  SELECT
    job.job_id,
    job.recruiter_user_id,
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
    job.status,
    job.published_at,
    job.closed_at,
    job.created_at,
    job.updated_at,

    company.company_name,

    (
      SELECT COUNT(*)

      FROM student_job_applications
        AS application

      WHERE application.job_id =
        job.job_id
    ) AS applicant_count

  FROM recruiter_jobs AS job

  LEFT JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       job.recruiter_user_id
`;

export async function recruiterHasCompanyProfile(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT company_profile_id

        FROM recruiter_company_profiles

        WHERE user_id = ?

        LIMIT 1
      `,
      [userId]
    );

  return rows.length > 0;
}

export async function findRecruiterJobs(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${jobSelectFields}

        WHERE job.recruiter_user_id = ?

        ORDER BY
          FIELD(
            job.status,
            'active',
            'draft',
            'closed'
          ),

          job.updated_at DESC
      `,
      [userId]
    );

  return rows.map(
    mapRecruiterJob
  );
}

export async function findRecruiterJobById({
  userId,
  jobId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${jobSelectFields}

        WHERE
          job.recruiter_user_id = ?
          AND job.job_id = ?

        LIMIT 1
      `,
      [
        userId,
        jobId,
      ]
    );

  return rows[0]
    ? mapRecruiterJob(rows[0])
    : null;
}

export async function createRecruiterJob({
  userId,
  job,
  status,
}) {
  const publishedAt =
    status === "active"
      ? new Date()
      : null;

  const [result] =
    await databasePool.execute(
      `
        INSERT INTO recruiter_jobs (
          recruiter_user_id,
          job_title,
          department,
          employment_type,
          experience_level,
          salary_min,
          salary_max,
          city,
          country,
          work_mode,
          openings,
          application_deadline,
          minimum_cgpa,
          required_skills,
          preferred_skills,
          eligible_branches,
          eligible_graduation_years,
          job_description,
          responsibilities,
          candidate_requirements,
          status,
          published_at
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
      [
        userId,
        job.jobTitle,
        job.department || null,
        job.employmentType,
        job.experience,
        job.salaryMin,
        job.salaryMax,
        job.city || null,
        job.country,
        job.workMode,
        job.openings,
        job.applicationDeadline,
        job.minimumCgpa,

        JSON.stringify(
          job.requiredSkills
        ),

        JSON.stringify(
          job.preferredSkills
        ),

        JSON.stringify(
          job.eligibleBranches
        ),

        JSON.stringify(
          job.eligibleGraduationYears
        ),

        job.jobDescription || null,
        job.responsibilities || null,
        job.requirements || null,
        status,
        publishedAt,
      ]
    );

  return findRecruiterJobById({
    userId,
    jobId: result.insertId,
  });
}

export async function updateRecruiterJob({
  userId,
  jobId,
  job,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE recruiter_jobs

        SET
          job_title = ?,
          department = ?,
          employment_type = ?,
          experience_level = ?,
          salary_min = ?,
          salary_max = ?,
          city = ?,
          country = ?,
          work_mode = ?,
          openings = ?,
          application_deadline = ?,
          minimum_cgpa = ?,
          required_skills = ?,
          preferred_skills = ?,
          eligible_branches = ?,
          eligible_graduation_years = ?,
          job_description = ?,
          responsibilities = ?,
          candidate_requirements = ?

        WHERE
          job_id = ?
          AND recruiter_user_id = ?
      `,
      [
        job.jobTitle,
        job.department || null,
        job.employmentType,
        job.experience,
        job.salaryMin,
        job.salaryMax,
        job.city || null,
        job.country,
        job.workMode,
        job.openings,
        job.applicationDeadline,
        job.minimumCgpa,

        JSON.stringify(
          job.requiredSkills
        ),

        JSON.stringify(
          job.preferredSkills
        ),

        JSON.stringify(
          job.eligibleBranches
        ),

        JSON.stringify(
          job.eligibleGraduationYears
        ),

        job.jobDescription || null,
        job.responsibilities || null,
        job.requirements || null,
        jobId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findRecruiterJobById({
    userId,
    jobId,
  });
}

export async function updateRecruiterJobStatus({
  userId,
  jobId,
  status,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE recruiter_jobs

        SET
          status = ?,

          published_at =
            CASE
              WHEN
                ? = 'active'
                AND published_at IS NULL
              THEN CURRENT_TIMESTAMP

              ELSE published_at
            END,

          closed_at =
            CASE
              WHEN ? = 'closed'
              THEN CURRENT_TIMESTAMP

              WHEN ? = 'active'
              THEN NULL

              ELSE closed_at
            END

        WHERE
          job_id = ?
          AND recruiter_user_id = ?
      `,
      [
        status,
        status,
        status,
        status,
        jobId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findRecruiterJobById({
    userId,
    jobId,
  });
}

export async function duplicateRecruiterJob({
  userId,
  jobId,
}) {
  const [result] =
    await databasePool.execute(
      `
        INSERT INTO recruiter_jobs (
          recruiter_user_id,
          job_title,
          department,
          employment_type,
          experience_level,
          salary_min,
          salary_max,
          city,
          country,
          work_mode,
          openings,
          application_deadline,
          minimum_cgpa,
          required_skills,
          preferred_skills,
          eligible_branches,
          eligible_graduation_years,
          job_description,
          responsibilities,
          candidate_requirements,
          status
        )

        SELECT
          recruiter_user_id,

          CONCAT(
            LEFT(job_title, 170),
            ' Copy'
          ),

          department,
          employment_type,
          experience_level,
          salary_min,
          salary_max,
          city,
          country,
          work_mode,
          openings,
          application_deadline,
          minimum_cgpa,
          required_skills,
          preferred_skills,
          eligible_branches,
          eligible_graduation_years,
          job_description,
          responsibilities,
          candidate_requirements,
          'draft'

        FROM recruiter_jobs

        WHERE
          job_id = ?
          AND recruiter_user_id = ?
      `,
      [
        jobId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findRecruiterJobById({
    userId,
    jobId: result.insertId,
  });
}

export async function deleteRecruiterDraftJob({
  userId,
  jobId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM recruiter_jobs

        WHERE
          job_id = ?
          AND recruiter_user_id = ?
          AND status = 'draft'
      `,
      [
        jobId,
        userId,
      ]
    );

  return result.affectedRows > 0;
}