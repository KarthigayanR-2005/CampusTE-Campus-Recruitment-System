import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FileText,
  GraduationCap,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Search,
  Sparkles,
  UserCheck,
  Users,
  UserX,
  Video,
  X,
  XCircle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getRecruiterApplicantRequest,
  getRecruiterApplicantResumeRequest,
  getRecruiterApplicantsRequest,
  updateRecruiterApplicantStatusRequest,
} from "../../services/recruiterService";

const statusStyles = {
  applied:
    "border-blue-200 bg-blue-50 text-blue-700",

  under_review:
    "border-amber-200 bg-amber-50 text-amber-700",

  shortlisted:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  interview:
    "border-purple-200 bg-purple-50 text-purple-700",

  selected:
    "border-green-200 bg-green-50 text-green-700",

  rejected:
    "border-rose-200 bg-rose-50 text-rose-700",

  withdrawn:
    "border-neutral-200 bg-neutral-100 text-neutral-600",
};

const statusLabels = {
  applied: "Applied",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  interview: "Interview",
  selected: "Selected",
  rejected: "Rejected",
  withdrawn: "Withdrawn",
};

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function createInitialInterviewForm() {
  return {
    date: "",
    time: "",
    mode: "Google Meet",
    interviewer: "",
    details: "",
  };
}

function Applicants() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    applicants,
    setApplicants,
  ] = useState([]);

  const [
    jobOptions,
    setJobOptions,
  ] = useState([]);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    jobFilter,
    setJobFilter,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("");

  const [
    selectedApplicant,
    setSelectedApplicant,
  ] = useState(null);

  const [
    interviewApplicant,
    setInterviewApplicant,
  ] = useState(null);

  const [
    interviewForm,
    setInterviewForm,
  ] = useState(
    createInitialInterviewForm
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    activeActionId,
    setActiveActionId,
  ] = useState(null);

  const [
    isResumeLoading,
    setIsResumeLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    successMessage,
    setSuccessMessage,
  ] = useState("");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const applicantsPerPage = 5;

  const handleAuthenticationError =
    useCallback(
      (error) => {
        if (error.status === 401) {
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

  const loadApplicants =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterApplicantsRequest({
            token,
          });

        setApplicants(
          Array.isArray(
            response.applicants
          )
            ? response.applicants
            : []
        );

        setJobOptions(
          Array.isArray(
            response.jobOptions
          )
            ? response.jobOptions
            : []
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
            "Unable to retrieve applicants."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadApplicants();
  }, [loadApplicants]);

  const filteredApplicants =
    useMemo(() => {
      const query =
        normalizeText(
          searchTerm
        );

      return applicants.filter(
        (applicant) => {
          const searchableText =
            normalizeText(
              [
                applicant.student
                  ?.fullName,

                applicant.student
                  ?.email,

                applicant.student
                  ?.institution,

                applicant.student
                  ?.department,

                applicant.job
                  ?.jobTitle,

                ...(
                  applicant.student
                    ?.skills || []
                ),
              ].join(" ")
            );

          const matchesSearch =
            !query ||
            searchableText.includes(
              query
            );

          const matchesJob =
            !jobFilter ||
            String(
              applicant.jobId
            ) ===
              String(jobFilter);

          const matchesStatus =
            !statusFilter ||
            applicant.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesJob &&
            matchesStatus
          );
        }
      );
    }, [
      applicants,
      searchTerm,
      jobFilter,
      statusFilter,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredApplicants.length /
          applicantsPerPage
      )
    );

  useEffect(() => {
    setCurrentPage(
      (previousPage) =>
        Math.min(
          previousPage,
          totalPages
        )
    );
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    jobFilter,
    statusFilter,
  ]);

  const startIndex =
    (currentPage - 1) *
    applicantsPerPage;

  const paginatedApplicants =
    filteredApplicants.slice(
      startIndex,
      startIndex +
        applicantsPerPage
    );

  const statistics = {
    total:
      applicants.length,

    shortlisted:
      applicants.filter(
        (applicant) =>
          applicant.status ===
          "shortlisted"
      ).length,

    interviews:
      applicants.filter(
        (applicant) =>
          applicant.status ===
          "interview"
      ).length,

    selected:
      applicants.filter(
        (applicant) =>
          applicant.status ===
          "selected"
      ).length,

    rejected:
      applicants.filter(
        (applicant) =>
          applicant.status ===
          "rejected"
      ).length,
  };

  const strongMatches =
    applicants.filter(
      (applicant) =>
        Number(
          applicant.match
            ?.matchScore || 0
        ) >= 80
    ).length;

  const replaceApplicant = (
    updatedApplicant
  ) => {
    setApplicants(
      (previousApplicants) =>
        previousApplicants.map(
          (applicant) =>
            applicant.applicationId ===
            updatedApplicant.applicationId
              ? updatedApplicant
              : applicant
        )
    );

    setSelectedApplicant(
      (previousApplicant) =>
        previousApplicant
          ?.applicationId ===
        updatedApplicant.applicationId
          ? updatedApplicant
          : previousApplicant
    );
  };

  const handleViewApplicant =
    async (applicant) => {
      setSelectedApplicant(
        applicant
      );

      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterApplicantRequest({
            token,

            applicationId:
              applicant.applicationId,
          });

        setSelectedApplicant(
          response.applicant
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
            "Unable to retrieve applicant details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

  const handleStatusChange =
    async (
      applicant,
      status,
      note = ""
    ) => {
      if (
        status === "rejected"
      ) {
        const confirmed =
          window.confirm(
            `Reject ${applicant.student.fullName}'s application?`
          );

        if (!confirmed) {
          return;
        }
      }

      setActiveActionId(
        applicant.applicationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await updateRecruiterApplicantStatusRequest({
            token,

            applicationId:
              applicant.applicationId,

            status,
            note,
          });

        replaceApplicant(
          response.applicant
        );

        setSuccessMessage(
          response.message
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
            "Unable to update applicant status."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const openInterviewForm = (
    applicant
  ) => {
    setInterviewApplicant(
      applicant
    );

    setSelectedApplicant(null);

    setInterviewForm(
      createInitialInterviewForm()
    );
  };

  const handleScheduleInterview =
    async (event) => {
      event.preventDefault();

      if (
        !interviewApplicant
      ) {
        return;
      }

      setActiveActionId(
        interviewApplicant
          .applicationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await updateRecruiterApplicantStatusRequest({
            token,

            applicationId:
              interviewApplicant
                .applicationId,

            status: "interview",

            note:
              "Interview scheduled by the Recruiter.",

            interviewDate:
              interviewForm.date,

            interviewTime:
              interviewForm.time,

            interviewMode:
              interviewForm.mode,

            interviewer:
              interviewForm
                .interviewer,

            interviewDetails:
              interviewForm.details,
          });

        replaceApplicant(
          response.applicant
        );

        setSuccessMessage(
          response.message
        );

        setInterviewApplicant(
          null
        );

        setInterviewForm(
          createInitialInterviewForm()
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
            "Unable to schedule the interview."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const handleResume = async (
    applicant,
    download
  ) => {
    setIsResumeLoading(true);
    setErrorMessage("");

    let previewWindow = null;

    if (!download) {
      previewWindow =
        window.open(
          "",
          "_blank"
        );
    }

    try {
      const {
        blob,
        fileName,
      } =
        await getRecruiterApplicantResumeRequest({
          token,

          applicationId:
            applicant.applicationId,

          download,
        });

      const objectUrl =
        URL.createObjectURL(blob);

      if (download) {
        const anchor =
          document.createElement(
            "a"
          );

        anchor.href =
          objectUrl;

        anchor.download =
          fileName;

        document.body.appendChild(
          anchor
        );

        anchor.click();
        anchor.remove();
      } else if (
        previewWindow
      ) {
        previewWindow.location.href =
          objectUrl;
      } else {
        window.open(
          objectUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }

      window.setTimeout(
        () => {
          URL.revokeObjectURL(
            objectUrl
          );
        },
        60000
      );
    } catch (error) {
      if (previewWindow) {
        previewWindow.close();
      }

      if (
        handleAuthenticationError(
          error
        )
      ) {
        return;
      }

      setErrorMessage(
        error.message ||
          "Unable to retrieve the resume."
      );
    } finally {
      setIsResumeLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={42}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading applicants
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving applications from
          MySQL.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
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
                  setErrorMessage("")
                }
                className="mt-2 text-sm underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                    <Users size={25} />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                    Applicant Tracking
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Manage Applicants
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  Review applications,
                  access resumes and
                  manage recruitment
                  status.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                <div className="flex items-center gap-3">
                  <Sparkles
                    size={22}
                    className="text-yellow-300"
                  />

                  <div>
                    <p className="text-sm text-blue-100">
                      Strong profile
                      matches
                    </p>

                    <p className="mt-1 text-2xl font-bold">
                      {strongMatches}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label:
                "Total Applicants",

              value:
                statistics.total,

              icon: Users,

              style:
                "bg-blue-100 text-blue-700",
            },

            {
              label: "Shortlisted",

              value:
                statistics.shortlisted,

              icon: UserCheck,

              style:
                "bg-emerald-100 text-emerald-700",
            },

            {
              label: "Interviews",

              value:
                statistics.interviews,

              icon: CalendarDays,

              style:
                "bg-purple-100 text-purple-700",
            },

            {
              label: "Selected",

              value:
                statistics.selected,

              icon: CheckCircle2,

              style:
                "bg-green-100 text-green-700",
            },

            {
              label: "Rejected",

              value:
                statistics.rejected,

              icon: UserX,

              style:
                "bg-rose-100 text-rose-700",
            },
          ].map((stat) => {
            const Icon =
              stat.icon;

            return (
              <article
                key={stat.label}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.style}`}
                >
                  <Icon size={22} />
                </div>

                <p className="mt-5 text-3xl font-bold text-neutral-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm font-medium text-neutral-600">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Candidate
                Applications
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Only applicants for
                your company jobs are
                displayed.
              </p>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_260px_220px]">
              <div className="relative">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search name, email, institution, job or skill"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <select
                value={jobFilter}
                onChange={(event) =>
                  setJobFilter(
                    event.target.value
                  )
                }
                className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  All Jobs
                </option>

                {jobOptions.map(
                  (job) => (
                    <option
                      key={job.jobId}
                      value={job.jobId}
                    >
                      {job.jobTitle}
                    </option>
                  )
                )}
              </select>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
                className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">
                  All Statuses
                </option>

                {Object.entries(
                  statusLabels
                ).map(
                  ([
                    value,
                    label,
                  ]) => (
                    <option
                      key={value}
                      value={value}
                    >
                      {label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {paginatedApplicants.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1200px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Candidate
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Applied Role
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Academic
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Skills
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Match
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase text-neutral-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {paginatedApplicants.map(
                    (applicant) => (
                      <tr
                        key={
                          applicant.applicationId
                        }
                        className="border-b border-neutral-100 hover:bg-neutral-50"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                              {applicant.student
                                .fullName
                                .split(" ")
                                .map(
                                  (part) =>
                                    part[0]
                                )
                                .join("")
                                .slice(
                                  0,
                                  2
                                )}
                            </div>

                            <div>
                              <p className="font-bold text-neutral-900">
                                {
                                  applicant
                                    .student
                                    .fullName
                                }
                              </p>

                              <p className="mt-1 text-sm text-neutral-500">
                                {
                                  applicant
                                    .student
                                    .email
                                }
                              </p>

                              <p className="mt-1 text-xs text-neutral-400">
                                Applied{" "}
                                {formatDate(
                                  applicant.appliedAt
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-5 font-semibold text-neutral-800">
                          {
                            applicant.job
                              .jobTitle
                          }
                        </td>

                        <td className="px-6 py-5">
                          <p className="font-semibold text-neutral-800">
                            {applicant
                              .student
                              .cgpa ??
                              "N/A"}{" "}
                            CGPA
                          </p>

                          <p className="mt-1 max-w-[220px] text-xs text-neutral-500">
                            {applicant
                              .student
                              .institution ||
                              applicant
                                .student
                                .department}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <div className="flex max-w-[250px] flex-wrap gap-2">
                            {applicant.student.skills
                              .slice(0, 3)
                              .map(
                                (skill) => (
                                  <span
                                    key={
                                      skill
                                    }
                                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                                  >
                                    {
                                      skill
                                    }
                                  </span>
                                )
                              )}

                            {applicant
                              .student
                              .skills
                              .length >
                              3 && (
                              <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                                +
                                {applicant
                                  .student
                                  .skills
                                  .length -
                                  3}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-5">
                          <p className="text-lg font-bold text-purple-700">
                            {
                              applicant.match
                                .matchScore
                            }
                            /100
                          </p>

                          <p className="mt-1 text-xs text-neutral-500">
                            {
                              applicant.match
                                .matchedCount
                            }{" "}
                            of{" "}
                            {
                              applicant.match
                                .requiredCount
                            }{" "}
                            skills
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                              statusStyles[
                                applicant
                                  .status
                              ]
                            }`}
                          >
                            {
                              applicant.statusLabel
                            }
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          {activeActionId ===
                          applicant.applicationId ? (
                            <LoaderCircle
                              size={21}
                              className="ml-auto animate-spin text-blue-600"
                            />
                          ) : (
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleViewApplicant(
                                    applicant
                                  )
                                }
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 hover:bg-blue-50 hover:text-blue-700"
                                title="View applicant"
                              >
                                <Eye
                                  size={
                                    18
                                  }
                                />
                              </button>

                              {[
                                "applied",
                                "under_review",
                              ].includes(
                                applicant.status
                              ) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      applicant,
                                      "shortlisted",
                                      "Applicant shortlisted by the Recruiter."
                                    )
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                  title="Shortlist"
                                >
                                  <UserCheck
                                    size={
                                      18
                                    }
                                  />
                                </button>
                              )}

                              {[
                                "applied",
                                "under_review",
                                "shortlisted",
                              ].includes(
                                applicant.status
                              ) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    openInterviewForm(
                                      applicant
                                    )
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-100"
                                  title="Schedule interview"
                                >
                                  <CalendarPlus
                                    size={
                                      18
                                    }
                                  />
                                </button>
                              )}

                              {![
                                "selected",
                                "rejected",
                                "withdrawn",
                              ].includes(
                                applicant.status
                              ) && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      applicant,
                                      "rejected",
                                      "Application rejected by the Recruiter."
                                    )
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100"
                                  title="Reject"
                                >
                                  <XCircle
                                    size={
                                      18
                                    }
                                  />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <Users
                size={42}
                className="mx-auto text-neutral-400"
              />

              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                No applicants found
              </h3>

              <p className="mt-2 text-neutral-600">
                No applications match
                the current filters.
              </p>
            </div>
          )}

          {filteredApplicants.length >
            0 && (
            <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                {startIndex + 1} to{" "}
                {Math.min(
                  startIndex +
                    applicantsPerPage,
                  filteredApplicants.length
                )}{" "}
                of{" "}
                {
                  filteredApplicants.length
                }
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.max(
                          page - 1,
                          1
                        )
                    )
                  }
                  className="rounded-xl border border-neutral-300 p-2 disabled:opacity-40"
                >
                  <ChevronLeft
                    size={19}
                  />
                </button>

                <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold">
                  Page {currentPage} of{" "}
                  {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage ===
                    totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                    )
                  }
                  className="rounded-xl border border-neutral-300 p-2 disabled:opacity-40"
                >
                  <ChevronRight
                    size={19}
                  />
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {
                    selectedApplicant
                      .student.fullName
                  }
                </h2>

                <p className="mt-1 text-neutral-600">
                  {
                    selectedApplicant
                      .job.jobTitle
                  }
                </p>

                <span
                  className={`mt-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[
                      selectedApplicant
                        .status
                    ]
                  }`}
                >
                  {
                    selectedApplicant
                      .statusLabel
                  }
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedApplicant(
                    null
                  )
                }
                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            {isDetailsLoading && (
              <div className="flex items-center justify-center gap-3 border-b bg-blue-50 px-6 py-4 font-semibold text-blue-700">
                <LoaderCircle
                  size={19}
                  className="animate-spin"
                />

                Loading complete
                profile
              </div>
            )}

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <InformationCard
                  icon={
                    <Mail size={18} />
                  }
                  title="Email"
                  value={
                    selectedApplicant
                      .student.email
                  }
                />

                <InformationCard
                  icon={
                    <Phone size={18} />
                  }
                  title="Phone"
                  value={
                    selectedApplicant
                      .student.phone
                  }
                />

                <InformationCard
                  icon={
                    <GraduationCap
                      size={18}
                    />
                  }
                  title="Academic"
                  value={`${
                    selectedApplicant
                      .student.cgpa ??
                    "N/A"
                  } CGPA · ${
                    selectedApplicant
                      .student
                      .graduationYear ||
                    "Year not provided"
                  }`}
                />

                <InformationCard
                  icon={
                    <MapPin size={18} />
                  }
                  title="Location"
                  value={
                    selectedApplicant
                      .student.location
                  }
                />
              </div>

              <section className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-neutral-900">
                      Profile Match
                      Score
                    </h3>

                    <p className="mt-1 text-sm text-neutral-600">
                      Calculated from
                      required skills and
                      academic profile.
                    </p>
                  </div>

                  <p className="text-3xl font-bold text-purple-700">
                    {
                      selectedApplicant
                        .match.matchScore
                    }
                    /100
                  </p>
                </div>
              </section>

              <DetailSection
                title="Student Summary"
                content={
                  selectedApplicant
                    .student.summary
                }
              />

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Education
                </h3>

                <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                  <p className="font-bold text-neutral-900">
                    {selectedApplicant
                      .student
                      .institution ||
                      "Institution not provided"}
                  </p>

                  <p className="mt-2 text-sm text-neutral-600">
                    {
                      selectedApplicant
                        .student.degree
                    }{" "}
                    ·{" "}
                    {
                      selectedApplicant
                        .student
                        .department
                    }
                  </p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedApplicant
                    .student.skills
                    .map(
                      (skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                        >
                          {skill}
                        </span>
                      )
                    )}
                </div>
              </section>

              <DetailSection
                title="Cover Note"
                content={
                  selectedApplicant
                    .coverNote
                }
              />

              {selectedApplicant
                .student.experiences
                ?.length > 0 && (
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Experience
                  </h3>

                  <div className="mt-3 space-y-3">
                    {selectedApplicant.student.experiences.map(
                      (
                        experience
                      ) => (
                        <article
                          key={
                            experience.experienceId
                          }
                          className="rounded-2xl border border-neutral-200 p-5"
                        >
                          <h4 className="font-bold text-neutral-900">
                            {
                              experience.role
                            }
                          </h4>

                          <p className="mt-1 text-neutral-600">
                            {
                              experience.company
                            }
                          </p>

                          <p className="mt-2 text-sm text-neutral-500">
                            {
                              experience.startDate
                            }{" "}
                            –{" "}
                            {experience.isCurrent
                              ? "Present"
                              : experience.endDate ||
                                "Not provided"}
                          </p>
                        </article>
                      )
                    )}
                  </div>
                </section>
              )}

              {selectedApplicant
                .interview.date && (
                <section className="rounded-2xl border border-purple-200 bg-purple-50 p-5">
                  <h3 className="font-bold text-purple-900">
                    Interview Details
                  </h3>

                  <p className="mt-3 text-purple-800">
                    {
                      selectedApplicant
                        .interview.date
                    }{" "}
                    at{" "}
                    {
                      selectedApplicant
                        .interview.time
                    }
                  </p>

                  <p className="mt-1 text-purple-700">
                    {
                      selectedApplicant
                        .interview.mode
                    }{" "}
                    ·{" "}
                    {
                      selectedApplicant
                        .interview
                        .interviewer
                    }
                  </p>
                </section>
              )}

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Status History
                </h3>

                <div className="mt-4 space-y-4">
                  {selectedApplicant
                    .statusHistory
                    ?.map(
                      (history) => (
                        <div
                          key={
                            history.historyId
                          }
                          className="flex gap-3"
                        >
                          <CheckCircle2
                            size={19}
                            className="mt-0.5 shrink-0 text-emerald-600"
                          />

                          <div>
                            <p className="font-semibold text-neutral-900">
                              {
                                history.statusLabel
                              }
                            </p>

                            <p className="mt-1 text-sm text-neutral-600">
                              {history.note ||
                                `Updated by ${history.changedBy}`}
                            </p>

                            <p className="mt-1 text-xs text-neutral-400">
                              {formatDate(
                                history.createdAt
                              )}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </section>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                disabled={
                  isResumeLoading ||
                  !selectedApplicant
                    .resume.available
                }
                onClick={() =>
                  handleResume(
                    selectedApplicant,
                    false
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 disabled:opacity-40"
              >
                {isResumeLoading ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Eye size={18} />
                )}

                View Resume
              </button>

              <button
                type="button"
                disabled={
                  isResumeLoading ||
                  !selectedApplicant
                    .resume.available
                }
                onClick={() =>
                  handleResume(
                    selectedApplicant,
                    true
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 disabled:opacity-40"
              >
                <Download
                  size={18}
                />

                Download
              </button>

              {[
                "applied",
                "under_review",
              ].includes(
                selectedApplicant.status
              ) && (
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      selectedApplicant,
                      "shortlisted",
                      "Applicant shortlisted by the Recruiter."
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white"
                >
                  <UserCheck
                    size={18}
                  />
                  Shortlist
                </button>
              )}

              {[
                "applied",
                "under_review",
                "shortlisted",
              ].includes(
                selectedApplicant.status
              ) && (
                <button
                  type="button"
                  onClick={() =>
                    openInterviewForm(
                      selectedApplicant
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-3 font-semibold text-white"
                >
                  <CalendarPlus
                    size={18}
                  />
                  Interview
                </button>
              )}

              {[
                "shortlisted",
                "interview",
              ].includes(
                selectedApplicant.status
              ) && (
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      selectedApplicant,
                      "selected",
                      "Applicant selected by the Recruiter."
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"
                >
                  <CheckCircle2
                    size={18}
                  />
                  Select
                </button>
              )}

              {![
                "selected",
                "rejected",
                "withdrawn",
              ].includes(
                selectedApplicant.status
              ) && (
                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(
                      selectedApplicant,
                      "rejected",
                      "Application rejected by the Recruiter."
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-3 font-semibold text-white"
                >
                  <UserX size={18} />
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {interviewApplicant && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/60 p-4">
          <form
            onSubmit={
              handleScheduleInterview
            }
            className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Schedule Interview
                </h2>

                <p className="mt-2 text-neutral-600">
                  {
                    interviewApplicant
                      .student.fullName
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setInterviewApplicant(
                    null
                  )
                }
                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-5 p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Date
                  </label>

                  <input
                    type="date"
                    required
                    min={new Date()
                      .toISOString()
                      .slice(0, 10)}
                    value={
                      interviewForm.date
                    }
                    onChange={(
                      event
                    ) =>
                      setInterviewForm(
                        (
                          previous
                        ) => ({
                          ...previous,
                          date:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Time
                  </label>

                  <input
                    type="time"
                    required
                    value={
                      interviewForm.time
                    }
                    onChange={(
                      event
                    ) =>
                      setInterviewForm(
                        (
                          previous
                        ) => ({
                          ...previous,
                          time:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Mode
                </label>

                <select
                  value={
                    interviewForm.mode
                  }
                  onChange={(event) =>
                    setInterviewForm(
                      (previous) => ({
                        ...previous,
                        mode:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3"
                >
                  <option>
                    Google Meet
                  </option>
                  <option>
                    Microsoft Teams
                  </option>
                  <option>
                    Zoom
                  </option>
                  <option>
                    In Person
                  </option>
                  <option>
                    Phone Interview
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interviewer Name
                </label>

                <input
                  type="text"
                  required
                  value={
                    interviewForm.interviewer
                  }
                  onChange={(event) =>
                    setInterviewForm(
                      (previous) => ({
                        ...previous,
                        interviewer:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Enter interviewer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Meeting Link or
                  Location
                </label>

                <textarea
                  rows={3}
                  maxLength={500}
                  value={
                    interviewForm.details
                  }
                  onChange={(event) =>
                    setInterviewForm(
                      (previous) => ({
                        ...previous,
                        details:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Meeting URL, venue or instructions"
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3"
                />
              </div>

              <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-4">
                {interviewForm.mode ===
                "In Person" ? (
                  <MapPin
                    size={20}
                    className="mt-0.5 text-blue-700"
                  />
                ) : (
                  <Video
                    size={20}
                    className="mt-0.5 text-blue-700"
                  />
                )}

                <p className="text-sm text-blue-800">
                  These interview
                  details will be
                  visible in the
                  Student application
                  record.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() =>
                  setInterviewApplicant(
                    null
                  )
                }
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={
                  activeActionId ===
                  interviewApplicant
                    .applicationId
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {activeActionId ===
                interviewApplicant
                  .applicationId ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <Clock3 size={18} />
                )}

                Schedule Interview
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function InformationCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
        {icon}
        {title}
      </p>

      <p className="mt-2 font-medium text-neutral-900">
        {value ||
          "Not provided"}
      </p>
    </div>
  );
}

function DetailSection({
  title,
  content,
}) {
  return (
    <section>
      <h3 className="text-lg font-bold text-neutral-900">
        {title}
      </h3>

      <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
        {content ||
          "Not provided."}
      </p>
    </section>
  );
}

export default Applicants;