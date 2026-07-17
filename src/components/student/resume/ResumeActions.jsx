import {
    Upload,
    Eye,
    Download,
    Trash2,
  } from "lucide-react";
  
  function ResumeActions({ onDelete }) {
    return (
      <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        {/* Header */}
  
        <div>
  
          <h2 className="text-2xl font-bold text-neutral-800">
            Resume Actions
          </h2>
  
          <p className="mt-2 text-neutral-500">
            Quickly manage your resume with the actions below.
          </p>
  
        </div>
  
        {/* Actions Grid */}
  
        <div className="mt-8 grid gap-5 md:grid-cols-2">
  
          {/* Upload */}
  
          <button className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg">
  
            <Upload size={22} />
  
            Upload New Resume
  
          </button>
  
          {/* Preview */}
  
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-neutral-300 bg-white px-6 py-5 font-semibold text-neutral-700 transition hover:bg-neutral-100">
  
            <Eye size={22} />
  
            Preview Resume
  
          </button>
  
          {/* Download */}
  
          <button className="flex items-center justify-center gap-3 rounded-2xl border border-neutral-300 bg-white px-6 py-5 font-semibold text-neutral-700 transition hover:bg-neutral-100">
  
            <Download size={22} />
  
            Download Resume
  
          </button>
  
          {/* Delete */}
  
          <button
            onClick={onDelete}
            className="flex items-center justify-center gap-3 rounded-2xl border border-red-300 bg-red-50 px-6 py-5 font-semibold text-red-600 transition hover:bg-red-100"
          >
  
            <Trash2 size={22} />
  
            Delete Resume
  
          </button>
  
        </div>
  
        {/* Footer Note */}
  
        <div className="mt-8 rounded-2xl bg-blue-50 p-5">
  
          <p className="text-sm leading-6 text-blue-700">
  
            <strong>Tip:</strong> Keep your resume updated before every
            placement drive. Recruiters will always see your latest uploaded
            version.
  
          </p>
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeActions;