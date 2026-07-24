import {
  Search,
} from "lucide-react";

function ApplicationSearch({
  search,
  setSearch,
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="relative">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
          size={20}
        />

        <input
          type="text"
          placeholder="Search company or job title"
          value={search}
          onChange={(event) =>
            setSearch(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </section>
  );
}

export default ApplicationSearch;