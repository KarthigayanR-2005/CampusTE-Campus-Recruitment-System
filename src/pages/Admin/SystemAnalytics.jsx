import { useMemo, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  RefreshCw,
  Server,
  ShieldCheck,
  Target,
  TrendingUp,
  UserCheck,
  UserCog,
  Users,
  UserSquare2,
} from "lucide-react";

const analyticsData = {
  "Last 7 Days": {
    comparison: "Compared with the previous 7 days",
    metrics: {
      users: 9248,
      usersChange: 4.8,
      institutions: 42,
      institutionsChange: 2.4,
      applications: 12846,
      applicationsChange: 11.6,
      placements: 1642,
      placementsChange: 8.3,
      activeRecruiters: 386,
      activeRecruitersChange: 5.2,
      placementRate: 68.4,
      placementRateChange: 3.1,
    },
    userGrowth: [
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
    applications: [
      {
        label: "Mon",
        applications: 1420,
        shortlisted: 684,
        offers: 172,
      },
      {
        label: "Tue",
        applications: 1688,
        shortlisted: 742,
        offers: 196,
      },
      {
        label: "Wed",
        applications: 1894,
        shortlisted: 836,
        offers: 218,
      },
      {
        label: "Thu",
        applications: 1732,
        shortlisted: 798,
        offers: 205,
      },
      {
        label: "Fri",
        applications: 2176,
        shortlisted: 1048,
        offers: 286,
      },
      {
        label: "Sat",
        applications: 2084,
        shortlisted: 912,
        offers: 276,
      },
      {
        label: "Sun",
        applications: 1852,
        shortlisted: 874,
        offers: 289,
      },
    ],
  },

  "Last 30 Days": {
    comparison: "Compared with the previous 30 days",
    metrics: {
      users: 9248,
      usersChange: 12.4,
      institutions: 42,
      institutionsChange: 10.5,
      applications: 28642,
      applicationsChange: 18.7,
      placements: 2874,
      placementsChange: 14.2,
      activeRecruiters: 412,
      activeRecruitersChange: 9.8,
      placementRate: 71.6,
      placementRateChange: 4.5,
    },
    userGrowth: [
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
    applications: [
      {
        label: "Week 1",
        applications: 6124,
        shortlisted: 2864,
        offers: 614,
      },
      {
        label: "Week 2",
        applications: 6842,
        shortlisted: 3268,
        offers: 682,
      },
      {
        label: "Week 3",
        applications: 7428,
        shortlisted: 3586,
        offers: 748,
      },
      {
        label: "Week 4",
        applications: 8248,
        shortlisted: 4126,
        offers: 830,
      },
    ],
  },

  "Last 12 Months": {
    comparison: "Compared with the previous 12 months",
    metrics: {
      users: 9248,
      usersChange: 38.6,
      institutions: 42,
      institutionsChange: 27.3,
      applications: 98426,
      applicationsChange: 42.1,
      placements: 8652,
      placementsChange: 31.8,
      activeRecruiters: 486,
      activeRecruitersChange: 29.4,
      placementRate: 74.2,
      placementRateChange: 8.7,
    },
    userGrowth: [
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
    applications: [
      {
        label: "Aug",
        applications: 5642,
        shortlisted: 2268,
        offers: 486,
      },
      {
        label: "Sep",
        applications: 6284,
        shortlisted: 2546,
        offers: 518,
      },
      {
        label: "Oct",
        applications: 6818,
        shortlisted: 2874,
        offers: 556,
      },
      {
        label: "Nov",
        applications: 7426,
        shortlisted: 3148,
        offers: 608,
      },
      {
        label: "Dec",
        applications: 6982,
        shortlisted: 2964,
        offers: 586,
      },
      {
        label: "Jan",
        applications: 7844,
        shortlisted: 3422,
        offers: 684,
      },
      {
        label: "Feb",
        applications: 8246,
        shortlisted: 3728,
        offers: 714,
      },
      {
        label: "Mar",
        applications: 8648,
        shortlisted: 3952,
        offers: 748,
      },
      {
        label: "Apr",
        applications: 9286,
        shortlisted: 4268,
        offers: 792,
      },
      {
        label: "May",
        applications: 9864,
        shortlisted: 4482,
        offers: 846,
      },
      {
        label: "Jun",
        applications: 10422,
        shortlisted: 4864,
        offers: 914,
      },
      {
        label: "Jul",
        applications: 10964,
        shortlisted: 5148,
        offers: 1200,
      },
    ],
  },
};

const institutionPerformance = [
  {
    id: 1,
    institution: "Horizon University",
    students: 2168,
    eligible: 1842,
    applications: 8642,
    placed: 984,
    placementRate: 78.6,
    averagePackage: "₹8.8 LPA",
    highestPackage: "₹32 LPA",
    activeDrives: 26,
  },
  {
    id: 2,
    institution: "National School of Computing",
    students: 764,
    eligible: 692,
    applications: 4218,
    placed: 518,
    placementRate: 74.9,
    averagePackage: "₹9.4 LPA",
    highestPackage: "₹28 LPA",
    activeDrives: 12,
  },
  {
    id: 3,
    institution: "CampusTE Institute of Technology",
    students: 1248,
    eligible: 1084,
    applications: 6248,
    placed: 539,
    placementRate: 72.4,
    averagePackage: "₹8.2 LPA",
    highestPackage: "₹26 LPA",
    activeDrives: 18,
  },
  {
    id: 4,
    institution: "Central Institute of Applied Sciences",
    students: 1386,
    eligible: 1196,
    applications: 5842,
    placed: 672,
    placementRate: 70.8,
    averagePackage: "₹7.9 LPA",
    highestPackage: "₹24 LPA",
    activeDrives: 15,
  },
  {
    id: 5,
    institution: "Metro Engineering College",
    students: 1124,
    eligible: 946,
    applications: 4936,
    placed: 426,
    placementRate: 67.2,
    averagePackage: "₹7.4 LPA",
    highestPackage: "₹22 LPA",
    activeDrives: 14,
  },
  {
    id: 6,
    institution: "Western Technical College",
    students: 1056,
    eligible: 842,
    applications: 3624,
    placed: 311,
    placementRate: 58.4,
    averagePackage: "₹6.8 LPA",
    highestPackage: "₹18 LPA",
    activeDrives: 7,
  },
];

const hiringFunnel = [
  {
    stage: "Applications Submitted",
    value: 28642,
    percentage: 100,
    description: "Total student applications",
  },
  {
    stage: "Eligibility Verified",
    value: 23864,
    percentage: 83.3,
    description: "Applications meeting eligibility",
  },
  {
    stage: "AI Shortlisted",
    value: 14286,
    percentage: 49.9,
    description: "Candidates recommended by AI",
  },
  {
    stage: "Interviewed",
    value: 7842,
    percentage: 27.4,
    description: "Students attending interviews",
  },
  {
    stage: "Offers Released",
    value: 2874,
    percentage: 10,
    description: "Confirmed recruiter offers",
  },
  {
    stage: "Offers Accepted",
    value: 2548,
    percentage: 8.9,
    description: "Offers accepted by students",
  },
];

const topRecruiters = [
  {
    company: "Infosphere Technologies",
    jobs: 24,
    applications: 2168,
    shortlisted: 824,
    hired: 142,
    conversion: 17.2,
  },
  {
    company: "TechNova Solutions",
    jobs: 18,
    applications: 1248,
    shortlisted: 486,
    hired: 84,
    conversion: 17.3,
  },
  {
    company: "CloudMatrix Systems",
    jobs: 15,
    applications: 986,
    shortlisted: 362,
    hired: 63,
    conversion: 17.4,
  },
  {
    company: "GreenEnergy Innovations",
    jobs: 9,
    applications: 624,
    shortlisted: 248,
    hired: 38,
    conversion: 15.3,
  },
  {
    company: "DesignLoop Studios",
    jobs: 7,
    applications: 348,
    shortlisted: 136,
    hired: 21,
    conversion: 15.4,
  },
];

const servicePerformance = [
  {
    service: "Authentication Service",
    uptime: 99.99,
    responseTime: 84,
    requests: "1.84M",
    errors: 0.02,
    status: "Healthy",
  },
  {
    service: "Recruitment Service",
    uptime: 99.97,
    responseTime: 112,
    requests: "984K",
    errors: 0.06,
    status: "Healthy",
  },
  {
    service: "AI Shortlisting Engine",
    uptime: 99.92,
    responseTime: 486,
    requests: "286K",
    errors: 0.18,
    status: "Healthy",
  },
  {
    service: "Notification Service",
    uptime: 99.98,
    responseTime: 96,
    requests: "742K",
    errors: 0.04,
    status: "Healthy",
  },
  {
    service: "Analytics Service",
    uptime: 99.95,
    responseTime: 138,
    requests: "364K",
    errors: 0.08,
    status: "Healthy",
  },
  {
    service: "File Storage Service",
    uptime: 99.82,
    responseTime: 286,
    requests: "428K",
    errors: 0.42,
    status: "Degraded",
  },
];

const departmentPerformance = [
  {
    department: "Computer Science and Engineering",
    eligible: 2148,
    placed: 1784,
    rate: 83.1,
  },
  {
    department: "Artificial Intelligence",
    eligible: 986,
    placed: 802,
    rate: 81.3,
  },
  {
    department: "Information Technology",
    eligible: 1248,
    placed: 964,
    rate: 77.2,
  },
  {
    department: "Electronics and Communication",
    eligible: 1486,
    placed: 1048,
    rate: 70.5,
  },
  {
    department: "Electrical Engineering",
    eligible: 842,
    placed: 526,
    rate: 62.5,
  },
  {
    department: "Mechanical Engineering",
    eligible: 1084,
    placed: 614,
    rate: 56.6,
  },
];

function SystemAnalytics() {
  const [timeRange, setTimeRange] = useState("Last 30 Days");
  const [growthMetric, setGrowthMetric] = useState("Students");
  const [applicationMetric, setApplicationMetric] =
    useState("Applications");
  const [institutionSort, setInstitutionSort] =
    useState("Placement Rate");
  const [message, setMessage] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState("Just now");

  const selectedData = analyticsData[timeRange];
  const metrics = selectedData.metrics;

  const maximumGrowthValue = useMemo(() => {
    const metricKey =
      growthMetric === "Students"
        ? "students"
        : growthMetric === "Recruiters"
          ? "recruiters"
          : "officers";

    return Math.max(
      ...selectedData.userGrowth.map((item) => item[metricKey])
    );
  }, [growthMetric, selectedData.userGrowth]);

  const maximumApplicationValue = useMemo(() => {
    const metricKey =
      applicationMetric === "Applications"
        ? "applications"
        : applicationMetric === "Shortlisted"
          ? "shortlisted"
          : "offers";

    return Math.max(
      ...selectedData.applications.map((item) => item[metricKey])
    );
  }, [applicationMetric, selectedData.applications]);

  const sortedInstitutions = useMemo(() => {
    const sorted = [...institutionPerformance];

    if (institutionSort === "Placement Rate") {
      return sorted.sort(
        (first, second) =>
          second.placementRate - first.placementRate
      );
    }

    if (institutionSort === "Students Placed") {
      return sorted.sort(
        (first, second) => second.placed - first.placed
      );
    }

    if (institutionSort === "Applications") {
      return sorted.sort(
        (first, second) =>
          second.applications - first.applications
      );
    }

    return sorted.sort((first, second) =>
      first.institution.localeCompare(second.institution)
    );
  }, [institutionSort]);

  const getGrowthValue = (item) => {
    if (growthMetric === "Students") {
      return item.students;
    }

    if (growthMetric === "Recruiters") {
      return item.recruiters;
    }

    return item.officers;
  };

  const getApplicationValue = (item) => {
    if (applicationMetric === "Applications") {
      return item.applications;
    }

    if (applicationMetric === "Shortlisted") {
      return item.shortlisted;
    }

    return item.offers;
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const refreshAnalytics = () => {
    setLastRefreshed(
      new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date())
    );

    showMessage("Analytics data refreshed successfully.");
  };

  const handleExport = () => {
    const rows = [
      ["CampusTE System Analytics Report"],
      ["Reporting Period", timeRange],
      ["Generated At", new Date().toLocaleString("en-IN")],
      [],
      ["Platform Metrics"],
      ["Metric", "Value", "Change"],
      ["Total Users", metrics.users, `${metrics.usersChange}%`],
      [
        "Institutions",
        metrics.institutions,
        `${metrics.institutionsChange}%`,
      ],
      [
        "Applications",
        metrics.applications,
        `${metrics.applicationsChange}%`,
      ],
      [
        "Placements",
        metrics.placements,
        `${metrics.placementsChange}%`,
      ],
      [
        "Active Recruiters",
        metrics.activeRecruiters,
        `${metrics.activeRecruitersChange}%`,
      ],
      [
        "Placement Rate",
        `${metrics.placementRate}%`,
        `${metrics.placementRateChange}%`,
      ],
      [],
      ["Institution Performance"],
      [
        "Institution",
        "Students",
        "Eligible",
        "Applications",
        "Placed",
        "Placement Rate",
        "Average Package",
        "Highest Package",
        "Active Drives",
      ],
      ...institutionPerformance.map((institution) => [
        institution.institution,
        institution.students,
        institution.eligible,
        institution.applications,
        institution.placed,
        `${institution.placementRate}%`,
        institution.averagePackage,
        institution.highestPackage,
        institution.activeDrives,
      ]),
      [],
      ["Service Performance"],
      [
        "Service",
        "Uptime",
        "Response Time",
        "Requests",
        "Error Rate",
        "Status",
      ],
      ...servicePerformance.map((service) => [
        service.service,
        `${service.uptime}%`,
        `${service.responseTime} ms`,
        service.requests,
        `${service.errors}%`,
        service.status,
      ]),
    ];

    const csvContent = rows
      .map((row) =>
        row
          .map(
            (value) =>
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
    anchor.download = "campuste-system-analytics.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    showMessage("System analytics report exported successfully.");
  };

  const metricCards = [
    {
      title: "Total Users",
      value: metrics.users.toLocaleString("en-IN"),
      change: metrics.usersChange,
      description: "Registered platform accounts",
      icon: Users,
      className: "bg-blue-100 text-blue-700",
    },
    {
      title: "Institutions",
      value: metrics.institutions,
      change: metrics.institutionsChange,
      description: "Verified partner institutions",
      icon: Building2,
      className: "bg-purple-100 text-purple-700",
    },
    {
      title: "Applications",
      value: metrics.applications.toLocaleString("en-IN"),
      change: metrics.applicationsChange,
      description: "Applications during this period",
      icon: FileText,
      className: "bg-amber-100 text-amber-700",
    },
    {
      title: "Students Placed",
      value: metrics.placements.toLocaleString("en-IN"),
      change: metrics.placementsChange,
      description: "Confirmed placement outcomes",
      icon: GraduationCap,
      className: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Active Recruiters",
      value: metrics.activeRecruiters.toLocaleString("en-IN"),
      change: metrics.activeRecruitersChange,
      description: "Recruiters active this period",
      icon: UserSquare2,
      className: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Placement Rate",
      value: `${metrics.placementRate}%`,
      change: metrics.placementRateChange,
      description: "Eligible students placed",
      icon: Target,
      className: "bg-rose-100 text-rose-700",
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
                  <BarChart3 size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Platform Intelligence
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                System Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Analyse platform adoption, recruitment performance,
                placement outcomes and infrastructure health.
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
                onClick={refreshAnalytics}
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

      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-neutral-900">
            Platform Overview
          </h2>

          <p className="mt-1 text-sm text-neutral-600">
            {selectedData.comparison}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {metricCards.map((metric) => {
            const Icon = metric.icon;
            const isPositive = metric.change >= 0;

            return (
              <article
                key={metric.title}
                className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${metric.className}`}
                  >
                    <Icon size={23} />
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                      isPositive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-rose-50 text-rose-700"
                    }`}
                  >
                    {isPositive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}

                    {Math.abs(metric.change)}%
                  </span>
                </div>

                <p className="mt-6 text-3xl font-bold text-neutral-900">
                  {metric.value}
                </p>

                <p className="mt-1 font-semibold text-neutral-700">
                  {metric.title}
                </p>

                <p className="mt-2 text-sm text-neutral-500">
                  {metric.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Platform User Growth
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Growth across major platform roles.
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
            <div className="flex h-80 min-w-[620px] items-end gap-4 border-b border-neutral-200 px-2">
              {selectedData.userGrowth.map((item) => {
                const value = getGrowthValue(item);
                const height =
                  (value / maximumGrowthValue) * 100;

                return (
                  <div
                    key={item.label}
                    className="flex h-full min-w-[42px] flex-1 flex-col items-center justify-end"
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
                Continued platform growth
              </span>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Recruitment Activity
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Applications, shortlists and offers over time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Applications", "Shortlisted", "Offers"].map(
                (metric) => (
                  <button
                    key={metric}
                    type="button"
                    onClick={() =>
                      setApplicationMetric(metric)
                    }
                    className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      applicationMetric === metric
                        ? "bg-purple-600 text-white"
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
            <div className="flex h-80 min-w-[620px] items-end gap-4 border-b border-neutral-200 px-2">
              {selectedData.applications.map((item) => {
                const value = getApplicationValue(item);
                const height =
                  (value / maximumApplicationValue) * 100;

                return (
                  <div
                    key={item.label}
                    className="flex h-full min-w-[42px] flex-1 flex-col items-center justify-end"
                  >
                    <div className="group relative flex h-[250px] w-full items-end justify-center">
                      <div
                        className="w-9 rounded-t-xl bg-gradient-to-t from-purple-700 via-fuchsia-600 to-pink-500 transition hover:opacity-85"
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

          <div className="mt-6 flex items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-full bg-purple-700" />

            <span className="font-medium text-neutral-600">
              {applicationMetric}
            </span>
          </div>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Hiring Funnel
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Candidate progression from application to acceptance.
              </p>
            </div>

            <Target size={25} className="text-blue-700" />
          </div>

          <div className="mt-8 space-y-5">
            {hiringFunnel.map((stage, index) => (
              <article key={stage.stage}>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-neutral-900">
                      {stage.stage}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {stage.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-neutral-900">
                      {stage.value.toLocaleString("en-IN")}
                    </p>

                    <p className="text-xs font-semibold text-blue-700">
                      {stage.percentage}%
                    </p>
                  </div>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className={`h-full rounded-full ${
                      index === 0
                        ? "bg-blue-600"
                        : index === 1
                          ? "bg-indigo-600"
                          : index === 2
                            ? "bg-purple-600"
                            : index === 3
                              ? "bg-fuchsia-600"
                              : index === 4
                                ? "bg-emerald-600"
                                : "bg-green-600"
                    }`}
                    style={{
                      width: `${stage.percentage}%`,
                      minWidth: "8px",
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Department Placement Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Placement rate across major academic departments.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {departmentPerformance.map((department) => (
              <article key={department.department}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">
                      {department.department}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {department.placed.toLocaleString("en-IN")} of{" "}
                      {department.eligible.toLocaleString("en-IN")}{" "}
                      eligible students placed
                    </p>
                  </div>

                  <span className="font-bold text-blue-700">
                    {department.rate}%
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{
                      width: `${department.rate}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Institution Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Compare recruitment outcomes across partner
              institutions.
            </p>
          </div>

          <select
            value={institutionSort}
            onChange={(event) =>
              setInstitutionSort(event.target.value)
            }
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 font-semibold text-neutral-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option>Placement Rate</option>
            <option>Students Placed</option>
            <option>Applications</option>
            <option>Institution Name</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Institution
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Students
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Eligible
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Applications
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Placed
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Placement Rate
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Average Package
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Highest Package
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Active Drives
                </th>
              </tr>
            </thead>

            <tbody>
              {sortedInstitutions.map((institution, index) => (
                <tr
                  key={institution.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                        {index + 1}
                      </span>

                      <div>
                        <p className="max-w-[260px] font-bold text-neutral-900">
                          {institution.institution}
                        </p>

                        <p className="mt-1 text-xs text-neutral-500">
                          {institution.activeDrives} active placement
                          drives
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-neutral-700">
                    {institution.students.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 font-semibold text-neutral-700">
                    {institution.eligible.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5 font-semibold text-neutral-700">
                    {institution.applications.toLocaleString(
                      "en-IN"
                    )}
                  </td>

                  <td className="px-6 py-5 font-bold text-emerald-700">
                    {institution.placed.toLocaleString("en-IN")}
                  </td>

                  <td className="px-6 py-5">
                    <div className="w-40">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-bold text-blue-700">
                          {institution.placementRate}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                          style={{
                            width: `${institution.placementRate}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold text-neutral-700">
                    {institution.averagePackage}
                  </td>

                  <td className="px-6 py-5 font-bold text-purple-700">
                    {institution.highestPackage}
                  </td>

                  <td className="px-6 py-5">
                    <span className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {institution.activeDrives} drives
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-2">
        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 p-6 sm:px-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              Top Performing Recruiters
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Recruiters ranked by student hiring outcomes.
            </p>
          </div>

          <div className="divide-y divide-neutral-100">
            {topRecruiters.map((recruiter, index) => (
              <article
                key={recruiter.company}
                className="p-6 sm:px-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-100 font-bold text-purple-700">
                    {index + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-bold text-neutral-900">
                          {recruiter.company}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          {recruiter.jobs} jobs ·{" "}
                          {recruiter.applications.toLocaleString(
                            "en-IN"
                          )}{" "}
                          applications
                        </p>
                      </div>

                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                        {recruiter.conversion}% conversion
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                      <div className="rounded-xl bg-neutral-50 px-3 py-3">
                        <p className="font-bold text-neutral-900">
                          {recruiter.applications}
                        </p>

                        <p className="text-[11px] text-neutral-500">
                          Applied
                        </p>
                      </div>

                      <div className="rounded-xl bg-blue-50 px-3 py-3">
                        <p className="font-bold text-blue-700">
                          {recruiter.shortlisted}
                        </p>

                        <p className="text-[11px] text-blue-600">
                          Shortlisted
                        </p>
                      </div>

                      <div className="rounded-xl bg-emerald-50 px-3 py-3">
                        <p className="font-bold text-emerald-700">
                          {recruiter.hired}
                        </p>

                        <p className="text-[11px] text-emerald-600">
                          Hired
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
          <div className="border-b border-neutral-200 p-6 sm:px-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              Platform Role Activity
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Engagement across the main platform user groups.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <article className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                <GraduationCap size={21} />
              </div>

              <p className="mt-5 text-3xl font-bold text-neutral-900">
                6,418
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                Active Students
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                78.3% of registered students
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <UserSquare2 size={21} />
              </div>

              <p className="mt-5 text-3xl font-bold text-neutral-900">
                412
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                Active Recruiters
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                84.8% recruiter engagement
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <UserCog size={21} />
              </div>

              <p className="mt-5 text-3xl font-bold text-neutral-900">
                61
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                Active Officers
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                89.7% officer engagement
              </p>
            </article>

            <article className="rounded-2xl border border-neutral-200 p-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <UserCheck size={21} />
              </div>

              <p className="mt-5 text-3xl font-bold text-neutral-900">
                2,548
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                Offers Accepted
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                88.7% offer acceptance rate
              </p>
            </article>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Service Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Infrastructure availability, speed and error rates.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
            <Activity size={18} />
            5 of 6 services healthy
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
          {servicePerformance.map((service) => {
            const healthy = service.status === "Healthy";

            return (
              <article
                key={service.service}
                className={`rounded-2xl border p-5 ${
                  healthy
                    ? "border-neutral-200"
                    : "border-amber-300 bg-amber-50/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      healthy
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    <Server size={21} />
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      healthy
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {service.status}
                  </span>
                </div>

                <h3 className="mt-5 font-bold text-neutral-900">
                  {service.service}
                </h3>

                <div className="mt-5 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Uptime
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {service.uptime}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Response
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {service.responseTime} ms
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Requests
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {service.requests}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                      Error Rate
                    </p>

                    <p
                      className={`mt-1 font-bold ${
                        service.errors > 0.3
                          ? "text-amber-700"
                          : "text-neutral-900"
                      }`}
                    >
                      {service.errors}%
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-gradient-to-r from-neutral-900 via-blue-950 to-indigo-950 p-6 text-white shadow-sm sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <ShieldCheck size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                Analytics Summary
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-blue-100">
                Platform adoption and recruitment activity continue to
                grow. Placement performance is improving, while the
                file storage service requires continued monitoring due
                to increased response time.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-blue-200">
                Placement Rate
              </p>

              <p className="mt-1 text-xl font-bold">
                {metrics.placementRate}%
              </p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-blue-200">
                System Health
              </p>

              <p className="mt-1 text-xl font-bold">99.94%</p>
            </div>

            <div className="rounded-xl bg-white/10 px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-blue-200">
                Active Drives
              </p>

              <p className="mt-1 text-xl font-bold">326</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SystemAnalytics;