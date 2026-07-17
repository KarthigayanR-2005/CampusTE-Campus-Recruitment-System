import { Upload, FileText, CheckCircle2 } from "lucide-react";

function ResumeUpload() {
  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div>

        <h2 className="text-2xl font-bold text-neutral-800">
          Upload Resume
        </h2>

        <p className="mt-2 text-neutral-500">
          Upload your latest resume in PDF format. Recruiters will always
          see the most recently uploaded version.
        </p>

      </div>

      {/* Upload Box */}

      <div className="mt-8 rounded-3xl border-2 border-dashed border-blue-300 bg-blue-50 p-10 text-center transition hover:border-blue-500 hover:bg-blue-100">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow">

          <Upload
            size={36}
            className="text-blue-600"
          />

        </div>

        <h3 className="mt-6 text-xl font-semibold text-neutral-800">
          Drag & Drop Your Resume Here
        </h3>

        <p className="mt-3 text-neutral-500">
          or click the button below to browse files
        </p>

        <label className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105">

          <Upload size={18} />

          Choose PDF

          <input
            type="file"
            accept=".pdf"
            className="hidden"
          />

        </label>

        <p className="mt-5 text-sm text-neutral-500">
          Maximum file size: <strong>5 MB</strong>
        </p>

      </div>

      {/* Supported Format */}

      <div className="mt-8 rounded-2xl bg-neutral-50 p-6">

        <div className="flex items-center gap-4">

          <FileText
            className="text-blue-600"
            size={24}
          />

          <div>

            <h4 className="font-semibold text-neutral-800">
              Supported Format
            </h4>

            <p className="text-sm text-neutral-500">
              PDF (.pdf) only
            </p>

          </div>

        </div>

      </div>

      {/* Tips */}

      <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6">

        <div className="flex items-start gap-4">

          <CheckCircle2
            className="mt-1 text-green-600"
            size={22}
          />

          <div>

            <h4 className="font-semibold text-green-800">
              Resume Tips
            </h4>

            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-green-700">

              <li>Keep your resume to one or two pages.</li>

              <li>Use ATS-friendly formatting.</li>

              <li>Highlight projects and technical skills.</li>

              <li>Include measurable achievements.</li>

              <li>Upload your latest version before applying.</li>

            </ul>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ResumeUpload;