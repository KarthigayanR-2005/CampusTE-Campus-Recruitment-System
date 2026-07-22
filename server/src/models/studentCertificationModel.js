import databasePool from "../config/database.js";

const certificationSelectQuery = `
  SELECT
    certification_id,
    certification_name,
    issuing_organization,
    credential_id,
    credential_url,

    DATE_FORMAT(
      issue_date,
      '%Y-%m-%d'
    ) AS issue_date,

    DATE_FORMAT(
      expiry_date,
      '%Y-%m-%d'
    ) AS expiry_date,

    does_not_expire,
    description,
    created_at,
    updated_at

  FROM student_certifications
`;

function mapCertification(row) {
  return {
    certificationId:
      row.certification_id,

    title:
      row.certification_name,

    issuer:
      row.issuing_organization,

    credentialId:
      row.credential_id || "",

    credentialUrl:
      row.credential_url || "",

    issueDate:
      row.issue_date || "",

    expiryDate:
      row.expiry_date || "",

    doesNotExpire:
      Boolean(row.does_not_expire),

    description:
      row.description || "",

    createdAt:
      row.created_at,

    updatedAt:
      row.updated_at,
  };
}

export async function findStudentCertifications(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${certificationSelectQuery}

        WHERE user_id = ?

        ORDER BY
          issue_date DESC,
          updated_at DESC
      `,
      [userId]
    );

  return rows.map(mapCertification);
}

export async function findStudentCertificationById({
  userId,
  certificationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${certificationSelectQuery}

        WHERE
          certification_id = ?
          AND user_id = ?

        LIMIT 1
      `,
      [
        certificationId,
        userId,
      ]
    );

  return rows[0]
    ? mapCertification(rows[0])
    : null;
}

export async function findDuplicateCertification({
  userId,
  title,
  issuer,
  excludeCertificationId = null,
}) {
  let rows;

  if (excludeCertificationId) {
    [rows] =
      await databasePool.execute(
        `
          SELECT certification_id
          FROM student_certifications

          WHERE
            user_id = ?
            AND LOWER(certification_name)
              = LOWER(?)
            AND LOWER(issuing_organization)
              = LOWER(?)
            AND certification_id <> ?

          LIMIT 1
        `,
        [
          userId,
          title,
          issuer,
          excludeCertificationId,
        ]
      );
  } else {
    [rows] =
      await databasePool.execute(
        `
          SELECT certification_id
          FROM student_certifications

          WHERE
            user_id = ?
            AND LOWER(certification_name)
              = LOWER(?)
            AND LOWER(issuing_organization)
              = LOWER(?)

          LIMIT 1
        `,
        [
          userId,
          title,
          issuer,
        ]
      );
  }

  return rows[0] || null;
}

export async function createStudentCertification({
  userId,
  title,
  issuer,
  credentialId,
  credentialUrl,
  issueDate,
  expiryDate,
  doesNotExpire,
  description,
}) {
  const [result] =
    await databasePool.execute(
      `
        INSERT INTO student_certifications (
          user_id,
          certification_name,
          issuing_organization,
          credential_id,
          credential_url,
          issue_date,
          expiry_date,
          does_not_expire,
          description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        title,
        issuer,
        credentialId,
        credentialUrl,
        issueDate,
        expiryDate,
        doesNotExpire,
        description,
      ]
    );

  return findStudentCertificationById({
    userId,
    certificationId:
      result.insertId,
  });
}

export async function updateStudentCertification({
  userId,
  certificationId,
  title,
  issuer,
  credentialId,
  credentialUrl,
  issueDate,
  expiryDate,
  doesNotExpire,
  description,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE student_certifications

        SET
          certification_name = ?,
          issuing_organization = ?,
          credential_id = ?,
          credential_url = ?,
          issue_date = ?,
          expiry_date = ?,
          does_not_expire = ?,
          description = ?

        WHERE
          certification_id = ?
          AND user_id = ?
      `,
      [
        title,
        issuer,
        credentialId,
        credentialUrl,
        issueDate,
        expiryDate,
        doesNotExpire,
        description,
        certificationId,
        userId,
      ]
    );

  if (result.affectedRows === 0) {
    return null;
  }

  return findStudentCertificationById({
    userId,
    certificationId,
  });
}

export async function deleteStudentCertification({
  userId,
  certificationId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM student_certifications

        WHERE
          certification_id = ?
          AND user_id = ?
      `,
      [
        certificationId,
        userId,
      ]
    );

  return result.affectedRows;
}