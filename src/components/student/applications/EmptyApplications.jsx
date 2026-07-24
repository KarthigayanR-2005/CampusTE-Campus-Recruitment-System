import {
  BriefcaseBusiness,
  RotateCcw,
  SearchX,
} from "lucide-react";

function EmptyApplications({
  hasApplications,
  onReset,
  onBrowseJobs,
}) {
  return (
    <section className="rounded-3xl border border-dashed border-neutral-300 bg-white p-12 text-center shadow-sm">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
        <SearchX
          className="text-blue-600"
          size={40}
        />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-neutral-800">
        {hasApplications
          ? "No Applications Match"
          : "No Applications Yet"}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-neutral-500">
        {hasApplications
          ? "Change the search or filter options to find an application."
          : "Browse published opportunities and submit your first application."}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">
        {hasApplications && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700"
          >
            <RotateCcw
              size={18}
            />
            Reset Filters
          </button>
        )}

        <button
          type="button"
          onClick={onBrowseJobs}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          <BriefcaseBusiness
            size={18}
          />
          Browse Jobs
        </button>
      </div>
    </section>
  );
}

export default EmptyApplications;