import {
    TrendingUp,
    Users,
    BriefcaseBusiness,
    CalendarDays,
  } from "lucide-react";
  
  const monthlyData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 70 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 90 },
    { month: "May", value: 110 },
    { month: "Jun", value: 95 },
  ];
  
  function HiringAnalytics() {
    const maxValue = Math.max(...monthlyData.map((item) => item.value));
  
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Hiring Analytics
            </h2>
  
            <p className="mt-2 text-neutral-500">
              Recruitment performance over the last six months.
            </p>
          </div>
  
          <div className="rounded-xl bg-blue-100 p-3 text-blue-700">
            <TrendingUp size={24} />
          </div>
        </div>
  
        <div className="mt-10 flex h-72 items-end justify-between gap-4">
          {monthlyData.map((item) => (
            <div
              key={item.month}
              className="flex flex-1 flex-col items-center"
            >
              <div
                className="w-full rounded-t-xl bg-gradient-to-t from-blue-600 to-purple-600 transition hover:opacity-80"
                style={{
                  height: `${(item.value / maxValue) * 180}px`,
                }}
              />
  
              <p className="mt-3 text-sm font-semibold text-neutral-700">
                {item.month}
              </p>
  
              <span className="text-xs text-neutral-500">
                {item.value}
              </span>
            </div>
          ))}
        </div>
  
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-xl bg-neutral-50 p-4">
            <Users className="mb-2 text-blue-600" />
            <p className="text-sm text-neutral-500">
              Applicants
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              248
            </h3>
          </div>
  
          <div className="rounded-xl bg-neutral-50 p-4">
            <BriefcaseBusiness className="mb-2 text-purple-600" />
            <p className="text-sm text-neutral-500">
              Jobs Posted
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              32
            </h3>
          </div>
  
          <div className="rounded-xl bg-neutral-50 p-4">
            <CalendarDays className="mb-2 text-orange-600" />
            <p className="text-sm text-neutral-500">
              Interviews
            </p>
            <h3 className="mt-1 text-2xl font-bold">
              58
            </h3>
          </div>
        </div>
      </section>
    );
  }
  
  export default HiringAnalytics;