import {
    createStudentSkill,
    deleteStudentSkill,
    findStudentSkillById,
    findStudentSkillByName,
    findStudentSkills,
    updateStudentSkill,
  } from "../models/studentSkillModel.js";
  
  const allowedLevels = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readSkillId(value) {
    const skillId = Number(value);
  
    if (
      !Number.isInteger(skillId) ||
      skillId <= 0
    ) {
      return null;
    }
  
    return skillId;
  }
  
  function validateSkill({
    name,
    level,
  }) {
    if (!name) {
      return "Skill name is required.";
    }
  
    if (name.length < 2) {
      return "Skill name must contain at least 2 characters.";
    }
  
    if (name.length > 100) {
      return "Skill name cannot exceed 100 characters.";
    }
  
    if (!allowedLevels.includes(level)) {
      return "Skill level must be beginner, intermediate, advanced, or expert.";
    }
  
    return "";
  }
  
  export async function getStudentSkills(
    request,
    response
  ) {
    try {
      const skills =
        await findStudentSkills(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        count: skills.length,
        skills,
      });
    } catch (error) {
      console.error(
        "Get student skills error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve your skills.",
      });
    }
  }
  
  export async function addStudentSkill(
    request,
    response
  ) {
    try {
      const name = readText(
        request.body?.name
      );
  
      const level = readText(
        request.body?.level
      ).toLowerCase();
  
      const validationError =
        validateSkill({
          name,
          level,
        });
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const existingSkill =
        await findStudentSkillByName({
          userId:
            request.auth.userId,
          skillName: name,
        });
  
      if (existingSkill) {
        return response.status(409).json({
          success: false,
          message:
            "You have already added this skill.",
        });
      }
  
      const skill =
        await createStudentSkill({
          userId:
            request.auth.userId,
          skillName: name,
          proficiency: level,
        });
  
      return response.status(201).json({
        success: true,
        message:
          "Skill added successfully.",
        skill,
      });
    } catch (error) {
      console.error(
        "Add student skill error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You have already added this skill.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to add the skill.",
      });
    }
  }
  
  export async function editStudentSkill(
    request,
    response
  ) {
    try {
      const skillId = readSkillId(
        request.params.skillId
      );
  
      if (!skillId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid skill ID is required.",
        });
      }
  
      const currentSkill =
        await findStudentSkillById({
          userId:
            request.auth.userId,
          skillId,
        });
  
      if (!currentSkill) {
        return response.status(404).json({
          success: false,
          message:
            "The requested skill was not found.",
        });
      }
  
      const name = readText(
        request.body?.name
      );
  
      const level = readText(
        request.body?.level
      ).toLowerCase();
  
      const validationError =
        validateSkill({
          name,
          level,
        });
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateSkill =
        await findStudentSkillByName({
          userId:
            request.auth.userId,
          skillName: name,
          excludeSkillId: skillId,
        });
  
      if (duplicateSkill) {
        return response.status(409).json({
          success: false,
          message:
            "You have already added another skill with this name.",
        });
      }
  
      const skill =
        await updateStudentSkill({
          userId:
            request.auth.userId,
          skillId,
          skillName: name,
          proficiency: level,
        });
  
      if (!skill) {
        return response.status(404).json({
          success: false,
          message:
            "The requested skill was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Skill updated successfully.",
        skill,
      });
    } catch (error) {
      console.error(
        "Edit student skill error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You have already added another skill with this name.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the skill.",
      });
    }
  }
  
  export async function removeStudentSkill(
    request,
    response
  ) {
    try {
      const skillId = readSkillId(
        request.params.skillId
      );
  
      if (!skillId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid skill ID is required.",
        });
      }
  
      const affectedRows =
        await deleteStudentSkill({
          userId:
            request.auth.userId,
          skillId,
        });
  
      if (affectedRows === 0) {
        return response.status(404).json({
          success: false,
          message:
            "The requested skill was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Skill deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete student skill error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to delete the skill.",
      });
    }
  }