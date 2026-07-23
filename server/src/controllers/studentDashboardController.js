import {
    findStudentRecentActivity,
  } from "../models/studentDashboardModel.js";
  
  import {
    findStudentProfileCompletionData,
  } from "../models/studentProfileCompletionModel.js";
  
  import {
    calculateStudentProfileCompletion,
  } from "../utils/studentProfileCompletion.js";
  
  export async function getStudentDashboard(
    request,
    response
  ) {
    try {
      const userId =
        request.auth.userId;
  
      const [
        completionData,
        recentActivity,
      ] = await Promise.all([
        findStudentProfileCompletionData(
          userId
        ),
  
        findStudentRecentActivity(
          userId
        ),
      ]);
  
      if (!completionData) {
        return response.status(404).json({
          success: false,
          message:
            "Student profile was not found.",
        });
      }
  
      const completion =
        calculateStudentProfileCompletion(
          completionData
        );
  
      const skillCount =
        Number(
          completionData.skillCount
        ) || 0;
  
      const projectCount =
        Number(
          completionData.projectCount
        ) || 0;
  
      const experienceCount =
        Number(
          completionData.experienceCount
        ) || 0;
  
      const certificationCount =
        Number(
          completionData.certificationCount
        ) || 0;
  
      const resumeUploaded =
        Number(
          completionData.resumeCount
        ) > 0;
  
      return response.status(200).json({
        success: true,
  
        dashboard: {
          student: {
            fullName:
              completionData.fullName ||
              "Student",
  
            email:
              completionData.email || "",
  
            degree:
              completionData.degree || "",
  
            department:
              completionData.department ||
              "",
          },
  
          completion,
  
          stats: {
            skillCount,
            projectCount,
            experienceCount,
            certificationCount,
            resumeUploaded,
          },
  
          recentActivity,
        },
      });
    } catch (error) {
      console.error(
        "Get student dashboard error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the student dashboard.",
      });
    }
  }