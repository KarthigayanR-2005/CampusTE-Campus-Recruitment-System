import databasePool from "../config/database.js";

function parseTechnologies(value) {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsedValue = JSON.parse(value);

    return Array.isArray(parsedValue)
      ? parsedValue
      : [];
  } catch {
    return [];
  }
}

function mapProject(row) {
  return {
    projectId: row.project_id,
    title: row.project_title,
    description: row.description,
    technologies: parseTechnologies(
      row.technologies
    ),
    githubUrl: row.github_url || "",
    liveDemoUrl:
      row.live_demo_url || "",
    startDate: row.start_date || "",
    endDate: row.end_date || "",
    status: row.project_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

const projectSelectQuery = `
  SELECT
    project_id,
    project_title,
    description,
    technologies,
    github_url,
    live_demo_url,

    DATE_FORMAT(
      start_date,
      '%Y-%m-%d'
    ) AS start_date,

    DATE_FORMAT(
      end_date,
      '%Y-%m-%d'
    ) AS end_date,

    project_status,
    created_at,
    updated_at

  FROM student_projects
`;

export async function findStudentProjects(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${projectSelectQuery}

        WHERE user_id = ?

        ORDER BY
          updated_at DESC,
          project_title ASC
      `,
      [userId]
    );

  return rows.map(mapProject);
}

export async function findStudentProjectById({
  userId,
  projectId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${projectSelectQuery}

        WHERE
          project_id = ?
          AND user_id = ?

        LIMIT 1
      `,
      [projectId, userId]
    );

  return rows[0]
    ? mapProject(rows[0])
    : null;
}

export async function findStudentProjectByTitle({
  userId,
  title,
  excludeProjectId = null,
}) {
  let rows;

  if (excludeProjectId) {
    [rows] =
      await databasePool.execute(
        `
          SELECT project_id
          FROM student_projects
          WHERE
            user_id = ?
            AND LOWER(project_title)
              = LOWER(?)
            AND project_id <> ?
          LIMIT 1
        `,
        [
          userId,
          title,
          excludeProjectId,
        ]
      );
  } else {
    [rows] =
      await databasePool.execute(
        `
          SELECT project_id
          FROM student_projects
          WHERE
            user_id = ?
            AND LOWER(project_title)
              = LOWER(?)
          LIMIT 1
        `,
        [userId, title]
      );
  }

  return rows[0] || null;
}

export async function createStudentProject({
  userId,
  title,
  description,
  technologies,
  githubUrl,
  liveDemoUrl,
  startDate,
  endDate,
  status,
}) {
  const [result] =
    await databasePool.execute(
      `
        INSERT INTO student_projects (
          user_id,
          project_title,
          description,
          technologies,
          github_url,
          live_demo_url,
          start_date,
          end_date,
          project_status
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        title,
        description,
        JSON.stringify(technologies),
        githubUrl,
        liveDemoUrl,
        startDate,
        endDate,
        status,
      ]
    );

  return findStudentProjectById({
    userId,
    projectId: result.insertId,
  });
}

export async function updateStudentProject({
  userId,
  projectId,
  title,
  description,
  technologies,
  githubUrl,
  liveDemoUrl,
  startDate,
  endDate,
  status,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE student_projects
        SET
          project_title = ?,
          description = ?,
          technologies = ?,
          github_url = ?,
          live_demo_url = ?,
          start_date = ?,
          end_date = ?,
          project_status = ?
        WHERE
          project_id = ?
          AND user_id = ?
      `,
      [
        title,
        description,
        JSON.stringify(technologies),
        githubUrl,
        liveDemoUrl,
        startDate,
        endDate,
        status,
        projectId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findStudentProjectById({
    userId,
    projectId,
  });
}

export async function deleteStudentProject({
  userId,
  projectId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM student_projects
        WHERE
          project_id = ?
          AND user_id = ?
      `,
      [projectId, userId]
    );

  return result.affectedRows;
}