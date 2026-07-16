import {
    Bell,
    Search,
    Sun,
    ChevronDown,
  } from "lucide-react";
  
  function Topbar() {
    return (
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
  
        <div className="flex h-20 items-center justify-between px-6 lg:px-8">
  
          {/* Left */}
  
          <div className="flex items-center gap-4">
  
            <div className="relative">
  
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />
  
              <input
                type="text"
                placeholder="Search..."
                className="w-72 rounded-xl border border-neutral-300 bg-neutral-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
  
            </div>
  
          </div>
  
          {/* Right */}
  
          <div className="flex items-center gap-4">
  
            {/* Theme Button */}
  
            <button className="rounded-xl border border-neutral-200 p-3 transition hover:bg-neutral-100">
  
              <Sun size={20} />
  
            </button>
  
            {/* Notification */}
  
            <button className="relative rounded-xl border border-neutral-200 p-3 transition hover:bg-neutral-100">
  
              <Bell size={20} />
  
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
  
            </button>
  
            {/* User */}
  
            <button className="flex items-center gap-3 rounded-xl border border-neutral-200 px-3 py-2 transition hover:bg-neutral-100">
  
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 font-semibold text-white">
                RK
              </div>
  
              <div className="hidden text-left md:block">
  
                <p className="text-sm font-semibold text-neutral-900">
                  Student Name
                </p>
  
                <p className="text-xs text-neutral-500">
                  Student
                </p>
  
              </div>
  
              <ChevronDown
                size={18}
                className="text-neutral-500"
              />
  
            </button>
  
          </div>
  
        </div>
  
      </header>
    );
  }
  
  export default Topbar;