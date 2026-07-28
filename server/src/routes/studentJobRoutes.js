import {
  Router,
} from "express";

import {
  getStudentJob,
  getStudentJobEligibility,
  getStudentJobInvitations,
  getStudentJobs,
  respondToJobInvitation,
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

/*
|--------------------------------------------------------------------------
| Recruiter job invitations
|--------------------------------------------------------------------------
*/

studentJobRouter.get(
  "/job-invitations",
  getStudentJobInvitations
);

studentJobRouter.patch(
  "/job-invitations/:invitationId/respond",
  respondToJobInvitation
);

/*
|--------------------------------------------------------------------------
| Published jobs
|--------------------------------------------------------------------------
*/

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