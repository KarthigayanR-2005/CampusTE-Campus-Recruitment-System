import {
    findStudentProfileCompletionData,
  } from "../models/studentProfileCompletionModel.js";
  
  import {
    calculateStudentProfileCompletion,
  } from "../utils/studentProfileCompletion.js";
  
  export async function getStudentProfileCompletion(
    request,
    response
  ) {
    try {
      const completionData =
        await findStudentProfileCompletionData(
          request.auth.userId
        );
  
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
  
      return response.status(200).json({
        success: true,
        completion,
      });
    } catch (error) {
      console.error(
        "Get profile completion error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to calculate profile completion.",
      });
    }
  }