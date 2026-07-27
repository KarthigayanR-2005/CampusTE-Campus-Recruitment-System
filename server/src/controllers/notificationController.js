import {
    countUnreadNotifications,
    deleteUserNotification,
    findUserNotificationById,
    findUserNotifications,
    markAllUserNotificationsRead,
    markUserNotificationRead,
  } from "../models/notificationModel.js";
  
  const validFilters = [
    "all",
    "unread",
    "read",
  ];
  
  const validCategories = [
    "application",
    "interview",
    "job",
    "account",
    "system",
  ];
  
  function readText(value) {
    return typeof value ===
      "string"
      ? value.trim()
      : "";
  }
  
  function parsePositiveId(value) {
    const parsedValue =
      Number(value);
  
    return Number.isInteger(
      parsedValue
    ) &&
    parsedValue > 0
      ? parsedValue
      : null;
  }
  
  function parseLimit(value) {
    if (!value) {
      return 50;
    }
  
    const parsedValue =
      Number(value);
  
    if (
      !Number.isInteger(
        parsedValue
      ) ||
      parsedValue < 1
    ) {
      return null;
    }
  
    return Math.min(
      parsedValue,
      100
    );
  }
  
  export async function getNotifications(
    request,
    response
  ) {
    try {
      const filter =
        readText(
          request.query.filter
        ).toLowerCase() ||
        "all";
  
      const category =
        readText(
          request.query.category
        ).toLowerCase();
  
      const limit =
        parseLimit(
          request.query.limit
        );
  
      if (
        !validFilters.includes(
          filter
        )
      ) {
        return response.status(400).json({
          success: false,
  
          message:
            "Invalid notification filter.",
        });
      }
  
      if (
        category &&
        !validCategories.includes(
          category
        )
      ) {
        return response.status(400).json({
          success: false,
  
          message:
            "Invalid notification category.",
        });
      }
  
      if (!limit) {
        return response.status(400).json({
          success: false,
  
          message:
            "Notification limit must be between 1 and 100.",
        });
      }
  
      const [
        notifications,
        unreadCount,
      ] = await Promise.all([
        findUserNotifications({
          userId:
            request.auth.userId,
  
          filter,
          category,
          limit,
        }),
  
        countUnreadNotifications(
          request.auth.userId
        ),
      ]);
  
      return response.status(200).json({
        success: true,
        notifications,
        unreadCount,
      });
    } catch (error) {
      console.error(
        "Get notifications error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to retrieve notifications.",
      });
    }
  }
  
  export async function getNotification(
    request,
    response
  ) {
    try {
      const notificationId =
        parsePositiveId(
          request.params
            .notificationId
        );
  
      if (!notificationId) {
        return response.status(400).json({
          success: false,
  
          message:
            "A valid notification ID is required.",
        });
      }
  
      const notification =
        await findUserNotificationById({
          userId:
            request.auth.userId,
  
          notificationId,
        });
  
      if (!notification) {
        return response.status(404).json({
          success: false,
  
          message:
            "Notification was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        notification,
      });
    } catch (error) {
      console.error(
        "Get notification error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to retrieve the notification.",
      });
    }
  }
  
  export async function markNotificationRead(
    request,
    response
  ) {
    try {
      const notificationId =
        parsePositiveId(
          request.params
            .notificationId
        );
  
      if (!notificationId) {
        return response.status(400).json({
          success: false,
  
          message:
            "A valid notification ID is required.",
        });
      }
  
      const notification =
        await markUserNotificationRead({
          userId:
            request.auth.userId,
  
          notificationId,
        });
  
      if (!notification) {
        return response.status(404).json({
          success: false,
  
          message:
            "Notification was not found.",
        });
      }
  
      const unreadCount =
        await countUnreadNotifications(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
  
        message:
          "Notification marked as read.",
  
        notification,
        unreadCount,
      });
    } catch (error) {
      console.error(
        "Mark notification read error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to update the notification.",
      });
    }
  }
  
  export async function markAllNotificationsRead(
    request,
    response
  ) {
    try {
      const updatedCount =
        await markAllUserNotificationsRead(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
  
        message:
          "All notifications were marked as read.",
  
        updatedCount,
        unreadCount: 0,
      });
    } catch (error) {
      console.error(
        "Mark all notifications read error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to update notifications.",
      });
    }
  }
  
  export async function removeNotification(
    request,
    response
  ) {
    try {
      const notificationId =
        parsePositiveId(
          request.params
            .notificationId
        );
  
      if (!notificationId) {
        return response.status(400).json({
          success: false,
  
          message:
            "A valid notification ID is required.",
        });
      }
  
      const deleted =
        await deleteUserNotification({
          userId:
            request.auth.userId,
  
          notificationId,
        });
  
      if (!deleted) {
        return response.status(404).json({
          success: false,
  
          message:
            "Notification was not found.",
        });
      }
  
      const unreadCount =
        await countUnreadNotifications(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
  
        message:
          "Notification deleted successfully.",
  
        unreadCount,
      });
    } catch (error) {
      console.error(
        "Delete notification error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to delete the notification.",
      });
    }
  }