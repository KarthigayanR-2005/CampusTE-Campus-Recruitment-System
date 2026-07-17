import {
    History,
    FileText,
    CalendarDays,
    Eye,
    Download,
  } from "lucide-react";
  
  function ResumeHistory({ resume }) {
    return (
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        {/* Header */}
  
        <div className="flex items-center gap-3">
  
          <History
            className="text-blue-600"
            size={28}
          />
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-800">
              Resume History
            </h2>
  
            <p className="text-neutral-500">
              View and manage your previously uploaded resume versions.
            </p>
  
          </div>
  
        </div>
  
        {/* Timeline */}
  
        <div className="mt-8 space-y-6">
  
          {resume.history.map((item, index) => (
  
            <div
              key={item.id}
              className="relative rounded-2xl border border-neutral-200 bg-white p-6 transition hover:shadow-md"
            >
  
              {/* Timeline Line */}
  
              {index !== resume.history.length - 1 && (
                <div className="absolute left-8 top-16 h-12 w-0.5 bg-neutral-200" />
              )}
  
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
  
                {/* Left */}
  
                <div className="flex items-start gap-4">
  
                  <div className="rounded-2xl bg-blue-100 p-3">
  
                    <FileText
                      size={24}
                      className="text-blue-600"
                    />
  
                  </div>
  
                  <div>
  
                    <h3 className="text-lg font-semibold text-neutral-800">
                      {item.name}
                    </h3>
  
                    <div className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
  
                      <CalendarDays size={16} />
  
                      {item.date}
  
                    </div>
  
                  </div>
  
                </div>
  
                {/* Right */}
  
                <div className="flex gap-3">
  
                  <button className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 transition hover:bg-neutral-100">
  
                    <Eye size={18} />
  
                    View
  
                  </button>
  
                  <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white transition hover:scale-105">
  
                    <Download size={18} />
  
                    Download
  
                  </button>
  
                </div>
  
              </div>
  
            </div>
  
          ))}
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeHistory;