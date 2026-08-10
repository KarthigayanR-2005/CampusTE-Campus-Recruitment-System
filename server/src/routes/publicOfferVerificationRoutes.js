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

import {
  publicOfferIntegrityRateLimit,
  publicOfferVerificationRateLimit,
} from "../middleware/publicVerificationRateLimit.js";

const router =
  Router();

/*
|--------------------------------------------------------------------------
| Public QR verification
|--------------------------------------------------------------------------
*/

router.get(
  "/offer-verifications/:publicId",
  publicOfferVerificationRateLimit,
  verifyPublicOffer
);

/*
|--------------------------------------------------------------------------
| Public PDF integrity verification
|--------------------------------------------------------------------------
*/

router.post(
  "/offer-verifications/:publicId/document-integrity",
  publicOfferIntegrityRateLimit,
  uploadPublicOfferPdf,
  verifyPublicOfferDocumentIntegrity
);

export default router;