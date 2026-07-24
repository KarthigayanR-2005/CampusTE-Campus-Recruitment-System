import {
    Router,
  } from "express";
  
  import {
    changeRecruiterApplicantStatus,
    getRecruiterApplicant,
    getRecruiterApplicantResume,
    getRecruiterApplicants,
  } from "../controllers/recruiterApplicantController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const recruiterApplicantRouter =
    Router();
  
  recruiterApplicantRouter.use(
    authenticate,
    authorizeRoles("recruiter")
  );
  
  recruiterApplicantRouter.get(
    "/applications",
    getRecruiterApplicants
  );
  
  recruiterApplicantRouter.get(
    "/applications/:applicationId/resume",
    getRecruiterApplicantResume
  );
  
  recruiterApplicantRouter.get(
    "/applications/:applicationId",
    getRecruiterApplicant
  );
  
  recruiterApplicantRouter.patch(
    "/applications/:applicationId/status",
    changeRecruiterApplicantStatus
  );
  
  export default recruiterApplicantRouter;