import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
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

const initialInterviews = [
  {
    id: 1,
    candidate: "Rahul Menon",
    email: "rahul.menon@example.com",
    phone: "+91 98765 43210",
    job: "Data Analyst",
    round: "Technical Round",
    date: "2026-07-22",
    time: "10:00",
    duration: "45 minutes",
    mode: "Google Meet",
    interviewer: "Arvind Kumar",
    status: "Upcoming",
    location: "Online",
    notes:
      "Focus on SQL, Python, data visualization and analytical problem-solving.",
  },
  {
    id: 2,
    candidate: "Vikram Singh",
    email: "vikram.singh@example.com",
    phone: "+91 97890 12345",
    job: "Backend Developer",
    round: "Technical Round",
    date: "2026-07-22",
    time: "14:30",
    duration: "60 minutes",
    mode: "Microsoft Teams",
    interviewer: "Meera Shah",
    status: "Upcoming",
    location: "Online",
    notes:
      "Evaluate REST API design, Node.js, PostgreSQL and system design fundamentals.",
  },
  {
    id: 3,
    candidate: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 91234 56780",
    job: "Frontend Developer Intern",
    round: "HR Round",
    date: "2026-07-23",
    time: "11:15",
    duration: "30 minutes",
    mode: "In Person",
    interviewer: "Ananya Sharma",
    status: "Upcoming",
    location: "TechNova Campus, Bengaluru",
    notes:
      "Discuss communication skills, internship expectations and joining availability.",
  },
  {
    id: 4,
    candidate: "Meera Nair",
    email: "meera.nair@example.com",
    phone: "+91 97772 31145",
    job: "Cybersecurity Analyst",
    round: "Security Assessment",
    date: "2026-07-24",
    time: "09:30",
    duration: "60 minutes",
    mode: "Zoom",
    interviewer: "Nitin Rao",
    status: "Upcoming",
    location: "Online",
    notes:
      "Assess networking, Linux, vulnerability analysis and incident response knowledge.",
  },
  {
    id: 5,
    candidate: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    phone: "+91 90000 11122",
    job: "Software Development Engineer",
    round: "Coding Round",
    date: "2026-07-18",
    time: "10:30",
    duration: "90 minutes",
    mode: "Google Meet",
    interviewer: "Sanjay Patel",
    status: "Completed",
    location: "Online",
    notes:
      "Candidate demonstrated strong DSA and React knowledge. Recommended for next round.",
  },
  {
    id: 6,
    candidate: "Lakshmi Narayanan",
    email: "lakshmi.n@example.com",
    phone: "+91 95555 44112",
    job: "Frontend Developer",
    round: "Portfolio Review",
    date: "2026-07-17",
    time: "15:00",
    duration: "45 minutes",
    mode: "Microsoft Teams",
    interviewer: "Divya Rao",
    status: "Completed",
    location: "Online",
    notes:
      "Good UI knowledge and accessibility awareness. Needs improvement in TypeScript.",
  },
  {
    id: 7,
    candidate: "Rohit Kumar",
    email: "rohit.kumar@example.com",
    phone: "+91 98888 23456",
    job: "Cloud Support Associate",
    round: "Technical Round",
    date: "2026-07-16",
    time: "13:00",
    duration: "45 minutes",
    mode: "Phone Interview",
    interviewer: "Karan Malhotra",
    status: "Cancelled",
    location: "Phone",
    notes:
      "Cancelled because the candidate was unavailable. Rescheduling may be considered.",
  },
  {
    id: 8,
    candidate: "Keerthana S",
    email: "keerthana.s@example.com",
    phone: "+91 96666 78231",
    job: "Backend Developer",
    round: "Managerial Round",
    date: "2026-07-25",
    time: "16:00",
    duration: "45 minutes",
    mode: "In Person",
    interviewer: "Vishal Gupta",
    status: "Upcoming",
    location: "TechNova Campus, Bengaluru",
    notes:
      "Evaluate teamwork, project ownership, communication and technical decision-making.",
  },
];

const statusStyles = {
  Upcoming: "border-blue-200 bg-blue-50 text-blue-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

const modeIcons = {
  "Google Meet": Video,
  "Microsoft Teams": Video,
  Zoom: Video,
  "In Person": MapPin,
  "Phone Interview": Phone,
};

function Interviews() {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [rescheduleInterview, setRescheduleInterview] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: "",
    mode: "Google Meet",
    interviewer: "",
    location: "Online",
  });
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const interviewsPerPage = 5;

  const filteredInterviews = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return interviews.filter((interview) => {
      const matchesSearch =
        interview.candidate.toLowerCase().includes(query) ||
        interview.job.toLowerCase().includes(query) ||
        interview.interviewer.toLowerCase().includes(query) ||
        interview.round.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        interview.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [interviews, searchTerm, statusFilter]);

  const sortedInterviews = useMemo(() => {
    return [...filteredInterviews].sort((first, second) => {
      const firstDate = new Date(
        `${first.date}T${first.time}`
      ).getTime();

      const secondDate = new Date(
        `${second.date}T${second.time}`
      ).getTime();

      if (
        first.status === "Upcoming" &&
        second.status !== "Upcoming"
      ) {
        return -1;
      }

      if (
        first.status !== "Upcoming" &&
        second.status === "Upcoming"
      ) {
        return 1;
      }

      return firstDate - secondDate;
    });
  }, [filteredInterviews]);

  const totalPages = Math.max(
    1,
    Math.ceil(sortedInterviews.length / interviewsPerPage)
  );

  const startIndex = (currentPage - 1) * interviewsPerPage;

  const paginatedInterviews = sortedInterviews.slice(
    startIndex,
    startIndex + interviewsPerPage
  );

  const stats = {
    total: interviews.length,
    upcoming: interviews.filter(
      (interview) => interview.status === "Upcoming"
    ).length,
    completed: interviews.filter(
      (interview) => interview.status === "Completed"
    ).length,
    cancelled: interviews.filter(
      (interview) => interview.status === "Cancelled"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateInterviewStatus = (interviewId, status) => {
    setInterviews((previousInterviews) =>
      previousInterviews.map((interview) =>
        interview.id === interviewId
          ? { ...interview, status }
          : interview
      )
    );

    setSelectedInterview((previousInterview) =>
      previousInterview?.id === interviewId
        ? { ...previousInterview, status }
        : previousInterview
    );

    showMessage(`Interview marked as ${status}.`);
  };

  const openRescheduleModal = (interview) => {
    setRescheduleInterview(interview);

    setRescheduleForm({
      date: interview.date,
      time: interview.time,
      mode: interview.mode,
      interviewer: interview.interviewer,
      location: interview.location,
    });

    setSelectedInterview(null);
  };

  const handleReschedule = (event) => {
    event.preventDefault();

    if (
      !rescheduleForm.date ||
      !rescheduleForm.time ||
      !rescheduleForm.interviewer.trim()
    ) {
      showMessage(
        "Enter the interview date, time and interviewer."
      );
      return;
    }

    setInterviews((previousInterviews) =>
      previousInterviews.map((interview) =>
        interview.id === rescheduleInterview.id
          ? {
              ...interview,
              date: rescheduleForm.date,
              time: rescheduleForm.time,
              mode: rescheduleForm.mode,
              interviewer: rescheduleForm.interviewer,
              location:
                rescheduleForm.mode === "In Person"
                  ? rescheduleForm.location
                  : rescheduleForm.mode === "Phone Interview"
                    ? "Phone"
                    : "Online",
              status: "Upcoming",
            }
          : interview
      )
    );

    setRescheduleInterview(null);
    showMessage("Interview rescheduled successfully.");
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));

  const formatTime = (time) =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(`2026-01-01T${time}:00`));

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <CalendarDays size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Interview Management
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Interviews
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage interview schedules, candidate details,
                interviewers, meeting modes and recruitment rounds.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
              <p className="text-sm text-blue-100">
                Next Interview
              </p>

              <p className="mt-1 text-xl font-bold">
                Rahul Menon
              </p>

              <p className="mt-1 text-sm text-blue-100">
                22 Jul · 10:00 AM
              </p>
            </div>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <CalendarDays size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Interviews
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Clock3 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.upcoming}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Upcoming
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.completed}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Completed
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <XCircle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.cancelled}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Cancelled
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Interview Schedule
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                View and manage all candidate interviews.
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
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search candidate, role or interviewer..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {["All", "Upcoming", "Completed", "Cancelled"].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => handleStatusFilter(status)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    statusFilter === status
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-neutral-300 bg-white text-neutral-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Candidate
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Interview
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Date and Time
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Mode
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Interviewer
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedInterviews.map((interview) => {
                const ModeIcon =
                  modeIcons[interview.mode] || Video;

                return (
                  <tr
                    key={interview.id}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                          {interview.candidate
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">
                            {interview.candidate}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {interview.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-neutral-800">
                        {interview.job}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {interview.round}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <CalendarDays
                          size={16}
                          className="text-neutral-400"
                        />
                        {formatDate(interview.date)}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                        <Clock3 size={16} />
                        {formatTime(interview.time)}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <ModeIcon
                          size={17}
                          className="text-neutral-400"
                        />
                        {interview.mode}
                      </p>

                      <p className="mt-1 max-w-[180px] text-xs text-neutral-500">
                        {interview.location}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <User
                          size={17}
                          className="text-neutral-400"
                        />
                        {interview.interviewer}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyles[interview.status]
                        }`}
                      >
                        {interview.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setSelectedInterview(interview)
                          }
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                          aria-label="View interview"
                        >
                          <Eye size={18} />
                        </button>

                        {interview.status !== "Completed" && (
                          <button
                            type="button"
                            onClick={() =>
                              openRescheduleModal(interview)
                            }
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition hover:bg-amber-100"
                            aria-label="Reschedule interview"
                          >
                            <RotateCcw size={18} />
                          </button>
                        )}

                        {interview.status === "Upcoming" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateInterviewStatus(
                                interview.id,
                                "Completed"
                              )
                            }
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition hover:bg-emerald-100"
                            aria-label="Mark completed"
                          >
                            <CheckCircle2 size={18} />
                          </button>
                        )}

                        {interview.status === "Upcoming" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateInterviewStatus(
                                interview.id,
                                "Cancelled"
                              )
                            }
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                            aria-label="Cancel interview"
                          >
                            <XCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedInterviews.map((interview) => {
            const ModeIcon =
              modeIcons[interview.mode] || Video;

            return (
              <article
                key={interview.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                      {interview.candidate
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {interview.candidate}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {interview.job}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[interview.status]
                    }`}
                  >
                    {interview.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={17} />
                    {formatDate(interview.date)}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={17} />
                    {formatTime(interview.time)}
                  </p>

                  <p className="flex items-center gap-2">
                    <ModeIcon size={17} />
                    {interview.mode}
                  </p>

                  <p className="flex items-center gap-2">
                    <User size={17} />
                    {interview.interviewer}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedInterview(interview)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {interview.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() =>
                        openRescheduleModal(interview)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                    >
                      <RotateCcw size={16} />
                      Reschedule
                    </button>
                  )}

                  {interview.status === "Upcoming" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateInterviewStatus(
                          interview.id,
                          "Completed"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <CheckCircle2 size={16} />
                      Complete
                    </button>
                  )}

                  {interview.status === "Upcoming" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateInterviewStatus(
                          interview.id,
                          "Cancelled"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                    >
                      <XCircle size={16} />
                      Cancel
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredInterviews.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <CalendarDays size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No interviews found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing your search or interview status filter.
            </p>
          </div>
        )}

        {filteredInterviews.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + interviewsPerPage,
                  filteredInterviews.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredInterviews.length}
              </span>{" "}
              interviews
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft size={19} />
              </button>

              <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Interview Details
                </h2>

                <p className="mt-2 text-neutral-600">
                  {selectedInterview.candidate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInterview(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedInterview.candidate
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {selectedInterview.candidate}
                  </h3>

                  <p className="mt-1 text-neutral-600">
                    {selectedInterview.email}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <BriefcaseBusiness size={16} />
                    Position
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.job}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Users size={16} />
                    Interview Round
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.round}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <CalendarDays size={16} />
                    Date and Time
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {formatDate(selectedInterview.date)}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {formatTime(selectedInterview.time)}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Clock3 size={16} />
                    Duration
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.duration}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Video size={16} />
                    Mode
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.mode}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedInterview.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <User size={16} />
                    Interviewer
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.interviewer}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
                  <MessageSquare size={19} />
                  Interview Notes
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedInterview.notes}
                </p>
              </div>

              <div>
                <span
                  className={`inline-flex rounded-full border px-4 py-2 text-sm font-bold ${
                    statusStyles[selectedInterview.status]
                  }`}
                >
                  {selectedInterview.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedInterview.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() =>
                    openRescheduleModal(selectedInterview)
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
                >
                  <RotateCcw size={18} />
                  Reschedule
                </button>
              )}

              {selectedInterview.status === "Upcoming" && (
                <button
                  type="button"
                  onClick={() =>
                    updateInterviewStatus(
                      selectedInterview.id,
                      "Completed"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  <CheckCircle2 size={18} />
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {rescheduleInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleReschedule}
            className="w-full max-w-xl rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Reschedule Interview
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  {rescheduleInterview.candidate}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setRescheduleInterview(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
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
                    value={rescheduleForm.date}
                    onChange={(event) =>
                      setRescheduleForm((previousForm) => ({
                        ...previousForm,
                        date: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Time
                  </label>

                  <input
                    type="time"
                    value={rescheduleForm.time}
                    onChange={(event) =>
                      setRescheduleForm((previousForm) => ({
                        ...previousForm,
                        time: event.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Mode
                </label>

                <select
                  value={rescheduleForm.mode}
                  onChange={(event) =>
                    setRescheduleForm((previousForm) => ({
                      ...previousForm,
                      mode: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Google Meet</option>
                  <option>Microsoft Teams</option>
                  <option>Zoom</option>
                  <option>In Person</option>
                  <option>Phone Interview</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interviewer
                </label>

                <input
                  type="text"
                  value={rescheduleForm.interviewer}
                  onChange={(event) =>
                    setRescheduleForm((previousForm) => ({
                      ...previousForm,
                      interviewer: event.target.value,
                    }))
                  }
                  placeholder="Enter interviewer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              {rescheduleForm.mode === "In Person" && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-neutral-700">
                    Interview Location
                  </label>

                  <input
                    type="text"
                    value={rescheduleForm.location}
                    onChange={(event) =>
                      setRescheduleForm((previousForm) => ({
                        ...previousForm,
                        location: event.target.value,
                      }))
                    }
                    placeholder="Enter office or meeting location"
                    className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6">
              <button
                type="button"
                onClick={() => setRescheduleInterview(null)}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <CalendarPlus size={18} />
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Interviews;