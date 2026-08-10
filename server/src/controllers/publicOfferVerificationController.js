import {
  timingSafeEqual,
} from "node:crypto";

import {
  createOfferVerificationCheck,
  findPublicOfferVerification,
} from "../models/offerVerificationModel.js";

import {
  calculateBufferSha256,
  createSha256,
  hasPdfFileSignature,
  hashVerificationToken,
  verifyDocumentSignature,
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
    readText(
      value
    );

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
  submittedDocumentSha256 = null,
  verificationMode = "qr",
  result,
}) {
  try {
    await createOfferVerificationCheck({
      verificationId,
      submittedTokenHash,
      submittedDocumentSha256,
      verificationMode,
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

async function authenticateVerificationRequest({
  request,
}) {
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

  if (
    !verificationPublicIdPattern
      .test(
        verificationPublicId
      )
  ) {
    return {
      result:
        "invalid_public_id",

      verificationPublicId,
      submittedTokenHash,
    };
  }

  if (
    !verificationTokenPattern
      .test(
        rawToken
      )
  ) {
    return {
      result:
        "invalid_token",

      verificationPublicId,
      submittedTokenHash,
    };
  }

  const verification =
    await findPublicOfferVerification(
      verificationPublicId
    );

  if (!verification) {
    return {
      result:
        "not_found",

      verificationPublicId,
      submittedTokenHash,
    };
  }

  const validToken =
    compareHashValues(
      submittedTokenHash,
      verification
        .tokenHash
    );

  if (!validToken) {
    return {
      result:
        "invalid_token",

      verificationPublicId,
      submittedTokenHash,
      verification,
    };
  }

  return {
    result:
      "success",

    verificationPublicId,
    submittedTokenHash,
    verification,
  };
}

export async function verifyPublicOffer(
  request,
  response
) {
  try {
    const authentication =
      await authenticateVerificationRequest({
        request,
      });

    if (
      authentication.result !==
      "success"
    ) {
      await recordVerificationCheck({
        request,

        verificationId:
          authentication
            .verification
            ?.verificationId ||
          null,

        submittedTokenHash:
          authentication
            .submittedTokenHash,

        result:
          "invalid_token",
      });

      const statusCode =
        authentication.result ===
        "invalid_token"
          ? 401
          : 404;

      return response
        .status(
          statusCode
        )
        .json({
          success: false,

          verified: false,

          state:
            "invalid",

          message:
            authentication.result ===
            "invalid_token"
              ? "The verification token is missing or invalid."
              : "The offer verification link is invalid.",
        });
    }

    const {
      verification,
      submittedTokenHash,
    } =
      authentication;

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

          cryptographicSignature:
            Boolean(
              verification
                .documentSignatureBase64
            ),

          signatureAlgorithm:
            verification
              .signatureAlgorithm ||
            null,

          signingKeyId:
            verification
              .signingKeyId ||
            null,
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

export async function verifyPublicOfferDocumentIntegrity(
  request,
  response
) {
  try {
    if (
      !request.file ||
      !Buffer.isBuffer(
        request.file.buffer
      )
    ) {
      return response
        .status(400)
        .json({
          success: false,

          integrityVerified:
            false,

          message:
            "Select the CampusTE offer-letter PDF to verify.",
        });
    }

    if (
      !hasPdfFileSignature(
        request.file.buffer
      )
    ) {
      return response
        .status(400)
        .json({
          success: false,

          integrityVerified:
            false,

          message:
            "The uploaded file is not a valid PDF document.",
        });
    }

    const authentication =
      await authenticateVerificationRequest({
        request,
      });

    if (
      authentication.result !==
      "success"
    ) {
      await recordVerificationCheck({
        request,

        verificationId:
          authentication
            .verification
            ?.verificationId ||
          null,

        submittedTokenHash:
          authentication
            .submittedTokenHash,

        verificationMode:
          "document_integrity",

        result:
          "invalid_token",
      });

      return response
        .status(401)
        .json({
          success: false,

          integrityVerified:
            false,

          message:
            "The secure offer verification token is invalid.",
        });
    }

    const {
      verification,
      submittedTokenHash,
    } =
      authentication;

    const uploadedDocumentSha256 =
      calculateBufferSha256(
        request.file.buffer
      );

    const exactDocumentMatch =
      compareHashValues(
        uploadedDocumentSha256,
        verification
          .documentSha256
      );

    const digitalSignatureValid =
      await verifyDocumentSignature({
        documentSha256:
          verification
            .documentSha256,

        signatureBase64:
          verification
            .documentSignatureBase64,

        signingKeyId:
          verification
            .signingKeyId,
      });

    let auditResult;

    if (
      !exactDocumentMatch
    ) {
      auditResult =
        "hash_mismatch";
    } else if (
      !digitalSignatureValid
    ) {
      auditResult =
        "signature_invalid";
    } else {
      auditResult =
        "integrity_verified";
    }

    await recordVerificationCheck({
      request,

      verificationId:
        verification
          .verificationId,

      submittedTokenHash,

      submittedDocumentSha256:
        uploadedDocumentSha256,

      verificationMode:
        "document_integrity",

      result:
        auditResult,
    });

    const integrityVerified =
      exactDocumentMatch &&
      digitalSignatureValid;

    let message;

    if (
      !exactDocumentMatch
    ) {
      message =
        "This PDF does not exactly match the CampusTE-issued document. The file may have been modified, re-saved or replaced.";
    } else if (
      !verification
        .documentSignatureBase64
    ) {
      message =
        "The PDF matches the stored fingerprint, but this older offer version does not contain a CampusTE digital signature. Regenerate the offer to enable cryptographic signing.";
    } else if (
      !digitalSignatureValid
    ) {
      message =
        "The PDF fingerprint matches, but the CampusTE digital signature could not be validated.";
    } else if (
      verification
        .verificationStatus ===
      "superseded"
    ) {
      message =
        "This PDF is authentic and untampered, but a newer CampusTE offer-letter version exists.";
    } else if (
      verification
        .verificationStatus ===
      "revoked"
    ) {
      message =
        "This PDF is authentic and untampered, but its verification record has been revoked.";
    } else {
      message =
        "This is the exact CampusTE-issued PDF. Its SHA-256 fingerprint and Ed25519 digital signature are valid.";
    }

    return response
      .status(200)
      .json({
        success: true,

        integrityVerified,

        exactDocumentMatch,

        digitalSignatureValid,

        state:
          verification
            .verificationStatus,

        message,

        verification: {
          publicId:
            verification
              .publicId,

          documentVersion:
            verification
              .documentVersion,

          companyName:
            verification
              .companyName,

          candidateName:
            verification
              .candidateName,

          designation:
            verification
              .designation,

          offerStatus:
            verification
              .offerStatus,

          issuedAt:
            verification
              .issuedAt,

          signatureAlgorithm:
            verification
              .signatureAlgorithm ||
            null,

          signingKeyId:
            verification
              .signingKeyId ||
            null,
        },
      });
  } catch (error) {
    console.error(
      "Public PDF integrity verification error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        integrityVerified:
          false,

        message:
          "Unable to perform the document-integrity check.",
      });
  }
}