import fs from "node:fs/promises";
import path from "node:path";

import {
  clearRecruiterOfferLetter,
  findRecruiterOfferLetter,
  findStudentOfferLetter,
  saveRecruiterOfferLetter,
} from "../models/offerLetterModel.js";

const offerLetterDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "offer-letters"
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
      error.code !== "ENOENT"
    ) {
      console.error(
        "Offer letter deletion error:",
        error
      );
    }
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
    .split(path.sep)
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
    offerLetter.originalFileName ||
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
  if (!request.file) {
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
      request.params.offerId
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
          request.auth.userId,

        offerId,

        originalFileName:
          request.file.originalname,

        storedFileName:
          request.file.filename,

        mimeType:
          request.file.mimetype,

        sizeBytes:
          request.file.size,

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

export async function getRecruiterOfferLetterFile(
  request,
  response
) {
  try {
    const offerId =
      parsePositiveId(
        request.params.offerId
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
          request.auth.userId,

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
        request.query.download ===
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
        request.params.offerId
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
          request.auth.userId,

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
        request.params.offerId
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
          request.auth.userId,

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
        request.query.download ===
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
        request.params.offerId
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
          request.auth.userId,

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
      !offerLetter.available
    ) {
      return response
        .status(409)
        .json({
          success: false,

          message:
            "Upload the offer letter PDF before sending the offer.",
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