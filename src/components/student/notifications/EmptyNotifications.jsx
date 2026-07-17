import { BellOff, RefreshCcw } from "lucide-react";

function EmptyNotifications() {
  return (
    <section className="rounded-3xl border border-dashed border-neutral-300 bg-white px-8 py-16 text-center shadow-sm">

      {/* Icon */}

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">

        <BellOff
          size={48}
          className="text-blue-600"
        />

      </div>

      {/* Title */}

      <h2 className="mt-8 text-3xl font-bold text-neutral-800">
        No Notifications Found
      </h2>

      {/* Description */}

      <p className="mx-auto mt-4 max-w-2xl text-neutral-500">

        There are no notifications matching your current search
        or filter criteria.

        <br />

        Try changing your filters or search keywords, or check
        back later for new placement updates, interviews, and
        announcements.

      </p>

      {/* Button */}

      <button
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105 hover:shadow-lg"
      >

        <RefreshCcw size={18} />

        Reset Filters

      </button>

    </section>
  );
}

export default EmptyNotifications;