import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Edit3,
  Eye,
  GraduationCap,
  MapPin,
  MoreVertical,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
  XCircle,
} from "lucide-react";

const initialDrives = [
  {
    id: 1,
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    package: "₹8 - ₹12 LPA",
    date: "2026-07-23",
    time: "09:30",
    venue: "Main Seminar Hall",
    mode: "On Campus",
    eligibleStudents: 186,
    registeredStudents: 142,
    shortlistedStudents: 48,
    offersReleased: 0,
    minimumCgpa: 7.0,
    eligibleBranches: ["CSE", "IT", "AI & DS"],
    registrationDeadline: "2026-07-21",
    status: "Upcoming",
    coordinator: "Dr. Meenakshi Rao",
    description:
      "Campus recruitment drive for software engineering roles involving coding assessment, technical interview and HR discussion.",
  },
  {
    id: 2,
    company: "Infosphere Technologies",
    role: "Graduate Engineer Trainee",
    department: "Technology Services",
    employmentType: "Full-time",
    package: "₹6.5 LPA",
    date: "2026-07-25",
    time: "10:00",
    venue: "Block B Auditorium",
    mode: "On Campus",
    eligibleStudents: 224,
    registeredStudents: 178,
    shortlistedStudents: 0,
    offersReleased: 0,
    minimumCgpa: 6.5,
    eligibleBranches: ["CSE", "IT", "ECE", "EEE", "AI & DS"],
    registrationDeadline: "2026-07-22",
    status: "Upcoming",
    coordinator: "Prof. Arun Kumar",
    description:
      "Graduate recruitment programme consisting of aptitude assessment, group discussion and technical interview.",
  },
  {
    id: 3,
    company: "DataCraft Analytics",
    role: "Data Analyst",
    department: "Analytics",
    employmentType: "Full-time",
    package: "₹7 - ₹9 LPA",
    date: "2026-07-28",
    time: "11:30",
    venue: "Online Assessment",
    mode: "Online",
    eligibleStudents: 112,
    registeredStudents: 96,
    shortlistedStudents: 0,
    offersReleased: 0,
    minimumCgpa: 7.5,
    eligibleBranches: ["CSE", "IT", "AI & DS"],
    registrationDeadline: "2026-07-24",
    status: "Registration Open",
    coordinator: "Dr. Lakshmi Priya",
    description:
      "Data analytics recruitment drive evaluating Python, SQL, statistics and data-visualisation skills.",
  },
  {
    id: 4,
    company: "CloudAxis Systems",
    role: "Cloud Support Associate",
    department: "Cloud Operations",
    employmentType: "Full-time",
    package: "₹5 - ₹8 LPA",
    date: "2026-08-01",
    time: "09:00",
    venue: "Placement Lab",
    mode: "Hybrid",
    eligibleStudents: 154,
    registeredStudents: 109,
    shortlistedStudents: 0,
    offersReleased: 0,
    minimumCgpa: 6.5,
    eligibleBranches: ["CSE", "IT", "ECE"],
    registrationDeadline: "2026-07-27",
    status: "Registration Open",
    coordinator: "Prof. Karthik S",
    description:
      "Recruitment programme for cloud support positions covering networking, Linux, AWS fundamentals and communication.",
  },
  {
    id: 5,
    company: "SecureGrid Networks",
    role: "Cybersecurity Analyst",
    department: "Information Security",
    employmentType: "Full-time",
    package: "₹7 - ₹11 LPA",
    date: "2026-07-15",
    time: "10:30",
    venue: "Cybersecurity Laboratory",
    mode: "On Campus",
    eligibleStudents: 118,
    registeredStudents: 91,
    shortlistedStudents: 24,
    offersReleased: 12,
    minimumCgpa: 7.0,
    eligibleBranches: ["CSE", "IT", "ECE"],
    registrationDeadline: "2026-07-11",
    status: "Completed",
    coordinator: "Dr. Nandhini R",
    description:
      "Cybersecurity hiring drive involving network security assessment, technical interview and managerial discussion.",
  },
  {
    id: 6,
    company: "DesignLoop Studios",
    role: "UI/UX Designer",
    department: "Product Design",
    employmentType: "Full-time",
    package: "₹6 - ₹9 LPA",
    date: "2026-07-12",
    time: "13:00",
    venue: "Design Studio",
    mode: "On Campus",
    eligibleStudents: 76,
    registeredStudents: 54,
    shortlistedStudents: 16,
    offersReleased: 7,
    minimumCgpa: 6.5,
    eligibleBranches: ["CSE", "IT"],
    registrationDeadline: "2026-07-08",
    status: "Completed",
    coordinator: "Prof. Revathi M",
    description:
      "Design recruitment drive focusing on portfolio evaluation, design thinking, prototyping and communication.",
  },
  {
    id: 7,
    company: "Finovate Technologies",
    role: "Backend Developer",
    department: "Platform Engineering",
    employmentType: "Full-time",
    package: "₹9 - ₹13 LPA",
    date: "2026-08-05",
    time: "10:00",
    venue: "To be announced",
    mode: "Hybrid",
    eligibleStudents: 0,
    registeredStudents: 0,
    shortlistedStudents: 0,
    offersReleased: 0,
    minimumCgpa: 7.5,
    eligibleBranches: ["CSE", "IT"],
    registrationDeadline: "2026-07-31",
    status: "Draft",
    coordinator: "Dr. Meenakshi Rao",
    description:
      "Backend engineering recruitment drive currently under preparation.",
  },
  {
    id: 8,
    company: "CodeBridge Labs",
    role: "Frontend Developer",
    department: "Product Engineering",
    employmentType: "Internship",
    package: "₹30,000 per month",
    date: "2026-07-18",
    time: "09:30",
    venue: "Online",
    mode: "Online",
    eligibleStudents: 132,
    registeredStudents: 104,
    shortlistedStudents: 31,
    offersReleased: 0,
    minimumCgpa: 6.5,
    eligibleBranches: ["CSE", "IT", "AI & DS"],
    registrationDeadline: "2026-07-14",
    status: "Cancelled",
    coordinator: "Prof. Arun Kumar",
    description:
      "Frontend internship drive cancelled by the recruiting organization.",
  },
];

const emptyDriveForm = {
  company: "",
  role: "",
  department: "",
  employmentType: "Full-time",
  package: "",
  date: "",
  time: "",
  venue: "",
  mode: "On Campus",
  minimumCgpa: "6.5",
  registrationDeadline: "",
  coordinator: "",
  description: "",
};

const statusStyles = {
  "Registration Open":
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  Upcoming: "border-blue-200 bg-blue-50 text-blue-700",
  Completed: "border-purple-200 bg-purple-50 text-purple-700",
  Draft: "border-amber-200 bg-amber-50 text-amber-700",
  Cancelled: "border-rose-200 bg-rose-50 text-rose-700",
};

const branchOptions = ["CSE", "IT", "AI & DS", "ECE", "EEE"];

function PlacementDrives() {
  const [drives, setDrives] = useState(initialDrives);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [modeFilter, setModeFilter] = useState("All Modes");
  const [selectedDrive, setSelectedDrive] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showCreateDrive, setShowCreateDrive] = useState(false);
  const [driveForm, setDriveForm] = useState(emptyDriveForm);
  const [selectedBranches, setSelectedBranches] = useState([
    "CSE",
    "IT",
  ]);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const drivesPerPage = 5;

  const filteredDrives = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return drives.filter((drive) => {
      const matchesSearch =
        drive.company.toLowerCase().includes(query) ||
        drive.role.toLowerCase().includes(query) ||
        drive.department.toLowerCase().includes(query) ||
        drive.venue.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || drive.status === statusFilter;

      const matchesMode =
        modeFilter === "All Modes" || drive.mode === modeFilter;

      return matchesSearch && matchesStatus && matchesMode;
    });
  }, [drives, modeFilter, searchTerm, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDrives.length / drivesPerPage)
  );

  const startIndex = (currentPage - 1) * drivesPerPage;

  const paginatedDrives = filteredDrives.slice(
    startIndex,
    startIndex + drivesPerPage
  );

  const stats = {
    total: drives.length,
    open: drives.filter(
      (drive) => drive.status === "Registration Open"
    ).length,
    upcoming: drives.filter(
      (drive) => drive.status === "Upcoming"
    ).length,
    completed: drives.filter(
      (drive) => drive.status === "Completed"
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

  const updateDriveStatus = (driveId, status) => {
    setDrives((previousDrives) =>
      previousDrives.map((drive) =>
        drive.id === driveId
          ? {
              ...drive,
              status,
            }
          : drive
      )
    );

    setSelectedDrive((previousDrive) =>
      previousDrive?.id === driveId
        ? {
            ...previousDrive,
            status,
          }
        : previousDrive
    );

    setOpenMenuId(null);
    showMessage(`Placement drive updated to ${status}.`);
  };

  const deleteDrive = (driveId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this placement drive?"
    );

    if (!confirmed) {
      return;
    }

    setDrives((previousDrives) =>
      previousDrives.filter((drive) => drive.id !== driveId)
    );

    setSelectedDrive(null);
    setOpenMenuId(null);
    showMessage("Placement drive deleted successfully.");
  };

  const duplicateDrive = (drive) => {
    const duplicatedDrive = {
      ...drive,
      id: Date.now(),
      company: `${drive.company}`,
      role: `${drive.role} Copy`,
      status: "Draft",
      eligibleStudents: 0,
      registeredStudents: 0,
      shortlistedStudents: 0,
      offersReleased: 0,
    };

    setDrives((previousDrives) => [
      duplicatedDrive,
      ...previousDrives,
    ]);

    setCurrentPage(1);
    setOpenMenuId(null);
    showMessage("Placement drive duplicated as a draft.");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setModeFilter("All Modes");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleDriveFormChange = (event) => {
    const { name, value } = event.target;

    setDriveForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const toggleBranch = (branch) => {
    setSelectedBranches((previousBranches) =>
      previousBranches.includes(branch)
        ? previousBranches.filter(
            (selectedBranch) => selectedBranch !== branch
          )
        : [...previousBranches, branch]
    );
  };

  const handleCreateDrive = (event) => {
    event.preventDefault();

    if (
      !driveForm.company.trim() ||
      !driveForm.role.trim() ||
      !driveForm.date ||
      !driveForm.time ||
      !driveForm.registrationDeadline
    ) {
      showMessage(
        "Complete company, role, schedule and registration deadline."
      );
      return;
    }

    if (selectedBranches.length === 0) {
      showMessage("Select at least one eligible branch.");
      return;
    }

    const newDrive = {
      id: Date.now(),
      ...driveForm,
      minimumCgpa: Number(driveForm.minimumCgpa),
      eligibleBranches: selectedBranches,
      eligibleStudents: 0,
      registeredStudents: 0,
      shortlistedStudents: 0,
      offersReleased: 0,
      status: "Draft",
    };

    setDrives((previousDrives) => [
      newDrive,
      ...previousDrives,
    ]);

    setDriveForm(emptyDriveForm);
    setSelectedBranches(["CSE", "IT"]);
    setShowCreateDrive(false);
    setCurrentPage(1);
    showMessage("Placement drive created as a draft.");
  };

  const handleExport = () => {
    const headers = [
      "Company",
      "Role",
      "Department",
      "Date",
      "Mode",
      "Venue",
      "Status",
      "Eligible Students",
      "Registered Students",
      "Shortlisted Students",
      "Offers Released",
    ];

    const rows = drives.map((drive) => [
      drive.company,
      drive.role,
      drive.department,
      drive.date,
      drive.mode,
      drive.venue,
      drive.status,
      drive.eligibleStudents,
      drive.registeredStudents,
      drive.shortlistedStudents,
      drive.offersReleased,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replaceAll('"', '""')}"`)
          .join(",")
      )
      .join("\n");

    const file = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "placement-drives.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Placement drive report exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <BriefcaseBusiness size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Recruitment Operations
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Placement Drives
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Create, publish and manage company placement drives,
                student registrations, eligibility and hiring outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export Drives
              </button>

              <button
                type="button"
                onClick={() => setShowCreateDrive(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Plus size={19} />
                Create Drive
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
            <BriefcaseBusiness size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Drives
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Send size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.open}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Registration Open
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <CalendarDays size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.upcoming}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Upcoming Drives
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <CheckCircle2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.completed}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Completed Drives
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Drive Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, filter and manage all campus recruitment drives.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_220px]">
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
                placeholder="Search company, role, department or venue..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Registration Open</option>
              <option>Upcoming</option>
              <option>Completed</option>
              <option>Draft</option>
              <option>Cancelled</option>
            </select>

            <select
              value={modeFilter}
              onChange={(event) => {
                setModeFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Modes</option>
              <option>On Campus</option>
              <option>Online</option>
              <option>Hybrid</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1250px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company and Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Schedule
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Venue
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Registrations
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Hiring Progress
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
              {paginatedDrives.map((drive) => {
                const registrationPercentage =
                  drive.eligibleStudents > 0
                    ? Math.round(
                        (drive.registeredStudents /
                          drive.eligibleStudents) *
                          100
                      )
                    : 0;

                return (
                  <tr
                    key={drive.id}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                          <Building2 size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">
                            {drive.company}
                          </p>

                          <p className="mt-1 max-w-[220px] text-sm font-semibold text-neutral-600">
                            {drive.role}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            {drive.package}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
                        <CalendarDays
                          size={16}
                          className="text-neutral-400"
                        />
                        {formatDate(drive.date)}
                      </p>

                      <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                        <Clock3 size={16} />
                        {formatTime(drive.time)}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="flex max-w-[210px] items-start gap-2 text-sm font-medium text-neutral-700">
                        <MapPin
                          size={16}
                          className="mt-0.5 shrink-0 text-neutral-400"
                        />
                        {drive.venue}
                      </p>

                      <p className="mt-2 pl-6 text-xs text-neutral-500">
                        {drive.mode}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <div className="w-40">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-neutral-600">
                            {drive.registeredStudents}/
                            {drive.eligibleStudents}
                          </span>

                          <span className="font-bold text-blue-700">
                            {registrationPercentage}%
                          </span>
                        </div>

                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="h-full rounded-full bg-blue-600"
                            style={{
                              width: `${registrationPercentage}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="rounded-xl bg-purple-50 px-3 py-2">
                          <p className="font-bold text-purple-700">
                            {drive.shortlistedStudents}
                          </p>

                          <p className="text-[11px] text-purple-600">
                            Shortlisted
                          </p>
                        </div>

                        <div className="rounded-xl bg-emerald-50 px-3 py-2">
                          <p className="font-bold text-emerald-700">
                            {drive.offersReleased}
                          </p>

                          <p className="text-[11px] text-emerald-600">
                            Offers
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyles[drive.status]
                        }`}
                      >
                        {drive.status}
                      </span>
                    </td>

                    <td className="relative px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId((previousId) =>
                            previousId === drive.id
                              ? null
                              : drive.id
                          )
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                        aria-label="Open drive actions"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === drive.id && (
                        <div className="absolute right-6 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDrive(drive);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <Eye size={17} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setOpenMenuId(null);
                              showMessage(
                                `Editing ${drive.company} placement drive.`
                              );
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <Edit3 size={17} />
                            Edit Drive
                          </button>

                          <button
                            type="button"
                            onClick={() => duplicateDrive(drive)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <Plus size={17} />
                            Duplicate Drive
                          </button>

                          {drive.status === "Draft" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateDriveStatus(
                                  drive.id,
                                  "Registration Open"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <Send size={17} />
                              Publish Drive
                            </button>
                          )}

                          {drive.status === "Registration Open" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateDriveStatus(
                                  drive.id,
                                  "Upcoming"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-50"
                            >
                              <CalendarDays size={17} />
                              Close Registration
                            </button>
                          )}

                          {drive.status === "Upcoming" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateDriveStatus(
                                  drive.id,
                                  "Completed"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-purple-700 hover:bg-purple-50"
                            >
                              <CheckCircle2 size={17} />
                              Mark Completed
                            </button>
                          )}

                          {drive.status !== "Cancelled" &&
                            drive.status !== "Completed" && (
                              <button
                                type="button"
                                onClick={() =>
                                  updateDriveStatus(
                                    drive.id,
                                    "Cancelled"
                                  )
                                }
                                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                              >
                                <XCircle size={17} />
                                Cancel Drive
                              </button>
                            )}

                          <div className="my-1 border-t border-neutral-100" />

                          <button
                            type="button"
                            onClick={() => deleteDrive(drive.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 size={17} />
                            Delete Drive
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
          {paginatedDrives.map((drive) => {
            const registrationPercentage =
              drive.eligibleStudents > 0
                ? Math.round(
                    (drive.registeredStudents /
                      drive.eligibleStudents) *
                      100
                  )
                : 0;

            return (
              <article
                key={drive.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Building2 size={20} />
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {drive.company}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {drive.role}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[drive.status]
                    }`}
                  >
                    {drive.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(drive.date)}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {formatTime(drive.time)}
                  </p>

                  <p className="flex items-start gap-2">
                    <MapPin size={16} className="mt-0.5" />
                    {drive.venue}
                  </p>

                  <p className="flex items-center gap-2">
                    <GraduationCap size={16} />
                    Minimum CGPA: {drive.minimumCgpa}
                  </p>
                </div>

                <div className="mt-5 rounded-2xl bg-neutral-50 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-neutral-600">
                      Registrations
                    </span>

                    <span className="font-bold text-blue-700">
                      {drive.registeredStudents}/
                      {drive.eligibleStudents}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-200">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{
                        width: `${registrationPercentage}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDrive(drive)}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {drive.status === "Draft" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateDriveStatus(
                          drive.id,
                          "Registration Open"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <Send size={16} />
                      Publish
                    </button>
                  )}

                  {drive.status === "Upcoming" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateDriveStatus(drive.id, "Completed")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700"
                    >
                      <CheckCircle2 size={16} />
                      Complete
                    </button>
                  )}

                  {drive.status !== "Cancelled" &&
                    drive.status !== "Completed" && (
                      <button
                        type="button"
                        onClick={() =>
                          updateDriveStatus(drive.id, "Cancelled")
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

        {filteredDrives.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <BriefcaseBusiness size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No placement drives found
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

        {filteredDrives.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + drivesPerPage,
                  filteredDrives.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredDrives.length}
              </span>{" "}
              drives
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

      {selectedDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <Building2 size={28} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedDrive.company}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedDrive.role}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDrive(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close drive details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <CalendarDays size={16} />
                    Drive Date
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {formatDate(selectedDrive.date)}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {formatTime(selectedDrive.time)}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Venue
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedDrive.venue}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedDrive.mode}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Package
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedDrive.package}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedDrive.employmentType}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Coordinator
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedDrive.coordinator}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Drive Description
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedDrive.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <Users
                    size={22}
                    className="mx-auto text-blue-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedDrive.eligibleStudents}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Eligible
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <GraduationCap
                    size={22}
                    className="mx-auto text-cyan-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedDrive.registeredStudents}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Registered
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <CheckCircle2
                    size={22}
                    className="mx-auto text-purple-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedDrive.shortlistedStudents}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Shortlisted
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <BriefcaseBusiness
                    size={22}
                    className="mx-auto text-emerald-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedDrive.offersReleased}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Offers
                  </p>
                </article>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Eligibility Criteria
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="text-sm text-neutral-600">
                      Minimum CGPA
                    </p>

                    <p className="mt-1 text-xl font-bold text-neutral-900">
                      {selectedDrive.minimumCgpa}
                    </p>

                    <p className="mt-5 text-sm text-neutral-600">
                      Eligible Branches
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {selectedDrive.eligibleBranches.map((branch) => (
                        <span
                          key={branch}
                          className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700"
                        >
                          {branch}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Registration Details
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="text-sm text-neutral-600">
                      Registration Deadline
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {formatDate(
                        selectedDrive.registrationDeadline
                      )}
                    </p>

                    <p className="mt-5 text-sm text-neutral-600">
                      Current Status
                    </p>

                    <span
                      className={`mt-3 inline-flex rounded-full border px-4 py-2 text-sm font-bold ${
                        statusStyles[selectedDrive.status]
                      }`}
                    >
                      {selectedDrive.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedDrive.status === "Draft" && (
                <button
                  type="button"
                  onClick={() =>
                    updateDriveStatus(
                      selectedDrive.id,
                      "Registration Open"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  <Send size={18} />
                  Publish Drive
                </button>
              )}

              {selectedDrive.status === "Registration Open" && (
                <button
                  type="button"
                  onClick={() =>
                    updateDriveStatus(
                      selectedDrive.id,
                      "Upcoming"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
                >
                  <CalendarDays size={18} />
                  Close Registration
                </button>
              )}

              {selectedDrive.status === "Upcoming" && (
                <button
                  type="button"
                  onClick={() =>
                    updateDriveStatus(
                      selectedDrive.id,
                      "Completed"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
                >
                  <CheckCircle2 size={18} />
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateDrive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleCreateDrive}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Create Placement Drive
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Add the recruitment schedule, eligibility and company
                  details.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowCreateDrive(false);
                  setDriveForm(emptyDriveForm);
                  setSelectedBranches(["CSE", "IT"]);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close create drive form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company Name
                </label>

                <input
                  type="text"
                  name="company"
                  value={driveForm.company}
                  onChange={handleDriveFormChange}
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
                  value={driveForm.role}
                  onChange={handleDriveFormChange}
                  placeholder="Enter job role"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Department
                </label>

                <input
                  type="text"
                  name="department"
                  value={driveForm.department}
                  onChange={handleDriveFormChange}
                  placeholder="Engineering"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Employment Type
                </label>

                <select
                  name="employmentType"
                  value={driveForm.employmentType}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Full-time</option>
                  <option>Internship</option>
                  <option>Graduate Trainee</option>
                  <option>Contract</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Package
                </label>

                <input
                  type="text"
                  name="package"
                  value={driveForm.package}
                  onChange={handleDriveFormChange}
                  placeholder="₹8 - ₹12 LPA"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Drive Mode
                </label>

                <select
                  name="mode"
                  value={driveForm.mode}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>On Campus</option>
                  <option>Online</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Drive Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={driveForm.date}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Drive Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={driveForm.time}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Registration Deadline
                </label>

                <input
                  type="date"
                  name="registrationDeadline"
                  value={driveForm.registrationDeadline}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Minimum CGPA
                </label>

                <input
                  type="number"
                  name="minimumCgpa"
                  min="0"
                  max="10"
                  step="0.1"
                  value={driveForm.minimumCgpa}
                  onChange={handleDriveFormChange}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Venue
                </label>

                <input
                  type="text"
                  name="venue"
                  value={driveForm.venue}
                  onChange={handleDriveFormChange}
                  placeholder="Main Seminar Hall"
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
                  value={driveForm.coordinator}
                  onChange={handleDriveFormChange}
                  placeholder="Coordinator name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-3 block text-sm font-semibold text-neutral-700">
                  Eligible Branches
                </label>

                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {branchOptions.map((branch) => (
                    <label
                      key={branch}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition ${
                        selectedBranches.includes(branch)
                          ? "border-blue-500 bg-blue-50"
                          : "border-neutral-200 hover:border-blue-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBranches.includes(branch)}
                        onChange={() => toggleBranch(branch)}
                        className="h-4 w-4 accent-blue-600"
                      />

                      <span className="text-sm font-semibold text-neutral-700">
                        {branch}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Drive Description
                </label>

                <textarea
                  name="description"
                  value={driveForm.description}
                  onChange={handleDriveFormChange}
                  rows={5}
                  placeholder="Describe the placement drive and selection process..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowCreateDrive(false);
                  setDriveForm(emptyDriveForm);
                  setSelectedBranches(["CSE", "IT"]);
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Plus size={18} />
                Create Drive
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacementDrives;