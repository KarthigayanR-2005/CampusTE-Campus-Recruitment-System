import {
    createRecruiterOffer,
    findRecruiterOfferById,
    findRecruiterOffers,
    findStudentOfferById,
    findStudentOffers,
    respondToStudentOffer,
    sendRecruiterOffer,
    updateRecruiterOffer,
    withdrawRecruiterOffer,
  } from "../models/offerModel.js";
  
  function readText(value) {
    return typeof value ===
      "string"
      ? value.trim()
      : "";
  }
  
  function parsePositiveId(value) {
    const parsedValue =
      Number(value);
  
    return Number.isInteger(
      parsedValue
    ) &&
    parsedValue > 0
      ? parsedValue
      : null;
  }
  
  function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(
      value
    );
  }
  
  function validateOfferPayload(
    body
  ) {
    const designation =
      readText(
        body?.designation
      );
  
    const salaryAmount =
      Number(
        body?.salaryAmount
      );
  
    const currencyCode =
      (
        readText(
          body?.currencyCode
        ) ||
        "INR"
      ).toUpperCase();
  
    const salaryPeriod =
      readText(
        body?.salaryPeriod
      ).toLowerCase() ||
      "annual";
  
    const joiningDate =
      readText(
        body?.joiningDate
      );
  
    const workLocation =
      readText(
        body?.workLocation
      );
  
    const offerExpiryDate =
      readText(
        body?.offerExpiryDate
      );
  
    const employmentType =
      readText(
        body?.employmentType
      );
  
    const probationPeriod =
      readText(
        body?.probationPeriod
      );
  
    const terms =
      readText(
        body?.terms
      );
  
    if (
      designation.length < 2 ||
      designation.length > 150
    ) {
      return {
        error:
          "Designation must contain between 2 and 150 characters.",
      };
    }
  
    if (
      !Number.isFinite(
        salaryAmount
      ) ||
      salaryAmount <= 0
    ) {
      return {
        error:
          "Enter a valid salary amount.",
      };
    }
  
    if (
      !/^[A-Z]{3}$/.test(
        currencyCode
      )
    ) {
      return {
        error:
          "Currency code must contain exactly three letters.",
      };
    }
  
    if (
      ![
        "annual",
        "monthly",
      ].includes(
        salaryPeriod
      )
    ) {
      return {
        error:
          "Salary period must be annual or monthly.",
      };
    }
  
    if (
      !isValidDate(
        joiningDate
      )
    ) {
      return {
        error:
          "Select a valid joining date.",
      };
    }
  
    if (
      workLocation.length < 2 ||
      workLocation.length > 200
    ) {
      return {
        error:
          "Work location must contain between 2 and 200 characters.",
      };
    }
  
    if (
      !isValidDate(
        offerExpiryDate
      )
    ) {
      return {
        error:
          "Select a valid offer expiry date.",
      };
    }
  
    const today =
      new Date()
        .toISOString()
        .slice(0, 10);
  
    if (
      offerExpiryDate < today
    ) {
      return {
        error:
          "Offer expiry date cannot be in the past.",
      };
    }
  
    if (
      joiningDate < today
    ) {
      return {
        error:
          "Joining date cannot be in the past.",
      };
    }
  
    if (
      offerExpiryDate >
      joiningDate
    ) {
      return {
        error:
          "Offer expiry date must be on or before the joining date.",
      };
    }
  
    if (
      employmentType.length >
      80
    ) {
      return {
        error:
          "Employment type cannot exceed 80 characters.",
      };
    }
  
    if (
      probationPeriod.length >
      100
    ) {
      return {
        error:
          "Probation period cannot exceed 100 characters.",
      };
    }
  
    if (
      terms.length > 10000
    ) {
      return {
        error:
          "Offer terms cannot exceed 10,000 characters.",
      };
    }
  
    return {
      payload: {
        designation,
        salaryAmount,
        currencyCode,
        salaryPeriod,
        joiningDate,
        workLocation,
        offerExpiryDate,
        employmentType,
        probationPeriod,
        terms,
      },
    };
  }
  
  function createStatistics(
    offers
  ) {
    return {
      total:
        offers.length,
  
      draft:
        offers.filter(
          (offer) =>
            offer.status ===
            "draft"
        ).length,
  
      sent:
        offers.filter(
          (offer) =>
            offer.status ===
            "sent"
        ).length,
  
      accepted:
        offers.filter(
          (offer) =>
            offer.status ===
            "accepted"
        ).length,
  
      declined:
        offers.filter(
          (offer) =>
            offer.status ===
            "declined"
        ).length,
  
      withdrawn:
        offers.filter(
          (offer) =>
            offer.status ===
            "withdrawn"
        ).length,
  
      expired:
        offers.filter(
          (offer) =>
            offer.status ===
            "expired"
        ).length,
    };
  }
  
  export async function getRecruiterOffers(
    request,
    response
  ) {
    try {
      const offers =
        await findRecruiterOffers(
          request.auth.userId
        );
  
      return response
        .status(200)
        .json({
          success: true,
          offers,
  
          statistics:
            createStatistics(
              offers
            ),
        });
    } catch (error) {
      console.error(
        "Get Recruiter offers error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to retrieve offers.",
        });
    }
  }
  
  export async function getRecruiterOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      const offer =
        await findRecruiterOfferById({
          recruiterUserId:
            request.auth.userId,
  
          offerId,
        });
  
      if (!offer) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
          offer,
        });
    } catch (error) {
      console.error(
        "Get Recruiter offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to retrieve the offer.",
        });
    }
  }
  
  export async function createOffer(
    request,
    response
  ) {
    try {
      const applicationId =
        parsePositiveId(
          request.params
            .applicationId
        );
  
      if (!applicationId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid application ID is required.",
          });
      }
  
      const validation =
        validateOfferPayload(
          request.body
        );
  
      if (validation.error) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              validation.error,
          });
      }
  
      const result =
        await createRecruiterOffer({
          recruiterUserId:
            request.auth.userId,
  
          applicationId,
  
          offerData:
            validation.payload,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Applicant was not found.",
          });
      }
  
      if (
        result.result ===
        "invalid_application_status"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "An offer can only be created for a selected applicant.",
          });
      }
  
      if (
        result.result ===
        "already_exists"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "An offer already exists for this application.",
  
            offerId:
              result.offerId,
          });
      }
  
      return response
        .status(201)
        .json({
          success: true,
  
          message:
            "Offer draft created successfully.",
  
          offer:
            result.offer,
        });
    } catch (error) {
      console.error(
        "Create offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to create the offer.",
        });
    }
  }
  
  export async function updateOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      const validation =
        validateOfferPayload(
          request.body
        );
  
      if (validation.error) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              validation.error,
          });
      }
  
      const result =
        await updateRecruiterOffer({
          recruiterUserId:
            request.auth.userId,
  
          offerId,
  
          offerData:
            validation.payload,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      if (
        result.result ===
        "invalid_status"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "Only draft offers can be edited.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
  
          message:
            "Offer updated successfully.",
  
          offer:
            result.offer,
        });
    } catch (error) {
      console.error(
        "Update offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to update the offer.",
        });
    }
  }
  
  export async function sendOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      const result =
        await sendRecruiterOffer({
          recruiterUserId:
            request.auth.userId,
  
          offerId,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      if (
        result.result ===
        "invalid_status"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "Only a draft offer can be sent.",
          });
      }
  
      if (
        result.result ===
        "expired"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "Update the offer expiry date before sending it.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
  
          message:
            "Offer sent to the Student successfully.",
  
          offer:
            result.offer,
        });
    } catch (error) {
      console.error(
        "Send offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to send the offer.",
        });
    }
  }
  
  export async function withdrawOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      const note =
        readText(
          request.body?.note
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      if (
        note.length > 1000
      ) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "Withdrawal note cannot exceed 1000 characters.",
          });
      }
  
      const result =
        await withdrawRecruiterOffer({
          recruiterUserId:
            request.auth.userId,
  
          offerId,
          note,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      if (
        result.result ===
        "invalid_status"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "This offer cannot be withdrawn.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
  
          message:
            "Offer withdrawn successfully.",
  
          offer:
            result.offer,
        });
    } catch (error) {
      console.error(
        "Withdraw offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to withdraw the offer.",
        });
    }
  }
  
  export async function getStudentOffers(
    request,
    response
  ) {
    try {
      const offers =
        await findStudentOffers(
          request.auth.userId
        );
  
      return response
        .status(200)
        .json({
          success: true,
          offers,
  
          statistics:
            createStatistics(
              offers
            ),
        });
    } catch (error) {
      console.error(
        "Get Student offers error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to retrieve your offers.",
        });
    }
  }
  
  export async function getStudentOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      const offer =
        await findStudentOfferById({
          studentUserId:
            request.auth.userId,
  
          offerId,
        });
  
      if (!offer) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
          offer,
        });
    } catch (error) {
      console.error(
        "Get Student offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to retrieve the offer.",
        });
    }
  }
  
  export async function respondToOffer(
    request,
    response
  ) {
    try {
      const offerId =
        parsePositiveId(
          request.params.offerId
        );
  
      const status =
        readText(
          request.body?.status
        ).toLowerCase();
  
      const note =
        readText(
          request.body?.note
        );
  
      if (!offerId) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "A valid offer ID is required.",
          });
      }
  
      if (
        ![
          "accepted",
          "declined",
        ].includes(status)
      ) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "Offer response must be accepted or declined.",
          });
      }
  
      if (
        note.length > 1000
      ) {
        return response
          .status(400)
          .json({
            success: false,
  
            message:
              "Response note cannot exceed 1000 characters.",
          });
      }
  
      const result =
        await respondToStudentOffer({
          studentUserId:
            request.auth.userId,
  
          offerId,
  
          responseStatus:
            status,
  
          note,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response
          .status(404)
          .json({
            success: false,
  
            message:
              "Offer was not found.",
          });
      }
  
      if (
        result.result ===
        "already_responded"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              `This offer is already ${result.status}.`,
          });
      }
  
      if (
        result.result ===
        "expired"
      ) {
        return response
          .status(409)
          .json({
            success: false,
  
            message:
              "This offer has expired.",
          });
      }
  
      return response
        .status(200)
        .json({
          success: true,
  
          message:
            status ===
            "accepted"
              ? "Offer accepted successfully."
              : "Offer declined successfully.",
  
          offer:
            result.offer,
        });
    } catch (error) {
      console.error(
        "Respond to offer error:",
        error
      );
  
      return response
        .status(500)
        .json({
          success: false,
  
          message:
            error.message ||
            "Unable to respond to the offer.",
        });
    }
  }