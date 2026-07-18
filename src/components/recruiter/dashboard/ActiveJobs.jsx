import {
    BriefcaseBusiness,
    Users,
    Clock3,
    ArrowRight,
  } from "lucide-react";
  
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      type: "Full Time",
      applicants: 48,
      deadline: "15 Aug 2026",
      status: "Open",
    },
    {
      id: 2,
      title: "Backend Developer",
      type: "Full Time",
      applicants: 37,
      deadline: "20 Aug 2026",
      status: "Open",
    },
    {
      id: 3,
      title: "UI/UX Designer",
      type: "Internship",
      applicants: 22,
      deadline: "28 Aug 2026",
      status: "Closing Soon",
    },
  ];
  
  function ActiveJobs() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Active Job Postings
            </h2>
  
            <p className="mt-1 text-neutral-500">
              Currently accepting applications.
            </p>
          </div>
  
          <BriefcaseBusiness className="text-blue-600" size={28} />
        </div>
  
        <div className="space-y-5">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-xl border border-neutral-200 p-5 transition hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {job.title}
                  </h3>
  
                  <p className="mt-1 text-sm text-neutral-500">
                    {job.type}
                  </p>
                </div>
  
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    job.status === "Open"
                      ? "bg-green-100 text-green-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {job.status}
                </span>
              </div>
  
              <div className="mt-5 flex flex-wrap gap-6 text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Users size={17} />
                  {job.applicants} Applicants
                </div>
  
                <div className="flex items-center gap-2">
                  <Clock3 size={17} />
                  Deadline: {job.deadline}
                </div>
              </div>
  
              <button
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
              >
                View Applicants
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }
  
  export default ActiveJobs;