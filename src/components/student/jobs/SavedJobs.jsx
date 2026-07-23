import {
  Bookmark,
  LockKeyhole,
} from "lucide-react";

function SavedJobs() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Bookmark
            className="text-blue-600"
            size={24}
          />

          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              Saved Jobs
            </h2>

            <p className="text-neutral-500">
              Job bookmarking will be
              added with the application
              workflow.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-100 px-5 py-3 font-semibold text-neutral-400"
        >
          <LockKeyhole size={17} />
          Coming Soon
        </button>
      </div>
    </section>
  );
}

export default SavedJobs;