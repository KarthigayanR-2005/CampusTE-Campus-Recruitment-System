import {
  API_BASE_URL,
  apiRequest,
} from "./apiClient.js";

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

  const error =
    new Error(
      responseData.message ||
        fallbackMessage
    );

  error.status =
    response.status;

  error.data =
    responseData;

  throw error;
}

export function getRecruiterCandidatesRequest({
  token,
}) {
  return apiRequest(
    "/recruiter/candidates",
    {
      method:
        "GET",

      token,
    }
  );
}

export function getRecruiterCandidateRequest({
  token,
  studentUserId,
}) {
  return apiRequest(
    `/recruiter/candidates/${studentUserId}`,
    {
      method:
        "GET",

      token,
    }
  );
}

export function getCandidateJobOptionsRequest({
  token,
}) {
  return apiRequest(
    "/recruiter/candidate-jobs",
    {
      method:
        "GET",

      token,
    }
  );
}

export function saveRecruiterCandidateRequest({
  token,
  studentUserId,
}) {
  return apiRequest(
    `/recruiter/candidates/${studentUserId}/save`,
    {
      method:
        "POST",

      token,
    }
  );
}

export function removeSavedRecruiterCandidateRequest({
  token,
  studentUserId,
}) {
  return apiRequest(
    `/recruiter/candidates/${studentUserId}/save`,
    {
      method:
        "DELETE",

      token,
    }
  );
}

export function inviteRecruiterCandidateRequest({
  token,
  studentUserId,
  jobId,
  message,
}) {
  return apiRequest(
    `/recruiter/candidates/${studentUserId}/invite`,
    {
      method:
        "POST",

      token,

      body: {
        jobId,
        message,
      },
    }
  );
}

export async function getRecruiterCandidateResumeRequest({
  token,
  studentUserId,
  download = false,
}) {
  let response;

  try {
    response =
      await fetch(
        `${API_BASE_URL}/recruiter/candidates/${studentUserId}/resume?download=${
          download
            ? "1"
            : "0"
        }`,
        {
          method:
            "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );
  } catch {
    throw new Error(
      "Unable to connect to the CampusTE server. Check whether the backend is running."
    );
  }

  if (!response.ok) {
    return throwResponseError(
      response,
      "Unable to retrieve the candidate resume."
    );
  }

  return response.blob();
}