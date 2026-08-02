import fs from "node:fs";
import path from "node:path";
import multer from "multer";

export const MAX_OFFER_LETTER_FILE_SIZE =
  5 * 1024 * 1024;

export const offerLetterUploadDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "offer-letters"
  );

fs.mkdirSync(
  offerLetterUploadDirectory,
  {
    recursive: true,
  }
);

const offerLetterStorage =
  multer.diskStorage({
    destination(
      request,
      file,
      callback
    ) {
      callback(
        null,
        offerLetterUploadDirectory
      );
    },

    filename(
      request,
      file,
      callback
    ) {
      const recruiterUserId =
        request.auth.userId;

      const offerId =
        request.params.offerId ||
        "unknown";

      const randomValue =
        Math.round(
          Math.random() *
            1_000_000_000
        );

      callback(
        null,
        `offer-letter-${recruiterUserId}-${offerId}-${Date.now()}-${randomValue}.pdf`
      );
    },
  });

function offerLetterFileFilter(
  request,
  file,
  callback
) {
  const extension =
    path.extname(
      file.originalname
    ).toLowerCase();

  const validExtension =
    extension === ".pdf";

  const validMimeType =
    file.mimetype ===
    "application/pdf";

  if (
    !validExtension ||
    !validMimeType
  ) {
    return callback(
      new Error(
        "Only PDF offer letter files are allowed."
      )
    );
  }

  return callback(
    null,
    true
  );
}

const offerLetterUpload =
  multer({
    storage:
      offerLetterStorage,

    fileFilter:
      offerLetterFileFilter,

    limits: {
      fileSize:
        MAX_OFFER_LETTER_FILE_SIZE,

      files: 1,
    },
  });

export function uploadSingleOfferLetter(
  request,
  response,
  next
) {
  const uploadMiddleware =
    offerLetterUpload.single(
      "offerLetter"
    );

  uploadMiddleware(
    request,
    response,
    (error) => {
      if (!error) {
        return next();
      }

      if (
        error instanceof
        multer.MulterError
      ) {
        if (
          error.code ===
          "LIMIT_FILE_SIZE"
        ) {
          return response
            .status(400)
            .json({
              success: false,

              message:
                "Offer letter file size cannot exceed 5 MB.",
            });
        }

        if (
          error.code ===
          "LIMIT_UNEXPECTED_FILE"
        ) {
          return response
            .status(400)
            .json({
              success: false,

              message:
                "Upload one PDF using the offerLetter field.",
            });
        }

        return response
          .status(400)
          .json({
            success: false,

            message:
              "Unable to process the uploaded offer letter.",
          });
      }

      return response
        .status(400)
        .json({
          success: false,

          message:
            error.message ||
            "Unable to upload the offer letter.",
        });
    }
  );
}