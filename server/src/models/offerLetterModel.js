import databasePool from "../config/database.js";

function mapOfferLetter(row) {
  if (!row) {
    return null;
  }

  return {
    offerId:
      String(
        row.offer_id
      ),

    recruiterUserId:
      String(
        row.recruiter_user_id
      ),

    studentUserId:
      String(
        row.student_user_id
      ),

    status:
      row.status,

    originalFileName:
      row.offer_letter_original_name ||
      "",

    storedFileName:
      row.offer_letter_stored_name ||
      "",

    mimeType:
      row.offer_letter_mime_type ||
      "",

    sizeBytes:
      Number(
        row.offer_letter_size_bytes ||
        0
      ),

    filePath:
      row.offer_letter_path ||
      "",

    available:
      Boolean(
        row.offer_letter_path
      ),
  };
}

const offerLetterSelect = `
  SELECT
    offer_id,
    recruiter_user_id,
    student_user_id,
    status,
    offer_letter_original_name,
    offer_letter_stored_name,
    offer_letter_mime_type,
    offer_letter_size_bytes,
    offer_letter_path

  FROM job_offers
`;

export async function findRecruiterOfferLetter({
  recruiterUserId,
  offerId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerLetterSelect}

        WHERE
          offer_id = ?

          AND recruiter_user_id = ?

        LIMIT 1
      `,
      [
        offerId,
        recruiterUserId,
      ]
    );

  return mapOfferLetter(
    rows[0]
  );
}

export async function findStudentOfferLetter({
  studentUserId,
  offerId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerLetterSelect}

        WHERE
          offer_id = ?

          AND student_user_id = ?

          AND status <> 'draft'

        LIMIT 1
      `,
      [
        offerId,
        studentUserId,
      ]
    );

  return mapOfferLetter(
    rows[0]
  );
}

export async function saveRecruiterOfferLetter({
  recruiterUserId,
  offerId,
  originalFileName,
  storedFileName,
  mimeType,
  sizeBytes,
  filePath,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [rows] =
      await connection.execute(
        `
          ${offerLetterSelect}

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

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    if (
      rows[0].status !==
      "draft"
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_status",
      };
    }

    const previousFilePath =
      rows[0]
        .offer_letter_path ||
      "";

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

    await connection.commit();

    const offerLetter =
      await findRecruiterOfferLetter({
        recruiterUserId,
        offerId,
      });

    return {
      result:
        "success",

      previousFilePath,
      offerLetter,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function clearRecruiterOfferLetter({
  recruiterUserId,
  offerId,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [rows] =
      await connection.execute(
        `
          ${offerLetterSelect}

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

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    if (
      rows[0].status !==
      "draft"
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_status",
      };
    }

    if (
      !rows[0]
        .offer_letter_path
    ) {
      await connection.rollback();

      return {
        result:
          "no_file",
      };
    }

    const previousFilePath =
      rows[0]
        .offer_letter_path;

    await connection.execute(
      `
        UPDATE job_offers

        SET
          offer_letter_original_name = NULL,
          offer_letter_stored_name = NULL,
          offer_letter_mime_type = NULL,
          offer_letter_size_bytes = NULL,
          offer_letter_path = NULL

        WHERE
          offer_id = ?

          AND recruiter_user_id = ?
      `,
      [
        offerId,
        recruiterUserId,
      ]
    );

    await connection.commit();

    return {
      result:
        "success",

      previousFilePath,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}