import databasePool from "../config/database.js";

const studentProfileSelectQuery = `
  SELECT
    u.user_id,
    u.full_name,
    u.email,
    u.role,
    u.account_status,
    u.email_verified,

    sp.student_profile_id,
    sp.phone,

    DATE_FORMAT(
      sp.date_of_birth,
      '%Y-%m-%d'
    ) AS date_of_birth,

    sp.gender,
    sp.roll_number,
    sp.institution,
    sp.degree,
    sp.department,
    sp.year_of_study,
    sp.cgpa,
    sp.graduation_year,
    sp.city,
    sp.state,
    sp.country,
    sp.linkedin_url,
    sp.github_url,
    sp.portfolio_url,
    sp.profile_summary,
    sp.created_at AS profile_created_at,
    sp.updated_at AS profile_updated_at

  FROM users AS u

  LEFT JOIN student_profiles AS sp
    ON sp.user_id = u.user_id
`;

function mapStudentProfile(row) {
  return {
    userId: row.user_id,
    profileId:
      row.student_profile_id || null,

    fullName: row.full_name,
    email: row.email,
    role: row.role,
    accountStatus:
      row.account_status,

    emailVerified: Boolean(
      row.email_verified
    ),

    phone: row.phone || "",

    dateOfBirth:
      row.date_of_birth || "",

    gender: row.gender || "",

    rollNumber:
      row.roll_number || "",

    institution:
      row.institution || "",

    degree: row.degree || "",

    department:
      row.department || "",

    yearOfStudy:
      row.year_of_study ?? "",

    cgpa:
      row.cgpa !== null &&
      row.cgpa !== undefined
        ? String(row.cgpa)
        : "",

    graduationYear:
      row.graduation_year ?? "",

    city: row.city || "",
    state: row.state || "",
    country: row.country || "",

    linkedinUrl:
      row.linkedin_url || "",

    githubUrl:
      row.github_url || "",

    portfolioUrl:
      row.portfolio_url || "",

    profileSummary:
      row.profile_summary || "",

    createdAt:
      row.profile_created_at || null,

    updatedAt:
      row.profile_updated_at || null,
  };
}

export async function findStudentProfileByUserId(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${studentProfileSelectQuery}

        WHERE
          u.user_id = ?
          AND u.role = 'student'

        LIMIT 1
      `,
      [userId]
    );

  return rows[0]
    ? mapStudentProfile(rows[0])
    : null;
}

export async function saveStudentProfile({
  userId,
  fullName,
  phone,
  dateOfBirth,
  gender,
  rollNumber,
  institution,
  degree,
  department,
  yearOfStudy,
  cgpa,
  graduationYear,
  city,
  state,
  country,
  linkedinUrl,
  githubUrl,
  portfolioUrl,
  profileSummary,
}) {
  const connection =
    await databasePool.getConnection();

  try {
    await connection.beginTransaction();

    const [userUpdateResult] =
      await connection.execute(
        `
          UPDATE users
          SET full_name = ?
          WHERE
            user_id = ?
            AND role = 'student'
        `,
        [fullName, userId]
      );

    if (
      userUpdateResult.affectedRows === 0
    ) {
      throw new Error(
        "STUDENT_ACCOUNT_NOT_FOUND"
      );
    }

    await connection.execute(
      `
        INSERT INTO student_profiles (
          user_id,
          phone,
          date_of_birth,
          gender,
          roll_number,
          institution,
          degree,
          department,
          year_of_study,
          cgpa,
          graduation_year,
          city,
          state,
          country,
          linkedin_url,
          github_url,
          portfolio_url,
          profile_summary
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON DUPLICATE KEY UPDATE
          phone = VALUES(phone),
          date_of_birth =
            VALUES(date_of_birth),
          gender = VALUES(gender),
          roll_number =
            VALUES(roll_number),
          institution =
            VALUES(institution),
          degree = VALUES(degree),
          department =
            VALUES(department),
          year_of_study =
            VALUES(year_of_study),
          cgpa = VALUES(cgpa),
          graduation_year =
            VALUES(graduation_year),
          city = VALUES(city),
          state = VALUES(state),
          country = VALUES(country),
          linkedin_url =
            VALUES(linkedin_url),
          github_url =
            VALUES(github_url),
          portfolio_url =
            VALUES(portfolio_url),
          profile_summary =
            VALUES(profile_summary)
      `,
      [
        userId,
        phone,
        dateOfBirth,
        gender,
        rollNumber,
        institution,
        degree,
        department,
        yearOfStudy,
        cgpa,
        graduationYear,
        city,
        state,
        country,
        linkedinUrl,
        githubUrl,
        portfolioUrl,
        profileSummary,
      ]
    );

    const [rows] =
      await connection.execute(
        `
          ${studentProfileSelectQuery}

          WHERE
            u.user_id = ?
            AND u.role = 'student'

          LIMIT 1
        `,
        [userId]
      );

    await connection.commit();

    return rows[0]
      ? mapStudentProfile(rows[0])
      : null;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}