import {
  apiRequest,
} from "./apiClient.js";

const API_BASE_URL =
  import.meta.env
    .VITE_API_BASE_URL ||
  "http://localhost:5000/api";

async function readResponse(
  response
) {
  if (
    response.status === 204
  ) {
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

function createRequestError(
  response,
  responseData,
  fallbackMessage
) {
  const error =
    new Error(
      responseData?.message ||
        fallbackMessage
    );

  error.status =
    response.status;

  error.data =
    responseData;

  return error;
}

function createAuthorizationHeaders(
  token
) {
  const headers = {
    Accept:
      "application/json",
  };

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  return headers;
}

function getFileNameFromDisposition(
  contentDisposition
) {
  if (!contentDisposition) {
    return "";
  }

  const utfFileNameMatch =
    contentDisposition.match(
      /filename\*=UTF-8''([^;]+)/i
    );

  if (
    utfFileNameMatch?.[1]
  ) {
    try {
      return decodeURIComponent(
        utfFileNameMatch[1]
      );
    } catch {
      return utfFileNameMatch[1];
    }
  }

  const regularFileNameMatch =
    contentDisposition.match(
      /filename="?([^";]+)"?/i
    );

  return (
    regularFileNameMatch?.[1] ||
    ""
  );
}

async function uploadFileRequest(
  endpoint,
  {
    token,
    formData,
  }
) {
  const response =
    await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method: "POST",

        headers:
          createAuthorizationHeaders(
            token
          ),

        body: formData,
      }
    );

  const responseData =
    await readResponse(
      response
    );

  if (!response.ok) {
    throw createRequestError(
      response,
      responseData,
      "The file could not be uploaded."
    );
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
          createAuthorizationHeaders(
            token
          ),
      }
    );

  if (!response.ok) {
    const responseData =
      await readResponse(
        response
      );

    throw createRequestError(
      response,
      responseData,
      "The file could not be retrieved."
    );
  }

  const contentDisposition =
    response.headers.get(
      "content-disposition"
    ) || "";

  return {
    blob:
      await response.blob(),

    contentType:
      response.headers.get(
        "content-type"
      ) ||
      "application/octet-stream",

    contentDisposition,

    fileName:
      getFileNameFromDisposition(
        contentDisposition
      ),
  };
}

/*
|--------------------------------------------------------------------------
| Recruiter offer APIs
|--------------------------------------------------------------------------
*/

export function getRecruiterOffersRequest({
  token,
}) {
  return apiRequest(
    "/recruiter/offers",
    {
      method: "GET",
      token,
    }
  );
}

export function getRecruiterOfferRequest({
  token,
  offerId,
}) {
  return apiRequest(
    `/recruiter/offers/${offerId}`,
    {
      method: "GET",
      token,
    }
  );
}

export function createRecruiterOfferRequest({
  token,
  applicationId,
  offerData,
}) {
  return apiRequest(
    `/recruiter/applications/${applicationId}/offers`,
    {
      method: "POST",
      token,

      body:
        offerData,
    }
  );
}

export function updateRecruiterOfferRequest({
  token,
  offerId,
  offerData,
}) {
  return apiRequest(
    `/recruiter/offers/${offerId}`,
    {
      method: "PUT",
      token,

      body:
        offerData,
    }
  );
}

export function sendRecruiterOfferRequest({
  token,
  offerId,
}) {
  return apiRequest(
    `/recruiter/offers/${offerId}/send`,
    {
      method: "POST",
      token,
    }
  );
}

export function withdrawRecruiterOfferRequest({
  token,
  offerId,
  note = "",
}) {
  return apiRequest(
    `/recruiter/offers/${offerId}/withdraw`,
    {
      method: "PATCH",
      token,

      body: {
        note,
      },
    }
  );
}

/*
|--------------------------------------------------------------------------
| Recruiter offer-letter APIs
|--------------------------------------------------------------------------
*/

export function uploadRecruiterOfferLetterRequest({
  token,
  offerId,
  file,
}) {
  const formData =
    new FormData();

  formData.append(
    "offerLetter",
    file
  );

  return uploadFileRequest(
    `/recruiter/offers/${offerId}/letter`,
    {
      token,
      formData,
    }
  );
}

export function getRecruiterOfferLetterRequest({
  token,
  offerId,
  download = false,
}) {
  return blobRequest(
    `/recruiter/offers/${offerId}/letter${
      download
        ? "?download=1"
        : ""
    }`,
    {
      token,
    }
  );
}

export function deleteRecruiterOfferLetterRequest({
  token,
  offerId,
}) {
  return apiRequest(
    `/recruiter/offers/${offerId}/letter`,
    {
      method: "DELETE",
      token,
    }
  );
}

/*
|--------------------------------------------------------------------------
| Student offer APIs
|--------------------------------------------------------------------------
*/

export function getStudentOffersRequest({
  token,
}) {
  return apiRequest(
    "/student/offers",
    {
      method: "GET",
      token,
    }
  );
}

export function getStudentOfferRequest({
  token,
  offerId,
}) {
  return apiRequest(
    `/student/offers/${offerId}`,
    {
      method: "GET",
      token,
    }
  );
}

export function respondToStudentOfferRequest({
  token,
  offerId,
  status,
  note = "",
}) {
  return apiRequest(
    `/student/offers/${offerId}/respond`,
    {
      method: "PATCH",
      token,

      body: {
        status,
        note,
      },
    }
  );
}

/*
|--------------------------------------------------------------------------
| Student offer-letter API
|--------------------------------------------------------------------------
*/

export function getStudentOfferLetterRequest({
  token,
  offerId,
  download = false,
}) {
  return blobRequest(
    `/student/offers/${offerId}/letter${
      download
        ? "?download=1"
        : ""
    }`,
    {
      token,
    }
  );
}