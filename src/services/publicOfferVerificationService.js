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