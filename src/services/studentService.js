import { apiRequest } from "./apiClient";

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