import {
    X,
    MapPin,
    CalendarDays,
    User,
    BriefcaseBusiness,
    IndianRupee,
  } from "lucide-react";
  
  import ApplicationTimeline from "./ApplicationTimeline";
  
  function ApplicationDetailsModal({
    application,
    onClose,
  }) {
    if (!application) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
  
        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
  
          {/* Close Button */}
  
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-neutral-100"
          >
            <X size={22} />
          </button>
  
          {/* Header */}
  
          <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
  
            <h2 className="text-3xl font-bold">
              {application.company}
            </h2>
  
            <p className="mt-2 text-lg text-blue-100">
              {application.role}
            </p>
  
          </div>
  
          {/* Body */}
  
          <div className="space-y-10 p-8">
  
            {/* Information */}
  
            <section>
  
              <h3 className="mb-6 text-xl font-bold">
                Application Information
              </h3>
  
              <div className="grid gap-6 md:grid-cols-2">
  
                <div className="flex items-center gap-3">
                  <MapPin className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-neutral-500">
                      Location
                    </p>
                    <p className="font-semibold">
                      {application.location}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-center gap-3">
                  <BriefcaseBusiness
                    className="text-blue-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-neutral-500">
                      Work Mode
                    </p>
                    <p className="font-semibold">
                      {application.mode}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-center gap-3">
                  <CalendarDays
                    className="text-blue-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-neutral-500">
                      Applied Date
                    </p>
                    <p className="font-semibold">
                      {application.appliedDate}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-neutral-500">
                      Recruiter
                    </p>
                    <p className="font-semibold">
                      {application.recruiter}
                    </p>
                  </div>
                </div>
  
                <div className="flex items-center gap-3">
                  <IndianRupee
                    className="text-blue-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-neutral-500">
                      Salary
                    </p>
                    <p className="font-semibold">
                      {application.salary}
                    </p>
                  </div>
                </div>
  
                <div>
                  <p className="mb-2 text-sm text-neutral-500">
                    Current Status
                  </p>
  
                  <span className="rounded-full bg-blue-100 px-4 py-2 font-semibold text-blue-700">
                    {application.status}
                  </span>
  
                </div>
  
              </div>
  
            </section>
  
            {/* Progress */}
  
            <section>
  
              <div className="mb-3 flex items-center justify-between">
  
                <h3 className="text-xl font-bold">
                  Recruitment Progress
                </h3>
  
                <span className="font-bold text-blue-600">
                  {application.progress}%
                </span>
  
              </div>
  
              <div className="h-4 overflow-hidden rounded-full bg-neutral-200">
  
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                  style={{
                    width: `${application.progress}%`,
                  }}
                />
  
              </div>
  
            </section>
  
            {/* Timeline */}
  
            <ApplicationTimeline
              timeline={application.timeline}
            />
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default ApplicationDetailsModal;