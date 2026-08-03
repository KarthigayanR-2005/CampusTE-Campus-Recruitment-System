import fs from "node:fs/promises";
import path from "node:path";

import {
  clearRecruiterCompanyBrandingFile,
  findRecruiterCompanyBrandingFile,
  findRecruiterCompanyProfile,
  saveRecruiterCompanyBrandingFile,
  saveRecruiterCompanyProfile,
} from "../models/recruiterCompanyProfileModel.js";

const brandingDirectory =
  path.resolve(
    process.cwd(),
    "uploads",
    "company-branding"
  );

const allowedCompanySizes = [
  "1 - 50 Employees",
  "51 - 200 Employees",
  "201 - 500 Employees",
  "501 - 1000 Employees",
  "1000+ Employees",
];

function readText(value) {
  return typeof value ===
    "string"
    ? value.trim()
    : "";
}

function readFoundedYear(
  value
) {
  const textValue =
    readText(
      value
    );

  if (!textValue) {
    return null;
  }

  const foundedYear =
    Number(
      textValue
    );

  if (
    !Number.isInteger(
      foundedYear
    )
  ) {
    return Number.NaN;
  }

  return foundedYear;
}

function isValidEmail(
  value
) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value
  );
}

function isValidPhone(
  value
) {
  return /^[+0-9()\-\s]{7,30}$/.test(
    value
  );
}

function isValidUrl(
  value
) {
  if (!value) {
    return true;
  }

  try {
    const url =
      new URL(
        value
      );

    return (
      url.protocol ===
        "http:" ||
      url.protocol ===
        "https:"
    );
  } catch {
    return false;
  }
}

function readCompanyProfileData(
  body = {}
) {
  return {
    companyName:
      readText(
        body.companyName
      ),

    industry:
      readText(
        body.industry
      ),

    companySize:
      readText(
        body.companySize
      ),

    foundedYear:
      readFoundedYear(
        body.foundedYear
      ),

    website:
      readText(
        body.website
      ),

    contactEmail:
      readText(
        body.contactEmail
      ).toLowerCase(),

    contactPhone:
      readText(
        body.contactPhone
      ),

    headquarters:
      readText(
        body.headquarters
      ),

    linkedinUrl:
      readText(
        body.linkedinUrl
      ),

    recruiterName:
      readText(
        body.recruiterName
      ),

    recruiterDesignation:
      readText(
        body.recruiterDesignation
      ),

    description:
      readText(
        body.description
      ),
  };
}

function validateCompanyProfile({
  companyName,
  industry,
  companySize,
  foundedYear,
  website,
  contactEmail,
  contactPhone,
  headquarters,
  linkedinUrl,
  recruiterName,
  recruiterDesignation,
  description,
}) {
  if (!companyName) {
    return "Company name is required.";
  }

  if (
    companyName.length < 2 ||
    companyName.length > 150
  ) {
    return "Company name must contain between 2 and 150 characters.";
  }

  if (!industry) {
    return "Industry is required.";
  }

  if (
    industry.length > 120
  ) {
    return "Industry cannot exceed 120 characters.";
  }

  if (
    !allowedCompanySizes.includes(
      companySize
    )
  ) {
    return "Select a valid company size.";
  }

  if (
    Number.isNaN(
      foundedYear
    )
  ) {
    return "Founded year must be a valid number.";
  }

  const currentYear =
    new Date()
      .getFullYear();

  if (
    foundedYear !== null &&
    (
      foundedYear < 1800 ||
      foundedYear >
        currentYear
    )
  ) {
    return `Founded year must be between 1800 and ${currentYear}.`;
  }

  if (
    !isValidUrl(
      website
    )
  ) {
    return "Website must begin with http:// or https://.";
  }

  if (
    website.length > 255
  ) {
    return "Website URL cannot exceed 255 characters.";
  }

  if (!contactEmail) {
    return "Company contact email is required.";
  }

  if (
    !isValidEmail(
      contactEmail
    )
  ) {
    return "Enter a valid company contact email.";
  }

  if (!contactPhone) {
    return "Company contact phone is required.";
  }

  if (
    !isValidPhone(
      contactPhone
    )
  ) {
    return "Enter a valid company contact phone number.";
  }

  if (!headquarters) {
    return "Company headquarters is required.";
  }

  if (
    headquarters.length >
    180
  ) {
    return "Headquarters cannot exceed 180 characters.";
  }

  if (
    !isValidUrl(
      linkedinUrl
    )
  ) {
    return "LinkedIn URL must begin with http:// or https://.";
  }

  if (
    linkedinUrl.length >
    255
  ) {
    return "LinkedIn URL cannot exceed 255 characters.";
  }

  if (!recruiterName) {
    return "Recruiter or HR name is required.";
  }

  if (
    recruiterName.length >
    150
  ) {
    return "Recruiter name cannot exceed 150 characters.";
  }

  if (
    !recruiterDesignation
  ) {
    return "Recruiter designation is required.";
  }

  if (
    recruiterDesignation
      .length > 150
  ) {
    return "Recruiter designation cannot exceed 150 characters.";
  }

  if (!description) {
    return "Company description is required.";
  }

  if (
    description.length < 20
  ) {
    return "Company description must contain at least 20 characters.";
  }

  if (
    description.length >
    3000
  ) {
    return "Company description cannot exceed 3000 characters.";
  }

  return "";
}

function getAbsoluteBrandingPath(
  relativeFilePath
) {
  const absoluteFilePath =
    path.resolve(
      process.cwd(),
      relativeFilePath
    );

  const validPrefix =
    `${brandingDirectory}${path.sep}`;

  if (
    !absoluteFilePath.startsWith(
      validPrefix
    )
  ) {
    throw new Error(
      "Invalid company branding file path."
    );
  }

  return absoluteFilePath;
}

function getRelativeUploadedPath(
  request
) {
  return path
    .relative(
      process.cwd(),
      request.file.path
    )
    .split(path.sep)
    .join("/");
}

async function safelyDeleteFile(
  relativeFilePath
) {
  if (!relativeFilePath) {
    return;
  }

  try {
    await fs.unlink(
      getAbsoluteBrandingPath(
        relativeFilePath
      )
    );
  } catch (error) {
    if (
      error.code !==
      "ENOENT"
    ) {
      console.error(
        "Company branding file deletion error:",
        error
      );
    }
  }
}

async function hasValidImageSignature({
  absoluteFilePath,
  mimeType,
}) {
  let fileHandle;

  try {
    fileHandle =
      await fs.open(
        absoluteFilePath,
        "r"
      );

    const signature =
      Buffer.alloc(
        8
      );

    await fileHandle.read(
      signature,
      0,
      signature.length,
      0
    );

    if (
      mimeType ===
      "image/png"
    ) {
      const pngSignature =
        Buffer.from([
          0x89,
          0x50,
          0x4e,
          0x47,
          0x0d,
          0x0a,
          0x1a,
          0x0a,
        ]);

      return signature.equals(
        pngSignature
      );
    }

    if (
      mimeType ===
      "image/jpeg"
    ) {
      return (
        signature[0] ===
          0xff &&
        signature[1] ===
          0xd8 &&
        signature[2] ===
          0xff
      );
    }

    return false;
  } catch {
    return false;
  } finally {
    if (fileHandle) {
      await fileHandle
        .close();
    }
  }
}

async function sendBrandingFile({
  response,
  brandingFile,
  fallbackFileName,
}) {
  if (
    !brandingFile
      ?.available
  ) {
    return response
      .status(404)
      .json({
        success: false,

        message:
          "The requested branding image is not available.",
      });
  }

  const absoluteFilePath =
    getAbsoluteBrandingPath(
      brandingFile.filePath
    );

  try {
    await fs.access(
      absoluteFilePath
    );
  } catch {
    return response
      .status(404)
      .json({
        success: false,

        message:
          "The branding image could not be found.",
      });
  }

  const originalFileName =
    brandingFile
      .originalFileName ||
    fallbackFileName;

  const safeFileName =
    originalFileName.replace(
      /["\r\n]/g,
      "_"
    );

  const encodedFileName =
    encodeURIComponent(
      originalFileName
    );

  response.setHeader(
    "Content-Type",
    brandingFile.mimeType ||
      "application/octet-stream"
  );

  response.setHeader(
    "Content-Disposition",
    `inline; filename="${safeFileName}"; filename*=UTF-8''${encodedFileName}`
  );

  return response.sendFile(
    absoluteFilePath
  );
}

async function uploadBrandingFile({
  request,
  response,
  fileType,
  successMessage,
  replacementMessage,
}) {
  if (!request.file) {
    return response
      .status(400)
      .json({
        success: false,

        message:
          "Select an image to upload.",
      });
  }

  const relativeFilePath =
    getRelativeUploadedPath(
      request
    );

  try {
    const validImage =
      await hasValidImageSignature({
        absoluteFilePath:
          request.file.path,

        mimeType:
          request.file.mimetype,
      });

    if (!validImage) {
      await safelyDeleteFile(
        relativeFilePath
      );

      return response
        .status(400)
        .json({
          success: false,

          message:
            "The uploaded file is not a valid PNG or JPEG image.",
        });
    }

    const result =
      await saveRecruiterCompanyBrandingFile({
        userId:
          request.auth.userId,

        fileType,

        originalFileName:
          request.file.originalname,

        storedFileName:
          request.file.filename,

        mimeType:
          request.file.mimetype,

        sizeBytes:
          request.file.size,

        filePath:
          relativeFilePath,
      });

    if (
      result.result ===
      "profile_missing"
    ) {
      await safelyDeleteFile(
        relativeFilePath
      );

      return response
        .status(409)
        .json({
          success: false,

          message:
            "Save the company profile before uploading branding images.",
        });
    }

    if (
      result.previousFilePath &&
      result.previousFilePath !==
        relativeFilePath
    ) {
      await safelyDeleteFile(
        result.previousFilePath
      );
    }

    return response
      .status(
        result.previousFilePath
          ? 200
          : 201
      )
      .json({
        success: true,

        message:
          result.previousFilePath
            ? replacementMessage
            : successMessage,

        profile:
          result.profile,
      });
  } catch (error) {
    console.error(
      "Upload company branding file error:",
      error
    );

    await safelyDeleteFile(
      relativeFilePath
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to save the company branding image.",
      });
  }
}

async function getBrandingFile({
  request,
  response,
  fileType,
  fallbackFileName,
}) {
  try {
    const brandingFile =
      await findRecruiterCompanyBrandingFile({
        userId:
          request.auth.userId,

        fileType,
      });

    if (!brandingFile) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Company profile was not found.",
        });
    }

    return sendBrandingFile({
      response,
      brandingFile,
      fallbackFileName,
    });
  } catch (error) {
    console.error(
      "Get company branding file error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve the company branding image.",
      });
  }
}

async function deleteBrandingFile({
  request,
  response,
  fileType,
  successMessage,
}) {
  try {
    const result =
      await clearRecruiterCompanyBrandingFile({
        userId:
          request.auth.userId,

        fileType,
      });

    if (
      result.result ===
      "profile_missing"
    ) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Company profile was not found.",
        });
    }

    if (
      result.result ===
      "no_file"
    ) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "No branding image is available to delete.",
        });
    }

    await safelyDeleteFile(
      result.previousFilePath
    );

    return response
      .status(200)
      .json({
        success: true,

        message:
          successMessage,

        profile:
          result.profile,
      });
  } catch (error) {
    console.error(
      "Delete company branding file error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to delete the company branding image.",
      });
  }
}

export async function getRecruiterCompanyProfile(
  request,
  response
) {
  try {
    const profile =
      await findRecruiterCompanyProfile(
        request.auth.userId
      );

    if (!profile) {
      return response
        .status(404)
        .json({
          success: false,

          message:
            "Recruiter account was not found.",
        });
    }

    return response
      .status(200)
      .json({
        success: true,
        profile,
      });
  } catch (error) {
    console.error(
      "Get Recruiter company profile error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to retrieve the company profile.",
      });
  }
}

export async function updateRecruiterCompanyProfile(
  request,
  response
) {
  try {
    const profileData =
      readCompanyProfileData(
        request.body
      );

    const validationError =
      validateCompanyProfile(
        profileData
      );

    if (
      validationError
    ) {
      return response
        .status(400)
        .json({
          success: false,

          message:
            validationError,
        });
    }

    const profile =
      await saveRecruiterCompanyProfile({
        userId:
          request.auth.userId,

        ...profileData,

        website:
          profileData.website ||
          null,

        linkedinUrl:
          profileData.linkedinUrl ||
          null,
      });

    return response
      .status(200)
      .json({
        success: true,

        message:
          "Company profile saved successfully.",

        profile,
      });
  } catch (error) {
    console.error(
      "Update Recruiter company profile error:",
      error
    );

    return response
      .status(500)
      .json({
        success: false,

        message:
          "Unable to save the company profile.",
      });
  }
}

export function uploadRecruiterCompanyLogo(
  request,
  response
) {
  return uploadBrandingFile({
    request,
    response,

    fileType:
      "logo",

    successMessage:
      "Company logo uploaded successfully.",

    replacementMessage:
      "Company logo replaced successfully.",
  });
}

export function getRecruiterCompanyLogoFile(
  request,
  response
) {
  return getBrandingFile({
    request,
    response,

    fileType:
      "logo",

    fallbackFileName:
      "company-logo.png",
  });
}

export function deleteRecruiterCompanyLogo(
  request,
  response
) {
  return deleteBrandingFile({
    request,
    response,

    fileType:
      "logo",

    successMessage:
      "Company logo deleted successfully.",
  });
}

export function uploadRecruiterAuthorizedSignature(
  request,
  response
) {
  return uploadBrandingFile({
    request,
    response,

    fileType:
      "signature",

    successMessage:
      "Authorized signature uploaded successfully.",

    replacementMessage:
      "Authorized signature replaced successfully.",
  });
}

export function getRecruiterAuthorizedSignatureFile(
  request,
  response
) {
  return getBrandingFile({
    request,
    response,

    fileType:
      "signature",

    fallbackFileName:
      "authorized-signature.png",
  });
}

export function deleteRecruiterAuthorizedSignature(
  request,
  response
) {
  return deleteBrandingFile({
    request,
    response,

    fileType:
      "signature",

    successMessage:
      "Authorized signature deleted successfully.",
  });
}