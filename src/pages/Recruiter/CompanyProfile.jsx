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
  Globe,
  LoaderCircle,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Save,
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
  getRecruiterCompanyProfileRequest,
  updateRecruiterCompanyProfileRequest,
} from "../../services/recruiterService";

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
  exists: false,
};

const companySizeOptions = [
  "1 - 50 Employees",
  "51 - 200 Employees",
  "201 - 500 Employees",
  "501 - 1000 Employees",
  "1000+ Employees",
];

function CompanyProfile() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const successTimer =
    useRef(null);

  const [
    company,
    setCompany,
  ] = useState(emptyCompany);

  const [
    savedCompany,
    setSavedCompany,
  ] = useState(emptyCompany);

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
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (error.status === 401) {
          logout();

          navigate("/login", {
            replace: true,
          });

          return true;
        }

        return false;
      },
      [logout, navigate]
    );

  const loadCompanyProfile =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterCompanyProfileRequest({
            token,
          });

        const loadedProfile = {
          ...emptyCompany,
          ...response.profile,
        };

        setCompany(loadedProfile);
        setSavedCompany(
          loadedProfile
        );

        setIsEditing(
          !loadedProfile.exists
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
            "Unable to load the company profile."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadCompanyProfile();
  }, [loadCompanyProfile]);

  useEffect(() => {
    return () => {
      if (successTimer.current) {
        window.clearTimeout(
          successTimer.current
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
      (previousCompany) => ({
        ...previousCompany,
        [name]: value,
      })
    );

    setErrorMessage("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    if (
      !company.companyName.trim()
    ) {
      return "Company name is required.";
    }

    if (!company.industry.trim()) {
      return "Industry is required.";
    }

    if (!company.companySize) {
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
          new Date().getFullYear()
      )
    ) {
      return "Enter a valid founded year.";
    }

    if (
      !company.contactEmail.trim()
    ) {
      return "Company contact email is required.";
    }

    if (
      !company.contactPhone.trim()
    ) {
      return "Company contact phone is required.";
    }

    if (
      !company.headquarters.trim()
    ) {
      return "Company headquarters is required.";
    }

    if (
      !company.recruiterName.trim()
    ) {
      return "Recruiter or HR name is required.";
    }

    if (
      !company.recruiterDesignation.trim()
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

  const handleSave = async (
    event
  ) => {
    event.preventDefault();

    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const validationError =
      validateForm();

    if (validationError) {
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
              company.companyName.trim(),

            industry:
              company.industry.trim(),

            companySize:
              company.companySize,

            foundedYear:
              company.foundedYear,

            website:
              company.website.trim(),

            contactEmail:
              company.contactEmail.trim(),

            contactPhone:
              company.contactPhone.trim(),

            headquarters:
              company.headquarters.trim(),

            linkedinUrl:
              company.linkedinUrl.trim(),

            recruiterName:
              company.recruiterName.trim(),

            recruiterDesignation:
              company.recruiterDesignation.trim(),

            description:
              company.description.trim(),
          },
        });

      const updatedProfile = {
        ...emptyCompany,
        ...response.profile,
      };

      setCompany(
        updatedProfile
      );

      setSavedCompany(
        updatedProfile
      );

      setIsEditing(false);

      setSuccessMessage(
        response.message ||
          "Company profile saved successfully."
      );

      if (successTimer.current) {
        window.clearTimeout(
          successTimer.current
        );
      }

      successTimer.current =
        window.setTimeout(() => {
          setSuccessMessage("");
        }, 4000);
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

  const handleCancel = () => {
    setCompany(savedCompany);
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
      onSubmit={handleSave}
      className="space-y-8"
    >
      {successMessage && (
        <div
          role="status"
          className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
        >
          <CheckCircle2 size={20} />
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

          <div>
            <p>{errorMessage}</p>

            <button
              type="button"
              onClick={
                loadCompanyProfile
              }
              className="mt-2 text-sm underline"
            >
              Reload profile
            </button>
          </div>
        </div>
      )}

      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-purple-600" />

        <div className="px-6 pb-8 sm:px-8">
          <div className="-mt-16 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-3xl border-4 border-white bg-neutral-900 text-white shadow-lg">
                <Building2 size={54} />

                <button
                  type="button"
                  disabled
                  title="Company logo upload will be added later"
                  className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-full bg-neutral-500 text-white opacity-70 shadow-md"
                  aria-label="Company logo upload coming soon"
                >
                  <Camera size={18} />
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
                    <MapPin size={16} />

                    {company.headquarters ||
                      "Headquarters"}
                  </span>

                  <span className="inline-flex items-center gap-2">
                    <Users size={16} />

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
                    disabled={isSaving}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
                  >
                    <X size={18} />
                    Cancel
                  </button>
                )}

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : isEditing ? (
                  <Save size={18} />
                ) : (
                  <Pencil size={18} />
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
                onChange={handleChange}
                disabled={
                  !isEditing ||
                  isSaving
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
                value={company.industry}
                onChange={handleChange}
                disabled={
                  !isEditing ||
                  isSaving
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
                onChange={handleChange}
                disabled={
                  !isEditing ||
                  isSaving
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
                    isSaving
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
                onChange={handleChange}
                disabled={
                  !isEditing ||
                  isSaving
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
                      isSaving
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
                      isSaving
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
                      isSaving
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
                      isSaving
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
                      isSaving
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
                  onChange={handleChange}
                  disabled={
                    !isEditing ||
                    isSaving
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
                    company.recruiterDesignation
                  }
                  onChange={handleChange}
                  disabled={
                    !isEditing ||
                    isSaving
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

export default CompanyProfile;