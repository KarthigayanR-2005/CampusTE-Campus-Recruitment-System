import {
  RotateCcw,
  SearchX,
} from "lucide-react";

function EmptyJobs({
  onReset,
}) {
  return (
    <section className="rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center">
      <SearchX
        size={70}
        className="mx-auto mb-6 text-neutral-400"
      />

      <h2 className="text-2xl font-bold text-neutral-900">
        No Jobs Found
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-neutral-500">
        No published jobs match the
        current search and filters.
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        <RotateCcw size={18} />
        Reset Filters
      </button>
    </section>
  );
}

export default EmptyJobs;