import databasePool from "../config/database.js";

export async function findUserByEmail(email) {
  const [rows] = await databasePool.execute(
    `
      SELECT
        user_id,
        full_name,
        email,
        role,
        account_status
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  return rows[0] || null;
}

export async function findUserByEmailForAuthentication(
  email
) {
  const [rows] = await databasePool.execute(
    `
      SELECT
        user_id,
        full_name,
        email,
        password_hash,
        role,
        account_status,
        email_verified,
        last_login_at,
        created_at
      FROM users
      WHERE email = ?
      LIMIT 1
    `,
    [email]
  );

  if (!rows[0]) {
    return null;
  }

  return {
    userId: rows[0].user_id,
    fullName: rows[0].full_name,
    email: rows[0].email,
    passwordHash: rows[0].password_hash,
    role: rows[0].role,
    accountStatus: rows[0].account_status,
    emailVerified: Boolean(
      rows[0].email_verified
    ),
    lastLoginAt: rows[0].last_login_at,
    createdAt: rows[0].created_at,
  };
}

export async function findUserById(userId) {
  const [rows] = await databasePool.execute(
    `
      SELECT
        user_id,
        full_name,
        email,
        role,
        account_status,
        email_verified,
        last_login_at,
        created_at,
        updated_at
      FROM users
      WHERE user_id = ?
      LIMIT 1
    `,
    [userId]
  );

  if (!rows[0]) {
    return null;
  }

  return {
    userId: rows[0].user_id,
    fullName: rows[0].full_name,
    email: rows[0].email,
    role: rows[0].role,
    accountStatus: rows[0].account_status,
    emailVerified: Boolean(
      rows[0].email_verified
    ),
    lastLoginAt: rows[0].last_login_at,
    createdAt: rows[0].created_at,
    updatedAt: rows[0].updated_at,
  };
}

export async function createUser({
  fullName,
  email,
  passwordHash,
  role,
  accountStatus,
}) {
  const [result] = await databasePool.execute(
    `
      INSERT INTO users (
        full_name,
        email,
        password_hash,
        role,
        account_status,
        email_verified
      )
      VALUES (?, ?, ?, ?, ?, FALSE)
    `,
    [
      fullName,
      email,
      passwordHash,
      role,
      accountStatus,
    ]
  );

  return {
    userId: result.insertId,
    fullName,
    email,
    role,
    accountStatus,
    emailVerified: false,
  };
}

export async function updateLastLogin(userId) {
  await databasePool.execute(
    `
      UPDATE users
      SET last_login_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `,
    [userId]
  );
}