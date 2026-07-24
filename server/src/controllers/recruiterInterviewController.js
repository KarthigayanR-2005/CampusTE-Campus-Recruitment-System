import {
    cancelRecruiterInterview,
    findRecruiterInterviewById,
    findRecruiterInterviews,
    rescheduleRecruiterInterview,
  } from "../models/recruiterInterviewModel.js";
  
  const validInterviewModes = [
    "Google Meet",
    "Microsoft Teams",
    "Zoom",
    "In Person",
    "Phone Interview",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function parsePositiveId(value) {
    const parsedValue =
      Number(value);
  
    return Number.isInteger(
      parsedValue
    ) && parsedValue > 0
      ? parsedValue
      : null;
  }
  
  function isValidDate(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(
      value
    );
  }
  
  function isValidTime(value) {
    return /^\d{2}:\d{2}$/.test(
      value
    );
  }
  
  function validateInterviewData({
    interviewDate,
    interviewTime,
    interviewMode,
    interviewerName,
    interviewDetails,
  }) {
    if (
      !isValidDate(
        interviewDate
      )
    ) {
      return "Select a valid interview date.";
    }
  
    const today =
      new Date()
        .toISOString()
        .slice(0, 10);
  
    if (interviewDate < today) {
      return "Interview date cannot be in the past.";
    }
  
    if (
      !isValidTime(
        interviewTime
      )
    ) {
      return "Select a valid interview time.";
    }
  
    if (
      !validInterviewModes.includes(
        interviewMode
      )
    ) {
      return "Select a valid interview mode.";
    }
  
    if (
      interviewerName.length < 2 ||
      interviewerName.length > 150
    ) {
      return "Interviewer name must contain between 2 and 150 characters.";
    }
  
    if (
      interviewDetails.length > 500
    ) {
      return "Interview details cannot exceed 500 characters.";
    }
  
    return "";
  }
  
  export async function getRecruiterInterviews(
    request,
    response
  ) {
    try {
      const search =
        readText(
          request.query.search
        );
  
      const jobId =
        request.query.jobId
          ? parsePositiveId(
              request.query.jobId
            )
          : null;
  
      if (
        request.query.jobId &&
        !jobId
      ) {
        return response.status(400).json({
          success: false,
          message:
            "A valid job ID is required.",
        });
      }
  
      const interviews =
        await findRecruiterInterviews({
          recruiterUserId:
            request.auth.userId,
  
          search,
          jobId,
        });
  
      const today =
        new Date()
          .toISOString()
          .slice(0, 10);
  
      const currentTime =
        new Date()
          .toTimeString()
          .slice(0, 5);
  
      const statistics = {
        total:
          interviews.length,
  
        today:
          interviews.filter(
            (item) =>
              item.interview.date ===
              today
          ).length,
  
        upcoming:
          interviews.filter(
            (item) =>
              item.interview.date >
                today ||
              (
                item.interview.date ===
                  today &&
                item.interview.time >=
                  currentTime
              )
          ).length,
  
        completed:
          interviews.filter(
            (item) =>
              item.interview.date <
                today ||
              (
                item.interview.date ===
                  today &&
                item.interview.time <
                  currentTime
              )
          ).length,
      };
  
      const jobOptions = [
        ...new Map(
          interviews.map(
            (item) => [
              item.jobId,
  
              {
                jobId:
                  item.jobId,
  
                jobTitle:
                  item.job.jobTitle,
              },
            ]
          )
        ).values(),
      ];
  
      return response.status(200).json({
        success: true,
        interviews,
        statistics,
        jobOptions,
      });
    } catch (error) {
      console.error(
        "Get Recruiter interviews error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to retrieve interviews.",
      });
    }
  }
  
  export async function getRecruiterInterview(
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
        return response.status(400).json({
          success: false,
          message:
            "A valid application ID is required.",
        });
      }
  
      const interview =
        await findRecruiterInterviewById({
          recruiterUserId:
            request.auth.userId,
  
          applicationId,
        });
  
      if (!interview) {
        return response.status(404).json({
          success: false,
          message:
            "Interview was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        interview,
      });
    } catch (error) {
      console.error(
        "Get Recruiter interview error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to retrieve interview details.",
      });
    }
  }
  
  export async function rescheduleInterview(
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
        return response.status(400).json({
          success: false,
          message:
            "A valid application ID is required.",
        });
      }
  
      const interviewDate =
        readText(
          request.body?.interviewDate
        );
  
      const interviewTime =
        readText(
          request.body?.interviewTime
        );
  
      const interviewMode =
        readText(
          request.body?.interviewMode
        );
  
      const interviewerName =
        readText(
          request.body?.interviewerName
        );
  
      const interviewDetails =
        readText(
          request.body?.interviewDetails
        );
  
      const validationError =
        validateInterviewData({
          interviewDate,
          interviewTime,
          interviewMode,
          interviewerName,
          interviewDetails,
        });
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message:
            validationError,
        });
      }
  
      const result =
        await rescheduleRecruiterInterview({
          recruiterUserId:
            request.auth.userId,
  
          applicationId,
          interviewDate,
          interviewTime,
          interviewMode,
          interviewerName,
          interviewDetails,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response.status(404).json({
          success: false,
          message:
            "Interview was not found.",
        });
      }
  
      if (
        result.result ===
        "invalid_status"
      ) {
        return response.status(409).json({
          success: false,
          message:
            "Only active interviews can be rescheduled.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Interview rescheduled successfully.",
        interview:
          result.interview,
      });
    } catch (error) {
      console.error(
        "Reschedule Recruiter interview error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to reschedule the interview.",
      });
    }
  }
  
  export async function cancelInterview(
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
        return response.status(400).json({
          success: false,
          message:
            "A valid application ID is required.",
        });
      }
  
      const cancellationReason =
        readText(
          request.body
            ?.cancellationReason
        );
  
      if (
        cancellationReason.length < 3
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Enter a cancellation reason.",
        });
      }
  
      if (
        cancellationReason.length >
        500
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Cancellation reason cannot exceed 500 characters.",
        });
      }
  
      const result =
        await cancelRecruiterInterview({
          recruiterUserId:
            request.auth.userId,
  
          applicationId,
          cancellationReason,
        });
  
      if (
        result.result ===
        "not_found"
      ) {
        return response.status(404).json({
          success: false,
          message:
            "Interview was not found.",
        });
      }
  
      if (
        result.result ===
        "invalid_status"
      ) {
        return response.status(409).json({
          success: false,
          message:
            "Only active interviews can be cancelled.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Interview cancelled successfully. The applicant was moved back to Shortlisted.",
      });
    } catch (error) {
      console.error(
        "Cancel Recruiter interview error:",
        error
      );
  
      return response.status(500).json({
        success: false,
  
        message:
          error.message ||
          "Unable to cancel the interview.",
      });
    }
  }