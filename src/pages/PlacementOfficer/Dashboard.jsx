import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  MapPin,
  PlusCircle,
  Search,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";

const monthlyPlacementData = {
  "6 Months": [
    { month: "Feb", placed: 42, offers: 48 },
    { month: "Mar", placed: 58, offers: 64 },
    { month: "Apr", placed: 71, offers: 79 },
    { month: "May", placed: 86, offers: 94 },
    { month: "Jun", placed: 104, offers: 116 },
    { month: "Jul", placed: 126, offers: 141 },
  ],
  "12 Months": [
    { month: "Aug", placed: 18, offers: 22 },
    { month: "Sep", placed: 24, offers: 28 },
    { month: "Oct", placed: 31, offers: 36 },
    { month: "Nov", placed: 35, offers: 41 },
    { month: "Dec", placed: 39, offers: 46 },
    { month: "Jan", placed: 44, offers: 50 },
    { month: "Feb", placed: 42, offers: 48 },
    { month: "Mar", placed: 58, offers: 64 },
    { month: "Apr", placed: 71, offers: 79 },
    { month: "May", placed: 86, offers: 94 },
    { month: "Jun", placed: 104, offers: 116 },
    { month: "Jul", placed: 126, offers: 141 },
  ],
};

const placementDrives = [
  {
    id: 1,
    company: "TechNova Solutions",
    role: "Software Development Engineer",
    date: "2026-07-23",
    time: "09:30 AM",
    venue: "Main Seminar Hall",
    eligible: 186,
    registered: 142,
    status: "Upcoming",
  },
  {
    id: 2,
    company: "Infosphere Technologies",
    role: "Graduate Engineer Trainee",
    date: "2026-07-25",
    time: "10:00 AM",
    venue: "Block B Auditorium",
    eligible: 224,
    registered: 178,
    status: "Upcoming",
  },
  {
    id: 3,
    company: "DataCraft Analytics",
    role: "Data Analyst",
    date: "2026-07-28",
    time: "11:30 AM",
    venue: "Online Assessment",
    eligible: 112,
    registered: 96,
    status: "Registration Open",
  },
  {
    id: 4,
    company: "CloudAxis Systems",
    role: "Cloud Support Associate",
    date: "2026-08-01",
    time: "09:00 AM",
    venue: "Placement Lab",
    eligible: 154,
    registered: 109,
    status: "Registration Open",
  },
];

const recentActivity = [
  {
    id: 1,
    title: "New recruiter approved",
    description:
      "TechNova Solutions was approved for campus recruitment.",
    time: "15 minutes ago",
    icon: Building2,
    iconClass: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    title: "Placement drive published",
    description:
      "Infosphere Technologies graduate hiring drive is now open.",
    time: "45 minutes ago",
    icon: BriefcaseBusiness,
    iconClass: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    title: "Students shortlisted",
    description:
      "32 students were shortlisted for the Data Analyst role.",
    time: "2 hours ago",
    icon: UserCheck,
    iconClass: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    title: "Interview schedule updated",
    description:
      "The TechNova technical interview schedule was modified.",
    time: "4 hours ago",
    icon: CalendarDays,
    iconClass: "bg-amber-100 text-amber-700",
  },
  {
    id: 5,
    title: "Offer records updated",
    description:
      "12 new placement offers were recorded successfully.",
    time: "Yesterday",
    icon: Award,
    iconClass: "bg-rose-100 text-rose-700",
  },
];

const departmentData = [
  {
    department: "CSE",
    total: 240,
    eligible: 218,
    placed: 164,
    rate: 75,
  },
  {
    department: "IT",
    total: 180,
    eligible: 165,
    placed: 119,
    rate: 72,
  },
  {
    department: "AI & DS",
    total: 120,
    eligible: 109,
    placed: 76,
    rate: 70,
  },
  {
    department: "ECE",
    total: 210,
    eligible: 184,
    placed: 112,
    rate: 61,
  },
  {
    department: "EEE",
    total: 140,
    eligible: 122,
    placed: 68,
    rate: 56,
  },
];

const topRecruiters = [
  {
    id: 1,
    company: "TechNova Solutions",
    offers: 38,
    averagePackage: "₹9.4 LPA",
    status: "Active",
  },
  {
    id: 2,
    company: "Infosphere Technologies",
    offers: 32,
    averagePackage: "₹7.8 LPA",
    status: "Active",
  },
  {
    id: 3,
    company: "DataCraft Analytics",
    offers: 24,
    averagePackage: "₹8.6 LPA",
    status: "Active",
  },
  {
    id: 4,
    company: "CloudAxis Systems",
    offers: 21,
    averagePackage: "₹7.2 LPA",
    status: "Active",
  },
];

const statusStyles = {
  Upcoming: "border-blue-200 bg-blue-50 text-blue-700",
  "Registration Open":
    "border-emerald-200 bg-emerald-50 text-emerald-700",
};

function Dashboard() {
  const navigate = useNavigate();

  const [chartPeriod, setChartPeriod] = useState("6 Months");
  const [activitySearch, setActivitySearch] = useState("");
  const [message, setMessage] = useState("");

  const chartData = monthlyPlacementData[chartPeriod];

  const maximumChartValue = useMemo(
    () =>
      Math.max(
        ...chartData.map((item) =>
          Math.max(item.placed, item.offers)
        )
      ),
    [chartData]
  );

  const filteredActivities = useMemo(() => {
    const query = activitySearch.toLowerCase().trim();

    return recentActivity.filter(
      (activity) =>
        activity.title.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
    );
  }, [activitySearch]);

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

  const dashboardStats = [
    {
      title: "Registered Students",
      value: "1,248",
      change: "+8.2%",
      description: "Compared with last semester",
      icon: GraduationCap,
      iconClass: "bg-blue-100 text-blue-700",
      changeClass: "text-emerald-600",
    },
    {
      title: "Active Recruiters",
      value: "86",
      change: "+12",
      description: "Approved companies",
      icon: Building2,
      iconClass: "bg-purple-100 text-purple-700",
      changeClass: "text-emerald-600",
    },
    {
      title: "Students Placed",
      value: "539",
      change: "+14.6%",
      description: "Current placement season",
      icon: UserCheck,
      iconClass: "bg-emerald-100 text-emerald-700",
      changeClass: "text-emerald-600",
    },
    {
      title: "Placement Rate",
      value: "68.4%",
      change: "+5.3%",
      description: "Among eligible students",
      icon: TrendingUp,
      iconClass: "bg-amber-100 text-amber-700",
      changeClass: "text-emerald-600",
    },
  ];

  const quickActions = [
    {
      title: "Add Student",
      description: "Register or import a new student profile.",
      icon: Users,
      path: "/placement-officer/students",
      iconClass: "bg-blue-100 text-blue-700",
    },
    {
      title: "Approve Recruiter",
      description: "Review pending recruiter registrations.",
      icon: Building2,
      path: "/placement-officer/recruiters",
      iconClass: "bg-purple-100 text-purple-700",
    },
    {
      title: "Create Drive",
      description: "Create and publish a placement drive.",
      icon: PlusCircle,
      path: "/placement-officer/drives",
      iconClass: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Review Applications",
      description: "Track student applications and eligibility.",
      icon: ClipboardCheck,
      path: "/placement-officer/applications",
      iconClass: "bg-amber-100 text-amber-700",
    },
    {
      title: "Interview Schedule",
      description: "Manage upcoming interview rounds.",
      icon: CalendarDays,
      path: "/placement-officer/interviews",
      iconClass: "bg-rose-100 text-rose-700",
    },
    {
      title: "Placement Analytics",
      description: "View detailed placement reports.",
      icon: BarChart3,
      path: "/placement-officer/analytics",
      iconClass: "bg-cyan-100 text-cyan-700",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                  <GraduationCap size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Placement Office
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Welcome back, Placement Officer
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Monitor student placements, recruiter activities,
                placement drives and overall institutional hiring
                performance.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() =>
                  navigate("/placement-officer/drives")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <PlusCircle size={19} />
                Create Drive
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/placement-officer/analytics")
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <BarChart3 size={19} />
                View Analytics
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
        {dashboardStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconClass}`}
                >
                  <Icon size={23} />
                </div>

                <span
                  className={`inline-flex items-center gap-1 text-sm font-bold ${stat.changeClass}`}
                >
                  <ArrowUpRight size={16} />
                  {stat.change}
                </span>
              </div>

              <p className="mt-6 text-3xl font-bold text-neutral-900">
                {stat.value}
              </p>

              <p className="mt-1 font-semibold text-neutral-700">
                {stat.title}
              </p>

              <p className="mt-2 text-sm text-neutral-500">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Placement Performance
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Monthly offers and successfully placed students.
              </p>
            </div>

            <select
              value={chartPeriod}
              onChange={(event) =>
                setChartPeriod(event.target.value)
              }
              className="rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>6 Months</option>
              <option>12 Months</option>
            </select>
          </div>

          <div className="mt-8 flex items-center gap-5 text-sm font-semibold text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-blue-600" />
              Students Placed
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-purple-500" />
              Offers Received
            </div>
          </div>

          <div className="mt-8 overflow-x-auto">
            <div
              className={`flex min-w-[620px] items-end gap-4 ${
                chartPeriod === "12 Months"
                  ? "h-80"
                  : "h-72"
              }`}
            >
              {chartData.map((item) => {
                const placedHeight =
                  (item.placed / maximumChartValue) * 100;

                const offerHeight =
                  (item.offers / maximumChartValue) * 100;

                return (
                  <div
                    key={item.month}
                    className="flex min-w-[58px] flex-1 flex-col items-center"
                  >
                    <div className="flex h-56 w-full items-end justify-center gap-2">
                      <div
                        className="group relative w-5 rounded-t-lg bg-blue-600 transition hover:bg-blue-700"
                        style={{
                          height: `${placedHeight}%`,
                          minHeight: "12px",
                        }}
                      >
                        <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                          {item.placed}
                        </span>
                      </div>

                      <div
                        className="group relative w-5 rounded-t-lg bg-purple-500 transition hover:bg-purple-600"
                        style={{
                          height: `${offerHeight}%`,
                          minHeight: "12px",
                        }}
                      >
                        <span className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-lg bg-neutral-900 px-2 py-1 text-xs font-semibold text-white group-hover:block">
                          {item.offers}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 text-xs font-semibold text-neutral-500">
                      {item.month}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-neutral-100 pt-6 sm:grid-cols-3">
            <div>
              <p className="text-sm text-neutral-500">
                Total Offers
              </p>

              <p className="mt-1 text-2xl font-bold text-neutral-900">
                648
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Students Placed
              </p>

              <p className="mt-1 text-2xl font-bold text-neutral-900">
                539
              </p>
            </div>

            <div>
              <p className="text-sm text-neutral-500">
                Multiple Offers
              </p>

              <p className="mt-1 text-2xl font-bold text-neutral-900">
                109
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Placement Summary
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Current academic year
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <TrendingUp size={23} />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <div className="relative flex h-56 w-56 items-center justify-center rounded-full bg-[conic-gradient(#2563eb_0deg,#2563eb_246deg,#e5e7eb_246deg,#e5e7eb_360deg)]">
              <div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-white">
                <p className="text-4xl font-bold text-neutral-900">
                  68.4%
                </p>

                <p className="mt-1 text-sm font-semibold text-neutral-500">
                  Placement Rate
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-600">
                  Eligible Students
                </span>

                <span className="font-bold text-neutral-900">
                  788
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-blue-600"
                  style={{ width: "89%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-600">
                  Students Placed
                </span>

                <span className="font-bold text-neutral-900">
                  539
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-emerald-600"
                  style={{ width: "68.4%" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-neutral-600">
                  Placement Drives
                </span>

                <span className="font-bold text-neutral-900">
                  74
                </span>
              </div>

              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-neutral-100">
                <div
                  className="h-full rounded-full bg-purple-600"
                  style={{ width: "82%" }}
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/placement-officer/analytics")
            }
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            View Detailed Analytics
            <ChevronRight size={18} />
          </button>
        </section>
      </div>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Upcoming Placement Drives
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Scheduled recruitment activities and registrations.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/placement-officer/drives")
            }
            className="inline-flex items-center gap-2 font-semibold text-blue-700 transition hover:text-blue-900"
          >
            View All Drives
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[1050px] border-collapse">
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
                  Eligible
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Registered
                </th>

                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {placementDrives.map((drive) => (
                <tr
                  key={drive.id}
                  className="border-b border-neutral-100 transition hover:bg-neutral-50"
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

                        <p className="mt-1 text-sm text-neutral-500">
                          {drive.role}
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
                      {drive.time}
                    </p>
                  </td>

                  <td className="px-6 py-5">
                    <p className="flex max-w-[200px] items-start gap-2 text-sm text-neutral-700">
                      <MapPin
                        size={16}
                        className="mt-0.5 shrink-0 text-neutral-400"
                      />
                      {drive.venue}
                    </p>
                  </td>

                  <td className="px-6 py-5 font-bold text-neutral-900">
                    {drive.eligible}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900">
                        {drive.registered}
                      </span>

                      <span className="text-xs text-neutral-500">
                        (
                        {Math.round(
                          (drive.registered / drive.eligible) * 100
                        )}
                        %)
                      </span>
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

                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      onClick={() =>
                        showMessage(
                          `Opening ${drive.company} placement drive.`
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    >
                      Manage
                      <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-4 p-5 lg:hidden">
          {placementDrives.map((drive) => (
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
                  {drive.time}
                </p>

                <p className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5" />
                  {drive.venue}
                </p>

                <p className="flex items-center gap-2">
                  <Users size={16} />
                  {drive.registered}/{drive.eligible} registered
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  showMessage(
                    `Opening ${drive.company} placement drive.`
                  )
                }
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold text-neutral-700"
              >
                Manage Drive
                <ChevronRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Department Performance
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Placement results across academic departments.
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {departmentData.map((department) => (
              <div key={department.department}>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-bold text-neutral-900">
                      {department.department}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {department.placed} placed from{" "}
                      {department.eligible} eligible students
                    </p>
                  </div>

                  <p className="text-lg font-bold text-blue-700">
                    {department.rate}%
                  </p>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                    style={{
                      width: `${department.rate}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/placement-officer/analytics")
            }
            className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
          >
            View department analytics
            <ChevronRight size={18} />
          </button>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Top Recruiters
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Companies with the highest offers.
              </p>
            </div>

            <Award size={24} className="text-amber-500" />
          </div>

          <div className="mt-7 space-y-4">
            {topRecruiters.map((recruiter, index) => (
              <article
                key={recruiter.id}
                className="flex items-center gap-4 rounded-2xl border border-neutral-200 p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 font-bold text-neutral-700">
                  {index + 1}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-neutral-900">
                    {recruiter.company}
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Average package: {recruiter.averagePackage}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-bold text-blue-700">
                    {recruiter.offers}
                  </p>

                  <p className="text-xs text-neutral-500">
                    offers
                  </p>
                </div>
              </article>
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/placement-officer/recruiters")
            }
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
          >
            View All Recruiters
            <ChevronRight size={18} />
          </button>
        </section>
      </div>

      <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Common placement management activities.
            </p>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  type="button"
                  onClick={() => navigate(action.path)}
                  className="group rounded-2xl border border-neutral-200 p-4 text-left transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                >
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>

                  <h3 className="mt-4 font-bold text-neutral-900">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    {action.description}
                  </p>

                  <ChevronRight
                    size={18}
                    className="mt-4 text-neutral-400 transition group-hover:translate-x-1 group-hover:text-blue-700"
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Latest placement portal updates.
              </p>
            </div>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={activitySearch}
                onChange={(event) =>
                  setActivitySearch(event.target.value)
                }
                placeholder="Search activity..."
                className="w-full rounded-xl border border-neutral-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 sm:w-60"
              />
            </div>
          </div>

          <div className="mt-7 space-y-2">
            {filteredActivities.map((activity) => {
              const Icon = activity.icon;

              return (
                <article
                  key={activity.id}
                  className="flex items-start gap-4 rounded-2xl p-4 transition hover:bg-neutral-50"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${activity.iconClass}`}
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

                    <p className="mt-2 flex items-center gap-2 text-xs font-medium text-neutral-400">
                      <Clock3 size={14} />
                      {activity.time}
                    </p>
                  </div>
                </article>
              );
            })}

            {filteredActivities.length === 0 && (
              <div className="py-12 text-center">
                <Bell
                  size={30}
                  className="mx-auto text-neutral-400"
                />

                <p className="mt-4 font-semibold text-neutral-700">
                  No matching activity found
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/placement-officer/notifications")
            }
            className="mt-5 inline-flex items-center gap-2 font-semibold text-blue-700 hover:text-blue-900"
          >
            View all notifications
            <ChevronRight size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;