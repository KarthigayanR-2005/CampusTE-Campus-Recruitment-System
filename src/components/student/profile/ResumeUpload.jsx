import {
    FileText,
    Upload,
    Eye,
    Download,
    Trash2,
    Sparkles,
  } from "lucide-react";
  
  function ResumeUpload() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
  
        <div className="mb-8">
  
          <h2 className="text-2xl font-bold text-neutral-900">
            Resume
          </h2>
  
          <p className="mt-2 text-neutral-600">
            Upload your latest resume to apply for jobs and internships.
          </p>
  
        </div>
  
        <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-8">
  
          <div className="flex flex-col items-center text-center">
  
            <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
  
              <FileText
                size={40}
                className="text-blue-600"
              />
  
            </div>
  
            <h3 className="text-xl font-semibold text-neutral-900">
              Resume.pdf
            </h3>
  
            <p className="mt-2 text-neutral-500">
              Uploaded on July 17, 2026 • 1.8 MB
            </p>
  
            <div className="mt-8 flex flex-wrap justify-center gap-4">
  
              <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-medium text-white transition hover:scale-[1.02]">
  
                <Upload size={18} />
  
                Replace Resume
  
              </button>
  
              <button className="flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 transition hover:bg-neutral-100">
  
                <Eye size={18} />
  
                Preview
  
              </button>
  
              <button className="flex items-center gap-2 rounded-xl border border-neutral-200 px-6 py-3 transition hover:bg-neutral-100">
  
                <Download size={18} />
  
                Download
  
              </button>
  
              <button className="flex items-center gap-2 rounded-xl border border-red-200 px-6 py-3 text-red-600 transition hover:bg-red-50">
  
                <Trash2 size={18} />
  
                Delete
  
              </button>
  
            </div>
  
          </div>
  
        </div>
  
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
  
          <div className="flex items-start gap-4">
  
            <Sparkles size={30} />
  
            <div>
  
              <h3 className="text-lg font-semibold">
                AI Resume Analysis
              </h3>
  
              <p className="mt-2 text-sm text-indigo-100 leading-relaxed">
                Soon you'll receive an AI-generated resume score, ATS compatibility,
                missing skills, keyword suggestions, grammar improvements,
                and personalized recommendations to improve your chances of
                getting shortlisted.
              </p>
  
              <button className="mt-5 rounded-xl bg-white px-5 py-2 font-medium text-indigo-700 transition hover:bg-neutral-100">
  
                Analyze Resume (Coming Soon)
  
              </button>
  
            </div>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default ResumeUpload;