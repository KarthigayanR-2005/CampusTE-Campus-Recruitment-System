import {
    findPublishedJobById,
    findStudentEligibilityProfile,
    findStudentSkillNames,
  } from "../models/studentJobModel.js";
  
  import {
    createStudentApplication,
    findLatestStudentResume,
    findStudentApplicationById,
    findStudentApplicationByJob,
    findStudentApplications,
    withdrawStudentApplication,
  } from "../models/studentApplicationModel.js";
  
  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
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
  
  function readCoverNote(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function calculateEligibility({
    job,
    profile,
    skills,
  }) {
    const reasons = [];
  
    const studentCgpa =
      Number(profile.cgpa);
  
    const minimumCgpa =
      Number(
        job.minimumCgpa || 0
      );
  
    const cgpaPassed =
      Number.isFinite(
        studentCgpa
      ) &&
      studentCgpa >=
        minimumCgpa;
  
    if (!cgpaPassed) {
      reasons.push(
        Number.isFinite(studentCgpa)
          ? `Minimum CGPA required is ${minimumCgpa.toFixed(
              2
            )}, but your CGPA is ${studentCgpa.toFixed(
              2
            )}.`
          : "Add your CGPA to the Student profile."
      );
    }
  
    const studentDepartment =
      String(
        profile.department || ""
      ).trim();
  
    const eligibleBranches =
      Array.isArray(
        job.eligibleBranches
      )
        ? job.eligibleBranches
        : [];
  
    const departmentPassed =
      Boolean(studentDepartment) &&
      eligibleBranches.some(
        (branch) =>
          normalizeText(branch) ===
          normalizeText(
            studentDepartment
          )
      );
  
    if (!departmentPassed) {
      reasons.push(
        studentDepartment
          ? `${studentDepartment} is not included in the eligible departments.`
          : "Add your department to the Student profile."
      );
    }
  
    const graduationYear =
      Number(
        profile.graduationYear
      );
  
    const eligibleYears =
      Array.isArray(
        job.eligibleGraduationYears
      )
        ? job
            .eligibleGraduationYears
            .map(Number)
        : [];
  
    const graduationYearPassed =
      Number.isInteger(
        graduationYear
      ) &&
      eligibleYears.includes(
        graduationYear
      );
  
    if (!graduationYearPassed) {
      reasons.push(
        Number.isInteger(
          graduationYear
        )
          ? `${graduationYear} is not included in the eligible graduation years.`
          : "Add your graduation year to the Student profile."
      );
    }
  
    const today =
      new Date()
        .toISOString()
        .slice(0, 10);
  
    const deadlinePassed =
      Boolean(
        job.applicationDeadline
      ) &&
      job.applicationDeadline >=
        today;
  
    if (!deadlinePassed) {
      reasons.push(
        "The application deadline has passed."
      );
    }
  
    const studentSkillNames =
      new Set(
        skills.map(
          normalizeText
        )
      );
  
    const requiredSkills =
      Array.isArray(
        job.requiredSkills
      )
        ? job.requiredSkills
        : [];
  
    const matchedSkills =
      requiredSkills.filter(
        (skill) =>
          studentSkillNames.has(
            normalizeText(skill)
          )
      );
  
    return {
      eligible:
        cgpaPassed &&
        departmentPassed &&
        graduationYearPassed &&
        deadlinePassed,
  
      reasons,
  
      matchedSkills,
  
      requiredSkills,
  
      skillMatchPercentage:
        requiredSkills.length === 0
          ? 100
          : Math.round(
              (
                matchedSkills.length /
                requiredSkills.length
              ) * 100
            ),
    };
  }
  
  async function loadStudentEligibilityData(
    userId
  ) {
    const [
      profile,
      skills,
    ] = await Promise.all([
      findStudentEligibilityProfile(
        userId
      ),
  
      findStudentSkillNames(
        userId
      ),
    ]);
  
    return {
      profile,
      skills,
    };
  }
  
  export async function applyForStudentJob(
    request,
    response
  ) {
    try {
      const jobId =
        parsePositiveId(
          request.params.jobId
        );
  
      if (!jobId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const coverNote =
        readCoverNote(
          request.body?.coverNote
        );
  
      if (
        coverNote.length > 2000
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Cover note cannot exceed 2000 characters.",
        });
      }
  
      const existingApplication =
        await findStudentApplicationByJob({
          userId:
            request.auth.userId,
          jobId,
        });
  
      if (existingApplication) {
        return response.status(409).json({
          success: false,
          message:
            "You have already applied for this job.",
          application:
            existingApplication,
        });
      }
  
      const [
        job,
        studentData,
        resume,
      ] = await Promise.all([
        findPublishedJobById(
          jobId
        ),
  
        loadStudentEligibilityData(
          request.auth.userId
        ),
  
        findLatestStudentResume(
          request.auth.userId
        ),
      ]);
  
      if (!job) {
        return response.status(404).json({
          success: false,
          message:
            "The published job was not found or applications are closed.",
        });
      }
  
      if (!studentData.profile) {
        return response.status(404).json({
          success: false,
          message:
            "Student profile was not found.",
        });
      }
  
      const eligibility =
        calculateEligibility({
          job,
          profile:
            studentData.profile,
          skills:
            studentData.skills,
        });
  
      if (!eligibility.eligible) {
        return response.status(403).json({
          success: false,
          message:
            "You are not eligible to apply for this job.",
          eligibility,
        });
      }
  
      if (!resume) {
        return response.status(409).json({
          success: false,
          message:
            "Upload a PDF resume before applying for jobs.",
        });
      }
  
      const application =
        await createStudentApplication({
          userId:
            request.auth.userId,
  
          jobId,
  
          resumeId:
            resume.resumeId,
  
          resumeFileName:
            resume.fileName,
  
          coverNote,
        });
  
      return response.status(201).json({
        success: true,
        message:
          "Application submitted successfully.",
        application,
      });
    } catch (error) {
      if (
        error.code ===
        "ER_DUP_ENTRY"
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You have already applied for this job.",
        });
      }
  
      console.error(
        "Apply for Student job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to submit the application.",
      });
    }
  }
  
  export async function getStudentApplications(
    request,
    response
  ) {
    try {
      const applications =
        await findStudentApplications(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        applications,
        totalApplications:
          applications.length,
      });
    } catch (error) {
      console.error(
        "Get Student applications error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve applications.",
      });
    }
  }
  
  export async function getStudentApplication(
    request,
    response
  ) {
    try {
      const applicationId =
        parsePositiveId(
          request.params.applicationId
        );
  
      if (!applicationId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid application ID is required.",
        });
      }
  
      const application =
        await findStudentApplicationById({
          userId:
            request.auth.userId,
  
          applicationId,
        });
  
      if (!application) {
        return response.status(404).json({
          success: false,
          message:
            "Application was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        application,
      });
    } catch (error) {
      console.error(
        "Get Student application error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the application.",
      });
    }
  }
  
  export async function withdrawApplication(
    request,
    response
  ) {
    try {
      const applicationId =
        parsePositiveId(
          request.params.applicationId
        );
  
      if (!applicationId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid application ID is required.",
        });
      }
  
      const existingApplication =
        await findStudentApplicationById({
          userId:
            request.auth.userId,
  
          applicationId,
        });
  
      if (!existingApplication) {
        return response.status(404).json({
          success: false,
          message:
            "Application was not found.",
        });
      }
  
      if (
        !existingApplication.canWithdraw
      ) {
        return response.status(409).json({
          success: false,
          message:
            "This application can no longer be withdrawn.",
        });
      }
  
      const application =
        await withdrawStudentApplication({
          userId:
            request.auth.userId,
  
          applicationId,
        });
  
      if (!application) {
        return response.status(409).json({
          success: false,
          message:
            "The application could not be withdrawn.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Application withdrawn successfully.",
        application,
      });
    } catch (error) {
      console.error(
        "Withdraw Student application error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to withdraw the application.",
      });
    }
  }