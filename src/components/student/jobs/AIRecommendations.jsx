import { Sparkles, ArrowRight } from "lucide-react";

function AIRecommendations() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-lg">

      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">

            <Sparkles size={18} />

            AI Career Assistant

          </div>

          <h2 className="text-3xl font-bold">
            Jobs Recommended Just For You
          </h2>

          <p className="mt-4 max-w-2xl text-indigo-100">
            Based on your skills, resume, certifications and previous
            applications, CampusTE AI has identified high-match opportunities
            from top companies.
          </p>

        </div>

        <div className="text-center">

          <div className="text-6xl font-bold">

            92%

          </div>

          <p className="mt-2 text-indigo-100">
            Average Match Score
          </p>

          <button className="mt-6 flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105">

            Explore Matches

            <ArrowRight size={18} />

          </button>

        </div>

      </div>

    </section>
  );
}

export default AIRecommendations;