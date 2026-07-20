import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Ban,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  GraduationCap,
  KeyRound,
  Mail,
  MoreVertical,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  UserCheck,
  UserCog,
  Users,
  UserSquare2,
  UserX,
  X,
} from "lucide-react";

const initialUsers = [
  {
    id: 1,
    name: "Arjun Kumar",
    email: "arjun.kumar@campuste.edu",
    phone: "+91 98765 43210",
    role: "Student",
    organization: "CampusTE Institute of Technology",
    identifier: "CB.EN.U4CSE23001",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 5:42 PM",
    joinedDate: "2026-01-12",
    location: "Coimbatore, Tamil Nadu",
    activity: "Applied to TechNova Solutions",
  },
  {
    id: 2,
    name: "Meera Shah",
    email: "meera.shah@datacraft.com",
    phone: "+91 99887 66554",
    role: "Recruiter",
    organization: "DataCraft Analytics",
    identifier: "REC-2026-0142",
    status: "Pending",
    verification: "Pending",
    lastLogin: "Not available",
    joinedDate: "2026-07-18",
    location: "Chennai, Tamil Nadu",
    activity: "Submitted recruiter verification",
  },
  {
    id: 3,
    name: "Dr. Meenakshi Rao",
    email: "placement@campuste.edu",
    phone: "+91 98844 77221",
    role: "Placement Officer",
    organization: "CampusTE Institute of Technology",
    identifier: "PO-2026-001",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 5:15 PM",
    joinedDate: "2025-08-10",
    location: "Coimbatore, Tamil Nadu",
    activity: "Updated placement analytics",
  },
  {
    id: 4,
    name: "Rohit Verma",
    email: "rohit.verma@infosphere.com",
    phone: "+91 91234 56780",
    role: "Recruiter",
    organization: "Infosphere Technologies",
    identifier: "REC-2026-0084",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 4:58 PM",
    joinedDate: "2026-02-22",
    location: "Hyderabad, Telangana",
    activity: "Published a placement drive",
  },
  {
    id: 5,
    name: "Lakshmi Narayanan",
    email: "lakshmi.n@campuste.edu",
    phone: "+91 93333 77661",
    role: "Student",
    organization: "CampusTE Institute of Technology",
    identifier: "CB.EN.U4IT23024",
    status: "Suspended",
    verification: "Verified",
    lastLogin: "18 Jul 2026, 11:35 AM",
    joinedDate: "2026-01-15",
    location: "Coimbatore, Tamil Nadu",
    activity: "Account suspended after policy review",
  },
  {
    id: 6,
    name: "Ananya Sharma",
    email: "ananya.sharma@technova.com",
    phone: "+91 90000 11223",
    role: "Recruiter",
    organization: "TechNova Solutions",
    identifier: "REC-2026-0027",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 4:20 PM",
    joinedDate: "2025-12-18",
    location: "Bengaluru, Karnataka",
    activity: "Reviewed candidate applications",
  },
  {
    id: 7,
    name: "Prof. Arun Kumar",
    email: "arun.kumar@greenfield.edu",
    phone: "+91 97772 31145",
    role: "Placement Officer",
    organization: "Greenfield Institute of Technology",
    identifier: "PO-2026-034",
    status: "Pending",
    verification: "Pending",
    lastLogin: "Not available",
    joinedDate: "2026-07-19",
    location: "Salem, Tamil Nadu",
    activity: "Awaiting institution verification",
  },
  {
    id: 8,
    name: "Priya Sharma",
    email: "priya.sharma@campuste.edu",
    phone: "+91 95555 22441",
    role: "Student",
    organization: "CampusTE Institute of Technology",
    identifier: "CB.EN.U4CSE23014",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 3:44 PM",
    joinedDate: "2026-01-12",
    location: "Chennai, Tamil Nadu",
    activity: "Completed an interview",
  },
  {
    id: 9,
    name: "Institution Administrator",
    email: "admin@metroengineering.edu",
    phone: "+91 94444 66552",
    role: "Institution Admin",
    organization: "Metro Engineering College",
    identifier: "IA-2026-011",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 2:18 PM",
    joinedDate: "2026-03-11",
    location: "Madurai, Tamil Nadu",
    activity: "Imported student records",
  },
  {
    id: 10,
    name: "Sneha Kapoor",
    email: "sneha@finovate.com",
    phone: "+91 96661 27890",
    role: "Recruiter",
    organization: "Finovate Technologies",
    identifier: "REC-2026-0157",
    status: "Rejected",
    verification: "Rejected",
    lastLogin: "Not available",
    joinedDate: "2026-07-17",
    location: "Bengaluru, Karnataka",
    activity: "Recruiter verification rejected",
  },
  {
    id: 11,
    name: "System Administrator",
    email: "admin@campuste.edu",
    phone: "+91 422 123 4567",
    role: "System Admin",
    organization: "CampusTE Platform",
    identifier: "SA-001",
    status: "Active",
    verification: "Verified",
    lastLogin: "20 Jul 2026, 5:50 PM",
    joinedDate: "2025-01-01",
    location: "Coimbatore, Tamil Nadu",
    activity: "Reviewed platform health",
  },
  {
    id: 12,
    name: "Rahul Menon",
    email: "rahul.menon@campuste.edu",
    phone: "+91 98888 33110",
    role: "Student",
    organization: "CampusTE Institute of Technology",
    identifier: "CB.EN.U4AIE23008",
    status: "Inactive",
    verification: "Verified",
    lastLogin: "02 Jul 2026, 10:20 AM",
    joinedDate: "2026-01-13",
    location: "Kochi, Kerala",
    activity: "No activity during the last 18 days",
  },
];

const emptyUserForm = {
  name: "",
  email: "",
  phone: "",
  role: "Student",
  organization: "",
  identifier: "",
  location: "",
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

const roleConfig = {
  Student: {
    icon: GraduationCap,
    className: "bg-blue-100 text-blue-700",
  },
  Recruiter: {
    icon: UserSquare2,
    className: "bg-purple-100 text-purple-700",
  },
  "Placement Officer": {
    icon: UserCog,
    className: "bg-amber-100 text-amber-700",
  },
  "Institution Admin": {
    icon: Building2,
    className: "bg-cyan-100 text-cyan-700",
  },
  "System Admin": {
    icon: ShieldCheck,
    className: "bg-rose-100 text-rose-700",
  },
};

function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [verificationFilter, setVerificationFilter] =
    useState("All Verification");
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [userForm, setUserForm] = useState(emptyUserForm);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 7;

  const filteredUsers = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.organization.toLowerCase().includes(query) ||
        user.identifier.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === "All Roles" || user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        user.status === statusFilter;

      const matchesVerification =
        verificationFilter === "All Verification" ||
        user.verification === verificationFilter;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus &&
        matchesVerification
      );
    });
  }, [
    roleFilter,
    searchTerm,
    statusFilter,
    users,
    verificationFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );

  const startIndex = (currentPage - 1) * usersPerPage;

  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const stats = {
    total: users.length,
    active: users.filter((user) => user.status === "Active").length,
    pending: users.filter(
      (user) =>
        user.status === "Pending" ||
        user.verification === "Pending"
    ).length,
    suspended: users.filter(
      (user) => user.status === "Suspended"
    ).length,
  };

  const allVisibleSelected =
    paginatedUsers.length > 0 &&
    paginatedUsers.every((user) => selectedIds.includes(user.id));

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

  const updateUserStatus = (userId, status) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status,
            }
          : user
      )
    );

    setSelectedUser((previousUser) =>
      previousUser?.id === userId
        ? {
            ...previousUser,
            status,
          }
        : previousUser
    );

    setOpenMenuId(null);
    showMessage(`User status updated to ${status}.`);
  };

  const updateVerification = (userId, verification) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              verification,
              status:
                verification === "Verified"
                  ? "Active"
                  : verification === "Rejected"
                    ? "Rejected"
                    : user.status,
            }
          : user
      )
    );

    setSelectedUser((previousUser) =>
      previousUser?.id === userId
        ? {
            ...previousUser,
            verification,
            status:
              verification === "Verified"
                ? "Active"
                : verification === "Rejected"
                  ? "Rejected"
                  : previousUser.status,
          }
        : previousUser
    );

    setOpenMenuId(null);
    showMessage(`User verification updated to ${verification}.`);
  };

  const changeUserRole = (userId, role) => {
    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              role,
            }
          : user
      )
    );

    setSelectedUser((previousUser) =>
      previousUser?.id === userId
        ? {
            ...previousUser,
            role,
          }
        : previousUser
    );

    showMessage(`User role changed to ${role}.`);
  };

  const deleteUser = (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to permanently remove this user?"
    );

    if (!confirmed) {
      return;
    }

    setUsers((previousUsers) =>
      previousUsers.filter((user) => user.id !== userId)
    );

    setSelectedIds((previousIds) =>
      previousIds.filter((id) => id !== userId)
    );

    setSelectedUser(null);
    setOpenMenuId(null);
    showMessage("User removed successfully.");
  };

  const toggleUserSelection = (userId) => {
    setSelectedIds((previousIds) =>
      previousIds.includes(userId)
        ? previousIds.filter((id) => id !== userId)
        : [...previousIds, userId]
    );
  };

  const toggleVisibleSelection = () => {
    const visibleIds = paginatedUsers.map((user) => user.id);

    if (allVisibleSelected) {
      setSelectedIds((previousIds) =>
        previousIds.filter((id) => !visibleIds.includes(id))
      );

      return;
    }

    setSelectedIds((previousIds) => [
      ...new Set([...previousIds, ...visibleIds]),
    ]);
  };

  const updateSelectedUsers = (status) => {
    if (selectedIds.length === 0) {
      return;
    }

    setUsers((previousUsers) =>
      previousUsers.map((user) =>
        selectedIds.includes(user.id)
          ? {
              ...user,
              status,
            }
          : user
      )
    );

    setSelectedIds([]);
    showMessage(`Selected users updated to ${status}.`);
  };

  const deleteSelectedUsers = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Remove ${selectedIds.length} selected user(s)?`
    );

    if (!confirmed) {
      return;
    }

    setUsers((previousUsers) =>
      previousUsers.filter(
        (user) => !selectedIds.includes(user.id)
      )
    );

    setSelectedIds([]);
    showMessage("Selected users removed successfully.");
  };

  const handleUserFormChange = (event) => {
    const { name, value } = event.target;

    setUserForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleAddUser = (event) => {
    event.preventDefault();

    if (
      !userForm.name.trim() ||
      !userForm.email.trim() ||
      !userForm.organization.trim() ||
      !userForm.identifier.trim()
    ) {
      showMessage(
        "Complete the name, email, organization and identifier fields."
      );
      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        userForm.email.toLowerCase()
    );

    if (emailExists) {
      showMessage("A user with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      ...userForm,
      status: "Active",
      verification: "Verified",
      lastLogin: "Not available",
      joinedDate: new Date().toISOString().slice(0, 10),
      activity: "Account created by system administrator",
    };

    setUsers((previousUsers) => [newUser, ...previousUsers]);
    setUserForm(emptyUserForm);
    setShowAddUserModal(false);
    setCurrentPage(1);
    showMessage("User account created successfully.");
  };

  const resetPassword = (user) => {
    showMessage(`Password reset link sent to ${user.email}.`);
    setOpenMenuId(null);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setRoleFilter("All Roles");
    setStatusFilter("All Statuses");
    setVerificationFilter("All Verification");
    setSelectedIds([]);
    setCurrentPage(1);
    setOpenMenuId(null);
  };

  const handleExport = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Role",
      "Organization",
      "Identifier",
      "Status",
      "Verification",
      "Joined Date",
      "Last Login",
    ];

    const rows = users.map((user) => [
      user.name,
      user.email,
      user.phone,
      user.role,
      user.organization,
      user.identifier,
      user.status,
      user.verification,
      user.joinedDate,
      user.lastLogin,
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
    anchor.download = "campuste-users.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("User directory exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Users size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Account Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                User Management
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review platform users, manage account access, verify
                registrations, assign roles and maintain account
                security.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export Users
              </button>

              <button
                type="button"
                onClick={() => setShowAddUserModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Plus size={19} />
                Add User
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
            <Users size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Users
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
            Active Accounts
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.pending}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Pending Review
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <Ban size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.suspended}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Suspended Accounts
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                User Directory
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search and manage users across all platform roles.
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

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_210px_220px]">
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
                  setSelectedIds([]);
                }}
                placeholder="Search name, email, organization or identifier..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Roles</option>
              <option>Student</option>
              <option>Recruiter</option>
              <option>Placement Officer</option>
              <option>Institution Admin</option>
              <option>System Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
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
                setSelectedIds([]);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Verification</option>
              <option>Verified</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleVisibleSelection}
              className="h-4 w-4 accent-blue-600"
            />

            <span className="text-sm font-semibold text-neutral-700">
              Select visible users
            </span>
          </label>

          {selectedIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-bold text-blue-700">
                {selectedIds.length} selected
              </span>

              <button
                type="button"
                onClick={() => updateSelectedUsers("Active")}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                <UserCheck size={16} />
                Activate
              </button>

              <button
                type="button"
                onClick={() => updateSelectedUsers("Suspended")}
                className="inline-flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-3 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50"
              >
                <Ban size={16} />
                Suspend
              </button>

              <button
                type="button"
                onClick={deleteSelectedUsers}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1350px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4">
                  <span className="sr-only">Select user</span>
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  User
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Role
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Organization
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Account Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Verification
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
              {paginatedUsers.map((user) => {
                const role =
                  roleConfig[user.role] || roleConfig.Student;

                const RoleIcon = role.icon;

                return (
                  <tr
                    key={user.id}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-5">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(user.id)}
                        onChange={() =>
                          toggleUserSelection(user.id)
                        }
                        className="h-4 w-4 accent-blue-600"
                      />
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">
                            {user.name}
                          </p>

                          <p className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
                            <Mail size={14} />
                            {user.email}
                          </p>

                          <p className="mt-1 text-xs text-neutral-400">
                            {user.identifier}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl ${role.className}`}
                        >
                          <RoleIcon size={17} />
                        </div>

                        <span className="font-semibold text-neutral-700">
                          {user.role}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[230px] font-semibold text-neutral-800">
                        {user.organization}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {user.location}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyles[user.status]
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          verificationStyles[user.verification]
                        }`}
                      >
                        {user.verification}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="max-w-[180px] text-sm font-medium text-neutral-700">
                        {user.lastLogin}
                      </p>
                    </td>

                    <td className="relative px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenuId((previousId) =>
                            previousId === user.id ? null : user.id
                          )
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                        aria-label="Open user actions"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openMenuId === user.id && (
                        <div className="absolute right-6 top-14 z-20 w-60 overflow-hidden rounded-2xl border border-neutral-200 bg-white py-2 text-left shadow-xl">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedUser(user);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <Eye size={17} />
                            View Details
                          </button>

                          <button
                            type="button"
                            onClick={() => resetPassword(user)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
                          >
                            <KeyRound size={17} />
                            Send Password Reset
                          </button>

                          {user.verification !== "Verified" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateVerification(
                                  user.id,
                                  "Verified"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <CheckCircle2 size={17} />
                              Verify Account
                            </button>
                          )}

                          {user.status !== "Active" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateUserStatus(user.id, "Active")
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                            >
                              <UserCheck size={17} />
                              Activate Account
                            </button>
                          )}

                          {user.status === "Active" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateUserStatus(
                                  user.id,
                                  "Suspended"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-amber-700 hover:bg-amber-50"
                            >
                              <Ban size={17} />
                              Suspend Account
                            </button>
                          )}

                          {user.verification !== "Rejected" && (
                            <button
                              type="button"
                              onClick={() =>
                                updateVerification(
                                  user.id,
                                  "Rejected"
                                )
                              }
                              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                            >
                              <UserX size={17} />
                              Reject Account
                            </button>
                          )}

                          <div className="my-1 border-t border-neutral-100" />

                          <button
                            type="button"
                            onClick={() => deleteUser(user.id)}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-rose-700 hover:bg-rose-50"
                          >
                            <Trash2 size={17} />
                            Remove User
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
          {paginatedUsers.map((user) => {
            const role = roleConfig[user.role] || roleConfig.Student;
            const RoleIcon = role.icon;

            return (
              <article
                key={user.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleUserSelection(user.id)}
                    className="mt-4 h-4 w-4 accent-blue-600"
                  />

                  <div className="flex min-w-0 flex-1 items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-neutral-900">
                        {user.name}
                      </h3>

                      <p className="mt-1 truncate text-sm text-neutral-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[user.status]
                    }`}
                  >
                    {user.status}
                  </span>
                </div>

                <div className="mt-5 grid gap-3 text-sm text-neutral-600 sm:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-lg ${role.className}`}
                    >
                      <RoleIcon size={15} />
                    </div>

                    <span>{user.role}</span>
                  </div>

                  <p className="flex items-center gap-2">
                    <Building2 size={16} />
                    {user.organization}
                  </p>

                  <p className="flex items-center gap-2">
                    <Phone size={16} />
                    {user.phone}
                  </p>

                  <p className="font-medium text-neutral-700">
                    ID: {user.identifier}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      verificationStyles[user.verification]
                    }`}
                  >
                    {user.verification}
                  </span>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                    Joined {formatDate(user.joinedDate)}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(user)}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                  >
                    <Eye size={16} />
                    View
                  </button>

                  {user.verification !== "Verified" && (
                    <button
                      type="button"
                      onClick={() =>
                        updateVerification(user.id, "Verified")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <CheckCircle2 size={16} />
                      Verify
                    </button>
                  )}

                  {user.status === "Active" ? (
                    <button
                      type="button"
                      onClick={() =>
                        updateUserStatus(user.id, "Suspended")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-700"
                    >
                      <Ban size={16} />
                      Suspend
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        updateUserStatus(user.id, "Active")
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700"
                    >
                      <UserCheck size={16} />
                      Activate
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredUsers.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Users size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No users found
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

        {filteredUsers.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + usersPerPage,
                  filteredUsers.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredUsers.length}
              </span>{" "}
              users
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

      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-purple-700 text-xl font-bold text-white">
                  {selectedUser.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedUser.name}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedUser.identifier}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close user details"
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
                    {selectedUser.email}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                    <Phone size={16} />
                    Phone
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedUser.phone}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Joined Date
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {formatDate(selectedUser.joinedDate)}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Last Login
                  </p>

                  <p className="mt-2 font-medium text-neutral-900">
                    {selectedUser.lastLogin}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Account Information
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <p className="text-sm text-neutral-500">
                      Organization
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {selectedUser.organization}
                    </p>

                    <p className="mt-5 text-sm text-neutral-500">
                      Location
                    </p>

                    <p className="mt-1 font-medium text-neutral-900">
                      {selectedUser.location}
                    </p>

                    <p className="mt-5 text-sm text-neutral-500">
                      Recent Activity
                    </p>

                    <p className="mt-1 font-medium text-neutral-900">
                      {selectedUser.activity}
                    </p>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Access and Verification
                  </h3>

                  <div className="mt-3 rounded-2xl border border-neutral-200 p-5">
                    <label className="block text-sm font-semibold text-neutral-600">
                      User Role
                    </label>

                    <select
                      value={selectedUser.role}
                      onChange={(event) =>
                        changeUserRole(
                          selectedUser.id,
                          event.target.value
                        )
                      }
                      className="mt-2 w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>Student</option>
                      <option>Recruiter</option>
                      <option>Placement Officer</option>
                      <option>Institution Admin</option>
                      <option>System Admin</option>
                    </select>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyles[selectedUser.status]
                        }`}
                      >
                        {selectedUser.status}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          verificationStyles[
                            selectedUser.verification
                          ]
                        }`}
                      >
                        {selectedUser.verification}
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => resetPassword(selectedUser)}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <KeyRound size={18} />
                Reset Password
              </button>

              {selectedUser.verification !== "Verified" && (
                <button
                  type="button"
                  onClick={() =>
                    updateVerification(
                      selectedUser.id,
                      "Verified"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 px-4 py-3 font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  <CheckCircle2 size={18} />
                  Verify Account
                </button>
              )}

              {selectedUser.status === "Active" ? (
                <button
                  type="button"
                  onClick={() =>
                    updateUserStatus(
                      selectedUser.id,
                      "Suspended"
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
                >
                  <Ban size={18} />
                  Suspend Account
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    updateUserStatus(selectedUser.id, "Active")
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  <UserCheck size={18} />
                  Activate Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleAddUser}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Add Platform User
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Create a verified user account and assign the required
                  platform role.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowAddUserModal(false);
                  setUserForm(emptyUserForm);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close user form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={userForm.name}
                  onChange={handleUserFormChange}
                  placeholder="Enter full name"
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
                  value={userForm.email}
                  onChange={handleUserFormChange}
                  placeholder="user@example.com"
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
                  value={userForm.phone}
                  onChange={handleUserFormChange}
                  placeholder="+91 98765 43210"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  User Role
                </label>

                <select
                  name="role"
                  value={userForm.role}
                  onChange={handleUserFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Student</option>
                  <option>Recruiter</option>
                  <option>Placement Officer</option>
                  <option>Institution Admin</option>
                  <option>System Admin</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Organization
                </label>

                <input
                  type="text"
                  name="organization"
                  value={userForm.organization}
                  onChange={handleUserFormChange}
                  placeholder="Enter institution or company"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  User Identifier
                </label>

                <input
                  type="text"
                  name="identifier"
                  value={userForm.identifier}
                  onChange={handleUserFormChange}
                  placeholder="Student ID or employee ID"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={userForm.location}
                  onChange={handleUserFormChange}
                  placeholder="City, State"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                      Administrator-created account
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700">
                      The account will be created as verified and active.
                      A password setup link can later be sent to the
                      registered email address.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowAddUserModal(false);
                  setUserForm(emptyUserForm);
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
                Create User
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AdminUsers;