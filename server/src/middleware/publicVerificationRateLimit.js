import {
    rateLimit,
  } from "express-rate-limit";
  
  const FIFTEEN_MINUTES =
    15 * 60 * 1000;
  
  function readPositiveInteger(
    value,
    fallback
  ) {
    const parsedValue =
      Number.parseInt(
        String(
          value || ""
        ),
        10
      );
  
    if (
      !Number.isInteger(
        parsedValue
      ) ||
      parsedValue <= 0
    ) {
      return fallback;
    }
  
    return parsedValue;
  }
  
  const verificationLimit =
    readPositiveInteger(
      process.env
        .PUBLIC_OFFER_VERIFY_LIMIT,
      60
    );
  
  const integrityLimit =
    readPositiveInteger(
      process.env
        .PUBLIC_OFFER_INTEGRITY_LIMIT,
      10
    );
  
  function shouldSkipRequest(
    request
  ) {
    return (
      request.method ===
      "OPTIONS"
    );
  }
  
  export const
    publicOfferVerificationRateLimit =
      rateLimit({
        windowMs:
          FIFTEEN_MINUTES,
  
        limit:
          verificationLimit,
  
        standardHeaders:
          "draft-8",
  
        legacyHeaders:
          false,
  
        skip:
          shouldSkipRequest,
  
        identifier:
          "public-offer-verification",
  
        handler(
          request,
          response
        ) {
          return response
            .status(429)
            .json({
              success:
                false,
  
              verified:
                false,
  
              state:
                "rate_limited",
  
              message:
                "Too many offer verification requests were made from this network. Please wait before trying again.",
            });
        },
      });
  
  export const
    publicOfferIntegrityRateLimit =
      rateLimit({
        windowMs:
          FIFTEEN_MINUTES,
  
        limit:
          integrityLimit,
  
        standardHeaders:
          "draft-8",
  
        legacyHeaders:
          false,
  
        skip:
          shouldSkipRequest,
  
        identifier:
          "public-offer-document-integrity",
  
        handler(
          request,
          response
        ) {
          return response
            .status(429)
            .json({
              success:
                false,
  
              integrityVerified:
                false,
  
              state:
                "rate_limited",
  
              message:
                "Too many document integrity checks were made from this network. Please wait before uploading another PDF.",
            });
        },
      });