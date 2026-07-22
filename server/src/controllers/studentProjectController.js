import {
    createStudentProject,
    deleteStudentProject,
    findStudentProjectById,
    findStudentProjectByTitle,
    findStudentProjects,
    updateStudentProject,
  } from "../models/studentProjectModel.js";
  
  const allowedStatuses = [
    "planned",
    "in_progress",
    "completed",
    "on_hold",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readProjectId(value) {
    const projectId = Number(value);
  
    if (
      !Number.isInteger(projectId) ||
      projectId <= 0
    ) {
      return null;
    }
  
    return projectId;
  }
  
  function readTechnologies(value) {
    let technologies = [];
  
    if (Array.isArray(value)) {
      technologies = value;
    } else if (typeof value === "string") {
      technologies = value.split(",");
    }
  
    return [
      ...new Set(
        technologies
          .map((technology) =>
            String(technology).trim()
          )
          .filter(Boolean)
      ),
    ];
  }
  
  function isValidDate(value) {
    if (!value) {
      return true;
    }
  
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        value
      )
    ) {
      return false;
    }
  
    const date = new Date(
      `${value}T00:00:00`
    );
  
    return !Number.isNaN(
      date.getTime()
    );
  }
  
  function isValidUrl(value) {
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
  
  function validateProject({
    title,
    description,
    technologies,
    githubUrl,
    liveDemoUrl,
    startDate,
    endDate,
    status,
  }) {
    if (!title) {
      return "Project title is required.";
    }
  
    if (title.length < 2) {
      return "Project title must contain at least 2 characters.";
    }
  
    if (title.length > 150) {
      return "Project title cannot exceed 150 characters.";
    }
  
    if (!description) {
      return "Project description is required.";
    }
  
    if (description.length < 10) {
      return "Project description must contain at least 10 characters.";
    }
  
    if (description.length > 5000) {
      return "Project description cannot exceed 5000 characters.";
    }
  
    if (technologies.length === 0) {
      return "Add at least one technology.";
    }
  
    if (technologies.length > 30) {
      return "A project cannot contain more than 30 technologies.";
    }
  
    const invalidTechnology =
      technologies.find(
        (technology) =>
          technology.length > 100
      );
  
    if (invalidTechnology) {
      return "Each technology name must contain 100 characters or fewer.";
    }
  
    if (!isValidUrl(githubUrl)) {
      return "GitHub URL must begin with http:// or https://.";
    }
  
    if (!isValidUrl(liveDemoUrl)) {
      return "Live Demo URL must begin with http:// or https://.";
    }
  
    if (githubUrl.length > 255) {
      return "GitHub URL cannot exceed 255 characters.";
    }
  
    if (liveDemoUrl.length > 255) {
      return "Live Demo URL cannot exceed 255 characters.";
    }
  
    if (!isValidDate(startDate)) {
      return "Enter a valid project start date.";
    }
  
    if (!isValidDate(endDate)) {
      return "Enter a valid project end date.";
    }
  
    if (
      startDate &&
      endDate &&
      endDate < startDate
    ) {
      return "Project end date cannot be before the start date.";
    }
  
    if (
      !allowedStatuses.includes(status)
    ) {
      return "Select a valid project status.";
    }
  
    return "";
  }
  
  function readProjectData(body = {}) {
    return {
      title: readText(body.title),
  
      description: readText(
        body.description
      ),
  
      technologies:
        readTechnologies(
          body.technologies
        ),
  
      githubUrl: readText(
        body.githubUrl
      ),
  
      liveDemoUrl: readText(
        body.liveDemoUrl
      ),
  
      startDate: readText(
        body.startDate
      ),
  
      endDate: readText(
        body.endDate
      ),
  
      status:
        readText(body.status)
          .toLowerCase() ||
        "in_progress",
    };
  }
  
  export async function getStudentProjects(
    request,
    response
  ) {
    try {
      const projects =
        await findStudentProjects(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        count: projects.length,
        projects,
      });
    } catch (error) {
      console.error(
        "Get student projects error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve your projects.",
      });
    }
  }
  
  export async function addStudentProject(
    request,
    response
  ) {
    try {
      const projectData =
        readProjectData(request.body);
  
      const validationError =
        validateProject(projectData);
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const existingProject =
        await findStudentProjectByTitle({
          userId:
            request.auth.userId,
          title: projectData.title,
        });
  
      if (existingProject) {
        return response.status(409).json({
          success: false,
          message:
            "You already have a project with this title.",
        });
      }
  
      const project =
        await createStudentProject({
          userId:
            request.auth.userId,
  
          ...projectData,
  
          githubUrl:
            projectData.githubUrl ||
            null,
  
          liveDemoUrl:
            projectData.liveDemoUrl ||
            null,
  
          startDate:
            projectData.startDate ||
            null,
  
          endDate:
            projectData.endDate ||
            null,
        });
  
      return response.status(201).json({
        success: true,
        message:
          "Project added successfully.",
        project,
      });
    } catch (error) {
      console.error(
        "Add student project error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have a project with this title.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to add the project.",
      });
    }
  }
  
  export async function editStudentProject(
    request,
    response
  ) {
    try {
      const projectId =
        readProjectId(
          request.params.projectId
        );
  
      if (!projectId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid project ID is required.",
        });
      }
  
      const currentProject =
        await findStudentProjectById({
          userId:
            request.auth.userId,
          projectId,
        });
  
      if (!currentProject) {
        return response.status(404).json({
          success: false,
          message:
            "The requested project was not found.",
        });
      }
  
      const projectData =
        readProjectData(request.body);
  
      const validationError =
        validateProject(projectData);
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateProject =
        await findStudentProjectByTitle({
          userId:
            request.auth.userId,
          title: projectData.title,
          excludeProjectId:
            projectId,
        });
  
      if (duplicateProject) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another project with this title.",
        });
      }
  
      const project =
        await updateStudentProject({
          userId:
            request.auth.userId,
  
          projectId,
  
          ...projectData,
  
          githubUrl:
            projectData.githubUrl ||
            null,
  
          liveDemoUrl:
            projectData.liveDemoUrl ||
            null,
  
          startDate:
            projectData.startDate ||
            null,
  
          endDate:
            projectData.endDate ||
            null,
        });
  
      if (!project) {
        return response.status(404).json({
          success: false,
          message:
            "The requested project was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Project updated successfully.",
        project,
      });
    } catch (error) {
      console.error(
        "Edit student project error:",
        error
      );
  
      if (
        error.code === "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another project with this title.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the project.",
      });
    }
  }
  
  export async function removeStudentProject(
    request,
    response
  ) {
    try {
      const projectId =
        readProjectId(
          request.params.projectId
        );
  
      if (!projectId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid project ID is required.",
        });
      }
  
      const affectedRows =
        await deleteStudentProject({
          userId:
            request.auth.userId,
          projectId,
        });
  
      if (affectedRows === 0) {
        return response.status(404).json({
          success: false,
          message:
            "The requested project was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Project deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete student project error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to delete the project.",
      });
    }
  }