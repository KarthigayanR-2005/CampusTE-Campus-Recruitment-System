import databasePool from "../config/database.js";

function mapUser(row) {
  return {
    userId: row.user_id,
    fullName: row.full_name,
    email: row.email,
    role: row.role,
    accountStatus: row.account_status,
    emailVerified: Boolean(
      row.email_verified
    ),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function findPendingApprovals(
  role
) {
  let rows;

  if (role) {
    [rows] = await databasePool.execute(
      `
        SELECT
          user_id,
          full_name,
          email,
          role,
          account_status,
          email_verified,
          created_at,
          updated_at
        FROM users
        WHERE
          account_status = 'pending'
          AND role = ?
          AND role IN (
            'recruiter',
            'placement_officer'
          )
        ORDER BY created_at ASC
      `,
      [role]
    );
  } else {
    [rows] = await databasePool.execute(
      `
        SELECT
          user_id,
          full_name,
          email,
          role,
          account_status,
          email_verified,
          created_at,
          updated_at
        FROM users
        WHERE
          account_status = 'pending'
          AND role IN (
            'recruiter',
            'placement_officer'
          )
        ORDER BY created_at ASC
      `
    );
  }

  return rows.map(mapUser);
}

export async function findApprovalCandidateById(
  userId
) {
  const [rows] = await databasePool.execute(
    `
      SELECT
        user_id,
        full_name,
        email,
        role,
        account_status,
        email_verified,
        created_at,
        updated_at
      FROM users
      WHERE
        user_id = ?
        AND role IN (
          'recruiter',
          'placement_officer'
        )
      LIMIT 1
    `,
    [userId]
  );

  return rows[0]
    ? mapUser(rows[0])
    : null;
}

export async function updateApprovalStatus({
  userId,
  accountStatus,
}) {
  const [result] = await databasePool.execute(
    `
      UPDATE users
      SET account_status = ?
      WHERE
        user_id = ?
        AND role IN (
          'recruiter',
          'placement_officer'
        )
        AND account_status = 'pending'
    `,
    [accountStatus, userId]
  );

  return result.affectedRows;
}