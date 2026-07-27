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
  ChevronLeft,
  ChevronRight,
  Clock3,
  ExternalLink,
  Eye,
  LoaderCircle,
  MapPin,
  MessageSquare,
  Search,
  User,
  Video,
  X,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  getStudentInterviewRequest,
  getStudentInterviewsRequest,
} from "../../services/studentService";

const statusStyles = {
  upcoming:
    "border-blue-200 bg-blue-50 text-blue-700",

  today:
    "border-purple-200 bg-purple-50 text-purple-700",

  completed:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
};

const modeIcons = {
  "Google Meet": Video,
  "Microsoft Teams": Video,
  Zoom: Video,
  "In Person": MapPin,
  "Phone Interview": Video,
};

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

function getStatusLabel(
  interview
) {
  return (
    interview.displayStatusLabel ||
    (
      interview.displayStatus ===
      "today"
        ? "Today"
        : interview.displayStatus ===
            "completed"
          ? "Completed"
          : "Upcoming"
    )
  );
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

function extractFirstUrl(value) {
  if (!value) {
    return "";
  }

  const match =
    String(value).match(
      /https?:\/\/[^\s]+/i
    );

  return match
    ? match[0].replace(
        /[),.;]+$/,
        ""
      )
    : "";
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
  ] = useState("all");

  const [
    selectedInterview,
    setSelectedInterview,
  ] = useState(null);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isDetailsLoading,
    setIsDetailsLoading,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
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
          await getStudentInterviewsRequest({
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
            "Unable to retrieve your interviews."
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

  const filteredInterviews =
    useMemo(() => {
      const search =
        searchTerm
          .trim()
          .toLowerCase();

      return interviews
        .filter((interview) => {
          const searchText = [
            interview.company
              ?.companyName,

            interview.job
              ?.jobTitle,

            interview.job
              ?.department,

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
            statusFilter === "all" ||
            interview.displayStatus ===
              statusFilter;

          return (
            matchesSearch &&
            matchesJob &&
            matchesStatus
          );
        })
        .sort((first, second) => {
          const firstCompleted =
            first.displayStatus ===
            "completed";

          const secondCompleted =
            second.displayStatus ===
            "completed";

          if (
            !firstCompleted &&
            secondCompleted
          ) {
            return -1;
          }

          if (
            firstCompleted &&
            !secondCompleted
          ) {
            return 1;
          }

          if (
            firstCompleted &&
            secondCompleted
          ) {
            return (
              getInterviewTimestamp(
                second
              ) -
              getInterviewTimestamp(
                first
              )
            );
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
      interviews,
      searchTerm,
      jobFilter,
      statusFilter,
    ]);

  const statistics = {
    total:
      interviews.length,

    upcoming:
      interviews.filter(
        (interview) =>
          interview.displayStatus ===
            "upcoming" ||
          interview.displayStatus ===
            "today"
      ).length,

    today:
      interviews.filter(
        (interview) =>
          interview.displayStatus ===
          "today"
      ).length,

    completed:
      interviews.filter(
        (interview) =>
          interview.displayStatus ===
          "completed"
      ).length,
  };

  const nextInterview =
    interviews
      .filter(
        (interview) =>
          interview.displayStatus ===
            "upcoming" ||
          interview.displayStatus ===
            "today"
      )
      .sort(
        (first, second) =>
          getInterviewTimestamp(
            first
          ) -
          getInterviewTimestamp(
            second
          )
      )[0] || null;

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredInterviews.length /
          interviewsPerPage
      )
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    jobFilter,
    statusFilter,
  ]);

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
    interviewsPerPage;

  const paginatedInterviews =
    filteredInterviews.slice(
      startIndex,
      startIndex +
        interviewsPerPage
    );

  const handleViewInterview =
    async (interview) => {
      setSelectedInterview(
        interview
      );

      setIsDetailsLoading(true);
      setErrorMessage("");

      try {
        const response =
          await getStudentInterviewRequest({
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
          Retrieving your interview
          schedule from MySQL.
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

            <div className="flex-1">
              <p>{errorMessage}</p>

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
                    Interview Centre
                  </p>
                </div>

                <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                  My Interviews
                </h1>

                <p className="mt-3 max-w-2xl text-blue-100">
                  View interview
                  schedules, company
                  details and meeting
                  instructions shared
                  by Recruiters.
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
                          .company
                          .companyName
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
            value={statistics.upcoming}
            style="bg-purple-100 text-purple-700"
          />

          <StatisticCard
            icon={CalendarDays}
            label="Today"
            value={statistics.today}
            style="bg-amber-100 text-amber-700"
          />

          <StatisticCard
            icon={CheckCircle2}
            label="Completed"
            value={statistics.completed}
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
                  Interviews linked to
                  your job applications.
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
                  placeholder="Search company, role or interviewer"
                  className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-3">
                {[
                  {
                    value: "all",
                    label: "All",
                  },

                  {
                    value: "today",
                    label: "Today",
                  },

                  {
                    value: "upcoming",
                    label: "Upcoming",
                  },

                  {
                    value: "completed",
                    label: "Completed",
                  },
                ].map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() =>
                      setStatusFilter(
                        status.value
                      )
                    }
                    className={`rounded-xl px-4 py-2 text-sm font-semibold ${
                      statusFilter ===
                      status.value
                        ? "bg-blue-600 text-white"
                        : "border border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {status.label}
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
                      {job.companyName
                        ? ` · ${job.companyName}`
                        : ""}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>

          {paginatedInterviews.length >
          0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase text-neutral-500">
                      Company
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
                      Action
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
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                                <Building2
                                  size={21}
                                />
                              </div>

                              <div>
                                <p className="font-bold text-neutral-900">
                                  {interview
                                    .company
                                    .companyName ||
                                    "Company"}
                                </p>

                                <p className="mt-1 text-sm text-neutral-500">
                                  {
                                    interview
                                      .job
                                      .location
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-5">
                            <p className="font-semibold text-neutral-900">
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
                                size={16}
                              />

                              {formatDate(
                                interview
                                  .interview
                                  .date
                              )}
                            </p>

                            <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                              <Clock3
                                size={16}
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
                                size={17}
                              />

                              {
                                interview
                                  .interview
                                  .mode
                              }
                            </p>
                          </td>

                          <td className="px-6 py-5">
                            <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                              <User size={17} />

                              {interview
                                .interview
                                .interviewer ||
                                "Not provided"}
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
                              {getStatusLabel(
                                interview
                              )}
                            </span>
                          </td>

                          <td className="px-6 py-5 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                handleViewInterview(
                                  interview
                                )
                              }
                              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                              title="View interview"
                            >
                              <Eye size={18} />
                            </button>
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
                size={44}
                className="mx-auto text-neutral-400"
              />

              <h3 className="mt-5 text-xl font-bold text-neutral-900">
                No interviews found
              </h3>

              <p className="mt-2 text-neutral-600">
                No interview schedules
                currently match your
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
        />
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

function InterviewDetailsModal({
  interview,
  isLoading,
  onClose,
}) {
  const ModeIcon =
    modeIcons[
      interview.interview?.mode
    ] || Video;

  const meetingUrl =
    extractFirstUrl(
      interview.interview?.details
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Interview Details
            </h2>

            <p className="mt-2 text-neutral-600">
              {interview
                .company
                .companyName ||
                "Company"}
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
                <Building2
                  size={17}
                />
              }
              title="Company"
              value={
                interview.company
                  .companyName
              }
            />

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
                <MapPin size={17} />
              }
              title="Job Location"
              value={
                interview.job.location
              }
            />

            <InformationCard
              icon={
                <CheckCircle2
                  size={17}
                />
              }
              title="Status"
              value={getStatusLabel(
                interview
              )}
            />
          </div>

          <section>
            <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
              <MessageSquare
                size={19}
              />

              Meeting Instructions
            </h3>

            <p className="mt-3 whitespace-pre-line rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
              {interview.interview
                .details ||
                "No meeting link, location or instructions were provided."}
            </p>

            {meetingUrl && (
              <a
                href={meetingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <ExternalLink
                  size={18}
                />

                Open Meeting Link
              </a>
            )}
          </section>
        </div>
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