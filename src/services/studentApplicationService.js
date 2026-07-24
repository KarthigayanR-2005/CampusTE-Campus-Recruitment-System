import {
    apiRequest,
  } from "./apiClient";
  
  export function applyForStudentJobRequest({
    token,
    jobId,
    coverNote,
  }) {
    return apiRequest(
      `/student/jobs/${jobId}/apply`,
      {
        method: "POST",
        token,
        body: {
          coverNote,
        },
      }
    );
  }
  
  export function getStudentApplicationsRequest({
    token,
  }) {
    return apiRequest(
      "/student/applications",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getStudentApplicationRequest({
    token,
    applicationId,
  }) {
    return apiRequest(
      `/student/applications/${applicationId}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function withdrawStudentApplicationRequest({
    token,
    applicationId,
  }) {
    return apiRequest(
      `/student/applications/${applicationId}/withdraw`,
      {
        method: "PATCH",
        token,
      }
    );
  }