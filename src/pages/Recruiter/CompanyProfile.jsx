import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  Building2,
  CalendarDays,
  Camera,
  CheckCircle2,
  ExternalLink,
  FileImage,
  Globe,
  LoaderCircle,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
  Signature,
  Trash2,
  Upload,
  Users,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  deleteRecruiterAuthorizedSignatureRequest,
  deleteRecruiterCompanyLogoRequest,
  getRecruiterAuthorizedSignatureRequest,
  getRecruiterCompanyLogoRequest,
  getRecruiterCompanyProfileRequest,
  updateRecruiterCompanyProfileRequest,
  uploadRecruiterAuthorizedSignatureRequest,
  uploadRecruiterCompanyLogoRequest,
} from "../../services/recruiterService";

const MAX_BRANDING_FILE_SIZE =
  2 * 1024 * 1024;

const emptyBrandingFile = {
  available: false,
  originalFileName: "",
  mimeType: "",
  sizeBytes: 0,
};

const emptyCompany = {
  companyProfileId: null,
  companyName: "",
  industry: "",
  companySize: "",
  foundedYear: "",
  website: "",
  contactEmail: "",
  contactPhone: "",
  headquarters: "",
  linkedinUrl: "",
  recruiterName: "",
  recruiterDesignation: "",
  description: "",

  branding: {
    logo: {
      ...emptyBrandingFile,
    },

    signature: {
      ...emptyBrandingFile,
    },
  },

  exists: false,
};

const companySizeOptions = [
  "1 - 50 Employees",
  "51 - 200 Employees",
  "201 - 500 Employees",
  "501 - 1000 Employees",
  "1000+ Employees",
];

function normalizeProfile(
  profile = {}
) {
  return {
    ...emptyCompany,
    ...profile,

    branding: {
      logo: {
        ...emptyBrandingFile,
        ...profile.branding?.logo,
      },

      signature: {
        ...emptyBrandingFile,
        ...profile.branding
          ?.signature,
      },
    },
  };
}

function formatFileSize(
  sizeBytes
) {
  const size =
    Number(sizeBytes);

  if (
    !Number.isFinite(size) ||
    size <= 0
  ) {
    return "Size not available";
  }

  if (size < 1024) {
    return `${size} bytes`;
  }

  if (
    size <
    1024 * 1024
  ) {
    return `${(
      size / 1024
    ).toFixed(1)} KB`;
  }

  return `${(
    size /
    (1024 * 1024)
  ).toFixed(2)} MB`;
}

function validateBrandingFile(
  file
) {
  const extension =
    file.name
      .toLowerCase()
      .split(".")
      .pop();

  const validExtension =
    [
      "png",
      "jpg",
      "jpeg",
    ].includes(
      extension
    );

  const validMimeType =
    [
      "image/png",
      "image/jpeg",
    ].includes(
      file.type
    );

  if (
    !validExtension ||
    !validMimeType
  ) {
    return "Select a valid PNG, JPG or JPEG image.";
  }

  if (
    file.size >
    MAX_BRANDING_FILE_SIZE
  ) {
    return "The image cannot exceed 2 MB.";
  }

  return "";
}

function CompanyProfile() {
  const navigate =
    useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const successTimer =
    useRef(null);

  const logoInputRef =
    useRef(null);

  const signatureInputRef =
    useRef(null);

  const logoUrlRef =
    useRef("");

  const signatureUrlRef =
    useRef("");

  const [
    company,
    setCompany,
  ] = useState(
    emptyCompany
  );

  const [
    savedCompany,
    setSavedCompany,
  ] = useState(
    emptyCompany
  );

  const [
    logoPreviewUrl,
    setLogoPreviewUrl,
  ] = useState("");

  const [
    signaturePreviewUrl,
    setSignaturePreviewUrl,
  ] = useState("");

  const [
    isEditing,
    setIsEditing,
  ] = useState(false);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    isLogoWorking,
    setIsLogoWorking,
  ] = useState(false);

  const [
    isSignatureWorking,
    setIsSignatureWorking,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const isBusy =
    isSaving ||
    isLogoWorking ||
    isSignatureWorking;

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (
          error.status === 401
        ) {
          logout();

          navigate(
            "/login",
            {
              replace: true,
            }
          );

          return true;
        }

        return false;
      },
      [
        logout,
        navigate,
      ]
    );

  const replacePreviewUrl =
    useCallback(
      (
        fileType,
        newUrl
      ) => {
        const isLogo =
          fileType ===
          "logo";

        const urlReference =
          isLogo
            ? logoUrlRef
            : signatureUrlRef;

        if (
          urlReference.current
        ) {
          URL.revokeObjectURL(
            urlReference.current
          );
        }

        urlReference.current =
          newUrl || "";

        if (isLogo) {
          setLogoPreviewUrl(
            newUrl || ""
          );
        } else {
          setSignaturePreviewUrl(
            newUrl || ""
          );
        }
      },
      []
    );

  const showSuccess =
    useCallback(
      (message) => {
        setSuccessMessage(
          message
        );

        if (
          successTimer.current
        ) {
          window.clearTimeout(
            successTimer.current
          );
        }

        successTimer.current =
          window.setTimeout(
            () => {
              setSuccessMessage(
                ""
              );
            },
            4000
          );
      },
      []
    );

  const loadBrandingPreview =
    useCallback(
      async (
        fileType,
        available
      ) => {
        if (
          !token ||
          !available
        ) {
          replacePreviewUrl(
            fileType,
            ""
          );

          return;
        }

        const response =
          fileType === "logo"
            ? await getRecruiterCompanyLogoRequest({
                token,
              })
            : await getRecruiterAuthorizedSignatureRequest({
                token,
              });

        const objectUrl =
          URL.createObjectURL(
            response.blob
          );

        replacePreviewUrl(
          fileType,
          objectUrl
        );
      },
      [
        token,
        replacePreviewUrl,
      ]
    );

  const loadCompanyProfile =
    useCallback(
      async () => {
        if (!token) {
          setIsLoading(
            false
          );

          return;
        }

        setIsLoading(true);
        setErrorMessage("");

        try {
          const response =
            await getRecruiterCompanyProfileRequest({
              token,
            });

          const loadedProfile =
            normalizeProfile(
              response.profile
            );

          setCompany(
            loadedProfile
          );

          setSavedCompany(
            loadedProfile
          );

          setIsEditing(
            !loadedProfile.exists
          );

          const previewResults =
            await Promise.allSettled([
              loadBrandingPreview(
                "logo",
                loadedProfile
                  .branding
                  .logo
                  .available
              ),

              loadBrandingPreview(
                "signature",
                loadedProfile
                  .branding
                  .signature
                  .available
              ),
            ]);

          const failedPreview =
            previewResults.find(
              (result) =>
                result.status ===
                "rejected"
            );

          if (
            failedPreview &&
            !handleAuthenticationError(
              failedPreview.reason
            )
          ) {
            setErrorMessage(
              "The company profile loaded, but one branding image could not be displayed."
            );
          }
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }

          setErrorMessage(
            error.message ||
              "Unable to load the company profile."
          );
        } finally {
          setIsLoading(
            false
          );
        }
      },
      [
        token,
        handleAuthenticationError,
        loadBrandingPreview,
      ]
    );

  useEffect(() => {
    loadCompanyProfile();
  }, [
    loadCompanyProfile,
  ]);

  useEffect(() => {
    return () => {
      if (
        successTimer.current
      ) {
        window.clearTimeout(
          successTimer.current
        );
      }

      if (
        logoUrlRef.current
      ) {
        URL.revokeObjectURL(
          logoUrlRef.current
        );
      }

      if (
        signatureUrlRef.current
      ) {
        URL.revokeObjectURL(
          signatureUrlRef.current
        );
      }
    };
  }, []);

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setCompany(
      (
        previousCompany
      ) => ({
        ...previousCompany,
        [name]: value,
      })
    );

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm =
    () => {
      if (
        !company.companyName
          .trim()
      ) {
        return "Company name is required.";
      }

      if (
        !company.industry
          .trim()
      ) {
        return "Industry is required.";
      }

      if (
        !company.companySize
      ) {
        return "Select the company size.";
      }

      if (
        company.foundedYear &&
        (
          Number(
            company.foundedYear
          ) < 1800 ||
          Number(
            company.foundedYear
          ) >
            new Date()
              .getFullYear()
        )
      ) {
        return "Enter a valid founded year.";
      }

      if (
        !company.contactEmail
          .trim()
      ) {
        return "Company contact email is required.";
      }

      if (
        !company.contactPhone
          .trim()
      ) {
        return "Company contact phone is required.";
      }

      if (
        !company.headquarters
          .trim()
      ) {
        return "Company headquarters is required.";
      }

      if (
        !company.recruiterName
          .trim()
      ) {
        return "Recruiter or HR name is required.";
      }

      if (
        !company
          .recruiterDesignation
          .trim()
      ) {
        return "Recruiter designation is required.";
      }

      if (
        company.description
          .trim()
          .length < 20
      ) {
        return "Company description must contain at least 20 characters.";
      }

      return "";
    };

  const handleSave =
    async (
      event
    ) => {
      event.preventDefault();

      if (!isEditing) {
        setIsEditing(true);

        return;
      }

      const validationError =
        validateForm();

      if (
        validationError
      ) {
        setErrorMessage(
          validationError
        );

        return;
      }

      setIsSaving(true);
      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await updateRecruiterCompanyProfileRequest({
            token,

            profile: {
              companyName:
                company
                  .companyName
                  .trim(),

              industry:
                company
                  .industry
                  .trim(),

              companySize:
                company
                  .companySize,

              foundedYear:
                company
                  .foundedYear,

              website:
                company
                  .website
                  .trim(),

              contactEmail:
                company
                  .contactEmail
                  .trim(),

              contactPhone:
                company
                  .contactPhone
                  .trim(),

              headquarters:
                company
                  .headquarters
                  .trim(),

              linkedinUrl:
                company
                  .linkedinUrl
                  .trim(),

              recruiterName:
                company
                  .recruiterName
                  .trim(),

              recruiterDesignation:
                company
                  .recruiterDesignation
                  .trim(),

              description:
                company
                  .description
                  .trim(),
            },
          });

        const updatedProfile =
          normalizeProfile(
            response.profile
          );

        setCompany(
          updatedProfile
        );

        setSavedCompany(
          updatedProfile
        );

        setIsEditing(false);

        showSuccess(
          response.message ||
            "Company profile saved successfully."
        );
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to save the company profile."
        );
      } finally {
        setIsSaving(false);
      }
    };

  const updateBrandingState =
    (
      updatedProfile
    ) => {
      const normalizedProfile =
        normalizeProfile(
          updatedProfile
        );

      setCompany(
        (
          previousCompany
        ) => ({
          ...previousCompany,

          companyProfileId:
            normalizedProfile
              .companyProfileId,

          exists:
            normalizedProfile
              .exists,

          branding:
            normalizedProfile
              .branding,
        })
      );

      setSavedCompany(
        (
          previousCompany
        ) => ({
          ...previousCompany,

          companyProfileId:
            normalizedProfile
              .companyProfileId,

          exists:
            normalizedProfile
              .exists,

          branding:
            normalizedProfile
              .branding,
        })
      );
    };

  const handleBrandingUpload =
    async (
      fileType,
      event
    ) => {
      const file =
        event.target
          .files?.[0];

      event.target.value =
        "";

      if (!file) {
        return;
      }

      if (!company.exists) {
        setErrorMessage(
          "Save the company profile before uploading branding images."
        );

        return;
      }

      const validationError =
        validateBrandingFile(
          file
        );

      if (
        validationError
      ) {
        setErrorMessage(
          validationError
        );

        return;
      }

      const isLogo =
        fileType === "logo";

      if (isLogo) {
        setIsLogoWorking(
          true
        );
      } else {
        setIsSignatureWorking(
          true
        );
      }

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          isLogo
            ? await uploadRecruiterCompanyLogoRequest({
                token,
                file,
              })
            : await uploadRecruiterAuthorizedSignatureRequest({
                token,
                file,
              });

        updateBrandingState(
          response.profile
        );

        await loadBrandingPreview(
          fileType,
          true
        );

        showSuccess(
          response.message ||
            (
              isLogo
                ? "Company logo uploaded successfully."
                : "Authorized signature uploaded successfully."
            )
        );
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to upload the branding image."
        );
      } finally {
        if (isLogo) {
          setIsLogoWorking(
            false
          );
        } else {
          setIsSignatureWorking(
            false
          );
        }
      }
    };

  const handleBrandingDelete =
    async (
      fileType
    ) => {
      const isLogo =
        fileType === "logo";

      const confirmed =
        window.confirm(
          isLogo
            ? "Delete the company logo?"
            : "Delete the authorized signature?"
        );

      if (!confirmed) {
        return;
      }

      if (isLogo) {
        setIsLogoWorking(
          true
        );
      } else {
        setIsSignatureWorking(
          true
        );
      }

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          isLogo
            ? await deleteRecruiterCompanyLogoRequest({
                token,
              })
            : await deleteRecruiterAuthorizedSignatureRequest({
                token,
              });

        updateBrandingState(
          response.profile
        );

        replacePreviewUrl(
          fileType,
          ""
        );

        showSuccess(
          response.message ||
            (
              isLogo
                ? "Company logo deleted successfully."
                : "Authorized signature deleted successfully."
            )
        );
      } catch (error) {
        if (
          handleAuthenticationError(
            error
          )
        ) {
          return;
        }

        setErrorMessage(
          error.message ||
            "Unable to delete the branding image."
        );
      } finally {
        if (isLogo) {
          setIsLogoWorking(
            false
          );
        } else {
          setIsSignatureWorking(
            false
          );
        }
      }
    };

  const handleCancel =
    () => {
      setCompany(
        savedCompany
      );

      setIsEditing(false);
      setErrorMessage("");
    };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={38}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading company profile
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving recruiter and
          company information.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={
        handleSave
      }
      className="space-y-8"
    >
      <input
        ref={
          logoInputRef
        }
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        onChange={(
          event
        ) =>
          handleBrandingUpload(
            "logo",
            event
          )
        }
        className="hidden"
      />

      <input
        ref={
          signatureInputRef
        }
        type="file"
        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
        onChange={(
          event
        ) =>
          handleBrandingUpload(
            "signature",
            event
          )
        }
        className="hidden"
      />

      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
        >
          <CheckCircle2
            size={20}
          />

          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700"
        >
          <AlertCircle
            size={20}
            className="mt-0.5 shrink-0"
          />

          <div className="flex-1">
            <p>
              {errorMessage}
            </p>

            <button
              type="button"
              onClick={() =>
                setErrorMessage(
                  ""
                )
              }
              className="mt-2 text-sm underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600" />

        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-visible rounded-3xl border-4 border-white bg-neutral-900 text-white shadow-lg">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[20px]">
                  {logoPreviewUrl ? (
                    <img
                      src={
                        logoPreviewUrl
                      }
                      alt="Company logo"
                      className="h-full w-full bg-white object-contain p-2"
                    />
                  ) : (
                    <Building2
                      size={54}
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    logoInputRef
                      .current
                      ?.click()
                  }
                  disabled={
                    !company.exists ||
                    isBusy
                  }
                  title={
                    company.exists
                      ? "Upload or replace company logo"
                      : "Save the company profile first"
                  }
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-500 disabled:opacity-70"
                  aria-label="Upload company logo"
                >
                  {isLogoWorking ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Camera
                      size={18}
                    />
                  )}
                </button>
              </div>

              <div className="pb-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                  Company Profile
                </p>

                <h1 className="mt-2 text-3xl font-bold text-neutral-900">
                  {company.companyName ||
                    "Your Company"}
                </h1>

                <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-600">
                  <span className="inline-flex items-center gap-2">
                    <Building2
                      size={16}
                    />

                    {company.industry ||
                      "Industry"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <MapPin
                      size={16}
                    />

                    {company.headquarters ||
                      "Headquarters"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Users
                      size={16}
                    />

                    {company.companySize ||
                      "Company size"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {isEditing &&
                company.exists && (
                  <button
                    type="button"
                    onClick={
                      handleCancel
                    }
                    disabled={
                      isBusy
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
                  >
                    <X
                      size={18}
                    />

                    Cancel
                  </button>
                )}

              <button
                type="submit"
                disabled={
                  isBusy
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : isEditing ? (
                  <Save
                    size={18}
                  />
                ) : (
                  <Pencil
                    size={18}
                  />
                )}

                {isSaving
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Company Branding
          </h2>

          <p className="mt-2 text-neutral-600">
            Upload the company logo and
            authorized signature used
            in generated offer letters.
            PNG, JPG and JPEG images up
            to 2 MB are supported.
          </p>
        </div>

        {!company.exists && (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 font-semibold text-amber-700">
            Complete and save the
            company profile before
            uploading branding images.
          </div>
        )}

        <div className="mt-7 grid gap-6 lg:grid-cols-2">
          <BrandingAssetCard
            icon={FileImage}
            title="Company Logo"
            description="Displayed in the generated offer-letter header."
            previewUrl={
              logoPreviewUrl
            }
            altText="Company logo"
            file={
              company.branding
                .logo
            }
            isWorking={
              isLogoWorking
            }
            disabled={
              !company.exists ||
              isBusy
            }
            onChoose={() =>
              logoInputRef
                .current
                ?.click()
            }
            onDelete={() =>
              handleBrandingDelete(
                "logo"
              )
            }
          />

          <BrandingAssetCard
            icon={Signature}
            title="Authorized Signature"
            description="Displayed above the Recruiter or HR authorization details."
            previewUrl={
              signaturePreviewUrl
            }
            altText="Authorized signature"
            file={
              company.branding
                .signature
            }
            isWorking={
              isSignatureWorking
            }
            disabled={
              !company.exists ||
              isBusy
            }
            onChoose={() =>
              signatureInputRef
                .current
                ?.click()
            }
            onDelete={() =>
              handleBrandingDelete(
                "signature"
              )
            }
          />
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Company Information
            </h2>

            <p className="mt-2 text-neutral-600">
              Manage the information
              visible to students and
              applicants.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="companyName"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Company Name
              </label>

              <input
                id="companyName"
                type="text"
                name="companyName"
                value={
                  company.companyName
                }
                onChange={
                  handleChange
                }
                disabled={
                  !isEditing ||
                  isBusy
                }
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="industry"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Industry
              </label>

              <input
                id="industry"
                type="text"
                name="industry"
                value={
                  company.industry
                }
                onChange={
                  handleChange
                }
                disabled={
                  !isEditing ||
                  isBusy
                }
                placeholder="Example: Information Technology"
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label
                htmlFor="companySize"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Company Size
              </label>

              <select
                id="companySize"
                name="companySize"
                value={
                  company.companySize
                }
                onChange={
                  handleChange
                }
                disabled={
                  !isEditing ||
                  isBusy
                }
                className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  Select company size
                </option>

                {companySizeOptions.map(
                  (size) => (
                    <option
                      key={size}
                      value={size}
                    >
                      {size}
                    </option>
                  )
                )}
              </select>
            </div>

            <div>
              <label
                htmlFor="foundedYear"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Founded Year
              </label>

              <div className="relative">
                <CalendarDays
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  id="foundedYear"
                  type="number"
                  name="foundedYear"
                  min="1800"
                  max={
                    new Date()
                      .getFullYear()
                  }
                  value={
                    company.foundedYear
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing ||
                    isBusy
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="companyDescription"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Company Description
              </label>

              <textarea
                id="companyDescription"
                name="description"
                value={
                  company.description
                }
                onChange={
                  handleChange
                }
                disabled={
                  !isEditing ||
                  isBusy
                }
                rows={7}
                maxLength={3000}
                placeholder="Describe your company, products, services and workplace."
                className="w-full resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 leading-7 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <p className="mt-2 text-right text-xs text-neutral-500">
                {
                  company.description
                    .length
                }
                /3000
              </p>
            </div>
          </div>
        </section>

        <div className="space-y-8">
          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">
              Contact Details
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="companyWebsite"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Website
                </label>

                <div className="relative">
                  <Globe
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="companyWebsite"
                    type="url"
                    name="website"
                    value={
                      company.website
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      !isEditing ||
                      isBusy
                    }
                    placeholder="https://company.com"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactEmail"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Contact Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="contactEmail"
                    type="email"
                    name="contactEmail"
                    value={
                      company.contactEmail
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      !isEditing ||
                      isBusy
                    }
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contactPhone"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Contact Phone
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="contactPhone"
                    type="text"
                    name="contactPhone"
                    value={
                      company.contactPhone
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      !isEditing ||
                      isBusy
                    }
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="headquarters"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Headquarters
                </label>

                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="headquarters"
                    type="text"
                    name="headquarters"
                    value={
                      company.headquarters
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      !isEditing ||
                      isBusy
                    }
                    placeholder="Bengaluru, Karnataka, India"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="linkedinUrl"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  LinkedIn URL
                </label>

                <div className="relative">
                  <ExternalLink
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />

                  <input
                    id="linkedinUrl"
                    type="url"
                    name="linkedinUrl"
                    value={
                      company.linkedinUrl
                    }
                    onChange={
                      handleChange
                    }
                    disabled={
                      !isEditing ||
                      isBusy
                    }
                    placeholder="https://linkedin.com/company/example"
                    className="w-full rounded-xl border border-neutral-300 bg-white py-3 pl-11 pr-4 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-neutral-900">
              Recruiter Contact
            </h2>

            <div className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="recruiterName"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Recruiter or HR Name
                </label>

                <input
                  id="recruiterName"
                  type="text"
                  name="recruiterName"
                  value={
                    company.recruiterName
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing ||
                    isBusy
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label
                  htmlFor="recruiterDesignation"
                  className="mb-2 block text-sm font-semibold text-neutral-700"
                >
                  Designation
                </label>

                <input
                  id="recruiterDesignation"
                  type="text"
                  name="recruiterDesignation"
                  value={
                    company
                      .recruiterDesignation
                  }
                  onChange={
                    handleChange
                  }
                  disabled={
                    !isEditing ||
                    isBusy
                  }
                  placeholder="Talent Acquisition Manager"
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-600 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}

function BrandingAssetCard({
  icon: Icon,
  title,
  description,
  previewUrl,
  altText,
  file,
  isWorking,
  disabled,
  onChoose,
  onDelete,
}) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
          <Icon
            size={22}
          />
        </div>

        <div>
          <h3 className="font-bold text-neutral-900">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-6 text-neutral-600">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-dashed border-neutral-300 bg-white p-4">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={altText}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-center text-neutral-400">
            <Icon
              size={42}
              className="mx-auto"
            />

            <p className="mt-3 text-sm font-semibold">
              No image uploaded
            </p>
          </div>
        )}
      </div>

      {file?.available && (
        <div className="mt-4 rounded-xl border border-neutral-200 bg-white px-4 py-3">
          <p className="truncate font-semibold text-neutral-900">
            {file.originalFileName ||
              "Branding image"}
          </p>

          <p className="mt-1 text-xs text-neutral-500">
            {formatFileSize(
              file.sizeBytes
            )}
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={
            onChoose
          }
          disabled={
            disabled
          }
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isWorking ? (
            <LoaderCircle
              size={17}
              className="animate-spin"
            />
          ) : (
            <Upload
              size={17}
            />
          )}

          {file?.available
            ? "Replace Image"
            : "Upload Image"}
        </button>

        {file?.available && (
          <button
            type="button"
            onClick={
              onDelete
            }
            disabled={
              disabled
            }
            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2
              size={17}
            />

            Delete
          </button>
        )}
      </div>
    </article>
  );
}

export default CompanyProfile;