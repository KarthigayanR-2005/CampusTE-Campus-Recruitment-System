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

function mapPlacementOfficer(row) {
  return {
    userId: row.user_id,
    fullName: row.full_name,
    email: row.email,
    role: row.role,
    accountStatus: row.account_status,
    emailVerified: Boolean(
      row.email_verified
    ),
    lastLoginAt: row.last_login_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,

    profileId:
      row.placement_officer_profile_id ||
      null,

    phone: row.phone || "",
    employeeId: row.employee_id || "",
    designation: row.designation || "",
    department: row.department || "",
    institution: row.institution || "",
    institutionCode:
      row.institution_code || "",
    location: row.location || "",
  };
}

const placementOfficerSelectQuery = `
  SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.role,
    u.account_status,
    u.email_verified,
    u.last_login_at,
    u.created_at,
    u.updated_at,

    pop.placement_officer_profile_id,
    pop.phone,
    pop.employee_id,
    pop.designation,
    pop.department,
    pop.institution,
    pop.institution_code,
    pop.location

  FROM users AS u

  LEFT JOIN placement_officer_profiles AS pop
    ON pop.user_id = u.user_id
`;

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

export async function findUserByEmail(
  email
) {
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

export async function findPlacementOfficerByEmployeeId(
  employeeId
) {
  const [rows] = await databasePool.execute(
    `
      SELECT
        placement_officer_profile_id,
        user_id,
        employee_id
      FROM placement_officer_profiles
      WHERE employee_id = ?
      LIMIT 1
    `,
    [employeeId]
  );

  return rows[0] || null;
}

export async function findPlacementOfficers() {
  const [rows] = await databasePool.execute(
    `
      ${placementOfficerSelectQuery}

      WHERE u.role = 'placement_officer'

      ORDER BY u.created_at DESC
    `
  );

  return rows.map(mapPlacementOfficer);
}

export async function createPlacementOfficerAccount({
  fullName,
  email,
  passwordHash,
  phone,
  employeeId,
  designation,
  department,
  institution,
  institutionCode,
  location,
}) {
  const connection =
    await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const [userResult] =
      await connection.execute(
        `
          INSERT INTO users (
            full_name,
            email,
            password_hash,
            role,
            account_status,
            email_verified
          )
          VALUES (
            ?,
            ?,
            ?,
            'placement_officer',
            'active',
            TRUE
          )
        `,
        [
          fullName,
          email,
          passwordHash,
        ]
      );

    const userId = userResult.insertId;

    await connection.execute(
      `
        INSERT INTO placement_officer_profiles (
          user_id,
          phone,
          employee_id,
          designation,
          department,
          institution,
          institution_code,
          location
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        userId,
        phone,
        employeeId,
        designation,
        department,
        institution,
        institutionCode,
        location,
      ]
    );

    const [rows] =
      await connection.execute(
        `
          ${placementOfficerSelectQuery}

          WHERE
            u.user_id = ?
            AND u.role = 'placement_officer'

          LIMIT 1
        `,
        [userId]
      );

    await connection.commit();

    return rows[0]
      ? mapPlacementOfficer(rows[0])
      : null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}