import {
    apiRequest,
  } from "./apiClient";
  
  // Recruiter company profile
  
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
  
  // Recruiter jobs
  
  export function getRecruiterJobsRequest({
    token,
  }) {
    return apiRequest(
      "/recruiter/jobs",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getRecruiterJobRequest({
    token,
    jobId,
  }) {
    return apiRequest(
      `/recruiter/jobs/${jobId}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function createRecruiterJobRequest({
    token,
    job,
  }) {
    return apiRequest(
      "/recruiter/jobs",
      {
        method: "POST",
        token,
        body: job,
      }
    );
  }
  
  export function updateRecruiterJobRequest({
    token,
    jobId,
    job,
  }) {
    return apiRequest(
      `/recruiter/jobs/${jobId}`,
      {
        method: "PUT",
        token,
        body: job,
      }
    );
  }
  
  export function updateRecruiterJobStatusRequest({
    token,
    jobId,
    status,
  }) {
    return apiRequest(
      `/recruiter/jobs/${jobId}/status`,
      {
        method: "PATCH",
        token,
        body: {
          status,
        },
      }
    );
  }
  
  export function duplicateRecruiterJobRequest({
    token,
    jobId,
  }) {
    return apiRequest(
      `/recruiter/jobs/${jobId}/duplicate`,
      {
        method: "POST",
        token,
      }
    );
  }
  
  export function deleteRecruiterJobRequest({
    token,
    jobId,
  }) {
    return apiRequest(
      `/recruiter/jobs/${jobId}`,
      {
        method: "DELETE",
        token,
      }
    );
  }