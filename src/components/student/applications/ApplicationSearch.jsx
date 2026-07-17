import { Search, Building2, MapPin } from "lucide-react";

function ApplicationSearch({
  search,
  setSearch,
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="grid gap-5 lg:grid-cols-3">

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            placeholder="Search company or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            disabled
            placeholder="Company (Coming Soon)"
            className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-100 py-3 pl-12 pr-4 text-neutral-400"
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
            disabled
            placeholder="Location (Coming Soon)"
            className="w-full cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-100 py-3 pl-12 pr-4 text-neutral-400"
          />

        </div>

      </div>

    </section>
  );
}

export default ApplicationSearch;