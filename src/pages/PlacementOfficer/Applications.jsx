import { useMemo, useState } from "react";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Download,
  Eye,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Search,
  Send,
  Star,
  UserCheck,
  Users,
  UserX,
  X,
  XCircle,
} from "lucide-react";

const initialApplications = [
  {
    id: 1,
    studentName: "Arjun Kumar",
    registerNumber: "CB.EN.U4CSE23001",
    email: "arjun.kumar@college.edu",
    phone: "+91 98765 43210",
    department: "Computer Science and Engineering",
    cgpa: 8.9,
    backlogs: 0,
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    appliedDate: "2026-07-18",
    status: "Shortlisted",
    eligibility: "Verified",
    resumeScore: 93,
    location: "Coimbatore, Tamil Nadu",
    skills: ["Java", "React", "Node.js", "MySQL"],
    notes:
      "Strong full-stack development profile with good academic performance and relevant internship experience.",
  },
  {
    id: 2,
    studentName: "Priya Sharma",
    registerNumber: "CB.EN.U4CSE23014",
    email: "priya.sharma@college.edu",
    phone: "+91 91234 56780",
    department: "Computer Science and Engineering",
    cgpa: 9.2,
    backlogs: 0,
    company: "CodeBridge Labs",
    role: "Frontend Developer Intern",
    appliedDate: "2026-07-17",
    status: "Interview",
    eligibility: "Verified",
    resumeScore: 95,
    location: "Chennai, Tamil Nadu",
    skills: ["React", "JavaScript", "TypeScript", "Figma"],
    notes:
      "Excellent frontend portfolio with strong UI development and accessibility knowledge.",
  },
  {
    id: 3,
    studentName: "Rahul Menon",
    registerNumber: "CB.EN.U4AIE23008",
    email: "rahul.menon@college.edu",
    phone: "+91 99887 66554",
    department: "Artificial Intelligence and Data Science",
    cgpa: 8.6,
    backlogs: 0,
    company: "DataCraft Analytics",
    role: "Data Analyst",
    appliedDate: "2026-07-16",
    status: "Applied",
    eligibility: "Pending",
    resumeScore: 89,
    location: "Kochi, Kerala",
    skills: ["Python", "Pandas", "Power BI", "SQL"],
    notes:
      "Suitable analytics profile. Academic eligibility documents require verification.",
  },
  {
    id: 4,
    studentName: "Sneha Reddy",
    registerNumber: "CB.EN.U4ECE23021",
    email: "sneha.reddy@college.edu",
    phone: "+91 90000 11223",
    department: "Electronics and Communication Engineering",
    cgpa: 7.4,
    backlogs: 1,
    company: "CloudAxis Systems",
    role: "Cloud Support Associate",
    appliedDate: "2026-07-15",
    status: "Applied",
    eligibility: "Verified",
    resumeScore: 78,
    location: "Hyderabad, Telangana",
    skills: ["Linux", "Networking", "Python", "AWS"],
    notes:
      "Eligible candidate with relevant networking and cloud fundamentals.",
  },
  {
    id: 5,
    studentName: "Kavin Raj",
    registerNumber: "CB.EN.U4EEE23011",
    email: "kavin.raj@college.edu",
    phone: "+91 98844 77221",
    department: "Electrical and Electronics Engineering",
    cgpa: 6.2,
    backlogs: 2,
    company: "Infosphere Technologies",
    role: "Graduate Engineer Trainee",
    appliedDate: "2026-07-14",
    status: "Rejected",
    eligibility: "Ineligible",
    resumeScore: 64,
    location: "Coimbatore, Tamil Nadu",
    skills: ["Electrical Systems", "AutoCAD", "Python"],
    notes:
      "Candidate does not satisfy the minimum CGPA and active backlog criteria.",
  },
  {
    id: 6,
    studentName: "Meera Nair",
    registerNumber: "CB.EN.U4CSE23029",
    email: "meera.nair@college.edu",
    phone: "+91 97772 31145",
    department: "Computer Science and Engineering",
    cgpa: 9.0,
    backlogs: 0,
    company: "SecureGrid Networks",
    role: "Cybersecurity Analyst",
    appliedDate: "2026-07-13",
    status: "Selected",
    eligibility: "Verified",
    resumeScore: 94,
    location: "Kochi, Kerala",
    skills: ["Cybersecurity", "Linux", "Wireshark", "Python"],
    notes:
      "Selected after successfully completing technical, security assessment and HR rounds.",
  },
  {
    id: 7,
    studentName: "Vikram Singh",
    registerNumber: "CB.EN.U4IT23018",
    email: "vikram.singh@college.edu",
    phone: "+91 96661 27890",
    department: "Information Technology",
    cgpa: 8.7,
    backlogs: 0,
    company: "TechNova Solutions",
    role: "Backend Developer",
    appliedDate: "2026-07-12",
    status: "Interview",
    eligibility: "Verified",
    resumeScore: 91,
    location: "Bengaluru, Karnataka",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis"],
    notes:
      "Strong backend profile. Managerial interview is currently pending.",
  },
  {
    id: 8,
    studentName: "Divya Krishnan",
    registerNumber: "CB.EN.U4CSE23036",
    email: "divya.krishnan@college.edu",
    phone: "+91 95555 22441",
    department: "Computer Science and Engineering",
    cgpa: 8.3,
    backlogs: 0,
    company: "CodeBridge Labs",
    role: "Frontend Developer",
    appliedDate: "2026-07-11",
    status: "Shortlisted",
    eligibility: "Verified",
    resumeScore: 86,
    location: "Chennai, Tamil Nadu",
    skills: ["HTML", "CSS", "React", "TypeScript"],
    notes:
      "Shortlisted based on frontend projects and good resume relevance.",
  },
  {
    id: 9,
    studentName: "Sanjay Krishnan",
    registerNumber: "CB.EN.U4AIE23016",
    email: "sanjay.krishnan@college.edu",
    phone: "+91 94444 66552",
    department: "Artificial Intelligence and Data Science",
    cgpa: 9.4,
    backlogs: 0,
    company: "DataCraft Analytics",
    role: "Machine Learning Engineer",
    appliedDate: "2026-07-10",
    status: "Selected",
    eligibility: "Verified",
    resumeScore: 97,
    location: "Tiruchirappalli, Tamil Nadu",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    notes:
      "Selected with an excellent technical score and highly relevant machine-learning projects.",
  },
  {
    id: 10,
    studentName: "Lakshmi Narayanan",
    registerNumber: "CB.EN.U4IT23024",
    email: "lakshmi.n@college.edu",
    phone: "+91 93333 77661",
    department: "Information Technology",
    cgpa: 8.8,
    backlogs: 0,
    company: "DesignLoop Studios",
    role: "UI/UX Developer",
    appliedDate: "2026-07-09",
    status: "Applied",
    eligibility: "Pending",
    resumeScore: 88,
    location: "Coimbatore, Tamil Nadu",
    skills: ["React", "Tailwind CSS", "Figma", "TypeScript"],
    notes:
      "Candidate documents and portfolio verification are pending.",
  },
];

const statusStyles = {
  Applied: "border-blue-200 bg-blue-50 text-blue-700",
  Shortlisted: "border-cyan-200 bg-cyan-50 text-cyan-700",
  Interview: "border-purple-200 bg-purple-50 text-purple-700",
  Selected: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const eligibilityStyles = {
  Verified: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Ineligible: "border-rose-200 bg-rose-50 text-rose-700",
};

function Applications() {
  const [applications, setApplications] = useState(initialApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All Companies");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [eligibilityFilter, setEligibilityFilter] =
    useState("All Eligibility");
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const applicationsPerPage = 6;

  const companyOptions = useMemo(
    () => [
      "All Companies",
      ...new Set(
        applications.map((application) => application.company)
      ),
    ],
    [applications]
  );

  const filteredApplications = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return applications.filter((application) => {
      const matchesSearch =
        application.studentName.toLowerCase().includes(query) ||
        application.registerNumber.toLowerCase().includes(query) ||
        application.company.toLowerCase().includes(query) ||
        application.role.toLowerCase().includes(query) ||
        application.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );

      const matchesCompany =
        companyFilter === "All Companies" ||
        application.company === companyFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        application.status === statusFilter;

      const matchesEligibility =
        eligibilityFilter === "All Eligibility" ||
        application.eligibility === eligibilityFilter;

      return (
        matchesSearch &&
        matchesCompany &&
        matchesStatus &&
        matchesEligibility
      );
    });
  }, [
    applications,
    companyFilter,
    eligibilityFilter,
    searchTerm,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / applicationsPerPage)
  );

  const startIndex = (currentPage - 1) * applicationsPerPage;

  const paginatedApplications = filteredApplications.slice(
    startIndex,
    startIndex + applicationsPerPage
  );

  const stats = {
    total: applications.length,
    pending: applications.filter(
      (application) => application.eligibility === "Pending"
    ).length,
    shortlisted: applications.filter(
      (application) => application.status === "Shortlisted"
    ).length,
    selected: applications.filter(
      (application) => application.status === "Selected"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));

  const updateApplicationStatus = (applicationId, status) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              status,
            }
          : application
      )
    );

    setSelectedApplication((previousApplication) =>
      previousApplication?.id === applicationId
        ? {
            ...previousApplication,
            status,
          }
        : previousApplication
    );

    setOpenMenuId(null);
    showMessage(`Application status updated to ${status}.`);
  };

  const updateEligibility = (applicationId, eligibility) => {
    setApplications((previousApplications) =>
      previousApplications.map((application) =>
        application.id === applicationId
          ? {
              ...application,
              eligibility,
              status:
                eligibility === "Ineligible"
                  ? "Rejected"
                  : application.status,
            }
          : application
      )
    );

    setSelectedApplication((previousApplication) =>
      previousApplication?.id === applicationId
        ? {
            ...previousApplication,
            eligibility,
            status:
              eligibility === "Ineligible"
                ? "Rejected"
                : previousApplication.status,
          }
        : previousApplication
    );

    setOpenMenuId(null);
    showMessage(`Eligibility updated to ${eligibility}.`);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCompanyFilter("All Companies");
    setStatusFilter("All Statuses");
    setEligibilityFilter("All Eligibility");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    const headers = [
      "Student",
      "Register Number",
      "Department",
      "CGPA",
      "Company",
      "Role",
      "Applied Date",
      "Eligibility",
      "Application Status",
      "Resume Score",
    ];

    const rows = applications.map((application) => [
      application.studentName,
      application.registerNumber,
      application.department,
      application.cgpa,
      application.company,
      application.role,
      application.appliedDate,
      application.eligibility,
      application.status,
      application.resumeScore,
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
    anchor.download = "placement-applications.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Application report exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <ClipboardCheck size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Application Monitoring
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Student Applications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Verify student eligibility, monitor application progress
                and manage placement selection outcomes.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
            >
              <Download size={19} />
              Export Applications
            </button>
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
            <ClipboardCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Applications
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <FileText size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.pending}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Pending Verification
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.shortlisted}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Shortlisted
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Award size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.selected}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Selected Students
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Application Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search and review applications across placement drives.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_260px_210px_210px]">
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
                placeholder="Search student, register number, role or skill..."
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
              <option>Applied</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Selected</option>
              <option>Rejected</option>
            </select>

            <select
              value={eligibilityFilter}
              onChange={(event) => {
                setEligibilityFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Eligibility</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Ineligible</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1300px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Student
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company and Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Academic
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Resume Score
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Eligibility
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Applied Date
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedApplications.map((application) => (
                <tr
                  key={application.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                        {application.studentName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {application.studentName}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {application.registerNumber}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          {application.department}
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
                      {application.company}
                    </p>

                    <p className="mt-2 max-w-[220px] text-sm font-medium text-neutral-600">
                      {application.role}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="flex items-center gap-2 font-bold text-neutral-900">
                      <GraduationCap
                        size={17}
                        className="text-neutral-400"
                      />
                      {application.cgpa} CGPA
                    </p>

                    <p
                      className={`mt-2 text-xs font-semibold ${
                        application.backlogs === 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      {application.backlogs} active backlog
                      {application.backlogs === 1 ? "" : "s"}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Star
                        size={17}
                        className="fill-amber-400 text-amber-400"
                      />

                      <span className="text-lg font-bold text-neutral-900">
                        {application.resumeScore}
                      </span>

                      <span className="text-sm text-neutral-500">
                        /100
                      </span>
                    </div>

                    <div className="mt-2 h-2 w-28 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                        style={{
                          width: `${application.resumeScore}%`,
                        }}
                      />
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        eligibilityStyles[application.eligibility]
                      }`}
                    >
                      {application.eligibility}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[application.status]
                      }`}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <p className="flex items-center gap-2 text-sm font-medium text-neutral-700">
                      <CalendarDays
                        size={16}
                        className="text-neutral-400"
                      />
                      {formatDate(application.appliedDate)}
                    </p>
                  </td>

                  <td className="relative px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((previousId) =>
                          previousId === application.id
                            ? null
                            : application.id
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Open application actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === application.id && (
                      <div className="absolute right-6 top-14 z-20 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedApplication(application);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Eye size={17} />
                          View Application
                        </button>

                        {application.eligibility !== "Verified" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateEligibility(
                                application.id,
                                "Verified"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                          >
                            <CheckCircle2 size={17} />
                            Verify Eligibility
                          </button>
                        )}

                        {application.eligibility !== "Ineligible" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateEligibility(
                                application.id,
                                "Ineligible"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <XCircle size={17} />
                            Mark Ineligible
                          </button>
                        )}

                        {application.status !== "Shortlisted" &&
                          application.status !== "Selected" &&
                          application.eligibility === "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "Shortlisted"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-cyan-700 hover:bg-cyan-50"
                            >
                              <UserCheck size={17} />
                              Shortlist Student
                            </button>
                          )}

                        {application.status !== "Interview" &&
                          application.status !== "Selected" &&
                          application.eligibility === "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "Interview"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-purple-700 hover:bg-purple-50"
                            >
                              <Send size={17} />
                              Move to Interview
                            </button>
                          )}

                        {application.status !== "Selected" &&
                          application.eligibility === "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateApplicationStatus(
                                  application.id,
                                  "Selected"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <Award size={17} />
                              Mark Selected
                            </button>
                          )}

                        {application.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateApplicationStatus(
                                application.id,
                                "Rejected"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <UserX size={17} />
                            Reject Application
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedApplications.map((application) => (
            <article
              key={application.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                    {application.studentName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {application.studentName}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {application.registerNumber}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[application.status]
                  }`}
                >
                  {application.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <p className="flex items-start gap-2">
                  <BriefcaseBusiness
                    size={17}
                    className="mt-0.5 shrink-0"
                  />
                  {application.company} · {application.role}
                </p>

                <p className="flex items-center gap-2">
                  <GraduationCap size={17} />
                  {application.cgpa} CGPA · {application.backlogs}{" "}
                  backlog
                  {application.backlogs === 1 ? "" : "s"}
                </p>

                <p className="flex items-center gap-2">
                  <Star
                    size={17}
                    className="fill-amber-400 text-amber-400"
                  />
                  Resume score: {application.resumeScore}/100
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-bold ${
                    eligibilityStyles[application.eligibility]
                  }`}
                >
                  {application.eligibility}
                </span>

                {application.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedApplication(application)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                {application.eligibility !== "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateEligibility(application.id, "Verified")
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                  >
                    <CheckCircle2 size={16} />
                    Verify
                  </button>
                )}

                {application.status !== "Selected" &&
                  application.eligibility === "Verified" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateApplicationStatus(
                          application.id,
                          "Selected"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-purple-50 px-3 py-2 text-sm font-semibold text-purple-700"
                    >
                      <Award size={16} />
                      Select
                    </button>
                  )}

                {application.status !== "Rejected" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        application.id,
                        "Rejected"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                  >
                    <UserX size={16} />
                    Reject
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <ClipboardCheck size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No applications found
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

        {filteredApplications.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + applicationsPerPage,
                  filteredApplications.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredApplications.length}
              </span>{" "}
              applications
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

      {selectedApplication && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedApplication.studentName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedApplication.studentName}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedApplication.registerNumber}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedApplication(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close application details"
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
                    {selectedApplication.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedApplication.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedApplication.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-purple-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-purple-600">
                    <Star size={16} />
                    Resume Score
                  </p>

                  <p className="mt-2 text-2xl font-bold text-purple-700">
                    {selectedApplication.resumeScore}/100
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Academic Information
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="font-bold text-neutral-900">
                      {selectedApplication.department}
                    </p>

                    <p className="mt-3 text-sm text-neutral-600">
                      CGPA:{" "}
                      <span className="font-bold text-neutral-900">
                        {selectedApplication.cgpa}
                      </span>
                    </p>

                    <p className="mt-2 text-sm text-neutral-600">
                      Active Backlogs:{" "}
                      <span className="font-bold text-neutral-900">
                        {selectedApplication.backlogs}
                      </span>
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Applied Opportunity
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="font-bold text-neutral-900">
                      {selectedApplication.company}
                    </p>

                    <p className="mt-2 text-sm text-neutral-600">
                      {selectedApplication.role}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-sm text-neutral-500">
                      <CalendarDays size={16} />
                      Applied on{" "}
                      {formatDate(selectedApplication.appliedDate)}
                    </p>
                  </div>
                </section>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Technical Skills
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedApplication.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Placement Officer Notes
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedApplication.notes}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <article className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Eligibility
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                      eligibilityStyles[
                        selectedApplication.eligibility
                      ]
                    }`}
                  >
                    {selectedApplication.eligibility}
                  </span>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Application Status
                  </p>

                  <span
                    className={`mt-3 inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[selectedApplication.status]
                    }`}
                  >
                    {selectedApplication.status}
                  </span>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Resume
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      showMessage(
                        `Opening resume for ${selectedApplication.studentName}.`
                      )
                    }
                    className="mt-3 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
                  >
                    <FileText size={17} />
                    View Resume
                  </button>
                </article>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedApplication.eligibility !== "Verified" && (
                <button
                  type="button"
                  onClick={() =>
                    updateEligibility(
                      selectedApplication.id,
                      "Verified"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-4 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <CheckCircle2 size={18} />
                  Verify Eligibility
                </button>
              )}

              {selectedApplication.status !== "Rejected" && (
                <button
                  type="button"
                  onClick={() =>
                    updateApplicationStatus(
                      selectedApplication.id,
                      "Rejected"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <UserX size={18} />
                  Reject
                </button>
              )}

              {selectedApplication.status !== "Selected" &&
                selectedApplication.eligibility === "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateApplicationStatus(
                        selectedApplication.id,
                        "Selected"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
                  >
                    <Award size={18} />
                    Mark Selected
                  </button>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Applications;