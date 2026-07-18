import {
    PlusCircle,
    Users,
    CalendarPlus,
    FileBarChart2,
    Send,
    Building2,
  } from "lucide-react";
  import { useNavigate } from "react-router-dom";
  
  const actions = [
    {
      title: "Post New Job",
      description: "Create a new job opening",
      icon: PlusCircle,
      color: "bg-blue-100 text-blue-700",
      path: "/recruiter/post-job",
    },
    {
      title: "Search Candidates",
      description: "Browse candidate profiles",
      icon: Users,
      color: "bg-purple-100 text-purple-700",
      path: "/recruiter/candidates",
    },
    {
      title: "Schedule Interview",
      description: "Plan upcoming interviews",
      icon: CalendarPlus,
      color: "bg-orange-100 text-orange-700",
      path: "/recruiter/interviews",
    },
    {
      title: "Reports",
      description: "View hiring analytics",
      icon: FileBarChart2,
      color: "bg-green-100 text-green-700",
      path: "/recruiter/dashboard",
    },
    {
      title: "Send Offer",
      description: "Send offer letters",
      icon: Send,
      color: "bg-pink-100 text-pink-700",
      path: "/recruiter/applicants",
    },
    {
      title: "Company Profile",
      description: "Manage company details",
      icon: Building2,
      color: "bg-indigo-100 text-indigo-700",
      path: "/recruiter/company-profile",
    },
  ];
  
  function QuickActions() {
    const navigate = useNavigate();
  
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">
            Quick Actions
          </h2>
  
          <p className="mt-2 text-neutral-500">
            Frequently used recruiter operations.
          </p>
        </div>
  
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {actions.map((action) => {
            const Icon = action.icon;
  
            return (
              <button
                key={action.title}
                onClick={() => navigate(action.path)}
                className="rounded-2xl border border-neutral-200 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <div
                  className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${action.color}`}
                >
                  <Icon size={28} />
                </div>
  
                <h3 className="text-lg font-semibold text-neutral-900">
                  {action.title}
                </h3>
  
                <p className="mt-2 text-sm text-neutral-500">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default QuickActions;