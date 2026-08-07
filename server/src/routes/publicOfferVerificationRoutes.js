import {
    Router,
  } from "express";
  
  import {
    verifyPublicOffer,
  } from "../controllers/publicOfferVerificationController.js";
  
  const publicOfferVerificationRouter =
    Router();
  
  publicOfferVerificationRouter.get(
    "/offer-verifications/:publicId",
    verifyPublicOffer
  );
  
  export default publicOfferVerificationRouter;