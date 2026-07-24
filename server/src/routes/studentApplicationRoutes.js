import {
    Router,
  } from "express";
  
  import {
    applyForStudentJob,
    getStudentApplication,
    getStudentApplications,
    withdrawApplication,
  } from "../controllers/studentApplicationController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const studentApplicationRouter =
    Router();
  
  studentApplicationRouter.use(
    authenticate,
    authorizeRoles("student")
  );
  
  studentApplicationRouter.post(
    "/jobs/:jobId/apply",
    applyForStudentJob
  );
  
  studentApplicationRouter.get(
    "/applications",
    getStudentApplications
  );
  
  studentApplicationRouter.get(
    "/applications/:applicationId",
    getStudentApplication
  );
  
  studentApplicationRouter.patch(
    "/applications/:applicationId/withdraw",
    withdrawApplication
  );
  
  export default studentApplicationRouter;