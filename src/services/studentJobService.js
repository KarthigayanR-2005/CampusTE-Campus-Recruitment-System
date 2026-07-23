import {
    apiRequest,
  } from "./apiClient";
  
  export function getStudentJobsRequest({
    token,
  }) {
    return apiRequest(
      "/student/jobs",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getStudentJobRequest({
    token,
    jobId,
  }) {
    return apiRequest(
      `/student/jobs/${jobId}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getStudentJobEligibilityRequest({
    token,
    jobId,
  }) {
    return apiRequest(
      `/student/jobs/${jobId}/eligibility`,
      {
        method: "GET",
        token,
      }
    );
  }