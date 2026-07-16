import {
    Bookmark,
    BriefcaseBusiness,
    Building2,
    MapPin,
    IndianRupee,
    Clock3,
    Sparkles,
    ArrowRight,
  } from "lucide-react";
  
  function JobCard({ job, onViewDetails }) {
    return (
      <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  
        {/* Header */}
  
        <div className="flex items-start justify-between">
  
          <div className="flex gap-4">
  
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
  
              <Building2
                size={32}
                className="text-blue-600"
              />
  
            </div>
  
            <div>
  
              <h2 className="text-xl font-bold text-neutral-900">
                {job.title}
              </h2>
  
              <p className="mt-1 text-neutral-600">
                {job.company}
              </p>
  
            </div>
  
          </div>
  
          <button className="rounded-lg p-2 transition hover:bg-neutral-100">
  
            <Bookmark size={22} />
  
          </button>
  
        </div>
  
        {/* Tags */}
  
        <div className="mt-6 flex flex-wrap gap-3">
  
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {job.type}
          </span>
  
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {job.mode}
          </span>
  
          <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
            AI Match {job.match}%
          </span>
  
        </div>
  
        {/* Job Info */}
  
        <div className="mt-6 grid gap-4 md:grid-cols-2">
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <MapPin size={18} />
  
            {job.location}
  
          </div>
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <IndianRupee size={18} />
  
            {job.salary}
  
          </div>
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <Clock3 size={18} />
  
            {job.type}
  
          </div>
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <BriefcaseBusiness size={18} />
  
            {job.experience}
  
          </div>
  
        </div>
  
        {/* Description */}
  
        <p className="mt-6 leading-7 text-neutral-600">
          {job.description}
        </p>
  
        {/* AI Recommendation */}
  
        <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
  
          <div className="flex gap-3">
  
            <Sparkles size={22} />
  
            <div>
  
              <h4 className="font-semibold">
                AI Recommendation
              </h4>
  
              <p className="mt-1 text-sm text-indigo-100">
                Your profile has a <strong>{job.match}%</strong> match for this
                opportunity.
              </p>
  
            </div>
  
          </div>
  
        </div>
  
        {/* Footer */}
  
        <div className="mt-8 flex flex-wrap gap-4">
  
          <button
            onClick={() => onViewDetails(job)}
            className="rounded-xl border border-neutral-300 px-5 py-3 font-medium transition hover:bg-neutral-100"
          >
            View Details
          </button>
  
          <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02]">
  
            Apply Now
  
            <ArrowRight size={18} />
  
          </button>
  
        </div>
  
      </article>
    );
  }
  
  export default JobCard;