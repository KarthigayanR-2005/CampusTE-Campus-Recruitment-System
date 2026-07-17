import { CalendarX, RefreshCcw } from "lucide-react";

function EmptyInterviews() {
  return (
    <section className="rounded-3xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center shadow-sm">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

        <CalendarX
          size={50}
          className="text-blue-600"
        />

      </div>

      <h2 className="mt-8 text-3xl font-bold text-neutral-800">
        No Interviews Found
      </h2>

      <p className="mx-auto mt-4 max-w-xl text-neutral-500">

        We couldn't find any interviews matching your current
        search or filter criteria.

        <br />

        Try changing your search, selecting different filters,
        or check back later for newly scheduled interviews.

      </p>

      <button
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105"
        onClick={() => window.location.reload()}
      >

        <RefreshCcw size={18} />

        Reset Filters

      </button>

    </section>
  );
}

export default EmptyInterviews;