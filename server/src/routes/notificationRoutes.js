import {
    Router,
  } from "express";
  
  import {
    getNotification,
    getNotifications,
    markAllNotificationsRead,
    markNotificationRead,
    removeNotification,
  } from "../controllers/notificationController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  const notificationRouter =
    Router();
  
  notificationRouter.use(
    authenticate
  );
  
  notificationRouter.get(
    "/notifications",
    getNotifications
  );
  
  notificationRouter.get(
    "/notifications/:notificationId",
    getNotification
  );
  
  notificationRouter.patch(
    "/notifications/:notificationId/read",
    markNotificationRead
  );
  
  notificationRouter.patch(
    "/notifications/read-all",
    markAllNotificationsRead
  );
  
  notificationRouter.delete(
    "/notifications/:notificationId",
    removeNotification
  );
  
  export default notificationRouter;