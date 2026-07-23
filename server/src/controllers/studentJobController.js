import {
    findPublishedJobById,
    findPublishedJobs,
    findStudentEligibilityProfile,
    findStudentSkillNames,
  } from "../models/studentJobModel.js";
  
  function normalizeText(value) {
    return String(value || "")
      .trim()
      .toLowerCase();
  }
  
  function parseJobId(value) {
    const jobId = Number(value);
  
    return Number.isInteger(jobId) &&
      jobId > 0
      ? jobId
      : null;
  }
  
  function createStudentData({
    profile,
    skills,
  }) {
    return {
      ...profile,
  
      skills:
        Array.isArray(skills)
          ? skills
          : [],
    };
  }
  
  function calculateJobEligibility({
    job,
    student,
  }) {
    const checks = [];
  
    const studentCgpa =
      Number(student.cgpa);
  
    const requiredCgpa =
      Number(job.minimumCgpa || 0);
  
    const hasCgpa =
      Number.isFinite(studentCgpa);
  
    const cgpaPassed =
      hasCgpa &&
      studentCgpa >= requiredCgpa;
  
    checks.push({
      key: "cgpa",
      label: "Minimum CGPA",
      passed: cgpaPassed,
  
      studentValue:
        hasCgpa
          ? studentCgpa.toFixed(2)
          : "Not provided",
  
      requiredValue:
        requiredCgpa.toFixed(2),
  
      message:
        !hasCgpa
          ? "Add your CGPA in the Student profile."
          : cgpaPassed
            ? `Your CGPA ${studentCgpa.toFixed(
                2
              )} meets the required ${requiredCgpa.toFixed(
                2
              )}.`
            : `Minimum CGPA required is ${requiredCgpa.toFixed(
                2
              )}, but your CGPA is ${studentCgpa.toFixed(
                2
              )}.`,
    });
  
    const studentDepartment =
      String(
        student.department || ""
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
  
    checks.push({
      key: "department",
      label: "Department",
      passed: departmentPassed,
  
      studentValue:
        studentDepartment ||
        "Not provided",
  
      requiredValue:
        eligibleBranches.join(", "),
  
      message:
        !studentDepartment
          ? "Add your department in the Student profile."
          : departmentPassed
            ? `${studentDepartment} is an eligible department.`
            : `${studentDepartment} is not included in the eligible departments.`,
    });
  
    const graduationYear =
      Number(
        student.graduationYear
      );
  
    const hasGraduationYear =
      Number.isInteger(
        graduationYear
      );
  
    const eligibleYears =
      Array.isArray(
        job.eligibleGraduationYears
      )
        ? job.eligibleGraduationYears.map(
            Number
          )
        : [];
  
    const graduationYearPassed =
      hasGraduationYear &&
      eligibleYears.includes(
        graduationYear
      );
  
    checks.push({
      key: "graduationYear",
      label: "Graduation Year",
      passed:
        graduationYearPassed,
  
      studentValue:
        hasGraduationYear
          ? String(graduationYear)
          : "Not provided",
  
      requiredValue:
        eligibleYears.join(", "),
  
      message:
        !hasGraduationYear
          ? "Add your graduation year in the Student profile."
          : graduationYearPassed
            ? `${graduationYear} is an eligible graduation year.`
            : `${graduationYear} is not included in the eligible graduation years.`,
    });
  
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
  
    checks.push({
      key: "deadline",
      label: "Application Deadline",
      passed: deadlinePassed,
  
      studentValue: today,
  
      requiredValue:
        job.applicationDeadline ||
        "Not provided",
  
      message:
        deadlinePassed
          ? `Applications are open until ${job.applicationDeadline}.`
          : "The application deadline has passed.",
    });
  
    const studentSkillMap =
      new Map(
        student.skills.map(
          (skill) => [
            normalizeText(skill),
            skill,
          ]
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
          studentSkillMap.has(
            normalizeText(skill)
          )
      );
  
    const missingSkills =
      requiredSkills.filter(
        (skill) =>
          !studentSkillMap.has(
            normalizeText(skill)
          )
      );
  
    const skillMatchPercentage =
      requiredSkills.length === 0
        ? 100
        : Math.round(
            (
              matchedSkills.length /
              requiredSkills.length
            ) * 100
          );
  
    const academicChecks =
      checks.filter(
        (check) =>
          check.key !== "skills"
      );
  
    const eligible =
      academicChecks.every(
        (check) => check.passed
      );
  
    const academicScore =
      Math.round(
        (
          academicChecks.filter(
            (check) => check.passed
          ).length /
          academicChecks.length
        ) * 75
      );
  
    const skillScore =
      Math.round(
        skillMatchPercentage * 0.25
      );
  
    const matchPercentage =
      Math.min(
        100,
        academicScore + skillScore
      );
  
    const reasons =
      checks
        .filter(
          (check) => !check.passed
        )
        .map(
          (check) => check.message
        );
  
    return {
      eligible,
  
      status:
        eligible
          ? "eligible"
          : "not_eligible",
  
      matchPercentage,
  
      checks,
  
      skillMatch: {
        matchedCount:
          matchedSkills.length,
  
        requiredCount:
          requiredSkills.length,
  
        percentage:
          skillMatchPercentage,
  
        matchedSkills,
        missingSkills,
      },
  
      reasons,
  
      calculatedAt:
        new Date().toISOString(),
    };
  }
  
  async function loadStudentData(
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
  
    if (!profile) {
      return null;
    }
  
    return createStudentData({
      profile,
      skills,
    });
  }
  
  export async function getStudentJobs(
    request,
    response
  ) {
    try {
      const [
        jobs,
        student,
      ] = await Promise.all([
        findPublishedJobs(),
  
        loadStudentData(
          request.auth.userId
        ),
      ]);
  
      if (!student) {
        return response.status(404).json({
          success: false,
          message:
            "Student account was not found.",
        });
      }
  
      const jobsWithEligibility =
        jobs.map((job) => ({
          ...job,
  
          eligibility:
            calculateJobEligibility({
              job,
              student,
            }),
        }));
  
      return response.status(200).json({
        success: true,
  
        jobs:
          jobsWithEligibility,
  
        student: {
          department:
            student.department,
  
          cgpa:
            student.cgpa,
  
          graduationYear:
            student.graduationYear,
  
          skillCount:
            student.skills.length,
        },
  
        totalJobs:
          jobsWithEligibility.length,
      });
    } catch (error) {
      console.error(
        "Get Student jobs error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve published jobs.",
      });
    }
  }
  
  export async function getStudentJob(
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
  
      const [
        job,
        student,
      ] = await Promise.all([
        findPublishedJobById(
          jobId
        ),
  
        loadStudentData(
          request.auth.userId
        ),
      ]);
  
      if (!job) {
        return response.status(404).json({
          success: false,
          message:
            "Published job was not found.",
        });
      }
  
      if (!student) {
        return response.status(404).json({
          success: false,
          message:
            "Student account was not found.",
        });
      }
  
      const eligibility =
        calculateJobEligibility({
          job,
          student,
        });
  
      return response.status(200).json({
        success: true,
        job,
        eligibility,
      });
    } catch (error) {
      console.error(
        "Get Student job error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the job.",
      });
    }
  }
  
  export async function getStudentJobEligibility(
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
  
      const [
        job,
        student,
      ] = await Promise.all([
        findPublishedJobById(
          jobId
        ),
  
        loadStudentData(
          request.auth.userId
        ),
      ]);
  
      if (!job) {
        return response.status(404).json({
          success: false,
          message:
            "Published job was not found.",
        });
      }
  
      if (!student) {
        return response.status(404).json({
          success: false,
          message:
            "Student account was not found.",
        });
      }
  
      const eligibility =
        calculateJobEligibility({
          job,
          student,
        });
  
      return response.status(200).json({
        success: true,
        jobId: job.jobId,
        eligibility,
      });
    } catch (error) {
      console.error(
        "Get Student job eligibility error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to calculate job eligibility.",
      });
    }
  }