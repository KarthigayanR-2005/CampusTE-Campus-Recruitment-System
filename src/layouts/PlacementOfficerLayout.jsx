import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    path: "/placement-officer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Students",
    path: "/placement-officer/students",
    icon: Users,
  },
  {
    name: "Recruiters",
    path: "/placement-officer/recruiters",
    icon: Building2,
  },
  {
    name: "Placement Drives",
    path: "/placement-officer/placement-drives",
    icon: BriefcaseBusiness,
  },
  {
    name: "Applications",
    path: "/placement-officer/applications",
    icon: ClipboardCheck,
  },
  {
    name: "Interviews",
    path: "/placement-officer/interviews",
    icon: CalendarDays,
  },
  {
    name: "Analytics",
    path: "/placement-officer/analytics",
    icon: BarChart3,
  },
  {
    name: "Notifications",
    path: "/placement-officer/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/placement-officer/settings",
    icon: Settings,
  },
];

function PlacementOfficerLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {sidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-neutral-950/50 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
          <NavLink
            to="/placement-officer/dashboard"
            onClick={closeSidebar}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-md">
              <GraduationCap size={24} />
            </div>

            <div>
              <p className="text-xl font-bold text-neutral-900">
                CampusTE
              </p>

              <p className="text-xs font-semibold text-neutral-500">
                Placement Office
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <div className="border-b border-neutral-200 px-5 py-5">
          <div className="rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-white">
                PO
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold text-neutral-900">
                  Placement Officer
                </p>

                <p className="truncate text-xs text-neutral-500">
                  placement@campuste.edu
                </p>
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <NavLink
            to="/login"
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            <LogOut size={19} />
            Logout
          </NavLink>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>

            <div>
              <h1 className="text-lg font-bold text-neutral-900 sm:text-xl">
                Placement Management Portal
              </h1>

              <p className="hidden text-sm text-neutral-500 sm:block">
                Manage students, recruiters and campus placement
                activities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <NavLink
              to="/placement-officer/notifications"
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
              aria-label="Notifications"
            >
              <Bell size={20} />

              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500" />
            </NavLink>

            <div className="hidden items-center gap-3 rounded-xl border border-neutral-200 px-3 py-2 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-sm font-bold text-white">
                PO
              </div>

              <div>
                <p className="text-sm font-bold text-neutral-900">
                  Placement Officer
                </p>

                <p className="text-xs text-neutral-500">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PlacementOfficerLayout;