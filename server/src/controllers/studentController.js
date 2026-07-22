import {
    findStudentProfileByUserId,
    saveStudentProfile,
  } from "../models/studentModel.js";
  
  const allowedGenders = [
    "male",
    "female",
    "other",
    "prefer_not_to_say",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readOptionalInteger(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }
  
    return Number(value);
  }
  
  function readOptionalNumber(value) {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return null;
    }
  
    return Number(value);
  }
  
  function isValidWebUrl(value) {
    if (!value) {
      return true;
    }
  
    try {
      const parsedUrl = new URL(value);
  
      return (
        parsedUrl.protocol === "http:" ||
        parsedUrl.protocol === "https:"
      );
    } catch {
      return false;
    }
  }
  
  export async function getStudentProfile(
    request,
    response
  ) {
    try {
      const profile =
        await findStudentProfileByUserId(
          request.auth.userId
        );
  
      if (!profile) {
        return response.status(404).json({
          success: false,
          message:
            "Student account was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.error(
        "Get student profile error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the Student profile.",
      });
    }
  }
  
  export async function updateStudentProfile(
    request,
    response
  ) {
    try {
      const body = request.body || {};
  
      const fullName = readText(
        body.fullName
      );
  
      const phone = readText(body.phone);
  
      const dateOfBirth = readText(
        body.dateOfBirth
      );
  
      const gender = readText(
        body.gender
      ).toLowerCase();
  
      const rollNumber = readText(
        body.rollNumber
      );
  
      const institution = readText(
        body.institution
      );
  
      const degree = readText(
        body.degree
      );
  
      const department = readText(
        body.department
      );
  
      const yearOfStudy =
        readOptionalInteger(
          body.yearOfStudy
        );
  
      const cgpa = readOptionalNumber(
        body.cgpa
      );
  
      const graduationYear =
        readOptionalInteger(
          body.graduationYear
        );
  
      const city = readText(body.city);
      const state = readText(body.state);
      const country = readText(
        body.country
      );
  
      const linkedinUrl = readText(
        body.linkedinUrl
      );
  
      const githubUrl = readText(
        body.githubUrl
      );
  
      const portfolioUrl = readText(
        body.portfolioUrl
      );
  
      const profileSummary = readText(
        body.profileSummary
      );
  
      if (!fullName) {
        return response.status(400).json({
          success: false,
          message:
            "Full name is required.",
        });
      }
  
      if (
        fullName.length < 2 ||
        fullName.length > 100
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Full name must contain between 2 and 100 characters.",
        });
      }
  
      if (
        gender &&
        !allowedGenders.includes(gender)
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Please select a valid gender.",
        });
      }
  
      if (dateOfBirth) {
        const validDateFormat =
          /^\d{4}-\d{2}-\d{2}$/.test(
            dateOfBirth
          );
  
        const parsedDate = new Date(
          `${dateOfBirth}T00:00:00`
        );
  
        if (
          !validDateFormat ||
          Number.isNaN(
            parsedDate.getTime()
          )
        ) {
          return response.status(400).json({
            success: false,
            message:
              "Please enter a valid date of birth.",
          });
        }
  
        if (parsedDate > new Date()) {
          return response.status(400).json({
            success: false,
            message:
              "Date of birth cannot be in the future.",
          });
        }
      }
  
      if (
        yearOfStudy !== null &&
        (
          !Number.isInteger(
            yearOfStudy
          ) ||
          yearOfStudy < 1 ||
          yearOfStudy > 8
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Year of study must be between 1 and 8.",
        });
      }
  
      if (
        cgpa !== null &&
        (
          !Number.isFinite(cgpa) ||
          cgpa < 0 ||
          cgpa > 10
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "CGPA must be between 0 and 10.",
        });
      }
  
      if (
        graduationYear !== null &&
        (
          !Number.isInteger(
            graduationYear
          ) ||
          graduationYear < 2000 ||
          graduationYear > 2200
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Please enter a valid graduation year.",
        });
      }
  
      const lengthRules = [
        [phone, 30, "Phone number"],
        [
          rollNumber,
          50,
          "Roll number",
        ],
        [
          institution,
          180,
          "Institution",
        ],
        [degree, 100, "Degree"],
        [
          department,
          120,
          "Department",
        ],
        [city, 100, "City"],
        [state, 100, "State"],
        [country, 100, "Country"],
        [
          linkedinUrl,
          255,
          "LinkedIn URL",
        ],
        [
          githubUrl,
          255,
          "GitHub URL",
        ],
        [
          portfolioUrl,
          255,
          "Portfolio URL",
        ],
        [
          profileSummary,
          2000,
          "Profile summary",
        ],
      ];
  
      for (const [
        value,
        maximumLength,
        fieldName,
      ] of lengthRules) {
        if (
          value.length > maximumLength
        ) {
          return response.status(400).json({
            success: false,
            message:
              `${fieldName} cannot exceed ${maximumLength} characters.`,
          });
        }
      }
  
      const urls = [
        [linkedinUrl, "LinkedIn URL"],
        [githubUrl, "GitHub URL"],
        [portfolioUrl, "Portfolio URL"],
      ];
  
      for (const [url, fieldName] of urls) {
        if (!isValidWebUrl(url)) {
          return response.status(400).json({
            success: false,
            message:
              `${fieldName} must begin with http:// or https://.`,
          });
        }
      }
  
      const profile =
        await saveStudentProfile({
          userId:
            request.auth.userId,
  
          fullName,
          phone,
          dateOfBirth:
            dateOfBirth || null,
  
          gender: gender || null,
  
          rollNumber:
            rollNumber || null,
  
          institution:
            institution || null,
  
          degree: degree || null,
  
          department:
            department || null,
  
          yearOfStudy,
          cgpa,
          graduationYear,
  
          city: city || null,
          state: state || null,
          country: country || null,
  
          linkedinUrl:
            linkedinUrl || null,
  
          githubUrl:
            githubUrl || null,
  
          portfolioUrl:
            portfolioUrl || null,
  
          profileSummary:
            profileSummary || null,
        });
  
      return response.status(200).json({
        success: true,
        message:
          "Student profile updated successfully.",
        profile,
      });
    } catch (error) {
      console.error(
        "Update student profile error:",
        error
      );
  
      if (
        error.message ===
        "STUDENT_ACCOUNT_NOT_FOUND"
      ) {
        return response.status(404).json({
          success: false,
          message:
            "Student account was not found.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the Student profile.",
      });
    }
  }