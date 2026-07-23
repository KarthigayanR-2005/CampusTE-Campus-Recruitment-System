import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AlertCircle,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Eye,
  FilePenLine,
  FileText,
  IndianRupee,
  LoaderCircle,
  MapPin,
  MoreVertical,
  PlusCircle,
  Search,
  Send,
  Trash2,
  Users,
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
  deleteRecruiterJobRequest,
  duplicateRecruiterJobRequest,
  getRecruiterJobsRequest,
  updateRecruiterJobStatusRequest,
} from "../../services/recruiterService";

const statusStyles = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-700",

  draft:
    "border-amber-200 bg-amber-50 text-amber-700",

  closed:
    "border-neutral-200 bg-neutral-100 text-neutral-600",
};

const statusLabels = {
  active: "Active",
  draft: "Draft",
  closed: "Closed",
};

function formatDate(value) {
  if (!value) {
    return "Not set";
  }

  const date =
    new Date(
      `${String(value).slice(
        0,
        10
      )}T00:00:00`
    );

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

function formatSalary(
  minimum,
  maximum
) {
  const minimumValue =
    minimum === "" ||
    minimum === null
      ? null
      : Number(minimum);

  const maximumValue =
    maximum === "" ||
    maximum === null
      ? null
      : Number(maximum);

  const formatter =
    new Intl.NumberFormat(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    );

  if (
    minimumValue !== null &&
    maximumValue !== null
  ) {
    return `₹${formatter.format(
      minimumValue
    )} - ₹${formatter.format(
      maximumValue
    )}`;
  }

  if (minimumValue !== null) {
    return `From ₹${formatter.format(
      minimumValue
    )}`;
  }

  if (maximumValue !== null) {
    return `Up to ₹${formatter.format(
      maximumValue
    )}`;
  }

  return "Not disclosed";
}

function ManageJobs() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const messageTimer =
    useRef(null);

  const [
    jobs,
    setJobs,
  ] = useState([]);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("all");

  const [
    openMenuId,
    setOpenMenuId,
  ] = useState(null);

  const [
    selectedJob,
    setSelectedJob,
  ] = useState(null);

  const [
    message,
    setMessage,
  ] = useState("");

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    activeActionId,
    setActiveActionId,
  ] = useState(null);

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const jobsPerPage = 5;

  const showMessage = (
    text
  ) => {
    setMessage(text);

    if (messageTimer.current) {
      window.clearTimeout(
        messageTimer.current
      );
    }

    messageTimer.current =
      window.setTimeout(() => {
        setMessage("");
      }, 4000);
  };

  useEffect(() => {
    return () => {
      if (messageTimer.current) {
        window.clearTimeout(
          messageTimer.current
        );
      }
    };
  }, []);

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

  const loadJobs =
    useCallback(async () => {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterJobsRequest({
            token,
          });

        setJobs(
          Array.isArray(response.jobs)
            ? response.jobs
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
            "Unable to retrieve recruiter jobs."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const filteredJobs =
    useMemo(() => {
      const cleanedSearch =
        searchTerm
          .trim()
          .toLowerCase();

      return jobs.filter((job) => {
        const matchesSearch =
          !cleanedSearch ||
          job.jobTitle
            .toLowerCase()
            .includes(
              cleanedSearch
            ) ||
          job.department
            .toLowerCase()
            .includes(
              cleanedSearch
            ) ||
          job.city
            .toLowerCase()
            .includes(
              cleanedSearch
            );

        const matchesStatus =
          statusFilter === "all" ||
          job.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      });
    }, [
      jobs,
      searchTerm,
      statusFilter,
    ]);

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredJobs.length /
          jobsPerPage
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

  const startIndex =
    (currentPage - 1) *
    jobsPerPage;

  const paginatedJobs =
    filteredJobs.slice(
      startIndex,
      startIndex + jobsPerPage
    );

  const stats = {
    active:
      jobs.filter(
        (job) =>
          job.status === "active"
      ).length,

    drafts:
      jobs.filter(
        (job) =>
          job.status === "draft"
      ).length,

    closed:
      jobs.filter(
        (job) =>
          job.status === "closed"
      ).length,

    applicants:
      jobs.reduce(
        (total, job) =>
          total +
          Number(
            job.applicantCount || 0
          ),
        0
      ),
  };

  const replaceJob = (
    updatedJob
  ) => {
    setJobs(
      (previousJobs) =>
        previousJobs.map(
          (job) =>
            job.jobId ===
            updatedJob.jobId
              ? updatedJob
              : job
        )
    );
  };

  const handleStatusChange =
    async (
      jobId,
      status
    ) => {
      setActiveActionId(jobId);
      setOpenMenuId(null);
      setErrorMessage("");

      try {
        const response =
          await updateRecruiterJobStatusRequest({
            token,
            jobId,
            status,
          });

        replaceJob(
          response.job
        );

        showMessage(
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
            "Unable to change the job status."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const handleDuplicate =
    async (jobId) => {
      setActiveActionId(jobId);
      setOpenMenuId(null);
      setErrorMessage("");

      try {
        const response =
          await duplicateRecruiterJobRequest({
            token,
            jobId,
          });

        setJobs(
          (previousJobs) => [
            response.job,
            ...previousJobs,
          ]
        );

        setCurrentPage(1);

        showMessage(
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
            "Unable to duplicate the job."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const handleDelete =
    async (job) => {
      if (
        job.status !== "draft"
      ) {
        setErrorMessage(
          "Only draft jobs can be deleted."
        );

        return;
      }

      const shouldDelete =
        window.confirm(
          `Delete the draft "${job.jobTitle}"?`
        );

      if (!shouldDelete) {
        return;
      }

      setActiveActionId(
        job.jobId
      );

      setOpenMenuId(null);
      setErrorMessage("");

      try {
        const response =
          await deleteRecruiterJobRequest({
            token,
            jobId: job.jobId,
          });

        setJobs(
          (previousJobs) =>
            previousJobs.filter(
              (existingJob) =>
                existingJob.jobId !==
                job.jobId
            )
        );

        showMessage(
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
            "Unable to delete the draft."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
        <LoaderCircle
          size={40}
          className="animate-spin text-blue-700"
        />

        <h2 className="mt-5 text-xl font-bold text-neutral-900">
          Loading jobs
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving recruiter jobs
          from MySQL.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8">
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
                    Job Management
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Manage Job Openings
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  Create, publish,
                  close, reopen and
                  manage company jobs.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/recruiter/post-job"
                  )
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
              >
                <PlusCircle
                  size={19}
                />
                Post New Job
              </button>
            </div>
          </div>

          {message && (
            <div className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 font-semibold text-emerald-800">
              <CheckCircle2
                size={19}
              />

              {message}
            </div>
          )}
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Active Jobs",
              value: stats.active,
              icon: CheckCircle2,
              style:
                "bg-emerald-100 text-emerald-700",
            },
            {
              label: "Draft Jobs",
              value: stats.drafts,
              icon: FileText,
              style:
                "bg-amber-100 text-amber-700",
            },
            {
              label: "Closed Jobs",
              value: stats.closed,
              icon: XCircle,
              style:
                "bg-neutral-100 text-neutral-700",
            },
            {
              label:
                "Total Applicants",
              value:
                stats.applicants,
              icon: Users,
              style:
                "bg-blue-100 text-blue-700",
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

                <p className="mt-6 text-3xl font-bold text-neutral-900">
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
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Job Listings
                </h2>

                <p className="mt-1 text-sm text-neutral-600">
                  Only jobs created by
                  the logged-in
                  recruiter are shown.
                </p>
              </div>

              <div className="relative w-full xl:max-w-md">
                <Search
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(
                      event.target.value
                    );

                    setCurrentPage(1);
                  }}
                  placeholder="Search title, department or city"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                "all",
                "active",
                "draft",
                "closed",
              ].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    setStatusFilter(
                      status
                    );

                    setCurrentPage(1);
                  }}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                    statusFilter ===
                    status
                      ? "bg-blue-600 text-white"
                      : "border border-neutral-300 text-neutral-700"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : statusLabels[
                        status
                      ]}
                </button>
              ))}
            </div>
          </div>

          {paginatedJobs.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Job Details
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Location
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Salary
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Applicants
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Deadline
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
                  {paginatedJobs.map(
                    (job) => (
                      <tr
                        key={job.jobId}
                        className="border-b border-neutral-100 hover:bg-neutral-50"
                      >
                        <td className="px-6 py-5">
                          <p className="font-bold text-neutral-900">
                            {
                              job.jobTitle
                            }
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {job.department ||
                              "No department"}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            {
                              job.employmentType
                            }
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="flex items-center gap-2 text-sm text-neutral-700">
                            <MapPin
                              size={16}
                            />

                            {job.workMode ===
                            "Remote"
                              ? "Remote"
                              : job.city ||
                                "Not specified"}
                          </p>

                          <p className="mt-1 text-xs text-neutral-500">
                            {
                              job.workMode
                            }
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <p className="flex items-center gap-2 text-sm text-neutral-700">
                            <IndianRupee
                              size={16}
                            />

                            {formatSalary(
                              job.salaryMin,
                              job.salaryMax
                            )}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                "/recruiter/applicants"
                              )
                            }
                            className="inline-flex items-center gap-2 font-semibold text-blue-700"
                          >
                            <Users
                              size={16}
                            />

                            {job.applicantCount ||
                              0}
                          </button>
                        </td>

                        <td className="px-6 py-5">
                          <p className="flex items-center gap-2 text-sm text-neutral-700">
                            <CalendarDays
                              size={16}
                            />

                            {formatDate(
                              job.applicationDeadline
                            )}
                          </p>
                        </td>

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[job.status]}`}
                          >
                            {
                              statusLabels[
                                job.status
                              ]
                            }
                          </span>
                        </td>

                        <td className="relative px-6 py-5 text-right">
                          {activeActionId ===
                          job.jobId ? (
                            <LoaderCircle
                              size={20}
                              className="ml-auto animate-spin text-blue-600"
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(
                                  (
                                    previousId
                                  ) =>
                                    previousId ===
                                    job.jobId
                                      ? null
                                      : job.jobId
                                )
                              }
                              className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
                            >
                              <MoreVertical
                                size={20}
                              />
                            </button>
                          )}

                          {openMenuId ===
                            job.jobId && (
                            <div className="absolute right-6 top-14 z-20 w-52 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedJob(
                                    job
                                  );

                                  setOpenMenuId(
                                    null
                                  );
                                }}
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
                              >
                                <Eye
                                  size={17}
                                />
                                View Job
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  navigate(
                                    `/recruiter/post-job?edit=${job.jobId}`
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
                              >
                                <FilePenLine
                                  size={17}
                                />
                                Edit Job
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  handleDuplicate(
                                    job.jobId
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
                              >
                                <Copy
                                  size={17}
                                />
                                Duplicate
                              </button>

                              {job.status ===
                                "draft" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      job.jobId,
                                      "active"
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Send
                                    size={17}
                                  />
                                  Publish
                                </button>
                              )}

                              {job.status ===
                                "active" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      job.jobId,
                                      "closed"
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                                >
                                  <XCircle
                                    size={17}
                                  />
                                  Close
                                </button>
                              )}

                              {job.status ===
                                "closed" && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleStatusChange(
                                      job.jobId,
                                      "active"
                                    )
                                  }
                                  className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                                >
                                  <Send
                                    size={17}
                                  />
                                  Reopen
                                </button>
                              )}

                              {job.status ===
                                "draft" && (
                                <>
                                  <div className="my-1 border-t border-neutral-100" />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(
                                        job
                                      )
                                    }
                                    className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                                  >
                                    <Trash2
                                      size={17}
                                    />
                                    Delete
                                  </button>
                                </>
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
              <BriefcaseBusiness
                size={42}
                className="mx-auto text-neutral-400"
              />

              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                No jobs found
              </h3>

              <p className="mt-2 text-neutral-600">
                Create a job or change
                the current filters.
              </p>
            </div>
          )}

          {filteredJobs.length >
            0 && (
            <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                {startIndex + 1} to{" "}
                {Math.min(
                  startIndex +
                    jobsPerPage,
                  filteredJobs.length
                )}{" "}
                of{" "}
                {filteredJobs.length}
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={
                    currentPage === 1
                  }
                  onClick={() =>
                    setCurrentPage(
                      (
                        previousPage
                      ) =>
                        Math.max(
                          previousPage -
                            1,
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
                      (
                        previousPage
                      ) =>
                        Math.min(
                          previousPage +
                            1,
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

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${statusStyles[selectedJob.status]}`}
                >
                  {
                    statusLabels[
                      selectedJob.status
                    ]
                  }
                </span>

                <h2 className="mt-4 text-3xl font-bold text-neutral-900">
                  {
                    selectedJob.jobTitle
                  }
                </h2>

                <p className="mt-2 text-neutral-600">
                  {selectedJob.department ||
                    "Department not specified"}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedJob(null)
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
                  selectedJob.employmentType
                }
              </p>

              <p>
                <strong>
                  Work mode:
                </strong>{" "}
                {selectedJob.workMode}
              </p>

              <p>
                <strong>
                  Location:
                </strong>{" "}
                {selectedJob.city ||
                  "Not provided"}
                , {selectedJob.country}
              </p>

              <p>
                <strong>
                  Openings:
                </strong>{" "}
                {selectedJob.openings}
              </p>

              <p>
                <strong>
                  Minimum CGPA:
                </strong>{" "}
                {
                  selectedJob.minimumCgpa
                }
              </p>

              <p>
                <strong>
                  Deadline:
                </strong>{" "}
                {formatDate(
                  selectedJob.applicationDeadline
                )}
              </p>
            </div>

            <div className="mt-7">
              <h3 className="font-bold text-neutral-900">
                Required Skills
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {selectedJob
                  .requiredSkills
                  .length > 0 ? (
                  selectedJob.requiredSkills.map(
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
                    No required skills.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7">
              <h3 className="font-bold text-neutral-900">
                Job Description
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
                {selectedJob.jobDescription ||
                  "No description provided."}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageJobs;