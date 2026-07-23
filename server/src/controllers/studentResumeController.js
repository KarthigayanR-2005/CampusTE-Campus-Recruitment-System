import fs from "node:fs/promises";
import path from "node:path";

import {
  deleteStudentResumeByUserId,
  findStudentResumeByUserId,
  saveStudentResume,
} from "../models/studentResumeModel.js";

const resumeDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "resumes"
  );

function toPublicResume(resume) {
  if (!resume) {
    return null;
  }

  return {
    resumeId:
      resume.resumeId,

    originalFileName:
      resume.originalFileName,

    mimeType:
      resume.mimeType,

    fileSize:
      resume.fileSize,

    uploadedAt:
      resume.uploadedAt,

    updatedAt:
      resume.updatedAt,
  };
}

function getAbsoluteResumePath(
  relativeFilePath
) {
  const absoluteFilePath =
    path.resolve(
      process.cwd(),
      relativeFilePath
    );

  const validPathPrefix =
    `${resumeDirectory}${path.sep}`;

  if (
    !absoluteFilePath.startsWith(
      validPathPrefix
    )
  ) {
    throw new Error(
      "Invalid resume file path."
    );
  }

  return absoluteFilePath;
}

async function safelyDeleteFile(
  filePath
) {
  if (!filePath) {
    return;
  }

  try {
    const absoluteFilePath =
      getAbsoluteResumePath(
        filePath
      );

    await fs.unlink(
      absoluteFilePath
    );
  } catch (error) {
    if (
      error.code !== "ENOENT"
    ) {
      console.error(
        "Resume file deletion error:",
        error
      );
    }
  }
}

async function hasValidPdfSignature(
  filePath
) {
  let fileHandle;

  try {
    fileHandle =
      await fs.open(
        filePath,
        "r"
      );

    const signatureBuffer =
      Buffer.alloc(5);

    await fileHandle.read(
      signatureBuffer,
      0,
      5,
      0
    );

    return (
      signatureBuffer.toString(
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

export async function getStudentResume(
  request,
  response
) {
  try {
    const resume =
      await findStudentResumeByUserId(
        request.auth.userId
      );

    return response
      .status(200)
      .json({
        success: true,

        hasResume:
          Boolean(resume),

        resume:
          toPublicResume(resume),
      });
  } catch (error) {
    console.error(
      "Get student resume error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve your resume.",
      });
  }
}

export async function uploadStudentResume(
  request,
  response
) {
  if (!request.file) {
    return response
      .status(400)
      .json({
        success: false,

        message:
          "Select a PDF resume to upload.",
      });
  }

  try {
    const validPdf =
      await hasValidPdfSignature(
        request.file.path
      );

    if (!validPdf) {
      await fs.unlink(
        request.file.path
      );

      return response
        .status(400)
        .json({
          success: false,

          message:
            "The uploaded file is not a valid PDF document.",
        });
    }

    const existingResume =
      await findStudentResumeByUserId(
        request.auth.userId
      );

    const relativeFilePath =
      path
        .relative(
          process.cwd(),
          request.file.path
        )
        .split(path.sep)
        .join("/");

    const resume =
      await saveStudentResume({
        userId:
          request.auth.userId,

        originalFileName:
          request.file.originalname,

        storedFileName:
          request.file.filename,

        filePath:
          relativeFilePath,

        mimeType:
          request.file.mimetype,

        fileSize:
          request.file.size,
      });

    if (
      existingResume &&
      existingResume.filePath !==
        relativeFilePath
    ) {
      await safelyDeleteFile(
        existingResume.filePath
      );
    }

    return response
      .status(
        existingResume
          ? 200
          : 201
      )
      .json({
        success: true,

        message:
          existingResume
            ? "Resume replaced successfully."
            : "Resume uploaded successfully.",

        resume:
          toPublicResume(resume),
      });
  } catch (error) {
    console.error(
      "Upload student resume error:",
      error
    );

    await safelyDeleteFile(
      path
        .relative(
          process.cwd(),
          request.file.path
        )
        .split(path.sep)
        .join("/")
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to save the uploaded resume.",
      });
  }
}

export async function getStudentResumeFile(
  request,
  response
) {
  try {
    const resume =
      await findStudentResumeByUserId(
        request.auth.userId
      );

    if (!resume) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "No resume has been uploaded.",
        });
    }

    const absoluteFilePath =
      getAbsoluteResumePath(
        resume.filePath
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
            "The resume file could not be found.",
        });
    }

    const shouldDownload =
      request.query.download ===
      "1";

    const dispositionType =
      shouldDownload
        ? "attachment"
        : "inline";

    const encodedFileName =
      encodeURIComponent(
        resume.originalFileName
      );

    response.setHeader(
      "Content-Type",
      "application/pdf"
    );

    response.setHeader(
      "Content-Disposition",
      `${dispositionType}; filename="resume.pdf"; filename*=UTF-8''${encodedFileName}`
    );

    return response.sendFile(
      absoluteFilePath
    );
  } catch (error) {
    console.error(
      "Get resume file error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve the resume file.",
      });
  }
}

export async function deleteStudentResume(
  request,
  response
) {
  try {
    const resume =
      await findStudentResumeByUserId(
        request.auth.userId
      );

    if (!resume) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "No resume has been uploaded.",
        });
    }

    const affectedRows =
      await deleteStudentResumeByUserId(
        request.auth.userId
      );

    if (affectedRows === 0) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "No resume has been uploaded.",
        });
    }

    await safelyDeleteFile(
      resume.filePath
    );

    return response
      .status(200)
      .json({
        success: true,

        message:
          "Resume deleted successfully.",
      });
  } catch (error) {
    console.error(
      "Delete student resume error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to delete the resume.",
      });
  }
}