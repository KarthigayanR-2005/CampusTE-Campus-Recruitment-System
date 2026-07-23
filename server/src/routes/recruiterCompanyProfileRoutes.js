import { Router } from "express";

import {
  getRecruiterCompanyProfile,
  updateRecruiterCompanyProfile,
} from "../controllers/recruiterCompanyProfileController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

const recruiterCompanyProfileRouter =
  Router();

recruiterCompanyProfileRouter.use(
  authenticate,
  authorizeRoles("recruiter")
);

recruiterCompanyProfileRouter.get(
  "/company-profile",
  getRecruiterCompanyProfile
);

recruiterCompanyProfileRouter.put(
  "/company-profile",
  updateRecruiterCompanyProfile
);

export default recruiterCompanyProfileRouter;