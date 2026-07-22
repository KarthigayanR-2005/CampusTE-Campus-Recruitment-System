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