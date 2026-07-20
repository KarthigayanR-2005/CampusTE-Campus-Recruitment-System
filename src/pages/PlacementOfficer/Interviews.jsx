import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  GraduationCap,
  Mail,
  MapPin,
  MessageSquare,
  MoreVertical,
  Phone,
  RotateCcw,
  Search,
  Trash2,
  User,
  Users,
  Video,
  X,
  XCircle,
} from "lucide-react";

const initialInterviews = [
  {
    id: 1,
    studentName: "Arjun Kumar",
    registerNumber: "CB.EN.U4CSE23001",
    email: "arjun.kumar@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science and Engineering",
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    round: "Technical Round",
    date: "2026-07-22",
    time: "10:00",
    duration: "60 Minutes",
    mode: "Online",
    platform: "Google Meet",
    venue: "Online Meeting",
    interviewer: "Arvind Kumar",
    coordinator: "Dr. Meenakshi Rao",
    status: "Scheduled",
    result: "Pending",
    notes:
      "Evaluate data structures, algorithms, React fundamentals and backend development knowledge.",
  },
  {
    id: 2,
    studentName: "Priya Sharma",
    registerNumber: "CB.EN.U4CSE23014",
    email: "priya.sharma@college.edu",
    phone: "+91 91234 56780",
    department: "Computer Science and Engineering",
    company: "CodeBridge Labs",
    role: "Frontend Developer Intern",
    round: "HR Round",
    date: "2026-07-22",
    time: "14:30",
    duration: "30 Minutes",
    mode: "On Campus",
    platform: "In Person",
    venue: "Placement Conference Room",
    interviewer: "Ananya Sharma",
    coordinator: "Prof. Arun Kumar",
    status: "Scheduled",
    result: "Pending",
    notes:
      "Discuss communication skills, internship expectations, availability and career objectives.",
  },
  {
    id: 3,
    studentName: "Rahul Menon",
    registerNumber: "CB.EN.U4AIE23008",
    email: "rahul.menon@college.edu",
    phone: "+91 99887 66554",
    department: "Artificial Intelligence and Data Science",
    company: "DataCraft Analytics",
    role: "Data Analyst",
    round: "Technical Round",
    date: "2026-07-23",
    time: "11:00",
    duration: "45 Minutes",
    mode: "Online",
    platform: "Microsoft Teams",
    venue: "Online Meeting",
    interviewer: "Meera Shah",
    coordinator: "Dr. Lakshmi Priya",
    status: "Scheduled",
    result: "Pending",
    notes:
      "Focus on SQL queries, Python, data visualisation, statistics and analytical reasoning.",
  },
  {
    id: 4,
    studentName: "Meera Nair",
    registerNumber: "CB.EN.U4CSE23029",
    email: "meera.nair@college.edu",
    phone: "+91 97772 31145",
    department: "Computer Science and Engineering",
    company: "SecureGrid Networks",
    role: "Cybersecurity Analyst",
    round: "Managerial Round",
    date: "2026-07-18",
    time: "09:30",
    duration: "45 Minutes",
    mode: "On Campus",
    platform: "In Person",
    venue: "Cybersecurity Laboratory",
    interviewer: "Nitin Rao",
    coordinator: "Dr. Nandhini R",
    status: "Completed",
    result: "Selected",
    notes:
      "Candidate demonstrated strong security fundamentals, Linux knowledge and incident-response skills.",
  },
  {
    id: 5,
    studentName: "Vikram Singh",
    registerNumber: "CB.EN.U4IT23018",
    email: "vikram.singh@college.edu",
    phone: "+91 96661 27890",
    department: "Information Technology",
    company: "TechNova Solutions",
    role: "Backend Developer",
    round: "Technical Round",
    date: "2026-07-19",
    time: "15:00",
    duration: "60 Minutes",
    mode: "Online",
    platform: "Zoom",
    venue: "Online Meeting",
    interviewer: "Rohit Verma",
    coordinator: "Dr. Meenakshi Rao",
    status: "Completed",
    result: "Next Round",
    notes:
      "Strong Node.js and database knowledge. Recommended for managerial interview.",
  },
  {
    id: 6,
    studentName: "Divya Krishnan",
    registerNumber: "CB.EN.U4CSE23036",
    email: "divya.krishnan@college.edu",
    phone: "+91 95555 22441",
    department: "Computer Science and Engineering",
    company: "CodeBridge Labs",
    role: "Frontend Developer",
    round: "Portfolio Review",
    date: "2026-07-24",
    time: "13:30",
    duration: "45 Minutes",
    mode: "Online",
    platform: "Google Meet",
    venue: "Online Meeting",
    interviewer: "Divya Rao",
    coordinator: "Prof. Revathi M",
    status: "Rescheduled",
    result: "Pending",
    notes:
      "Review frontend projects, responsive design, accessibility and component architecture.",
  },
  {
    id: 7,
    studentName: "Sneha Reddy",
    registerNumber: "CB.EN.U4ECE23021",
    email: "sneha.reddy@college.edu",
    phone: "+91 90000 11223",
    department: "Electronics and Communication Engineering",
    company: "CloudAxis Systems",
    role: "Cloud Support Associate",
    round: "Technical Round",
    date: "2026-07-21",
    time: "16:00",
    duration: "45 Minutes",
    mode: "Phone",
    platform: "Phone Interview",
    venue: "Phone",
    interviewer: "Karan Malhotra",
    coordinator: "Prof. Karthik S",
    status: "Cancelled",
    result: "Not Evaluated",
    notes:
      "Interview cancelled because the candidate was unavailable during the scheduled time.",
  },
  {
    id: 8,
    studentName: "Sanjay Krishnan",
    registerNumber: "CB.EN.U4AIE23016",
    email: "sanjay.krishnan@college.edu",
    phone: "+91 94444 66552",
    department: "Artificial Intelligence and Data Science",
    company: "DataCraft Analytics",
    role: "Machine Learning Engineer",
    round: "Final Round",
    date: "2026-07-25",
    time: "10:30",
    duration: "60 Minutes",
    mode: "On Campus",
    platform: "In Person",
    venue: "Main Administrative Block",
    interviewer: "Sanjay Patel",
    coordinator: "Dr. Lakshmi Priya",
    status: "Scheduled",
    result: "Pending",
    notes:
      "Final technical and managerial discussion for the machine-learning engineer position.",
  },
  {
    id: 9,
    studentName: "Lakshmi Narayanan",
    registerNumber: "CB.EN.U4IT23024",
    email: "lakshmi.n@college.edu",
    phone: "+91 93333 77661",
    department: "Information Technology",
    company: "DesignLoop Studios",
    role: "UI/UX Developer",
    round: "Design Round",
    date: "2026-07-26",
    time: "12:00",
    duration: "60 Minutes",
    mode: "Online",
    platform: "Microsoft Teams",
    venue: "Online Meeting",
    interviewer: "Sneha Kapoor",
    coordinator: "Prof. Revathi M",
    status: "Scheduled",
    result: "Pending",
    notes:
      "Evaluate design thinking, prototyping, user research and frontend implementation skills.",
  },
];

const statusStyles = {
  Scheduled: "border-blue-200 bg-blue-50 text-blue-700",
  Rescheduled: "border-amber-200 bg-amber-50 text-amber-700",
  Completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

const resultStyles = {
  Pending: "bg-neutral-100 text-neutral-600",
  Selected: "bg-emerald-50 text-emerald-700",
  "Next Round": "bg-purple-50 text-purple-700",
  Rejected: "bg-rose-50 text-rose-700",
  "Not Evaluated": "bg-neutral-100 text-neutral-600",
};

const emptyInterviewForm = {
  studentName: "",
  registerNumber: "",
  email: "",
  phone: "",
  department: "Computer Science and Engineering",
  company: "",
  role: "",
  round: "Technical Round",
  date: "",
  time: "",
  duration: "45 Minutes",
  mode: "Online",
  platform: "Google Meet",
  venue: "Online Meeting",
  interviewer: "",
  coordinator: "",
  notes: "",
};

function Interviews() {
  const [interviews, setInterviews] = useState(initialInterviews);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All Companies");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [roundFilter, setRoundFilter] = useState("All Rounds");
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [rescheduleInterview, setRescheduleInterview] = useState(null);
  const [interviewForm, setInterviewForm] =
    useState(emptyInterviewForm);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: "",
    time: "",
    mode: "Online",
    platform: "Google Meet",
    venue: "Online Meeting",
    interviewer: "",
  });
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const interviewsPerPage = 6;

  const companyOptions = useMemo(
    () => [
      "All Companies",
      ...new Set(interviews.map((interview) => interview.company)),
    ],
    [interviews]
  );

  const roundOptions = useMemo(
    () => [
      "All Rounds",
      ...new Set(interviews.map((interview) => interview.round)),
    ],
    [interviews]
  );

  const filteredInterviews = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return interviews.filter((interview) => {
      const matchesSearch =
        interview.studentName.toLowerCase().includes(query) ||
        interview.registerNumber.toLowerCase().includes(query) ||
        interview.company.toLowerCase().includes(query) ||
        interview.role.toLowerCase().includes(query) ||
        interview.interviewer.toLowerCase().includes(query);

      const matchesCompany =
        companyFilter === "All Companies" ||
        interview.company === companyFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        interview.status === statusFilter;

      const matchesRound =
        roundFilter === "All Rounds" ||
        interview.round === roundFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesStatus &&
        matchesRound
      );
    });
  }, [
    companyFilter,
    interviews,
    roundFilter,
    searchTerm,
    statusFilter,
  ]);

  const sortedInterviews = useMemo(() => {
    return [...filteredInterviews].sort((first, second) => {
      const firstTime = new Date(
        `${first.date}T${first.time}:00`
      ).getTime();

      const secondTime = new Date(
        `${second.date}T${second.time}:00`
      ).getTime();

      const firstActive =
        first.status === "Scheduled" ||
        first.status === "Rescheduled";

      const secondActive =
        second.status === "Scheduled" ||
        second.status === "Rescheduled";

      if (firstActive && !secondActive) {
        return -1;
      }

      if (!firstActive && secondActive) {
        return 1;
      }

      return firstTime - secondTime;
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
    scheduled: interviews.filter(
      (interview) =>
        interview.status === "Scheduled" ||
        interview.status === "Rescheduled"
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

  const formatDate = (date) => {
    if (!date) {
      return "-";
    }

    return new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const formatTime = (time) => {
    if (!time) {
      return "-";
    }

    return new Intl.DateTimeFormat("en-IN", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(`2026-01-01T${time}:00`));
  };

  const getModeIcon = (mode) => {
    if (mode === "On Campus") {
      return MapPin;
    }

    if (mode === "Phone") {
      return Phone;
    }

    return Video;
  };

  const updateInterviewStatus = (interviewId, status) => {
    setInterviews((previousInterviews) =>
      previousInterviews.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              status,
              result:
                status === "Cancelled"
                  ? "Not Evaluated"
                  : interview.result,
            }
          : interview
      )
    );

    setSelectedInterview((previousInterview) =>
      previousInterview?.id === interviewId
        ? {
            ...previousInterview,
            status,
            result:
              status === "Cancelled"
                ? "Not Evaluated"
                : previousInterview.result,
          }
        : previousInterview
    );

    setOpenMenuId(null);
    showMessage(`Interview marked as ${status}.`);
  };

  const updateInterviewResult = (interviewId, result) => {
    setInterviews((previousInterviews) =>
      previousInterviews.map((interview) =>
        interview.id === interviewId
          ? {
              ...interview,
              status: "Completed",
              result,
            }
          : interview
      )
    );

    setSelectedInterview((previousInterview) =>
      previousInterview?.id === interviewId
        ? {
            ...previousInterview,
            status: "Completed",
            result,
          }
        : previousInterview
    );

    setOpenMenuId(null);
    showMessage(`Interview result updated to ${result}.`);
  };

  const deleteInterview = (interviewId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview schedule?"
    );

    if (!confirmed) {
      return;
    }

    setInterviews((previousInterviews) =>
      previousInterviews.filter(
        (interview) => interview.id !== interviewId
      )
    );

    setSelectedInterview(null);
    setOpenMenuId(null);
    showMessage("Interview schedule deleted successfully.");
  };

  const openRescheduleModal = (interview) => {
    setRescheduleInterview(interview);
    setSelectedInterview(null);
    setOpenMenuId(null);

    setRescheduleForm({
      date: interview.date,
      time: interview.time,
      mode: interview.mode,
      platform: interview.platform,
      venue: interview.venue,
      interviewer: interview.interviewer,
    });
  };

  const handleRescheduleFormChange = (event) => {
    const { name, value } = event.target;

    setRescheduleForm((previousForm) => ({
      ...previousForm,
      [name]: value,
      ...(name === "mode" && value === "Online"
        ? {
            venue: "Online Meeting",
            platform: "Google Meet",
          }
        : {}),
      ...(name === "mode" && value === "On Campus"
        ? {
            platform: "In Person",
            venue: "",
          }
        : {}),
      ...(name === "mode" && value === "Phone"
        ? {
            platform: "Phone Interview",
            venue: "Phone",
          }
        : {}),
    }));
  };

  const handleReschedule = (event) => {
    event.preventDefault();

    if (
      !rescheduleForm.date ||
      !rescheduleForm.time ||
      !rescheduleForm.interviewer.trim()
    ) {
      showMessage(
        "Enter the new date, time and interviewer details."
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
              platform: rescheduleForm.platform,
              venue: rescheduleForm.venue,
              interviewer: rescheduleForm.interviewer,
              status: "Rescheduled",
              result: "Pending",
            }
          : interview
      )
    );

    setRescheduleInterview(null);
    showMessage("Interview rescheduled successfully.");
  };

  const handleInterviewFormChange = (event) => {
    const { name, value } = event.target;

    setInterviewForm((previousForm) => ({
      ...previousForm,
      [name]: value,
      ...(name === "mode" && value === "Online"
        ? {
            platform: "Google Meet",
            venue: "Online Meeting",
          }
        : {}),
      ...(name === "mode" && value === "On Campus"
        ? {
            platform: "In Person",
            venue: "",
          }
        : {}),
      ...(name === "mode" && value === "Phone"
        ? {
            platform: "Phone Interview",
            venue: "Phone",
          }
        : {}),
    }));
  };

  const handleScheduleInterview = (event) => {
    event.preventDefault();

    if (
      !interviewForm.studentName.trim() ||
      !interviewForm.registerNumber.trim() ||
      !interviewForm.company.trim() ||
      !interviewForm.role.trim() ||
      !interviewForm.date ||
      !interviewForm.time ||
      !interviewForm.interviewer.trim()
    ) {
      showMessage(
        "Complete the student, company, schedule and interviewer details."
      );
      return;
    }

    const newInterview = {
      id: Date.now(),
      ...interviewForm,
      status: "Scheduled",
      result: "Pending",
    };

    setInterviews((previousInterviews) => [
      newInterview,
      ...previousInterviews,
    ]);

    setInterviewForm(emptyInterviewForm);
    setShowScheduleModal(false);
    setCurrentPage(1);
    showMessage("Interview scheduled successfully.");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCompanyFilter("All Companies");
    setStatusFilter("All Statuses");
    setRoundFilter("All Rounds");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    const headers = [
      "Student",
      "Register Number",
      "Department",
      "Company",
      "Role",
      "Round",
      "Date",
      "Time",
      "Mode",
      "Interviewer",
      "Status",
      "Result",
    ];

    const rows = interviews.map((interview) => [
      interview.studentName,
      interview.registerNumber,
      interview.department,
      interview.company,
      interview.role,
      interview.round,
      interview.date,
      interview.time,
      interview.mode,
      interview.interviewer,
      interview.status,
      interview.result,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const file = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "placement-interviews.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Interview report exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <CalendarDays size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Interview Coordination
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Interviews
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Coordinate candidate interviews, manage schedules,
                assign interviewers and record recruitment outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export Interviews
              </button>

              <button
                type="button"
                onClick={() => setShowScheduleModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <CalendarPlus size={19} />
                Schedule Interview
              </button>
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
            {stats.scheduled}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Scheduled
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
                Search and manage interviews across all placement
                drives.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_250px_210px_230px]">
            <div className="relative">
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
                  setOpenMenuId(null);
                }}
                placeholder="Search student, company, role or interviewer..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={companyFilter}
              onChange={(event) => {
                setCompanyFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {companyOptions.map((company) => (
                <option key={company}>{company}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
              <option>Scheduled</option>
              <option>Rescheduled</option>
              <option>Completed</option>
              <option>Cancelled</option>
            </select>

            <select
              value={roundFilter}
              onChange={(event) => {
                setRoundFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {roundOptions.map((round) => (
                <option key={round}>{round}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1350px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company and Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Interview Round
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Schedule
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

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Result
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedInterviews.map((interview) => {
                const ModeIcon = getModeIcon(interview.mode);

                return (
                  <tr
                    key={interview.id}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                          {interview.studentName
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">
                            {interview.studentName}
                          </p>

                          <p className="mt-1 text-sm text-neutral-500">
                            {interview.registerNumber}
                          </p>

                          <p className="mt-1 max-w-[210px] text-xs text-neutral-400">
                            {interview.department}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 font-bold text-neutral-900">
                        <Building2
                          size={16}
                          className="text-neutral-400"
                        />
                        {interview.company}
                      </p>

                      <p className="mt-2 max-w-[210px] text-sm text-neutral-600">
                        {interview.role}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-neutral-800">
                        {interview.round}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {interview.duration}
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
                        {interview.platform}
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
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          resultStyles[interview.result]
                        }`}
                      >
                        {interview.result}
                      </span>
                    </td>

                    <td className="relative px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId((previousId) =>
                            previousId === interview.id
                              ? null
                              : interview.id
                          )
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                        aria-label="Open interview actions"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === interview.id && (
                        <div className="absolute right-6 top-14 z-20 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedInterview(interview);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <Eye size={17} />
                            View Details
                          </button>

                          {interview.status !== "Completed" && (
                            <button
                              type="button"
                              onClick={() =>
                                openRescheduleModal(interview)
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                            >
                              <RotateCcw size={17} />
                              Reschedule
                            </button>
                          )}

                          {(interview.status === "Scheduled" ||
                            interview.status === "Rescheduled") && (
                            <button
                              type="button"
                              onClick={() =>
                                updateInterviewStatus(
                                  interview.id,
                                  "Completed"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={17} />
                              Mark Completed
                            </button>
                          )}

                          {interview.status === "Completed" && (
                            <>
                              <button
                                type="button"
                                onClick={() =>
                                  updateInterviewResult(
                                    interview.id,
                                    "Selected"
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                              >
                                <CheckCircle2 size={17} />
                                Mark Selected
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateInterviewResult(
                                    interview.id,
                                    "Next Round"
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-purple-700 hover:bg-purple-50"
                              >
                                <CalendarPlus size={17} />
                                Move to Next Round
                              </button>

                              <button
                                type="button"
                                onClick={() =>
                                  updateInterviewResult(
                                    interview.id,
                                    "Rejected"
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                              >
                                <XCircle size={17} />
                                Mark Rejected
                              </button>
                            </>
                          )}

                          {(interview.status === "Scheduled" ||
                            interview.status === "Rescheduled") && (
                            <button
                              type="button"
                              onClick={() =>
                                updateInterviewStatus(
                                  interview.id,
                                  "Cancelled"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                            >
                              <XCircle size={17} />
                              Cancel Interview
                            </button>
                          )}

                          <div className="my-1 border-t border-neutral-100" />

                          <button
                            type="button"
                            onClick={() =>
                              deleteInterview(interview.id)
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 size={17} />
                            Delete Schedule
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedInterviews.map((interview) => {
            const ModeIcon = getModeIcon(interview.mode);

            return (
              <article
                key={interview.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                      {interview.studentName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {interview.studentName}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {interview.company}
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

                <div className="mt-5 space-y-3 text-sm text-neutral-600">
                  <p className="flex items-start gap-2">
                    <Building2
                      size={17}
                      className="mt-0.5 shrink-0"
                    />
                    {interview.role} · {interview.round}
                  </p>

                  <p className="flex items-center gap-2">
                    <CalendarDays size={17} />
                    {formatDate(interview.date)}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={17} />
                    {formatTime(interview.time)} ·{" "}
                    {interview.duration}
                  </p>

                  <p className="flex items-center gap-2">
                    <ModeIcon size={17} />
                    {interview.mode} · {interview.platform}
                  </p>

                  <p className="flex items-center gap-2">
                    <User size={17} />
                    {interview.interviewer}
                  </p>
                </div>

                <div className="mt-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      resultStyles[interview.result]
                    }`}
                  >
                    Result: {interview.result}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedInterview(interview)}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {interview.status !== "Completed" && (
                    <button
                      type="button"
                      onClick={() => openRescheduleModal(interview)}
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                    >
                      <RotateCcw size={16} />
                      Reschedule
                    </button>
                  )}

                  {(interview.status === "Scheduled" ||
                    interview.status === "Rescheduled") && (
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

                  {(interview.status === "Scheduled" ||
                    interview.status === "Rescheduled") && (
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
              Try changing the search query or selected filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Reset Filters
            </button>
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
                  sortedInterviews.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {sortedInterviews.length}
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
                aria-label="Previous page"
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
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedInterview.studentName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedInterview.studentName}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedInterview.registerNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInterview(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close interview details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Mail size={16} />
                    Email
                  </p>

                  <p className="mt-2 break-all font-medium text-neutral-900">
                    {selectedInterview.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <GraduationCap size={16} />
                    Department
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.department}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Users size={16} />
                    Coordinator
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInterview.coordinator}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Job Information
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="flex items-center gap-2 font-bold text-neutral-900">
                      <Building2 size={18} />
                      {selectedInterview.company}
                    </p>

                    <p className="mt-3 text-neutral-600">
                      {selectedInterview.role}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-purple-700">
                      {selectedInterview.round}
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Interview Schedule
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="flex items-center gap-2 font-bold text-neutral-900">
                      <CalendarDays size={18} />
                      {formatDate(selectedInterview.date)}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-neutral-600">
                      <Clock3 size={17} />
                      {formatTime(selectedInterview.time)} ·{" "}
                      {selectedInterview.duration}
                    </p>

                    <p className="mt-3 flex items-start gap-2 text-neutral-600">
                      <MapPin
                        size={17}
                        className="mt-0.5 shrink-0"
                      />
                      {selectedInterview.venue}
                    </p>
                  </div>
                </section>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Interview Mode
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedInterview.mode}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedInterview.platform}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Interviewer
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedInterview.interviewer}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Status and Result
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[selectedInterview.status]
                      }`}
                    >
                      {selectedInterview.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        resultStyles[selectedInterview.result]
                      }`}
                    >
                      {selectedInterview.result}
                    </span>
                  </div>
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
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedInterview.status !== "Completed" && (
                <button
                  type="button"
                  onClick={() =>
                    openRescheduleModal(selectedInterview)
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-amber-300 px-4 py-3 font-semibold text-amber-700 hover:bg-amber-50"
                >
                  <RotateCcw size={18} />
                  Reschedule
                </button>
              )}

              {(selectedInterview.status === "Scheduled" ||
                selectedInterview.status === "Rescheduled") && (
                <button
                  type="button"
                  onClick={() =>
                    updateInterviewStatus(
                      selectedInterview.id,
                      "Cancelled"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <XCircle size={18} />
                  Cancel
                </button>
              )}

              {(selectedInterview.status === "Scheduled" ||
                selectedInterview.status === "Rescheduled") && (
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

              {selectedInterview.status === "Completed" &&
                selectedInterview.result !== "Selected" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateInterviewResult(
                        selectedInterview.id,
                        "Selected"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
                  >
                    <CheckCircle2 size={18} />
                    Mark Selected
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
            className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Reschedule Interview
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  {rescheduleInterview.studentName} ·{" "}
                  {rescheduleInterview.company}
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

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  New Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={rescheduleForm.date}
                  onChange={handleRescheduleFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  New Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={rescheduleForm.time}
                  onChange={handleRescheduleFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Mode
                </label>

                <select
                  name="mode"
                  value={rescheduleForm.mode}
                  onChange={handleRescheduleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Online</option>
                  <option>On Campus</option>
                  <option>Phone</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Platform
                </label>

                <input
                  type="text"
                  name="platform"
                  value={rescheduleForm.platform}
                  onChange={handleRescheduleFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={rescheduleForm.venue}
                  onChange={handleRescheduleFormChange}
                  placeholder="Enter interview venue"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interviewer
                </label>

                <input
                  type="text"
                  name="interviewer"
                  value={rescheduleForm.interviewer}
                  onChange={handleRescheduleFormChange}
                  placeholder="Enter interviewer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
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
                <RotateCcw size={18} />
                Save New Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleScheduleInterview}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Schedule Interview
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Add student, company, interview round and schedule
                  details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowScheduleModal(false);
                  setInterviewForm(emptyInterviewForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close interview form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Student Name
                </label>

                <input
                  type="text"
                  name="studentName"
                  value={interviewForm.studentName}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter student name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Register Number
                </label>

                <input
                  type="text"
                  name="registerNumber"
                  value={interviewForm.registerNumber}
                  onChange={handleInterviewFormChange}
                  placeholder="CB.EN.U4CSE23000"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={interviewForm.email}
                  onChange={handleInterviewFormChange}
                  placeholder="student@college.edu"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Phone Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={interviewForm.phone}
                  onChange={handleInterviewFormChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Department
                </label>

                <select
                  name="department"
                  value={interviewForm.department}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>
                    Computer Science and Engineering
                  </option>
                  <option>Information Technology</option>
                  <option>
                    Artificial Intelligence and Data Science
                  </option>
                  <option>
                    Electronics and Communication Engineering
                  </option>
                  <option>
                    Electrical and Electronics Engineering
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company
                </label>

                <input
                  type="text"
                  name="company"
                  value={interviewForm.company}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter company name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Job Role
                </label>

                <input
                  type="text"
                  name="role"
                  value={interviewForm.role}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter job role"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Round
                </label>

                <select
                  name="round"
                  value={interviewForm.round}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Technical Round</option>
                  <option>HR Round</option>
                  <option>Managerial Round</option>
                  <option>Portfolio Review</option>
                  <option>Design Round</option>
                  <option>Final Round</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Duration
                </label>

                <select
                  name="duration"
                  value={interviewForm.duration}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>30 Minutes</option>
                  <option>45 Minutes</option>
                  <option>60 Minutes</option>
                  <option>90 Minutes</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={interviewForm.date}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={interviewForm.time}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Mode
                </label>

                <select
                  name="mode"
                  value={interviewForm.mode}
                  onChange={handleInterviewFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Online</option>
                  <option>On Campus</option>
                  <option>Phone</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Platform
                </label>

                <input
                  type="text"
                  name="platform"
                  value={interviewForm.platform}
                  onChange={handleInterviewFormChange}
                  placeholder="Google Meet"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={interviewForm.venue}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter meeting venue"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interviewer
                </label>

                <input
                  type="text"
                  name="interviewer"
                  value={interviewForm.interviewer}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter interviewer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Placement Coordinator
                </label>

                <input
                  type="text"
                  name="coordinator"
                  value={interviewForm.coordinator}
                  onChange={handleInterviewFormChange}
                  placeholder="Enter coordinator name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Interview Notes
                </label>

                <textarea
                  name="notes"
                  value={interviewForm.notes}
                  onChange={handleInterviewFormChange}
                  rows={5}
                  placeholder="Add interview instructions and evaluation focus..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowScheduleModal(false);
                  setInterviewForm(emptyInterviewForm);
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <CalendarPlus size={18} />
                Schedule Interview
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Interviews;