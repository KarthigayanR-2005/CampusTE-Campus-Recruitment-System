import fs from "node:fs";
import path from "node:path";
import multer from "multer";

export const MAX_RESUME_FILE_SIZE =
  5 * 1024 * 1024;

export const resumeUploadDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "resumes"
  );

fs.mkdirSync(
  resumeUploadDirectory,
  {
    recursive: true,
  }
);

const resumeStorage =
  multer.diskStorage({
    destination(
      request,
      file,
      callback
    ) {
      callback(
        null,
        resumeUploadDirectory
      );
    },

    filename(
      request,
      file,
      callback
    ) {
      const userId =
        request.auth.userId;

      const randomValue =
        Math.round(
          Math.random() * 1_000_000_000
        );

      const storedFileName =
        `resume-${userId}-${Date.now()}-${randomValue}.pdf`;

      callback(
        null,
        storedFileName
      );
    },
  });

function resumeFileFilter(
  request,
  file,
  callback
) {
  const fileExtension =
    path.extname(
      file.originalname
    ).toLowerCase();

  const isPdfExtension =
    fileExtension === ".pdf";

  const isPdfMimeType =
    file.mimetype ===
    "application/pdf";

  if (
    !isPdfExtension ||
    !isPdfMimeType
  ) {
    return callback(
      new Error(
        "Only PDF resume files are allowed."
      )
    );
  }

  return callback(null, true);
}

const resumeUpload = multer({
  storage: resumeStorage,

  fileFilter:
    resumeFileFilter,

  limits: {
    fileSize:
      MAX_RESUME_FILE_SIZE,

    files: 1,
  },
});

export function uploadSingleResume(
  request,
  response,
  next
) {
  const uploadMiddleware =
    resumeUpload.single("resume");

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
                "Resume file size cannot exceed 5 MB.",
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
                "Upload only one PDF resume using the resume field.",
            });
        }

        return response
          .status(400)
          .json({
            success: false,

            message:
              "Unable to process the uploaded resume.",
          });
      }

      return response
        .status(400)
        .json({
          success: false,

          message:
            error.message ||
            "Unable to upload the resume.",
        });
    }
  );
}