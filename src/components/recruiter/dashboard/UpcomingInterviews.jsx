import {
    CalendarDays,
    Clock3,
    Video,
    MapPin,
    ArrowRight,
  } from "lucide-react";
  
  const interviews = [
    {
      id: 1,
      candidate: "Karthigayan R",
      role: "Frontend Developer",
      date: "20 Jul 2026",
      time: "10:00 AM",
      mode: "Online",
      status: "Scheduled",
    },
    {
      id: 2,
      candidate: "Priya Sharma",
      role: "UI/UX Designer",
      date: "20 Jul 2026",
      time: "2:30 PM",
      mode: "Offline",
      status: "Confirmed",
    },
    {
      id: 3,
      candidate: "Rahul Verma",
      role: "Backend Developer",
      date: "21 Jul 2026",
      time: "11:00 AM",
      mode: "Online",
      status: "Scheduled",
    },
  ];
  
  function UpcomingInterviews() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Upcoming Interviews
            </h2>
  
            <p className="mt-2 text-neutral-500">
              Your scheduled interviews for the next few days.
            </p>
          </div>
  
          <CalendarDays className="text-purple-600" size={28} />
        </div>
  
        <div className="space-y-5">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="rounded-xl border border-neutral-200 p-5 transition hover:border-purple-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {interview.candidate}
                  </h3>
  
                  <p className="mt-1 text-neutral-500">
                    {interview.role}
                  </p>
  
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-neutral-600">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {interview.date}
                    </div>
  
                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {interview.time}
                    </div>
  
                    <div className="flex items-center gap-2">
                      {interview.mode === "Online" ? (
                        <Video size={16} />
                      ) : (
                        <MapPin size={16} />
                      )}
                      {interview.mode}
                    </div>
                  </div>
                </div>
  
                <div className="flex flex-col items-start gap-3 lg:items-end">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      interview.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {interview.status}
                  </span>
  
                  <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]">
                    Join / View
                    <ArrowRight size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default UpcomingInterviews;