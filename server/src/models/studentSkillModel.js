import databasePool from "../config/database.js";

function mapSkill(row) {
  return {
    skillId: row.skill_id,
    name: row.skill_name,
    level: row.proficiency,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findStudentSkills(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          skill_id,
          skill_name,
          proficiency,
          created_at,
          updated_at
        FROM student_skills
        WHERE user_id = ?
        ORDER BY skill_name ASC
      `,
      [userId]
    );

  return rows.map(mapSkill);
}

export async function findStudentSkillById({
  userId,
  skillId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          skill_id,
          skill_name,
          proficiency,
          created_at,
          updated_at
        FROM student_skills
        WHERE
          skill_id = ?
          AND user_id = ?
        LIMIT 1
      `,
      [skillId, userId]
    );

  return rows[0]
    ? mapSkill(rows[0])
    : null;
}

export async function findStudentSkillByName({
  userId,
  skillName,
  excludeSkillId = null,
}) {
  let rows;

  if (excludeSkillId) {
    [rows] =
      await databasePool.execute(
        `
          SELECT skill_id
          FROM student_skills
          WHERE
            user_id = ?
            AND LOWER(skill_name) =
                LOWER(?)
            AND skill_id <> ?
          LIMIT 1
        `,
        [
          userId,
          skillName,
          excludeSkillId,
        ]
      );
  } else {
    [rows] =
      await databasePool.execute(
        `
          SELECT skill_id
          FROM student_skills
          WHERE
            user_id = ?
            AND LOWER(skill_name) =
                LOWER(?)
          LIMIT 1
        `,
        [userId, skillName]
      );
  }

  return rows[0] || null;
}

export async function createStudentSkill({
  userId,
  skillName,
  proficiency,
}) {
  const [result] =
    await databasePool.execute(
      `
        INSERT INTO student_skills (
          user_id,
          skill_name,
          proficiency
        )
        VALUES (?, ?, ?)
      `,
      [
        userId,
        skillName,
        proficiency,
      ]
    );

  return findStudentSkillById({
    userId,
    skillId: result.insertId,
  });
}

export async function updateStudentSkill({
  userId,
  skillId,
  skillName,
  proficiency,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE student_skills
        SET
          skill_name = ?,
          proficiency = ?
        WHERE
          skill_id = ?
          AND user_id = ?
      `,
      [
        skillName,
        proficiency,
        skillId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findStudentSkillById({
    userId,
    skillId,
  });
}

export async function deleteStudentSkill({
  userId,
  skillId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM student_skills
        WHERE
          skill_id = ?
          AND user_id = ?
      `,
      [skillId, userId]
    );

  return result.affectedRows;
}