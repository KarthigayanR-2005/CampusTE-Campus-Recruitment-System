import {
    X,
    Building2,
    User,
    CalendarDays,
    Clock3,
    MapPin,
    Video,
    IndianRupee,
    ExternalLink,
    FileText,
    ClipboardList,
  } from "lucide-react";
  
  import InterviewTimeline from "./InterviewTimeline";
  
  function InterviewDetailsModal({
    interview,
    onClose,
  }) {
    if (!interview) return null;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
  
        <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
  
          {/* Close */}
  
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-neutral-100"
          >
            <X size={22} />
          </button>
  
          {/* Header */}
  
          <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
  
            <div className="flex items-center gap-3">
  
              <Building2 size={32} />
  
              <div>
  
                <h2 className="text-3xl font-bold">
                  {interview.company}
                </h2>
  
                <p className="mt-2 text-lg text-blue-100">
                  {interview.role}
                </p>
  
              </div>
  
            </div>
  
          </div>
  
          {/* Body */}
  
          <div className="space-y-10 p-8">
  
            {/* Interview Information */}
  
            <section>
  
              <h3 className="mb-6 text-xl font-bold">
                Interview Information
              </h3>
  
              <div className="grid gap-6 md:grid-cols-2">
  
                <div className="flex items-center gap-3">
  
                  <User className="text-blue-600" size={20} />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Interviewer
                    </p>
  
                    <p className="font-semibold">
                      {interview.interviewer}
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
                      Interview Date
                    </p>
  
                    <p className="font-semibold">
                      {interview.date}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <Clock3 className="text-blue-600" size={20} />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Time & Duration
                    </p>
  
                    <p className="font-semibold">
                      {interview.time} • {interview.duration}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <Video className="text-blue-600" size={20} />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Interview Mode
                    </p>
  
                    <p className="font-semibold">
                      {interview.mode}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <MapPin className="text-blue-600" size={20} />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Location
                    </p>
  
                    <p className="font-semibold">
                      {interview.location}
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
                      {interview.salary}
                    </p>
  
                  </div>
  
                </div>
  
              </div>
  
            </section>
  
            {/* Meeting Link */}
  
            {interview.meetingLink && (
              <section>
  
                <h3 className="mb-4 text-xl font-bold">
                  Meeting Link
                </h3>
  
                <a
                  href={interview.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  <ExternalLink size={18} />
                  Join Interview
                </a>
  
              </section>
            )}
  
            {/* Documents */}
  
            <section>
  
              <div className="mb-4 flex items-center gap-2">
  
                <FileText className="text-blue-600" size={22} />
  
                <h3 className="text-xl font-bold">
                  Required Documents
                </h3>
  
              </div>
  
              <ul className="space-y-2">
  
                {interview.documents.map((document, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-neutral-100 px-4 py-3"
                  >
                    {document}
                  </li>
                ))}
  
              </ul>
  
            </section>
  
            {/* Instructions */}
  
            <section>
  
              <div className="mb-4 flex items-center gap-2">
  
                <ClipboardList
                  className="text-blue-600"
                  size={22}
                />
  
                <h3 className="text-xl font-bold">
                  Interview Instructions
                </h3>
  
              </div>
  
              <ul className="space-y-3">
  
                {interview.instructions.map((instruction, index) => (
                  <li
                    key={index}
                    className="rounded-xl bg-blue-50 px-4 py-3 text-neutral-700"
                  >
                    • {instruction}
                  </li>
                ))}
  
              </ul>
  
            </section>
  
            {/* Timeline */}
  
            <InterviewTimeline
              timeline={interview.timeline}
            />
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default InterviewDetailsModal;