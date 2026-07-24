import {
    apiRequest,
  } from "./apiClient";
  
  const API_BASE_URL = (
    import.meta.env
      .VITE_API_BASE_URL ||
    "http://localhost:5000/api"
  ).replace(/\/$/, "");
  
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
  
    const error = new Error(
      responseData.message ||
        fallbackMessage
    );
  
    error.status =
      response.status;
  
    throw error;
  }
  
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
  
  // Recruiter applicants
  
  export function getRecruiterApplicantsRequest({
    token,
    search = "",
    jobId = "",
    status = "",
  }) {
    const searchParams =
      new URLSearchParams();
  
    if (search.trim()) {
      searchParams.set(
        "search",
        search.trim()
      );
    }
  
    if (jobId) {
      searchParams.set(
        "jobId",
        jobId
      );
    }
  
    if (status) {
      searchParams.set(
        "status",
        status
      );
    }
  
    const query =
      searchParams.toString();
  
    return apiRequest(
      `/recruiter/applications${
        query ? `?${query}` : ""
      }`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function getRecruiterApplicantRequest({
    token,
    applicationId,
  }) {
    return apiRequest(
      `/recruiter/applications/${applicationId}`,
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function updateRecruiterApplicantStatusRequest({
    token,
    applicationId,
    status,
    note = "",
    interviewDate = "",
    interviewTime = "",
    interviewMode = "",
    interviewer = "",
    interviewDetails = "",
  }) {
    return apiRequest(
      `/recruiter/applications/${applicationId}/status`,
      {
        method: "PATCH",
        token,
        body: {
          status,
          note,
          interviewDate,
          interviewTime,
          interviewMode,
          interviewer,
          interviewDetails,
        },
      }
    );
  }
  
  export async function getRecruiterApplicantResumeRequest({
    token,
    applicationId,
    download = false,
  }) {
    const response = await fetch(
      `${API_BASE_URL}/recruiter/applications/${applicationId}/resume?download=${
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
        "Unable to retrieve the applicant resume."
      );
    }
  
    const disposition =
      response.headers.get(
        "content-disposition"
      ) || "";
  
    const fileNameMatch =
      disposition.match(
        /filename="([^"]+)"/i
      );
  
    return {
      blob: await response.blob(),
  
      fileName:
        fileNameMatch?.[1] ||
        "Applicant_Resume.pdf",
    };
  }