import {
  apiRequest,
} from "./apiClient";

export async function verifyPublicOfferRequest({
  publicId,
  token,
}) {
  const normalizedPublicId =
    String(
      publicId || ""
    ).trim();

  const normalizedToken =
    String(
      token || ""
    ).trim();

  if (!normalizedPublicId) {
    throw new Error(
      "The verification ID is missing."
    );
  }

  if (!normalizedToken) {
    throw new Error(
      "The verification token is missing."
    );
  }

  return apiRequest(
    `/public/offer-verifications/${encodeURIComponent(
      normalizedPublicId
    )}?token=${encodeURIComponent(
      normalizedToken
    )}`
  );
}

export async function verifyPublicOfferDocumentIntegrityRequest({
  publicId,
  token,
  file,
}) {
  const normalizedPublicId =
    String(
      publicId || ""
    ).trim();

  const normalizedToken =
    String(
      token || ""
    ).trim();

  if (!normalizedPublicId) {
    throw new Error(
      "The verification ID is missing."
    );
  }

  if (!normalizedToken) {
    throw new Error(
      "The verification token is missing."
    );
  }

  if (!file) {
    throw new Error(
      "Select the offer-letter PDF to verify."
    );
  }

  const formData =
    new FormData();

  formData.append(
    "offerPdf",
    file
  );

  return apiRequest(
    `/public/offer-verifications/${encodeURIComponent(
      normalizedPublicId
    )}/document-integrity?token=${encodeURIComponent(
      normalizedToken
    )}`,
    {
      method:
        "POST",

      body:
        formData,
    }
  );
}