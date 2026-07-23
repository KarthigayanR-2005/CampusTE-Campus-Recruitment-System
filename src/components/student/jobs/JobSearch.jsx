import {
  Building2,
  MapPin,
  Search,
} from "lucide-react";

function JobSearch({
  search,
  setSearch,
  location,
  setLocation,
  company,
  setCompany,
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Job title, skill or department"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <MapPin
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            value={location}
            onChange={(event) =>
              setLocation(
                event.target.value
              )
            }
            placeholder="City, country or remote"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="relative">
          <Building2
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            value={company}
            onChange={(event) =>
              setCompany(
                event.target.value
              )
            }
            placeholder="Company name"
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>
      </div>
    </section>
  );
}

export default JobSearch;