import { Bookmark, ArrowRight } from "lucide-react";

function SavedJobs() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Bookmark className="text-blue-600" size={24} />

          <div>

            <h2 className="text-xl font-bold">
              Saved Jobs
            </h2>

            <p className="text-neutral-500">
              You have 12 bookmarked opportunities.
            </p>

          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">

          View All

          <ArrowRight size={18} />

        </button>

      </div>

    </section>
  );
}

export default SavedJobs;