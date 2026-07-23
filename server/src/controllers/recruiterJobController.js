import {
    createRecruiterJob,
    deleteRecruiterDraftJob,
    duplicateRecruiterJob,
    findRecruiterJobById,
    findRecruiterJobs,
    recruiterHasCompanyProfile,
    updateRecruiterJob,
    updateRecruiterJobStatus,
  } from "../models/recruiterJobModel.js";
  
  const employmentTypes = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
    "Graduate Trainee",
  ];
  
  const experienceLevels = [
    "Fresher",
    "0 - 1 Year",
    "1 - 2 Years",
    "2 - 4 Years",
    "4+ Years",
  ];
  
  const workModes = [
    "On-site",
    "Hybrid",
    "Remote",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readNullableNumber(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }
  
    const numberValue = Number(value);
  
    return Number.isFinite(numberValue)
      ? numberValue
      : Number.NaN;
  }
  
  function readStringArray(value) {
    if (!Array.isArray(value)) {
      return [];
    }
  
    const uniqueValues = new Map();
  
    value.forEach((item) => {
      const cleanedItem = readText(item);
  
      if (!cleanedItem) {
        return;
      }
  
      uniqueValues.set(
        cleanedItem.toLowerCase(),
        cleanedItem
      );
    });
  
    return Array.from(
      uniqueValues.values()
    );
  }
  
  function readYearArray(value) {
    if (!Array.isArray(value)) {
      return [];
    }
  
    return [
      ...new Set(
        value
          .map(Number)
          .filter(
            (year) =>
              Number.isInteger(year) &&
              year >= 2000 &&
              year <= 2100
          )
      ),
    ];
  }
  
  function readJobData(body = {}) {
    return {
      jobTitle:
        readText(body.jobTitle),
  
      department:
        readText(body.department),
  
      employmentType:
        readText(
          body.employmentType
        ) || "Full-time",
  
      experience:
        readText(body.experience) ||
        "Fresher",
  
      salaryMin:
        readNullableNumber(
          body.salaryMin
        ),
  
      salaryMax:
        readNullableNumber(
          body.salaryMax
        ),
  
      city:
        readText(body.city),
  
      country:
        readText(body.country) ||
        "India",
  
      workMode:
        readText(body.workMode) ||
        "On-site",
  
      openings:
        Number(body.openings || 1),
  
      applicationDeadline:
        readText(
          body.applicationDeadline
        ) || null,
  
      minimumCgpa:
        Number(
          body.minimumCgpa ?? 6.5
        ),
  
      requiredSkills:
        readStringArray(
          body.requiredSkills
        ),
  
      preferredSkills:
        readStringArray(
          body.preferredSkills
        ),
  
      eligibleBranches:
        readStringArray(
          body.eligibleBranches
        ),
  
      eligibleGraduationYears:
        readYearArray(
          body.eligibleGraduationYears
        ),
  
      jobDescription:
        readText(
          body.jobDescription
        ),
  
      responsibilities:
        readText(
          body.responsibilities
        ),
  
      requirements:
        readText(body.requirements),
    };
  }
  
  function isValidDate(value) {
    if (!value) {
      return false;
    }
  
    return /^\d{4}-\d{2}-\d{2}$/.test(
      value
    );
  }
  
  function validateJob(
    job,
    {
      publishing = false,
    } = {}
  ) {
    if (
      job.jobTitle.length < 3 ||
      job.jobTitle.length > 180
    ) {
      return "Job title must contain between 3 and 180 characters.";
    }
  
    if (
      !employmentTypes.includes(
        job.employmentType
      )
    ) {
      return "Select a valid employment type.";
    }
  
    if (
      !experienceLevels.includes(
        job.experience
      )
    ) {
      return "Select a valid experience level.";
    }
  
    if (
      !workModes.includes(
        job.workMode
      )
    ) {
      return "Select a valid work mode.";
    }
  
    if (
      !Number.isInteger(job.openings) ||
      job.openings < 1 ||
      job.openings > 10000
    ) {
      return "Openings must be between 1 and 10000.";
    }
  
    if (
      !Number.isFinite(
        job.minimumCgpa
      ) ||
      job.minimumCgpa < 0 ||
      job.minimumCgpa > 10
    ) {
      return "Minimum CGPA must be between 0 and 10.";
    }
  
    if (
      Number.isNaN(job.salaryMin) ||
      Number.isNaN(job.salaryMax)
    ) {
      return "Salary values must be valid numbers.";
    }
  
    if (
      job.salaryMin !== null &&
      job.salaryMin < 0
    ) {
      return "Minimum salary cannot be negative.";
    }
  
    if (
      job.salaryMax !== null &&
      job.salaryMax < 0
    ) {
      return "Maximum salary cannot be negative.";
    }
  
    if (
      job.salaryMin !== null &&
      job.salaryMax !== null &&
      job.salaryMax < job.salaryMin
    ) {
      return "Maximum salary cannot be less than minimum salary.";
    }
  
    if (
      job.department.length > 120
    ) {
      return "Department cannot exceed 120 characters.";
    }
  
    if (job.city.length > 120) {
      return "City cannot exceed 120 characters.";
    }
  
    if (job.country.length > 120) {
      return "Country cannot exceed 120 characters.";
    }
  
    if (
      job.requiredSkills.length > 30 ||
      job.preferredSkills.length > 30
    ) {
      return "A job can contain a maximum of 30 required and 30 preferred skills.";
    }
  
    if (
      job.jobDescription.length > 5000 ||
      job.responsibilities.length > 5000 ||
      job.requirements.length > 5000
    ) {
      return "Each job description field cannot exceed 5000 characters.";
    }
  
    if (!publishing) {
      return "";
    }
  
    if (!job.department) {
      return "Department is required before publishing.";
    }
  
    if (
      job.workMode !== "Remote" &&
      !job.city
    ) {
      return "City is required for on-site and hybrid jobs.";
    }
  
    if (!job.country) {
      return "Country is required before publishing.";
    }
  
    if (
      !isValidDate(
        job.applicationDeadline
      )
    ) {
      return "A valid application deadline is required before publishing.";
    }
  
    const today =
      new Date()
        .toISOString()
        .slice(0, 10);
  
    if (
      job.applicationDeadline < today
    ) {
      return "Application deadline cannot be in the past.";
    }
  
    if (
      job.requiredSkills.length === 0
    ) {
      return "Add at least one required skill before publishing.";
    }
  
    if (
      job.eligibleBranches.length === 0
    ) {
      return "Select at least one eligible branch before publishing.";
    }
  
    if (
      job.eligibleGraduationYears
        .length === 0
    ) {
      return "Select at least one eligible graduation year before publishing.";
    }
  
    if (
      job.jobDescription.length < 30
    ) {
      return "Job description must contain at least 30 characters before publishing.";
    }
  
    return "";
  }
  
  function parseJobId(value) {
    const jobId = Number(value);
  
    return Number.isInteger(jobId) &&
      jobId > 0
      ? jobId
      : null;
  }
  
  export async function getRecruiterJobs(
    request,
    response
  ) {
    try {
      const jobs =
        await findRecruiterJobs(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        jobs,
      });
    } catch (error) {
      console.error(
        "Get recruiter jobs error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve recruiter jobs.",
      });
    }
  }
  
  export async function getRecruiterJob(
    request,
    response
  ) {
    try {
      const jobId =
        parseJobId(
          request.params.jobId
        );
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const job =
        await findRecruiterJobById({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!job) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        job,
      });
    } catch (error) {
      console.error(
        "Get recruiter job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the job.",
      });
    }
  }
  
  export async function addRecruiterJob(
    request,
    response
  ) {
    try {
      const hasCompanyProfile =
        await recruiterHasCompanyProfile(
          request.auth.userId
        );
  
      if (!hasCompanyProfile) {
        return response.status(409).json({
          success: false,
          message:
            "Complete the company profile before creating jobs.",
        });
      }
  
      const requestedStatus =
        request.body?.status ===
        "active"
          ? "active"
          : "draft";
  
      const job =
        readJobData(
          request.body
        );
  
      const validationError =
        validateJob(job, {
          publishing:
            requestedStatus ===
            "active",
        });
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const createdJob =
        await createRecruiterJob({
          userId:
            request.auth.userId,
          job,
          status: requestedStatus,
        });
  
      return response.status(201).json({
        success: true,
  
        message:
          requestedStatus === "active"
            ? "Job published successfully."
            : "Job saved successfully as a draft.",
  
        job: createdJob,
      });
    } catch (error) {
      console.error(
        "Create recruiter job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to create the job.",
      });
    }
  }
  
  export async function editRecruiterJob(
    request,
    response
  ) {
    try {
      const jobId =
        parseJobId(
          request.params.jobId
        );
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const existingJob =
        await findRecruiterJobById({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!existingJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      const job =
        readJobData(
          request.body
        );
  
      const validationError =
        validateJob(job, {
          publishing:
            existingJob.status ===
            "active",
        });
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const updatedJob =
        await updateRecruiterJob({
          userId:
            request.auth.userId,
          jobId,
          job,
        });
  
      if (!updatedJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Job updated successfully.",
        job: updatedJob,
      });
    } catch (error) {
      console.error(
        "Update recruiter job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the job.",
      });
    }
  }
  
  export async function changeRecruiterJobStatus(
    request,
    response
  ) {
    try {
      const jobId =
        parseJobId(
          request.params.jobId
        );
  
      const requestedStatus =
        readText(
          request.body?.status
        ).toLowerCase();
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      if (
        ![
          "active",
          "closed",
        ].includes(requestedStatus)
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Status must be active or closed.",
        });
      }
  
      const existingJob =
        await findRecruiterJobById({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!existingJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      if (
        existingJob.status ===
        requestedStatus
      ) {
        return response.status(200).json({
          success: true,
          message:
            "Job already has the requested status.",
          job: existingJob,
        });
      }
  
      const isPublishingDraft =
        existingJob.status ===
          "draft" &&
        requestedStatus ===
          "active";
  
      const isClosingJob =
        existingJob.status ===
          "active" &&
        requestedStatus ===
          "closed";
  
      const isReopeningJob =
        existingJob.status ===
          "closed" &&
        requestedStatus ===
          "active";
  
      const allowedTransition =
        isPublishingDraft ||
        isClosingJob ||
        isReopeningJob;
  
      if (!allowedTransition) {
        return response.status(409).json({
          success: false,
          message:
            "The requested status transition is not allowed.",
        });
      }
  
      if (
        requestedStatus === "active"
      ) {
        /*
         * MySQL may return DECIMAL and numeric
         * values as strings. Normalize the job
         * before validating it for publishing.
         */
        const normalizedJob =
          readJobData(existingJob);
  
        const validationError =
          validateJob(normalizedJob, {
            publishing: true,
          });
  
        if (validationError) {
          return response.status(400).json({
            success: false,
            message: validationError,
          });
        }
      }
  
      const updatedJob =
        await updateRecruiterJobStatus({
          userId:
            request.auth.userId,
          jobId,
          status: requestedStatus,
        });
  
      if (!updatedJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      let successMessage =
        "Job status updated successfully.";
  
      if (isPublishingDraft) {
        successMessage =
          "Job published successfully.";
      } else if (isClosingJob) {
        successMessage =
          "Job closed successfully.";
      } else if (isReopeningJob) {
        successMessage =
          "Job reopened successfully.";
      }
  
      return response.status(200).json({
        success: true,
        message: successMessage,
        job: updatedJob,
      });
    } catch (error) {
      console.error(
        "Change recruiter job status error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to change the job status.",
      });
    }
  }
  
  export async function copyRecruiterJob(
    request,
    response
  ) {
    try {
      const jobId =
        parseJobId(
          request.params.jobId
        );
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const duplicatedJob =
        await duplicateRecruiterJob({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!duplicatedJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      return response.status(201).json({
        success: true,
        message:
          "Job duplicated successfully as a draft.",
        job: duplicatedJob,
      });
    } catch (error) {
      console.error(
        "Duplicate recruiter job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to duplicate the job.",
      });
    }
  }
  
  export async function removeRecruiterJob(
    request,
    response
  ) {
    try {
      const jobId =
        parseJobId(
          request.params.jobId
        );
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const existingJob =
        await findRecruiterJobById({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!existingJob) {
        return response.status(404).json({
          success: false,
          message:
            "Job was not found.",
        });
      }
  
      if (
        existingJob.status !== "draft"
      ) {
        return response.status(409).json({
          success: false,
          message:
            "Only draft jobs can be deleted. Close published jobs instead.",
        });
      }
  
      const deleted =
        await deleteRecruiterDraftJob({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (!deleted) {
        return response.status(404).json({
          success: false,
          message:
            "Draft job was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Draft job deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete recruiter job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to delete the job.",
      });
    }
  }