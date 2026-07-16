import {
    Briefcase,
    MapPin,
    IndianRupee,
    ArrowRight,
  } from "lucide-react";
  
  const jobs = [
    {
      company: "Google",
      role: "Software Engineer Intern",
      location: "Bangalore",
      package: "₹18 LPA",
      match: "98%",
    },
    {
      company: "Microsoft",
      role: "Frontend Developer",
      location: "Hyderabad",
      package: "₹15 LPA",
      match: "95%",
    },
    {
      company: "Amazon",
      role: "SDE Intern",
      location: "Chennai",
      package: "₹20 LPA",
      match: "93%",
    },
  ];
  
  function RecommendedJobs() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="mb-6 flex items-center justify-between">
  
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              AI Recommended Jobs
            </h2>
  
            <p className="mt-1 text-neutral-600">
              Personalized opportunities based on your profile.
            </p>
          </div>
  
        </div>
  
        <div className="space-y-5">
  
          {jobs.map((job) => (
            <article
              key={`${job.company}-${job.role}`}
              className="rounded-xl border border-neutral-200 p-5 transition-all duration-300 hover:border-blue-300 hover:shadow-md"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
  
                <div>
  
                  <div className="flex items-center gap-3">
  
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      <Briefcase size={22} />
                    </div>
  
                    <div>
  
                      <h3 className="text-lg font-semibold text-neutral-900">
                        {job.role}
                      </h3>
  
                      <p className="text-neutral-500">
                        {job.company}
                      </p>
  
                    </div>
  
                  </div>
  
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-neutral-600">
  
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {job.location}
                    </div>
  
                    <div className="flex items-center gap-2">
                      <IndianRupee size={16} />
                      {job.package}
                    </div>
  
                  </div>
  
                </div>
  
                <div className="flex flex-col items-start gap-4 lg:items-end">
  
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                    {job.match} Match
                  </span>
  
                  <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]">
  
                    View Details
  
                    <ArrowRight size={18} />
  
                  </button>
  
                </div>
  
              </div>
  
            </article>
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default RecommendedJobs;