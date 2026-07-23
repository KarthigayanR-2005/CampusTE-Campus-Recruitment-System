import databasePool from "../config/database.js";

const resumeSelectQuery = `
  SELECT
    resume_id,
    user_id,
    original_file_name,
    stored_file_name,
    file_path,
    mime_type,
    file_size,
    uploaded_at,
    updated_at

  FROM student_resumes
`;

function mapResume(row) {
  return {
    resumeId:
      row.resume_id,

    userId:
      row.user_id,

    originalFileName:
      row.original_file_name,

    storedFileName:
      row.stored_file_name,

    filePath:
      row.file_path,

    mimeType:
      row.mime_type,

    fileSize:
      row.file_size,

    uploadedAt:
      row.uploaded_at,

    updatedAt:
      row.updated_at,
  };
}

export async function findStudentResumeByUserId(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${resumeSelectQuery}

        WHERE user_id = ?

        LIMIT 1
      `,
      [userId]
    );

  return rows[0]
    ? mapResume(rows[0])
    : null;
}

export async function saveStudentResume({
  userId,
  originalFileName,
  storedFileName,
  filePath,
  mimeType,
  fileSize,
}) {
  await databasePool.execute(
    `
      INSERT INTO student_resumes (
        user_id,
        original_file_name,
        stored_file_name,
        file_path,
        mime_type,
        file_size
      )
      VALUES (?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        original_file_name =
          VALUES(original_file_name),

        stored_file_name =
          VALUES(stored_file_name),

        file_path =
          VALUES(file_path),

        mime_type =
          VALUES(mime_type),

        file_size =
          VALUES(file_size),

        uploaded_at =
          CURRENT_TIMESTAMP
    `,
    [
      userId,
      originalFileName,
      storedFileName,
      filePath,
      mimeType,
      fileSize,
    ]
  );

  return findStudentResumeByUserId(
    userId
  );
}

export async function deleteStudentResumeByUserId(
  userId
) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM student_resumes
        WHERE user_id = ?
      `,
      [userId]
    );

  return result.affectedRows;
}