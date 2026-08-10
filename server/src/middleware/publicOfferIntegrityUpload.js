import multer from "multer";

const MAX_PDF_SIZE_BYTES =
  10 * 1024 * 1024;

const upload =
  multer({
    storage:
      multer.memoryStorage(),

    limits: {
      fileSize:
        MAX_PDF_SIZE_BYTES,

      files:
        1,
    },

    fileFilter: (
      request,
      file,
      callback
    ) => {
      const mimeType =
        String(
          file.mimetype ||
          ""
        ).toLowerCase();

      if (
        mimeType !==
        "application/pdf"
      ) {
        return callback(
          new Error(
            "Only PDF documents are allowed."
          )
        );
      }

      return callback(
        null,
        true
      );
    },
  });

export function uploadPublicOfferPdf(
  request,
  response,
  next
) {
  upload.single(
    "offerPdf"
  )(
    request,
    response,
    (
      error
    ) => {
      if (!error) {
        return next();
      }

      if (
        error instanceof
          multer.MulterError &&
        error.code ===
          "LIMIT_FILE_SIZE"
      ) {
        return response
          .status(413)
          .json({
            success: false,

            message:
              "The PDF must be 10 MB or smaller.",
          });
      }

      return response
        .status(400)
        .json({
          success: false,

          message:
            error.message ||
            "Unable to process the PDF.",
        });
    }
  );
}