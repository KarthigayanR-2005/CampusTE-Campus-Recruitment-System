import {
    timingSafeEqual,
  } from "node:crypto";
  
  import {
    createOfferVerificationCheck,
    findPublicOfferVerification,
  } from "../models/offerVerificationModel.js";
  
  import {
    createSha256,
    hashVerificationToken,
  } from "../services/offerVerificationService.js";
  
  const verificationPublicIdPattern =
    /^CTE-OFFER-[1-9]\d*-[A-F0-9]{16}$/;
  
  const verificationTokenPattern =
    /^[A-Za-z0-9_-]{40,100}$/;
  
  function readText(
    value
  ) {
    return typeof value ===
      "string"
      ? value.trim()
      : "";
  }
  
  function getClientIp(
    request
  ) {
    const forwardedFor =
      request.headers[
        "x-forwarded-for"
      ];
  
    if (
      typeof forwardedFor ===
      "string"
    ) {
      return forwardedFor
        .split(",")[0]
        .trim();
    }
  
    return (
      request.ip ||
      request.socket
        ?.remoteAddress ||
      ""
    );
  }
  
  function createAuditHash(
    value
  ) {
    const normalizedValue =
      readText(value);
  
    if (!normalizedValue) {
      return null;
    }
  
    const auditSalt =
      readText(
        process.env
          .VERIFICATION_AUDIT_SALT
      );
  
    if (!auditSalt) {
      throw new Error(
        "VERIFICATION_AUDIT_SALT is not configured."
      );
    }
  
    return createSha256(
      `${auditSalt}:${normalizedValue}`
    );
  }
  
  function compareHashValues(
    firstHash,
    secondHash
  ) {
    if (
      typeof firstHash !==
        "string" ||
      typeof secondHash !==
        "string" ||
      firstHash.length !== 64 ||
      secondHash.length !== 64
    ) {
      return false;
    }
  
    const firstBuffer =
      Buffer.from(
        firstHash,
        "hex"
      );
  
    const secondBuffer =
      Buffer.from(
        secondHash,
        "hex"
      );
  
    if (
      firstBuffer.length !==
      secondBuffer.length
    ) {
      return false;
    }
  
    return timingSafeEqual(
      firstBuffer,
      secondBuffer
    );
  }
  
  async function recordVerificationCheck({
    request,
    verificationId = null,
    submittedTokenHash,
    result,
  }) {
    try {
      await createOfferVerificationCheck({
        verificationId,
        submittedTokenHash,
  
        verificationMode:
          "qr",
  
        result,
  
        clientIpHash:
          createAuditHash(
            getClientIp(
              request
            )
          ),
  
        userAgentHash:
          createAuditHash(
            request.get(
              "user-agent"
            )
          ),
      });
    } catch (error) {
      console.error(
        "Offer verification audit error:",
        error
      );
    }
  }
  
  function getVerificationMessage({
    verificationStatus,
    offerStatus,
  }) {
    if (
      verificationStatus ===
      "superseded"
    ) {
      return "This offer letter is genuine, but a newer document version has replaced it.";
    }
  
    if (
      verificationStatus ===
      "revoked"
    ) {
      return "This offer-letter verification has been revoked and must not be treated as active.";
    }
  
    if (
      offerStatus ===
      "withdrawn"
    ) {
      return "This document is genuine, but the company has withdrawn the offer.";
    }
  
    if (
      offerStatus ===
      "expired"
    ) {
      return "This document is genuine, but the offer has expired.";
    }
  
    if (
      offerStatus ===
      "declined"
    ) {
      return "This document is genuine. The candidate declined the offer.";
    }
  
    if (
      offerStatus ===
      "accepted"
    ) {
      return "This document is genuine. The candidate accepted the offer.";
    }
  
    if (
      offerStatus ===
      "sent"
    ) {
      return "This document is genuine and the offer is awaiting the candidate's response.";
    }
  
    return "This offer letter was generated and verified by CampusTE.";
  }
  
  export async function verifyPublicOffer(
    request,
    response
  ) {
    const verificationPublicId =
      readText(
        request.params
          .publicId
      ).toUpperCase();
  
    const rawToken =
      readText(
        request.query
          .token
      );
  
    const submittedTokenHash =
      hashVerificationToken(
        rawToken
      );
  
    try {
      if (
        !verificationPublicIdPattern
          .test(
            verificationPublicId
          )
      ) {
        await recordVerificationCheck({
          request,
          submittedTokenHash,
  
          result:
            "invalid_token",
        });
  
        return response
          .status(404)
          .json({
            success: false,
  
            verified: false,
  
            state:
              "invalid",
  
            message:
              "The offer verification link is invalid.",
          });
      }
  
      if (
        !verificationTokenPattern
          .test(
            rawToken
          )
      ) {
        await recordVerificationCheck({
          request,
          submittedTokenHash,
  
          result:
            "invalid_token",
        });
  
        return response
          .status(400)
          .json({
            success: false,
  
            verified: false,
  
            state:
              "invalid",
  
            message:
              "The verification token is missing or invalid.",
          });
      }
  
      const verification =
        await findPublicOfferVerification(
          verificationPublicId
        );
  
      if (!verification) {
        await recordVerificationCheck({
          request,
          submittedTokenHash,
  
          result:
            "invalid_token",
        });
  
        return response
          .status(404)
          .json({
            success: false,
  
            verified: false,
  
            state:
              "invalid",
  
            message:
              "No CampusTE offer matches this verification link.",
          });
      }
  
      const validToken =
        compareHashValues(
          submittedTokenHash,
          verification
            .tokenHash
        );
  
      if (!validToken) {
        await recordVerificationCheck({
          request,
  
          verificationId:
            verification
              .verificationId,
  
          submittedTokenHash,
  
          result:
            "invalid_token",
        });
  
        return response
          .status(401)
          .json({
            success: false,
  
            verified: false,
  
            state:
              "invalid",
  
            message:
              "The verification token is invalid.",
          });
      }
  
      let checkResult =
        "verified";
  
      if (
        verification
          .verificationStatus ===
        "superseded"
      ) {
        checkResult =
          "superseded";
      }
  
      if (
        verification
          .verificationStatus ===
        "revoked"
      ) {
        checkResult =
          "revoked";
      }
  
      await recordVerificationCheck({
        request,
  
        verificationId:
          verification
            .verificationId,
  
        submittedTokenHash,
  
        result:
          checkResult,
      });
  
      const verified =
        verification
          .verificationStatus ===
        "active";
  
      return response
        .status(200)
        .json({
          success: true,
  
          verified,
  
          state:
            verification
              .verificationStatus,
  
          message:
            getVerificationMessage({
              verificationStatus:
                verification
                  .verificationStatus,
  
              offerStatus:
                verification
                  .offerStatus,
            }),
  
          verification: {
            publicId:
              verification
                .publicId,
  
            documentVersion:
              verification
                .documentVersion,
  
            issuedAt:
              verification
                .issuedAt,
  
            companyName:
              verification
                .companyName,
  
            candidateName:
              verification
                .candidateName,
  
            designation:
              verification
                .designation,
  
            jobTitle:
              verification
                .jobTitle,
  
            offerStatus:
              verification
                .offerStatus,
  
            joiningDate:
              verification
                .joiningDate,
  
            offerExpiryDate:
              verification
                .offerExpiryDate,
  
            sentAt:
              verification
                .sentAt,
  
            respondedAt:
              verification
                .respondedAt,
          },
        });
    } catch (error) {
      console.error(
        "Public offer verification error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          verified: false,
  
          state:
            "error",
  
          message:
            "Unable to verify the offer at this time.",
        });
    }
  }