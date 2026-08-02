import {
  Router,
} from "express";

import {
  createOffer,
  getRecruiterOffer,
  getRecruiterOffers,
  getStudentOffer,
  getStudentOffers,
  respondToOffer,
  sendOffer,
  updateOffer,
  withdrawOffer,
} from "../controllers/offerController.js";

import {
  deleteRecruiterOfferLetter,
  getRecruiterOfferLetterFile,
  getStudentOfferLetterFile,
  requireRecruiterOfferLetter,
  uploadRecruiterOfferLetter,
} from "../controllers/offerLetterController.js";

import {
  authenticate,
} from "../middleware/authenticate.js";

import {
  authorizeRoles,
} from "../middleware/authorizeRoles.js";

import {
  uploadSingleOfferLetter,
} from "../middleware/offerLetterUpload.js";

const offerRouter =
  Router();

/*
|--------------------------------------------------------------------------
| Recruiter offer routes
|--------------------------------------------------------------------------
*/

offerRouter.get(
  "/recruiter/offers",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  getRecruiterOffers
);

offerRouter.get(
  "/recruiter/offers/:offerId",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  getRecruiterOffer
);

offerRouter.post(
  "/recruiter/applications/:applicationId/offers",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  createOffer
);

offerRouter.put(
  "/recruiter/offers/:offerId",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  updateOffer
);

offerRouter.post(
  "/recruiter/offers/:offerId/letter",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  uploadSingleOfferLetter,
  uploadRecruiterOfferLetter
);

offerRouter.get(
  "/recruiter/offers/:offerId/letter",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  getRecruiterOfferLetterFile
);

offerRouter.delete(
  "/recruiter/offers/:offerId/letter",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  deleteRecruiterOfferLetter
);

offerRouter.post(
  "/recruiter/offers/:offerId/send",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  requireRecruiterOfferLetter,
  sendOffer
);

offerRouter.patch(
  "/recruiter/offers/:offerId/withdraw",
  authenticate,
  authorizeRoles(
    "recruiter"
  ),
  withdrawOffer
);

/*
|--------------------------------------------------------------------------
| Student offer routes
|--------------------------------------------------------------------------
*/

offerRouter.get(
  "/student/offers",
  authenticate,
  authorizeRoles(
    "student"
  ),
  getStudentOffers
);

offerRouter.get(
  "/student/offers/:offerId",
  authenticate,
  authorizeRoles(
    "student"
  ),
  getStudentOffer
);

offerRouter.get(
  "/student/offers/:offerId/letter",
  authenticate,
  authorizeRoles(
    "student"
  ),
  getStudentOfferLetterFile
);

offerRouter.patch(
  "/student/offers/:offerId/respond",
  authenticate,
  authorizeRoles(
    "student"
  ),
  respondToOffer
);

export default offerRouter;