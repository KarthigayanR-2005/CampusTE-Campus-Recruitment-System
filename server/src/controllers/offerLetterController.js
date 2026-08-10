import fs from "node:fs/promises";
import path from "node:path";

import {
  clearRecruiterOfferLetter,
  findRecruiterOfferLetter,
  findStudentOfferLetter,
  saveRecruiterOfferLetter,
} from "../models/offerLetterModel.js";

import {
  findRecruiterCompanyBrandingFile,
  findRecruiterCompanyProfile,
} from "../models/recruiterCompanyProfileModel.js";

import {
  findNextOfferVerificationVersion,
  revokeActiveOfferVerification,
  saveGeneratedOfferWithVerification,
} from "../models/offerVerificationModel.js";

import {
  findRecruiterOfferById,
} from "../models/offerModel.js";

import {
  generateOfferLetterPdf,
} from "../services/offerLetterPdfService.js";

import {
  calculateFileSha256,
  createOfferVerificationCredentials,
  createVerificationQrBuffer,
  signDocumentSha256,
} from "../services/offerVerificationService.js";

const offerLetterDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "offer-letters"
  );

const companyBrandingDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "company-branding"
  );

function parsePositiveId(value) {
  const parsedValue =
    Number(value);

  return (
    Number.isInteger(
      parsedValue
    ) &&
    parsedValue > 0
  )
    ? parsedValue
    : null;
}

function getAbsoluteOfferLetterPath(
  relativeFilePath
) {
  const absoluteFilePath =
    path.resolve(
      process.cwd(),
      relativeFilePath
    );

  const validPrefix =
    `${offerLetterDirectory}${path.sep}`;

  if (
    !absoluteFilePath.startsWith(
      validPrefix
    )
  ) {
    throw new Error(
      "Invalid offer letter file path."
    );
  }

  return absoluteFilePath;
}

function getAbsoluteCompanyBrandingPath(
  relativeFilePath
) {
  const absoluteFilePath =
    path.resolve(
      process.cwd(),
      relativeFilePath
    );

  const validPrefix =
    `${companyBrandingDirectory}${path.sep}`;

  if (
    !absoluteFilePath.startsWith(
      validPrefix
    )
  ) {
    throw new Error(
      "Invalid company branding file path."
    );
  }

  return absoluteFilePath;
}

function getVerificationDisplayUrl(
  verificationUrl
) {
  try {
    const parsedUrl =
      new URL(
        verificationUrl
      );

    parsedUrl.search = "";

    return parsedUrl.toString();
  } catch {
    return String(
      verificationUrl || ""
    ).split("?")[0];
  }
}

async function getCompanyBrandingAsset({
  recruiterUserId,
  fileType,
}) {
  const brandingFile =
    await findRecruiterCompanyBrandingFile({
      userId:
        recruiterUserId,

      fileType,
    });

  if (
    !brandingFile?.available ||
    !brandingFile.filePath
  ) {
    return null;
  }

  const absoluteFilePath =
    getAbsoluteCompanyBrandingPath(
      brandingFile.filePath
    );

  try {
    await fs.access(
      absoluteFilePath
    );
  } catch {
    console.warn(
      `Company ${fileType} metadata exists, but the image file was not found.`
    );

    return null;
  }

  return {
    ...brandingFile,
    absoluteFilePath,
  };
}

function createBrandedOffer({
  offer,
  companyProfile,
}) {
  return {
    ...offer,

    company: {
      ...offer.company,

      companyName:
        companyProfile
          ?.companyName ||
        offer.company
          ?.companyName ||
        "",

      headquarters:
        companyProfile
          ?.headquarters ||
        offer.company
          ?.headquarters ||
        "",

      website:
        companyProfile
          ?.website ||
        offer.company
          ?.website ||
        "",

      contactEmail:
        companyProfile
          ?.contactEmail ||
        "",

      contactPhone:
        companyProfile
          ?.contactPhone ||
        "",
    },

    recruiter: {
      ...offer.recruiter,

      fullName:
        companyProfile
          ?.recruiterName ||
        offer.recruiter
          ?.fullName ||
        "",

      designation:
        companyProfile
          ?.recruiterDesignation ||
        "",
    },
  };
}

async function safelyDeleteFile(
  relativeFilePath
) {
  if (!relativeFilePath) {
    return;
  }

  try {
    await fs.unlink(
      getAbsoluteOfferLetterPath(
        relativeFilePath
      )
    );
  } catch (error) {
    if (
      error.code !==
      "ENOENT"
    ) {
      console.error(
        "Offer letter deletion error:",
        error
      );
    }
  }
}

async function safelyRevokeVerification({
  recruiterUserId,
  offerId,
}) {
  try {
    await revokeActiveOfferVerification({
      recruiterUserId,
      offerId,
    });
  } catch (error) {
    console.error(
      "Revoke offer verification error:",
      error
    );
  }
}

async function hasPdfSignature(
  absoluteFilePath
) {
  let fileHandle;

  try {
    fileHandle =
      await fs.open(
        absoluteFilePath,
        "r"
      );

    const signature =
      Buffer.alloc(5);

    await fileHandle.read(
      signature,
      0,
      5,
      0
    );

    return (
      signature.toString(
        "utf8"
      ) === "%PDF-"
    );
  } catch {
    return false;
  } finally {
    if (fileHandle) {
      await fileHandle.close();
    }
  }
}

function getRelativeUploadedPath(
  request
) {
  return path
    .relative(
      process.cwd(),
      request.file.path
    )
    .split(
      path.sep
    )
    .join("/");
}

async function sendOfferLetter({
  response,
  offerLetter,
  download,
}) {
  if (
    !offerLetter?.available
  ) {
    return response
      .status(404)
      .json({
        success: false,

        message:
          "No offer letter has been uploaded.",
      });
  }

  const absoluteFilePath =
    getAbsoluteOfferLetterPath(
      offerLetter.filePath
    );

  try {
    await fs.access(
      absoluteFilePath
    );
  } catch {
    return response
      .status(404)
      .json({
        success: false,

        message:
          "The offer letter file could not be found.",
      });
  }

  const disposition =
    download
      ? "attachment"
      : "inline";

  const originalFileName =
    offerLetter
      .originalFileName ||
    "Offer_Letter.pdf";

  const safeFileName =
    originalFileName.replace(
      /["\r\n]/g,
      "_"
    );

  const encodedFileName =
    encodeURIComponent(
      originalFileName
    );

  response.setHeader(
    "Content-Type",
    offerLetter.mimeType ||
      "application/pdf"
  );

  response.setHeader(
    "Content-Disposition",
    `${disposition}; filename="${safeFileName}"; filename*=UTF-8''${encodedFileName}`
  );

  return response.sendFile(
    absoluteFilePath
  );
}

export async function uploadRecruiterOfferLetter(
  request,
  response
) {
  if (
    !request.file
  ) {
    return response
      .status(400)
      .json({
        success: false,

        message:
          "Select a PDF offer letter to upload.",
      });
  }

  const relativeFilePath =
    getRelativeUploadedPath(
      request
    );

  const offerId =
    parsePositiveId(
      request.params
        .offerId
    );

  if (!offerId) {
    await safelyDeleteFile(
      relativeFilePath
    );

    return response
      .status(400)
      .json({
        success: false,

        message:
          "A valid offer ID is required.",
      });
  }

  try {
    const validPdf =
      await hasPdfSignature(
        request.file.path
      );

    if (!validPdf) {
      await safelyDeleteFile(
        relativeFilePath
      );

      return response
        .status(400)
        .json({
          success: false,

          message:
            "The uploaded file is not a valid PDF document.",
        });
    }

    const result =
      await saveRecruiterOfferLetter({
        recruiterUserId:
          request.auth
            .userId,

        offerId,

        originalFileName:
          request.file
            .originalname,

        storedFileName:
          request.file
            .filename,

        mimeType:
          request.file
            .mimetype,

        sizeBytes:
          request.file
            .size,

        filePath:
          relativeFilePath,
      });

    if (
      result.result ===
      "not_found"
    ) {
      await safelyDeleteFile(
        relativeFilePath
      );

      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    if (
      result.result ===
      "invalid_status"
    ) {
      await safelyDeleteFile(
        relativeFilePath
      );

      return response
        .status(409)
        .json({
          success: false,

          message:
            "Upload or replace the offer letter only while the offer is a draft.",
        });
    }

    if (
      result.previousFilePath &&
      result.previousFilePath !==
        relativeFilePath
    ) {
      await safelyDeleteFile(
        result.previousFilePath
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Manual upload verification handling
    |--------------------------------------------------------------------------
    |
    | A manually uploaded PDF is not the CampusTE-generated signed PDF.
    | Therefore, any previously active generated verification record is
    | revoked when the Recruiter manually replaces the document.
    |
    */

    await safelyRevokeVerification({
      recruiterUserId:
        request.auth
          .userId,

      offerId,
    });

    return response
      .status(
        result.previousFilePath
          ? 200
          : 201
      )
      .json({
        success: true,

        message:
          result.previousFilePath
            ? "Offer letter replaced successfully."
            : "Offer letter uploaded successfully.",

        offerLetter:
          result.offerLetter,
      });
  } catch (error) {
    console.error(
      "Upload offer letter error:",
      error
    );

    await safelyDeleteFile(
      relativeFilePath
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to save the uploaded offer letter.",
      });
  }
}

export async function generateRecruiterOfferLetter(
  request,
  response
) {
  const offerId =
    parsePositiveId(
      request.params
        .offerId
    );

  if (!offerId) {
    return response
      .status(400)
      .json({
        success: false,

        message:
          "A valid offer ID is required.",
      });
  }

  let generatedFile =
    null;

  try {
    const offer =
      await findRecruiterOfferById({
        recruiterUserId:
          request.auth
            .userId,

        offerId,
      });

    if (!offer) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    if (
      offer.status !==
      "draft"
    ) {
      return response
        .status(409)
        .json({
          success: false,

          message:
            "Generate or regenerate the offer letter only while the offer is a draft.",
        });
    }

    /*
    |--------------------------------------------------------------------------
    | Load branding and determine the exact next verification version
    |--------------------------------------------------------------------------
    */

    const [
      companyProfile,
      companyLogo,
      authorizedSignature,
      documentVersion,
    ] =
      await Promise.all([
        findRecruiterCompanyProfile(
          request.auth
            .userId
        ),

        getCompanyBrandingAsset({
          recruiterUserId:
            request.auth
              .userId,

          fileType:
            "logo",
        }),

        getCompanyBrandingAsset({
          recruiterUserId:
            request.auth
              .userId,

          fileType:
            "signature",
        }),

        findNextOfferVerificationVersion(
          offerId
        ),
      ]);

    const brandedOffer =
      createBrandedOffer({
        offer,
        companyProfile,
      });

    /*
    |--------------------------------------------------------------------------
    | Generate secure QR credentials
    |--------------------------------------------------------------------------
    */

    const verificationCredentials =
      createOfferVerificationCredentials({
        offerId,
      });

    const qrCodeBuffer =
      await createVerificationQrBuffer(
        verificationCredentials
          .verificationUrl
      );

    const verificationDisplayUrl =
      getVerificationDisplayUrl(
        verificationCredentials
          .verificationUrl
      );

    /*
    |--------------------------------------------------------------------------
    | Generate the completed offer-letter PDF
    |--------------------------------------------------------------------------
    */

    generatedFile =
      await generateOfferLetterPdf({
        offer:
          brandedOffer,

        branding: {
          logo:
            companyLogo,

          signature:
            authorizedSignature,
        },

        verification: {
          publicId:
            verificationCredentials
              .verificationPublicId,

          verificationUrl:
            verificationCredentials
              .verificationUrl,

          displayUrl:
            verificationDisplayUrl,

          documentVersion,

          qrCodeBuffer,
        },
      });

    /*
    |--------------------------------------------------------------------------
    | Generate SHA-256 document fingerprint
    |--------------------------------------------------------------------------
    */

    const documentSha256 =
      await calculateFileSha256(
        generatedFile
          .absoluteFilePath
      );

    /*
    |--------------------------------------------------------------------------
    | Digitally sign the SHA-256 fingerprint using Ed25519
    |--------------------------------------------------------------------------
    */

    const digitalSignature =
      await signDocumentSha256(
        documentSha256
      );

    /*
    |--------------------------------------------------------------------------
    | Save PDF metadata + cryptographic verification record atomically
    |--------------------------------------------------------------------------
    */

    const result =
      await saveGeneratedOfferWithVerification({
        recruiterUserId:
          request.auth
            .userId,

        offerId,

        offerLetter: {
          originalFileName:
            generatedFile
              .originalFileName,

          storedFileName:
            generatedFile
              .storedFileName,

          mimeType:
            generatedFile
              .mimeType,

          sizeBytes:
            generatedFile
              .sizeBytes,

          filePath:
            generatedFile
              .filePath,
        },

        verification: {
          verificationPublicId:
            verificationCredentials
              .verificationPublicId,

          verificationTokenHash:
            verificationCredentials
              .verificationTokenHash,

          documentSha256,

          signatureAlgorithm:
            digitalSignature
              .algorithm,

          documentSignatureBase64:
            digitalSignature
              .signatureBase64,

          signingKeyId:
            digitalSignature
              .signingKeyId,

          documentVersion,
        },
      });

    if (
      result.result ===
      "not_found"
    ) {
      await safelyDeleteFile(
        generatedFile
          .filePath
      );

      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    if (
      result.result ===
      "invalid_status"
    ) {
      await safelyDeleteFile(
        generatedFile
          .filePath
      );

      return response
        .status(409)
        .json({
          success: false,

          message:
            "The offer is no longer a draft and its PDF cannot be generated.",
        });
    }

    if (
      result.result ===
      "version_conflict"
    ) {
      await safelyDeleteFile(
        generatedFile
          .filePath
      );

      return response
        .status(409)
        .json({
          success: false,

          message:
            "Another offer-letter version was generated at the same time. Please regenerate the document.",
        });
    }

    if (
      result.previousFilePath &&
      result.previousFilePath !==
        generatedFile
          .filePath
    ) {
      await safelyDeleteFile(
        result.previousFilePath
      );
    }

    return response
      .status(
        result.previousFilePath
          ? 200
          : 201
      )
      .json({
        success: true,

        message:
          result.previousFilePath
            ? "Verified and digitally signed offer letter regenerated successfully."
            : "Verified and digitally signed offer letter generated successfully.",

        offerLetter: {
          available:
            true,

          originalFileName:
            generatedFile
              .originalFileName,

          mimeType:
            generatedFile
              .mimeType,

          sizeBytes:
            generatedFile
              .sizeBytes,
        },

        verification: {
          publicId:
            result.verification
              ?.publicId ||
            verificationCredentials
              .verificationPublicId,

          documentVersion:
            result.verification
              ?.documentVersion ||
            result.documentVersion ||
            documentVersion,

          status:
            result.verification
              ?.status ||
            "active",

          issuedAt:
            result.verification
              ?.issuedAt ||
            null,

          signatureAlgorithm:
            result.verification
              ?.signatureAlgorithm ||
            digitalSignature
              .algorithm,

          signingKeyId:
            result.verification
              ?.signingKeyId ||
            digitalSignature
              .signingKeyId,
        },
      });
  } catch (error) {
    console.error(
      "Generate offer letter error:",
      error
    );

    if (
      generatedFile
        ?.filePath
    ) {
      await safelyDeleteFile(
        generatedFile
          .filePath
      );
    }

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to generate the verified and digitally signed offer-letter PDF.",
      });
  }
}

export async function getRecruiterOfferLetterFile(
  request,
  response
) {
  try {
    const offerId =
      parsePositiveId(
        request.params
          .offerId
      );

    if (!offerId) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            "A valid offer ID is required.",
        });
    }

    const offerLetter =
      await findRecruiterOfferLetter({
        recruiterUserId:
          request.auth
            .userId,

        offerId,
      });

    if (!offerLetter) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    return sendOfferLetter({
      response,
      offerLetter,

      download:
        request.query
          .download ===
        "1",
    });
  } catch (error) {
    console.error(
      "Get Recruiter offer letter error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve the offer letter.",
      });
  }
}

export async function deleteRecruiterOfferLetter(
  request,
  response
) {
  try {
    const offerId =
      parsePositiveId(
        request.params
          .offerId
      );

    if (!offerId) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            "A valid offer ID is required.",
        });
    }

    const result =
      await clearRecruiterOfferLetter({
        recruiterUserId:
          request.auth
            .userId,

        offerId,
      });

    if (
      result.result ===
      "not_found"
    ) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    if (
      result.result ===
      "invalid_status"
    ) {
      return response
        .status(409)
        .json({
          success: false,

          message:
            "Delete the offer letter only while the offer is a draft.",
        });
    }

    if (
      result.result ===
      "no_file"
    ) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "No offer letter has been uploaded.",
        });
    }

    await safelyDeleteFile(
      result.previousFilePath
    );

    await safelyRevokeVerification({
      recruiterUserId:
        request.auth
          .userId,

      offerId,
    });

    return response
      .status(200)
      .json({
        success: true,

        message:
          "Offer letter deleted successfully.",
      });
  } catch (error) {
    console.error(
      "Delete offer letter error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to delete the offer letter.",
      });
  }
}

export async function getStudentOfferLetterFile(
  request,
  response
) {
  try {
    const offerId =
      parsePositiveId(
        request.params
          .offerId
      );

    if (!offerId) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            "A valid offer ID is required.",
        });
    }

    const offerLetter =
      await findStudentOfferLetter({
        studentUserId:
          request.auth
            .userId,

        offerId,
      });

    if (!offerLetter) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    return sendOfferLetter({
      response,
      offerLetter,

      download:
        request.query
          .download ===
        "1",
    });
  } catch (error) {
    console.error(
      "Get Student offer letter error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve the offer letter.",
      });
  }
}

export async function requireRecruiterOfferLetter(
  request,
  response,
  next
) {
  try {
    const offerId =
      parsePositiveId(
        request.params
          .offerId
      );

    if (!offerId) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            "A valid offer ID is required.",
        });
    }

    const offerLetter =
      await findRecruiterOfferLetter({
        recruiterUserId:
          request.auth
            .userId,

        offerId,
      });

    if (!offerLetter) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Offer was not found.",
        });
    }

    if (
      !offerLetter
        .available
    ) {
      return response
        .status(409)
        .json({
          success: false,

          message:
            "Upload or generate the offer letter PDF before sending the offer.",
        });
    }

    return next();
  } catch (error) {
    console.error(
      "Validate offer letter error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to validate the offer letter.",
      });
  }
}