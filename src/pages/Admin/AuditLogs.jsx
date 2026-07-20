import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Ban,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Clock3,
  Database,
  Download,
  Eye,
  FileClock,
  FileText,
  FilterX,
  KeyRound,
  Laptop,
  LogIn,
  MapPin,
  Search,
  Server,
  Settings,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  X,
  XCircle,
} from "lucide-react";

const initialAuditLogs = [
  {
    id: "AUD-20260720-001",
    timestamp: "20 Jul 2026, 5:52 PM",
    dateValue: "2026-07-20T17:52:00",
    actor: "System Administrator",
    actorEmail: "admin@campuste.edu",
    role: "System Admin",
    action: "Institution approved",
    category: "Institution",
    resource: "Greenfield Institute of Technology",
    resourceId: "GIT-SLM-014",
    ipAddress: "103.21.58.142",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "Medium",
    description:
      "The institution registration was verified and approved. Institution administrator and placement officer access were activated.",
    metadata: {
      previousStatus: "Pending",
      updatedStatus: "Active",
      verification: "Verified",
      sessionId: "SES-8F72K91",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-002",
    timestamp: "20 Jul 2026, 5:44 PM",
    dateValue: "2026-07-20T17:44:00",
    actor: "Security Monitor",
    actorEmail: "security@campuste.system",
    role: "System Service",
    action: "Failed login attempts blocked",
    category: "Authentication",
    resource: "Recruiter login account",
    resourceId: "REC-2026-0068",
    ipAddress: "45.114.82.19",
    location: "Unknown location",
    device: "Unknown device",
    status: "Blocked",
    severity: "Critical",
    description:
      "Multiple failed login attempts were detected from the same network address. The account was temporarily locked.",
    metadata: {
      failedAttempts: "9",
      lockDuration: "30 minutes",
      securityRule: "AUTH-BRUTE-FORCE-01",
      sessionId: "Not created",
    },
    reviewed: false,
  },
  {
    id: "AUD-20260720-003",
    timestamp: "20 Jul 2026, 5:31 PM",
    dateValue: "2026-07-20T17:31:00",
    actor: "Dr. Meenakshi Rao",
    actorEmail: "placement@campuste.edu",
    role: "Placement Officer",
    action: "Student records imported",
    category: "Student Data",
    resource: "2026 CSE student batch",
    resourceId: "IMPORT-CSE-2026-07",
    ipAddress: "117.207.42.114",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Edge",
    status: "Success",
    severity: "Low",
    description:
      "A bulk student import was completed successfully for the Computer Science and Engineering department.",
    metadata: {
      recordsSubmitted: "248",
      recordsCreated: "242",
      recordsRejected: "6",
      fileName: "cse_students_2026.csv",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-004",
    timestamp: "20 Jul 2026, 5:18 PM",
    dateValue: "2026-07-20T17:18:00",
    actor: "System Administrator",
    actorEmail: "admin@campuste.edu",
    role: "System Admin",
    action: "Recruiter account suspended",
    category: "Recruiter",
    resource: "DesignLoop Studios",
    resourceId: "REC-2026-0068",
    ipAddress: "103.21.58.142",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "High",
    description:
      "Recruiter access was suspended after a policy review identified incomplete company verification documents.",
    metadata: {
      previousStatus: "Active",
      updatedStatus: "Suspended",
      reason: "Verification documentation review",
      sessionId: "SES-8F72K91",
    },
    reviewed: false,
  },
  {
    id: "AUD-20260720-005",
    timestamp: "20 Jul 2026, 4:56 PM",
    dateValue: "2026-07-20T16:56:00",
    actor: "Ananya Sharma",
    actorEmail: "ananya.sharma@technova.com",
    role: "Recruiter",
    action: "Placement drive published",
    category: "Recruitment",
    resource: "Graduate Software Engineer 2026",
    resourceId: "DRV-2026-0186",
    ipAddress: "49.207.214.92",
    location: "Bengaluru, Karnataka",
    device: "macOS · Safari",
    status: "Success",
    severity: "Low",
    description:
      "A new placement drive was published for eligible Computer Science and Information Technology students.",
    metadata: {
      openings: "42",
      eligibleInstitutions: "8",
      applicationDeadline: "31 Jul 2026",
      jobType: "Full-time",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-006",
    timestamp: "20 Jul 2026, 4:38 PM",
    dateValue: "2026-07-20T16:38:00",
    actor: "System Administrator",
    actorEmail: "admin@campuste.edu",
    role: "System Admin",
    action: "User role updated",
    category: "User Management",
    resource: "Ramesh Narayanan",
    resourceId: "USR-2026-0421",
    ipAddress: "103.21.58.142",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "Medium",
    description:
      "The user role was changed from Institution Staff to Placement Officer after administrator verification.",
    metadata: {
      previousRole: "Institution Staff",
      updatedRole: "Placement Officer",
      approvedBy: "System Administrator",
      sessionId: "SES-8F72K91",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-007",
    timestamp: "20 Jul 2026, 4:12 PM",
    dateValue: "2026-07-20T16:12:00",
    actor: "Authentication Service",
    actorEmail: "auth@campuste.system",
    role: "System Service",
    action: "Password reset completed",
    category: "Authentication",
    resource: "Meera Shah",
    resourceId: "REC-2026-0142",
    ipAddress: "106.51.79.227",
    location: "Chennai, Tamil Nadu",
    device: "Android · Chrome",
    status: "Success",
    severity: "Medium",
    description:
      "The user successfully reset their password using a verified password reset link.",
    metadata: {
      verificationMethod: "Email OTP",
      passwordPolicy: "Compliant",
      tokenStatus: "Consumed",
      sessionId: "SES-A62LM41",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-008",
    timestamp: "20 Jul 2026, 3:48 PM",
    dateValue: "2026-07-20T15:48:00",
    actor: "File Storage Service",
    actorEmail: "storage@campuste.system",
    role: "System Service",
    action: "Resume upload failed",
    category: "File Management",
    resource: "Student resume",
    resourceId: "RES-CB23CSE014",
    ipAddress: "157.49.62.18",
    location: "Chennai, Tamil Nadu",
    device: "Android · Chrome",
    status: "Failed",
    severity: "Medium",
    description:
      "A resume upload failed because the file exceeded the configured maximum upload size.",
    metadata: {
      fileName: "Priya_Sharma_Resume.pdf",
      fileSize: "12.8 MB",
      maximumSize: "10 MB",
      errorCode: "FILE-SIZE-EXCEEDED",
    },
    reviewed: false,
  },
  {
    id: "AUD-20260720-009",
    timestamp: "20 Jul 2026, 3:20 PM",
    dateValue: "2026-07-20T15:20:00",
    actor: "System Administrator",
    actorEmail: "admin@campuste.edu",
    role: "System Admin",
    action: "System settings updated",
    category: "System Configuration",
    resource: "Authentication policy",
    resourceId: "CFG-AUTH-001",
    ipAddress: "103.21.58.142",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "High",
    description:
      "The maximum failed login attempt limit was changed as part of the platform security policy update.",
    metadata: {
      previousValue: "10 attempts",
      updatedValue: "5 attempts",
      configuration: "Maximum login attempts",
      sessionId: "SES-8F72K91",
    },
    reviewed: false,
  },
  {
    id: "AUD-20260720-010",
    timestamp: "20 Jul 2026, 2:52 PM",
    dateValue: "2026-07-20T14:52:00",
    actor: "Arjun Kumar",
    actorEmail: "arjun.kumar@campuste.edu",
    role: "Student",
    action: "User login",
    category: "Authentication",
    resource: "Student Portal",
    resourceId: "CB.EN.U4CSE23001",
    ipAddress: "49.37.184.62",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "Low",
    description:
      "The student successfully signed in using registered email credentials.",
    metadata: {
      authenticationMethod: "Email and password",
      multiFactorAuthentication: "Not enabled",
      sessionId: "SES-F82PQ19",
      browserVersion: "Chrome 150",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260720-011",
    timestamp: "20 Jul 2026, 2:26 PM",
    dateValue: "2026-07-20T14:26:00",
    actor: "Database Monitor",
    actorEmail: "database@campuste.system",
    role: "System Service",
    action: "Database response threshold exceeded",
    category: "Infrastructure",
    resource: "Primary database cluster",
    resourceId: "DB-PRIMARY-01",
    ipAddress: "10.10.4.21",
    location: "Internal network",
    device: "Database monitoring agent",
    status: "Warning",
    severity: "High",
    description:
      "Database query response time exceeded the defined warning threshold for approximately four minutes.",
    metadata: {
      averageResponseTime: "684 ms",
      threshold: "500 ms",
      duration: "4 minutes 18 seconds",
      affectedQueries: "38",
    },
    reviewed: false,
  },
  {
    id: "AUD-20260720-012",
    timestamp: "20 Jul 2026, 1:58 PM",
    dateValue: "2026-07-20T13:58:00",
    actor: "System Administrator",
    actorEmail: "admin@campuste.edu",
    role: "System Admin",
    action: "Administrator account created",
    category: "User Management",
    resource: "Institution Administrator",
    resourceId: "IA-2026-042",
    ipAddress: "103.21.58.142",
    location: "Coimbatore, Tamil Nadu",
    device: "Windows 11 · Chrome",
    status: "Success",
    severity: "High",
    description:
      "A new institution administrator account was created for Central Institute of Applied Sciences.",
    metadata: {
      institution: "Central Institute of Applied Sciences",
      accountStatus: "Active",
      verification: "Verified",
      sessionId: "SES-8F72K91",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260719-013",
    timestamp: "19 Jul 2026, 6:44 PM",
    dateValue: "2026-07-19T18:44:00",
    actor: "AI Shortlisting Engine",
    actorEmail: "ai-engine@campuste.system",
    role: "System Service",
    action: "Candidate shortlisting completed",
    category: "AI Processing",
    resource: "Software Engineer Drive",
    resourceId: "DRV-2026-0179",
    ipAddress: "10.10.6.18",
    location: "Internal network",
    device: "AI processing worker",
    status: "Success",
    severity: "Medium",
    description:
      "The AI shortlisting engine completed candidate scoring for the selected placement drive.",
    metadata: {
      applicationsProcessed: "864",
      candidatesRecommended: "218",
      processingTime: "3 minutes 42 seconds",
      modelVersion: "shortlist-v2.4",
    },
    reviewed: true,
  },
  {
    id: "AUD-20260719-014",
    timestamp: "19 Jul 2026, 5:18 PM",
    dateValue: "2026-07-19T17:18:00",
    actor: "Notification Service",
    actorEmail: "notifications@campuste.system",
    role: "System Service",
    action: "Notification delivery partially failed",
    category: "Notification",
    resource: "Interview schedule announcement",
    resourceId: "NTF-2026-7642",
    ipAddress: "10.10.5.14",
    location: "Internal network",
    device: "Notification worker",
    status: "Warning",
    severity: "Medium",
    description:
      "Several email notifications could not be delivered because recipient addresses were unavailable.",
    metadata: {
      notificationsSubmitted: "426",
      notificationsDelivered: "412",
      notificationsFailed: "14",
      retryStatus: "Scheduled",
    },
    reviewed: false,
  },
];

const statusStyles = {
  Success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Failed: "border-rose-200 bg-rose-50 text-rose-700",
  Blocked: "border-rose-200 bg-rose-50 text-rose-700",
  Warning: "border-amber-200 bg-amber-50 text-amber-700",
};

const severityStyles = {
  Low: "bg-neutral-100 text-neutral-600",
  Medium: "bg-blue-50 text-blue-700",
  High: "bg-amber-50 text-amber-700",
  Critical: "bg-rose-50 text-rose-700",
};

const categoryConfiguration = {
  Authentication: {
    icon: LogIn,
    className: "bg-blue-100 text-blue-700",
  },
  Institution: {
    icon: ShieldCheck,
    className: "bg-purple-100 text-purple-700",
  },
  "Student Data": {
    icon: Users,
    className: "bg-cyan-100 text-cyan-700",
  },
  Recruiter: {
    icon: UserCheck,
    className: "bg-emerald-100 text-emerald-700",
  },
  Recruitment: {
    icon: FileText,
    className: "bg-indigo-100 text-indigo-700",
  },
  "User Management": {
    icon: UserCog,
    className: "bg-amber-100 text-amber-700",
  },
  "File Management": {
    icon: FileText,
    className: "bg-orange-100 text-orange-700",
  },
  "System Configuration": {
    icon: Settings,
    className: "bg-violet-100 text-violet-700",
  },
  Infrastructure: {
    icon: Server,
    className: "bg-rose-100 text-rose-700",
  },
  "AI Processing": {
    icon: Database,
    className: "bg-fuchsia-100 text-fuchsia-700",
  },
  Notification: {
    icon: AlertTriangle,
    className: "bg-yellow-100 text-yellow-700",
  },
};

function AuditLogs() {
  const [logs, setLogs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");
  const [statusFilter, setStatusFilter] =
    useState("All Statuses");
  const [severityFilter, setSeverityFilter] =
    useState("All Severities");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [reviewFilter, setReviewFilter] =
    useState("All Review States");
  const [selectedLog, setSelectedLog] = useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const logsPerPage = 7;

  const categories = useMemo(
    () => [
      "All Categories",
      ...new Set(logs.map((log) => log.category)),
    ],
    [logs]
  );

  const roles = useMemo(
    () => ["All Roles", ...new Set(logs.map((log) => log.role))],
    [logs]
  );

  const filteredLogs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return logs.filter((log) => {
      const matchesSearch =
        log.id.toLowerCase().includes(query) ||
        log.actor.toLowerCase().includes(query) ||
        log.actorEmail.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.resource.toLowerCase().includes(query) ||
        log.resourceId.toLowerCase().includes(query) ||
        log.ipAddress.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All Categories" ||
        log.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        log.status === statusFilter;

      const matchesSeverity =
        severityFilter === "All Severities" ||
        log.severity === severityFilter;

      const matchesRole =
        roleFilter === "All Roles" || log.role === roleFilter;

      const matchesReview =
        reviewFilter === "All Review States" ||
        (reviewFilter === "Reviewed" && log.reviewed) ||
        (reviewFilter === "Needs Review" && !log.reviewed);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesSeverity &&
        matchesRole &&
        matchesReview
      );
    });
  }, [
    categoryFilter,
    logs,
    reviewFilter,
    roleFilter,
    searchTerm,
    severityFilter,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / logsPerPage)
  );

  const startIndex = (currentPage - 1) * logsPerPage;

  const paginatedLogs = filteredLogs.slice(
    startIndex,
    startIndex + logsPerPage
  );

  const stats = {
    total: logs.length,
    successful: logs.filter((log) => log.status === "Success")
      .length,
    warnings: logs.filter((log) => log.status === "Warning")
      .length,
    critical: logs.filter(
      (log) =>
        log.severity === "Critical" ||
        log.status === "Blocked" ||
        log.status === "Failed"
    ).length,
    unreviewed: logs.filter((log) => !log.reviewed).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All Categories");
    setStatusFilter("All Statuses");
    setSeverityFilter("All Severities");
    setRoleFilter("All Roles");
    setReviewFilter("All Review States");
    setCurrentPage(1);
  };

  const markAsReviewed = (logId) => {
    setLogs((previousLogs) =>
      previousLogs.map((log) =>
        log.id === logId
          ? {
              ...log,
              reviewed: true,
            }
          : log
      )
    );

    setSelectedLog((previousLog) =>
      previousLog?.id === logId
        ? {
            ...previousLog,
            reviewed: true,
          }
        : previousLog
    );

    showMessage("Audit event marked as reviewed.");
  };

  const markAllVisibleReviewed = () => {
    const visibleIds = paginatedLogs.map((log) => log.id);

    setLogs((previousLogs) =>
      previousLogs.map((log) =>
        visibleIds.includes(log.id)
          ? {
              ...log,
              reviewed: true,
            }
          : log
      )
    );

    showMessage("Visible audit events marked as reviewed.");
  };

  const copyEventId = async (eventId) => {
    try {
      await navigator.clipboard.writeText(eventId);
      showMessage("Audit event ID copied.");
    } catch {
      showMessage(`Audit event ID: ${eventId}`);
    }
  };

  const handleExport = () => {
    const headers = [
      "Event ID",
      "Timestamp",
      "Actor",
      "Actor Email",
      "Role",
      "Action",
      "Category",
      "Resource",
      "Resource ID",
      "IP Address",
      "Location",
      "Device",
      "Status",
      "Severity",
      "Reviewed",
      "Description",
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      log.timestamp,
      log.actor,
      log.actorEmail,
      log.role,
      log.action,
      log.category,
      log.resource,
      log.resourceId,
      log.ipAddress,
      log.location,
      log.device,
      log.status,
      log.severity,
      log.reviewed ? "Yes" : "No",
      log.description,
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
    anchor.download = "campuste-audit-logs.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    showMessage("Filtered audit logs exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <FileClock size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Security and Compliance
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Audit Logs
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review administrator actions, authentication events,
                account changes, data operations and infrastructure
                activity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={markAllVisibleReviewed}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Check size={18} />
                Review Visible
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Download size={18} />
                Export Logs
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

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <FileClock size={21} />
          </div>

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Events
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={21} />
          </div>

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {stats.successful}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Successful Events
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle size={21} />
          </div>

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {stats.warnings}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Warning Events
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <ShieldAlert size={21} />
          </div>

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {stats.critical}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Failed or Critical
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <Eye size={21} />
          </div>

          <p className="mt-5 text-3xl font-bold text-neutral-900">
            {stats.unreviewed}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Needs Review
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Platform Activity History
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search and inspect security-sensitive platform events.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              <FilterX size={18} />
              Reset Filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_210px_190px]">
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
                }}
                placeholder="Search event ID, actor, action, resource, IP address..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Failed</option>
              <option>Blocked</option>
            </select>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <select
              value={severityFilter}
              onChange={(event) => {
                setSeverityFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Severities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>

            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {roles.map((role) => (
                <option key={role}>{role}</option>
              ))}
            </select>

            <select
              value={reviewFilter}
              onChange={(event) => {
                setReviewFilter(event.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Review States</option>
              <option>Reviewed</option>
              <option>Needs Review</option>
            </select>
          </div>
        </div>

        <div className="hidden overflow-x-auto xl:block">
          <table className="w-full min-w-[1450px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Event
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Actor
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Action and Resource
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Source
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Severity
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Review
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Details
                </th>
              </tr>
            </thead>

            <tbody>
              {paginatedLogs.map((log) => {
                const configuration =
                  categoryConfiguration[log.category] ||
                  categoryConfiguration.Authentication;

                const CategoryIcon = configuration.icon;

                return (
                  <tr
                    key={log.id}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${configuration.className}`}
                        >
                          <CategoryIcon size={20} />
                        </div>

                        <div>
                          <p className="font-bold text-neutral-900">
                            {log.id}
                          </p>

                          <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                            <Clock3 size={14} />
                            {log.timestamp}
                          </p>

                          <p className="mt-1 text-xs font-semibold text-blue-700">
                            {log.category}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold text-neutral-900">
                        {log.actor}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {log.actorEmail}
                      </p>

                      <span className="mt-2 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                        {log.role}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-bold text-neutral-900">
                        {log.action}
                      </p>

                      <p className="mt-1 max-w-[250px] text-sm text-neutral-600">
                        {log.resource}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {log.resourceId}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <p className="font-semibold text-neutral-800">
                        {log.ipAddress}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-sm text-neutral-500">
                        <MapPin size={14} />
                        {log.location}
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {log.device}
                      </p>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                          severityStyles[log.severity]
                        }`}
                      >
                        {log.severity}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
                          statusStyles[log.status]
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      {log.reviewed ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                          <Check size={14} />
                          Reviewed
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => markAsReviewed(log.id)}
                          className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 transition hover:bg-amber-100"
                        >
                          <Eye size={14} />
                          Review
                        </button>
                      )}
                    </td>

                    <td className="px-6 py-5 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                        aria-label="View audit event"
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 xl:hidden">
          {paginatedLogs.map((log) => {
            const configuration =
              categoryConfiguration[log.category] ||
              categoryConfiguration.Authentication;

            const CategoryIcon = configuration.icon;

            return (
              <article
                key={log.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${configuration.className}`}
                    >
                      <CategoryIcon size={20} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-bold text-neutral-900">
                        {log.action}
                      </h3>

                      <p className="mt-1 text-sm text-neutral-500">
                        {log.id}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${
                      statusStyles[log.status]
                    }`}
                  >
                    {log.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3 text-sm text-neutral-600">
                  <p>
                    <span className="font-semibold text-neutral-800">
                      Actor:
                    </span>{" "}
                    {log.actor}
                  </p>

                  <p>
                    <span className="font-semibold text-neutral-800">
                      Resource:
                    </span>{" "}
                    {log.resource}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock3 size={16} />
                    {log.timestamp}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {log.location}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      severityStyles[log.severity]
                    }`}
                  >
                    {log.severity} severity
                  </span>

                  <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                    {log.category}
                  </span>

                  {log.reviewed ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      <Check size={13} />
                      Reviewed
                    </span>
                  ) : (
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      Needs review
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedLog(log)}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700"
                  >
                    <Eye size={16} />
                    View Details
                  </button>

                  {!log.reviewed && (
                    <button
                      type="button"
                      onClick={() => markAsReviewed(log.id)}
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700"
                    >
                      <Check size={16} />
                      Mark Reviewed
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {filteredLogs.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <FileClock size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No audit events found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search value or selected filters.
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

        {filteredLogs.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + logsPerPage,
                  filteredLogs.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredLogs.length}
              </span>{" "}
              audit events
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

      <section className="rounded-3xl border border-neutral-200 bg-gradient-to-r from-neutral-900 via-blue-950 to-indigo-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Audit Retention Policy
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
                Administrative and security events are immutable and
                retained according to platform compliance policies.
                Marking an event as reviewed does not modify the
                original event information.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-blue-200">
                Retention
              </p>

              <p className="mt-1 text-xl font-bold">365 Days</p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-blue-200">
                Integrity
              </p>

              <p className="mt-1 text-xl font-bold">Protected</p>
            </div>
          </div>
        </div>
      </section>

      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${
                    severityStyles[selectedLog.severity]
                  }`}
                >
                  {selectedLog.severity === "Critical" ? (
                    <ShieldAlert size={25} />
                  ) : selectedLog.status === "Success" ? (
                    <CheckCircle2 size={25} />
                  ) : (
                    <AlertTriangle size={25} />
                  )}
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedLog.action}
                  </h2>

                  <p className="mt-1 text-neutral-600">
                    {selectedLog.id}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-bold ${
                        statusStyles[selectedLog.status]
                      }`}
                    >
                      {selectedLog.status}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        severityStyles[selectedLog.severity]
                      }`}
                    >
                      {selectedLog.severity} severity
                    </span>

                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                      {selectedLog.category}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close audit details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-8 p-6 sm:p-8">
              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Event Description
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedLog.description}
                </p>
              </section>

              <div className="grid gap-6 lg:grid-cols-2">
                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Event Information
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Event ID
                      </p>

                      <div className="mt-1 flex items-center justify-between gap-3">
                        <p className="font-bold text-neutral-900">
                          {selectedLog.id}
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            copyEventId(selectedLog.id)
                          }
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                          aria-label="Copy event ID"
                        >
                          <Clipboard size={17} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Timestamp
                      </p>

                      <p className="mt-1 flex items-center gap-2 font-medium text-neutral-900">
                        <Clock3 size={16} />
                        {selectedLog.timestamp}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Resource
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedLog.resource}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {selectedLog.resourceId}
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-bold text-neutral-900">
                    Actor Information
                  </h3>

                  <div className="mt-3 space-y-5 rounded-2xl border border-neutral-200 p-5">
                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Actor
                      </p>

                      <p className="mt-1 font-bold text-neutral-900">
                        {selectedLog.actor}
                      </p>

                      <p className="mt-1 text-sm text-neutral-500">
                        {selectedLog.actorEmail}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Platform Role
                      </p>

                      <p className="mt-1 font-medium text-neutral-900">
                        {selectedLog.role}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-neutral-500">
                        Review Status
                      </p>

                      <p
                        className={`mt-1 font-bold ${
                          selectedLog.reviewed
                            ? "text-emerald-700"
                            : "text-amber-700"
                        }`}
                      >
                        {selectedLog.reviewed
                          ? "Reviewed"
                          : "Needs administrator review"}
                      </p>
                    </div>
                  </div>
                </section>
              </div>

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Source Information
                </h3>

                <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                      <Server size={16} />
                      IP Address
                    </p>

                    <p className="mt-2 font-bold text-neutral-900">
                      {selectedLog.ipAddress}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                      <MapPin size={16} />
                      Location
                    </p>

                    <p className="mt-2 font-bold text-neutral-900">
                      {selectedLog.location}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-neutral-50 p-5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-neutral-500">
                      {selectedLog.device
                        .toLowerCase()
                        .includes("android") ? (
                        <Smartphone size={16} />
                      ) : (
                        <Laptop size={16} />
                      )}
                      Device
                    </p>

                    <p className="mt-2 font-bold text-neutral-900">
                      {selectedLog.device}
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Event Metadata
                </h3>

                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  {Object.entries(selectedLog.metadata).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="rounded-2xl border border-neutral-200 p-5"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                          {key
                            .replace(/([A-Z])/g, " $1")
                            .replace(/^./, (character) =>
                              character.toUpperCase()
                            )}
                        </p>

                        <p className="mt-2 font-semibold text-neutral-900">
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => copyEventId(selectedLog.id)}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                <Clipboard size={18} />
                Copy Event ID
              </button>

              {!selectedLog.reviewed && (
                <button
                  type="button"
                  onClick={() =>
                    markAsReviewed(selectedLog.id)
                  }
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
                >
                  <Check size={18} />
                  Mark as Reviewed
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuditLogs;