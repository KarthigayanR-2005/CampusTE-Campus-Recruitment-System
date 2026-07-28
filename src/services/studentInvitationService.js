import {
    apiRequest,
  } from "./apiClient";
  
  export function getStudentJobInvitationsRequest({
    token,
  }) {
    return apiRequest(
      "/student/job-invitations",
      {
        method: "GET",
        token,
      }
    );
  }
  
  export function respondToStudentJobInvitationRequest({
    token,
    invitationId,
    status,
  }) {
    return apiRequest(
      `/student/job-invitations/${invitationId}/respond`,
      {
        method: "PATCH",
        token,
  
        body: {
          status,
        },
      }
    );
  }