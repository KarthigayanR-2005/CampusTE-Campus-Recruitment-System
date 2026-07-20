import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Globe2,
  GraduationCap,
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
  UserX,
  X,
  XCircle,
} from "lucide-react";

const initialInstitutions = [
  {
    id: 1,
    name: "CampusTE Institute of Technology",
    code: "CTE-CBE-001",
    university: "CampusTE University",
    institutionType: "Private Engineering College",
    email: "placements@campuste.edu",
    phone: "+91 422 123 4567",
    website: "https://campuste.edu",
    location: "Coimbatore, Tamil Nadu",
    address:
      "University Campus, Avinashi Road, Coimbatore, Tamil Nadu",
    administrator: "Dr. Rajesh Kumar",
    administratorEmail: "admin@campuste.edu",
    placementOfficer: "Dr. Meenakshi Rao",
    students: 1248,
    recruiters: 86,
    placementDrives: 74,
    placedStudents: 539,
    joinedDate: "2025-01-10",
    status: "Active",
    verification: "Verified",
    accreditation: "NAAC A++",
    description:
      "A technology-focused institution offering undergraduate and postgraduate programmes in engineering, computing and management.",
  },
  {
    id: 2,
    name: "Greenfield Institute of Technology",
    code: "GIT-SLM-014",
    university: "Anna University",
    institutionType: "Autonomous Engineering College",
    email: "placement@greenfield.edu",
    phone: "+91 427 245 8901",
    website: "https://greenfield.example.edu",
    location: "Salem, Tamil Nadu",
    address:
      "Greenfield Educational Campus, Salem, Tamil Nadu",
    administrator: "Dr. Suresh Babu",
    administratorEmail: "admin@greenfield.edu",
    placementOfficer: "Prof. Arun Kumar",
    students: 986,
    recruiters: 0,
    placementDrives: 0,
    placedStudents: 0,
    joinedDate: "2026-07-18",
    status: "Pending",
    verification: "Pending",
    accreditation: "NAAC A",
    description:
      "An autonomous engineering institution focused on technical education, research and industry collaboration.",
  },
  {
    id: 3,
    name: "Metro Engineering College",
    code: "MEC-MDU-008",
    university: "Anna University",
    institutionType: "Private Engineering College",
    email: "placements@metroengineering.edu",
    phone: "+91 452 278 3321",
    website: "https://metroengineering.example.edu",
    location: "Madurai, Tamil Nadu",
    address:
      "Metro Knowledge Park, Madurai, Tamil Nadu",
    administrator: "Dr. Nalini Subramanian",
    administratorEmail: "admin@metroengineering.edu",
    placementOfficer: "Dr. Ramesh Narayanan",
    students: 1124,
    recruiters: 64,
    placementDrives: 58,
    placedStudents: 426,
    joinedDate: "2025-06-22",
    status: "Active",
    verification: "Verified",
    accreditation: "NAAC A+",
    description:
      "Engineering institution offering multidisciplinary programmes with an emphasis on employability and innovation.",
  },
  {
    id: 4,
    name: "Horizon University",
    code: "HU-BLR-021",
    university: "Horizon University",
    institutionType: "Private University",
    email: "careers@horizonuniversity.edu",
    phone: "+91 80 4567 8821",
    website: "https://horizon.example.edu",
    location: "Bengaluru, Karnataka",
    address:
      "Horizon University Campus, Electronic City, Bengaluru",
    administrator: "Dr. Kavitha Menon",
    administratorEmail: "admin@horizonuniversity.edu",
    placementOfficer: "Prof. Vikram Singh",
    students: 2168,
    recruiters: 132,
    placementDrives: 108,
    placedStudents: 984,
    joinedDate: "2025-03-14",
    status: "Active",
    verification: "Verified",
    accreditation: "UGC Recognised",
    description:
      "A multidisciplinary private university delivering programmes in engineering, science, business and design.",
  },
  {
    id: 5,
    name: "National School of Computing",
    code: "NSC-CHE-017",
    university: "National School of Computing",
    institutionType: "Deemed University",
    email: "placement@nsc.edu",
    phone: "+91 44 4123 9088",
    website: "https://nsc.example.edu",
    location: "Chennai, Tamil Nadu",
    address:
      "Technology Campus, OMR, Chennai, Tamil Nadu",
    administrator: "Dr. Divya Krishnan",
    administratorEmail: "admin@nsc.edu",
    placementOfficer: "Prof. Karthik S",
    students: 764,
    recruiters: 94,
    placementDrives: 81,
    placedStudents: 518,
    joinedDate: "2025-09-08",
    status: "Active",
    verification: "Verified",
    accreditation: "NAAC A++",
    description:
      "Specialised computing institution focused on software engineering, data science, cybersecurity and artificial intelligence.",
  },
  {
    id: 6,
    name: "Western Technical College",
    code: "WTC-PNE-031",
    university: "Savitribai Phule Pune University",
    institutionType: "Private Engineering College",
    email: "placement@westerntech.edu",
    phone: "+91 20 2456 1188",
    website: "https://westerntech.example.edu",
    location: "Pune, Maharashtra",
    address:
      "Western Technical Campus, Hinjawadi, Pune",
    administrator: "Dr. Amit Deshmukh",
    administratorEmail: "admin@westerntech.edu",
    placementOfficer: "Prof. Neha Kulkarni",
    students: 1056,
    recruiters: 58,
    placementDrives: 42,
    placedStudents: 311,
    joinedDate: "2025-11-19",
    status: "Suspended",
    verification: "Verified",
    accreditation: "NAAC A",
    description:
      "Technical institution providing engineering and applied science programmes with industry-oriented training.",
  },
  {
    id: 7,
    name: "Coastal College of Engineering",
    code: "CCE-KOC-026",
    university: "APJ Abdul Kalam Technological University",
    institutionType: "Private Engineering College",
    email: "careers@coastalengineering.edu",
    phone: "+91 484 276 4300",
    website: "https://coastalengineering.example.edu",
    location: "Kochi, Kerala",
    address:
      "Coastal Education Park, Kochi, Kerala",
    administrator: "Dr. Joseph Mathew",
    administratorEmail: "admin@coastalengineering.edu",
    placementOfficer: "Prof. Anjali Nair",
    students: 842,
    recruiters: 0,
    placementDrives: 0,
    placedStudents: 0,
    joinedDate: "2026-07-16",
    status: "Rejected",
    verification: "Rejected",
    accreditation: "Application Pending",
    description:
      "Engineering college offering undergraduate technical programmes and industry-focused skill development.",
  },
  {
    id: 8,
    name: "Central Institute of Applied Sciences",
    code: "CIAS-HYD-019",
    university: "Jawaharlal Nehru Technological University",
    institutionType: "Autonomous Institution",
    email: "placements@cias.edu",
    phone: "+91 40 2876 5521",
    website: "https://cias.example.edu",
    location: "Hyderabad, Telangana",
    address:
      "Applied Sciences Campus, Gachibowli, Hyderabad",
    administrator: "Dr. Pradeep Reddy",
    administratorEmail: "admin@cias.edu",
    placementOfficer: "Prof. Sneha Reddy",
    students: 1386,
    recruiters: 101,
    placementDrives: 89,
    placedStudents: 672,
    joinedDate: "2025-04-28",
    status: "Inactive",
    verification: "Verified",
    accreditation: "NAAC A+",
    description:
      "Autonomous institution specialising in engineering, applied sciences, research and interdisciplinary technology programmes.",
  },
];

const emptyInstitutionForm = {
  name: "",
  code: "",
  university: "",
  institutionType: "Private Engineering College",
  email: "",
  phone: "",
  website: "",
  location: "",
  address: "",
  administrator: "",
  administratorEmail: "",
  placementOfficer: "",
  accreditation: "",
  description: "",
};

const statusStyles = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Pending: "border-amber-200 bg-amber-50 text-amber-700",
  Suspended: "border-rose-200 bg-rose-50 text-rose-700",
  Inactive: "border-neutral-300 bg-neutral-100 text-neutral-600",
  Rejected: "border-rose-200 bg-rose-50 text-rose-700",
};

const verificationStyles = {
  Verified: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Rejected: "bg-rose-50 text-rose-700",
};

function Institutions() {
  const [institutions, setInstitutions] =
    useState(initialInstitutions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Statuses");
  const [verificationFilter, setVerificationFilter] =
    useState("All Verification");
  const [typeFilter, setTypeFilter] =
    useState("All Institution Types");
  const [selectedInstitution, setSelectedInstitution] =
    useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [institutionForm, setInstitutionForm] = useState(
    emptyInstitutionForm
  );
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const institutionsPerPage = 5;

  const institutionTypes = useMemo(
    () => [
      "All Institution Types",
      ...new Set(
        institutions.map(
          (institution) => institution.institutionType
        )
      ),
    ],
    [institutions]
  );

  const filteredInstitutions = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return institutions.filter((institution) => {
      const matchesSearch =
        institution.name.toLowerCase().includes(query) ||
        institution.code.toLowerCase().includes(query) ||
        institution.university.toLowerCase().includes(query) ||
        institution.location.toLowerCase().includes(query) ||
        institution.email.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All Statuses" ||
        institution.status === statusFilter;

      const matchesVerification =
        verificationFilter === "All Verification" ||
        institution.verification === verificationFilter;

      const matchesType =
        typeFilter === "All Institution Types" ||
        institution.institutionType === typeFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesVerification &&
        matchesType
      );
    });
  }, [
    institutions,
    searchTerm,
    statusFilter,
    typeFilter,
    verificationFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredInstitutions.length / institutionsPerPage
    )
  );

  const startIndex = (currentPage - 1) * institutionsPerPage;

  const paginatedInstitutions = filteredInstitutions.slice(
    startIndex,
    startIndex + institutionsPerPage
  );

  const stats = {
    total: institutions.length,
    active: institutions.filter(
      (institution) => institution.status === "Active"
    ).length,
    pending: institutions.filter(
      (institution) => institution.verification === "Pending"
    ).length,
    suspended: institutions.filter(
      (institution) =>
        institution.status === "Suspended" ||
        institution.status === "Inactive"
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

  const updateInstitutionStatus = (institutionId, status) => {
    setInstitutions((previousInstitutions) =>
      previousInstitutions.map((institution) =>
        institution.id === institutionId
          ? {
              ...institution,
              status,
            }
          : institution
      )
    );

    setSelectedInstitution((previousInstitution) =>
      previousInstitution?.id === institutionId
        ? {
            ...previousInstitution,
            status,
          }
        : previousInstitution
    );

    setOpenMenuId(null);
    showMessage(`Institution status updated to ${status}.`);
  };

  const updateVerification = (
    institutionId,
    verification
  ) => {
    setInstitutions((previousInstitutions) =>
      previousInstitutions.map((institution) =>
        institution.id === institutionId
          ? {
              ...institution,
              verification,
              status:
                verification === "Verified"
                  ? "Active"
                  : verification === "Rejected"
                    ? "Rejected"
                    : institution.status,
            }
          : institution
      )
    );

    setSelectedInstitution((previousInstitution) =>
      previousInstitution?.id === institutionId
        ? {
            ...previousInstitution,
            verification,
            status:
              verification === "Verified"
                ? "Active"
                : verification === "Rejected"
                  ? "Rejected"
                  : previousInstitution.status,
          }
        : previousInstitution
    );

    setOpenMenuId(null);
    showMessage(
      `Institution verification updated to ${verification}.`
    );
  };

  const deleteInstitution = (institutionId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently remove this institution?"
    );

    if (!confirmed) {
      return;
    }

    setInstitutions((previousInstitutions) =>
      previousInstitutions.filter(
        (institution) => institution.id !== institutionId
      )
    );

    setSelectedInstitution(null);
    setOpenMenuId(null);
    showMessage("Institution removed successfully.");
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setInstitutionForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddInstitution = (event) => {
    event.preventDefault();

    if (
      !institutionForm.name.trim() ||
      !institutionForm.code.trim() ||
      !institutionForm.email.trim() ||
      !institutionForm.location.trim() ||
      !institutionForm.administrator.trim()
    ) {
      showMessage(
        "Complete the institution name, code, email, location and administrator fields."
      );
      return;
    }

    const codeExists = institutions.some(
      (institution) =>
        institution.code.toLowerCase() ===
        institutionForm.code.toLowerCase()
    );

    if (codeExists) {
      showMessage(
        "An institution with this code already exists."
      );
      return;
    }

    const newInstitution = {
      id: Date.now(),
      ...institutionForm,
      students: 0,
      recruiters: 0,
      placementDrives: 0,
      placedStudents: 0,
      joinedDate: new Date().toISOString().slice(0, 10),
      status: "Pending",
      verification: "Pending",
    };

    setInstitutions((previousInstitutions) => [
      newInstitution,
      ...previousInstitutions,
    ]);

    setInstitutionForm(emptyInstitutionForm);
    setShowAddModal(false);
    setCurrentPage(1);
    showMessage(
      "Institution added and submitted for verification."
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter("All Statuses");
    setVerificationFilter("All Verification");
    setTypeFilter("All Institution Types");
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    const headers = [
      "Institution",
      "Code",
      "University",
      "Institution Type",
      "Email",
      "Phone",
      "Location",
      "Administrator",
      "Placement Officer",
      "Students",
      "Recruiters",
      "Placement Drives",
      "Placed Students",
      "Status",
      "Verification",
      "Joined Date",
    ];

    const rows = institutions.map((institution) => [
      institution.name,
      institution.code,
      institution.university,
      institution.institutionType,
      institution.email,
      institution.phone,
      institution.location,
      institution.administrator,
      institution.placementOfficer,
      institution.students,
      institution.recruiters,
      institution.placementDrives,
      institution.placedStudents,
      institution.status,
      institution.verification,
      institution.joinedDate,
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
    anchor.download = "campuste-institutions.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage(
      "Institution directory exported successfully."
    );
  };

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
                  Institution Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Institutions
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Verify partner institutions, manage platform access
                and monitor student and placement activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export Institutions
              </button>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Plus size={19} />
                Add Institution
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
            <Building2 size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Registered Institutions
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <ShieldCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.active}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Active Institutions
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <UserCheck size={22} />
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
            <XCircle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.suspended}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Restricted Institutions
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Institution Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search and manage all registered educational
                institutions.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_220px_280px]">
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
                placeholder="Search institution, code, university or location..."
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
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Suspended</option>
              <option>Inactive</option>
              <option>Rejected</option>
            </select>

            <select
              value={verificationFilter}
              onChange={(event) => {
                setVerificationFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Verification</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>

            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value);
                setCurrentPage(1);
                setOpenMenuId(null);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {institutionTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1350px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Institution
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Administration
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Platform Activity
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Verification
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Joined
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedInstitutions.map((institution) => (
                <tr
                  key={institution.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                        {institution.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <p className="max-w-[270px] font-bold text-neutral-900">
                          {institution.name}
                        </p>

                        <p className="mt-1 text-sm text-neutral-500">
                          {institution.code}
                        </p>

                        <p className="mt-1 flex items-center gap-1.5 text-xs text-neutral-400">
                          <MapPin size={13} />
                          {institution.location}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="font-semibold text-neutral-800">
                      {institution.administrator}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      Institution Administrator
                    </p>

                    <p className="mt-3 font-semibold text-neutral-800">
                      {institution.placementOfficer || "Not assigned"}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      Placement Officer
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="rounded-xl bg-blue-50 px-3 py-2">
                        <p className="font-bold text-blue-700">
                          {institution.students}
                        </p>

                        <p className="text-[11px] text-blue-600">
                          Students
                        </p>
                      </div>

                      <div className="rounded-xl bg-purple-50 px-3 py-2">
                        <p className="font-bold text-purple-700">
                          {institution.recruiters}
                        </p>

                        <p className="text-[11px] text-purple-600">
                          Recruiters
                        </p>
                      </div>

                      <div className="rounded-xl bg-amber-50 px-3 py-2">
                        <p className="font-bold text-amber-700">
                          {institution.placementDrives}
                        </p>

                        <p className="text-[11px] text-amber-600">
                          Drives
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 px-3 py-2">
                        <p className="font-bold text-emerald-700">
                          {institution.placedStudents}
                        </p>

                        <p className="text-[11px] text-emerald-600">
                          Placed
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                        verificationStyles[
                          institution.verification
                        ]
                      }`}
                    >
                      {institution.verification}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[institution.status]
                      }`}
                    >
                      {institution.status}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm font-medium text-neutral-700">
                    {formatDate(institution.joinedDate)}
                  </td>

                  <td className="relative px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((previousId) =>
                          previousId === institution.id
                            ? null
                            : institution.id
                        )
                      }
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="Open institution actions"
                    >
                      <MoreVertical size={20} />
                    </button>

                    {openMenuId === institution.id && (
                      <div className="absolute right-6 top-14 z-20 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedInstitution(institution);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                        >
                          <Eye size={17} />
                          View Details
                        </button>

                        {institution.verification !==
                          "Verified" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateVerification(
                                institution.id,
                                "Verified"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                          >
                            <CheckCircle2 size={17} />
                            Verify Institution
                          </button>
                        )}

                        {institution.status !== "Active" &&
                          institution.verification ===
                            "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateInstitutionStatus(
                                  institution.id,
                                  "Active"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <UserCheck size={17} />
                              Activate Institution
                            </button>
                          )}

                        {institution.status === "Active" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateInstitutionStatus(
                                institution.id,
                                "Suspended"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                          >
                            <UserX size={17} />
                            Suspend Access
                          </button>
                        )}

                        {institution.verification !==
                          "Rejected" && (
                          <button
                            type="button"
                            onClick={() =>
                              updateVerification(
                                institution.id,
                                "Rejected"
                              )
                            }
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <XCircle size={17} />
                            Reject Institution
                          </button>
                        )}

                        <div className="my-1 border-t border-neutral-100" />

                        <button
                          type="button"
                          onClick={() =>
                            deleteInstitution(institution.id)
                          }
                          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 size={17} />
                          Remove Institution
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
          {paginatedInstitutions.map((institution) => (
            <article
              key={institution.id}
              className="rounded-2xl border border-neutral-200 p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                    {institution.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <h3 className="font-bold text-neutral-900">
                      {institution.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      {institution.code}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                    statusStyles[institution.status]
                  }`}
                >
                  {institution.status}
                </span>
              </div>

              <div className="mt-5 space-y-3 text-sm text-neutral-600">
                <p className="flex items-center gap-2">
                  <GraduationCap size={17} />
                  {institution.institutionType}
                </p>

                <p className="flex items-center gap-2">
                  <MapPin size={17} />
                  {institution.location}
                </p>

                <p className="flex items-center gap-2">
                  <Mail size={17} />
                  {institution.email}
                </p>
              </div>

              <div className="mt-5 grid grid-cols-4 gap-2 rounded-2xl bg-neutral-50 p-4 text-center">
                <div>
                  <p className="font-bold text-neutral-900">
                    {institution.students}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Students
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {institution.recruiters}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Recruiters
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {institution.placementDrives}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Drives
                  </p>
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    {institution.placedStudents}
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Placed
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    verificationStyles[
                      institution.verification
                    ]
                  }`}
                >
                  {institution.verification}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedInstitution(institution)
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                >
                  <Eye size={16} />
                  View
                </button>

                {institution.verification !== "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateVerification(
                        institution.id,
                        "Verified"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                  >
                    <CheckCircle2 size={16} />
                    Verify
                  </button>
                )}

                {institution.status === "Active" ? (
                  <button
                    type="button"
                    onClick={() =>
                      updateInstitutionStatus(
                        institution.id,
                        "Suspended"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                  >
                    <UserX size={16} />
                    Suspend
                  </button>
                ) : (
                  institution.verification === "Verified" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateInstitutionStatus(
                          institution.id,
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

        {filteredInstitutions.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Building2 size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No institutions found
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

        {filteredInstitutions.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + institutionsPerPage,
                  filteredInstitutions.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredInstitutions.length}
              </span>{" "}
              institutions
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
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

      {selectedInstitution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 text-xl font-bold text-white">
                  {selectedInstitution.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedInstitution.name}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedInstitution.code} ·{" "}
                    {selectedInstitution.institutionType}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[
                          selectedInstitution.status
                        ]
                      }`}
                    >
                      {selectedInstitution.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        verificationStyles[
                          selectedInstitution.verification
                        ]
                      }`}
                    >
                      {selectedInstitution.verification}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedInstitution(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close institution details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Mail size={16} />
                    Institution Email
                  </p>

                  <p className="mt-2 break-all font-medium text-neutral-900">
                    {selectedInstitution.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Contact Number
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInstitution.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Globe2 size={16} />
                    Website
                  </p>

                  <p className="mt-2 break-all font-medium text-blue-700">
                    {selectedInstitution.website}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <MapPin size={16} />
                    Location
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedInstitution.location}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Institution Information
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm text-neutral-500">
                        University or Affiliation
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedInstitution.university}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Accreditation
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedInstitution.accreditation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Full Address
                      </p>

                      <p className="mt-1 leading-6 text-neutral-900">
                        {selectedInstitution.address}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Administration
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm text-neutral-500">
                        Institution Administrator
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedInstitution.administrator}
                      </p>

                      <p className="mt-1 text-sm text-neutral-600">
                        {
                          selectedInstitution.administratorEmail
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Placement Officer
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedInstitution.placementOfficer ||
                          "Not assigned"}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-neutral-500">
                        Platform Joined Date
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {formatDate(
                          selectedInstitution.joinedDate
                        )}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Institution Overview
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedInstitution.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <Users
                    size={22}
                    className="mx-auto text-blue-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedInstitution.students}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Students
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <Building2
                    size={22}
                    className="mx-auto text-purple-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedInstitution.recruiters}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Recruiters
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <GraduationCap
                    size={22}
                    className="mx-auto text-amber-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedInstitution.placementDrives}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Placement Drives
                  </p>
                </article>

                <article className="rounded-2xl border border-neutral-200 p-5 text-center">
                  <UserCheck
                    size={22}
                    className="mx-auto text-emerald-700"
                  />

                  <p className="mt-3 text-3xl font-bold text-neutral-900">
                    {selectedInstitution.placedStudents}
                  </p>

                  <p className="mt-1 text-sm text-neutral-500">
                    Students Placed
                  </p>
                </article>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              {selectedInstitution.verification !==
                "Verified" && (
                <button
                  type="button"
                  onClick={() =>
                    updateVerification(
                      selectedInstitution.id,
                      "Verified"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-4 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <CheckCircle2 size={18} />
                  Verify Institution
                </button>
              )}

              {selectedInstitution.status === "Active" ? (
                <button
                  type="button"
                  onClick={() =>
                    updateInstitutionStatus(
                      selectedInstitution.id,
                      "Suspended"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
                >
                  <UserX size={18} />
                  Suspend Access
                </button>
              ) : (
                selectedInstitution.verification ===
                  "Verified" && (
                  <button
                    type="button"
                    onClick={() =>
                      updateInstitutionStatus(
                        selectedInstitution.id,
                        "Active"
                      )
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                  >
                    <UserCheck size={18} />
                    Activate Institution
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
            onSubmit={handleAddInstitution}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add Institution
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Register an educational institution for platform
                  verification.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setInstitutionForm(emptyInstitutionForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close institution form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Institution Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={institutionForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter institution name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Institution Code
                </label>

                <input
                  type="text"
                  name="code"
                  value={institutionForm.code}
                  onChange={handleFormChange}
                  placeholder="Example: CTE-CBE-001"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  University or Affiliation
                </label>

                <input
                  type="text"
                  name="university"
                  value={institutionForm.university}
                  onChange={handleFormChange}
                  placeholder="Enter university name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Institution Type
                </label>

                <select
                  name="institutionType"
                  value={institutionForm.institutionType}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Private Engineering College</option>
                  <option>
                    Government Engineering College
                  </option>
                  <option>
                    Autonomous Engineering College
                  </option>
                  <option>Private University</option>
                  <option>State University</option>
                  <option>Deemed University</option>
                  <option>Autonomous Institution</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Official Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={institutionForm.email}
                  onChange={handleFormChange}
                  placeholder="placement@institution.edu"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Contact Number
                </label>

                <input
                  type="text"
                  name="phone"
                  value={institutionForm.phone}
                  onChange={handleFormChange}
                  placeholder="+91 422 123 4567"
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
                  value={institutionForm.website}
                  onChange={handleFormChange}
                  placeholder="https://institution.edu"
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
                  value={institutionForm.location}
                  onChange={handleFormChange}
                  placeholder="City, State"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Institution Administrator
                </label>

                <input
                  type="text"
                  name="administrator"
                  value={institutionForm.administrator}
                  onChange={handleFormChange}
                  placeholder="Administrator name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Administrator Email
                </label>

                <input
                  type="email"
                  name="administratorEmail"
                  value={institutionForm.administratorEmail}
                  onChange={handleFormChange}
                  placeholder="admin@institution.edu"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Placement Officer
                </label>

                <input
                  type="text"
                  name="placementOfficer"
                  value={institutionForm.placementOfficer}
                  onChange={handleFormChange}
                  placeholder="Placement officer name"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Accreditation
                </label>

                <input
                  type="text"
                  name="accreditation"
                  value={institutionForm.accreditation}
                  onChange={handleFormChange}
                  placeholder="Example: NAAC A+"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Full Address
                </label>

                <textarea
                  name="address"
                  value={institutionForm.address}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Enter institution address"
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Institution Description
                </label>

                <textarea
                  name="description"
                  value={institutionForm.description}
                  onChange={handleFormChange}
                  rows={4}
                  placeholder="Describe the institution and academic focus..."
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
                      The institution will remain pending until its
                      registration and accreditation documents are
                      verified.
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
                  setInstitutionForm(emptyInstitutionForm);
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
                Add Institution
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Institutions;