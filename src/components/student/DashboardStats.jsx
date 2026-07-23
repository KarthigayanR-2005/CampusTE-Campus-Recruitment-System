import {
  Award,
  Briefcase,
  FileText,
  FolderGit2,
  UserCheck,
  Wrench,
} from "lucide-react";

function DashboardStats({
  stats,
  completion,
}) {
  const dashboardStats = [
    {
      title:
        "Profile Completion",

      value:
        `${completion.percentage || 0}%`,

      icon: UserCheck,

      color:
        "from-blue-500 to-blue-600",
    },

    {
      title: "Skills",

      value:
        String(
          stats.skillCount || 0
        ),

      icon: Wrench,

      color:
        "from-indigo-500 to-purple-600",
    },

    {
      title: "Projects",

      value:
        String(
          stats.projectCount || 0
        ),

      icon: FolderGit2,

      color:
        "from-cyan-500 to-blue-600",
    },

    {
      title: "Experience",

      value:
        String(
          stats.experienceCount || 0
        ),

      icon: Briefcase,

      color:
        "from-purple-500 to-pink-600",
    },

    {
      title: "Certifications",

      value:
        String(
          stats.certificationCount || 0
        ),

      icon: Award,

      color:
        "from-emerald-500 to-teal-600",
    },

    {
      title: "Resume",

      value:
        stats.resumeUploaded
          ? "Uploaded"
          : "Missing",

      icon: FileText,

      color:
        stats.resumeUploaded
          ? "from-green-500 to-emerald-600"
          : "from-orange-500 to-amber-600",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {dashboardStats.map(
        (stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-500">
                    {stat.title}
                  </p>

                  <h2 className="mt-3 break-words text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r ${stat.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={27} />
                </div>
              </div>
            </div>
          );
        }
      )}
    </section>
  );
}

export default DashboardStats;