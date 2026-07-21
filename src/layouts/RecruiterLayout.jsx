import { useState } from "react";
import {
  LayoutDashboard,
  Building2,
  BriefcaseBusiness,
  Users,
  CalendarDays,
  Bell,
  Settings,
  Menu,
  X,
  UserSearch,
  LogOut,
  PlusCircle,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/recruiter/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Company Profile",
    path: "/recruiter/company-profile",
    icon: Building2,
  },
  {
    label: "Post Job",
    path: "/recruiter/post-job",
    icon: PlusCircle,
  },
  {
    label: "Manage Jobs",
    path: "/recruiter/manage-jobs",
    icon: BriefcaseBusiness,
  },
  {
    label: "Applicants",
    path: "/recruiter/applicants",
    icon: Users,
  },
  {
    label: "Candidate Search",
    path: "/recruiter/candidates",
    icon: UserSearch,
  },
  {
    label: "Interviews",
    path: "/recruiter/interviews",
    icon: CalendarDays,
  },
  {
    label: "Notifications",
    path: "/recruiter/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    path: "/recruiter/settings",
    icon: Settings,
  },
];

function RecruiterLayout() {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem("campusteUser");
    sessionStorage.removeItem("campusteUser");

    setIsSidebarOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
          <button
            type="button"
            onClick={() => {
              closeSidebar();
              navigate("/recruiter/dashboard");
            }}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-white">
              CT
            </div>

            <div className="text-left">
              <h1 className="text-xl font-bold text-neutral-900">
                CampusTE
              </h1>

              <p className="text-xs text-neutral-500">
                Recruiter Portal
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <div className="mb-4 flex items-center gap-3 rounded-xl bg-neutral-50 p-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
              RS
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-neutral-900">
                Recruiter Name
              </p>

              <p className="truncate text-xs text-neutral-500">
                Recruiter Account
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
          >
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(true)}
              className="rounded-xl border border-neutral-200 p-2.5 text-neutral-700 hover:bg-neutral-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-sm text-neutral-500">
                Welcome back
              </p>

              <h2 className="font-bold text-neutral-900">
                Recruiter Management Portal
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate("/recruiter/notifications")
            }
            className="relative rounded-xl border border-neutral-200 p-3 text-neutral-600 transition hover:bg-neutral-100"
            aria-label="Open notifications"
          >
            <Bell size={21} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RecruiterLayout;