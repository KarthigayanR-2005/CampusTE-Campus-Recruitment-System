import {
    X,
    Building2,
    MapPin,
    IndianRupee,
    Clock3,
    Calendar,
    BriefcaseBusiness,
    Sparkles,
  } from "lucide-react";
  
  function JobDetailsModal({ job, onClose }) {
    if (!job) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
  
        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
  
          {/* Header */}
  
          <div className="flex items-center justify-between border-b p-6">
  
            <div className="flex items-center gap-4">
  
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
  
                <Building2
                  className="text-blue-600"
                  size={32}
                />
  
              </div>
  
              <div>
  
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>
  
                <p className="text-neutral-500">
                  {job.company}
                </p>
  
              </div>
  
            </div>
  
            <button
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-neutral-100"
            >
              <X />
            </button>
  
          </div>
  
          {/* Body */}
  
          <div className="space-y-8 p-8">
  
            {/* Basic Information */}
  
            <div className="grid gap-6 md:grid-cols-2">
  
              <InfoCard
                icon={<MapPin size={20} />}
                title="Location"
                value={job.location}
              />
  
              <InfoCard
                icon={<IndianRupee size={20} />}
                title="Salary"
                value={job.salary}
              />
  
              <InfoCard
                icon={<BriefcaseBusiness size={20} />}
                title="Job Type"
                value={job.type}
              />
  
              <InfoCard
                icon={<Clock3 size={20} />}
                title="Experience"
                value={job.experience}
              />
  
              <InfoCard
                icon={<Calendar size={20} />}
                title="Application Deadline"
                value="30 August 2026"
              />
  
              <InfoCard
                icon={<Building2 size={20} />}
                title="Work Mode"
                value={job.mode}
              />
  
            </div>
  
            {/* Description */}
  
            <section>
  
              <h3 className="mb-3 text-xl font-bold">
                Job Description
              </h3>
  
              <p className="leading-8 text-neutral-600">
                {job.description}
              </p>
  
            </section>
  
            {/* Skills */}
  
            <section>
  
              <h3 className="mb-4 text-xl font-bold">
                Required Skills
              </h3>
  
              <div className="flex flex-wrap gap-3">
  
                <Skill>React</Skill>
                <Skill>Node.js</Skill>
                <Skill>JavaScript</Skill>
                <Skill>Git</Skill>
                <Skill>REST API</Skill>
                <Skill>Problem Solving</Skill>
  
              </div>
  
            </section>
  
            {/* AI Recommendation */}
  
            <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
  
              <div className="flex gap-4">
  
                <Sparkles size={28} />
  
                <div>
  
                  <h3 className="text-xl font-bold">
                    AI Suitability Score
                  </h3>
  
                  <p className="mt-3">
  
                    Based on your profile, you have a
  
                    <span className="font-bold">
                      {" "} {job.match}% Match
                    </span>
  
                    {" "}for this role.
  
                  </p>
  
                  <p className="mt-2 text-blue-100">
  
                    Complete additional certifications to improve your interview chances.
  
                  </p>
  
                </div>
  
              </div>
  
            </section>
  
          </div>
  
          {/* Footer */}
  
          <div className="flex justify-end gap-4 border-t p-6">
  
            <button
              onClick={onClose}
              className="rounded-xl border px-6 py-3 hover:bg-neutral-100"
            >
              Close
            </button>
  
            <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-white hover:opacity-90">
  
              Apply Now
  
            </button>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  function InfoCard({ icon, title, value }) {
    return (
      <div className="flex items-center gap-4 rounded-xl border p-4">
  
        {icon}
  
        <div>
  
          <p className="text-sm text-neutral-500">
            {title}
          </p>
  
          <p className="font-semibold">
            {value}
          </p>
  
        </div>
  
      </div>
    );
  }
  
  function Skill({ children }) {
    return (
      <span className="rounded-full bg-blue-100 px-4 py-2 font-medium text-blue-700">
        {children}
      </span>
    );
  }
  
  export default JobDetailsModal;