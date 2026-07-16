import {
    UserCheck,
    FileText,
    Briefcase,
    CalendarDays,
  } from "lucide-react";
  
  const stats = [
    {
      title: "Profile Completion",
      value: "85%",
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Applications",
      value: "18",
      icon: FileText,
      color: "from-indigo-500 to-purple-600",
    },
    {
      title: "Available Jobs",
      value: "42",
      icon: Briefcase,
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Upcoming Interviews",
      value: "3",
      icon: CalendarDays,
      color: "from-purple-500 to-pink-600",
    },
  ];
  
  function DashboardStats() {
    return (
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
  
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
  
                <div>
  
                  <p className="text-sm font-medium text-neutral-500">
                    {stat.title}
                  </p>
  
                  <h2 className="mt-3 text-3xl font-bold text-neutral-900">
                    {stat.value}
                  </h2>
  
                </div>
  
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={28} />
                </div>
  
              </div>
  
            </div>
          );
        })}
  
      </section>
    );
  }
  
  export default DashboardStats;