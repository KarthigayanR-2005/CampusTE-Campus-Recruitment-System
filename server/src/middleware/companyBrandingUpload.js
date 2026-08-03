import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import multer from "multer";

const MAX_BRANDING_FILE_SIZE =
  2 * 1024 * 1024;

const brandingDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "company-branding"
  );

fs.mkdirSync(
  brandingDirectory,
  {
    recursive: true,
  }
);

const allowedMimeTypes =
  new Set([
    "image/png",
    "image/jpeg",
  ]);

const allowedExtensions =
  new Set([
    ".png",
    ".jpg",
    ".jpeg",
  ]);

function createStorage(
  filePrefix
) {
  return multer.diskStorage({
    destination(
      request,
      file,
      callback
    ) {
      callback(
        null,
        brandingDirectory
      );
    },

    filename(
      request,
      file,
      callback
    ) {
      const originalExtension =
        path
          .extname(
            file.originalname
          )
          .toLowerCase();

      const safeExtension =
        allowedExtensions.has(
          originalExtension
        )
          ? originalExtension
          : (
              file.mimetype ===
              "image/png"
                ? ".png"
                : ".jpg"
            );

      const storedFileName =
        `${filePrefix}-${
          request.auth.userId
        }-${Date.now()}-${crypto.randomUUID()}${safeExtension}`;

      callback(
        null,
        storedFileName
      );
    },
  });
}

function brandingFileFilter(
  request,
  file,
  callback
) {
  const extension =
    path
      .extname(
        file.originalname
      )
      .toLowerCase();

  if (
    !allowedMimeTypes.has(
      file.mimetype
    ) ||
    !allowedExtensions.has(
      extension
    )
  ) {
    const error =
      new Error(
        "Only PNG, JPG and JPEG images are allowed."
      );

    error.code =
      "INVALID_BRANDING_FILE_TYPE";

    callback(
      error
    );

    return;
  }

  callback(
    null,
    true
  );
}

function createBrandingUploader(
  filePrefix
) {
  return multer({
    storage:
      createStorage(
        filePrefix
      ),

    limits: {
      fileSize:
        MAX_BRANDING_FILE_SIZE,

      files: 1,
    },

    fileFilter:
      brandingFileFilter,
  });
}

const companyLogoUploader =
  createBrandingUploader(
    "company-logo"
  );

const signatureUploader =
  createBrandingUploader(
    "authorized-signature"
  );

function runSingleUpload(
  uploader,
  fieldName
) {
  return (
    request,
    response,
    next
  ) => {
    uploader.single(
      fieldName
    )(
      request,
      response,
      (error) => {
        if (!error) {
          next();
          return;
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
              .status(413)
              .json({
                success: false,

                message:
                  "The image cannot exceed 2 MB.",
              });
          }

          return response
            .status(400)
            .json({
              success: false,

              message:
                "The branding image could not be uploaded.",
            });
        }

        if (
          error.code ===
          "INVALID_BRANDING_FILE_TYPE"
        ) {
          return response
            .status(400)
            .json({
              success: false,

              message:
                error.message,
            });
        }

        console.error(
          "Company branding upload middleware error:",
          error
        );

        return response
          .status(500)
          .json({
            success: false,

            message:
              "Unable to process the branding image.",
          });
      }
    );
  };
}

export const uploadSingleCompanyLogo =
  runSingleUpload(
    companyLogoUploader,
    "companyLogo"
  );

export const uploadSingleAuthorizedSignature =
  runSingleUpload(
    signatureUploader,
    "authorizedSignature"
  );