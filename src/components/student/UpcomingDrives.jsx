import {
    Building2,
    CalendarDays,
    Clock,
    ArrowRight,
  } from "lucide-react";
  
  const drives = [
    {
      company: "Google",
      role: "Software Engineer Intern",
      date: "25 July 2026",
      deadline: "20 July 2026",
    },
    {
      company: "Microsoft",
      role: "Frontend Developer",
      date: "28 July 2026",
      deadline: "23 July 2026",
    },
    {
      company: "Amazon",
      role: "SDE Intern",
      date: "2 August 2026",
      deadline: "29 July 2026",
    },
  ];
  
  function UpcomingDrives() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="mb-6 flex items-center justify-between">
  
          <div>
  
            <h2 className="text-xl font-bold text-neutral-900">
              Upcoming Placement Drives
            </h2>
  
            <p className="mt-1 text-neutral-600">
              Don't miss your upcoming recruitment opportunities.
            </p>
  
          </div>
  
        </div>
  
        <div className="space-y-5">
  
          {drives.map((drive) => (
            <article
              key={`${drive.company}-${drive.role}`}
              className="rounded-xl border border-neutral-200 p-5 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            >
  
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  
                <div>
  
                  <div className="flex items-center gap-3">
  
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
  
                      <Building2 size={22} />
  
                    </div>
  
                    <div>
  
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {drive.company}
                      </h3>
  
                      <p className="text-neutral-500">
                        {drive.role}
                      </p>
  
                    </div>
  
                  </div>
  
                  <div className="mt-4 flex flex-wrap gap-6 text-sm text-neutral-600">
  
                    <div className="flex items-center gap-2">
  
                      <CalendarDays size={16} />
  
                      Drive: {drive.date}
  
                    </div>
  
                    <div className="flex items-center gap-2">
  
                      <Clock size={16} />
  
                      Apply Before: {drive.deadline}
  
                    </div>
  
                  </div>
  
                </div>
  
                <button
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
                >
  
                  Register
  
                  <ArrowRight size={18} />
  
                </button>
  
              </div>
  
            </article>
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default UpcomingDrives;