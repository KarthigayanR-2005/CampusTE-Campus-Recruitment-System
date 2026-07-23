import databasePool from "../config/database.js";

const companyProfileSelectQuery = `
  SELECT
    u.user_id,
    u.full_name AS account_name,
    u.email AS account_email,

    rcp.company_profile_id,
    rcp.company_name,
    rcp.industry,
    rcp.company_size,
    rcp.founded_year,
    rcp.website_url,
    rcp.contact_email,
    rcp.contact_phone,
    rcp.headquarters,
    rcp.linkedin_url,
    rcp.recruiter_name,
    rcp.recruiter_designation,
    rcp.company_description,
    rcp.created_at,
    rcp.updated_at

  FROM users AS u

  LEFT JOIN recruiter_company_profiles AS rcp
    ON rcp.user_id = u.user_id

  WHERE u.user_id = ?

  LIMIT 1
`;

function mapCompanyProfile(row) {
  return {
    companyProfileId:
      row.company_profile_id || null,

    companyName:
      row.company_name || "",

    industry:
      row.industry || "",

    companySize:
      row.company_size || "",

    foundedYear:
      row.founded_year
        ? String(row.founded_year)
        : "",

    website:
      row.website_url || "",

    contactEmail:
      row.contact_email ||
      row.account_email ||
      "",

    contactPhone:
      row.contact_phone || "",

    headquarters:
      row.headquarters || "",

    linkedinUrl:
      row.linkedin_url || "",

    recruiterName:
      row.recruiter_name ||
      row.account_name ||
      "",

    recruiterDesignation:
      row.recruiter_designation || "",

    description:
      row.company_description || "",

    createdAt:
      row.created_at || null,

    updatedAt:
      row.updated_at || null,

    exists:
      Boolean(row.company_profile_id),
  };
}

export async function findRecruiterCompanyProfile(
  userId
) {
  const [rows] =
    await databasePool.execute(
      companyProfileSelectQuery,
      [userId]
    );

  return rows[0]
    ? mapCompanyProfile(rows[0])
    : null;
}

export async function saveRecruiterCompanyProfile({
  userId,
  companyName,
  industry,
  companySize,
  foundedYear,
  website,
  contactEmail,
  contactPhone,
  headquarters,
  linkedinUrl,
  recruiterName,
  recruiterDesignation,
  description,
}) {
  await databasePool.execute(
    `
      INSERT INTO recruiter_company_profiles (
        user_id,
        company_name,
        industry,
        company_size,
        founded_year,
        website_url,
        contact_email,
        contact_phone,
        headquarters,
        linkedin_url,
        recruiter_name,
        recruiter_designation,
        company_description
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        company_name =
          VALUES(company_name),

        industry =
          VALUES(industry),

        company_size =
          VALUES(company_size),

        founded_year =
          VALUES(founded_year),

        website_url =
          VALUES(website_url),

        contact_email =
          VALUES(contact_email),

        contact_phone =
          VALUES(contact_phone),

        headquarters =
          VALUES(headquarters),

        linkedin_url =
          VALUES(linkedin_url),

        recruiter_name =
          VALUES(recruiter_name),

        recruiter_designation =
          VALUES(recruiter_designation),

        company_description =
          VALUES(company_description)
    `,
    [
      userId,
      companyName,
      industry,
      companySize,
      foundedYear,
      website,
      contactEmail,
      contactPhone,
      headquarters,
      linkedinUrl,
      recruiterName,
      recruiterDesignation,
      description,
    ]
  );

  return findRecruiterCompanyProfile(
    userId
  );
}