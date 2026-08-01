import databasePool from "../config/database.js";

import {
  createNotification,
} from "./notificationModel.js";

function formatDate(value) {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value
      .toISOString()
      .slice(0, 10);
  }

  return String(value).slice(
    0,
    10
  );
}

function formatDateTime(value) {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}

function mapOfferHistory(row) {
  return {
    historyId:
      String(
        row.history_id
      ),

    previousStatus:
      row.previous_status ||
      null,

    status:
      row.new_status,

    note:
      row.note || "",

    changedBy: {
      userId:
        row.changed_by_user_id
          ? String(
              row.changed_by_user_id
            )
          : null,

      fullName:
        row.changed_by_name ||
        "CampusTE System",
    },

    createdAt:
      formatDateTime(
        row.created_at
      ),
  };
}

function mapOffer(
  row,
  history = []
) {
  const status =
    row.effective_status ||
    row.status;

  return {
    offerId:
      String(
        row.offer_id
      ),

    applicationId:
      String(
        row.application_id
      ),

    recruiterUserId:
      String(
        row.recruiter_user_id
      ),

    studentUserId:
      String(
        row.student_user_id
      ),

    jobId:
      String(
        row.job_id
      ),

    designation:
      row.designation || "",

    compensation: {
      amount:
        Number(
          row.salary_amount ||
          0
        ),

      currency:
        row.currency_code ||
        "INR",

      period:
        row.salary_period ||
        "annual",
    },

    joiningDate:
      formatDate(
        row.joining_date
      ),

    workLocation:
      row.work_location ||
      "",

    offerExpiryDate:
      formatDate(
        row.offer_expiry_date
      ),

    employmentType:
      row.employment_type ||
      "",

    probationPeriod:
      row.probation_period ||
      "",

    terms:
      row.terms || "",

    status,

    applicationStatus:
      row.application_status ||
      "",

    company: {
      companyName:
        row.company_name ||
        "",

      industry:
        row.industry || "",

      headquarters:
        row.headquarters || "",

      website:
        row.website_url || "",
    },

    job: {
      jobTitle:
        row.job_title || "",

      department:
        row.job_department ||
        "",

      employmentType:
        row.job_employment_type ||
        "",

      workMode:
        row.work_mode || "",

      city:
        row.job_city || "",

      country:
        row.job_country || "",
    },

    student: {
      fullName:
        row.student_name || "",

      email:
        row.student_email || "",

      phone:
        row.student_phone || "",

      institution:
        row.student_institution ||
        "",

      department:
        row.student_department ||
        "",
    },

    recruiter: {
      fullName:
        row.recruiter_name ||
        "",

      email:
        row.recruiter_email ||
        "",
    },

    offerLetter: {
      available:
        Boolean(
          row.offer_letter_path
        ),

      originalFileName:
        row.offer_letter_original_name ||
        "",

      mimeType:
        row.offer_letter_mime_type ||
        "",

      sizeBytes:
        Number(
          row.offer_letter_size_bytes ||
          0
        ),
    },

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

    createdAt:
      formatDateTime(
        row.created_at
      ),

    updatedAt:
      formatDateTime(
        row.updated_at
      ),

    history,

    canEdit:
      status === "draft",

    canSend:
      status === "draft",

    canWithdraw:
      [
        "draft",
        "sent",
      ].includes(status),

    canRespond:
      status === "sent",
  };
}

const offerSelectQuery = `
  SELECT
    offer.offer_id,
    offer.application_id,
    offer.recruiter_user_id,
    offer.student_user_id,
    offer.job_id,
    offer.designation,
    offer.salary_amount,
    offer.currency_code,
    offer.salary_period,
    offer.joining_date,
    offer.work_location,
    offer.offer_expiry_date,
    offer.employment_type,
    offer.probation_period,
    offer.terms,
    offer.status,
    offer.sent_at,
    offer.responded_at,
    offer.accepted_at,
    offer.declined_at,
    offer.withdrawn_at,
    offer.offer_letter_original_name,
    offer.offer_letter_stored_name,
    offer.offer_letter_mime_type,
    offer.offer_letter_size_bytes,
    offer.offer_letter_path,
    offer.created_at,
    offer.updated_at,

    CASE
      WHEN
        offer.status = 'sent'
        AND offer.offer_expiry_date
            < CURRENT_DATE
      THEN 'expired'
      ELSE offer.status
    END AS effective_status,

    application.status
      AS application_status,

    student.full_name
      AS student_name,

    student.email
      AS student_email,

    student_profile.phone
      AS student_phone,

    student_profile.institution
      AS student_institution,

    student_profile.department
      AS student_department,

    recruiter.full_name
      AS recruiter_name,

    recruiter.email
      AS recruiter_email,

    job.job_title,

    job.department
      AS job_department,

    job.employment_type
      AS job_employment_type,

    job.work_mode,

    job.city
      AS job_city,

    job.country
      AS job_country,

    company.company_name,
    company.industry,
    company.headquarters,
    company.website_url

  FROM job_offers
    AS offer

  INNER JOIN student_job_applications
    AS application
    ON application.application_id =
       offer.application_id

  INNER JOIN users
    AS student
    ON student.user_id =
       offer.student_user_id

  INNER JOIN users
    AS recruiter
    ON recruiter.user_id =
       offer.recruiter_user_id

  LEFT JOIN student_profiles
    AS student_profile
    ON student_profile.user_id =
       offer.student_user_id

  INNER JOIN recruiter_jobs
    AS job
    ON job.job_id =
       offer.job_id

  LEFT JOIN recruiter_company_profiles
    AS company
    ON company.user_id =
       offer.recruiter_user_id
`;

export async function findOfferHistory(
  offerId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          history.history_id,
          history.offer_id,
          history.changed_by_user_id,
          history.previous_status,
          history.new_status,
          history.note,
          history.created_at,

          user.full_name
            AS changed_by_name

        FROM job_offer_status_history
          AS history

        LEFT JOIN users
          AS user
          ON user.user_id =
             history.changed_by_user_id

        WHERE
          history.offer_id = ?

        ORDER BY
          history.created_at ASC,
          history.history_id ASC
      `,
      [
        offerId,
      ]
    );

  return rows.map(
    mapOfferHistory
  );
}

export async function findRecruiterOffers(
  recruiterUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerSelectQuery}

        WHERE
          offer.recruiter_user_id = ?

        ORDER BY
          FIELD(
            effective_status,
            'draft',
            'sent',
            'accepted',
            'declined',
            'expired',
            'withdrawn'
          ),

          offer.created_at DESC,
          offer.offer_id DESC
      `,
      [
        recruiterUserId,
      ]
    );

  return rows.map(
    (row) =>
      mapOffer(row)
  );
}

export async function findRecruiterOfferById({
  recruiterUserId,
  offerId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerSelectQuery}

        WHERE
          offer.recruiter_user_id = ?

          AND offer.offer_id = ?

        LIMIT 1
      `,
      [
        recruiterUserId,
        offerId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  const history =
    await findOfferHistory(
      offerId
    );

  return mapOffer(
    rows[0],
    history
  );
}

export async function findStudentOffers(
  studentUserId
) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerSelectQuery}

        WHERE
          offer.student_user_id = ?

          AND offer.status <> 'draft'

        ORDER BY
          FIELD(
            effective_status,
            'sent',
            'accepted',
            'declined',
            'expired',
            'withdrawn'
          ),

          offer.sent_at DESC,
          offer.offer_id DESC
      `,
      [
        studentUserId,
      ]
    );

  return rows.map(
    (row) =>
      mapOffer(row)
  );
}

export async function findStudentOfferById({
  studentUserId,
  offerId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        ${offerSelectQuery}

        WHERE
          offer.student_user_id = ?

          AND offer.offer_id = ?

          AND offer.status <> 'draft'

        LIMIT 1
      `,
      [
        studentUserId,
        offerId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  const history =
    await findOfferHistory(
      offerId
    );

  return mapOffer(
    rows[0],
    history
  );
}

export async function createRecruiterOffer({
  recruiterUserId,
  applicationId,
  offerData,
}) {
  const connection =
    await databasePool
      .getConnection();

  try {
    await connection
      .beginTransaction();

    const [applicationRows] =
      await connection.execute(
        `
          SELECT
            application.application_id,
            application.student_user_id,
            application.job_id,
            application.status,

            job.job_title,

            company.company_name

          FROM student_job_applications
            AS application

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id =
               application.job_id

          LEFT JOIN recruiter_company_profiles
            AS company
            ON company.user_id =
               job.recruiter_user_id

          WHERE
            application.application_id = ?

            AND job.recruiter_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          applicationId,
          recruiterUserId,
        ]
      );

    if (!applicationRows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    const application =
      applicationRows[0];

    if (
      application.status !==
      "selected"
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_application_status",
      };
    }

    const [existingRows] =
      await connection.execute(
        `
          SELECT
            offer_id

          FROM job_offers

          WHERE
            application_id = ?

          LIMIT 1
        `,
        [
          applicationId,
        ]
      );

    if (existingRows[0]) {
      await connection.rollback();

      return {
        result:
          "already_exists",

        offerId:
          String(
            existingRows[0]
              .offer_id
          ),
      };
    }

    const [result] =
      await connection.execute(
        `
          INSERT INTO job_offers (
            application_id,
            recruiter_user_id,
            student_user_id,
            job_id,
            designation,
            salary_amount,
            currency_code,
            salary_period,
            joining_date,
            work_location,
            offer_expiry_date,
            employment_type,
            probation_period,
            terms,
            status
          )
          VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?,
            ?, ?, ?, ?, ?, 'draft'
          )
        `,
        [
          applicationId,
          recruiterUserId,
          application.student_user_id,
          application.job_id,
          offerData.designation,
          offerData.salaryAmount,
          offerData.currencyCode,
          offerData.salaryPeriod,
          offerData.joiningDate,
          offerData.workLocation,
          offerData.offerExpiryDate,
          offerData.employmentType ||
            null,
          offerData.probationPeriod ||
            null,
          offerData.terms ||
            null,
        ]
      );

    const offerId =
      result.insertId;

    await connection.execute(
      `
        INSERT INTO job_offer_status_history (
          offer_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, NULL, 'draft', ?)
      `,
      [
        offerId,
        recruiterUserId,
        "Offer draft created by the Recruiter.",
      ]
    );

    await connection.commit();

    const offer =
      await findRecruiterOfferById({
        recruiterUserId,
        offerId,
      });

    return {
      result:
        "success",

      offer,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function updateRecruiterOffer({
  recruiterUserId,
  offerId,
  offerData,
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
          SELECT
            offer_id,
            status

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

    await connection.execute(
      `
        UPDATE job_offers

        SET
          designation = ?,
          salary_amount = ?,
          currency_code = ?,
          salary_period = ?,
          joining_date = ?,
          work_location = ?,
          offer_expiry_date = ?,
          employment_type = ?,
          probation_period = ?,
          terms = ?

        WHERE
          offer_id = ?

          AND recruiter_user_id = ?
      `,
      [
        offerData.designation,
        offerData.salaryAmount,
        offerData.currencyCode,
        offerData.salaryPeriod,
        offerData.joiningDate,
        offerData.workLocation,
        offerData.offerExpiryDate,
        offerData.employmentType ||
          null,
        offerData.probationPeriod ||
          null,
        offerData.terms ||
          null,
        offerId,
        recruiterUserId,
      ]
    );

    await connection.commit();

    const offer =
      await findRecruiterOfferById({
        recruiterUserId,
        offerId,
      });

    return {
      result:
        "success",

      offer,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function sendRecruiterOffer({
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
          SELECT
            offer.offer_id,
            offer.application_id,
            offer.student_user_id,
            offer.job_id,
            offer.status,
            offer.designation,
            offer.salary_amount,
            offer.currency_code,
            offer.offer_expiry_date,

            job.job_title,

            company.company_name

          FROM job_offers
            AS offer

          INNER JOIN recruiter_jobs
            AS job
            ON job.job_id =
               offer.job_id

          LEFT JOIN recruiter_company_profiles
            AS company
            ON company.user_id =
               offer.recruiter_user_id

          WHERE
            offer.offer_id = ?

            AND offer.recruiter_user_id = ?

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

    const offer =
      rows[0];

    if (
      offer.status !==
      "draft"
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_status",
      };
    }

    const today =
      new Date()
        .toISOString()
        .slice(0, 10);

    if (
      formatDate(
        offer.offer_expiry_date
      ) < today
    ) {
      await connection.rollback();

      return {
        result:
          "expired",
      };
    }

    await connection.execute(
      `
        UPDATE job_offers

        SET
          status = 'sent',
          sent_at =
            CURRENT_TIMESTAMP

        WHERE
          offer_id = ?
      `,
      [
        offerId,
      ]
    );

    await connection.execute(
      `
        INSERT INTO job_offer_status_history (
          offer_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, 'draft', 'sent', ?)
      `,
      [
        offerId,
        recruiterUserId,
        "Offer sent to the Student.",
      ]
    );

    const companyName =
      offer.company_name ||
      "The company";

    await createNotification({
      recipientUserId:
        offer.student_user_id,

      actorUserId:
        recruiterUserId,

      category:
        "application",

      notificationType:
        "job_offer_received",

      title:
        "Job offer received",

      message:
        `${companyName} sent you an offer for the ${offer.designation} position.`,

      actionUrl:
        "/student/applications",

      referenceType:
        "offer",

      referenceId:
        offerId,

      metadata: {
        offerId:
          String(
            offerId
          ),

        applicationId:
          String(
            offer.application_id
          ),

        jobId:
          String(
            offer.job_id
          ),

        jobTitle:
          offer.job_title,

        designation:
          offer.designation,

        companyName,

        salaryAmount:
          Number(
            offer.salary_amount
          ),

        currencyCode:
          offer.currency_code,

        offerExpiryDate:
          formatDate(
            offer.offer_expiry_date
          ),
      },

      connection,
    });

    await connection.commit();

    const updatedOffer =
      await findRecruiterOfferById({
        recruiterUserId,
        offerId,
      });

    return {
      result:
        "success",

      offer:
        updatedOffer,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function withdrawRecruiterOffer({
  recruiterUserId,
  offerId,
  note,
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
          SELECT
            offer.offer_id,
            offer.application_id,
            offer.student_user_id,
            offer.job_id,
            offer.status,
            offer.designation,

            company.company_name

          FROM job_offers
            AS offer

          LEFT JOIN recruiter_company_profiles
            AS company
            ON company.user_id =
               offer.recruiter_user_id

          WHERE
            offer.offer_id = ?

            AND offer.recruiter_user_id = ?

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

    const offer =
      rows[0];

    if (
      ![
        "draft",
        "sent",
      ].includes(
        offer.status
      )
    ) {
      await connection.rollback();

      return {
        result:
          "invalid_status",
      };
    }

    const previousStatus =
      offer.status;

    await connection.execute(
      `
        UPDATE job_offers

        SET
          status = 'withdrawn',
          withdrawn_at =
            CURRENT_TIMESTAMP

        WHERE
          offer_id = ?
      `,
      [
        offerId,
      ]
    );

    await connection.execute(
      `
        INSERT INTO job_offer_status_history (
          offer_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, ?, 'withdrawn', ?)
      `,
      [
        offerId,
        recruiterUserId,
        previousStatus,
        note ||
          "Offer withdrawn by the Recruiter.",
      ]
    );

    if (
      previousStatus ===
      "sent"
    ) {
      const companyName =
        offer.company_name ||
        "The company";

      await createNotification({
        recipientUserId:
          offer.student_user_id,

        actorUserId:
          recruiterUserId,

        category:
          "application",

        notificationType:
          "job_offer_withdrawn",

        title:
          "Job offer withdrawn",

        message:
          `${companyName} withdrew the offer for the ${offer.designation} position.`,

        actionUrl:
          "/student/applications",

        referenceType:
          "offer",

        referenceId:
          offerId,

        metadata: {
          offerId:
            String(
              offerId
            ),

          applicationId:
            String(
              offer.application_id
            ),

          jobId:
            String(
              offer.job_id
            ),

          designation:
            offer.designation,

          companyName,

          note:
            note || "",
        },

        connection,
      });
    }

    await connection.commit();

    const updatedOffer =
      await findRecruiterOfferById({
        recruiterUserId,
        offerId,
      });

    return {
      result:
        "success",

      offer:
        updatedOffer,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}

export async function respondToStudentOffer({
  studentUserId,
  offerId,
  responseStatus,
  note,
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
          SELECT
            offer.offer_id,
            offer.application_id,
            offer.recruiter_user_id,
            offer.student_user_id,
            offer.job_id,
            offer.status,
            offer.designation,
            offer.offer_expiry_date,

            student.full_name
              AS student_name,

            job.job_title,

            company.company_name

          FROM job_offers
            AS offer

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
            offer.offer_id = ?

            AND offer.student_user_id = ?

          LIMIT 1

          FOR UPDATE
        `,
        [
          offerId,
          studentUserId,
        ]
      );

    if (!rows[0]) {
      await connection.rollback();

      return {
        result:
          "not_found",
      };
    }

    const offer =
      rows[0];

    if (
      offer.status !==
      "sent"
    ) {
      await connection.rollback();

      return {
        result:
          "already_responded",

        status:
          offer.status,
      };
    }

    const today =
      new Date()
        .toISOString()
        .slice(0, 10);

    if (
      formatDate(
        offer.offer_expiry_date
      ) < today
    ) {
      await connection.execute(
        `
          UPDATE job_offers

          SET
            status = 'expired'

          WHERE
            offer_id = ?
        `,
        [
          offerId,
        ]
      );

      await connection.execute(
        `
          INSERT INTO job_offer_status_history (
            offer_id,
            changed_by_user_id,
            previous_status,
            new_status,
            note
          )
          VALUES (?, NULL, 'sent', 'expired', ?)
        `,
        [
          offerId,
          "Offer expired before the Student responded.",
        ]
      );

      await connection.commit();

      return {
        result:
          "expired",
      };
    }

    const accepted =
      responseStatus ===
      "accepted";

    await connection.execute(
      `
        UPDATE job_offers

        SET
          status = ?,
          responded_at =
            CURRENT_TIMESTAMP,

          accepted_at =
            CASE
              WHEN ? = 'accepted'
              THEN CURRENT_TIMESTAMP
              ELSE NULL
            END,

          declined_at =
            CASE
              WHEN ? = 'declined'
              THEN CURRENT_TIMESTAMP
              ELSE NULL
            END

        WHERE
          offer_id = ?
      `,
      [
        responseStatus,
        responseStatus,
        responseStatus,
        offerId,
      ]
    );

    await connection.execute(
      `
        INSERT INTO job_offer_status_history (
          offer_id,
          changed_by_user_id,
          previous_status,
          new_status,
          note
        )
        VALUES (?, ?, 'sent', ?, ?)
      `,
      [
        offerId,
        studentUserId,
        responseStatus,
        note ||
          (
            accepted
              ? "Student accepted the offer."
              : "Student declined the offer."
          ),
      ]
    );

    const companyName =
      offer.company_name ||
      "the company";

    await createNotification({
      recipientUserId:
        offer.recruiter_user_id,

      actorUserId:
        studentUserId,

      category:
        "application",

      notificationType:
        accepted
          ? "job_offer_accepted"
          : "job_offer_declined",

      title:
        accepted
          ? "Student accepted the offer"
          : "Student declined the offer",

      message:
        `${offer.student_name} ${
          accepted
            ? "accepted"
            : "declined"
        } the ${offer.designation} offer from ${companyName}.`,

      actionUrl:
        "/recruiter/applicants",

      referenceType:
        "offer",

      referenceId:
        offerId,

      metadata: {
        offerId:
          String(
            offerId
          ),

        applicationId:
          String(
            offer.application_id
          ),

        jobId:
          String(
            offer.job_id
          ),

        jobTitle:
          offer.job_title,

        designation:
          offer.designation,

        companyName,

        studentName:
          offer.student_name,

        responseStatus,

        note:
          note || "",
      },

      connection,
    });

    await connection.commit();

    const updatedOffer =
      await findStudentOfferById({
        studentUserId,
        offerId,
      });

    return {
      result:
        "success",

      offer:
        updatedOffer,
    };
  } catch (error) {
    await connection.rollback();

    throw error;
  } finally {
    connection.release();
  }
}