import {
    createStudentCertification,
    deleteStudentCertification,
    findDuplicateCertification,
    findStudentCertificationById,
    findStudentCertifications,
    updateStudentCertification,
  } from "../models/studentCertificationModel.js";
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readCertificationId(value) {
    const certificationId =
      Number(value);
  
    if (
      !Number.isInteger(
        certificationId
      ) ||
      certificationId <= 0
    ) {
      return null;
    }
  
    return certificationId;
  }
  
  function readBoolean(value) {
    if (typeof value === "boolean") {
      return value;
    }
  
    return (
      value === 1 ||
      value === "1" ||
      value === "true"
    );
  }
  
  function isValidDate(value) {
    if (
      !value ||
      !/^\d{4}-\d{2}-\d{2}$/.test(
        value
      )
    ) {
      return false;
    }
  
    const date = new Date(
      `${value}T00:00:00Z`
    );
  
    if (
      Number.isNaN(date.getTime())
    ) {
      return false;
    }
  
    return (
      date.toISOString().slice(0, 10) ===
      value
    );
  }
  
  function isValidUrl(value) {
    if (!value) {
      return true;
    }
  
    try {
      const parsedUrl =
        new URL(value);
  
      return (
        parsedUrl.protocol === "http:" ||
        parsedUrl.protocol === "https:"
      );
    } catch {
      return false;
    }
  }
  
  function readCertificationData(
    body = {}
  ) {
    const doesNotExpire =
      readBoolean(
        body.doesNotExpire
      );
  
    return {
      title:
        readText(body.title),
  
      issuer:
        readText(body.issuer),
  
      credentialId:
        readText(body.credentialId),
  
      credentialUrl:
        readText(body.credentialUrl),
  
      issueDate:
        readText(body.issueDate),
  
      expiryDate:
        doesNotExpire
          ? ""
          : readText(
              body.expiryDate
            ),
  
      doesNotExpire,
  
      description:
        readText(body.description),
    };
  }
  
  function validateCertification({
    title,
    issuer,
    credentialId,
    credentialUrl,
    issueDate,
    expiryDate,
    doesNotExpire,
    description,
  }) {
    if (!title) {
      return "Certification name is required.";
    }
  
    if (title.length < 2) {
      return "Certification name must contain at least 2 characters.";
    }
  
    if (title.length > 150) {
      return "Certification name cannot exceed 150 characters.";
    }
  
    if (!issuer) {
      return "Issuing organization is required.";
    }
  
    if (issuer.length < 2) {
      return "Issuing organization must contain at least 2 characters.";
    }
  
    if (issuer.length > 150) {
      return "Issuing organization cannot exceed 150 characters.";
    }
  
    if (
      credentialId.length > 120
    ) {
      return "Credential ID cannot exceed 120 characters.";
    }
  
    if (
      credentialUrl.length > 255
    ) {
      return "Credential URL cannot exceed 255 characters.";
    }
  
    if (
      !isValidUrl(credentialUrl)
    ) {
      return "Credential URL must begin with http:// or https://.";
    }
  
    if (!issueDate) {
      return "Issue date is required.";
    }
  
    if (!isValidDate(issueDate)) {
      return "Enter a valid issue date.";
    }
  
    if (!doesNotExpire) {
      if (!expiryDate) {
        return "Enter an expiry date or select Does Not Expire.";
      }
  
      if (
        !isValidDate(expiryDate)
      ) {
        return "Enter a valid expiry date.";
      }
  
      if (
        expiryDate < issueDate
      ) {
        return "Expiry date cannot be before the issue date.";
      }
    }
  
    if (
      description.length > 2000
    ) {
      return "Description cannot exceed 2000 characters.";
    }
  
    return "";
  }
  
  export async function getStudentCertifications(
    request,
    response
  ) {
    try {
      const certifications =
        await findStudentCertifications(
          request.auth.userId
        );
  
      return response.status(200).json({
        success: true,
        count:
          certifications.length,
        certifications,
      });
    } catch (error) {
      console.error(
        "Get student certifications error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to retrieve your certifications.",
      });
    }
  }
  
  export async function addStudentCertification(
    request,
    response
  ) {
    try {
      const certificationData =
        readCertificationData(
          request.body
        );
  
      const validationError =
        validateCertification(
          certificationData
        );
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateCertification =
        await findDuplicateCertification({
          userId:
            request.auth.userId,
  
          title:
            certificationData.title,
  
          issuer:
            certificationData.issuer,
        });
  
      if (duplicateCertification) {
        return response.status(409).json({
          success: false,
          message:
            "You already have this certification from the same organization.",
        });
      }
  
      const certification =
        await createStudentCertification({
          userId:
            request.auth.userId,
  
          ...certificationData,
  
          credentialId:
            certificationData
              .credentialId || null,
  
          credentialUrl:
            certificationData
              .credentialUrl || null,
  
          expiryDate:
            certificationData
              .doesNotExpire
              ? null
              : certificationData
                  .expiryDate,
  
          description:
            certificationData
              .description || null,
        });
  
      return response.status(201).json({
        success: true,
        message:
          "Certification added successfully.",
        certification,
      });
    } catch (error) {
      console.error(
        "Add student certification error:",
        error
      );
  
      if (
        error.code ===
          "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have this certification from the same organization.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to add the certification.",
      });
    }
  }
  
  export async function editStudentCertification(
    request,
    response
  ) {
    try {
      const certificationId =
        readCertificationId(
          request.params
            .certificationId
        );
  
      if (!certificationId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid certification ID is required.",
        });
      }
  
      const existingCertification =
        await findStudentCertificationById({
          userId:
            request.auth.userId,
  
          certificationId,
        });
  
      if (!existingCertification) {
        return response.status(404).json({
          success: false,
          message:
            "The requested certification was not found.",
        });
      }
  
      const certificationData =
        readCertificationData(
          request.body
        );
  
      const validationError =
        validateCertification(
          certificationData
        );
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
        });
      }
  
      const duplicateCertification =
        await findDuplicateCertification({
          userId:
            request.auth.userId,
  
          title:
            certificationData.title,
  
          issuer:
            certificationData.issuer,
  
          excludeCertificationId:
            certificationId,
        });
  
      if (duplicateCertification) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another matching certification.",
        });
      }
  
      const certification =
        await updateStudentCertification({
          userId:
            request.auth.userId,
  
          certificationId,
  
          ...certificationData,
  
          credentialId:
            certificationData
              .credentialId || null,
  
          credentialUrl:
            certificationData
              .credentialUrl || null,
  
          expiryDate:
            certificationData
              .doesNotExpire
              ? null
              : certificationData
                  .expiryDate,
  
          description:
            certificationData
              .description || null,
        });
  
      if (!certification) {
        return response.status(404).json({
          success: false,
          message:
            "The requested certification was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Certification updated successfully.",
        certification,
      });
    } catch (error) {
      console.error(
        "Edit student certification error:",
        error
      );
  
      if (
        error.code ===
          "ER_DUP_ENTRY" ||
        error.errno === 1062
      ) {
        return response.status(409).json({
          success: false,
          message:
            "You already have another matching certification.",
        });
      }
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to update the certification.",
      });
    }
  }
  
  export async function removeStudentCertification(
    request,
    response
  ) {
    try {
      const certificationId =
        readCertificationId(
          request.params
            .certificationId
        );
  
      if (!certificationId) {
        return response.status(400).json({
          success: false,
          message:
            "A valid certification ID is required.",
        });
      }
  
      const affectedRows =
        await deleteStudentCertification({
          userId:
            request.auth.userId,
  
          certificationId,
        });
  
      if (affectedRows === 0) {
        return response.status(404).json({
          success: false,
          message:
            "The requested certification was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        message:
          "Certification deleted successfully.",
      });
    } catch (error) {
      console.error(
        "Delete student certification error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to delete the certification.",
      });
    }
  }