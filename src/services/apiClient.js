function getApiBaseUrl() {
  const configuredUrl =
    import.meta.env
      .VITE_API_BASE_URL;

  /*
  |--------------------------------------------------------------------------
  | Development
  |--------------------------------------------------------------------------
  |
  | localhost:5173  -> localhost:5000
  | 10.x.x.x:5173   -> same 10.x.x.x:5000
  |
  | This allows both laptop development and phone QR verification without
  | repeatedly editing VITE_API_BASE_URL.
  |
  */

  if (import.meta.env.DEV) {
    const hostname =
      window.location.hostname;

    return `http://${hostname}:5000/api`;
  }

  return (
    configuredUrl ||
    "/api"
  );
}

const API_BASE_URL =
  getApiBaseUrl();

export async function apiRequest(
  endpoint,
  {
    method = "GET",
    body,
    token,
    headers = {},
  } = {}
) {
  const requestHeaders = {
    ...headers,
  };

  const isFormData =
    body instanceof FormData;

  if (
    body !== undefined &&
    !isFormData
  ) {
    requestHeaders[
      "Content-Type"
    ] =
      "application/json";
  }

  if (token) {
    requestHeaders.Authorization =
      `Bearer ${token}`;
  }

  let response;

  try {
    response =
      await fetch(
        `${API_BASE_URL}${endpoint}`,
        {
          method,

          headers:
            requestHeaders,

          body:
            body === undefined
              ? undefined
              : isFormData
                ? body
                : JSON.stringify(
                    body
                  ),
        }
      );
  } catch {
    throw new Error(
      "Unable to connect to the CampusTE server. Check whether the backend is running."
    );
  }

  let responseData;

  try {
    responseData =
      await response.json();
  } catch {
    responseData = {
      success: false,

      message:
        "The server returned an invalid response.",
    };
  }

  if (!response.ok) {
    const requestError =
      new Error(
        responseData.message ||
        "The request could not be completed."
      );

    requestError.status =
      response.status;

    requestError.data =
      responseData;

    throw requestError;
  }

  return responseData;
}

export {
  API_BASE_URL,
};