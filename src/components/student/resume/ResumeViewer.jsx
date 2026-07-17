import {
    FileText,
    Download,
    Eye,
  } from "lucide-react";
  
  function ResumeViewer({ resume }) {
    return (
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
  
        {/* Header */}
  
        <div className="flex flex-col gap-4 border-b border-neutral-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
  
          <div>
  
            <h2 className="text-2xl font-bold text-neutral-800">
              Resume Preview
            </h2>
  
            <p className="mt-1 text-sm text-neutral-500">
              Preview your uploaded resume before sharing it with recruiters.
            </p>
  
          </div>
  
          <div className="flex gap-3">
  
            <button className="flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2 font-medium transition hover:bg-neutral-100">
  
              <Eye size={18} />
  
              Preview
  
            </button>
  
            <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white transition hover:scale-105">
  
              <Download size={18} />
  
              Download
  
            </button>
  
          </div>
  
        </div>
  
        {/* Resume Preview */}
  
        <div className="flex justify-center bg-neutral-100 p-8">
  
          <div className="w-full max-w-3xl rounded-xl border border-neutral-300 bg-white shadow-lg">
  
            {/* Resume Header */}
  
            <div className="border-b border-neutral-200 p-6">
  
              <div className="flex items-center gap-3">
  
                <FileText
                  className="text-blue-600"
                  size={28}
                />
  
                <div>
  
                  <h3 className="font-bold text-neutral-800">
                    {resume.fileName}
                  </h3>
  
                  <p className="text-sm text-neutral-500">
                    Uploaded on {resume.uploadedOn}
                  </p>
  
                </div>
  
              </div>
  
            </div>
  
            {/* Fake Resume Content */}
  
            <div className="space-y-5 p-8">
  
              <div className="h-8 w-1/2 rounded bg-neutral-300" />
  
              <div className="space-y-3">
  
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 w-5/6 rounded bg-neutral-200" />
  
              </div>
  
              <div className="h-6 w-1/3 rounded bg-neutral-300" />
  
              <div className="space-y-3">
  
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 w-4/5 rounded bg-neutral-200" />
  
              </div>
  
              <div className="h-6 w-1/4 rounded bg-neutral-300" />
  
              <div className="space-y-3">
  
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 rounded bg-neutral-200" />
                <div className="h-4 w-3/4 rounded bg-neutral-200" />
  
              </div>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeViewer;