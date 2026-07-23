import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  FileText,
  GraduationCap,
  IndianRupee,
  LoaderCircle,
  MapPin,
  Plus,
  Save,
  Send,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  createRecruiterJobRequest,
  getRecruiterJobRequest,
  updateRecruiterJobRequest,
  updateRecruiterJobStatusRequest,
} from "../../services/recruiterService";

const branches = [
  "Computer Science and Engineering",
  "Information Technology",
  "Electronics and Communication Engineering",
  "Electrical and Electronics Engineering",
  "Artificial Intelligence and Data Science",
  "Mechanical Engineering",
  "Civil Engineering",
];

function createInitialForm() {
  return {
    jobTitle: "",
    department: "",
    employmentType: "Full-time",
    experience: "Fresher",
    salaryMin: "",
    salaryMax: "",
    city: "",
    country: "India",
    workMode: "On-site",
    openings: "1",
    applicationDeadline: "",
    minimumCgpa: "6.5",
    jobDescription: "",
    responsibilities: "",
    requirements: "",
  };
}

function PostJob() {
  const navigate = useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const {
    token,
    logout,
  } = useAuth();

  const editJobId =
    searchParams.get("edit");

  const isEditMode =
    Boolean(editJobId);

  const graduationYearOptions =
    useMemo(() => {
      const currentYear =
        new Date().getFullYear();

      return Array.from(
        {
          length: 5,
        },
        (_, index) =>
          currentYear + index
      );
    }, []);

  const [
    formData,
    setFormData,
  ] = useState(
    createInitialForm
  );

  const [
    requiredSkills,
    setRequiredSkills,
  ] = useState([]);

  const [
    preferredSkills,
    setPreferredSkills,
  ] = useState([]);

  const [
    requiredSkillInput,
    setRequiredSkillInput,
  ] = useState("");

  const [
    preferredSkillInput,
    setPreferredSkillInput,
  ] = useState("");

  const [
    eligibleBranches,
    setEligibleBranches,
  ] = useState([]);

  const [
    eligibleGraduationYears,
    setEligibleGraduationYears,
  ] = useState([]);

  const [
    jobStatus,
    setJobStatus,
  ] = useState("draft");

  const [
    isLoading,
    setIsLoading,
  ] = useState(isEditMode);

  const [
    isSaving,
    setIsSaving,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    statusMessage,
    setStatusMessage,
  ] = useState("");

  const [
    isPreviewOpen,
    setIsPreviewOpen,
  ] = useState(false);

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

  const loadJob =
    useCallback(async () => {
      if (!isEditMode) {
        setIsLoading(false);
        return;
      }

      const numericJobId =
        Number(editJobId);

      if (
        !Number.isInteger(
          numericJobId
        ) ||
        numericJobId <= 0
      ) {
        setErrorMessage(
          "The job ID is invalid."
        );

        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterJobRequest({
            token,
            jobId: editJobId,
          });

        const job =
          response.job;

        setFormData({
          jobTitle:
            job.jobTitle || "",

          department:
            job.department || "",

          employmentType:
            job.employmentType ||
            "Full-time",

          experience:
            job.experience ||
            "Fresher",

          salaryMin:
            job.salaryMin || "",

          salaryMax:
            job.salaryMax || "",

          city:
            job.city || "",

          country:
            job.country || "India",

          workMode:
            job.workMode ||
            "On-site",

          openings:
            job.openings || "1",

          applicationDeadline:
            job.applicationDeadline ||
            "",

          minimumCgpa:
            job.minimumCgpa ||
            "6.5",

          jobDescription:
            job.jobDescription || "",

          responsibilities:
            job.responsibilities ||
            "",

          requirements:
            job.requirements || "",
        });

        setRequiredSkills(
          Array.isArray(
            job.requiredSkills
          )
            ? job.requiredSkills
            : []
        );

        setPreferredSkills(
          Array.isArray(
            job.preferredSkills
          )
            ? job.preferredSkills
            : []
        );

        setEligibleBranches(
          Array.isArray(
            job.eligibleBranches
          )
            ? job.eligibleBranches
            : []
        );

        setEligibleGraduationYears(
          Array.isArray(
            job.eligibleGraduationYears
          )
            ? job
                .eligibleGraduationYears
                .map(Number)
            : []
        );

        setJobStatus(
          job.status || "draft"
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
            "Unable to load the job."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      editJobId,
      handleAuthenticationError,
      isEditMode,
      token,
    ]);

  useEffect(() => {
    loadJob();
  }, [loadJob]);

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previousData) => ({
        ...previousData,
        [name]: value,
      })
    );

    setErrorMessage("");
    setStatusMessage("");
  };

  const addSkill = (type) => {
    const inputValue =
      type === "required"
        ? requiredSkillInput
        : preferredSkillInput;

    const cleanedSkill =
      inputValue.trim();

    if (!cleanedSkill) {
      return;
    }

    const skills =
      type === "required"
        ? requiredSkills
        : preferredSkills;

    const alreadyExists =
      skills.some(
        (skill) =>
          skill.toLowerCase() ===
          cleanedSkill.toLowerCase()
      );

    if (!alreadyExists) {
      if (type === "required") {
        setRequiredSkills(
          (previousSkills) => [
            ...previousSkills,
            cleanedSkill,
          ]
        );
      } else {
        setPreferredSkills(
          (previousSkills) => [
            ...previousSkills,
            cleanedSkill,
          ]
        );
      }
    }

    if (type === "required") {
      setRequiredSkillInput("");
    } else {
      setPreferredSkillInput("");
    }
  };

  const removeSkill = (
    skillToRemove,
    type
  ) => {
    if (type === "required") {
      setRequiredSkills(
        (previousSkills) =>
          previousSkills.filter(
            (skill) =>
              skill !==
              skillToRemove
          )
      );

      return;
    }

    setPreferredSkills(
      (previousSkills) =>
        previousSkills.filter(
          (skill) =>
            skill !==
            skillToRemove
        )
    );
  };

  const handleSkillKeyDown = (
    event,
    type
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addSkill(type);
    }
  };

  const toggleBranch = (
    branch
  ) => {
    setEligibleBranches(
      (previousBranches) =>
        previousBranches.includes(
          branch
        )
          ? previousBranches.filter(
              (existingBranch) =>
                existingBranch !==
                branch
            )
          : [
              ...previousBranches,
              branch,
            ]
    );
  };

  const toggleGraduationYear = (
    year
  ) => {
    setEligibleGraduationYears(
      (previousYears) =>
        previousYears.includes(year)
          ? previousYears.filter(
              (existingYear) =>
                existingYear !== year
            )
          : [
              ...previousYears,
              year,
            ]
    );
  };

  const validateJob = (
    publishing
  ) => {
    if (
      formData.jobTitle
        .trim()
        .length < 3
    ) {
      return "Job title must contain at least 3 characters.";
    }

    const openings =
      Number(formData.openings);

    if (
      !Number.isInteger(openings) ||
      openings < 1
    ) {
      return "Number of openings must be at least 1.";
    }

    const minimumCgpa =
      Number(
        formData.minimumCgpa
      );

    if (
      !Number.isFinite(
        minimumCgpa
      ) ||
      minimumCgpa < 0 ||
      minimumCgpa > 10
    ) {
      return "Minimum CGPA must be between 0 and 10.";
    }

    const salaryMin =
      formData.salaryMin === ""
        ? null
        : Number(
            formData.salaryMin
          );

    const salaryMax =
      formData.salaryMax === ""
        ? null
        : Number(
            formData.salaryMax
          );

    if (
      salaryMin !== null &&
      (
        !Number.isFinite(
          salaryMin
        ) ||
        salaryMin < 0
      )
    ) {
      return "Minimum salary must be a valid positive number.";
    }

    if (
      salaryMax !== null &&
      (
        !Number.isFinite(
          salaryMax
        ) ||
        salaryMax < 0
      )
    ) {
      return "Maximum salary must be a valid positive number.";
    }

    if (
      salaryMin !== null &&
      salaryMax !== null &&
      salaryMax < salaryMin
    ) {
      return "Maximum salary cannot be lower than minimum salary.";
    }

    if (!publishing) {
      return "";
    }

    if (
      !formData.department.trim()
    ) {
      return "Department is required before publishing.";
    }

    if (
      formData.workMode !==
        "Remote" &&
      !formData.city.trim()
    ) {
      return "City is required for on-site and hybrid jobs.";
    }

    if (
      !formData.country.trim()
    ) {
      return "Country is required before publishing.";
    }

    if (
      !formData.applicationDeadline
    ) {
      return "Application deadline is required before publishing.";
    }

    const today =
      new Date()
        .toISOString()
        .slice(0, 10);

    if (
      formData.applicationDeadline <
      today
    ) {
      return "Application deadline cannot be in the past.";
    }

    if (
      requiredSkills.length === 0
    ) {
      return "Add at least one required skill before publishing.";
    }

    if (
      eligibleBranches.length === 0
    ) {
      return "Select at least one eligible branch before publishing.";
    }

    if (
      eligibleGraduationYears
        .length === 0
    ) {
      return "Select at least one eligible graduation year before publishing.";
    }

    if (
      formData.jobDescription
        .trim()
        .length < 30
    ) {
      return "Job description must contain at least 30 characters before publishing.";
    }

    return "";
  };

  const buildJobPayload = (
    status
  ) => ({
    ...formData,

    jobTitle:
      formData.jobTitle.trim(),

    department:
      formData.department.trim(),

    city:
      formData.city.trim(),

    country:
      formData.country.trim(),

    jobDescription:
      formData.jobDescription.trim(),

    responsibilities:
      formData.responsibilities.trim(),

    requirements:
      formData.requirements.trim(),

    requiredSkills,
    preferredSkills,
    eligibleBranches,
    eligibleGraduationYears,
    status,
  });

  const saveJob = async ({
    publish,
  }) => {
    const validationError =
      validateJob(publish);

    if (validationError) {
      setErrorMessage(
        validationError
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    setIsSaving(true);
    setErrorMessage("");
    setStatusMessage("");

    try {
      if (!isEditMode) {
        const response =
          await createRecruiterJobRequest({
            token,

            job: buildJobPayload(
              publish
                ? "active"
                : "draft"
            ),
          });

        if (publish) {
          navigate(
            "/recruiter/manage-jobs",
            {
              replace: true,
            }
          );

          return;
        }

        setStatusMessage(
          response.message
        );

        setJobStatus("draft");

        navigate(
          `/recruiter/post-job?edit=${response.job.jobId}`,
          {
            replace: true,
          }
        );

        return;
      }

      const updateResponse =
        await updateRecruiterJobRequest({
          token,
          jobId: editJobId,
          job: buildJobPayload(
            jobStatus
          ),
        });

      let finalJob =
        updateResponse.job;

      let finalMessage =
        updateResponse.message;

      if (
        publish &&
        jobStatus === "draft"
      ) {
        const statusResponse =
          await updateRecruiterJobStatusRequest({
            token,
            jobId: editJobId,
            status: "active",
          });

        finalJob =
          statusResponse.job;

        finalMessage =
          statusResponse.message;
      }

      setJobStatus(
        finalJob.status
      );

      setStatusMessage(
        finalMessage
      );

      if (publish) {
        navigate(
          "/recruiter/manage-jobs",
          {
            replace: true,
          }
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
          "Unable to save the job."
      );

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = (
    event
  ) => {
    event.preventDefault();

    const shouldPublish =
      !isEditMode ||
      jobStatus === "draft";

    saveJob({
      publish:
        shouldPublish,
    });
  };

  const handleSaveDraft = () => {
    saveJob({
      publish: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading job details
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving the job from
          MySQL.
        </p>
      </div>
    );
  }

  const primaryButtonText =
    !isEditMode
      ? "Publish Job"
      : jobStatus === "draft"
        ? "Update and Publish"
        : "Save Changes";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {errorMessage && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700"
          >
            <AlertCircle
              size={20}
              className="mt-0.5 shrink-0"
            />

            <span>
              {errorMessage}
            </span>
          </div>
        )}

        {statusMessage && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
          >
            <CheckCircle2
              size={20}
              className="mt-0.5 shrink-0"
            />

            <span>
              {statusMessage}
            </span>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <BriefcaseBusiness
                      size={25}
                    />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                    Recruitment
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  {isEditMode
                    ? "Edit Job Opening"
                    : "Create a New Job Opening"}
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  Add complete job
                  details and define
                  student eligibility.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={
                    handleSaveDraft
                  }
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white hover:bg-white/20 disabled:opacity-50"
                >
                  {isSaving ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Save size={18} />
                  )}

                  {isEditMode
                    ? "Save Changes"
                    : "Save Draft"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setIsPreviewOpen(
                      true
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 font-semibold text-blue-700 hover:bg-blue-50"
                >
                  <Eye size={18} />
                  Preview
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.45fr_0.75fr]">
          <div className="space-y-8">
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                  <BriefcaseBusiness
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Basic Job Details
                  </h2>

                  <p className="mt-1 text-sm text-neutral-600">
                    Enter the primary
                    information shown to
                    students.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label
                    htmlFor="jobTitle"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Job Title
                  </label>

                  <input
                    id="jobTitle"
                    type="text"
                    name="jobTitle"
                    value={
                      formData.jobTitle
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    placeholder="Software Development Engineer"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Department
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      id="department"
                      type="text"
                      name="department"
                      value={
                        formData.department
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        isSaving
                      }
                      placeholder="Engineering"
                      className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="employmentType"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Employment Type
                  </label>

                  <select
                    id="employmentType"
                    name="employmentType"
                    value={
                      formData.employmentType
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>
                      Full-time
                    </option>
                    <option>
                      Part-time
                    </option>
                    <option>
                      Internship
                    </option>
                    <option>
                      Contract
                    </option>
                    <option>
                      Graduate Trainee
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Experience Level
                  </label>

                  <select
                    id="experience"
                    name="experience"
                    value={
                      formData.experience
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  >
                    <option>
                      Fresher
                    </option>
                    <option>
                      0 - 1 Year
                    </option>
                    <option>
                      1 - 2 Years
                    </option>
                    <option>
                      2 - 4 Years
                    </option>
                    <option>
                      4+ Years
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="openings"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Number of Openings
                  </label>

                  <div className="relative">
                    <Users
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      id="openings"
                      type="number"
                      name="openings"
                      value={
                        formData.openings
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        isSaving
                      }
                      min="1"
                      className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <IndianRupee
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Compensation and
                    Location
                  </h2>
                </div>
              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="salaryMin"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Minimum Annual Salary
                  </label>

                  <input
                    id="salaryMin"
                    type="number"
                    name="salaryMin"
                    value={
                      formData.salaryMin
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    min="0"
                    placeholder="500000"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="salaryMax"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Maximum Annual Salary
                  </label>

                  <input
                    id="salaryMax"
                    type="number"
                    name="salaryMax"
                    value={
                      formData.salaryMax
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    min="0"
                    placeholder="900000"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    City
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                    />

                    <input
                      id="city"
                      type="text"
                      name="city"
                      value={
                        formData.city
                      }
                      onChange={
                        handleChange
                      }
                      disabled={
                        isSaving
                      }
                      placeholder="Bengaluru"
                      className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Country
                  </label>

                  <input
                    id="country"
                    type="text"
                    name="country"
                    value={
                      formData.country
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="mb-3 block text-sm font-semibold text-neutral-700">
                    Work Mode
                  </label>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      "On-site",
                      "Hybrid",
                      "Remote",
                    ].map(
                      (mode) => (
                        <button
                          key={mode}
                          type="button"
                          disabled={
                            isSaving
                          }
                          onClick={() =>
                            setFormData(
                              (
                                previousData
                              ) => ({
                                ...previousData,
                                workMode:
                                  mode,
                              })
                            )
                          }
                          className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                            formData.workMode ===
                            mode
                              ? "border-blue-600 bg-blue-50 text-blue-700"
                              : "border-neutral-300 text-neutral-700"
                          }`}
                        >
                          {mode}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
                  <Sparkles
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Skills
                  </h2>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Required Skills
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={
                        requiredSkillInput
                      }
                      onChange={(
                        event
                      ) =>
                        setRequiredSkillInput(
                          event.target
                            .value
                        )
                      }
                      onKeyDown={(
                        event
                      ) =>
                        handleSkillKeyDown(
                          event,
                          "required"
                        )
                      }
                      disabled={
                        isSaving
                      }
                      placeholder="Enter a skill"
                      className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        addSkill(
                          "required"
                        )
                      }
                      className="rounded-xl bg-blue-600 px-4 text-white"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {requiredSkills.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                        >
                          {skill}

                          <button
                            type="button"
                            onClick={() =>
                              removeSkill(
                                skill,
                                "required"
                              )
                            }
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Preferred Skills
                  </label>

                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={
                        preferredSkillInput
                      }
                      onChange={(
                        event
                      ) =>
                        setPreferredSkillInput(
                          event.target
                            .value
                        )
                      }
                      onKeyDown={(
                        event
                      ) =>
                        handleSkillKeyDown(
                          event,
                          "preferred"
                        )
                      }
                      disabled={
                        isSaving
                      }
                      placeholder="Optional skill"
                      className="min-w-0 flex-1 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        addSkill(
                          "preferred"
                        )
                      }
                      className="rounded-xl border border-neutral-300 px-4 text-neutral-700"
                    >
                      <Plus size={20} />
                    </button>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {preferredSkills.map(
                      (skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700"
                        >
                          {skill}

                          <button
                            type="button"
                            onClick={() =>
                              removeSkill(
                                skill,
                                "preferred"
                              )
                            }
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <FileText size={22} />
                </div>

                <h2 className="text-2xl font-bold text-neutral-900">
                  Job Description
                </h2>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="jobDescription"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Role Overview
                  </label>

                  <textarea
                    id="jobDescription"
                    name="jobDescription"
                    value={
                      formData.jobDescription
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="responsibilities"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Key Responsibilities
                  </label>

                  <textarea
                    id="responsibilities"
                    name="responsibilities"
                    value={
                      formData.responsibilities
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="requirements"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Candidate Requirements
                  </label>

                  <textarea
                    id="requirements"
                    name="requirements"
                    value={
                      formData.requirements
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    rows={6}
                    maxLength={5000}
                    className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
                  <GraduationCap
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Eligibility
                  </h2>
                </div>
              </div>

              <div className="mt-7 space-y-6">
                <div>
                  <label
                    htmlFor="minimumCgpa"
                    className="mb-2 block text-sm font-semibold text-neutral-700"
                  >
                    Minimum CGPA
                  </label>

                  <input
                    id="minimumCgpa"
                    type="number"
                    name="minimumCgpa"
                    value={
                      formData.minimumCgpa
                    }
                    onChange={
                      handleChange
                    }
                    disabled={isSaving}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-neutral-700">
                    Eligible Branches
                  </label>

                  <div className="space-y-3">
                    {branches.map(
                      (branch) => (
                        <label
                          key={branch}
                          className="flex cursor-pointer items-start gap-3 rounded-xl border border-neutral-200 p-3"
                        >
                          <input
                            type="checkbox"
                            checked={eligibleBranches.includes(
                              branch
                            )}
                            onChange={() =>
                              toggleBranch(
                                branch
                              )
                            }
                            disabled={
                              isSaving
                            }
                            className="mt-1 h-4 w-4 accent-blue-600"
                          />

                          <span className="text-sm font-medium text-neutral-700">
                            {branch}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-3 block text-sm font-semibold text-neutral-700">
                    Eligible Graduation
                    Years
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {graduationYearOptions.map(
                      (year) => (
                        <label
                          key={year}
                          className="flex cursor-pointer items-center gap-3 rounded-xl border border-neutral-200 p-3"
                        >
                          <input
                            type="checkbox"
                            checked={eligibleGraduationYears.includes(
                              year
                            )}
                            onChange={() =>
                              toggleGraduationYear(
                                year
                              )
                            }
                            disabled={
                              isSaving
                            }
                            className="h-4 w-4 accent-blue-600"
                          />

                          <span className="text-sm font-semibold text-neutral-700">
                            {year}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                  <CalendarDays
                    size={22}
                  />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Application Deadline
                  </h2>
                </div>
              </div>

              <input
                type="date"
                name="applicationDeadline"
                value={
                  formData.applicationDeadline
                }
                onChange={
                  handleChange
                }
                disabled={isSaving}
                min={new Date()
                  .toISOString()
                  .slice(0, 10)}
                className="mt-7 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </section>

            <section className="sticky top-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-lg">
              <h2 className="text-xl font-bold text-neutral-900">
                Ready to Save?
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-600">
                Drafts remain private.
                Published jobs become
                available to students in
                a later stage.
              </p>

              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSaving ? (
                    <LoaderCircle
                      size={18}
                      className="animate-spin"
                    />
                  ) : (
                    <Send size={18} />
                  )}

                  {primaryButtonText}
                </button>

                <button
                  type="button"
                  onClick={
                    handleSaveDraft
                  }
                  disabled={isSaving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 disabled:opacity-60"
                >
                  <Save size={18} />

                  {isEditMode
                    ? "Save Without Publishing"
                    : "Save as Draft"}
                </button>
              </div>
            </section>
          </div>
        </div>
      </form>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                  Job Preview
                </p>

                <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                  {formData.jobTitle ||
                    "Untitled Job"}
                </h2>

                <p className="mt-2 text-neutral-600">
                  {formData.department ||
                    "Department not entered"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setIsPreviewOpen(
                    false
                  )
                }
                className="rounded-xl border border-neutral-300 p-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-7 grid gap-4 rounded-2xl bg-neutral-50 p-5 sm:grid-cols-2">
              <p>
                <strong>
                  Employment:
                </strong>{" "}
                {
                  formData.employmentType
                }
              </p>

              <p>
                <strong>
                  Work mode:
                </strong>{" "}
                {formData.workMode}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {formData.city ||
                  "Not provided"}
                , {formData.country}
              </p>

              <p>
                <strong>
                  Openings:
                </strong>{" "}
                {formData.openings}
              </p>

              <p>
                <strong>
                  Minimum CGPA:
                </strong>{" "}
                {formData.minimumCgpa}
              </p>

              <p>
                <strong>
                  Deadline:
                </strong>{" "}
                {formData.applicationDeadline ||
                  "Not selected"}
              </p>
            </div>

            <div className="mt-7">
              <h3 className="font-bold text-neutral-900">
                Required Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {requiredSkills.length >
                0 ? (
                  requiredSkills.map(
                    (skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p className="text-neutral-500">
                    No required skills
                    added.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-bold text-neutral-900">
                Job Description
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
                {formData.jobDescription ||
                  "No job description entered."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostJob;