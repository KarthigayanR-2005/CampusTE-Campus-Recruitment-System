import {
    FileText,
    Clock3,
    CheckCircle2,
    XCircle,
  } from "lucide-react";
  
  function ApplicationsStats({ applications }) {
    const totalApplications = applications.length;
  
    const interviewCount = applications.filter((app) =>
      app.status.toLowerCase().includes("interview")
    ).length;
  
    const offerCount = applications.filter(
      (app) => app.status === "Offer Released"
    ).length;
  
    const rejectedCount = applications.filter(
      (app) => app.status === "Rejected"
    ).length;
  
    const stats = [
      {
        title: "Total Applications",
        value: totalApplications,
        icon: FileText,
        bg: "bg-blue-100",
        color: "text-blue-600",
      },
      {
        title: "Interviews",
        value: interviewCount,
        icon: Clock3,
        bg: "bg-amber-100",
        color: "text-amber-600",
      },
      {
        title: "Offers",
        value: offerCount,
        icon: CheckCircle2,
        bg: "bg-green-100",
        color: "text-green-600",
      },
      {
        title: "Rejected",
        value: rejectedCount,
        icon: XCircle,
        bg: "bg-red-100",
        color: "text-red-600",
      },
    ];
  
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-500">
                    {stat.title}
                  </p>
  
                  <h2 className="mt-2 text-3xl font-bold">
                    {stat.value}
                  </h2>
                </div>
  
                <div
                  className={`rounded-2xl p-4 ${stat.bg}`}
                >
                  <Icon
                    className={stat.color}
                    size={30}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
  
  export default ApplicationsStats;