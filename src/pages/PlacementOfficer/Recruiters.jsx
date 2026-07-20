import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  Globe,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserPlus,
  Users,
  UserX,
  X,
  XCircle,
} from "lucide-react";

const initialRecruiters = [
  {
    id: 1,
    recruiterName: "Ananya Sharma",
    designation: "Senior Talent Acquisition Manager",
    email: "ananya.sharma@technova.com",
    phone: "+91 98765 43210",
    company: "TechNova Solutions",
    industry: "Information Technology",
    location: "Bengaluru, Karnataka",
    website: "https://technova.example.com",
    companySize: "201 - 500 Employees",
    registeredDate: "2026-07-10",
    status: "Approved",
    activeJobs: 5,
    totalApplications: 286,
    offersReleased: 38,
    description:
      "Technology company focused on cloud products, enterprise software and AI-powered business solutions.",
  },
  {
    id: 2,
    recruiterName: "Rohit Verma",
    designation: "Campus Hiring Lead",
    email: "rohit.verma@infosphere.com",
    phone: "+91 91234 56780",
    company: "Infosphere Technologies",
    industry: "Software Services",
    location: "Hyderabad, Telangana",
    website: "https://infosphere.example.com",
    companySize: "1000+ Employees",
    registeredDate: "2026-07-12",
    status: "Approved",
    activeJobs: 4,
    totalApplications: 241,
    offersReleased: 32,
    description:
      "Enterprise technology organization providing software engineering, consulting and managed services.",
  },
  {
    id: 3,
    recruiterName: "Meera Shah",
    designation: "Talent Acquisition Specialist",
    email: "meera.shah@datacraft.com",
    phone: "+91 99887 66554",
    company: "DataCraft Analytics",
    industry: "Data Analytics",
    location: "Chennai, Tamil Nadu",
    website: "https://datacraft.example.com",
    companySize: "51 - 200 Employees",
    registeredDate: "2026-07-15",
    status: "Pending",
    activeJobs: 0,
    totalApplications: 0,
    offersReleased: 0,
    description:
      "Analytics company delivering data engineering, business intelligence and machine-learning solutions.",
  },
  {
    id: 4,
    recruiterName: "Karan Malhotra",
    designation: "University Relations Manager",
    email: "karan@cloudaxis.com",
    phone: "+91 90000 11223",
    company: "CloudAxis Systems",
    industry: "Cloud Computing",
    location: "Pune, Maharashtra",
    website: "https://cloudaxis.example.com",
    companySize: "501 - 1000 Employees",
    registeredDate: "2026-07-14",
    status: "Approved",
    activeJobs: 3,
    totalApplications: 194,
    offersReleased: 21,
    description:
      "Cloud infrastructure and support company providing managed cloud, DevOps and platform services.",
  },
  {
    id: 5,
    recruiterName: "Nitin Rao",
    designation: "Human Resources Manager",
    email: "nitin.rao@securegrid.com",
    phone: "+91 98844 77221",
    company: "SecureGrid Networks",
    industry: "Cybersecurity",
    location: "Mumbai, Maharashtra",
    website: "https://securegrid.example.com",
    companySize: "201 - 500 Employees",
    registeredDate: "2026-07-17",
    status: "Pending",
    activeJobs: 0,
    totalApplications: 0,
    offersReleased: 0,
    description:
      "Cybersecurity organization specializing in security operations, threat monitoring and network protection.",
  },
  {
    id: 6,
    recruiterName: "Divya Rao",
    designation: "Recruitment Manager",
    email: "divya.rao@designloop.com",
    phone: "+91 97772 31145",
    company: "DesignLoop Studios",
    industry: "Design and Technology",
    location: "Kochi, Kerala",
    website: "https://designloop.example.com",
    companySize: "51 - 200 Employees",
    registeredDate: "2026-06-25",
    status: "Suspended",
    activeJobs: 0,
    totalApplications: 89,
    offersReleased: 6,
    description:
      "Digital product studio focused on user experience, product design and modern web development.",
  },
  {
    id: 7,
    recruiterName: "Arvind Kumar",
    designation: "Technical Recruitment Lead",
    email: "arvind@codebridge.com",
    phone: "+91 96661 27890",
    company: "CodeBridge Labs",
    industry: "Product Development",
    location: "Coimbatore, Tamil Nadu",
    website: "https://codebridge.example.com",
    companySize: "201 - 500 Employees",
    registeredDate: "2026-07-08",
    status: "Approved",
    activeJobs: 2,
    totalApplications: 131,
    offersReleased: 17,
    description:
      "Software product company building web platforms, mobile applications and developer tools.",
  },
  {
    id: 8,
    recruiterName: "Sneha Kapoor",
    designation: "People Operations Executive",
    email: "sneha@finovate.com",
    phone: "+91 95555 22441",
    company: "Finovate Technologies",
    industry: "Financial Technology",
    location: "Bengaluru, Karnataka",
    website: "https://finovate.example.com",
    companySize: "501 - 1000 Employees",
    registeredDate: "2026-07-18",
    status: "Rejected",
    activeJobs: 0,
    totalApplications: 0,
    offersReleased: 0,
    description:
      "Financial technology company building digital payment, lending and financial management platforms.",
  },
];

const statusStyles = {
  Approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Suspended: "border-rose-200 bg-rose-50 text-rose-700",
  Rejected: "border-neutral-300 bg-neutral-100 text-neutral-600",
};

function Recruiters() {
  const [recruiters, setRecruiters] = useState(initialRecruiters);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [industryFilter, setIndustryFilter] = useState("All Industries");
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recruitersPerPage = 5;

  const industryOptions = useMemo(
    () => [
      "All Industries",
      ...new Set(recruiters.map((recruiter) => recruiter.industry)),
    ],
    [recruiters]
  );

  const filteredRecruiters = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return recruiters.filter((recruiter) => {
      const matchesSearch =
        recruiter.recruiterName.toLowerCase().includes(query) ||
        recruiter.company.toLowerCase().includes(query) ||
        recruiter.email.toLowerCase().includes(query) ||
        recruiter.location.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" || recruiter.status === statusFilter;

      const matchesIndustry =
        industryFilter === "All Industries" ||
        recruiter.industry === industryFilter;

      return matchesSearch && matchesStatus && matchesIndustry;
    });
  }, [industryFilter, recruiters, searchTerm, statusFilter]);

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
    approved: recruiters.filter(
      (recruiter) => recruiter.status === "Approved"
    ).length,
    pending: recruiters.filter(
      (recruiter) => recruiter.status === "Pending"
    ).length,
    suspended: recruiters.filter(
      (recruiter) => recruiter.status === "Suspended"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

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

  const deleteRecruiter = (recruiterId) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this recruiter?"
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

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setIndustryFilter("All Industries");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    const headers = [
      "Recruiter",
      "Company",
      "Email",
      "Industry",
      "Location",
      "Status",
      "Active Jobs",
      "Applications",
      "Offers Released",
    ];

    const rows = recruiters.map((recruiter) => [
      recruiter.recruiterName,
      recruiter.company,
      recruiter.email,
      recruiter.industry,
      recruiter.location,
      recruiter.status,
      recruiter.activeJobs,
      recruiter.totalApplications,
      recruiter.offersReleased,
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
    anchor.download = "placement-recruiters.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Recruiter report exported successfully.");
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Building2 size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Recruiter Management
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Recruiters
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review company registrations, verify recruiters and
                control access to campus hiring activities.
              </p>
            </div>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
            >
              <Download size={19} />
              Export Recruiters
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
            <Users size={22} />
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
            <ShieldCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.approved}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Approved Companies
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Clock3 size={22} />
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
            <UserX size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.suspended}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Suspended Recruiters
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
                Search and manage registered recruiters and companies.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_280px]">
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
                placeholder="Search recruiter, company, email or location..."
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
              <option>Approved</option>
              <option>Pending</option>
              <option>Suspended</option>
              <option>Rejected</option>
            </select>

            <select
              value={industryFilter}
              onChange={(event) => {
                setIndustryFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {industryOptions.map((industry) => (
                <option key={industry}>{industry}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Recruiter
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Company
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Contact
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Hiring Activity
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Registered
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
              {paginatedRecruiters.map((recruiter) => (
                <tr
                  key={recruiter.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
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
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-bold text-neutral-800">
                      {recruiter.company}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {recruiter.industry}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-xs text-neutral-400">
                      <MapPin size={13} />
                      {recruiter.location}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="flex items-center gap-2 text-sm text-neutral-700">
                      <Mail size={15} className="text-neutral-400" />
                      {recruiter.email}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                      <Phone size={15} />
                      {recruiter.phone}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div>
                        <p className="font-bold text-neutral-900">
                          {recruiter.activeJobs}
                        </p>

                        <p className="text-[11px] text-neutral-500">
                          Jobs
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {recruiter.totalApplications}
                        </p>

                        <p className="text-[11px] text-neutral-500">
                          Applicants
                        </p>
                      </div>

                      <div>
                        <p className="font-bold text-neutral-900">
                          {recruiter.offersReleased}
                        </p>

                        <p className="text-[11px] text-neutral-500">
                          Offers
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-neutral-700">
                    {formatDate(recruiter.registeredDate)}
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
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Open recruiter actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === recruiter.id && (
                      <div className="absolute right-6 top-14 z-20 w-56 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
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

                        {recruiter.status !== "Approved" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateRecruiterStatus(
                                recruiter.id,
                                "Approved"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                          >
                            <UserCheck size={17} />
                            Approve Recruiter
                          </button>
                        )}

                        {recruiter.status !== "Rejected" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateRecruiterStatus(
                                recruiter.id,
                                "Rejected"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                          >
                            <UserX size={17} />
                            Reject Recruiter
                          </button>
                        )}

                        {recruiter.status === "Approved" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateRecruiterStatus(
                                recruiter.id,
                                "Suspended"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <XCircle size={17} />
                            Suspend Access
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
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                    {recruiter.recruiterName
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {recruiter.recruiterName}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {recruiter.company}
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
                  <Building2 size={17} />
                  {recruiter.industry}
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

              <div className="mt-5 grid grid-cols-3 gap-3 rounded-2xl bg-neutral-50 p-4 text-center">
                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.activeJobs}
                  </p>
                  <p className="text-xs text-neutral-500">Jobs</p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.totalApplications}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Applicants
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {recruiter.offersReleased}
                  </p>
                  <p className="text-xs text-neutral-500">Offers</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRecruiter(recruiter)}
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                {recruiter.status !== "Approved" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateRecruiterStatus(
                        recruiter.id,
                        "Approved"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                  >
                    <UserCheck size={16} />
                    Approve
                  </button>
                )}

                {recruiter.status === "Approved" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateRecruiterStatus(
                        recruiter.id,
                        "Suspended"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                  >
                    <UserX size={16} />
                    Suspend
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {filteredRecruiters.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Building2 size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No recruiters found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search term or selected filters.
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
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white">
                  {selectedRecruiter.company
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedRecruiter.company}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedRecruiter.industry}
                  </p>
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Recruiter
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedRecruiter.recruiterName}
                  </p>

                  <p className="mt-1 text-sm text-neutral-600">
                    {selectedRecruiter.designation}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Company Size
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedRecruiter.companySize}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Mail size={16} />
                    Email
                  </p>

                  <p className="mt-2 break-all font-medium text-neutral-900">
                    {selectedRecruiter.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedRecruiter.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedRecruiter.location}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Globe size={16} />
                    Website
                  </p>

                  <p className="mt-2 break-all font-medium text-blue-700">
                    {selectedRecruiter.website}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Company Overview
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedRecruiter.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <p className="text-3xl font-bold text-blue-700">
                    {selectedRecruiter.activeJobs}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Active Jobs
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <p className="text-3xl font-bold text-purple-700">
                    {selectedRecruiter.totalApplications}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Applications
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <p className="text-3xl font-bold text-emerald-700">
                    {selectedRecruiter.offersReleased}
                  </p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Offers Released
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-neutral-200 p-5">
                <div>
                  <p className="font-bold text-neutral-900">
                    Verification Status
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Registered on{" "}
                    {formatDate(selectedRecruiter.registeredDate)}
                  </p>
                </div>

                <span
                  className={`rounded-full border px-4 py-2 text-sm font-bold ${
                    statusStyles[selectedRecruiter.status]
                  }`}
                >
                  {selectedRecruiter.status}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedRecruiter.status !== "Rejected" && (
                <button
                  type="button"
                  onClick={() =>
                    updateRecruiterStatus(
                      selectedRecruiter.id,
                      "Rejected"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
                >
                  <UserX size={18} />
                  Reject
                </button>
              )}

              {selectedRecruiter.status !== "Approved" && (
                <button
                  type="button"
                  onClick={() =>
                    updateRecruiterStatus(
                      selectedRecruiter.id,
                      "Approved"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  <UserCheck size={18} />
                  Approve Recruiter
                </button>
              )}

              {selectedRecruiter.status === "Approved" && (
                <button
                  type="button"
                  onClick={() =>
                    updateRecruiterStatus(
                      selectedRecruiter.id,
                      "Suspended"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700"
                >
                  <XCircle size={18} />
                  Suspend Access
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recruiters;