import {
    LayoutDashboard,
    User,
    FileText,
    Brain,
    Briefcase,
    ClipboardList,
    CalendarDays,
    Bell,
    Settings,
    LogOut,
  } from "lucide-react";
  import { NavLink } from "react-router-dom";
  
  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: User,
    },
    {
      name: "Resume",
      path: "/student/resume",
      icon: FileText,
    },
    {
      name: "AI Resume Analyzer",
      path: "/student/resume-analyzer",
      icon: Brain,
    },
    {
      name: "Jobs",
      path: "/student/jobs",
      icon: Briefcase,
    },
    {
      name: "Applications",
      path: "/student/applications",
      icon: ClipboardList,
    },
    {
      name: "Interviews",
      path: "/student/interviews",
      icon: CalendarDays,
    },
    {
      name: "Notifications",
      path: "/student/notifications",
      icon: Bell,
    },
    {
      name: "Settings",
      path: "/student/settings",
      icon: Settings,
    },
  ];
  
  function Sidebar() {
    return (
      <aside className="hidden w-72 border-r border-neutral-200 bg-white lg:flex lg:flex-col">
  
        {/* Logo */}
  
        <div className="border-b border-neutral-200 p-6">
  
          <div className="flex items-center gap-4">
  
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-bold text-white">
              CT
            </div>
  
            <div>
              <h1 className="text-lg font-bold text-neutral-900">
                CampusTE
              </h1>
  
              <p className="text-sm text-neutral-500">
                Student Portal
              </p>
            </div>
  
          </div>
  
        </div>
  
        {/* User */}
  
        <div className="border-b border-neutral-200 p-6">
  
          <div className="flex items-center gap-4">
  
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
              RK
            </div>
  
            <div>
              <h2 className="font-semibold text-neutral-900">
                Student Name
              </h2>
  
              <p className="text-sm text-neutral-500">
                Computer Science
              </p>
            </div>
  
          </div>
  
        </div>
  
        {/* Navigation */}
  
        <nav className="flex-1 overflow-y-auto px-4 py-6">
  
          <ul className="space-y-2">
  
            {menuItems.map((item) => {
              const Icon = item.icon;
  
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "text-neutral-600 hover:bg-blue-50 hover:text-blue-600"
                      }`
                    }
                  >
                    <Icon size={20} />
  
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
  
          </ul>
  
        </nav>
  
        {/* Logout */}
  
        <div className="border-t border-neutral-200 p-4">
  
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50">
  
            <LogOut size={20} />
  
            Logout
  
          </button>
  
        </div>
  
      </aside>
    );
  }
  
  export default Sidebar;