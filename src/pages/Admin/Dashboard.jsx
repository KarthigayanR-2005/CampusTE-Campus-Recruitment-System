import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  Cloud,
  Database,
  Download,
  FileClock,
  GraduationCap,
  RefreshCw,
  Server,
  ShieldCheck,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  UserSquare2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const dashboardData = {
  "Last 7 Days": {
    summary: {
      users: 9248,
      institutions: 42,
      recruiters: 486,
      placementOfficers: 68,
      activeUsers: 6418,
      placementDrives: 184,
      applications: 12846,
      offers: 1642,
    },
    growth: [
      {
        label: "Mon",
        students: 412,
        recruiters: 68,
        officers: 18,
      },
      {
        label: "Tue",
        students: 468,
        recruiters: 74,
        officers: 20,
      },
      {
        label: "Wed",
        students: 526,
        recruiters: 79,
        officers: 22,
      },
      {
        label: "Thu",
        students: 492,
        recruiters: 82,
        officers: 21,
      },
      {
        label: "Fri",
        students: 578,
        recruiters: 91,
        officers: 24,
      },
      {
        label: "Sat",
        students: 432,
        recruiters: 66,
        officers: 17,
      },
      {
        label: "Sun",
        students: 386,
        recruiters: 58,
        officers: 15,
      },
    ],
  },

  "Last 30 Days": {
    summary: {
      users: 9248,
      institutions: 42,
      recruiters: 486,
      placementOfficers: 68,
      activeUsers: 7118,
      placementDrives: 326,
      applications: 28642,
      offers: 2874,
    },
    growth: [
      {
        label: "Week 1",
        students: 1320,
        recruiters: 182,
        officers: 42,
      },
      {
        label: "Week 2",
        students: 1584,
        recruiters: 216,
        officers: 48,
      },
      {
        label: "Week 3",
        students: 1798,
        recruiters: 241,
        officers: 54,
      },
      {
        label: "Week 4",
        students: 2062,
        recruiters: 276,
        officers: 61,
      },
    ],
  },

  "Last 12 Months": {
    summary: {
      users: 9248,
      institutions: 42,
      recruiters: 486,
      placementOfficers: 68,
      activeUsers: 7834,
      placementDrives: 1248,
      applications: 98426,
      offers: 8652,
    },
    growth: [
      {
        label: "Aug",
        students: 3640,
        recruiters: 186,
        officers: 32,
      },
      {
        label: "Sep",
        students: 4120,
        recruiters: 214,
        officers: 38,
      },
      {
        label: "Oct",
        students: 4680,
        recruiters: 248,
        officers: 42,
      },
      {
        label: "Nov",
        students: 5140,
        recruiters: 281,
        officers: 46,
      },
      {
        label: "Dec",
        students: 5530,
        recruiters: 306,
        officers: 49,
      },
      {
        label: "Jan",
        students: 5980,
        recruiters: 334,
        officers: 52,
      },
      {
        label: "Feb",
        students: 6350,
        recruiters: 361,
        officers: 55,
      },
      {
        label: "Mar",
        students: 6780,
        recruiters: 388,
        officers: 58,
      },
      {
        label: "Apr",
        students: 7140,
        recruiters: 412,
        officers: 61,
      },
      {
        label: "May",
        students: 7520,
        recruiters: 438,
        officers: 64,
      },
      {
        label: "Jun",
        students: 7890,
        recruiters: 462,
        officers: 66,
      },
      {
        label: "Jul",
        students: 8198,
        recruiters: 486,
        officers: 68,
      },
    ],
  },
};

const pendingApprovals = [
  {
    id: 1,
    name: "DataCraft Analytics",
    type: "Recruiter Verification",
    submittedBy: "Meera Shah",
    submittedAt: "12 minutes ago",
    priority: "High",
    path: "/admin/recruiters",
    icon: UserSquare2,
  },
  {
    id: 2,
    name: "Greenfield Institute of Technology",
    type: "Institution Registration",
    submittedBy: "Institution Administrator",
    submittedAt: "38 minutes ago",
    priority: "High",
    path: "/admin/institutions",
    icon: Building2,
  },
  {
    id: 3,
    name: "Dr. Ramesh Narayanan",
    type: "Placement Officer Account",
    submittedBy: "Metro Engineering College",
    submittedAt: "1 hour ago",
    priority: "Normal",
    path: "/admin/placement-officers",
    icon: UserCog,
  },
  {
    id: 4,
    name: "Finovate Technologies",
    type: "Recruiter Verification",
    submittedBy: "Sneha Kapoor",
    submittedAt: "3 hours ago",
    priority: "Normal",
    path: "/admin/recruiters",
    icon: UserSquare2,
  },
];

const recentActivity = [
  {
    id: 1,
    title: "Institution approved",
    description:
      "Greenfield Institute of Technology was approved by the administrator.",
    actor: "System Administrator",
    time: "8 minutes ago",
    type: "success",
    icon: CheckCircle2,
  },
  {
    id: 2,
    title: "Recruiter account suspended",
    description:
      "DesignLoop Studios recruiter access was temporarily suspended.",
    actor: "Security Administrator",
    time: "32 minutes ago",
    type: "warning",
    icon: ShieldCheck,
  },
  {
    id: 3,
    title: "Bulk student import completed",
    description:
      "1,248 student records were imported from three institutions.",
    actor: "Placement Data Service",
    time: "1 hour ago",
    type: "information",
    icon: GraduationCap,
  },
  {
    id: 4,
    title: "Placement officer account created",
    description:
      "A new placement officer account was created for Horizon University.",
    actor: "System Administrator",
    time: "2 hours ago",
    type: "success",
    icon: UserCog,
  },
  {
    id: 5,
    title: "Failed login attempts detected",
    description:
      "Multiple failed authentication attempts were blocked by the security service.",
    actor: "Security Monitor",
    time: "4 hours ago",
    type: "danger",
    icon: AlertTriangle,
  },
];

const platformModules = [
  {
    name: "Authentication Service",
    description: "Login, sessions and role-based access",
    status: "Operational",
    responseTime: "84 ms",
    uptime: "99.99%",
    icon: ShieldCheck,
  },
  {
    name: "Application Service",
    description: "Student applications and recruitment workflows",
    status: "Operational",
    responseTime: "112 ms",
    uptime: "99.97%",
    icon: BriefcaseBusiness,
  },
  {
    name: "Notification Service",
    description: "Email, portal and event notifications",
    status: "Operational",
    responseTime: "96 ms",
    uptime: "99.98%",
    icon: Bell,
  },
  {
    name: "Analytics Service",
    description: "Reports, metrics and institutional dashboards",
    status: "Operational",
    responseTime: "138 ms",
    uptime: "99.95%",
    icon: BarChart3,
  },
  {
    name: "Database Cluster",
    description: "Primary data storage and read replicas",
    status: "Operational",
    responseTime: "42 ms",
    uptime: "99.99%",
    icon: Database,
  },
  {
    name: "File Storage",
    description: "Resumes, documents and institution assets",
    status: "Degraded",
    responseTime: "286 ms",
    uptime: "99.82%",
    icon: Cloud,
  },
];

const roleDistribution = [
  {
    role: "Students",
    count: 8198,
    percentage: 88.6,
    icon: GraduationCap,
  },
  {
    role: "Recruiters",
    count: 486,
    percentage: 5.3,
    icon: UserSquare2,
  },
  {
    role: "Placement Officers",
    count: 68,
    percentage: 0.7,
    icon: UserCog,
  },
  {
    role: "Institution Administrators",
    count: 454,
    percentage: 4.9,
    icon: Building2,
  },
  {
    role: "System Administrators",
    count: 42,
    percentage: 0.5,
    icon: ShieldCheck,
  },
];

const activityStyles = {
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-amber-100 text-amber-700",
  information: "bg-blue-100 text-blue-700",
  danger: "bg-rose-100 text-rose-700",
};

function AdminDashboard() {
  const navigate = useNavigate();

  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [growthMetric, setGrowthMetric] = useState("Students");
  const [message, setMessage] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState("Just now");

  const selectedData = dashboardData[timeRange];
  const summary = selectedData.summary;

  const maximumGrowthValue = useMemo(() => {
    const metricKey =
      growthMetric === "Students"
        ? "students"
        : growthMetric === "Recruiters"
          ? "recruiters"
          : "officers";

    return Math.max(
      ...selectedData.growth.map((item) => item[metricKey])
    );
  }, [growthMetric, selectedData.growth]);

  const getGrowthValue = (item) => {
    if (growthMetric === "Students") {
      return item.students;
    }

    if (growthMetric === "Recruiters") {
      return item.recruiters;
    }

    return item.officers;
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const refreshDashboard = () => {
    setLastRefreshed(
      new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date())
    );

    showMessage("Dashboard data refreshed successfully.");
  };

  const handleApproval = (approval, action) => {
    showMessage(
      `${approval.name} was ${action.toLowerCase()} successfully.`
    );
  };

  const handleExport = () => {
    const rows = [
      ["CampusTE Administration Dashboard"],
      ["Report Period", timeRange],
      [],
      ["Summary"],
      ["Total Users", summary.users],
      ["Institutions", summary.institutions],
      ["Recruiters", summary.recruiters],
      ["Placement Officers", summary.placementOfficers],
      ["Active Users", summary.activeUsers],
      ["Placement Drives", summary.placementDrives],
      ["Applications", summary.applications],
      ["Offers", summary.offers],
      [],
      ["Role", "Count", "Percentage"],
      ...roleDistribution.map((role) => [
        role.role,
        role.count,
        `${role.percentage}%`,
      ]),
      [],
      [
        "Service",
        "Status",
        "Response Time",
        "Uptime",
      ],
      ...platformModules.map((module) => [
        module.name,
        module.status,
        module.responseTime,
        module.uptime,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replaceAll('"', '""')}"`
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
    anchor.download = "campuste-admin-dashboard.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Administration report exported successfully.");
  };

  const summaryCards = [
    {
      title: "Total Users",
      value: summary.users.toLocaleString("en-IN"),
      change: "+12.4%",
      description: "Across all registered roles",
      icon: Users,
      iconClass: "bg-blue-100 text-blue-700",
      path: "/admin/users",
    },
    {
      title: "Institutions",
      value: summary.institutions,
      change: "+4",
      description: "Verified partner institutions",
      icon: Building2,
      iconClass: "bg-purple-100 text-purple-700",
      path: "/admin/institutions",
    },
    {
      title: "Recruiters",
      value: summary.recruiters,
      change: "+8.6%",
      description: "Verified hiring organizations",
      icon: UserSquare2,
      iconClass: "bg-emerald-100 text-emerald-700",
      path: "/admin/recruiters",
    },
    {
      title: "Placement Officers",
      value: summary.placementOfficers,
      change: "+6",
      description: "Active placement administrators",
      icon: UserCog,
      iconClass: "bg-amber-100 text-amber-700",
      path: "/admin/placement-officers",
    },
  ];

  const operationalStats = [
    {
      title: "Active Users",
      value: summary.activeUsers.toLocaleString("en-IN"),
      icon: Activity,
      description: "Users active during this period",
    },
    {
      title: "Placement Drives",
      value: summary.placementDrives.toLocaleString("en-IN"),
      icon: BriefcaseBusiness,
      description: "Published recruitment drives",
    },
    {
      title: "Applications",
      value: summary.applications.toLocaleString("en-IN"),
      icon: FileClock,
      description: "Applications submitted",
    },
    {
      title: "Offers Released",
      value: summary.offers.toLocaleString("en-IN"),
      icon: UserCheck,
      description: "Confirmed recruiter offers",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Platform Administration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Administration Dashboard
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Monitor platform activity, user growth, institutions,
                recruiter operations, approvals and infrastructure
                health.
              </p>

              <p className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                <Clock3 size={16} />
                Last refreshed: {lastRefreshed}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={timeRange}
                onChange={(event) =>
                  setTimeRange(event.target.value)
                }
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white outline-none backdrop-blur [&>option]:text-neutral-900"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 12 Months</option>
              </select>

              <button
                type="button"
                onClick={refreshDashboard}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <RefreshCw size={18} />
                Refresh
              </button>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Download size={18} />
                Export Report
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
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <button
              key={card.title}
              type="button"
              onClick={() => navigate(card.path)}
              className="rounded-2xl border border-neutral-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                  <ArrowUpRight size={14} />
                  {card.change}
                </span>
              </div>

              <p className="mt-6 text-3xl font-bold text-neutral-900">
                {card.value}
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                {card.title}
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                {card.description}
              </p>
            </button>
          );
        })}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {operationalStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                  <Icon size={21} />
                </div>

                <div>
                  <p className="text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </p>

                  <p className="text-sm font-semibold text-neutral-700">
                    {stat.title}
                  </p>
                </div>
              </div>

              <p className="mt-4 border-t border-neutral-100 pt-4 text-sm text-neutral-500">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.5fr_0.75fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Platform User Growth
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                User activity across the selected reporting period.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Students", "Recruiters", "Officers"].map(
                (metric) => (
                  <button
                    key={metric}
                    type="button"
                    onClick={() => setGrowthMetric(metric)}
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      growthMetric === metric
                        ? "bg-blue-600 text-white"
                        : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                    }`}
                  >
                    {metric}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div className="flex h-80 min-w-[720px] items-end gap-4 border-b border-neutral-200 px-2">
              {selectedData.growth.map((item) => {
                const value = getGrowthValue(item);
                const height =
                  (value / maximumGrowthValue) * 100;

                return (
                  <div
                    key={item.label}
                    className="flex h-full min-w-[48px] flex-1 flex-col items-center justify-end"
                  >
                    <div className="group relative flex h-[250px] w-full items-end justify-center">
                      <div
                        className="w-9 rounded-t-xl bg-gradient-to-t from-blue-700 via-indigo-600 to-purple-500 transition hover:opacity-85"
                        style={{
                          height: `${height}%`,
                          minHeight: "12px",
                        }}
                      >
                        <span className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-10 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1.5 text-xs font-semibold text-white group-hover:block">
                          {value.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 pb-3 text-xs font-semibold text-neutral-500">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-5 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-700" />
              <span className="font-medium text-neutral-600">
                {growthMetric}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp size={17} className="text-emerald-600" />

              <span className="font-semibold text-emerald-700">
                12.4% increase from previous period
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Role Distribution
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Registered platform users by role.
              </p>
            </div>

            <Users size={24} className="text-blue-700" />
          </div>

          <div className="mt-8 space-y-6">
            {roleDistribution.map((role) => {
              const Icon = role.icon;

              return (
                <div key={role.role}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                        <Icon size={17} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-neutral-700">
                          {role.role}
                        </p>

                        <p className="text-xs text-neutral-500">
                          {role.count.toLocaleString("en-IN")} users
                        </p>
                      </div>
                    </div>

                    <span className="font-bold text-neutral-900">
                      {role.percentage}%
                    </span>
                  </div>

                  <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                      style={{
                        width: `${Math.max(
                          role.percentage,
                          2
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/users")}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
          >
            View User Directory
            <ArrowRight size={18} />
          </button>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Pending Approvals
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Registrations and accounts requiring review.
              </p>
            </div>

            <span className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-amber-100 px-3 font-bold text-amber-700">
              {pendingApprovals.length}
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {pendingApprovals.map((approval) => {
              const Icon = approval.icon;

              return (
                <article key={approval.id} className="p-6 sm:px-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-neutral-900">
                          {approval.name}
                        </h3>

                        {approval.priority === "High" && (
                          <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold uppercase text-rose-700">
                            Priority
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-sm font-semibold text-blue-700">
                        {approval.type}
                      </p>

                      <p className="mt-2 text-sm text-neutral-500">
                        Submitted by {approval.submittedBy} ·{" "}
                        {approval.submittedAt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleApproval(approval, "Approved")
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <CheckCircle2 size={16} />
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => navigate(approval.path)}
                          className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                        >
                          Review Details
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 p-6 sm:p-8">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Recent Administrative Activity
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Latest platform and account changes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/audit-logs")}
              className="hidden rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100 sm:block"
            >
              Audit Logs
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.id}
                  className="flex items-start gap-4 p-6 sm:px-8"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                      activityStyles[activity.type]
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-neutral-900">
                      {activity.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-neutral-600">
                      {activity.description}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
                      <span className="font-semibold">
                        {activity.actor}
                      </span>

                      <span>•</span>

                      <span>{activity.time}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Platform Health
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Real-time service availability and infrastructure
              performance.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            5 of 6 services fully operational
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
          {platformModules.map((module) => {
            const Icon = module.icon;
            const operational = module.status === "Operational";

            return (
              <article
                key={module.name}
                className={`rounded-2xl border p-5 ${
                  operational
                    ? "border-neutral-200"
                    : "border-amber-300 bg-amber-50/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      operational
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <Icon size={21} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      operational
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {module.status}
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-neutral-900">
                  {module.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {module.description}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Response
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {module.responseTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Uptime
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {module.uptime}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className="group rounded-3xl border border-blue-200 bg-blue-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
        >
          <Users size={25} className="text-blue-700" />

          <h3 className="mt-5 text-lg font-bold text-blue-900">
            Manage Users
          </h3>

          <p className="mt-2 text-sm leading-6 text-blue-700">
            Review accounts, roles, status and access permissions.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-blue-800">
            Open User Directory
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/institutions")}
          className="group rounded-3xl border border-purple-200 bg-purple-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
        >
          <Building2 size={25} className="text-purple-700" />

          <h3 className="mt-5 text-lg font-bold text-purple-900">
            Review Institutions
          </h3>

          <p className="mt-2 text-sm leading-6 text-purple-700">
            Verify institution registrations and administrators.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-purple-800">
            View Institutions
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/analytics")}
          className="group rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
        >
          <BarChart3 size={25} className="text-emerald-700" />

          <h3 className="mt-5 text-lg font-bold text-emerald-900">
            System Analytics
          </h3>

          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Analyse usage, performance and recruitment outcomes.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800">
            Open Analytics
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/audit-logs")}
          className="group rounded-3xl border border-amber-200 bg-amber-50 p-6 text-left transition hover:-translate-y-1 hover:shadow-md"
        >
          <FileClock size={25} className="text-amber-700" />

          <h3 className="mt-5 text-lg font-bold text-amber-900">
            Audit Activity
          </h3>

          <p className="mt-2 text-sm leading-6 text-amber-700">
            Inspect security, access and administrative activity.
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-amber-800">
            View Audit Logs
            <ArrowRight
              size={17}
              className="transition group-hover:translate-x-1"
            />
          </span>
        </button>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-gradient-to-r from-neutral-900 via-blue-950 to-indigo-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <Server size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Platform Infrastructure
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-blue-100">
                All critical services are available. File storage is
                experiencing increased response time, but user
                operations remain available.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/admin/analytics")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-900 transition hover:bg-blue-50"
          >
            View System Performance
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;