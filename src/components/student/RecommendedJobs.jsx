import {
  Briefcase,
  Sparkles,
} from "lucide-react";

function RecommendedJobs() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-neutral-900">
          AI Recommended Jobs
        </h2>

        <p className="mt-1 text-neutral-600">
          Personalized opportunities
          based on your profile.
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 px-6 py-12 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-purple-600">
          <Sparkles size={30} />
        </div>

        <h3 className="mt-5 text-lg font-bold text-neutral-900">
          Recommendations coming soon
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-neutral-600">
          Recommended jobs will appear
          after recruiters publish
          vacancies and the matching
          engine is connected.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-600">
          <Briefcase size={16} />
          No published jobs available
        </div>
      </div>
    </section>
  );
}

export default RecommendedJobs;