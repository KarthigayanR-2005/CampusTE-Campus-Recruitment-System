import {
    useEffect,
    useState,
  } from "react";
  
  import {
    AlertCircle,
    BriefcaseBusiness,
    CheckCircle2,
    FileText,
    LoaderCircle,
    Send,
    X,
  } from "lucide-react";
  
  function JobApplicationModal({
    job,
    isSubmitting,
    errorMessage,
    onClose,
    onSubmit,
  }) {
    const [
      coverNote,
      setCoverNote,
    ] = useState("");
  
    useEffect(() => {
      setCoverNote("");
    }, [job?.jobId]);
  
    if (!job) {
      return null;
    }
  
    const handleSubmit = (
      event
    ) => {
      event.preventDefault();
  
      onSubmit({
        coverNote:
          coverNote.trim(),
      });
    };
  
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-neutral-950/60 p-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
        >
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-7 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                  <BriefcaseBusiness
                    size={17}
                  />
  
                  Job Application
                </div>
  
                <h2 className="mt-4 text-3xl font-bold">
                  {job.jobTitle}
                </h2>
  
                <p className="mt-2 text-blue-100">
                  {job.company
                    ?.companyName ||
                    "Company"}
                </p>
              </div>
  
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="rounded-xl bg-white/15 p-2 hover:bg-white/25 disabled:opacity-50"
                aria-label="Close application form"
              >
                <X size={21} />
              </button>
            </div>
          </div>
  
          <div className="space-y-6 p-7">
            <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2
                size={21}
                className="mt-0.5 shrink-0 text-emerald-600"
              />
  
              <div>
                <h3 className="font-bold text-emerald-800">
                  You are eligible
                </h3>
  
                <p className="mt-1 text-sm leading-6 text-emerald-700">
                  Your latest uploaded
                  PDF resume will be
                  linked to this
                  application.
                </p>
              </div>
            </div>
  
            {errorMessage && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 font-semibold text-rose-700"
              >
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />
  
                <span>
                  {errorMessage}
                </span>
              </div>
            )}
  
            <div>
              <label
                htmlFor="coverNote"
                className="mb-2 block text-sm font-semibold text-neutral-700"
              >
                Cover Note
              </label>
  
              <textarea
                id="coverNote"
                value={coverNote}
                onChange={(event) =>
                  setCoverNote(
                    event.target.value
                  )
                }
                disabled={isSubmitting}
                rows={7}
                maxLength={2000}
                placeholder="Briefly explain why you are interested in this opportunity. This field is optional."
                className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100 disabled:bg-neutral-100"
              />
  
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                <span>
                  Optional
                </span>
  
                <span>
                  {coverNote.length}/2000
                </span>
              </div>
            </div>
  
            <div className="flex items-center gap-3 rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600">
              <FileText
                size={19}
                className="text-blue-600"
              />
  
              Your latest uploaded resume
              will be used automatically.
            </div>
          </div>
  
          <div className="flex flex-col-reverse gap-3 border-t border-neutral-200 p-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="rounded-xl border border-neutral-300 px-6 py-3 font-semibold text-neutral-700 hover:bg-neutral-100 disabled:opacity-50"
            >
              Cancel
            </button>
  
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? (
                <LoaderCircle
                  size={19}
                  className="animate-spin"
                />
              ) : (
                <Send size={19} />
              )}
  
              {isSubmitting
                ? "Submitting..."
                : "Submit Application"}
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default JobApplicationModal;