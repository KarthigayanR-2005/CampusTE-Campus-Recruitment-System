import { apiRequest } from "./apiClient";

export function loginRequest({
  email,
  password,
}) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: {
      email,
      password,
    },
  });
}

export function getCurrentUserRequest(
  token
) {
  return apiRequest("/auth/me", {
    method: "GET",
    token,
  });
}