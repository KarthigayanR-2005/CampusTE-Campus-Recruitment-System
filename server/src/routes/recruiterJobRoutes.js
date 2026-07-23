import {
    Router,
  } from "express";
  
  import {
    addRecruiterJob,
    changeRecruiterJobStatus,
    copyRecruiterJob,
    editRecruiterJob,
    getRecruiterJob,
    getRecruiterJobs,
    removeRecruiterJob,
  } from "../controllers/recruiterJobController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const recruiterJobRouter =
    Router();
  
  recruiterJobRouter.use(
    authenticate,
    authorizeRoles("recruiter")
  );
  
  recruiterJobRouter.get(
    "/jobs",
    getRecruiterJobs
  );
  
  recruiterJobRouter.get(
    "/jobs/:jobId",
    getRecruiterJob
  );
  
  recruiterJobRouter.post(
    "/jobs",
    addRecruiterJob
  );
  
  recruiterJobRouter.put(
    "/jobs/:jobId",
    editRecruiterJob
  );
  
  recruiterJobRouter.patch(
    "/jobs/:jobId/status",
    changeRecruiterJobStatus
  );
  
  recruiterJobRouter.post(
    "/jobs/:jobId/duplicate",
    copyRecruiterJob
  );
  
  recruiterJobRouter.delete(
    "/jobs/:jobId",
    removeRecruiterJob
  );
  
  export default recruiterJobRouter;