import {
    Router,
  } from "express";
  
  import {
    cancelInterview,
    getRecruiterInterview,
    getRecruiterInterviews,
    rescheduleInterview,
  } from "../controllers/recruiterInterviewController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const recruiterInterviewRouter =
    Router();
  
  recruiterInterviewRouter.use(
    authenticate,
    authorizeRoles("recruiter")
  );
  
  recruiterInterviewRouter.get(
    "/interviews",
    getRecruiterInterviews
  );
  
  recruiterInterviewRouter.get(
    "/interviews/:applicationId",
    getRecruiterInterview
  );
  
  recruiterInterviewRouter.patch(
    "/interviews/:applicationId/reschedule",
    rescheduleInterview
  );
  
  recruiterInterviewRouter.patch(
    "/interviews/:applicationId/cancel",
    cancelInterview
  );
  
  export default recruiterInterviewRouter;