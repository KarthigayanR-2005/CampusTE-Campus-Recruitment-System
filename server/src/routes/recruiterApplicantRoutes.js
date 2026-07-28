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
  getCandidateJobOptions,
  getRecruiterCandidate,
  getRecruiterCandidateResume,
  getRecruiterCandidates,
  inviteCandidate,
  removeSavedCandidate,
  saveCandidate,
} from "../controllers/recruiterCandidateController.js";

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

/*
|--------------------------------------------------------------------------
| Recruiter applicants
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Candidate discovery
|--------------------------------------------------------------------------
*/

recruiterApplicantRouter.get(
  "/candidates",
  getRecruiterCandidates
);

recruiterApplicantRouter.get(
  "/candidate-jobs",
  getCandidateJobOptions
);

recruiterApplicantRouter.get(
  "/candidates/:studentUserId/resume",
  getRecruiterCandidateResume
);

recruiterApplicantRouter.get(
  "/candidates/:studentUserId",
  getRecruiterCandidate
);

recruiterApplicantRouter.post(
  "/candidates/:studentUserId/save",
  saveCandidate
);

recruiterApplicantRouter.delete(
  "/candidates/:studentUserId/save",
  removeSavedCandidate
);

recruiterApplicantRouter.post(
  "/candidates/:studentUserId/invite",
  inviteCandidate
);

export default recruiterApplicantRouter;