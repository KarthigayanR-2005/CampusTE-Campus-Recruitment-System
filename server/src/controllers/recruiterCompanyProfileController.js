import {
    findRecruiterCompanyProfile,
    saveRecruiterCompanyProfile,
  } from "../models/recruiterCompanyProfileModel.js";
  
  const allowedCompanySizes = [
    "1 - 50 Employees",
    "51 - 200 Employees",
    "201 - 500 Employees",
    "501 - 1000 Employees",
    "1000+ Employees",
  ];
  
  function readText(value) {
    return typeof value === "string"
      ? value.trim()
      : "";
  }
  
  function readFoundedYear(value) {
    const textValue = readText(value);
  
    if (!textValue) {
      return null;
    }
  
    const foundedYear =
      Number(textValue);
  
    if (
      !Number.isInteger(foundedYear)
    ) {
      return Number.NaN;
    }
  
    return foundedYear;
  }
  
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      value
    );
  }
  
  function isValidPhone(value) {
    return /^[+0-9()\-\s]{7,30}$/.test(
      value
    );
  }
  
  function isValidUrl(value) {
    if (!value) {
      return true;
    }
  
    try {
      const url = new URL(value);
  
      return (
        url.protocol === "http:" ||
        url.protocol === "https:"
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
        readText(body.companyName),
  
      industry:
        readText(body.industry),
  
      companySize:
        readText(body.companySize),
  
      foundedYear:
        readFoundedYear(
          body.foundedYear
        ),
  
      website:
        readText(body.website),
  
      contactEmail:
        readText(
          body.contactEmail
        ).toLowerCase(),
  
      contactPhone:
        readText(body.contactPhone),
  
      headquarters:
        readText(body.headquarters),
  
      linkedinUrl:
        readText(body.linkedinUrl),
  
      recruiterName:
        readText(body.recruiterName),
  
      recruiterDesignation:
        readText(
          body.recruiterDesignation
        ),
  
      description:
        readText(body.description),
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
  
    if (industry.length > 120) {
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
      Number.isNaN(foundedYear)
    ) {
      return "Founded year must be a valid number.";
    }
  
    const currentYear =
      new Date().getFullYear();
  
    if (
      foundedYear !== null &&
      (
        foundedYear < 1800 ||
        foundedYear > currentYear
      )
    ) {
      return `Founded year must be between 1800 and ${currentYear}.`;
    }
  
    if (!isValidUrl(website)) {
      return "Website must begin with http:// or https://.";
    }
  
    if (website.length > 255) {
      return "Website URL cannot exceed 255 characters.";
    }
  
    if (!contactEmail) {
      return "Company contact email is required.";
    }
  
    if (
      !isValidEmail(contactEmail)
    ) {
      return "Enter a valid company contact email.";
    }
  
    if (!contactPhone) {
      return "Company contact phone is required.";
    }
  
    if (
      !isValidPhone(contactPhone)
    ) {
      return "Enter a valid company contact phone number.";
    }
  
    if (!headquarters) {
      return "Company headquarters is required.";
    }
  
    if (
      headquarters.length > 180
    ) {
      return "Headquarters cannot exceed 180 characters.";
    }
  
    if (
      !isValidUrl(linkedinUrl)
    ) {
      return "LinkedIn URL must begin with http:// or https://.";
    }
  
    if (
      linkedinUrl.length > 255
    ) {
      return "LinkedIn URL cannot exceed 255 characters.";
    }
  
    if (!recruiterName) {
      return "Recruiter or HR name is required.";
    }
  
    if (
      recruiterName.length > 150
    ) {
      return "Recruiter name cannot exceed 150 characters.";
    }
  
    if (!recruiterDesignation) {
      return "Recruiter designation is required.";
    }
  
    if (
      recruiterDesignation.length > 150
    ) {
      return "Recruiter designation cannot exceed 150 characters.";
    }
  
    if (!description) {
      return "Company description is required.";
    }
  
    if (description.length < 20) {
      return "Company description must contain at least 20 characters.";
    }
  
    if (description.length > 3000) {
      return "Company description cannot exceed 3000 characters.";
    }
  
    return "";
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
        return response.status(404).json({
          success: false,
          message:
            "Recruiter account was not found.",
        });
      }
  
      return response.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      console.error(
        "Get recruiter company profile error:",
        error
      );
  
      return response.status(500).json({
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
  
      if (validationError) {
        return response.status(400).json({
          success: false,
          message: validationError,
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
  
      return response.status(200).json({
        success: true,
        message:
          "Company profile saved successfully.",
        profile,
      });
    } catch (error) {
      console.error(
        "Update recruiter company profile error:",
        error
      );
  
      return response.status(500).json({
        success: false,
        message:
          "Unable to save the company profile.",
      });
    }
  }