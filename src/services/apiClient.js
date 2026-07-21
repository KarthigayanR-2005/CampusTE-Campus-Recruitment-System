const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:5000/api";

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

  if (body !== undefined) {
    requestHeaders["Content-Type"] =
      "application/json";
  }

  if (token) {
    requestHeaders.Authorization =
      `Bearer ${token}`;
  }

  let response;

  try {
    response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        method,
        headers: requestHeaders,
        body:
          body !== undefined
            ? JSON.stringify(body)
            : undefined,
      }
    );
  } catch {
    throw new Error(
      "Unable to connect to the CampusTE server. Check whether the backend is running."
    );
  }

  let responseData;

  try {
    responseData = await response.json();
  } catch {
    responseData = {
      success: false,
      message:
        "The server returned an invalid response.",
    };
  }

  if (!response.ok) {
    const requestError = new Error(
      responseData.message ||
        "The request could not be completed."
    );

    requestError.status = response.status;
    requestError.data = responseData;

    throw requestError;
  }

  return responseData;
}

export { API_BASE_URL };