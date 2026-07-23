import databasePool from "../config/database.js";

const experienceSelectQuery = `
  SELECT
    experience_id,
    company_name,
    job_title,
    employment_type,
    location,

    DATE_FORMAT(
      start_date,
      '%Y-%m-%d'
    ) AS start_date,

    DATE_FORMAT(
      end_date,
      '%Y-%m-%d'
    ) AS end_date,

    currently_working,
    description,
    created_at,
    updated_at

  FROM student_experiences
`;

function mapExperience(row) {
  return {
    experienceId: row.experience_id,
    company: row.company_name,
    role: row.job_title,
    employmentType: row.employment_type,
    location: row.location,
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    currentlyWorking: Boolean(
      row.currently_working
    ),
    description: row.description,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findStudentExperiences(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${experienceSelectQuery}

        WHERE user_id = ?

        ORDER BY
          currently_working DESC,
          start_date DESC,
          updated_at DESC
      `,
      [userId]
    );

  return rows.map(mapExperience);
}

export async function findStudentExperienceById({
  userId,
  experienceId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${experienceSelectQuery}

        WHERE
          experience_id = ?
          AND user_id = ?

        LIMIT 1
      `,
      [experienceId, userId]
    );

  return rows[0]
    ? mapExperience(rows[0])
    : null;
}

export async function findDuplicateExperience({
  userId,
  company,
  role,
  startDate,
  excludeExperienceId = null,
}) {
  let rows;

  if (excludeExperienceId) {
    [rows] =
      await databasePool.execute(
        `
          SELECT experience_id
          FROM student_experiences

          WHERE
            user_id = ?
            AND LOWER(company_name)
              = LOWER(?)
            AND LOWER(job_title)
              = LOWER(?)
            AND start_date = ?
            AND experience_id <> ?

          LIMIT 1
        `,
        [
          userId,
          company,
          role,
          startDate,
          excludeExperienceId,
        ]
      );
  } else {
    [rows] =
      await databasePool.execute(
        `
          SELECT experience_id
          FROM student_experiences

          WHERE
            user_id = ?
            AND LOWER(company_name)
              = LOWER(?)
            AND LOWER(job_title)
              = LOWER(?)
            AND start_date = ?

          LIMIT 1
        `,
        [
          userId,
          company,
          role,
          startDate,
        ]
      );
  }

  return rows[0] || null;
}

export async function createStudentExperience({
  userId,
  company,
  role,
  employmentType,
  location,
  startDate,
  endDate,
  currentlyWorking,
  description,
}) {
  const [result] =
    await databasePool.execute(
      `
        INSERT INTO student_experiences (
          user_id,
          company_name,
          job_title,
          employment_type,
          location,
          start_date,
          end_date,
          currently_working,
          description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        company,
        role,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description,
      ]
    );

  return findStudentExperienceById({
    userId,
    experienceId: result.insertId,
  });
}

export async function updateStudentExperience({
  userId,
  experienceId,
  company,
  role,
  employmentType,
  location,
  startDate,
  endDate,
  currentlyWorking,
  description,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE student_experiences

        SET
          company_name = ?,
          job_title = ?,
          employment_type = ?,
          location = ?,
          start_date = ?,
          end_date = ?,
          currently_working = ?,
          description = ?

        WHERE
          experience_id = ?
          AND user_id = ?
      `,
      [
        company,
        role,
        employmentType,
        location,
        startDate,
        endDate,
        currentlyWorking,
        description,
        experienceId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findStudentExperienceById({
    userId,
    experienceId,
  });
}

export async function deleteStudentExperience({
  userId,
  experienceId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM student_experiences

        WHERE
          experience_id = ?
          AND user_id = ?
      `,
      [experienceId, userId]
    );

  return result.affectedRows;
}