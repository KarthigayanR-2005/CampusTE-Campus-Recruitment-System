import databasePool from "../config/database.js";

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
      row.issued_at ||
      null,

    supersededAt:
      row.superseded_at ||
      null,

    revokedAt:
      row.revoked_at ||
      null,
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
          document_size_bytes,
          document_original_name,
          document_version,
          status,
          issued_at,
          superseded_at,
          revoked_at

        FROM offer_verifications

        WHERE verification_id = ?

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

/*
|--------------------------------------------------------------------------
| Save generated PDF and verification atomically
|--------------------------------------------------------------------------
|
| The offer-letter metadata and the verification record are committed in
| the same transaction. This prevents a generated PDF from being attached
| to an offer without its matching verification hash.
|
*/

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

          WHERE offer_id = ?
        `,
        [
          offerId,
        ]
      );

    const documentVersion =
      Number(
        versionRows[0]
          ?.next_document_version ||
        1
      );

    /*
    |--------------------------------------------------------------------------
    | Supersede previous active version
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Store the generated offer-letter metadata
    |--------------------------------------------------------------------------
    */

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

    /*
    |--------------------------------------------------------------------------
    | Create the new active verification version
    |--------------------------------------------------------------------------
    */

    const [insertResult] =
      await connection.execute(
        `
          INSERT INTO offer_verifications (
            offer_id,
            verification_public_id,
            verification_token_hash,
            document_sha256,
            document_size_bytes,
            document_original_name,
            document_version,
            status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?,
            'active'
          )
        `,
        [
          offerId,
          verificationPublicId,
          verificationTokenHash,
          documentSha256,
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