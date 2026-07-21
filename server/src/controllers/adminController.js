import {
    findApprovalCandidateById,
    findPendingApprovals,
    updateApprovalStatus,
  } from "../models/adminModel.js";
  
  const approvableRoles = [
    "recruiter",
    "placement_officer",
  ];
  
  const decisionStatusMap = {
    approve: "active",
    reject: "rejected",
  };
  
  export async function getPendingApprovals(
    request,
    response
  ) {
    try {
      const requestedRole =
        typeof request.query.role === "string"
          ? request.query.role
              .trim()
              .toLowerCase()
          : "";
  
      if (
        requestedRole &&
        !approvableRoles.includes(
          requestedRole
        )
      ) {
        return response.status(400).json({
          success: false,
          message:
            "Role must be recruiter or placement_officer.",
        });
      }
  
      const users =
        await findPendingApprovals(
          requestedRole || null
        );
  
      return response.status(200).json({
        success: true,
        count: users.length,
        users,
      });
    } catch (error) {
      console.error(
        "Get pending approvals error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve pending approvals.",
      });
    }
  }
  
  export async function reviewUserApproval(
    request,
    response
  ) {
    try {
      const userId = Number(
        request.params.userId
      );
  
      const decision =
        typeof request.body.decision === "string"
          ? request.body.decision
              .trim()
              .toLowerCase()
          : "";
  
      if (
        !Number.isInteger(userId) ||
        userId <= 0
      ) {
        return response.status(400).json({
          success: false,
          message:
            "A valid user ID is required.",
        });
      }
  
      const accountStatus =
        decisionStatusMap[decision];
  
      if (!accountStatus) {
        return response.status(400).json({
          success: false,
          message:
            "Decision must be approve or reject.",
        });
      }
  
      const candidate =
        await findApprovalCandidateById(
          userId
        );
  
      if (!candidate) {
        return response.status(404).json({
          success: false,
          message:
            "The requested approval account was not found.",
        });
      }
  
      if (
        candidate.accountStatus !==
        "pending"
      ) {
        return response.status(409).json({
          success: false,
          message:
            "This account has already been reviewed.",
        });
      }
  
      const affectedRows =
        await updateApprovalStatus({
          userId,
          accountStatus,
        });
  
      if (affectedRows === 0) {
        return response.status(409).json({
          success: false,
          message:
            "The account could not be updated because its status changed.",
        });
      }
  
      const updatedUser =
        await findApprovalCandidateById(
          userId
        );
  
      return response.status(200).json({
        success: true,
        message:
          decision === "approve"
            ? "Account approved successfully."
            : "Account rejected successfully.",
        user: updatedUser,
      });
    } catch (error) {
      console.error(
        "Review approval error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to review the account.",
      });
    }
  }