const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

function createHeaders({
  token,
  body,
  additionalHeaders = {},
}) {
  const headers = {
    Accept: "application/json",
    ...additionalHeaders,
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  if (
    body !== undefined &&
    body !== null &&
    !(body instanceof FormData)
  ) {
    headers["Content-Type"] =
      "application/json";
  }

  return headers;
}

async function readResponse(
  response
) {
  if (response.status === 204) {
    return null;
  }

  const contentType =
    response.headers.get(
      "content-type"
    ) || "";

  if (
    contentType.includes(
      "application/json"
    )
  ) {
    return response.json();
  }

  const text =
    await response.text();

  return text
    ? {
        message: text,
      }
    : null;
}

async function apiRequest(
  endpoint,
  {
    method = "GET",
    token,
    body,
    headers = {},
  } = {}
) {
  const response =
    await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method,

        headers: createHeaders({
          token,
          body,
          additionalHeaders:
            headers,
        }),

        body:
          body === undefined ||
          body === null
            ? undefined
            : body instanceof FormData
              ? body
              : JSON.stringify(
                  body
                ),
      }
    );

  const responseData =
    await readResponse(
      response
    );

  if (!response.ok) {
    const error =
      new Error(
        responseData?.message ||
          "The request could not be completed."
      );

    error.status =
      response.status;

    error.data =
      responseData;

    throw error;
  }

  return responseData;
}

async function blobRequest(
  endpoint,
  {
    token,
  } = {}
) {
  const response =
    await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "GET",

        headers:
          createHeaders({
            token,
          }),
      }
    );

  if (!response.ok) {
    const responseData =
      await readResponse(
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