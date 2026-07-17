import {
    MapPin,
    CalendarDays,
    User,
    Eye,
  } from "lucide-react";
  
  function ApplicationCard({
    application,
    onViewDetails,
  }) {
    const getStatusColor = (status) => {
      switch (status) {
        case "Offer Released":
          return "bg-green-100 text-green-700";
  
        case "Rejected":
          return "bg-red-100 text-red-700";
  
        case "Technical Interview":
        case "HR Interview":
          return "bg-blue-100 text-blue-700";
  
        case "Assessment":
          return "bg-yellow-100 text-yellow-700";
  
        case "Resume Shortlisted":
          return "bg-purple-100 text-purple-700";
  
        default:
          return "bg-neutral-100 text-neutral-700";
      }
    };
  
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
  
        {/* Header */}
  
        <div className="flex items-start justify-between">
  
          <div>
  
            <h2 className="text-xl font-bold">
              {application.company}
            </h2>
  
            <p className="mt-1 text-neutral-600">
              {application.role}
            </p>
  
          </div>
  
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${getStatusColor(
              application.status
            )}`}
          >
            {application.status}
          </span>
  
        </div>
  
        {/* Details */}
  
        <div className="mt-6 grid gap-3 md:grid-cols-3">
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <MapPin size={18} />
  
            <span>{application.location}</span>
  
          </div>
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <CalendarDays size={18} />
  
            <span>{application.appliedDate}</span>
  
          </div>
  
          <div className="flex items-center gap-2 text-neutral-600">
  
            <User size={18} />
  
            <span>{application.recruiter}</span>
  
          </div>
  
        </div>
  
        {/* Progress */}
  
        <div className="mt-6">
  
          <div className="mb-2 flex items-center justify-between">
  
            <span className="font-medium text-neutral-700">
              Recruitment Progress
            </span>
  
            <span className="font-semibold text-blue-600">
              {application.progress}%
            </span>
  
          </div>
  
          <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
  
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              style={{
                width: `${application.progress}%`,
              }}
            />
  
          </div>
  
        </div>
  
        {/* Footer */}
  
        <div className="mt-6 flex items-center justify-between">
  
          <div>
  
            <p className="text-sm text-neutral-500">
              Salary
            </p>
  
            <h3 className="font-semibold">
              {application.salary}
            </h3>
  
          </div>
  
          <button
            onClick={() => onViewDetails(application)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-105"
          >
  
            <Eye size={18} />
  
            View Details
  
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default ApplicationCard;