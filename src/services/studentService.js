import {
    apiRequest,
  } from "./apiClient";
  
  const API_BASE_URL = (
    import.meta.env
      .VITE_API_BASE_URL ||
    "http://localhost:5000/api"
  ).replace(/\/$/, "");
  
  async function throwResponseError(
    response,
    fallbackMessage
  ) {
    let responseData = {};
  
    try {
      responseData =
        await response.json();
    } catch {
      responseData = {};
    }
  
    const error = new Error(
      responseData.message ||
        fallbackMessage
    );
  
    error.status =
      response.status;
  
    throw error;
  }
  
  // Student profile
  
  export function getStudentProfileRequest({
    token,
  }) {
    return apiRequest(
      "/student/profile",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function updateStudentProfileRequest({
    token,
    profile,
  }) {
    return apiRequest(
      "/student/profile",
      {
        method: "PUT",
        token,
        body: profile,
      }
    );
  }
  
  // Student skills
  
  export function getStudentSkillsRequest({
    token,
  }) {
    return apiRequest(
      "/student/skills",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function createStudentSkillRequest({
    token,
    skill,
  }) {
    return apiRequest(
      "/student/skills",
      {
        method: "POST",
        token,
        body: skill,
      }
    );
  }
  
  export function updateStudentSkillRequest({
    token,
    skillId,
    skill,
  }) {
    return apiRequest(
      `/student/skills/${skillId}`,
      {
        method: "PUT",
        token,
        body: skill,
      }
    );
  }
  
  export function deleteStudentSkillRequest({
    token,
    skillId,
  }) {
    return apiRequest(
      `/student/skills/${skillId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
  
  // Student projects
  
  export function getStudentProjectsRequest({
    token,
  }) {
    return apiRequest(
      "/student/projects",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function createStudentProjectRequest({
    token,
    project,
  }) {
    return apiRequest(
      "/student/projects",
      {
        method: "POST",
        token,
        body: project,
      }
    );
  }
  
  export function updateStudentProjectRequest({
    token,
    projectId,
    project,
  }) {
    return apiRequest(
      `/student/projects/${projectId}`,
      {
        method: "PUT",
        token,
        body: project,
      }
    );
  }
  
  export function deleteStudentProjectRequest({
    token,
    projectId,
  }) {
    return apiRequest(
      `/student/projects/${projectId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
  
  // Student certifications
  
  export function getStudentCertificationsRequest({
    token,
  }) {
    return apiRequest(
      "/student/certifications",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function createStudentCertificationRequest({
    token,
    certification,
  }) {
    return apiRequest(
      "/student/certifications",
      {
        method: "POST",
        token,
        body: certification,
      }
    );
  }
  
  export function updateStudentCertificationRequest({
    token,
    certificationId,
    certification,
  }) {
    return apiRequest(
      `/student/certifications/${certificationId}`,
      {
        method: "PUT",
        token,
        body: certification,
      }
    );
  }
  
  export function deleteStudentCertificationRequest({
    token,
    certificationId,
  }) {
    return apiRequest(
      `/student/certifications/${certificationId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
  
  // Student experiences
  
  export function getStudentExperiencesRequest({
    token,
  }) {
    return apiRequest(
      "/student/experiences",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function createStudentExperienceRequest({
    token,
    experience,
  }) {
    return apiRequest(
      "/student/experiences",
      {
        method: "POST",
        token,
        body: experience,
      }
    );
  }
  
  export function updateStudentExperienceRequest({
    token,
    experienceId,
    experience,
  }) {
    return apiRequest(
      `/student/experiences/${experienceId}`,
      {
        method: "PUT",
        token,
        body: experience,
      }
    );
  }
  
  export function deleteStudentExperienceRequest({
    token,
    experienceId,
  }) {
    return apiRequest(
      `/student/experiences/${experienceId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }
  
  // Student resume
  
  export function getStudentResumeRequest({
    token,
  }) {
    return apiRequest(
      "/student/resume",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export async function uploadStudentResumeRequest({
    token,
    file,
  }) {
    const formData =
      new FormData();
  
    formData.append(
      "resume",
      file
    );
  
    const response =
      await fetch(
        `${API_BASE_URL}/student/resume`,
        {
          method: "POST",
  
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
  
          body: formData,
        }
      );
  
    if (!response.ok) {
      return throwResponseError(
        response,
        "Unable to upload the resume."
      );
    }
  
    return response.json();
  }
  
  export async function getStudentResumeFileRequest({
    token,
    download = false,
  }) {
    const response =
      await fetch(
        `${API_BASE_URL}/student/resume/file?download=${
          download ? "1" : "0"
        }`,
        {
          method: "GET",
  
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
  
    if (!response.ok) {
      return throwResponseError(
        response,
        "Unable to retrieve the resume file."
      );
    }
  
    return response.blob();
  }
  
  export function deleteStudentResumeRequest({
    token,
  }) {
    return apiRequest(
      "/student/resume",
      {
        method: "DELETE",
        token,
      }
    );
  }