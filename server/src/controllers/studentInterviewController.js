import {
    findStudentInterviewById,
    findStudentInterviews,
  } from "../models/studentInterviewModel.js";
  
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
  
  function getCurrentLocalDateTime() {
    const now =
      new Date();
  
    const year =
      now.getFullYear();
  
    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, "0");
  
    const day =
      String(
        now.getDate()
      ).padStart(2, "0");
  
    const hours =
      String(
        now.getHours()
      ).padStart(2, "0");
  
    const minutes =
      String(
        now.getMinutes()
      ).padStart(2, "0");
  
    return {
      date:
        `${year}-${month}-${day}`,
  
      time:
        `${hours}:${minutes}`,
    };
  }
  
  function getInterviewDisplayStatus(
    interview,
    currentDate,
    currentTime
  ) {
    const interviewDate =
      interview.interview.date;
  
    const interviewTime =
      interview.interview.time;
  
    if (
      interviewDate ===
        currentDate &&
      interviewTime >=
        currentTime
    ) {
      return "today";
    }
  
    if (
      interviewDate <
        currentDate ||
      (
        interviewDate ===
          currentDate &&
        interviewTime <
          currentTime
      )
    ) {
      return "completed";
    }
  
    return "upcoming";
  }
  
  function addDisplayStatus(
    interview,
    currentDate,
    currentTime
  ) {
    const displayStatus =
      getInterviewDisplayStatus(
        interview,
        currentDate,
        currentTime
      );
  
    return {
      ...interview,
  
      displayStatus,
  
      displayStatusLabel:
        displayStatus === "today"
          ? "Today"
          : displayStatus ===
              "completed"
            ? "Completed"
            : "Upcoming",
    };
  }
  
  export async function getStudentInterviews(
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
        await findStudentInterviews({
          studentUserId:
            request.auth.userId,
  
          search,
          jobId,
        });
  
      const {
        date: currentDate,
        time: currentTime,
      } =
        getCurrentLocalDateTime();
  
      const interviewsWithStatus =
        interviews.map(
          (interview) =>
            addDisplayStatus(
              interview,
              currentDate,
              currentTime
            )
        );
  
      const statistics = {
        total:
          interviewsWithStatus.length,
  
        today:
          interviewsWithStatus.filter(
            (interview) =>
              interview.displayStatus ===
              "today"
          ).length,
  
        upcoming:
          interviewsWithStatus.filter(
            (interview) =>
              interview.displayStatus ===
                "upcoming" ||
              interview.displayStatus ===
                "today"
          ).length,
  
        completed:
          interviewsWithStatus.filter(
            (interview) =>
              interview.displayStatus ===
              "completed"
          ).length,
      };
  
      const jobOptions = [
        ...new Map(
          interviewsWithStatus.map(
            (interview) => [
              interview.jobId,
  
              {
                jobId:
                  interview.jobId,
  
                jobTitle:
                  interview.job
                    .jobTitle,
  
                companyName:
                  interview.company
                    .companyName,
              },
            ]
          )
        ).values(),
      ];
  
      return response.status(200).json({
        success: true,
        interviews:
          interviewsWithStatus,
        statistics,
        jobOptions,
      });
    } catch (error) {
      console.error(
        "Get Student interviews error:",
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
  
  export async function getStudentInterview(
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
        await findStudentInterviewById({
          studentUserId:
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
  
      const {
        date: currentDate,
        time: currentTime,
      } =
        getCurrentLocalDateTime();
  
      return response.status(200).json({
        success: true,
  
        interview:
          addDisplayStatus(
            interview,
            currentDate,
            currentTime
          ),
      });
    } catch (error) {
      console.error(
        "Get Student interview error:",
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