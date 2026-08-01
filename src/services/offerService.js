import {
    apiRequest,
  } from "./apiClient";
  
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
        body: offerData,
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
        body: offerData,
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