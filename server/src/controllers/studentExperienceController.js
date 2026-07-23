import {
    createStudentExperience,
    deleteStudentExperience,
    findDuplicateExperience,
    findStudentExperienceById,
    findStudentExperiences,
    updateStudentExperience,
  } from "../models/studentExperienceModel.js";
  
  const allowedEmploymentTypes = [
    "internship",
    "full_time",
    "part_time",
    "freelance",
    "contract",
    "volunteer",
    "apprenticeship",
    "other",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readExperienceId(value) {
    const experienceId = Number(value);
  
    if (
      !Number.isInteger(experienceId) ||
      experienceId <= 0
    ) {
      return null;
    }
  
    return experienceId;
  }
  
  function readBoolean(value) {
    if (typeof value === "boolean") {
      return value;
    }
  
    return (
      value === 1 ||
      value === "1" ||
      value === "true"
    );
  }
  
  function isValidDate(value) {
    if (
      !value ||
      !/^\d{4}-\d{2}-\d{2}$/.test(
        value
      )
    ) {
      return false;
    }
  
    const date = new Date(
      `${value}T00:00:00Z`
    );
  
    if (Number.isNaN(date.getTime())) {
      return false;
    }
  
    return (
      date.toISOString().slice(0, 10) ===
      value
    );
  }
  
  function readExperienceData(body = {}) {
    const currentlyWorking =
      readBoolean(body.currentlyWorking);
  
    return {
      company: readText(body.company),
      role: readText(body.role),
  
      employmentType: readText(
        body.employmentType
      ).toLowerCase(),
  
      location: readText(body.location),
      startDate: readText(body.startDate),
  
      endDate: currentlyWorking
        ? ""
        : readText(body.endDate),
  
      currentlyWorking,
  
      description: readText(
        body.description
      ),
    };
  }
  
  function validateExperience({
    company,
    role,
    employmentType,
    location,
    startDate,
    endDate,
    currentlyWorking,
    description,
  }) {
    if (!company) {
      return "Company or organization name is required.";
    }
  
    if (company.length < 2) {
      return "Company name must contain at least 2 characters.";
    }
  
    if (company.length > 150) {
      return "Company name cannot exceed 150 characters.";
    }
  
    if (!role) {
      return "Job title is required.";
    }
  
    if (role.length < 2) {
      return "Job title must contain at least 2 characters.";
    }
  
    if (role.length > 150) {
      return "Job title cannot exceed 150 characters.";
    }
  
    if (
      !allowedEmploymentTypes.includes(
        employmentType
      )
    ) {
      return "Select a valid employment type.";
    }
  
    if (!location) {
      return "Location is required. Enter Remote when applicable.";
    }
  
    if (location.length > 150) {
      return "Location cannot exceed 150 characters.";
    }
  
    if (!startDate) {
      return "Start date is required.";
    }
  
    if (!isValidDate(startDate)) {
      return "Enter a valid start date.";
    }
  
    if (!currentlyWorking) {
      if (!endDate) {
        return "Enter an end date or select Currently Working.";
      }
  
      if (!isValidDate(endDate)) {
        return "Enter a valid end date.";
      }
  
      if (endDate < startDate) {
        return "End date cannot be before the start date.";
      }
    }
  
    if (!description) {
      return "Experience description is required.";
    }
  
    if (description.length < 10) {
      return "Description must contain at least 10 characters.";
    }
  
    if (description.length > 3000) {
      return "Description cannot exceed 3000 characters.";
    }
  
    return "";
  }
  
  export async function getStudentExperiences(
    request,
    response
  ) {
    try {
      const experiences =
        await findStudentExperiences(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        count: experiences.length,
        experiences,
      });
    } catch (error) {
      console.error(
        "Get student experiences error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve your experiences.",
      });
    }
  }
  
  export async function addStudentExperience(
    request,
    response
  ) {
    try {
      const experienceData =
        readExperienceData(request.body);
  
      const validationError =
        validateExperience(
          experienceData
        );
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateExperience =
        await findDuplicateExperience({
          userId:
            request.auth.userId,
  
          company:
            experienceData.company,
  
          role:
            experienceData.role,
  
          startDate:
            experienceData.startDate,
        });
  
      if (duplicateExperience) {
        return response.status(409).json({
          success: false,
          message:
            "You already have this experience with the same company, role and start date.",
        });
      }
  
      const experience =
        await createStudentExperience({
          userId:
            request.auth.userId,
  
          ...experienceData,
  
          endDate:
            experienceData
              .currentlyWorking
              ? null
              : experienceData.endDate,
        });
  
      return response.status(201).json({
        success: true,
        message:
          "Experience added successfully.",
        experience,
      });
    } catch (error) {
      console.error(
        "Add student experience error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have this experience with the same company, role and start date.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to add the experience.",
      });
    }
  }
  
  export async function editStudentExperience(
    request,
    response
  ) {
    try {
      const experienceId =
        readExperienceId(
          request.params.experienceId
        );
  
      if (!experienceId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid experience ID is required.",
        });
      }
  
      const existingExperience =
        await findStudentExperienceById({
          userId:
            request.auth.userId,
  
          experienceId,
        });
  
      if (!existingExperience) {
        return response.status(404).json({
          success: false,
          message:
            "The requested experience was not found.",
        });
      }
  
      const experienceData =
        readExperienceData(request.body);
  
      const validationError =
        validateExperience(
          experienceData
        );
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateExperience =
        await findDuplicateExperience({
          userId:
            request.auth.userId,
  
          company:
            experienceData.company,
  
          role:
            experienceData.role,
  
          startDate:
            experienceData.startDate,
  
          excludeExperienceId:
            experienceId,
        });
  
      if (duplicateExperience) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another matching experience.",
        });
      }
  
      const experience =
        await updateStudentExperience({
          userId:
            request.auth.userId,
  
          experienceId,
  
          ...experienceData,
  
          endDate:
            experienceData
              .currentlyWorking
              ? null
              : experienceData.endDate,
        });
  
      if (!experience) {
        return response.status(404).json({
          success: false,
          message:
            "The requested experience was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Experience updated successfully.",
        experience,
      });
    } catch (error) {
      console.error(
        "Edit student experience error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another matching experience.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the experience.",
      });
    }
  }
  
  export async function removeStudentExperience(
    request,
    response
  ) {
    try {
      const experienceId =
        readExperienceId(
          request.params.experienceId
        );
  
      if (!experienceId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid experience ID is required.",
        });
      }
  
      const affectedRows =
        await deleteStudentExperience({
          userId:
            request.auth.userId,
  
          experienceId,
        });
  
      if (affectedRows === 0) {
        return response.status(404).json({
          success: false,
          message:
            "The requested experience was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Experience deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete student experience error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to delete the experience.",
      });
    }
  }