import { apiRequest } from "./apiClient";

export function getPendingApprovalsRequest({
  token,
  role,
}) {
  const roleQuery = role
    ? `?role=${encodeURIComponent(role)}`
    : "";

  return apiRequest(
    `/admin/approvals${roleQuery}`,
    {
      method: "GET",
      token,
    }
  );
}

export function reviewApprovalRequest({
  token,
  userId,
  decision,
}) {
  return apiRequest(
    `/admin/approvals/${userId}`,
    {
      method: "PATCH",
      token,
      body: {
        decision,
      },
    }
  );
}

export function getPlacementOfficersRequest({
  token,
}) {
  return apiRequest(
    "/admin/placement-officers",
    {
      method: "GET",
      token,
    }
  );
}

export function createPlacementOfficerRequest({
  token,
  officer,
}) {
  return apiRequest(
    "/admin/placement-officers",
    {
      method: "POST",
      token,
      body: officer,
    }
  );
}