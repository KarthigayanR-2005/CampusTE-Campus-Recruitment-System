import { useEffect, useState } from "react";
import {
  Activity,
  Bell,
  Building2,
  ChevronDown,
  FileClock,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  UserCog,
  Users,
  UserSquare2,
  X,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    label: "Institutions",
    path: "/admin/institutions",
    icon: Building2,
  },
  {
    label: "Recruiters",
    path: "/admin/recruiters",
    icon: UserSquare2,
  },
  {
    label: "Placement Officers",
    path: "/admin/placement-officers",
    icon: UserCog,
  },
  {
    label: "System Analytics",
    path: "/admin/analytics",
    icon: Activity,
  },
  {
    label: "Audit Logs",
    path: "/admin/audit-logs",
    icon: FileClock,
  },
  {
    label: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
    badge: 6,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] =
    useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);

  const activeNavigationItem =
    navigationItems.find((item) =>
      location.pathname.startsWith(item.path)
    ) || navigationItems[0];

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

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {isSidebarOpen && (
        <button
          type="button"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-sm lg:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-neutral-200 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-neutral-200 px-6">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 text-left"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 text-white shadow-md">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-neutral-900">
                CampusTE
              </h1>

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
                Admin Portal
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={closeSidebar}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={21} />
          </button>
        </div>

        <div className="border-b border-neutral-200 p-5">
          <div className="rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                SA
              </div>

              <div className="min-w-0">
                <p className="truncate font-bold text-neutral-900">
                  System Administrator
                </p>

                <p className="mt-1 truncate text-xs text-neutral-500">
                  Super Admin Account
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <p className="text-xs font-semibold text-emerald-700">
                All systems operational
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <p className="mb-3 px-3 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">
            Administration
          </p>

          <div className="space-y-1.5">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-md"
                        : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? "text-white"
                            : "text-neutral-400 transition group-hover:text-neutral-700"
                        }
                      />

                      <span className="flex-1">
                        {item.label}
                      </span>

                      {item.badge && (
                        <span
                          className={`flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold ${
                            isActive
                              ? "bg-white text-blue-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-neutral-200 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
          >
            <LogOut size={19} />
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
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 lg:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={22} />
            </button>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                Administration
              </p>

              <h2 className="mt-1 text-lg font-bold text-neutral-900 sm:text-xl">
                {activeNavigationItem.label}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2.5 md:flex">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <span className="text-sm font-semibold text-emerald-700">
                System Healthy
              </span>
            </div>

            <button
              type="button"
              onClick={() => navigate("/admin/notifications")}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100"
              aria-label="Open notifications"
            >
              <Bell size={20} />

              <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-rose-500 px-1 text-[10px] font-bold text-white">
                6
              </span>
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() =>
                  setIsProfileMenuOpen(
                    (previousState) => !previousState
                  )
                }
                className="flex items-center gap-3 rounded-xl border border-transparent p-1.5 transition hover:border-neutral-200 hover:bg-neutral-50"
                aria-expanded={isProfileMenuOpen}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 text-sm font-bold text-white">
                  SA
                </div>

                <div className="hidden text-left sm:block">
                  <p className="max-w-36 truncate text-sm font-bold text-neutral-900">
                    System Admin
                  </p>

                  <p className="text-xs text-neutral-500">
                    Super Administrator
                  </p>
                </div>

                <ChevronDown
                  size={17}
                  className={`hidden text-neutral-500 transition sm:block ${
                    isProfileMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-14 z-40 w-72 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl">
                  <div className="border-b border-neutral-100 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-purple-700 font-bold text-white">
                        SA
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-bold text-neutral-900">
                          System Administrator
                        </p>

                        <p className="mt-1 truncate text-sm text-neutral-500">
                          admin@campuste.edu
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate("/admin/settings")
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                    >
                      <Settings size={18} />
                      Account Settings
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        navigate("/admin/audit-logs")
                      }
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-100"
                    >
                      <FileClock size={18} />
                      View Audit Activity
                    </button>
                  </div>

                  <div className="border-t border-neutral-100 pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
                    >
                      <LogOut size={18} />
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

        <footer className="border-t border-neutral-200 bg-white px-6 py-5 text-center text-sm text-neutral-500">
          © 2026 CampusTE Admin Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default AdminLayout;