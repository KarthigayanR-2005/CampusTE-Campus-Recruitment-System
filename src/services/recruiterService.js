import {
    apiRequest,
  } from "./apiClient";
  
  export function getRecruiterCompanyProfileRequest({
    token,
  }) {
    return apiRequest(
      "/recruiter/company-profile",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function updateRecruiterCompanyProfileRequest({
    token,
    profile,
  }) {
    return apiRequest(
      "/recruiter/company-profile",
      {
        method: "PUT",
        token,
        body: profile,
      }
    );
  }