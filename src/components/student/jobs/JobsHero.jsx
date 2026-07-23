import {
  BriefcaseBusiness,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function JobsHero({
  totalJobs = 0,
  eligibleJobs = 0,
}) {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-10 text-white shadow-lg">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">
            <Sparkles size={16} />
            Profile-aware job discovery
          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight lg:text-5xl">
            Discover Your Next
            Opportunity
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-blue-100">
            Browse active jobs published
            by approved recruiters and
            review your eligibility
            before applying.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <BriefcaseBusiness
                size={17}
              />
              {totalJobs} published jobs
            </span>

            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-400/20 px-4 py-2 text-sm font-semibold">
              <CheckCircle2 size={17} />
              {eligibleJobs} eligible
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">
            <BriefcaseBusiness
              size={70}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default JobsHero;