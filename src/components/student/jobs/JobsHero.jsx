import { BriefcaseBusiness, Sparkles } from "lucide-react";

function JobsHero() {
  return (
    <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-10 text-white shadow-lg">

      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        <div>

          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur-sm">

            <Sparkles size={16} />

            AI Powered Job Discovery

          </div>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight lg:text-5xl">
            Discover Your Next Internship or Dream Job
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-blue-100">
            Browse opportunities from top companies, receive personalized AI
            recommendations, and apply with just one click.
          </p>

        </div>

        <div className="flex justify-center">

          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-white/15 backdrop-blur-md">

            <BriefcaseBusiness size={70} />

          </div>

        </div>

      </div>

    </section>
  );
}

export default JobsHero;