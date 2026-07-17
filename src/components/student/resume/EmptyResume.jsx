import { FileX, Upload } from "lucide-react";

function EmptyResume() {
  return (
    <section className="rounded-3xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center shadow-sm">

      {/* Icon */}

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

        <FileX
          size={48}
          className="text-blue-600"
        />

      </div>

      {/* Title */}

      <h2 className="mt-8 text-3xl font-bold text-neutral-800">
        No Resume Uploaded
      </h2>

      {/* Description */}

      <p className="mx-auto mt-4 max-w-2xl text-neutral-500 leading-7">

        Upload your latest resume to apply for jobs, improve your
        ATS score, receive AI-powered suggestions, and increase
        your chances of getting shortlisted by recruiters.

      </p>

      {/* Upload Button */}

      <button className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg">

        <Upload size={18} />

        Upload Resume

      </button>

      {/* Tips */}

      <div className="mx-auto mt-10 max-w-xl rounded-2xl bg-blue-50 p-6">

        <h3 className="font-semibold text-blue-800">
          Recommended Resume Checklist
        </h3>

        <ul className="mt-4 space-y-2 text-left text-sm text-blue-700">

          <li>✔ Professional Summary</li>

          <li>✔ Technical Skills</li>

          <li>✔ Academic Details</li>

          <li>✔ Projects & Internships</li>

          <li>✔ Certifications</li>

          <li>✔ Achievements</li>

        </ul>

      </div>

    </section>
  );
}

export default EmptyResume;