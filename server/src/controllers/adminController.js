import bcrypt from "bcryptjs";

import {
  createPlacementOfficerAccount,
  findApprovalCandidateById,
  findPendingApprovals,
  findPlacementOfficerByEmployeeId,
  findPlacementOfficers,
  findUserByEmail,
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

function readText(value) {
  return typeof value === "string"
    ? value.trim()
    : "";
}

function validateMaximumLength(
  value,
  maximumLength,
  fieldName
) {
  if (value.length > maximumLength) {
    return `${fieldName} cannot exceed ${maximumLength} characters.`;
  }

  return "";
}

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

export async function getPlacementOfficers(
  request,
  response
) {
  try {
    const officers =
      await findPlacementOfficers();

    return response.status(200).json({
      success: true,
      count: officers.length,
      officers,
    });
  } catch (error) {
    console.error(
      "Get placement officers error:",
      error
    );

    return response.status(500).json({
      success: false,
      message:
        "Unable to retrieve placement officers.",
    });
  }
}

export async function createPlacementOfficer(
  request,
  response
) {
  try {
    const fullName = readText(
      request.body.fullName
    );

    const email = readText(
      request.body.email
    ).toLowerCase();

    const password =
      typeof request.body.password ===
      "string"
        ? request.body.password
        : "";

    const phone = readText(
      request.body.phone
    );

    const employeeId = readText(
      request.body.employeeId
    ).toUpperCase();

    const designation = readText(
      request.body.designation
    );

    const department = readText(
      request.body.department
    );

    const institution = readText(
      request.body.institution
    );

    const institutionCode = readText(
      request.body.institutionCode
    ).toUpperCase();

    const location = readText(
      request.body.location
    );

    const requiredFields = [
      [fullName, "Full name"],
      [email, "Email"],
      [password, "Password"],
      [phone, "Phone number"],
      [employeeId, "Employee ID"],
      [designation, "Designation"],
      [department, "Department"],
      [institution, "Institution"],
      [
        institutionCode,
        "Institution code",
      ],
      [location, "Location"],
    ];

    const missingField =
      requiredFields.find(
        ([value]) => !value
      );

    if (missingField) {
      return response.status(400).json({
        success: false,
        message: `${missingField[1]} is required.`,
      });
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return response.status(400).json({
        success: false,
        message:
          "A valid email address is required.",
      });
    }

    if (password.length < 8) {
      return response.status(400).json({
        success: false,
        message:
          "Password must contain at least 8 characters.",
      });
    }

    if (
      Buffer.byteLength(
        password,
        "utf8"
      ) > 72
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Password cannot exceed 72 bytes.",
      });
    }

    const lengthRules = [
      [fullName, 100, "Full name"],
      [email, 150, "Email"],
      [phone, 30, "Phone number"],
      [employeeId, 50, "Employee ID"],
      [
        designation,
        100,
        "Designation",
      ],
      [department, 120, "Department"],
      [institution, 180, "Institution"],
      [
        institutionCode,
        50,
        "Institution code",
      ],
      [location, 150, "Location"],
    ];

    for (const [
      value,
      maximumLength,
      fieldName,
    ] of lengthRules) {
      const validationError =
        validateMaximumLength(
          value,
          maximumLength,
          fieldName
        );

      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
    }

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      return response.status(409).json({
        success: false,
        message:
          "An account with this email address already exists.",
      });
    }

    const existingEmployee =
      await findPlacementOfficerByEmployeeId(
        employeeId
      );

    if (existingEmployee) {
      return response.status(409).json({
        success: false,
        message:
          "A placement officer with this employee ID already exists.",
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 12);

    const officer =
      await createPlacementOfficerAccount({
        fullName,
        email,
        passwordHash,
        phone,
        employeeId,
        designation,
        department,
        institution,
        institutionCode,
        location,
      });

    return response.status(201).json({
      success: true,
      message:
        "Placement Officer account created successfully.",
      officer,
    });
  } catch (error) {
    console.error(
      "Create placement officer error:",
      error
    );

    if (
      error.code === "ER_DUP_ENTRY" ||
      error.errno === 1062
    ) {
      return response.status(409).json({
        success: false,
        message:
          "The email address or employee ID already exists.",
      });
    }

    return response.status(500).json({
      success: false,
      message:
        "Unable to create the Placement Officer account.",
    });
  }
}