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
  Eye,
  LoaderCircle,
  MapPin,
  MessageSquare,
  Phone,
  RotateCcw,
  Search,
  User,
  Users,
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
  cancelRecruiterInterviewRequest,
  getRecruiterInterviewRequest,
  getRecruiterInterviewsRequest,
  rescheduleRecruiterInterviewRequest,
} from "../../services/recruiterService";

const statusStyles = {
  Upcoming:
    "border-blue-200 bg-blue-50 text-blue-700",

  Today:
    "border-purple-200 bg-purple-50 text-purple-700",

  Completed:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const modeIcons = {
  "Google Meet": Video,
  "Microsoft Teams": Video,
  Zoom: Video,
  "In Person": MapPin,
  "Phone Interview": Phone,
};

function createRescheduleForm() {
  return {
    date: "",
    time: "",
    mode: "Google Meet",
    interviewer: "",
    details: "",
  };
}

function formatDate(value) {
  if (!value) {
    return "Not available";
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

function formatTime(value) {
  if (!value) {
    return "Not available";
  }

  const date =
    new Date(
      `2026-01-01T${String(
        value
      ).slice(0, 5)}:00`
    );

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  return date.toLocaleTimeString(
    "en-IN",
    {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }
  );
}

function getInterviewStatus(
  interview
) {
  const interviewDate =
    interview.interview?.date;

  const interviewTime =
    interview.interview?.time;

  if (
    !interviewDate ||
    !interviewTime
  ) {
    return "Upcoming";
  }

  const now = new Date();

  const dateTime =
    new Date(
      `${interviewDate}T${interviewTime}:00`
    );

  const today =
    now.toISOString().slice(
      0,
      10
    );

  if (
    interviewDate === today &&
    dateTime >= now
  ) {
    return "Today";
  }

  if (dateTime < now) {
    return "Completed";
  }

  return "Upcoming";
}

function getInterviewTimestamp(
  interview
) {
  const date =
    interview.interview?.date;

  const time =
    interview.interview?.time;

  if (!date || !time) {
    return 0;
  }

  return new Date(
    `${date}T${time}:00`
  ).getTime();
}

function Interviews() {
  const navigate = useNavigate();

  const {
    token,
    logout,
  } = useAuth();

  const [
    interviews,
    setInterviews,
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
  ] = useState("All");

  const [
    selectedInterview,
    setSelectedInterview,
  ] = useState(null);

  const [
    rescheduleInterview,
    setRescheduleInterview,
  ] = useState(null);

  const [
    rescheduleForm,
    setRescheduleForm,
  ] = useState(
    createRescheduleForm
  );

  const [
    cancelInterview,
    setCancelInterview,
  ] = useState(null);

  const [
    cancellationReason,
    setCancellationReason,
  ] = useState("");

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

  const interviewsPerPage = 5;

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

  const loadInterviews =
    useCallback(async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterInterviewsRequest({
            token,
          });

        setInterviews(
          Array.isArray(
            response.interviews
          )
            ? response.interviews
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
            "Unable to retrieve interviews."
        );
      } finally {
        setIsLoading(false);
      }
    }, [
      token,
      handleAuthenticationError,
    ]);

  useEffect(() => {
    loadInterviews();
  }, [loadInterviews]);

  const interviewsWithStatus =
    useMemo(
      () =>
        interviews.map(
          (interview) => ({
            ...interview,

            displayStatus:
              getInterviewStatus(
                interview
              ),
          })
        ),
      [interviews]
    );

  const filteredInterviews =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return interviewsWithStatus
        .filter((interview) => {
          const searchText =
            [
              interview.student
                ?.fullName,

              interview.student
                ?.email,

              interview.job
                ?.jobTitle,

              interview.interview
                ?.interviewer,

              interview.interview
                ?.mode,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

          const matchesSearch =
            !search ||
            searchText.includes(
              search
            );

          const matchesJob =
            !jobFilter ||
            String(
              interview.jobId
            ) ===
              String(jobFilter);

          const matchesStatus =
            statusFilter === "All" ||
            interview.displayStatus ===
              statusFilter;

          return (
            matchesSearch &&
            matchesJob &&
            matchesStatus
          );
        })
        .sort((first, second) => {
          const firstStatus =
            first.displayStatus;

          const secondStatus =
            second.displayStatus;

          if (
            firstStatus !==
            "Completed" &&
            secondStatus ===
            "Completed"
          ) {
            return -1;
          }

          if (
            firstStatus ===
            "Completed" &&
            secondStatus !==
            "Completed"
          ) {
            return 1;
          }

          return (
            getInterviewTimestamp(
              first
            ) -
            getInterviewTimestamp(
              second
            )
          );
        });
    }, [
      interviewsWithStatus,
      searchTerm,
      jobFilter,
      statusFilter,
    ]);

  const statistics = {
    total:
      interviewsWithStatus.length,

    today:
      interviewsWithStatus.filter(
        (interview) =>
          interview.displayStatus ===
          "Today"
      ).length,

    upcoming:
      interviewsWithStatus.filter(
        (interview) =>
          interview.displayStatus ===
            "Upcoming" ||
          interview.displayStatus ===
            "Today"
      ).length,

    completed:
      interviewsWithStatus.filter(
        (interview) =>
          interview.displayStatus ===
          "Completed"
      ).length,
  };

  const upcomingInterviews =
    interviewsWithStatus
      .filter(
        (interview) =>
          interview.displayStatus ===
            "Upcoming" ||
          interview.displayStatus ===
            "Today"
      )
      .sort(
        (first, second) =>
          getInterviewTimestamp(
            first
          ) -
          getInterviewTimestamp(
            second
          )
      );

  const nextInterview =
    upcomingInterviews[0] || null;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInterviews.length /
          interviewsPerPage
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
    interviewsPerPage;

  const paginatedInterviews =
    filteredInterviews.slice(
      startIndex,
      startIndex +
        interviewsPerPage
    );

  const replaceInterview = (
    updatedInterview
  ) => {
    setInterviews(
      (previousInterviews) =>
        previousInterviews.map(
          (interview) =>
            interview.applicationId ===
            updatedInterview.applicationId
              ? updatedInterview
              : interview
        )
    );

    setSelectedInterview(
      (previousInterview) =>
        previousInterview
          ?.applicationId ===
        updatedInterview.applicationId
          ? updatedInterview
          : previousInterview
    );
  };

  const handleViewInterview =
    async (interview) => {
      setSelectedInterview(
        interview
      );

      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getRecruiterInterviewRequest({
            token,

            applicationId:
              interview.applicationId,
          });

        setSelectedInterview(
          response.interview
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
            "Unable to retrieve interview details."
        );
      } finally {
        setIsDetailsLoading(false);
      }
    };

  const openRescheduleModal = (
    interview
  ) => {
    setRescheduleInterview(
      interview
    );

    setSelectedInterview(null);

    setRescheduleForm({
      date:
        interview.interview
          ?.date || "",

      time:
        interview.interview
          ?.time || "",

      mode:
        interview.interview
          ?.mode ||
        "Google Meet",

      interviewer:
        interview.interview
          ?.interviewer || "",

      details:
        interview.interview
          ?.details || "",
    });
  };

  const handleReschedule =
    async (event) => {
      event.preventDefault();

      if (!rescheduleInterview) {
        return;
      }

      setActiveActionId(
        rescheduleInterview
          .applicationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await rescheduleRecruiterInterviewRequest({
            token,

            applicationId:
              rescheduleInterview
                .applicationId,

            interviewDate:
              rescheduleForm.date,

            interviewTime:
              rescheduleForm.time,

            interviewMode:
              rescheduleForm.mode,

            interviewerName:
              rescheduleForm
                .interviewer,

            interviewDetails:
              rescheduleForm.details,
          });

        replaceInterview(
          response.interview
        );

        setSuccessMessage(
          response.message
        );

        setRescheduleInterview(
          null
        );

        setRescheduleForm(
          createRescheduleForm()
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
            "Unable to reschedule the interview."
        );
      } finally {
        setActiveActionId(null);
      }
    };

  const handleCancelInterview =
    async (event) => {
      event.preventDefault();

      if (!cancelInterview) {
        return;
      }

      setActiveActionId(
        cancelInterview.applicationId
      );

      setErrorMessage("");
      setSuccessMessage("");

      try {
        const response =
          await cancelRecruiterInterviewRequest({
            token,

            applicationId:
              cancelInterview
                .applicationId,

            cancellationReason,
          });

        setInterviews(
          (previousInterviews) =>
            previousInterviews.filter(
              (interview) =>
                interview.applicationId !==
                cancelInterview.applicationId
            )
        );

        setSelectedInterview(null);
        setCancelInterview(null);
        setCancellationReason("");

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
            "Unable to cancel the interview."
        );
      } finally {
        setActiveActionId(null);
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
          Loading interviews
        </h2>

        <p className="mt-2 text-neutral-600">
          Retrieving interview
          schedules from MySQL.
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
                    <CalendarDays
                      size={25}
                    />
                  </div>

                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                    Interview
                    Management
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Interviews
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  View, reschedule and
                  cancel candidate
                  interviews.
                </p>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
                <p className="text-sm text-blue-100">
                  Next Interview
                </p>

                {nextInterview ? (
                  <>
                    <p className="mt-1 text-xl font-bold">
                      {
                        nextInterview
                          .student
                          .fullName
                      }
                    </p>

                    <p className="mt-1 text-sm text-blue-100">
                      {formatDate(
                        nextInterview
                          .interview
                          .date
                      )}{" "}
                      ·{" "}
                      {formatTime(
                        nextInterview
                          .interview
                          .time
                      )}
                    </p>
                  </>
                ) : (
                  <p className="mt-1 text-lg font-bold">
                    No upcoming
                    interviews
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatisticCard
            icon={CalendarDays}
            label="Total Interviews"
            value={statistics.total}
            style="bg-blue-100 text-blue-700"
          />

          <StatisticCard
            icon={Clock3}
            label="Upcoming"
            value={
              statistics.upcoming
            }
            style="bg-purple-100 text-purple-700"
          />

          <StatisticCard
            icon={CalendarPlus}
            label="Today"
            value={statistics.today}
            style="bg-amber-100 text-amber-700"
          />

          <StatisticCard
            icon={CheckCircle2}
            label="Completed"
            value={
              statistics.completed
            }
            style="bg-emerald-100 text-emerald-700"
          />
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 p-6 sm:p-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Interview Schedule
                </h2>

                <p className="mt-1 text-sm text-neutral-600">
                  Interviews for jobs
                  created by your
                  Recruiter account.
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
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  placeholder="Search candidate, role or interviewer"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {[
                  "All",
                  "Today",
                  "Upcoming",
                  "Completed",
                ].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        status
                      )
                    }
                    className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                      statusFilter ===
                      status
                        ? "bg-blue-600 text-white"
                        : "border border-neutral-300 text-neutral-700"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>

              <select
                value={jobFilter}
                onChange={(event) =>
                  setJobFilter(
                    event.target.value
                  )
                }
                className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none"
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
            </div>
          </div>

          {paginatedInterviews.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1150px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Candidate
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Position
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Date and Time
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Mode
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Interviewer
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
                  {paginatedInterviews.map(
                    (interview) => {
                      const ModeIcon =
                        modeIcons[
                          interview
                            .interview
                            .mode
                        ] || Video;

                      return (
                        <tr
                          key={
                            interview.applicationId
                          }
                          className="border-b border-neutral-100 hover:bg-neutral-50"
                        >
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                                {interview.student.fullName
                                  .split(
                                    " "
                                  )
                                  .map(
                                    (
                                      part
                                    ) =>
                                      part[0]
                                  )
                                  .join(
                                    ""
                                  )
                                  .slice(
                                    0,
                                    2
                                  )}
                              </div>

                              <div>
                                <p className="font-bold text-neutral-900">
                                  {
                                    interview
                                      .student
                                      .fullName
                                  }
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                  {
                                    interview
                                      .student
                                      .email
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="font-semibold text-neutral-800">
                              {
                                interview
                                  .job
                                  .jobTitle
                              }
                            </p>

                            <p className="mt-1 text-sm text-neutral-500">
                              {
                                interview
                                  .job
                                  .department
                              }
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                              <CalendarDays
                                size={
                                  16
                                }
                              />

                              {formatDate(
                                interview
                                  .interview
                                  .date
                              )}
                            </p>

                            <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                              <Clock3
                                size={
                                  16
                                }
                              />

                              {formatTime(
                                interview
                                  .interview
                                  .time
                              )}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                              <ModeIcon
                                size={
                                  17
                                }
                              />

                              {
                                interview
                                  .interview
                                  .mode
                              }
                            </p>

                            <p className="mt-1 max-w-[220px] truncate text-xs text-neutral-500">
                              {interview
                                .interview
                                .details ||
                                "No additional details"}
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                              <User
                                size={
                                  17
                                }
                              />

                              {
                                interview
                                  .interview
                                  .interviewer
                              }
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <span
                              className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                                statusStyles[
                                  interview
                                    .displayStatus
                                ]
                              }`}
                            >
                              {
                                interview.displayStatus
                              }
                            </span>
                          </td>

                          <td className="px-6 py-5">
                            {activeActionId ===
                            interview.applicationId ? (
                              <LoaderCircle
                                size={
                                  20
                                }
                                className="ml-auto animate-spin text-blue-600"
                              />
                            ) : (
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleViewInterview(
                                      interview
                                    )
                                  }
                                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 hover:bg-blue-50"
                                  title="View interview"
                                >
                                  <Eye
                                    size={
                                      18
                                    }
                                  />
                                </button>

                                {interview.displayStatus !==
                                  "Completed" && (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        openRescheduleModal(
                                          interview
                                        )
                                      }
                                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 hover:bg-amber-100"
                                      title="Reschedule"
                                    >
                                      <RotateCcw
                                        size={
                                          18
                                        }
                                      />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => {
                                        setCancelInterview(
                                          interview
                                        );

                                        setCancellationReason(
                                          ""
                                        );
                                      }}
                                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100"
                                      title="Cancel interview"
                                    >
                                      <XCircle
                                        size={
                                          18
                                        }
                                      />
                                    </button>
                                  </>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-16 text-center">
              <CalendarDays
                size={42}
                className="mx-auto text-neutral-400"
              />

              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                No interviews found
              </h3>

              <p className="mt-2 text-neutral-600">
                Schedule an interview
                from the Applicants
                page or change the
                filters.
              </p>
            </div>
          )}

          {filteredInterviews.length >
            0 && (
            <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-neutral-600">
                Showing{" "}
                {startIndex + 1} to{" "}
                {Math.min(
                  startIndex +
                    interviewsPerPage,
                  filteredInterviews.length
                )}{" "}
                of{" "}
                {
                  filteredInterviews.length
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

      {selectedInterview && (
        <InterviewDetailsModal
          interview={
            selectedInterview
          }
          isLoading={
            isDetailsLoading
          }
          onClose={() =>
            setSelectedInterview(
              null
            )
          }
          onReschedule={
            openRescheduleModal
          }
          onCancel={(interview) => {
            setCancelInterview(
              interview
            );

            setCancellationReason(
              ""
            );

            setSelectedInterview(
              null
            );
          }}
        />
      )}

      {rescheduleInterview && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/60 p-4">
          <form
            onSubmit={
              handleReschedule
            }
            className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Reschedule
                  Interview
                </h2>

                <p className="mt-2 text-neutral-600">
                  {
                    rescheduleInterview
                      .student.fullName
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setRescheduleInterview(
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
                <FormField
                  label="Interview Date"
                >
                  <input
                    type="date"
                    required
                    min={new Date()
                      .toISOString()
                      .slice(0, 10)}
                    value={
                      rescheduleForm.date
                    }
                    onChange={(event) =>
                      setRescheduleForm(
                        (previous) => ({
                          ...previous,

                          date:
                            event.target
                              .value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  />
                </FormField>

                <FormField
                  label="Interview Time"
                >
                  <input
                    type="time"
                    required
                    value={
                      rescheduleForm.time
                    }
                    onChange={(event) =>
                      setRescheduleForm(
                        (previous) => ({
                          ...previous,

                          time:
                            event.target
                              .value,
                        })
                      )
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                  />
                </FormField>
              </div>

              <FormField
                label="Interview Mode"
              >
                <select
                  value={
                    rescheduleForm.mode
                  }
                  onChange={(event) =>
                    setRescheduleForm(
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
              </FormField>

              <FormField
                label="Interviewer Name"
              >
                <input
                  type="text"
                  required
                  value={
                    rescheduleForm.interviewer
                  }
                  onChange={(event) =>
                    setRescheduleForm(
                      (previous) => ({
                        ...previous,

                        interviewer:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3"
                />
              </FormField>

              <FormField
                label="Meeting Link, Location or Instructions"
              >
                <textarea
                  rows={3}
                  maxLength={500}
                  value={
                    rescheduleForm.details
                  }
                  onChange={(event) =>
                    setRescheduleForm(
                      (previous) => ({
                        ...previous,

                        details:
                          event.target
                            .value,
                      })
                    )
                  }
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3"
                />
              </FormField>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() =>
                  setRescheduleInterview(
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
                  rescheduleInterview
                    .applicationId
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {activeActionId ===
                rescheduleInterview
                  .applicationId ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <CalendarPlus
                    size={18}
                  />
                )}

                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {cancelInterview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-neutral-950/60 p-4">
          <form
            onSubmit={
              handleCancelInterview
            }
            className="w-full max-w-lg rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Cancel Interview
                </h2>

                <p className="mt-2 text-neutral-600">
                  {
                    cancelInterview
                      .student.fullName
                  }
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setCancelInterview(
                    null
                  )
                }
                className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="p-6">
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-6 text-rose-700">
                Cancelling the
                interview will move
                the applicant back to
                the Shortlisted stage.
              </div>

              <FormField
                label="Cancellation Reason"
              >
                <textarea
                  rows={5}
                  required
                  minLength={3}
                  maxLength={500}
                  value={
                    cancellationReason
                  }
                  onChange={(event) =>
                    setCancellationReason(
                      event.target.value
                    )
                  }
                  placeholder="Explain why the interview is being cancelled"
                  className="mt-4 w-full resize-none rounded-xl border border-neutral-300 px-4 py-3"
                />
              </FormField>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() =>
                  setCancelInterview(
                    null
                  )
                }
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700"
              >
                Keep Interview
              </button>

              <button
                type="submit"
                disabled={
                  activeActionId ===
                  cancelInterview
                    .applicationId
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
              >
                {activeActionId ===
                cancelInterview
                  .applicationId ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <XCircle
                    size={18}
                  />
                )}

                Cancel Interview
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

function StatisticCard({
  icon: Icon,
  label,
  value,
  style,
}) {
  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${style}`}
      >
        <Icon size={22} />
      </div>

      <p className="mt-6 text-3xl font-bold text-neutral-900">
        {value}
      </p>

      <p className="mt-1 text-sm font-medium text-neutral-600">
        {label}
      </p>
    </article>
  );
}

function FormField({
  label,
  children,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-neutral-700">
        {label}
      </label>

      {children}
    </div>
  );
}

function InterviewDetailsModal({
  interview,
  isLoading,
  onClose,
  onReschedule,
  onCancel,
}) {
  const displayStatus =
    getInterviewStatus(
      interview
    );

  const ModeIcon =
    modeIcons[
      interview.interview?.mode
    ] || Video;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Interview Details
            </h2>

            <p className="mt-2 text-neutral-600">
              {
                interview.student
                  .fullName
              }
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
          >
            <X size={21} />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 border-b bg-blue-50 px-6 py-4 font-semibold text-blue-700">
            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Loading complete details
          </div>
        )}

        <div className="space-y-7 p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <InformationCard
              icon={
                <BriefcaseBusiness
                  size={17}
                />
              }
              title="Position"
              value={
                interview.job.jobTitle
              }
            />

            <InformationCard
              icon={
                <CalendarDays
                  size={17}
                />
              }
              title="Date"
              value={formatDate(
                interview.interview
                  .date
              )}
            />

            <InformationCard
              icon={
                <Clock3 size={17} />
              }
              title="Time"
              value={formatTime(
                interview.interview
                  .time
              )}
            />

            <InformationCard
              icon={
                <ModeIcon
                  size={17}
                />
              }
              title="Mode"
              value={
                interview.interview
                  .mode
              }
            />

            <InformationCard
              icon={
                <User size={17} />
              }
              title="Interviewer"
              value={
                interview.interview
                  .interviewer
              }
            />

            <InformationCard
              icon={
                <Phone size={17} />
              }
              title="Candidate Phone"
              value={
                interview.student
                  .phone
              }
            />
          </div>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <MessageSquare
                size={19}
              />

              Meeting Details
            </h3>

            <p className="mt-3 whitespace-pre-line rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
              {interview.interview
                .details ||
                "No meeting link or instructions were provided."}
            </p>
          </section>

          <span
            className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold ${
              statusStyles[
                displayStatus
              ]
            }`}
          >
            {displayStatus}
          </span>
        </div>

        {displayStatus !==
          "Completed" && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
            <button
              type="button"
              onClick={() =>
                onReschedule(
                  interview
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700"
            >
              <RotateCcw
                size={18}
              />

              Reschedule
            </button>

            <button
              type="button"
              onClick={() =>
                onCancel(interview)
              }
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white"
            >
              <XCircle size={18} />

              Cancel Interview
            </button>
          </div>
        )}
      </div>
    </div>
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

export default Interviews;