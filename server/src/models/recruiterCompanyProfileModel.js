import databasePool from "../config/database.js";

const brandingColumnConfig = {
  logo: {
    originalName:
      "company_logo_original_name",

    storedName:
      "company_logo_stored_name",

    mimeType:
      "company_logo_mime_type",

    sizeBytes:
      "company_logo_size_bytes",

    filePath:
      "company_logo_path",
  },

  signature: {
    originalName:
      "authorized_signature_original_name",

    storedName:
      "authorized_signature_stored_name",

    mimeType:
      "authorized_signature_mime_type",

    sizeBytes:
      "authorized_signature_size_bytes",

    filePath:
      "authorized_signature_path",
  },
};

function getBrandingColumnConfig(
  fileType
) {
  const config =
    brandingColumnConfig[
      fileType
    ];

  if (!config) {
    throw new Error(
      "Invalid company branding file type."
    );
  }

  return config;
}

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

    rcp.company_logo_original_name,
    rcp.company_logo_stored_name,
    rcp.company_logo_mime_type,
    rcp.company_logo_size_bytes,
    rcp.company_logo_path,

    rcp.authorized_signature_original_name,
    rcp.authorized_signature_stored_name,
    rcp.authorized_signature_mime_type,
    rcp.authorized_signature_size_bytes,
    rcp.authorized_signature_path,

    rcp.created_at,
    rcp.updated_at

  FROM users AS u

  LEFT JOIN recruiter_company_profiles AS rcp
    ON rcp.user_id = u.user_id

  WHERE u.user_id = ?

  LIMIT 1
`;

function mapPublicBrandingFile({
  originalFileName,
  mimeType,
  sizeBytes,
  filePath,
}) {
  return {
    available:
      Boolean(
        filePath
      ),

    originalFileName:
      originalFileName ||
      "",

    mimeType:
      mimeType ||
      "",

    sizeBytes:
      Number(
        sizeBytes ||
        0
      ),
  };
}

function mapCompanyProfile(
  row
) {
  return {
    companyProfileId:
      row.company_profile_id ||
      null,

    companyName:
      row.company_name ||
      "",

    industry:
      row.industry ||
      "",

    companySize:
      row.company_size ||
      "",

    foundedYear:
      row.founded_year
        ? String(
            row.founded_year
          )
        : "",

    website:
      row.website_url ||
      "",

    contactEmail:
      row.contact_email ||
      row.account_email ||
      "",

    contactPhone:
      row.contact_phone ||
      "",

    headquarters:
      row.headquarters ||
      "",

    linkedinUrl:
      row.linkedin_url ||
      "",

    recruiterName:
      row.recruiter_name ||
      row.account_name ||
      "",

    recruiterDesignation:
      row.recruiter_designation ||
      "",

    description:
      row.company_description ||
      "",

    branding: {
      logo:
        mapPublicBrandingFile({
          originalFileName:
            row.company_logo_original_name,

          mimeType:
            row.company_logo_mime_type,

          sizeBytes:
            row.company_logo_size_bytes,

          filePath:
            row.company_logo_path,
        }),

      signature:
        mapPublicBrandingFile({
          originalFileName:
            row.authorized_signature_original_name,

          mimeType:
            row.authorized_signature_mime_type,

          sizeBytes:
            row.authorized_signature_size_bytes,

          filePath:
            row.authorized_signature_path,
        }),
    },

    createdAt:
      row.created_at ||
      null,

    updatedAt:
      row.updated_at ||
      null,

    exists:
      Boolean(
        row.company_profile_id
      ),
  };
}

function mapInternalBrandingFile(
  row,
  config
) {
  if (!row) {
    return null;
  }

  const filePath =
    row[
      config.filePath
    ] ||
    "";

  return {
    userId:
      String(
        row.user_id
      ),

    companyProfileId:
      row.company_profile_id
        ? String(
            row.company_profile_id
          )
        : null,

    available:
      Boolean(
        filePath
      ),

    originalFileName:
      row[
        config.originalName
      ] ||
      "",

    storedFileName:
      row[
        config.storedName
      ] ||
      "",

    mimeType:
      row[
        config.mimeType
      ] ||
      "",

    sizeBytes:
      Number(
        row[
          config.sizeBytes
        ] ||
        0
      ),

    filePath,
  };
}

export async function findRecruiterCompanyProfile(
  userId
) {
  const [rows] =
    await databasePool.execute(
      companyProfileSelectQuery,
      [
        userId,
      ]
    );

  return rows[0]
    ? mapCompanyProfile(
        rows[0]
      )
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
      VALUES (
        ?, ?, ?, ?, ?, ?, ?,
        ?, ?, ?, ?, ?, ?
      )

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

export async function findRecruiterCompanyBrandingFile({
  userId,
  fileType,
}) {
  const config =
    getBrandingColumnConfig(
      fileType
    );

  const [rows] =
    await databasePool.execute(
      `
        SELECT
          user_id,
          company_profile_id,
          ${config.originalName},
          ${config.storedName},
          ${config.mimeType},
          ${config.sizeBytes},
          ${config.filePath}

        FROM recruiter_company_profiles

        WHERE user_id = ?

        LIMIT 1
      `,
      [
        userId,
      ]
    );

  return mapInternalBrandingFile(
    rows[0],
    config
  );
}

export async function saveRecruiterCompanyBrandingFile({
  userId,
  fileType,
  originalFileName,
  storedFileName,
  mimeType,
  sizeBytes,
  filePath,
}) {
  const config =
    getBrandingColumnConfig(
      fileType
    );

  const connection =
    await databasePool
      .getConnection();

  let previousFilePath =
    "";

  try {
    await connection
      .beginTransaction();

    const [rows] =
      await connection.execute(
        `
          SELECT
            company_profile_id,
            ${config.filePath}

          FROM recruiter_company_profiles

          WHERE user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          userId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "profile_missing",
      };
    }

    previousFilePath =
      rows[0][
        config.filePath
      ] ||
      "";

    await connection.execute(
      `
        UPDATE recruiter_company_profiles

        SET
          ${config.originalName} = ?,
          ${config.storedName} = ?,
          ${config.mimeType} = ?,
          ${config.sizeBytes} = ?,
          ${config.filePath} = ?

        WHERE user_id = ?
      `,
      [
        originalFileName,
        storedFileName,
        mimeType,
        sizeBytes,
        filePath,
        userId,
      ]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }

  const profile =
    await findRecruiterCompanyProfile(
      userId
    );

  return {
    result:
      "success",

    previousFilePath,
    profile,
  };
}

export async function clearRecruiterCompanyBrandingFile({
  userId,
  fileType,
}) {
  const config =
    getBrandingColumnConfig(
      fileType
    );

  const connection =
    await databasePool
      .getConnection();

  let previousFilePath =
    "";

  try {
    await connection
      .beginTransaction();

    const [rows] =
      await connection.execute(
        `
          SELECT
            company_profile_id,
            ${config.filePath}

          FROM recruiter_company_profiles

          WHERE user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          userId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "profile_missing",
      };
    }

    previousFilePath =
      rows[0][
        config.filePath
      ] ||
      "";

    if (!previousFilePath) {
      await connection.rollback();

      return {
        result:
          "no_file",
      };
    }

    await connection.execute(
      `
        UPDATE recruiter_company_profiles

        SET
          ${config.originalName} = NULL,
          ${config.storedName} = NULL,
          ${config.mimeType} = NULL,
          ${config.sizeBytes} = NULL,
          ${config.filePath} = NULL

        WHERE user_id = ?
      `,
      [
        userId,
      ]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }

  const profile =
    await findRecruiterCompanyProfile(
      userId
    );

  return {
    result:
      "success",

    previousFilePath,
    profile,
  };
}