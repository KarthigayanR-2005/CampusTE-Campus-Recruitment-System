import {
  Router,
} from "express";

import {
  verifyPublicOffer,
  verifyPublicOfferDocumentIntegrity,
} from "../controllers/publicOfferVerificationController.js";

import {
  uploadPublicOfferPdf,
} from "../middleware/publicOfferIntegrityUpload.js";

const publicOfferVerificationRouter =
  Router();

publicOfferVerificationRouter.get(
  "/offer-verifications/:publicId",
  verifyPublicOffer
);

publicOfferVerificationRouter.post(
  "/offer-verifications/:publicId/document-integrity",
  uploadPublicOfferPdf,
  verifyPublicOfferDocumentIntegrity
);

export default publicOfferVerificationRouter;