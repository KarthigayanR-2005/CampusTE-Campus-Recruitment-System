import { Search, Building2, FileText } from "lucide-react";

function NotificationSearch({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="grid gap-5">

        {/* Search Bar */}

        <div className="relative">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
            size={20}
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, company or message..."
            className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-500"
          />

        </div>

      </div>

      {/* Search Tips */}

      <div className="mt-6 flex flex-wrap gap-3">

        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm text-blue-700">

          <FileText size={16} />

          Notification Title

        </div>

        <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm text-green-700">

          <Building2 size={16} />

          Company

        </div>

        <div className="flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm text-purple-700">

          <Search size={16} />

          Message Content

        </div>

      </div>

    </section>
  );
}

export default NotificationSearch;