import fs from "fs";
import path from "path";

import {
  fileURLToPath,
} from "url";

import {
  findRecruiterApplicantById,
  findRecruiterApplicantResume,
  findRecruiterApplicants,
  updateRecruiterApplicantStatus,
} from "../models/recruiterApplicantModel.js";

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

const serverDirectory =
  path.resolve(
    currentDirectory,
    "../.."
  );

const validStatuses = [
  "applied",
  "under_review",
  "shortlisted",
  "interview",
  "selected",
  "rejected",
  "withdrawn",
];

const interviewModes = [
  "Google Meet",
  "Microsoft Teams",
  "Zoom",
  "In Person",
  "Phone Interview",
];

const allowedTransitions = {
  applied: [
    "under_review",
    "shortlisted",
    "interview",
    "rejected",
  ],

  under_review: [
    "shortlisted",
    "interview",
    "rejected",
  ],

  shortlisted: [
    "interview",
    "selected",
    "rejected",
  ],

  interview: [
    "selected",
    "rejected",
  ],

  selected: [],

  rejected: [],

  withdrawn: [],
};

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
  ) && parsedValue > 0
    ? parsedValue
    : null;
}

function isValidDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(
    value
  );
}

function isValidTime(value) {
  return /^\d{2}:\d{2}$/.test(
    value
  );
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
      path.isAbsolute(storedPath)
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
        fs.existsSync(filePath)
    ) || null
  );
}

export async function getRecruiterApplicants(
  request,
  response
) {
  try {
    const jobId =
      request.query.jobId
        ? parsePositiveId(
            request.query.jobId
          )
        : null;

    if (
      request.query.jobId &&
      !jobId
    ) {
      return response.status(400).json({
        success: false,
        message:
          "A valid job ID is required.",
      });
    }

    const status =
      readText(
        request.query.status
      ).toLowerCase();

    if (
      status &&
      !validStatuses.includes(
        status
      )
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Invalid application status.",
      });
    }

    const search =
      readText(
        request.query.search
      );

    const applicants =
      await findRecruiterApplicants({
        recruiterUserId:
          request.auth.userId,

        jobId,
        status,
        search,
      });

    const jobOptions = [
      ...new Map(
        applicants.map(
          (applicant) => [
            applicant.jobId,

            {
              jobId:
                applicant.jobId,

              jobTitle:
                applicant.job
                  .jobTitle,
            },
          ]
        )
      ).values(),
    ];

    const statistics = {
      total:
        applicants.length,

      applied:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "applied"
        ).length,

      underReview:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "under_review"
        ).length,

      shortlisted:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "shortlisted"
        ).length,

      interviews:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "interview"
        ).length,

      selected:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "selected"
        ).length,

      rejected:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "rejected"
        ).length,

      withdrawn:
        applicants.filter(
          (applicant) =>
            applicant.status ===
            "withdrawn"
        ).length,
    };

    return response.status(200).json({
      success: true,
      applicants,
      jobOptions,
      statistics,
    });
  } catch (error) {
    console.error(
      "Get Recruiter applicants error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve applicants.",
    });
  }
}

export async function getRecruiterApplicant(
  request,
  response
) {
  try {
    const applicationId =
      parsePositiveId(
        request.params
          .applicationId
      );

    if (!applicationId) {
      return response.status(400).json({
        success: false,
        message:
          "A valid application ID is required.",
      });
    }

    const applicant =
      await findRecruiterApplicantById({
        recruiterUserId:
          request.auth.userId,

        applicationId,
      });

    if (!applicant) {
      return response.status(404).json({
        success: false,
        message:
          "Applicant was not found.",
      });
    }

    return response.status(200).json({
      success: true,
      applicant,
    });
  } catch (error) {
    console.error(
      "Get Recruiter applicant error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve applicant details.",
    });
  }
}

export async function changeRecruiterApplicantStatus(
  request,
  response
) {
  try {
    const applicationId =
      parsePositiveId(
        request.params
          .applicationId
      );

    if (!applicationId) {
      return response.status(400).json({
        success: false,
        message:
          "A valid application ID is required.",
      });
    }

    const status =
      readText(
        request.body?.status
      ).toLowerCase();

    if (
      !validStatuses.includes(
        status
      ) ||
      status === "withdrawn"
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Select a valid Recruiter application status.",
      });
    }

    const note =
      readText(
        request.body?.note
      );

    if (note.length > 1000) {
      return response.status(400).json({
        success: false,
        message:
          "Status note cannot exceed 1000 characters.",
      });
    }

    const existingApplicant =
      await findRecruiterApplicantById({
        recruiterUserId:
          request.auth.userId,

        applicationId,
      });

    if (!existingApplicant) {
      return response.status(404).json({
        success: false,
        message:
          "Applicant was not found.",
      });
    }

    if (
      existingApplicant.status ===
      "withdrawn"
    ) {
      return response.status(409).json({
        success: false,
        message:
          "A withdrawn application cannot be updated.",
      });
    }

    if (
      existingApplicant.status ===
      status
    ) {
      return response.status(200).json({
        success: true,
        message:
          "Applicant already has the requested status.",
        applicant:
          existingApplicant,
      });
    }

    const allowedStatuses =
      allowedTransitions[
        existingApplicant.status
      ] || [];

    if (
      !allowedStatuses.includes(
        status
      )
    ) {
      return response.status(409).json({
        success: false,

        message:
          `Status cannot be changed from ${existingApplicant.statusLabel} to ${status}.`,
      });
    }

    let interview = null;

    if (status === "interview") {
      const interviewDate =
        readText(
          request.body
            ?.interviewDate
        );

      const interviewTime =
        readText(
          request.body
            ?.interviewTime
        );

      const interviewMode =
        readText(
          request.body
            ?.interviewMode
        );

      const interviewer =
        readText(
          request.body
            ?.interviewer
        );

      const interviewDetails =
        readText(
          request.body
            ?.interviewDetails
        );

      if (
        !isValidDate(
          interviewDate
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Select a valid interview date.",
        });
      }

      const today =
        new Date()
          .toISOString()
          .slice(0, 10);

      if (
        interviewDate < today
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Interview date cannot be in the past.",
        });
      }

      if (
        !isValidTime(
          interviewTime
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Select a valid interview time.",
        });
      }

      if (
        !interviewModes.includes(
          interviewMode
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Select a valid interview mode.",
        });
      }

      if (
        interviewer.length < 2 ||
        interviewer.length > 150
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Interviewer name must contain between 2 and 150 characters.",
        });
      }

      if (
        interviewDetails.length >
        500
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Interview details cannot exceed 500 characters.",
        });
      }

      interview = {
        date: interviewDate,
        time: interviewTime,
        mode: interviewMode,
        interviewer,
        details:
          interviewDetails,
      };
    }

    const applicant =
      await updateRecruiterApplicantStatus({
        recruiterUserId:
          request.auth.userId,

        applicationId,
        status,
        note,
        interview,
      });

    if (!applicant) {
      return response.status(404).json({
        success: false,
        message:
          "Applicant was not found.",
      });
    }

    return response.status(200).json({
      success: true,

      message:
        status === "interview"
          ? "Interview scheduled successfully."
          : `Applicant status changed to ${applicant.statusLabel}.`,

      applicant,
    });
  } catch (error) {
    console.error(
      "Change Recruiter applicant status error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to update applicant status.",
    });
  }
}

export async function getRecruiterApplicantResume(
  request,
  response
) {
  try {
    const applicationId =
      parsePositiveId(
        request.params
          .applicationId
      );

    if (!applicationId) {
      return response.status(400).json({
        success: false,
        message:
          "A valid application ID is required.",
      });
    }

    const resume =
      await findRecruiterApplicantResume({
        recruiterUserId:
          request.auth.userId,

        applicationId,
      });

    if (!resume) {
      return response.status(404).json({
        success: false,
        message:
          "Applicant or resume was not found.",
      });
    }

    if (
      !resume.application_resume_id
    ) {
      return response.status(404).json({
        success: false,
        message:
          "The applicant does not have an available resume.",
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
      resume.application_resume_file_name ||
      "Applicant_Resume.pdf";

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
      "Get Recruiter applicant resume error:",
      error
    );

    return response.status(500).json({
      success: false,

      message:
        error.message ||
        "Unable to retrieve applicant resume.",
    });
  }
}