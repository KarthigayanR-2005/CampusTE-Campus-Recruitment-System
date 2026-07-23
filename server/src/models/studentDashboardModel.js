import databasePool from "../config/database.js";

function mapActivity(row) {
  return {
    activityId:
      String(row.activity_id),

    type:
      row.activity_type,

    title:
      row.title,

    description:
      row.description,

    occurredAt:
      row.occurred_at,
  };
}

export async function findStudentRecentActivity(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          activity_id,
          activity_type,
          title,
          description,
          occurred_at

        FROM (
          SELECT
            CONCAT(
              'profile-',
              sp.user_id
            ) AS activity_id,

            'profile'
              AS activity_type,

            'Profile updated'
              AS title,

            'Your personal, academic or social information was updated.'
              AS description,

            sp.updated_at
              AS occurred_at

          FROM student_profiles AS sp

          WHERE sp.user_id = ?

          UNION ALL

          SELECT
            CONCAT(
              'skill-',
              ss.skill_id
            ) AS activity_id,

            'skill'
              AS activity_type,

            'Skill updated'
              AS title,

            CONCAT(
              ss.skill_name,
              ' — ',
              ss.proficiency
            ) AS description,

            ss.updated_at
              AS occurred_at

          FROM student_skills AS ss

          WHERE ss.user_id = ?

          UNION ALL

          SELECT
            CONCAT(
              'project-',
              project.project_id
            ) AS activity_id,

            'project'
              AS activity_type,

            'Project updated'
              AS title,

            project.project_title
              AS description,

            project.updated_at
              AS occurred_at

          FROM student_projects
            AS project

          WHERE project.user_id = ?

          UNION ALL

          SELECT
            CONCAT(
              'experience-',
              experience.experience_id
            ) AS activity_id,

            'experience'
              AS activity_type,

            'Experience updated'
              AS title,

            CONCAT(
              experience.job_title,
              ' at ',
              experience.company_name
            ) AS description,

            experience.updated_at
              AS occurred_at

          FROM student_experiences
            AS experience

          WHERE experience.user_id = ?

          UNION ALL

          SELECT
            CONCAT(
              'certification-',
              certification.certification_id
            ) AS activity_id,

            'certification'
              AS activity_type,

            'Certification updated'
              AS title,

            CONCAT(
              certification.certification_name,
              ' — ',
              certification.issuing_organization
            ) AS description,

            certification.updated_at
              AS occurred_at

          FROM student_certifications
            AS certification

          WHERE certification.user_id = ?

          UNION ALL

          SELECT
            CONCAT(
              'resume-',
              resume.resume_id
            ) AS activity_id,

            'resume'
              AS activity_type,

            'Resume uploaded'
              AS title,

            resume.original_file_name
              AS description,

            resume.updated_at
              AS occurred_at

          FROM student_resumes
            AS resume

          WHERE resume.user_id = ?
        ) AS recent_activity

        ORDER BY occurred_at DESC

        LIMIT 8
      `,
      [
        userId,
        userId,
        userId,
        userId,
        userId,
        userId,
      ]
    );

  return rows.map(mapActivity);
}