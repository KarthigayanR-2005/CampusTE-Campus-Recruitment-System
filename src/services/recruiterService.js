import {
  API_BASE_URL,
  apiRequest,
} from "./apiClient";

function createBlobHeaders({
  token,
} = {}) {
  const headers = {
    Accept:
      "application/octet-stream",
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return headers;
}

async function readBlobErrorResponse(
  response
) {
  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const text =
      await response.text();

    return text
      ? {
          message:
            text,
        }
      : null;
  } catch {
    return null;
  }
}

async function blobRequest(
  endpoint,
  {
    token,
  } = {}
) {
  let response;

  try {
    response =
      await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          method:
            "GET",

          headers:
            createBlobHeaders({
              token,
            }),
        }
      );
  } catch {
    throw new Error(
      "Unable to connect to the CampusTE server. Check whether the backend is running."
    );
  }

  if (!response.ok) {
    const responseData =
      await readBlobErrorResponse(
        response
      );

    const error =
      new Error(
        responseData?.message ||
          "The file could not be retrieved."
      );

    error.status =
      response.status;

    error.data =
      responseData;

    throw error;
  }

  return {
    blob:
      await response.blob(),

    contentType:
      response.headers.get(
        "content-type"
      ) ||
      "application/octet-stream",

    contentDisposition:
      response.headers.get(
        "content-disposition"
      ) || "",
  };
}

/*
|--------------------------------------------------------------------------
| Recruiter company profile
|--------------------------------------------------------------------------
*/

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
  companyProfile,
}) {
  return apiRequest(
    "/recruiter/company-profile",
    {
      method: "PUT",
      token,

      body:
        companyProfile ||
        profile ||
        {},
    }
  );
}

/*
|--------------------------------------------------------------------------
| Recruiter company branding
|--------------------------------------------------------------------------
*/

export function uploadRecruiterCompanyLogoRequest({
  token,
  file,
}) {
  const formData =
    new FormData();

  formData.append(
    "companyLogo",
    file
  );

  return apiRequest(
    "/recruiter/company-profile/logo",
    {
      method: "POST",
      token,
      body: formData,
    }
  );
}

export function getRecruiterCompanyLogoRequest({
  token,
}) {
  return blobRequest(
    "/recruiter/company-profile/logo",
    {
      token,
    }
  );
}

export function deleteRecruiterCompanyLogoRequest({
  token,
}) {
  return apiRequest(
    "/recruiter/company-profile/logo",
    {
      method: "DELETE",
      token,
    }
  );
}

export function uploadRecruiterAuthorizedSignatureRequest({
  token,
  file,
}) {
  const formData =
    new FormData();

  formData.append(
    "authorizedSignature",
    file
  );

  return apiRequest(
    "/recruiter/company-profile/signature",
    {
      method: "POST",
      token,
      body: formData,
    }
  );
}

export function getRecruiterAuthorizedSignatureRequest({
  token,
}) {
  return blobRequest(
    "/recruiter/company-profile/signature",
    {
      token,
    }
  );
}

export function deleteRecruiterAuthorizedSignatureRequest({
  token,
}) {
  return apiRequest(
    "/recruiter/company-profile/signature",
    {
      method: "DELETE",
      token,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Recruiter job management
|--------------------------------------------------------------------------
*/

export function createRecruiterJobRequest({
  token,
  job,
  jobData,
}) {
  return apiRequest(
    "/recruiter/jobs",
    {
      method: "POST",
      token,

      body:
        job ||
        jobData ||
        {},
    }
  );
}

export function getRecruiterJobsRequest({
  token,
  search = "",
  status = "",
} = {}) {
  const searchParams =
    new URLSearchParams();

  if (
    String(search).trim()
  ) {
    searchParams.set(
      "search",
      String(search).trim()
    );
  }

  if (
    status &&
    status !== "all" &&
    status !== "All"
  ) {
    searchParams.set(
      "status",
      status
    );
  }

  const query =
    searchParams.toString();

  return apiRequest(
    `/recruiter/jobs${
      query
        ? `?${query}`
        : ""
    }`,
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

export function updateRecruiterJobRequest({
  token,
  jobId,
  job,
  jobData,
}) {
  return apiRequest(
    `/recruiter/jobs/${jobId}`,
    {
      method: "PUT",
      token,

      body:
        job ||
        jobData ||
        {},
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

/*
|--------------------------------------------------------------------------
| Recruiter applicant management
|--------------------------------------------------------------------------
*/

export function getRecruiterApplicantsRequest({
  token,
  search = "",
  jobId = "",
  status = "",
} = {}) {
  const searchParams =
    new URLSearchParams();

  if (
    String(search).trim()
  ) {
    searchParams.set(
      "search",
      String(search).trim()
    );
  }

  if (jobId) {
    searchParams.set(
      "jobId",
      jobId
    );
  }

  if (
    status &&
    status !== "all" &&
    status !== "All"
  ) {
    searchParams.set(
      "status",
      status
    );
  }

  const query =
    searchParams.toString();

  return apiRequest(
    `/recruiter/applications${
      query
        ? `?${query}`
        : ""
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
  interviewerName = "",
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

        interviewer:
          interviewer ||
          interviewerName,

        interviewDetails,
      },
    }
  );
}

export function getRecruiterApplicantResumeRequest({
  token,
  applicationId,
  download = false,
}) {
  return blobRequest(
    `/recruiter/applications/${applicationId}/resume${
      download
        ? "?download=1"
        : ""
    }`,
    {
      token,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Recruiter interview management
|--------------------------------------------------------------------------
*/

export function getRecruiterInterviewsRequest({
  token,
  search = "",
  jobId = "",
} = {}) {
  const searchParams =
    new URLSearchParams();

  if (
    String(search).trim()
  ) {
    searchParams.set(
      "search",
      String(search).trim()
    );
  }

  if (jobId) {
    searchParams.set(
      "jobId",
      jobId
    );
  }

  const query =
    searchParams.toString();

  return apiRequest(
    `/recruiter/interviews${
      query
        ? `?${query}`
        : ""
    }`,
    {
      method: "GET",
      token,
    }
  );
}

export function getRecruiterInterviewRequest({
  token,
  applicationId,
}) {
  return apiRequest(
    `/recruiter/interviews/${applicationId}`,
    {
      method: "GET",
      token,
    }
  );
}

export function rescheduleRecruiterInterviewRequest({
  token,
  applicationId,
  interviewDate,
  interviewTime,
  interviewMode,
  interviewerName,
  interviewDetails = "",
}) {
  return apiRequest(
    `/recruiter/interviews/${applicationId}/reschedule`,
    {
      method: "PATCH",
      token,

      body: {
        interviewDate,
        interviewTime,
        interviewMode,
        interviewerName,
        interviewDetails,
      },
    }
  );
}

export function cancelRecruiterInterviewRequest({
  token,
  applicationId,
  cancellationReason = "",
}) {
  return apiRequest(
    `/recruiter/interviews/${applicationId}/cancel`,
    {
      method: "PATCH",
      token,

      body: {
        cancellationReason,
      },
    }
  );
}

/*
|--------------------------------------------------------------------------
| Compatibility aliases
|--------------------------------------------------------------------------
*/

export const getRecruiterProfileRequest =
  getRecruiterCompanyProfileRequest;

export const updateRecruiterProfileRequest =
  updateRecruiterCompanyProfileRequest;