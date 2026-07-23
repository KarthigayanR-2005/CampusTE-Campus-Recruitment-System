function hasValue(value) {
    if (
      value === null ||
      value === undefined
    ) {
      return false;
    }
  
    return String(value).trim() !== "";
  }
  
  function getSectionStatus(percentage) {
    if (percentage === 100) {
      return "completed";
    }
  
    if (percentage > 0) {
      return "in_progress";
    }
  
    return "not_started";
  }
  
  function createFieldSection({
    key,
    label,
    values,
  }) {
    const completedItems =
      values.filter(hasValue).length;
  
    const totalItems = values.length;
  
    const percentage =
      totalItems === 0
        ? 0
        : Math.round(
            (completedItems /
              totalItems) *
              100
          );
  
    return {
      key,
      label,
      percentage,
      completedItems,
      totalItems,
      status:
        getSectionStatus(percentage),
    };
  }
  
  function createCollectionSection({
    key,
    label,
    count,
  }) {
    const recordCount =
      Number(count) || 0;
  
    const percentage =
      recordCount > 0 ? 100 : 0;
  
    return {
      key,
      label,
      percentage,
      completedItems:
        recordCount > 0 ? 1 : 0,
      totalItems: 1,
      recordCount,
      status:
        getSectionStatus(percentage),
    };
  }
  
  export function calculateStudentProfileCompletion(
    completionData
  ) {
    const sections = [
      createFieldSection({
        key: "personalInfo",
        label: "Personal Information",
  
        values: [
          completionData.fullName,
          completionData.email,
          completionData.phone,
          completionData.dateOfBirth,
          completionData.gender,
          completionData.city,
          completionData.state,
          completionData.country,
          completionData.profileSummary,
        ],
      }),
  
      createFieldSection({
        key: "education",
        label: "Education",
  
        values: [
          completionData.rollNumber,
          completionData.institution,
          completionData.degree,
          completionData.department,
          completionData.yearOfStudy,
          completionData.cgpa,
          completionData.graduationYear,
        ],
      }),
  
      createFieldSection({
        key: "socialLinks",
        label: "Social Links",
  
        values: [
          completionData.linkedinUrl,
          completionData.githubUrl,
          completionData.portfolioUrl,
        ],
      }),
  
      createCollectionSection({
        key: "skills",
        label: "Skills",
        count: completionData.skillCount,
      }),
  
      createCollectionSection({
        key: "projects",
        label: "Projects",
        count: completionData.projectCount,
      }),
  
      createCollectionSection({
        key: "experience",
        label: "Experience",
        count:
          completionData.experienceCount,
      }),
  
      createCollectionSection({
        key: "certifications",
        label: "Certifications",
        count:
          completionData.certificationCount,
      }),
  
      createCollectionSection({
        key: "resume",
        label: "Resume",
        count: completionData.resumeCount,
      }),
    ];
  
    const percentage = Math.round(
      sections.reduce(
        (total, section) =>
          total + section.percentage,
        0
      ) / sections.length
    );
  
    const completedSections =
      sections.filter(
        (section) =>
          section.status === "completed"
      ).length;
  
    return {
      percentage,
      completedSections,
      totalSections: sections.length,
      sections,
      calculatedAt:
        new Date().toISOString(),
    };
  }