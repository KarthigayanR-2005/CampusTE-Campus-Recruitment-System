import {
    CalendarDays,
    Clock3,
    MapPin,
    User,
    Video,
    Building2,
    ExternalLink,
    Eye,
  } from "lucide-react";
  
  function InterviewCard({ interview, onViewDetails }) {
    const getStatusStyle = (status) => {
      switch (status) {
        case "Upcoming":
          return "bg-blue-100 text-blue-700";
  
        case "Completed":
          return "bg-green-100 text-green-700";
  
        case "Missed":
          return "bg-red-100 text-red-700";
  
        default:
          return "bg-neutral-100 text-neutral-700";
      }
    };
  
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
  
        {/* Header */}
  
        <div className="flex items-start justify-between">
  
          <div>
  
            <div className="flex items-center gap-2 text-blue-600">
  
              <Building2 size={18} />
  
              <span className="font-semibold">
                {interview.company}
              </span>
  
            </div>
  
            <h2 className="mt-2 text-xl font-bold text-neutral-800">
              {interview.role}
            </h2>
  
          </div>
  
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
              interview.status
            )}`}
          >
            {interview.status}
          </span>
  
        </div>
  
        {/* Information */}
  
        <div className="mt-6 space-y-4">
  
          <div className="flex items-center gap-3 text-neutral-600">
  
            <User size={18} />
  
            <span>{interview.interviewer}</span>
  
          </div>
  
          <div className="flex items-center gap-3 text-neutral-600">
  
            <CalendarDays size={18} />
  
            <span>{interview.date}</span>
  
          </div>
  
          <div className="flex items-center gap-3 text-neutral-600">
  
            <Clock3 size={18} />
  
            <span>
              {interview.time} • {interview.duration}
            </span>
  
          </div>
  
          <div className="flex items-center gap-3 text-neutral-600">
  
            <MapPin size={18} />
  
            <span>{interview.location}</span>
  
          </div>
  
          <div className="flex items-center gap-3 text-neutral-600">
  
            <Video size={18} />
  
            <span>{interview.mode}</span>
  
          </div>
  
        </div>
  
        {/* Footer */}
  
        <div className="mt-8 flex items-center justify-between">
  
          {interview.meetingLink ? (
            <a
              href={interview.meetingLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 font-medium text-blue-600 transition hover:text-blue-800"
            >
              <ExternalLink size={18} />
              Join Meeting
            </a>
          ) : (
            <span className="text-sm text-neutral-400">
              No Meeting Link
            </span>
          )}
  
          <button
            onClick={() => onViewDetails(interview)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105"
          >
            <Eye size={18} />
            View Details
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default InterviewCard;