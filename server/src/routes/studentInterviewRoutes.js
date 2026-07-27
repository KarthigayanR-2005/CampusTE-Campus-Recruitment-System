import {
    Router,
  } from "express";
  
  import {
    getStudentInterview,
    getStudentInterviews,
  } from "../controllers/studentInterviewController.js";
  
  import {
    authenticate,
  } from "../middleware/authenticate.js";
  
  import {
    authorizeRoles,
  } from "../middleware/authorizeRoles.js";
  
  const studentInterviewRouter =
    Router();
  
  studentInterviewRouter.use(
    authenticate,
    authorizeRoles("student")
  );
  
  studentInterviewRouter.get(
    "/interviews",
    getStudentInterviews
  );
  
  studentInterviewRouter.get(
    "/interviews/:applicationId",
    getStudentInterview
  );
  
  export default studentInterviewRouter;