import { apiRequest } from "./apiClient";

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