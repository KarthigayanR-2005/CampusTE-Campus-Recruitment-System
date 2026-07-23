import {
    apiRequest,
  } from "./apiClient";
  
  const API_BASE_URL = (
    import.meta.env
      .VITE_API_BASE_URL ||
    "http://localhost:5000/api"
  ).replace(/\/$/, "");
  
  export const
    PROFILE_DATA_CHANGED_EVENT =
      "campuste:profile-data-changed";
  
  function notifyProfileDataChanged() {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }
  
    window.dispatchEvent(
      new CustomEvent(
        PROFILE_DATA_CHANGED_EVENT
      )
    );
  }
  
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
  
    const error =
      new Error(
        responseData.message ||
          fallbackMessage
      );
  
    error.status =
      response.status;
  
    throw error;
  }
  
  // Student dashboard
  
  export function getStudentDashboardRequest({
    token,
  }) {
    return apiRequest(
      "/student/dashboard",
      {
        method: "GET",
        token,
      }
    );
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
  
  export async function updateStudentProfileRequest({
    token,
    profile,
  }) {
    const response =
      await apiRequest(
        "/student/profile",
        {
          method: "PUT",
          token,
          body: profile,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export function getStudentProfileCompletionRequest({
    token,
  }) {
    return apiRequest(
      "/student/profile-completion",
      {
        method: "GET",
        token,
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
  
  export async function createStudentSkillRequest({
    token,
    skill,
  }) {
    const response =
      await apiRequest(
        "/student/skills",
        {
          method: "POST",
          token,
          body: skill,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function updateStudentSkillRequest({
    token,
    skillId,
    skill,
  }) {
    const response =
      await apiRequest(
        `/student/skills/${skillId}`,
        {
          method: "PUT",
          token,
          body: skill,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function deleteStudentSkillRequest({
    token,
    skillId,
  }) {
    const response =
      await apiRequest(
        `/student/skills/${skillId}`,
        {
          method: "DELETE",
          token,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
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
  
  export async function createStudentProjectRequest({
    token,
    project,
  }) {
    const response =
      await apiRequest(
        "/student/projects",
        {
          method: "POST",
          token,
          body: project,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function updateStudentProjectRequest({
    token,
    projectId,
    project,
  }) {
    const response =
      await apiRequest(
        `/student/projects/${projectId}`,
        {
          method: "PUT",
          token,
          body: project,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function deleteStudentProjectRequest({
    token,
    projectId,
  }) {
    const response =
      await apiRequest(
        `/student/projects/${projectId}`,
        {
          method: "DELETE",
          token,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
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
  
  export async function createStudentCertificationRequest({
    token,
    certification,
  }) {
    const response =
      await apiRequest(
        "/student/certifications",
        {
          method: "POST",
          token,
          body: certification,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function updateStudentCertificationRequest({
    token,
    certificationId,
    certification,
  }) {
    const response =
      await apiRequest(
        `/student/certifications/${certificationId}`,
        {
          method: "PUT",
          token,
          body: certification,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function deleteStudentCertificationRequest({
    token,
    certificationId,
  }) {
    const response =
      await apiRequest(
        `/student/certifications/${certificationId}`,
        {
          method: "DELETE",
          token,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
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
  
  export async function createStudentExperienceRequest({
    token,
    experience,
  }) {
    const response =
      await apiRequest(
        "/student/experiences",
        {
          method: "POST",
          token,
          body: experience,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function updateStudentExperienceRequest({
    token,
    experienceId,
    experience,
  }) {
    const response =
      await apiRequest(
        `/student/experiences/${experienceId}`,
        {
          method: "PUT",
          token,
          body: experience,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }
  
  export async function deleteStudentExperienceRequest({
    token,
    experienceId,
  }) {
    const response =
      await apiRequest(
        `/student/experiences/${experienceId}`,
        {
          method: "DELETE",
          token,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
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
  
    const responseData =
      await response.json();
  
    notifyProfileDataChanged();
  
    return responseData;
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
  
  export async function deleteStudentResumeRequest({
    token,
  }) {
    const response =
      await apiRequest(
        "/student/resume",
        {
          method: "DELETE",
          token,
        }
      );
  
    notifyProfileDataChanged();
  
    return response;
  }