import databasePool from "../config/database.js";

function parseMetadata(value) {
  if (!value) {
    return {};
  }

  if (Buffer.isBuffer(value)) {
    try {
      return JSON.parse(
        value.toString("utf8")
      );
    } catch {
      return {};
    }
  }

  if (
    typeof value === "object"
  ) {
    return value;
  }

  try {
    return JSON.parse(
      String(value)
    );
  } catch {
    return {};
  }
}

function formatDateTime(value) {
  if (!value) {
    return null;
  }

  if (
    value instanceof Date
  ) {
    return value.toISOString();
  }

  return String(value);
}

function normalizeLimit(value) {
  const parsedLimit =
    Number.parseInt(
      String(value),
      10
    );

  if (
    !Number.isInteger(
      parsedLimit
    ) ||
    parsedLimit < 1
  ) {
    return 50;
  }

  return Math.min(
    parsedLimit,
    100
  );
}

function mapNotification(row) {
  return {
    notificationId:
      String(
        row.notification_id
      ),

    category:
      row.category ||
      "system",

    type:
      row.notification_type ||
      "",

    title:
      row.title ||
      "",

    message:
      row.message ||
      "",

    actionUrl:
      row.action_url ||
      "",

    reference: {
      type:
        row.reference_type ||
        "",

      id:
        row.reference_id !==
          null &&
        row.reference_id !==
          undefined
          ? String(
              row.reference_id
            )
          : null,
    },

    actor: {
      userId:
        row.actor_user_id !==
          null &&
        row.actor_user_id !==
          undefined
          ? String(
              row.actor_user_id
            )
          : null,

      fullName:
        row.actor_name ||
        "",
    },

    metadata:
      parseMetadata(
        row.metadata
      ),

    isRead:
      Number(
        row.is_read
      ) === 1,

    readAt:
      formatDateTime(
        row.read_at
      ),

    createdAt:
      formatDateTime(
        row.created_at
      ),

    updatedAt:
      formatDateTime(
        row.updated_at
      ),
  };
}

export async function createNotification({
  recipientUserId,
  actorUserId = null,
  category = "system",
  notificationType,
  title,
  message,
  actionUrl = null,
  referenceType = null,
  referenceId = null,
  metadata = null,
  connection = null,
}) {
  const database =
    connection ||
    databasePool;

  const metadataValue =
    metadata
      ? JSON.stringify(
          metadata
        )
      : null;

  const [result] =
    await database.execute(
      `
        INSERT INTO notifications (
          recipient_user_id,
          actor_user_id,
          category,
          notification_type,
          title,
          message,
          action_url,
          reference_type,
          reference_id,
          metadata
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        recipientUserId,
        actorUserId,
        category,
        notificationType,
        title,
        message,
        actionUrl,
        referenceType,
        referenceId,
        metadataValue,
      ]
    );

  return String(
    result.insertId
  );
}

export async function findUserNotifications({
  userId,
  filter = "all",
  category = "",
  limit = 50,
}) {
  const conditions = [
    "notification.recipient_user_id = ?",
  ];

  const parameters = [
    userId,
  ];

  if (
    filter === "unread"
  ) {
    conditions.push(
      "notification.is_read = 0"
    );
  }

  if (
    filter === "read"
  ) {
    conditions.push(
      "notification.is_read = 1"
    );
  }

  if (category) {
    conditions.push(
      "notification.category = ?"
    );

    parameters.push(
      category
    );
  }

  const safeLimit =
    normalizeLimit(limit);

  const [rows] =
    await databasePool.execute(
      `
        SELECT
          notification.notification_id,
          notification.recipient_user_id,
          notification.actor_user_id,
          notification.category,
          notification.notification_type,
          notification.title,
          notification.message,
          notification.action_url,
          notification.reference_type,
          notification.reference_id,
          notification.metadata,
          notification.is_read,
          notification.read_at,
          notification.created_at,
          notification.updated_at,

          actor.full_name
            AS actor_name

        FROM notifications
          AS notification

        LEFT JOIN users
          AS actor
          ON actor.user_id =
             notification.actor_user_id

        WHERE
          ${conditions.join(
            " AND "
          )}

        ORDER BY
          notification.created_at DESC,
          notification.notification_id DESC

        LIMIT ${safeLimit}
      `,
      parameters
    );

  return rows.map(
    mapNotification
  );
}

export async function countUnreadNotifications(
  userId
) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          COUNT(*) AS unread_count

        FROM notifications

        WHERE
          recipient_user_id = ?
          AND is_read = 0
      `,
      [
        userId,
      ]
    );

  return Number(
    rows[0]?.unread_count ||
    0
  );
}

export async function findUserNotificationById({
  userId,
  notificationId,
}) {
  const [rows] =
    await databasePool.execute(
      `
        SELECT
          notification.notification_id,
          notification.recipient_user_id,
          notification.actor_user_id,
          notification.category,
          notification.notification_type,
          notification.title,
          notification.message,
          notification.action_url,
          notification.reference_type,
          notification.reference_id,
          notification.metadata,
          notification.is_read,
          notification.read_at,
          notification.created_at,
          notification.updated_at,

          actor.full_name
            AS actor_name

        FROM notifications
          AS notification

        LEFT JOIN users
          AS actor
          ON actor.user_id =
             notification.actor_user_id

        WHERE
          notification.notification_id = ?
          AND notification.recipient_user_id = ?

        LIMIT 1
      `,
      [
        notificationId,
        userId,
      ]
    );

  if (!rows[0]) {
    return null;
  }

  return mapNotification(
    rows[0]
  );
}

export async function markUserNotificationRead({
  userId,
  notificationId,
}) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE notifications

        SET
          is_read = 1,

          read_at =
            COALESCE(
              read_at,
              CURRENT_TIMESTAMP
            )

        WHERE
          notification_id = ?
          AND recipient_user_id = ?
      `,
      [
        notificationId,
        userId,
      ]
    );

  if (
    result.affectedRows ===
    0
  ) {
    return null;
  }

  return findUserNotificationById({
    userId,
    notificationId,
  });
}

export async function markAllUserNotificationsRead(
  userId
) {
  const [result] =
    await databasePool.execute(
      `
        UPDATE notifications

        SET
          is_read = 1,

          read_at =
            COALESCE(
              read_at,
              CURRENT_TIMESTAMP
            )

        WHERE
          recipient_user_id = ?
          AND is_read = 0
      `,
      [
        userId,
      ]
    );

  return Number(
    result.affectedRows ||
    0
  );
}

export async function deleteUserNotification({
  userId,
  notificationId,
}) {
  const [result] =
    await databasePool.execute(
      `
        DELETE FROM notifications

        WHERE
          notification_id = ?
          AND recipient_user_id = ?
      `,
      [
        notificationId,
        userId,
      ]
    );

  return (
    result.affectedRows >
    0
  );
}