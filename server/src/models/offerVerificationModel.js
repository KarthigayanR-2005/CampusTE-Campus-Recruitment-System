import databasePool from "../config/database.js";

function formatDate(
  value
) {
  if (!value) {
    return "";
  }

  if (
    value instanceof Date
  ) {
    return value
      .toISOString()
      .slice(
        0,
        10
      );
  }

  return String(
    value
  ).slice(
    0,
    10
  );
}

function formatDateTime(
  value
) {
  if (!value) {
    return null;
  }

  if (
    value instanceof Date
  ) {
    return value
      .toISOString();
  }

  return String(
    value
  );
}

function mapVerification(
  row
) {
  if (!row) {
    return null;
  }

  return {
    verificationId:
      String(
        row.verification_id
      ),

    offerId:
      String(
        row.offer_id
      ),

    publicId:
      row.verification_public_id,

    documentSha256:
      row.document_sha256,

    signatureAlgorithm:
      row.signature_algorithm ||
      "",

    documentSignatureBase64:
      row.document_signature_base64 ||
      "",

    signingKeyId:
      row.signing_key_id ||
      "",

    documentSizeBytes:
      Number(
        row.document_size_bytes ||
        0
      ),

    documentOriginalName:
      row.document_original_name ||
      "",

    documentVersion:
      Number(
        row.document_version ||
        0
      ),

    status:
      row.status,

    issuedAt:
      formatDateTime(
        row.issued_at
      ),

    supersededAt:
      formatDateTime(
        row.superseded_at
      ),

    revokedAt:
      formatDateTime(
        row.revoked_at
      ),
  };
}

function mapPublicVerification(
  row
) {
  if (!row) {
    return null;
  }

  return {
    verificationId:
      String(
        row.verification_id
      ),

    offerId:
      String(
        row.offer_id
      ),

    publicId:
      row.verification_public_id,

    tokenHash:
      row.verification_token_hash,

    documentSha256:
      row.document_sha256,

    signatureAlgorithm:
      row.signature_algorithm ||
      "",

    documentSignatureBase64:
      row.document_signature_base64 ||
      "",

    signingKeyId:
      row.signing_key_id ||
      "",

    verificationStatus:
      row.verification_status,

    documentVersion:
      Number(
        row.document_version ||
        0
      ),

    documentOriginalName:
      row.document_original_name ||
      "",

    documentSizeBytes:
      Number(
        row.document_size_bytes ||
        0
      ),

    issuedAt:
      formatDateTime(
        row.issued_at
      ),

    supersededAt:
      formatDateTime(
        row.superseded_at
      ),

    revokedAt:
      formatDateTime(
        row.revoked_at
      ),

    offerStatus:
      row.effective_offer_status ||
      row.offer_status ||
      "",

    designation:
      row.designation ||
      "",

    offerExpiryDate:
      formatDate(
        row.offer_expiry_date
      ),

    joiningDate:
      formatDate(
        row.joining_date
      ),

    sentAt:
      formatDateTime(
        row.sent_at
      ),

    respondedAt:
      formatDateTime(
        row.responded_at
      ),

    acceptedAt:
      formatDateTime(
        row.accepted_at
      ),

    declinedAt:
      formatDateTime(
        row.declined_at
      ),

    withdrawnAt:
      formatDateTime(
        row.withdrawn_at
      ),

    candidateName:
      row.candidate_name ||
      "",

    companyName:
      row.company_name ||
      "",

    jobTitle:
      row.job_title ||
      "",
  };
}

export async function findOfferVerificationById(
  verificationId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          verification_id,
          offer_id,
          verification_public_id,
          document_sha256,
          signature_algorithm,
          document_signature_base64,
          signing_key_id,
          document_size_bytes,
          document_original_name,
          document_version,
          status,
          issued_at,
          superseded_at,
          revoked_at

        FROM offer_verifications

        WHERE
          verification_id = ?

        LIMIT 1
      `,
      [
        verificationId,
      ]
    );

  return mapVerification(
    rows[0]
  );
}

export async function findActiveOfferVerification(
  offerId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          verification_id,
          offer_id,
          verification_public_id,
          document_sha256,
          signature_algorithm,
          document_signature_base64,
          signing_key_id,
          document_size_bytes,
          document_original_name,
          document_version,
          status,
          issued_at,
          superseded_at,
          revoked_at

        FROM offer_verifications

        WHERE
          offer_id = ?

          AND status = 'active'

        ORDER BY
          document_version DESC

        LIMIT 1
      `,
      [
        offerId,
      ]
    );

  return mapVerification(
    rows[0]
  );
}

export async function findNextOfferVerificationVersion(
  offerId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          COALESCE(
            MAX(document_version),
            0
          ) + 1
            AS next_document_version

        FROM offer_verifications

        WHERE
          offer_id = ?
      `,
      [
        offerId,
      ]
    );

  return Number(
    rows[0]
      ?.next_document_version ||
    1
  );
}

export async function findPublicOfferVerification(
  verificationPublicId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          verification.verification_id,
          verification.offer_id,
          verification.verification_public_id,
          verification.verification_token_hash,
          verification.document_sha256,
          verification.signature_algorithm,
          verification.document_signature_base64,
          verification.signing_key_id,

          verification.status
            AS verification_status,

          verification.document_version,
          verification.document_original_name,
          verification.document_size_bytes,
          verification.issued_at,
          verification.superseded_at,
          verification.revoked_at,

          offer.status
            AS offer_status,

          CASE
            WHEN
              offer.status = 'sent'

              AND offer.offer_expiry_date
                  < CURRENT_DATE

            THEN 'expired'

            ELSE offer.status
          END
            AS effective_offer_status,

          offer.designation,
          offer.offer_expiry_date,
          offer.joining_date,
          offer.sent_at,
          offer.responded_at,
          offer.accepted_at,
          offer.declined_at,
          offer.withdrawn_at,

          student.full_name
            AS candidate_name,

          company.company_name,

          job.job_title

        FROM offer_verifications
          AS verification

        INNER JOIN job_offers
          AS offer
          ON offer.offer_id =
             verification.offer_id

        INNER JOIN users
          AS student
          ON student.user_id =
             offer.student_user_id

        INNER JOIN recruiter_jobs
          AS job
          ON job.job_id =
             offer.job_id

        LEFT JOIN recruiter_company_profiles
          AS company
          ON company.user_id =
             offer.recruiter_user_id

        WHERE
          verification.verification_public_id = ?

        LIMIT 1
      `,
      [
        verificationPublicId,
      ]
    );

  return mapPublicVerification(
    rows[0]
  );
}

export async function createOfferVerificationCheck({
  verificationId = null,
  submittedTokenHash,
  submittedDocumentSha256 = null,
  verificationMode = "qr",
  result,
  clientIpHash = null,
  userAgentHash = null,
}) {
  const [insertResult] =
    await databasePool.execute(
      `
        INSERT INTO offer_verification_checks (
          verification_id,
          submitted_token_hash,
          submitted_document_sha256,
          verification_mode,
          result,
          client_ip_hash,
          user_agent_hash
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        verificationId,
        submittedTokenHash,
        submittedDocumentSha256,
        verificationMode,
        result,
        clientIpHash,
        userAgentHash,
      ]
    );

  return {
    verificationCheckId:
      String(
        insertResult.insertId
      ),

    result,
  };
}

export async function saveGeneratedOfferWithVerification({
  recruiterUserId,
  offerId,

  offerLetter: {
    originalFileName,
    storedFileName,
    mimeType,
    sizeBytes,
    filePath,
  },

  verification: {
    verificationPublicId,
    verificationTokenHash,
    documentSha256,
    signatureAlgorithm,
    documentSignatureBase64,
    signingKeyId,
    documentVersion,
  },
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [offerRows] =
      await connection.execute(
        `
          SELECT
            offer_id,
            recruiter_user_id,
            status,
            offer_letter_path

          FROM job_offers

          WHERE
            offer_id = ?

            AND recruiter_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          offerId,
          recruiterUserId,
        ]
      );

    if (!offerRows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    const existingOffer =
      offerRows[0];

    if (
      existingOffer.status !==
      "draft"
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_status",
      };
    }

    const previousFilePath =
      existingOffer
        .offer_letter_path ||
      "";

    const [versionRows] =
      await connection.execute(
        `
          SELECT
            COALESCE(
              MAX(document_version),
              0
            ) + 1
              AS next_document_version

          FROM offer_verifications

          WHERE
            offer_id = ?
        `,
        [
          offerId,
        ]
      );

    const expectedDocumentVersion =
      Number(
        versionRows[0]
          ?.next_document_version ||
        1
      );

    if (
      Number(
        documentVersion
      ) !==
      expectedDocumentVersion
    ) {
      await connection.rollback();

      return {
        result:
          "version_conflict",
      };
    }

    await connection.execute(
      `
        UPDATE offer_verifications

        SET
          status = 'superseded',
          superseded_at =
            CURRENT_TIMESTAMP

        WHERE
          offer_id = ?

          AND status = 'active'
      `,
      [
        offerId,
      ]
    );

    await connection.execute(
      `
        UPDATE job_offers

        SET
          offer_letter_original_name = ?,
          offer_letter_stored_name = ?,
          offer_letter_mime_type = ?,
          offer_letter_size_bytes = ?,
          offer_letter_path = ?

        WHERE
          offer_id = ?

          AND recruiter_user_id = ?
      `,
      [
        originalFileName,
        storedFileName,
        mimeType,
        sizeBytes,
        filePath,
        offerId,
        recruiterUserId,
      ]
    );

    const [insertResult] =
      await connection.execute(
        `
          INSERT INTO offer_verifications (
            offer_id,
            verification_public_id,
            verification_token_hash,
            document_sha256,
            signature_algorithm,
            document_signature_base64,
            signing_key_id,
            document_size_bytes,
            document_original_name,
            document_version,
            status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
            'active'
          )
        `,
        [
          offerId,
          verificationPublicId,
          verificationTokenHash,
          documentSha256,
          signatureAlgorithm,
          documentSignatureBase64,
          signingKeyId,
          sizeBytes,
          originalFileName,
          documentVersion,
        ]
      );

    await connection.commit();

    const verification =
      await findOfferVerificationById(
        insertResult.insertId
      );

    return {
      result:
        "success",

      previousFilePath,
      documentVersion,
      verification,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function revokeActiveOfferVerification({
  recruiterUserId,
  offerId,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [offerRows] =
      await connection.execute(
        `
          SELECT
            offer_id

          FROM job_offers

          WHERE
            offer_id = ?

            AND recruiter_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          offerId,
          recruiterUserId,
        ]
      );

    if (!offerRows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    const [updateResult] =
      await connection.execute(
        `
          UPDATE offer_verifications

          SET
            status = 'revoked',
            revoked_at =
              CURRENT_TIMESTAMP

          WHERE
            offer_id = ?

            AND status = 'active'
        `,
        [
          offerId,
        ]
      );

    await connection.commit();

    return {
      result:
        updateResult
          .affectedRows > 0
          ? "success"
          : "no_active_verification",
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}