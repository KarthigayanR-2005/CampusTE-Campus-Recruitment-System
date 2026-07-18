import {
    BriefcaseBusiness,
    Users,
    CalendarDays,
    BadgeCheck,
    TrendingUp,
  } from "lucide-react";
  
  const statistics = [
    {
      id: 1,
      label: "Active Jobs",
      value: "12",
      change: "+2 this month",
      icon: BriefcaseBusiness,
      iconStyle: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      label: "Total Applicants",
      value: "248",
      change: "+18 this week",
      icon: Users,
      iconStyle: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      label: "Scheduled Interviews",
      value: "18",
      change: "6 upcoming today",
      icon: CalendarDays,
      iconStyle: "bg-orange-100 text-orange-700",
    },
    {
      id: 4,
      label: "Offers Sent",
      value: "26",
      change: "+8 this month",
      icon: BadgeCheck,
      iconStyle: "bg-green-100 text-green-700",
    },
  ];
  
  function DashboardStats() {
    return (
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => {
          const Icon = statistic.icon;
  
          return (
            <article
              key={statistic.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${statistic.iconStyle}`}
                >
                  <Icon size={24} />
                </div>
  
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  <TrendingUp size={14} />
                  Growth
                </span>
              </div>
  
              <p className="mt-6 text-sm font-medium text-neutral-500">
                {statistic.label}
              </p>
  
              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                {statistic.value}
              </h2>
  
              <p className="mt-3 text-sm text-neutral-500">
                {statistic.change}
              </p>
            </article>
          );
        })}
      </section>
    );
  }
  
  export default DashboardStats;