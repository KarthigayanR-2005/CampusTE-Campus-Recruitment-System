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
      row.published_at || null,

    updatedAt:
      row.updated_at || null,
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
    job.status = 'active'
    AND job.application_deadline
        IS NOT NULL
    AND job.application_deadline
        >= CURRENT_DATE
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
    ? mapPublishedJob(rows[0])
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

        WHERE user.user_id = ?

        LIMIT 1
      `,
      [userId]
    );

  if (!rows[0]) {
    return null;
  }

  return {
    userId:
      String(rows[0].user_id),

    fullName:
      rows[0].full_name || "",

    email:
      rows[0].email || "",

    department:
      rows[0].department || "",

    cgpa:
      rows[0].cgpa === null
        ? null
        : Number(rows[0].cgpa),

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