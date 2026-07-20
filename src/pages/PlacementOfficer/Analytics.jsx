import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Download,
  GraduationCap,
  IndianRupee,
  PieChart,
  Search,
  Target,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

const academicYearData = {
  "2025 - 2026": {
    summary: {
      registeredStudents: 1248,
      eligibleStudents: 788,
      placedStudents: 539,
      totalOffers: 648,
      placementRate: 68.4,
      averagePackage: 7.8,
      highestPackage: 24,
      activeRecruiters: 86,
    },
    monthlyTrend: [
      { month: "Aug", applications: 42, offers: 18, placed: 15 },
      { month: "Sep", applications: 76, offers: 24, placed: 20 },
      { month: "Oct", applications: 118, offers: 31, placed: 27 },
      { month: "Nov", applications: 164, offers: 35, placed: 30 },
      { month: "Dec", applications: 198, offers: 39, placed: 34 },
      { month: "Jan", applications: 256, offers: 44, placed: 38 },
      { month: "Feb", applications: 324, offers: 48, placed: 42 },
      { month: "Mar", applications: 397, offers: 64, placed: 58 },
      { month: "Apr", applications: 476, offers: 79, placed: 71 },
      { month: "May", applications: 548, offers: 94, placed: 86 },
      { month: "Jun", applications: 632, offers: 116, placed: 104 },
      { month: "Jul", applications: 714, offers: 141, placed: 126 },
    ],
    departmentPerformance: [
      {
        department: "Computer Science and Engineering",
        shortName: "CSE",
        registered: 240,
        eligible: 218,
        placed: 164,
        offers: 198,
        averagePackage: 9.2,
        highestPackage: 24,
      },
      {
        department: "Information Technology",
        shortName: "IT",
        registered: 180,
        eligible: 165,
        placed: 119,
        offers: 143,
        averagePackage: 8.5,
        highestPackage: 18,
      },
      {
        department: "Artificial Intelligence and Data Science",
        shortName: "AI & DS",
        registered: 120,
        eligible: 109,
        placed: 76,
        offers: 91,
        averagePackage: 9.6,
        highestPackage: 21,
      },
      {
        department: "Electronics and Communication Engineering",
        shortName: "ECE",
        registered: 210,
        eligible: 184,
        placed: 112,
        offers: 128,
        averagePackage: 6.9,
        highestPackage: 14,
      },
      {
        department: "Electrical and Electronics Engineering",
        shortName: "EEE",
        registered: 140,
        eligible: 122,
        placed: 68,
        offers: 78,
        averagePackage: 6.2,
        highestPackage: 12,
      },
      {
        department: "Mechanical Engineering",
        shortName: "ME",
        registered: 168,
        eligible: 136,
        placed: 0,
        offers: 0,
        averagePackage: 0,
        highestPackage: 0,
      },
    ],
    recruiterPerformance: [
      {
        company: "TechNova Solutions",
        drives: 5,
        applications: 286,
        shortlisted: 86,
        interviews: 61,
        offers: 38,
        averagePackage: 9.4,
      },
      {
        company: "Infosphere Technologies",
        drives: 4,
        applications: 241,
        shortlisted: 74,
        interviews: 52,
        offers: 32,
        averagePackage: 7.8,
      },
      {
        company: "DataCraft Analytics",
        drives: 3,
        applications: 194,
        shortlisted: 58,
        interviews: 41,
        offers: 24,
        averagePackage: 8.6,
      },
      {
        company: "CloudAxis Systems",
        drives: 3,
        applications: 166,
        shortlisted: 49,
        interviews: 35,
        offers: 21,
        averagePackage: 7.2,
      },
      {
        company: "SecureGrid Networks",
        drives: 2,
        applications: 118,
        shortlisted: 37,
        interviews: 26,
        offers: 12,
        averagePackage: 8.9,
      },
      {
        company: "CodeBridge Labs",
        drives: 2,
        applications: 131,
        shortlisted: 39,
        interviews: 29,
        offers: 17,
        averagePackage: 6.8,
      },
    ],
    packageDistribution: [
      { range: "Below ₹4 LPA", students: 42 },
      { range: "₹4 - ₹6 LPA", students: 138 },
      { range: "₹6 - ₹8 LPA", students: 164 },
      { range: "₹8 - ₹10 LPA", students: 112 },
      { range: "₹10 - ₹15 LPA", students: 63 },
      { range: "Above ₹15 LPA", students: 20 },
    ],
    applicationFunnel: [
      { stage: "Applications", value: 2846 },
      { stage: "Eligible", value: 2384 },
      { stage: "Shortlisted", value: 1087 },
      { stage: "Interviewed", value: 764 },
      { stage: "Offers", value: 648 },
      { stage: "Placed", value: 539 },
    ],
  },
  "2024 - 2025": {
    summary: {
      registeredStudents: 1176,
      eligibleStudents: 742,
      placedStudents: 461,
      totalOffers: 552,
      placementRate: 62.1,
      averagePackage: 7.1,
      highestPackage: 20,
      activeRecruiters: 74,
    },
    monthlyTrend: [
      { month: "Aug", applications: 34, offers: 14, placed: 12 },
      { month: "Sep", applications: 65, offers: 20, placed: 17 },
      { month: "Oct", applications: 103, offers: 26, placed: 23 },
      { month: "Nov", applications: 145, offers: 31, placed: 27 },
      { month: "Dec", applications: 182, offers: 35, placed: 31 },
      { month: "Jan", applications: 227, offers: 39, placed: 34 },
      { month: "Feb", applications: 281, offers: 43, placed: 37 },
      { month: "Mar", applications: 342, offers: 55, placed: 48 },
      { month: "Apr", applications: 408, offers: 66, placed: 57 },
      { month: "May", applications: 469, offers: 77, placed: 67 },
      { month: "Jun", applications: 531, offers: 91, placed: 76 },
      { month: "Jul", applications: 594, offers: 105, placed: 92 },
    ],
    departmentPerformance: [
      {
        department: "Computer Science and Engineering",
        shortName: "CSE",
        registered: 228,
        eligible: 204,
        placed: 143,
        offers: 171,
        averagePackage: 8.5,
        highestPackage: 20,
      },
      {
        department: "Information Technology",
        shortName: "IT",
        registered: 172,
        eligible: 154,
        placed: 101,
        offers: 121,
        averagePackage: 7.9,
        highestPackage: 16,
      },
      {
        department: "Artificial Intelligence and Data Science",
        shortName: "AI & DS",
        registered: 104,
        eligible: 92,
        placed: 61,
        offers: 74,
        averagePackage: 8.8,
        highestPackage: 18,
      },
      {
        department: "Electronics and Communication Engineering",
        shortName: "ECE",
        registered: 198,
        eligible: 169,
        placed: 96,
        offers: 108,
        averagePackage: 6.3,
        highestPackage: 12,
      },
      {
        department: "Electrical and Electronics Engineering",
        shortName: "EEE",
        registered: 132,
        eligible: 113,
        placed: 60,
        offers: 68,
        averagePackage: 5.8,
        highestPackage: 10,
      },
      {
        department: "Mechanical Engineering",
        shortName: "ME",
        registered: 162,
        eligible: 126,
        placed: 0,
        offers: 0,
        averagePackage: 0,
        highestPackage: 0,
      },
    ],
    recruiterPerformance: [
      {
        company: "TechNova Solutions",
        drives: 4,
        applications: 252,
        shortlisted: 73,
        interviews: 52,
        offers: 31,
        averagePackage: 8.8,
      },
      {
        company: "Infosphere Technologies",
        drives: 4,
        applications: 218,
        shortlisted: 66,
        interviews: 46,
        offers: 27,
        averagePackage: 7.2,
      },
      {
        company: "DataCraft Analytics",
        drives: 2,
        applications: 164,
        shortlisted: 47,
        interviews: 34,
        offers: 19,
        averagePackage: 8.1,
      },
      {
        company: "CloudAxis Systems",
        drives: 2,
        applications: 138,
        shortlisted: 42,
        interviews: 29,
        offers: 17,
        averagePackage: 6.7,
      },
      {
        company: "SecureGrid Networks",
        drives: 2,
        applications: 96,
        shortlisted: 28,
        interviews: 21,
        offers: 10,
        averagePackage: 8.2,
      },
      {
        company: "CodeBridge Labs",
        drives: 2,
        applications: 109,
        shortlisted: 31,
        interviews: 22,
        offers: 13,
        averagePackage: 6.3,
      },
    ],
    packageDistribution: [
      { range: "Below ₹4 LPA", students: 58 },
      { range: "₹4 - ₹6 LPA", students: 142 },
      { range: "₹6 - ₹8 LPA", students: 129 },
      { range: "₹8 - ₹10 LPA", students: 79 },
      { range: "₹10 - ₹15 LPA", students: 41 },
      { range: "Above ₹15 LPA", students: 12 },
    ],
    applicationFunnel: [
      { stage: "Applications", value: 2458 },
      { stage: "Eligible", value: 2051 },
      { stage: "Shortlisted", value: 914 },
      { stage: "Interviewed", value: 638 },
      { stage: "Offers", value: 552 },
      { stage: "Placed", value: 461 },
    ],
  },
};

const comparisonChanges = {
  registeredStudents: 6.1,
  eligibleStudents: 6.2,
  placedStudents: 16.9,
  totalOffers: 17.4,
  placementRate: 6.3,
  averagePackage: 9.9,
  highestPackage: 20,
  activeRecruiters: 16.2,
};

function Analytics() {
  const [academicYear, setAcademicYear] = useState("2025 - 2026");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [recruiterSearch, setRecruiterSearch] = useState("");
  const [trendMetric, setTrendMetric] = useState("Placed");
  const [message, setMessage] = useState("");

  const analytics = academicYearData[academicYear];
  const summary = analytics.summary;

  const filteredDepartments = useMemo(() => {
    if (departmentFilter === "All") {
      return analytics.departmentPerformance;
    }

    return analytics.departmentPerformance.filter(
      (department) => department.shortName === departmentFilter
    );
  }, [academicYear, analytics.departmentPerformance, departmentFilter]);

  const filteredRecruiters = useMemo(() => {
    const query = recruiterSearch.toLowerCase().trim();

    return analytics.recruiterPerformance.filter((recruiter) =>
      recruiter.company.toLowerCase().includes(query)
    );
  }, [analytics.recruiterPerformance, recruiterSearch]);

  const maximumTrendValue = useMemo(() => {
    const metricKey =
      trendMetric === "Applications"
        ? "applications"
        : trendMetric === "Offers"
          ? "offers"
          : "placed";

    return Math.max(
      ...analytics.monthlyTrend.map((month) => month[metricKey])
    );
  }, [analytics.monthlyTrend, trendMetric]);

  const maximumPackageCount = Math.max(
    ...analytics.packageDistribution.map((item) => item.students)
  );

  const maximumRecruiterOffers = Math.max(
    ...analytics.recruiterPerformance.map(
      (recruiter) => recruiter.offers
    )
  );

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const getTrendValue = (item) => {
    if (trendMetric === "Applications") {
      return item.applications;
    }

    if (trendMetric === "Offers") {
      return item.offers;
    }

    return item.placed;
  };

  const getPlacementRate = (department) => {
    if (department.eligible === 0) {
      return 0;
    }

    return Math.round(
      (department.placed / department.eligible) * 100
    );
  };

  const handleExport = () => {
    const rows = [
      ["Placement Analytics Report", academicYear],
      [],
      ["Summary"],
      ["Registered Students", summary.registeredStudents],
      ["Eligible Students", summary.eligibleStudents],
      ["Placed Students", summary.placedStudents],
      ["Total Offers", summary.totalOffers],
      ["Placement Rate", `${summary.placementRate}%`],
      ["Average Package", `₹${summary.averagePackage} LPA`],
      ["Highest Package", `₹${summary.highestPackage} LPA`],
      ["Active Recruiters", summary.activeRecruiters],
      [],
      [
        "Department",
        "Registered",
        "Eligible",
        "Placed",
        "Offers",
        "Placement Rate",
        "Average Package",
        "Highest Package",
      ],
      ...analytics.departmentPerformance.map((department) => [
        department.department,
        department.registered,
        department.eligible,
        department.placed,
        department.offers,
        `${getPlacementRate(department)}%`,
        `₹${department.averagePackage} LPA`,
        `₹${department.highestPackage} LPA`,
      ]),
      [],
      [
        "Recruiter",
        "Drives",
        "Applications",
        "Shortlisted",
        "Interviews",
        "Offers",
        "Average Package",
      ],
      ...analytics.recruiterPerformance.map((recruiter) => [
        recruiter.company,
        recruiter.drives,
        recruiter.applications,
        recruiter.shortlisted,
        recruiter.interviews,
        recruiter.offers,
        `₹${recruiter.averagePackage} LPA`,
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
    anchor.download = `placement-analytics-${academicYear.replaceAll(
      " ",
      ""
    )}.csv`;

    anchor.click();
    URL.revokeObjectURL(downloadUrl);

    showMessage("Placement analytics exported successfully.");
  };

  const summaryCards = [
    {
      title: "Registered Students",
      value: summary.registeredStudents.toLocaleString("en-IN"),
      change: comparisonChanges.registeredStudents,
      description: "Students registered for placements",
      icon: GraduationCap,
      iconClass: "bg-blue-100 text-blue-700",
    },
    {
      title: "Eligible Students",
      value: summary.eligibleStudents.toLocaleString("en-IN"),
      change: comparisonChanges.eligibleStudents,
      description: "Students satisfying eligibility rules",
      icon: Users,
      iconClass: "bg-cyan-100 text-cyan-700",
    },
    {
      title: "Students Placed",
      value: summary.placedStudents.toLocaleString("en-IN"),
      change: comparisonChanges.placedStudents,
      description: "Students with confirmed placements",
      icon: UserCheck,
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Placement Rate",
      value: `${summary.placementRate}%`,
      change: comparisonChanges.placementRate,
      description: "Placed among eligible students",
      icon: TrendingUp,
      iconClass: "bg-purple-100 text-purple-700",
    },
    {
      title: "Total Offers",
      value: summary.totalOffers.toLocaleString("en-IN"),
      change: comparisonChanges.totalOffers,
      description: "Offers released by recruiters",
      icon: Award,
      iconClass: "bg-amber-100 text-amber-700",
    },
    {
      title: "Average Package",
      value: `₹${summary.averagePackage} LPA`,
      change: comparisonChanges.averagePackage,
      description: "Average annual compensation",
      icon: IndianRupee,
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Highest Package",
      value: `₹${summary.highestPackage} LPA`,
      change: comparisonChanges.highestPackage,
      description: "Highest annual compensation",
      icon: Target,
      iconClass: "bg-rose-100 text-rose-700",
    },
    {
      title: "Active Recruiters",
      value: summary.activeRecruiters,
      change: comparisonChanges.activeRecruiters,
      description: "Companies participating this year",
      icon: Building2,
      iconClass: "bg-indigo-100 text-indigo-700",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <BarChart3 size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Institutional Insights
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Placement Analytics
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Monitor placement performance, recruiter engagement,
                department outcomes, salary packages and student hiring
                progress.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={academicYear}
                onChange={(event) => {
                  setAcademicYear(event.target.value);
                  setDepartmentFilter("All");
                  setRecruiterSearch("");
                }}
                className="rounded-xl border border-white/30 bg-white/10 px-4 py-3 font-semibold text-white outline-none backdrop-blur [&>option]:text-neutral-900"
              >
                <option>2025 - 2026</option>
                <option>2024 - 2025</option>
              </select>

              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Download size={19} />
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
          const positive = card.change >= 0;

          return (
            <article
              key={card.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.iconClass}`}
                >
                  <Icon size={22} />
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-sm font-bold ${
                    positive ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {Math.abs(card.change)}%
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
            </article>
          );
        })}
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.45fr_0.75fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Monthly Placement Trend
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Track applications, offers and successful placements.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {["Applications", "Offers", "Placed"].map((metric) => (
                <button
                  key={metric}
                  type="button"
                  onClick={() => setTrendMetric(metric)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    trendMetric === metric
                      ? "bg-blue-600 text-white"
                      : "border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  {metric}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div className="flex h-80 min-w-[760px] items-end gap-4 border-b border-neutral-200 px-2">
              {analytics.monthlyTrend.map((item) => {
                const value = getTrendValue(item);
                const height = (value / maximumTrendValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex h-full min-w-[44px] flex-1 flex-col items-center justify-end"
                  >
                    <div className="group relative flex h-[250px] w-full items-end justify-center">
                      <div
                        className="w-8 rounded-t-xl bg-gradient-to-t from-blue-700 to-purple-500 transition hover:opacity-80"
                        style={{
                          height: `${height}%`,
                          minHeight: "10px",
                        }}
                      >
                        <span className="absolute left-1/2 hidden -translate-x-1/2 -translate-y-9 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                          {value}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 pb-3 text-xs font-semibold text-neutral-500">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <article className="rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-700">
                Total Applications
              </p>

              <p className="mt-2 text-2xl font-bold text-blue-900">
                {analytics.applicationFunnel[0].value.toLocaleString(
                  "en-IN"
                )}
              </p>
            </article>

            <article className="rounded-2xl bg-purple-50 p-5">
              <p className="text-sm font-semibold text-purple-700">
                Total Offers
              </p>

              <p className="mt-2 text-2xl font-bold text-purple-900">
                {summary.totalOffers.toLocaleString("en-IN")}
              </p>
            </article>

            <article className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">
                Students Placed
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-900">
                {summary.placedStudents.toLocaleString("en-IN")}
              </p>
            </article>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Placement Rate
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Eligible student placement outcome.
              </p>
            </div>

            <TrendingUp size={24} className="text-emerald-600" />
          </div>

          <div className="mt-8 flex justify-center">
            <div
              className="relative flex h-56 w-56 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#2563eb 0deg ${
                  summary.placementRate * 3.6
                }deg, #e5e7eb ${
                  summary.placementRate * 3.6
                }deg 360deg)`,
              }}
            >
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
                <p className="text-4xl font-bold text-neutral-900">
                  {summary.placementRate}%
                </p>

                <p className="mt-1 text-sm font-semibold text-neutral-500">
                  Placement Rate
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4">
              <span className="text-sm font-semibold text-neutral-600">
                Eligible Students
              </span>

              <span className="font-bold text-neutral-900">
                {summary.eligibleStudents}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4">
              <span className="text-sm font-semibold text-neutral-600">
                Students Placed
              </span>

              <span className="font-bold text-emerald-700">
                {summary.placedStudents}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-neutral-50 p-4">
              <span className="text-sm font-semibold text-neutral-600">
                Yet to be Placed
              </span>

              <span className="font-bold text-amber-700">
                {summary.eligibleStudents - summary.placedStudents}
              </span>
            </div>
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Department Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Compare eligibility, placements, offers and salary
              outcomes by department.
            </p>
          </div>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          >
            <option value="All">All Departments</option>

            {analytics.departmentPerformance.map((department) => (
              <option
                key={department.shortName}
                value={department.shortName}
              >
                {department.shortName}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50 text-left">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Department
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Registered
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Eligible
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Placed
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Offers
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
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.map((department) => {
                const placementRate = getPlacementRate(department);

                return (
                  <tr
                    key={department.shortName}
                    className="border-b border-neutral-100 transition hover:bg-neutral-50"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 font-bold text-blue-700">
                          {department.shortName}
                        </div>

                        <div>
                          <p className="max-w-[260px] font-bold text-neutral-900">
                            {department.department}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-semibold text-neutral-700">
                      {department.registered}
                    </td>

                    <td className="px-6 py-5 font-semibold text-neutral-700">
                      {department.eligible}
                    </td>

                    <td className="px-6 py-5 font-bold text-emerald-700">
                      {department.placed}
                    </td>

                    <td className="px-6 py-5 font-bold text-blue-700">
                      {department.offers}
                    </td>

                    <td className="px-6 py-5">
                      <div className="w-40">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-neutral-500">
                            Progress
                          </span>

                          <span className="font-bold text-neutral-900">
                            {placementRate}%
                          </span>
                        </div>

                        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                            style={{ width: `${placementRate}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 font-bold text-neutral-900">
                      ₹{department.averagePackage} LPA
                    </td>

                    <td className="px-6 py-5 font-bold text-purple-700">
                      ₹{department.highestPackage} LPA
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1fr_1fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Salary Package Distribution
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Number of placed students across package ranges.
              </p>
            </div>

            <IndianRupee size={24} className="text-emerald-600" />
          </div>

          <div className="mt-8 space-y-6">
            {analytics.packageDistribution.map((item) => {
              const percentage =
                (item.students / maximumPackageCount) * 100;

              return (
                <div key={item.range}>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-neutral-700">
                      {item.range}
                    </p>

                    <p className="font-bold text-neutral-900">
                      {item.students}
                    </p>
                  </div>

                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-600"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-neutral-100 pt-6">
            <div className="rounded-2xl bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-700">
                Average Package
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-900">
                ₹{summary.averagePackage} LPA
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 p-5">
              <p className="text-sm font-semibold text-purple-700">
                Highest Package
              </p>

              <p className="mt-2 text-2xl font-bold text-purple-900">
                ₹{summary.highestPackage} LPA
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Application Funnel
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Student progression through the recruitment lifecycle.
              </p>
            </div>

            <PieChart size={24} className="text-purple-600" />
          </div>

          <div className="mt-8 space-y-4">
            {analytics.applicationFunnel.map((stage, index) => {
              const firstValue =
                analytics.applicationFunnel[0].value;

              const percentage = Math.round(
                (stage.value / firstValue) * 100
              );

              return (
                <article
                  key={stage.stage}
                  className="rounded-2xl border border-neutral-200 p-4"
                  style={{
                    width: `${Math.max(percentage, 48)}%`,
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-100 text-sm font-bold text-blue-700">
                        {index + 1}
                      </div>

                      <p className="font-semibold text-neutral-700">
                        {stage.stage}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-neutral-900">
                        {stage.value.toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-neutral-500">
                        {percentage}%
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-neutral-200 p-6 lg:flex-row lg:items-center lg:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Recruiter Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Compare company participation, candidate engagement and
              hiring outcomes.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              type="text"
              value={recruiterSearch}
              onChange={(event) =>
                setRecruiterSearch(event.target.value)
              }
              placeholder="Search recruiter..."
              className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {filteredRecruiters.length > 0 ? (
          <div className="grid gap-5 p-5 md:grid-cols-2 xl:grid-cols-3 sm:p-8">
            {filteredRecruiters.map((recruiter, index) => {
              const offerPercentage =
                (recruiter.offers / maximumRecruiterOffers) * 100;

              const conversionRate = Math.round(
                (recruiter.offers / recruiter.applications) * 100
              );

              return (
                <article
                  key={recruiter.company}
                  className="rounded-3xl border border-neutral-200 p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                        {recruiter.company
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900">
                          {recruiter.company}
                        </h3>

                        <p className="mt-1 text-sm text-neutral-500">
                          {recruiter.drives} placement drives
                        </p>
                      </div>
                    </div>

                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 font-bold text-amber-700">
                      {index + 1}
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-blue-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        Applications
                      </p>

                      <p className="mt-1 text-xl font-bold text-blue-900">
                        {recruiter.applications}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-emerald-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                        Offers
                      </p>

                      <p className="mt-1 text-xl font-bold text-emerald-900">
                        {recruiter.offers}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-purple-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-purple-600">
                        Interviews
                      </p>

                      <p className="mt-1 text-xl font-bold text-purple-900">
                        {recruiter.interviews}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-amber-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
                        Avg. Package
                      </p>

                      <p className="mt-1 text-xl font-bold text-amber-900">
                        ₹{recruiter.averagePackage}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-neutral-600">
                        Relative Offers
                      </span>

                      <span className="font-bold text-neutral-900">
                        {recruiter.offers}
                      </span>
                    </div>

                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                        style={{ width: `${offerPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-5">
                    <span className="text-sm font-semibold text-neutral-600">
                      Offer Conversion
                    </span>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                      {conversionRate}%
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <Building2
              size={34}
              className="mx-auto text-neutral-400"
            />

            <h3 className="mt-4 text-xl font-bold text-neutral-900">
              No recruiters found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try another recruiter or company name.
            </p>
          </div>
        )}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
          <BriefcaseBusiness size={24} className="text-blue-700" />

          <p className="mt-5 text-3xl font-bold text-blue-900">
            74
          </p>

          <p className="mt-1 font-semibold text-blue-800">
            Placement Drives
          </p>

          <p className="mt-2 text-sm text-blue-700">
            Conducted during the selected academic year.
          </p>
        </article>

        <article className="rounded-3xl border border-purple-200 bg-purple-50 p-6">
          <Building2 size={24} className="text-purple-700" />

          <p className="mt-5 text-3xl font-bold text-purple-900">
            {summary.activeRecruiters}
          </p>

          <p className="mt-1 font-semibold text-purple-800">
            Participating Recruiters
          </p>

          <p className="mt-2 text-sm text-purple-700">
            Verified companies involved in campus hiring.
          </p>
        </article>

        <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
          <Award size={24} className="text-emerald-700" />

          <p className="mt-5 text-3xl font-bold text-emerald-900">
            {summary.totalOffers}
          </p>

          <p className="mt-1 font-semibold text-emerald-800">
            Confirmed Offers
          </p>

          <p className="mt-2 text-sm text-emerald-700">
            Includes multiple offers received by students.
          </p>
        </article>

        <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <Target size={24} className="text-amber-700" />

          <p className="mt-5 text-3xl font-bold text-amber-900">
            {Math.round(
              (summary.totalOffers / summary.placedStudents) * 100
            )}
            %
          </p>

          <p className="mt-1 font-semibold text-amber-800">
            Offer-to-Placement Ratio
          </p>

          <p className="mt-2 text-sm text-amber-700">
            Offers received compared with placed students.
          </p>
        </article>
      </section>
    </div>
  );
}

export default Analytics;