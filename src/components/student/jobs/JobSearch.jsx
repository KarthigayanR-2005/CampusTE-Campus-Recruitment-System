import { Search, MapPin, Building2 } from "lucide-react";

function JobSearch({
  search,
  setSearch,
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="grid gap-5 lg:grid-cols-4">

        {/* Job Search */}

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Job title or company"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Location */}

        <div className="relative">

          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Location"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Company */}

        <div className="relative">

          <Building2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Company"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Search Button */}

        <button
          className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
        >
          Search Jobs
        </button>

      </div>

    </section>
  );
}

export default JobSearch;