import { useMemo, useState } from "react";
import {
  Ban,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileCheck2,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  Users,
  UserSquare2,
  UserX,
  X,
  XCircle,
} from "lucide-react";

const initialRecruiters = [
  {
    id: 1,
    recruiterName: "Ananya Sharma",
    email: "ananya.sharma@technova.com",
    phone: "+91 90000 11223",
    designation: "Senior Talent Acquisition Manager",
    companyName: "TechNova Solutions",
    companyType: "Information Technology",
    companySize: "1000–5000 Employees",
    companyEmail: "careers@technova.com",
    website: "https://technova.example.com",
    location: "Bengaluru, Karnataka",
    registrationNumber: "REC-2026-0027",
    status: "Active",
    verification: "Verified",
    jobsPosted: 18,
    activeJobs: 6,
    applicationsReceived: 1248,
    studentsHired: 84,
    joinedDate: "2025-12-18",
    lastLogin: "20 Jul 2026, 4:20 PM",
    description:
      "Technology company recruiting software engineers, data analysts, cloud engineers and product specialists.",
  },
  {
    id: 2,
    recruiterName: "Meera Shah",
    email: "meera.shah@datacraft.com",
    phone: "+91 99887 66554",
    designation: "Recruitment Lead",
    companyName: "DataCraft Analytics",
    companyType: "Data Analytics",
    companySize: "200–500 Employees",
    companyEmail: "talent@datacraft.com",
    website: "https://datacraft.example.com",
    location: "Chennai, Tamil Nadu",
    registrationNumber: "REC-2026-0142",
    status: "Pending",
    verification: "Pending",
    jobsPosted: 0,
    activeJobs: 0,
    applicationsReceived: 0,
    studentsHired: 0,
    joinedDate: "2026-07-18",
    lastLogin: "Not available",
    description:
      "Analytics company specialising in business intelligence, machine learning and enterprise data solutions.",
  },
  {
    id: 3,
    recruiterName: "Rohit Verma",
    email: "rohit.verma@infosphere.com",
    phone: "+91 91234 56780",
    designation: "Campus Hiring Manager",
    companyName: "Infosphere Technologies",
    companyType: "Software Services",
    companySize: "5000+ Employees",
    companyEmail: "campus@infosphere.com",
    website: "https://infosphere.example.com",
    location: "Hyderabad, Telangana",
    registrationNumber: "REC-2026-0084",
    status: "Active",
    verification: "Verified",
    jobsPosted: 24,
    activeJobs: 8,
    applicationsReceived: 2168,
    studentsHired: 142,
    joinedDate: "2026-02-22",
    lastLogin: "20 Jul 2026, 4:58 PM",
    description:
      "Global software services organisation hiring graduates across engineering, consulting and support roles.",
  },
  {
    id: 4,
    recruiterName: "Sneha Kapoor",
    email: "sneha@finovate.com",
    phone: "+91 96661 27890",
    designation: "Human Resources Manager",
    companyName: "Finovate Technologies",
    companyType: "Financial Technology",
    companySize: "500–1000 Employees",
    companyEmail: "hr@finovate.com",
    website: "https://finovate.example.com",
    location: "Bengaluru, Karnataka",
    registrationNumber: "REC-2026-0157",
    status: "Rejected",
    verification: "Rejected",
    jobsPosted: 0,
    activeJobs: 0,
    applicationsReceived: 0,
    studentsHired: 0,
    joinedDate: "2026-07-17",
    lastLogin: "Not available",
    description:
      "Financial technology organisation developing digital payment, lending and banking platforms.",
  },
  {
    id: 5,
    recruiterName: "Aravind Raj",
    email: "aravind.raj@cloudmatrix.com",
    phone: "+91 94441 22667",
    designation: "University Relations Manager",
    companyName: "CloudMatrix Systems",
    companyType: "Cloud Computing",
    companySize: "1000–5000 Employees",
    companyEmail: "university@cloudmatrix.com",
    website: "https://cloudmatrix.example.com",
    location: "Pune, Maharashtra",
    registrationNumber: "REC-2026-0056",
    status: "Active",
    verification: "Verified",
    jobsPosted: 15,
    activeJobs: 4,
    applicationsReceived: 986,
    studentsHired: 63,
    joinedDate: "2026-01-11",
    lastLogin: "20 Jul 2026, 1:46 PM",
    description:
      "Cloud infrastructure and enterprise platform company recruiting cloud, DevOps and security professionals.",
  },
  {
    id: 6,
    recruiterName: "Neha Kulkarni",
    email: "neha@designloop.com",
    phone: "+91 97772 11990",
    designation: "People Operations Lead",
    companyName: "DesignLoop Studios",
    companyType: "Design and Product",
    companySize: "50–200 Employees",
    companyEmail: "people@designloop.com",
    website: "https://designloop.example.com",
    location: "Mumbai, Maharashtra",
    registrationNumber: "REC-2026-0068",
    status: "Suspended",
    verification: "Verified",
    jobsPosted: 7,
    activeJobs: 0,
    applicationsReceived: 348,
    studentsHired: 21,
    joinedDate: "2026-01-29",
    lastLogin: "15 Jul 2026, 10:15 AM",
    description:
      "Digital design company recruiting UI/UX designers, product designers and frontend developers.",
  },
  {
    id: 7,
    recruiterName: "Vikram Nair",
    email: "vikram.nair@greenenergy.com",
    phone: "+91 95555 88224",
    designation: "Talent Acquisition Specialist",
    companyName: "GreenEnergy Innovations",
    companyType: "Renewable Energy",
    companySize: "500–1000 Employees",
    companyEmail: "careers@greenenergy.com",
    website: "https://greenenergy.example.com",
    location: "Kochi, Kerala",
    registrationNumber: "REC-2026-0116",
    status: "Active",
    verification: "Verified",
    jobsPosted: 9,
    activeJobs: 3,
    applicationsReceived: 624,
    studentsHired: 38,
    joinedDate: "2026-04-08",
    lastLogin: "19 Jul 2026, 5:32 PM",
    description:
      "Renewable energy company hiring electrical, mechanical, software and sustainability graduates.",
  },
  {
    id: 8,
    recruiterName: "Divya Reddy",
    email: "divya.reddy@medilink.com",
    phone: "+91 98880 44339",
    designation: "Campus Recruitment Partner",
    companyName: "MediLink Healthcare",
    companyType: "Healthcare Technology",
    companySize: "200–500 Employees",
    companyEmail: "recruitment@medilink.com",
    website: "https://medilink.example.com",
    location: "Hyderabad, Telangana",
    registrationNumber: "REC-2026-0164",
    status: "Pending",
    verification: "Pending",
    jobsPosted: 0,
    activeJobs: 0,
    applicationsReceived: 0,
    studentsHired: 0,
    joinedDate: "2026-07-19",
    lastLogin: "Not available",
    description:
      "Healthcare technology company developing hospital management, diagnostics and patient engagement platforms.",
  },
];

const emptyRecruiterForm = {
  recruiterName: "",
  email: "",
  phone: "",
  designation: "",
  companyName: "",
  companyType: "Information Technology",
  companySize: "50–200 Employees",
  companyEmail: "",
  website: "",
  location: "",
  description: "",
};

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Suspended: "border-rose-200 bg-rose-50 text-rose-700",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
  Inactive: "border-neutral-300 bg-neutral-100 text-neutral-600",
};

const verificationStyles = {
  Verified: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-rose-50 text-rose-700",
};

function Recruiters() {
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [verificationFilter, setVerificationFilter] =
    useState("All Verification");
  const [industryFilter, setIndustryFilter] =
    useState("All Industries");
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [recruiterForm, setRecruiterForm] =
    useState(emptyRecruiterForm);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recruitersPerPage = 5;

  const industries = useMemo(
    () => [
      "All Industries",
      ...new Set(
        recruiters.map((recruiter) => recruiter.companyType)
      ),
    ],
    [recruiters]
  );

  const filteredRecruiters = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return recruiters.filter((recruiter) => {
      const matchesSearch =
        recruiter.recruiterName.toLowerCase().includes(query) ||
        recruiter.companyName.toLowerCase().includes(query) ||
        recruiter.email.toLowerCase().includes(query) ||
        recruiter.registrationNumber.toLowerCase().includes(query) ||
        recruiter.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        recruiter.status === statusFilter;

      const matchesVerification =
        verificationFilter === "All Verification" ||
        recruiter.verification === verificationFilter;

      const matchesIndustry =
        industryFilter === "All Industries" ||
        recruiter.companyType === industryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification &&
        matchesIndustry
      );
    });
  }, [
    recruiters,
    searchTerm,
    statusFilter,
    verificationFilter,
    industryFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecruiters.length / recruitersPerPage)
  );

  const startIndex = (currentPage - 1) * recruitersPerPage;

  const paginatedRecruiters = filteredRecruiters.slice(
    startIndex,
    startIndex + recruitersPerPage
  );

  const stats = {
    total: recruiters.length,
    active: recruiters.filter(
      (recruiter) => recruiter.status === "Active"
    ).length,
    pending: recruiters.filter(
      (recruiter) => recruiter.verification === "Pending"
    ).length,
    restricted: recruiters.filter(
      (recruiter) =>
        recruiter.status === "Suspended" ||
        recruiter.status === "Rejected"
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

  const updateRecruiterStatus = (recruiterId, status) => {
    setRecruiters((previousRecruiters) =>
      previousRecruiters.map((recruiter) =>
        recruiter.id === recruiterId
          ? {
              ...recruiter,
              status,
            }
          : recruiter
      )
    );

    setSelectedRecruiter((previousRecruiter) =>
      previousRecruiter?.id === recruiterId
        ? {
            ...previousRecruiter,
            status,
          }
        : previousRecruiter
    );

    setOpenMenuId(null);
    showMessage(`Recruiter status updated to ${status}.`);
  };

  const updateVerification = (recruiterId, verification) => {
    setRecruiters((previousRecruiters) =>
      previousRecruiters.map((recruiter) =>
        recruiter.id === recruiterId
          ? {
              ...recruiter,
              verification,
              status:
                verification === "Verified"
                  ? "Active"
                  : verification === "Rejected"
                    ? "Rejected"
                    : recruiter.status,
            }
          : recruiter
      )
    );

    setSelectedRecruiter((previousRecruiter) =>
      previousRecruiter?.id === recruiterId
        ? {
            ...previousRecruiter,
            verification,
            status:
              verification === "Verified"
                ? "Active"
                : verification === "Rejected"
                  ? "Rejected"
                  : previousRecruiter.status,
          }
        : previousRecruiter
    );

    setOpenMenuId(null);
    showMessage(
      `Recruiter verification updated to ${verification}.`
    );
  };

  const deleteRecruiter = (recruiterId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently remove this recruiter?"
    );

    if (!confirmed) {
      return;
    }

    setRecruiters((previousRecruiters) =>
      previousRecruiters.filter(
        (recruiter) => recruiter.id !== recruiterId
      )
    );

    setSelectedRecruiter(null);
    setOpenMenuId(null);
    showMessage("Recruiter removed successfully.");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setRecruiterForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddRecruiter = (event) => {
    event.preventDefault();

    if (
      !recruiterForm.recruiterName.trim() ||
      !recruiterForm.email.trim() ||
      !recruiterForm.companyName.trim() ||
      !recruiterForm.companyEmail.trim() ||
      !recruiterForm.location.trim()
    ) {
      showMessage(
        "Complete all required recruiter and company fields."
      );
      return;
    }

    const emailExists = recruiters.some(
      (recruiter) =>
        recruiter.email.toLowerCase() ===
        recruiterForm.email.toLowerCase()
    );

    if (emailExists) {
      showMessage(
        "A recruiter with this email address already exists."
      );
      return;
    }

    const registrationNumber = `REC-2026-${String(
      recruiters.length + 170
    ).padStart(4, "0")}`;

    const newRecruiter = {
      id: Date.now(),
      ...recruiterForm,
      registrationNumber,
      status: "Pending",
      verification: "Pending",
      jobsPosted: 0,
      activeJobs: 0,
      applicationsReceived: 0,
      studentsHired: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
      lastLogin: "Not available",
    };

    setRecruiters((previousRecruiters) => [
      newRecruiter,
      ...previousRecruiters,
    ]);

    setRecruiterForm(emptyRecruiterForm);
    setShowAddModal(false);
    setCurrentPage(1);
    showMessage(
      "Recruiter added and submitted for verification."
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Statuses");
    setVerificationFilter("All Verification");
    setIndustryFilter("All Industries");
    setOpenMenuId(null);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = [
      "Recruiter",
      "Email",
      "Phone",
      "Designation",
      "Company",
      "Industry",
      "Company Size",
      "Location",
      "Registration Number",
      "Status",
      "Verification",
      "Jobs Posted",
      "Active Jobs",
      "Applications Received",
      "Students Hired",
      "Joined Date",
      "Last Login",
    ];

    const rows = recruiters.map((recruiter) => [
      recruiter.recruiterName,
      recruiter.email,
      recruiter.phone,
      recruiter.designation,
      recruiter.companyName,
      recruiter.companyType,
      recruiter.companySize,
      recruiter.location,
      recruiter.registrationNumber,
      recruiter.status,
      recruiter.verification,
      recruiter.jobsPosted,
      recruiter.activeJobs,
      recruiter.applicationsReceived,
      recruiter.studentsHired,
      recruiter.joinedDate,
      recruiter.lastLogin,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
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
    anchor.download = "campuste-recruiters.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Recruiter directory exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <UserSquare2 size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Recruiter Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Recruiters
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Verify recruiter registrations, manage company access
                and monitor recruitment activity across the platform.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export Recruiters
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Plus size={19} />
                Add Recruiter
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
            <UserSquare2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Registered Recruiters
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.active}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Active Recruiters
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <FileCheck2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.pending}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Pending Verification
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <Ban size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.restricted}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Restricted Recruiters
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Recruiter Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, verify and manage recruiter accounts.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_220px_240px]">
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
                placeholder="Search recruiter, company, email or ID..."
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
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
              <option>Rejected</option>
              <option>Inactive</option>
            </select>

            <select
              value={verificationFilter}
              onChange={(event) => {
                setVerificationFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Verification</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>

            <select
              value={industryFilter}
              onChange={(event) => {
                setIndustryFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {industries.map((industry) => (
                <option key={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1400px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Recruiter
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Recruitment Activity
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Verification
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Last Login
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedRecruiters.map((recruiter) => (
                <tr
                  key={recruiter.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                        {recruiter.recruiterName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {recruiter.recruiterName}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {recruiter.designation}
                        </p>

                        <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                          <Mail size={13} />
                          {recruiter.email}
                        </p>

                        <p className="mt-1 text-xs text-neutral-400">
                          {recruiter.registrationNumber}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="max-w-[230px] font-bold text-neutral-900">
                      {recruiter.companyName}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {recruiter.companyType}
                    </p>

                    <p className="mt-2 flex items-center gap-1.5 text-xs text-neutral-500">
                      <MapPin size={13} />
                      {recruiter.location}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="rounded-xl bg-blue-50 px-3 py-2">
                        <p className="font-bold text-blue-700">
                          {recruiter.jobsPosted}
                        </p>
                        <p className="text-[11px] text-blue-600">
                          Jobs
                        </p>
                      </div>

                      <div className="rounded-xl bg-purple-50 px-3 py-2">
                        <p className="font-bold text-purple-700">
                          {recruiter.activeJobs}
                        </p>
                        <p className="text-[11px] text-purple-600">
                          Active
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50 px-3 py-2">
                        <p className="font-bold text-amber-700">
                          {recruiter.applicationsReceived}
                        </p>
                        <p className="text-[11px] text-amber-600">
                          Applications
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 px-3 py-2">
                        <p className="font-bold text-emerald-700">
                          {recruiter.studentsHired}
                        </p>
                        <p className="text-[11px] text-emerald-600">
                          Hired
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        verificationStyles[recruiter.verification]
                      }`}
                    >
                      {recruiter.verification}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[recruiter.status]
                      }`}
                    >
                      {recruiter.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-neutral-700">
                    {recruiter.lastLogin}
                  </td>

                  <td className="relative px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((previousId) =>
                          previousId === recruiter.id
                            ? null
                            : recruiter.id
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                      aria-label="Open recruiter actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === recruiter.id && (
                      <div className="absolute right-6 top-14 z-20 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedRecruiter(recruiter);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Eye size={17} />
                          View Details
                        </button>

                        {recruiter.verification !== "Verified" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateVerification(
                                recruiter.id,
                                "Verified"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                          >
                            <CheckCircle2 size={17} />
                            Verify Recruiter
                          </button>
                        )}

                        {recruiter.status !== "Active" &&
                          recruiter.verification === "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateRecruiterStatus(
                                  recruiter.id,
                                  "Active"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <UserCheck size={17} />
                              Activate Account
                            </button>
                          )}

                        {recruiter.status === "Active" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateRecruiterStatus(
                                recruiter.id,
                                "Suspended"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                          >
                            <Ban size={17} />
                            Suspend Account
                          </button>
                        )}

                        {recruiter.verification !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateVerification(
                                recruiter.id,
                                "Rejected"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <UserX size={17} />
                            Reject Recruiter
                          </button>
                        )}

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                          type="button"
                          onClick={() =>
                            deleteRecruiter(recruiter.id)
                          }
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 size={17} />
                          Remove Recruiter
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedRecruiters.map((recruiter) => (
            <article
              key={recruiter.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                    {recruiter.recruiterName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate font-bold text-neutral-900">
                      {recruiter.recruiterName}
                    </h3>

                    <p className="mt-1 truncate text-sm text-neutral-500">
                      {recruiter.companyName}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[recruiter.status]
                  }`}
                >
                  {recruiter.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <p className="flex items-center gap-2">
                  <BriefcaseBusiness size={17} />
                  {recruiter.designation}
                </p>

                <p className="flex items-center gap-2">
                  <Building2 size={17} />
                  {recruiter.companyType}
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={17} />
                  {recruiter.email}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {recruiter.location}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2 rounded-2xl bg-neutral-50 p-4 text-center">
                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.jobsPosted}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Jobs
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.activeJobs}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Active
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.applicationsReceived}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Applied
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.studentsHired}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Hired
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    verificationStyles[recruiter.verification]
                  }`}
                >
                  {recruiter.verification}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedRecruiter(recruiter)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                {recruiter.verification !== "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateVerification(recruiter.id, "Verified")
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                  >
                    <CheckCircle2 size={16} />
                    Verify
                  </button>
                )}

                {recruiter.status === "Active" ? (
                  <button
                    type="button"
                    onClick={() =>
                      updateRecruiterStatus(
                        recruiter.id,
                        "Suspended"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                  >
                    <Ban size={16} />
                    Suspend
                  </button>
                ) : (
                  recruiter.verification === "Verified" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateRecruiterStatus(
                          recruiter.id,
                          "Active"
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                    >
                      <UserCheck size={16} />
                      Activate
                    </button>
                  )
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredRecruiters.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <UserSquare2 size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No recruiters found
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

        {filteredRecruiters.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + recruitersPerPage,
                  filteredRecruiters.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredRecruiters.length}
              </span>{" "}
              recruiters
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

      {selectedRecruiter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 text-xl font-bold text-white">
                  {selectedRecruiter.recruiterName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedRecruiter.recruiterName}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedRecruiter.designation}
                  </p>

                  <p className="mt-1 font-semibold text-blue-700">
                    {selectedRecruiter.companyName}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[selectedRecruiter.status]
                      }`}
                    >
                      {selectedRecruiter.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        verificationStyles[
                          selectedRecruiter.verification
                        ]
                      }`}
                    >
                      {selectedRecruiter.verification}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedRecruiter(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close recruiter details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Mail size={16} />
                    Recruiter Email
                  </p>

                  <p className="mt-2 break-all font-medium text-neutral-900">
                    {selectedRecruiter.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone Number
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedRecruiter.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Registration Number
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedRecruiter.registrationNumber}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Joined Date
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {formatDate(selectedRecruiter.joinedDate)}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Company Information
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Company Name
                      </p>
                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedRecruiter.companyName}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Industry
                      </p>
                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedRecruiter.companyType}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Company Size
                      </p>
                      <p className="mt-1 font-medium text-neutral-900">
                        {selectedRecruiter.companySize}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Location
                      </p>
                      <p className="mt-1 font-medium text-neutral-900">
                        {selectedRecruiter.location}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Company Contact
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Official Email
                      </p>
                      <p className="mt-1 break-all font-medium text-neutral-900">
                        {selectedRecruiter.companyEmail}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Website
                      </p>
                      <p className="mt-1 break-all font-medium text-blue-700">
                        {selectedRecruiter.website}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Last Login
                      </p>
                      <p className="mt-1 font-medium text-neutral-900">
                        {selectedRecruiter.lastLogin}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Company Overview
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedRecruiter.description}
                </p>
              </section>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <BriefcaseBusiness
                    size={22}
                    className="mx-auto text-blue-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedRecruiter.jobsPosted}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Jobs Posted
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <CheckCircle2
                    size={22}
                    className="mx-auto text-purple-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedRecruiter.activeJobs}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Active Jobs
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <Users
                    size={22}
                    className="mx-auto text-amber-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedRecruiter.applicationsReceived}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Applications
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <UserCheck
                    size={22}
                    className="mx-auto text-emerald-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedRecruiter.studentsHired}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Students Hired
                  </p>
                </article>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedRecruiter.verification !== "Verified" && (
                <button
                  type="button"
                  onClick={() =>
                    updateVerification(
                      selectedRecruiter.id,
                      "Verified"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-4 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <CheckCircle2 size={18} />
                  Verify Recruiter
                </button>
              )}

              {selectedRecruiter.status === "Active" ? (
                <button
                  type="button"
                  onClick={() =>
                    updateRecruiterStatus(
                      selectedRecruiter.id,
                      "Suspended"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
                >
                  <Ban size={18} />
                  Suspend Account
                </button>
              ) : (
                selectedRecruiter.verification === "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateRecruiterStatus(
                        selectedRecruiter.id,
                        "Active"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                  >
                    <UserCheck size={18} />
                    Activate Account
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAddRecruiter}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add Recruiter
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Register a recruiter and company for administrator
                  verification.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setRecruiterForm(emptyRecruiterForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close recruiter form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Recruiter Name
                </label>

                <input
                  type="text"
                  name="recruiterName"
                  value={recruiterForm.recruiterName}
                  onChange={handleFormChange}
                  placeholder="Enter recruiter name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Recruiter Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={recruiterForm.email}
                  onChange={handleFormChange}
                  placeholder="recruiter@company.com"
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
                  value={recruiterForm.phone}
                  onChange={handleFormChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Designation
                </label>

                <input
                  type="text"
                  name="designation"
                  value={recruiterForm.designation}
                  onChange={handleFormChange}
                  placeholder="Talent Acquisition Manager"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company Name
                </label>

                <input
                  type="text"
                  name="companyName"
                  value={recruiterForm.companyName}
                  onChange={handleFormChange}
                  placeholder="Enter company name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Industry
                </label>

                <select
                  name="companyType"
                  value={recruiterForm.companyType}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Information Technology</option>
                  <option>Software Services</option>
                  <option>Data Analytics</option>
                  <option>Cloud Computing</option>
                  <option>Financial Technology</option>
                  <option>Healthcare Technology</option>
                  <option>Renewable Energy</option>
                  <option>Design and Product</option>
                  <option>Manufacturing</option>
                  <option>Consulting</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company Size
                </label>

                <select
                  name="companySize"
                  value={recruiterForm.companySize}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>1–50 Employees</option>
                  <option>50–200 Employees</option>
                  <option>200–500 Employees</option>
                  <option>500–1000 Employees</option>
                  <option>1000–5000 Employees</option>
                  <option>5000+ Employees</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company Email
                </label>

                <input
                  type="email"
                  name="companyEmail"
                  value={recruiterForm.companyEmail}
                  onChange={handleFormChange}
                  placeholder="careers@company.com"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Website
                </label>

                <input
                  type="text"
                  name="website"
                  value={recruiterForm.website}
                  onChange={handleFormChange}
                  placeholder="https://company.com"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={recruiterForm.location}
                  onChange={handleFormChange}
                  placeholder="City, State"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Company Description
                </label>

                <textarea
                  name="description"
                  value={recruiterForm.description}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Describe the company and its recruitment areas..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <div>
                    <p className="font-bold text-blue-900">
                      Verification required
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700">
                      The recruiter account will remain pending until
                      company and recruiter credentials are verified.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setRecruiterForm(emptyRecruiterForm);
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Plus size={18} />
                Add Recruiter
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Recruiters;