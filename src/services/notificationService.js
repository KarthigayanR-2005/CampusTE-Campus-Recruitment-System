import {
    apiRequest,
  } from "./apiClient";
  
  export const
    NOTIFICATIONS_CHANGED_EVENT =
      "campuste:notifications-changed";
  
  export function publishNotificationCount(
    unreadCount
  ) {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }
  
    window.dispatchEvent(
      new CustomEvent(
        NOTIFICATIONS_CHANGED_EVENT,
        {
          detail: {
            unreadCount:
              Number(
                unreadCount || 0
              ),
          },
        }
      )
    );
  }
  
  export function getNotificationsRequest({
    token,
    filter = "all",
    category = "",
    limit = 100,
  }) {
    const searchParams =
      new URLSearchParams();
  
    if (filter) {
      searchParams.set(
        "filter",
        filter
      );
    }
  
    if (category) {
      searchParams.set(
        "category",
        category
      );
    }
  
    searchParams.set(
      "limit",
      String(limit)
    );
  
    return apiRequest(
      `/notifications?${searchParams.toString()}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getNotificationRequest({
    token,
    notificationId,
  }) {
    return apiRequest(
      `/notifications/${notificationId}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export async function markNotificationReadRequest({
    token,
    notificationId,
  }) {
    const response =
      await apiRequest(
        `/notifications/${notificationId}/read`,
        {
          method: "PATCH",
          token,
        }
      );
  
    publishNotificationCount(
      response.unreadCount
    );
  
    return response;
  }
  
  export async function markAllNotificationsReadRequest({
    token,
  }) {
    const response =
      await apiRequest(
        "/notifications/read-all",
        {
          method: "PATCH",
          token,
        }
      );
  
    publishNotificationCount(
      response.unreadCount
    );
  
    return response;
  }
  
  export async function deleteNotificationRequest({
    token,
    notificationId,
  }) {
    const response =
      await apiRequest(
        `/notifications/${notificationId}`,
        {
          method: "DELETE",
          token,
        }
      );
  
    publishNotificationCount(
      response.unreadCount
    );
  
    return response;
  }
  
  export async function getUnreadNotificationCountRequest({
    token,
  }) {
    const response =
      await getNotificationsRequest({
        token,
        filter: "all",
        limit: 1,
      });
  
    const unreadCount =
      Number(
        response.unreadCount ||
        0
      );
  
    return {
      unreadCount,
    };
  }