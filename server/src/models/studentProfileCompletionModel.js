import databasePool from "../config/database.js";

export async function findStudentProfileCompletionData(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          u.full_name AS fullName,
          u.email AS email,

          sp.phone AS phone,

          DATE_FORMAT(
            sp.date_of_birth,
            '%Y-%m-%d'
          ) AS dateOfBirth,

          sp.gender AS gender,
          sp.city AS city,
          sp.state AS state,
          sp.country AS country,

          sp.profile_summary
            AS profileSummary,

          sp.roll_number
            AS rollNumber,

          sp.institution
            AS institution,

          sp.degree AS degree,

          sp.department
            AS department,

          sp.year_of_study
            AS yearOfStudy,

          sp.cgpa AS cgpa,

          sp.graduation_year
            AS graduationYear,

          sp.linkedin_url
            AS linkedinUrl,

          sp.github_url
            AS githubUrl,

          sp.portfolio_url
            AS portfolioUrl,

          (
            SELECT COUNT(*)
            FROM student_skills
            WHERE user_id = u.user_id
          ) AS skillCount,

          (
            SELECT COUNT(*)
            FROM student_projects
            WHERE user_id = u.user_id
          ) AS projectCount,

          (
            SELECT COUNT(*)
            FROM student_experiences
            WHERE user_id = u.user_id
          ) AS experienceCount,

          (
            SELECT COUNT(*)
            FROM student_certifications
            WHERE user_id = u.user_id
          ) AS certificationCount,

          (
            SELECT COUNT(*)
            FROM student_resumes
            WHERE user_id = u.user_id
          ) AS resumeCount

        FROM users AS u

        LEFT JOIN student_profiles AS sp
          ON sp.user_id = u.user_id

        WHERE u.user_id = ?

        LIMIT 1
      `,
      [userId]
    );

  return rows[0] || null;
}