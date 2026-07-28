import fs from "fs";
import path from "path";

import {
  fileURLToPath,
} from "url";

import {
  findRecruiterCandidateById,
  findRecruiterCandidateJobOptions,
  findRecruiterCandidateResume,
  findRecruiterCandidates,
  inviteRecruiterCandidate,
  removeRecruiterSavedCandidate,
  saveRecruiterCandidate,
} from "../models/recruiterCandidateModel.js";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

const serverDirectory =
  path.resolve(
    currentDirectory,
    "../.."
  );

function readText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function parsePositiveId(value) {
  const parsedValue =
    Number(value);

  return Number.isInteger(
    parsedValue
  ) &&
  parsedValue > 0
    ? parsedValue
    : null;
}

function getResumePath(resume) {
  const storedPath =
    resume.file_path ||
    resume.stored_file_path ||
    resume.storage_path ||
    resume.resume_path ||
    "";

  const storedFileName =
    resume.stored_file_name ||
    resume.file_name ||
    resume.saved_file_name ||
    "";

  const possiblePaths = [];

  if (storedPath) {
    possiblePaths.push(
      path.isAbsolute(
        storedPath
      )
        ? storedPath
        : path.resolve(
            serverDirectory,
            storedPath
          )
    );
  }

  if (storedFileName) {
    possiblePaths.push(
      path.resolve(
        serverDirectory,
        "uploads",
        "resumes",
        storedFileName
      )
    );
  }

  return (
    possiblePaths.find(
      (filePath) =>
        fs.existsSync(
          filePath
        )
    ) || null
  );
}

export async function getRecruiterCandidates(
  request,
  response
) {
  try {
    const search =
      readText(
        request.query.search
      );

    const department =
      readText(
        request.query.department
      );

    const skill =
      readText(
        request.query.skill
      );

    const minimumCgpa =
      request.query.minimumCgpa
        ? Number(
            request.query.minimumCgpa
          )
        : 0;

    if (
      !Number.isFinite(
        minimumCgpa
      ) ||
      minimumCgpa < 0 ||
      minimumCgpa > 10
    ) {
      return response.status(400).json({
        success: false,

        message:
          "Minimum CGPA must be between 0 and 10.",
      });
    }

    const graduationYear =
      request.query.graduationYear
        ? Number(
            request.query.graduationYear
          )
        : null;

    if (
      graduationYear &&
      !Number.isInteger(
        graduationYear
      )
    ) {
      return response.status(400).json({
        success: false,

        message:
          "A valid graduation year is required.",
      });
    }

    const candidates =
      await findRecruiterCandidates({
        recruiterUserId:
          request.auth.userId,

        search,
        department,
        skill,
        minimumCgpa,
        graduationYear,
      });

    const departmentOptions = [
      ...new Set(
        candidates
          .map(
            (candidate) =>
              candidate.department
          )
          .filter(Boolean)
      ),
    ].sort();

    const graduationYearOptions = [
      ...new Set(
        candidates
          .map(
            (candidate) =>
              candidate.graduationYear
          )
          .filter(Boolean)
      ),
    ].sort(
      (first, second) =>
        first - second
    );

    const statistics = {
      total:
        candidates.length,

      saved:
        candidates.filter(
          (candidate) =>
            candidate.saved
        ).length,

      profileReady:
        candidates.filter(
          (candidate) =>
            candidate.resume
              .available
        ).length,

      strongProfiles:
        candidates.filter(
          (candidate) =>
            candidate.profileScore >=
            75
        ).length,
    };

    return response.status(200).json({
      success: true,
      candidates,
      departmentOptions,
      graduationYearOptions,
      statistics,
    });
  } catch (error) {
    console.error(
      "Get Recruiter candidates error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve candidates.",
    });
  }
}

export async function getRecruiterCandidate(
  request,
  response
) {
  try {
    const studentUserId =
      parsePositiveId(
        request.params
          .studentUserId
      );

    if (!studentUserId) {
      return response.status(400).json({
        success: false,

        message:
          "A valid Student ID is required.",
      });
    }

    const candidate =
      await findRecruiterCandidateById({
        recruiterUserId:
          request.auth.userId,

        studentUserId,
      });

    if (!candidate) {
      return response.status(404).json({
        success: false,

        message:
          "Candidate was not found.",
      });
    }

    return response.status(200).json({
      success: true,
      candidate,
    });
  } catch (error) {
    console.error(
      "Get Recruiter candidate error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve candidate details.",
    });
  }
}

export async function saveCandidate(
  request,
  response
) {
  try {
    const studentUserId =
      parsePositiveId(
        request.params
          .studentUserId
      );

    if (!studentUserId) {
      return response.status(400).json({
        success: false,

        message:
          "A valid Student ID is required.",
      });
    }

    const saved =
      await saveRecruiterCandidate({
        recruiterUserId:
          request.auth.userId,

        studentUserId,
      });

    if (!saved) {
      return response.status(404).json({
        success: false,

        message:
          "Candidate was not found.",
      });
    }

    return response.status(200).json({
      success: true,

      message:
        "Candidate saved successfully.",

      saved: true,
    });
  } catch (error) {
    console.error(
      "Save candidate error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to save the candidate.",
    });
  }
}

export async function removeSavedCandidate(
  request,
  response
) {
  try {
    const studentUserId =
      parsePositiveId(
        request.params
          .studentUserId
      );

    if (!studentUserId) {
      return response.status(400).json({
        success: false,

        message:
          "A valid Student ID is required.",
      });
    }

    await removeRecruiterSavedCandidate({
      recruiterUserId:
        request.auth.userId,

      studentUserId,
    });

    return response.status(200).json({
      success: true,

      message:
        "Candidate removed from saved candidates.",

      saved: false,
    });
  } catch (error) {
    console.error(
      "Remove saved candidate error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to remove the saved candidate.",
    });
  }
}

export async function getCandidateJobOptions(
  request,
  response
) {
  try {
    const jobs =
      await findRecruiterCandidateJobOptions(
        request.auth.userId
      );

    return response.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(
      "Get candidate job options error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve job options.",
    });
  }
}

export async function inviteCandidate(
  request,
  response
) {
  try {
    const studentUserId =
      parsePositiveId(
        request.params
          .studentUserId
      );

    const jobId =
      parsePositiveId(
        request.body?.jobId
      );

    const message =
      readText(
        request.body?.message
      );

    if (!studentUserId) {
      return response.status(400).json({
        success: false,

        message:
          "A valid Student ID is required.",
      });
    }

    if (!jobId) {
      return response.status(400).json({
        success: false,

        message:
          "Select a valid published job.",
      });
    }

    if (
      message.length > 1000
    ) {
      return response.status(400).json({
        success: false,

        message:
          "Invitation message cannot exceed 1000 characters.",
      });
    }

    const invitation =
      await inviteRecruiterCandidate({
        recruiterUserId:
          request.auth.userId,

        studentUserId,
        jobId,
        message,
      });

    if (!invitation) {
      return response.status(404).json({
        success: false,

        message:
          "Candidate or published job was not found.",
      });
    }

    return response.status(201).json({
      success: true,

      message:
        "Candidate invitation sent successfully.",

      invitation,
    });
  } catch (error) {
    console.error(
      "Invite candidate error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to invite the candidate.",
    });
  }
}

export async function getRecruiterCandidateResume(
  request,
  response
) {
  try {
    const studentUserId =
      parsePositiveId(
        request.params
          .studentUserId
      );

    if (!studentUserId) {
      return response.status(400).json({
        success: false,

        message:
          "A valid Student ID is required.",
      });
    }

    const resume =
      await findRecruiterCandidateResume(
        studentUserId
      );

    if (!resume) {
      return response.status(404).json({
        success: false,

        message:
          "The candidate does not have an available resume.",
      });
    }

    const resumePath =
      getResumePath(resume);

    if (!resumePath) {
      return response.status(404).json({
        success: false,

        message:
          "The resume file could not be found on the server.",
      });
    }

    const download =
      request.query.download ===
      "1";

    const originalFileName =
      resume.original_file_name ||
      "Candidate_Resume.pdf";

    const safeFileName =
      originalFileName.replace(
        /["\r\n]/g,
        "_"
      );

    response.setHeader(
      "Content-Type",
      resume.mime_type ||
        "application/pdf"
    );

    response.setHeader(
      "Content-Disposition",
      `${
        download
          ? "attachment"
          : "inline"
      }; filename="${safeFileName}"`
    );

    return response.sendFile(
      resumePath
    );
  } catch (error) {
    console.error(
      "Get candidate resume error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve the candidate resume.",
    });
  }
}