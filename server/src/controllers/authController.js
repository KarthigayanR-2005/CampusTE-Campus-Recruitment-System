import bcrypt from "bcryptjs";

import {
    createUser,
    findUserByEmail,
    findUserByEmailForAuthentication,
    findUserById,
    updateLastLogin,
  } from "../models/userModel.js";

import {
  generateAccessToken,
} from "../utils/generateToken.js";

const allowedRegistrationRoles = [
  "student",
  "recruiter",
];

const frontendRoleByDatabaseRole = {
  student: "student",
  recruiter: "recruiter",
  placement_officer: "placementOfficer",
  admin: "admin",
};

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value) {
  return typeof value === "string"
    ? value.trim().toLowerCase()
    : "";
}

export async function registerUser(
  request,
  response
) {
  try {
    const fullName =
      typeof request.body.fullName === "string"
        ? request.body.fullName.trim()
        : "";

    const email = normalizeEmail(
      request.body.email
    );

    const password =
      typeof request.body.password === "string"
        ? request.body.password
        : "";

    const role =
      typeof request.body.role === "string"
        ? request.body.role.trim()
        : "";

    if (!fullName) {
      return response.status(400).json({
        success: false,
        message: "Full name is required.",
      });
    }

    if (fullName.length < 2) {
      return response.status(400).json({
        success: false,
        message:
          "Full name must contain at least 2 characters.",
      });
    }

    if (fullName.length > 100) {
      return response.status(400).json({
        success: false,
        message:
          "Full name cannot exceed 100 characters.",
      });
    }

    if (
      !email ||
      email.length > 150 ||
      !emailPattern.test(email)
    ) {
      return response.status(400).json({
        success: false,
        message: "Enter a valid email address.",
      });
    }

    if (!password) {
      return response.status(400).json({
        success: false,
        message: "Password is required.",
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
      Buffer.byteLength(password, "utf8") > 72
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Password cannot exceed 72 bytes.",
      });
    }

    if (
      !allowedRegistrationRoles.includes(role)
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Only student and recruiter registration is allowed.",
      });
    }

    const existingUser =
      await findUserByEmail(email);

    if (existingUser) {
      return response.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(
      password,
      12
    );

    const accountStatus =
      role === "student"
        ? "active"
        : "pending";

    const user = await createUser({
      fullName,
      email,
      passwordHash,
      role,
      accountStatus,
    });

    return response.status(201).json({
      success: true,
      message:
        role === "student"
          ? "Student account created successfully."
          : "Recruiter account created and submitted for approval.",
      user,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return response.status(409).json({
        success: false,
        message:
          "An account with this email already exists.",
      });
    }

    console.error("Registration error:", error);

    return response.status(500).json({
      success: false,
      message:
        "Unable to create the account. Please try again.",
    });
  }
}

export async function loginUser(
  request,
  response
) {
  try {
    const email = normalizeEmail(
      request.body.email
    );

    const password =
      typeof request.body.password === "string"
        ? request.body.password
        : "";

    if (
      !email ||
      !emailPattern.test(email)
    ) {
      return response.status(400).json({
        success: false,
        message:
          "Enter a valid email address.",
      });
    }

    if (!password) {
      return response.status(400).json({
        success: false,
        message: "Password is required.",
      });
    }

    const user =
      await findUserByEmailForAuthentication(
        email
      );

    if (!user) {
      return response.status(401).json({
        success: false,
        message:
          "Invalid email address or password.",
      });
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!passwordMatches) {
      return response.status(401).json({
        success: false,
        message:
          "Invalid email address or password.",
      });
    }

    if (user.accountStatus !== "active") {
      const statusMessages = {
        pending:
          "Your account is waiting for approval.",
        suspended:
          "Your account has been suspended. Contact support.",
        rejected:
          "Your account registration was rejected.",
      };

      return response.status(403).json({
        success: false,
        accountStatus: user.accountStatus,
        message:
          statusMessages[user.accountStatus] ||
          "Your account is not currently active.",
      });
    }

    const token = generateAccessToken({
      userId: user.userId,
      databaseRole: user.role,
    });

    await updateLastLogin(user.userId);

    return response.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      tokenType: "Bearer",
      expiresIn:
        process.env.JWT_EXPIRES_IN || "1h",
      user: {
        userId: user.userId,
        fullName: user.fullName,
        email: user.email,
        role:
          frontendRoleByDatabaseRole[
            user.role
          ] || user.role,
        accountStatus: user.accountStatus,
        emailVerified:
          user.emailVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return response.status(500).json({
      success: false,
      message:
        "Unable to log in. Please try again.",
    });
  }
}

export async function getCurrentUser(
    request,
    response
  ) {
    try {
      const user = await findUserById(
        request.auth.userId
      );
  
      if (!user) {
        return response.status(404).json({
          success: false,
          message:
            "The authenticated user account was not found.",
        });
      }
  
      if (user.accountStatus !== "active") {
        return response.status(403).json({
          success: false,
          accountStatus: user.accountStatus,
          message:
            "Your account is not currently active.",
        });
      }
  
      return response.status(200).json({
        success: true,
        user: {
          userId: user.userId,
          fullName: user.fullName,
          email: user.email,
          role:
            frontendRoleByDatabaseRole[
              user.role
            ] || user.role,
          accountStatus: user.accountStatus,
          emailVerified: user.emailVerified,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error(
        "Get current user error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve the current user.",
      });
    }
  }