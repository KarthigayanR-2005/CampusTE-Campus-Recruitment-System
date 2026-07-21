import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const { default: databasePool } = await import(
  "../src/config/database.js"
);

const requiredEnvironmentVariables = [
  "SEED_ADMIN_NAME",
  "SEED_ADMIN_EMAIL",
  "SEED_ADMIN_PASSWORD",
  "SEED_PLACEMENT_OFFICER_NAME",
  "SEED_PLACEMENT_OFFICER_EMAIL",
  "SEED_PLACEMENT_OFFICER_PASSWORD",
];

function validateEnvironmentVariables() {
  const missingVariables =
    requiredEnvironmentVariables.filter(
      (variableName) =>
        !process.env[variableName]?.trim()
    );

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing seed environment variables: ${missingVariables.join(
        ", "
      )}`
    );
  }
}

function validatePassword(password, accountName) {
  if (password.length < 8) {
    throw new Error(
      `${accountName} password must contain at least 8 characters.`
    );
  }

  if (Buffer.byteLength(password, "utf8") > 72) {
    throw new Error(
      `${accountName} password cannot exceed 72 bytes.`
    );
  }
}

async function createOrUpdatePrivilegedUser(
  connection,
  {
    fullName,
    email,
    password,
    role,
  }
) {
  const normalizedEmail =
    email.trim().toLowerCase();

  const passwordHash = await bcrypt.hash(
    password,
    12
  );

  const [existingUsers] =
    await connection.execute(
      `
        SELECT user_id
        FROM users
        WHERE email = ?
        LIMIT 1
      `,
      [normalizedEmail]
    );

  if (existingUsers.length > 0) {
    await connection.execute(
      `
        UPDATE users
        SET
          full_name = ?,
          password_hash = ?,
          role = ?,
          account_status = 'active',
          email_verified = TRUE
        WHERE user_id = ?
      `,
      [
        fullName.trim(),
        passwordHash,
        role,
        existingUsers[0].user_id,
      ]
    );

    return {
      action: "updated",
      email: normalizedEmail,
      role,
    };
  }

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
      VALUES (?, ?, ?, ?, 'active', TRUE)
    `,
    [
      fullName.trim(),
      normalizedEmail,
      passwordHash,
      role,
    ]
  );

  return {
    action: "created",
    email: normalizedEmail,
    role,
  };
}

async function seedPrivilegedUsers() {
  validateEnvironmentVariables();

  validatePassword(
    process.env.SEED_ADMIN_PASSWORD,
    "Admin"
  );

  validatePassword(
    process.env
      .SEED_PLACEMENT_OFFICER_PASSWORD,
    "Placement Officer"
  );

  const connection =
    await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const adminResult =
      await createOrUpdatePrivilegedUser(
        connection,
        {
          fullName:
            process.env.SEED_ADMIN_NAME,
          email:
            process.env.SEED_ADMIN_EMAIL,
          password:
            process.env.SEED_ADMIN_PASSWORD,
          role: "admin",
        }
      );

    const placementOfficerResult =
      await createOrUpdatePrivilegedUser(
        connection,
        {
          fullName:
            process.env
              .SEED_PLACEMENT_OFFICER_NAME,
          email:
            process.env
              .SEED_PLACEMENT_OFFICER_EMAIL,
          password:
            process.env
              .SEED_PLACEMENT_OFFICER_PASSWORD,
          role: "placement_officer",
        }
      );

    await connection.commit();

    console.log(
      `Admin account ${adminResult.action}: ${adminResult.email}`
    );

    console.log(
      `Placement Officer account ${placementOfficerResult.action}: ${placementOfficerResult.email}`
    );

    console.log(
      "Privileged account seeding completed successfully."
    );
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

try {
  await seedPrivilegedUsers();
} catch (error) {
  console.error(
    "Privileged account seeding failed:",
    error.message
  );

  process.exitCode = 1;
} finally {
  await databasePool.end();
}