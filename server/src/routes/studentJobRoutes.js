import {
    Router,
  } from "express";
  
  import {
    getStudentJob,
    getStudentJobEligibility,
    getStudentJobs,
  } from "../controllers/studentJobController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const studentJobRouter =
    Router();
  
  studentJobRouter.use(
    authenticate,
    authorizeRoles("student")
  );
  
  studentJobRouter.get(
    "/jobs",
    getStudentJobs
  );
  
  studentJobRouter.get(
    "/jobs/:jobId/eligibility",
    getStudentJobEligibility
  );
  
  studentJobRouter.get(
    "/jobs/:jobId",
    getStudentJob
  );
  
  export default studentJobRouter;