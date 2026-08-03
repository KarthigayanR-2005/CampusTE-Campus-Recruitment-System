import {
  Router,
} from "express";

import {
  deleteRecruiterAuthorizedSignature,
  deleteRecruiterCompanyLogo,
  getRecruiterAuthorizedSignatureFile,
  getRecruiterCompanyLogoFile,
  getRecruiterCompanyProfile,
  updateRecruiterCompanyProfile,
  uploadRecruiterAuthorizedSignature,
  uploadRecruiterCompanyLogo,
} from "../controllers/recruiterCompanyProfileController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

import {
  uploadSingleAuthorizedSignature,
  uploadSingleCompanyLogo,
} from "../middleware/companyBrandingUpload.js";

const recruiterCompanyProfileRouter =
  Router();

recruiterCompanyProfileRouter.use(
  authenticate,
  authorizeRoles(
    "recruiter"
  )
);

recruiterCompanyProfileRouter.get(
  "/company-profile",
  getRecruiterCompanyProfile
);

recruiterCompanyProfileRouter.put(
  "/company-profile",
  updateRecruiterCompanyProfile
);

/*
|--------------------------------------------------------------------------
| Company logo routes
|--------------------------------------------------------------------------
*/

recruiterCompanyProfileRouter.post(
  "/company-profile/logo",
  uploadSingleCompanyLogo,
  uploadRecruiterCompanyLogo
);

recruiterCompanyProfileRouter.get(
  "/company-profile/logo",
  getRecruiterCompanyLogoFile
);

recruiterCompanyProfileRouter.delete(
  "/company-profile/logo",
  deleteRecruiterCompanyLogo
);

/*
|--------------------------------------------------------------------------
| Authorized signature routes
|--------------------------------------------------------------------------
*/

recruiterCompanyProfileRouter.post(
  "/company-profile/signature",
  uploadSingleAuthorizedSignature,
  uploadRecruiterAuthorizedSignature
);

recruiterCompanyProfileRouter.get(
  "/company-profile/signature",
  getRecruiterAuthorizedSignatureFile
);

recruiterCompanyProfileRouter.delete(
  "/company-profile/signature",
  deleteRecruiterAuthorizedSignature
);

export default recruiterCompanyProfileRouter;