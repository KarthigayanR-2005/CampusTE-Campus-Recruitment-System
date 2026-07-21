import { apiRequest } from "./apiClient";

export function registerRequest({
  fullName,
  email,
  password,
  role,
}) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: {
      fullName,
      email,
      password,
      role,
    },
  });
}

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

export function getCurrentUserRequest(token) {
  return apiRequest("/auth/me", {
    method: "GET",
    token,
  });
}