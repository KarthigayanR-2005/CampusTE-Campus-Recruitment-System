import { BriefcaseBusiness, Sparkles } from "lucide-react";

function ApplicationsHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">

      {/* Background Decoration */}

      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -bottom-16 left-10 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl"></div>

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        {/* Left Side */}

        <div>

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur">

            <BriefcaseBusiness size={18} />

            <span className="text-sm font-medium">
              Student Recruitment Portal
            </span>

          </div>

          <h1 className="text-4xl font-bold lg:text-5xl">
            My Applications
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">

            Track every application you've submitted, monitor your
            recruitment progress, and stay updated on interviews,
            assessments, and offers — all in one place.

          </p>

        </div>

        {/* Right Side */}

        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

          <div className="flex items-center gap-3">

            <Sparkles
              className="text-yellow-300"
              size={26}
            />

            <div>

              <h3 className="text-xl font-bold">
                Career Progress
              </h3>

              <p className="text-blue-100">

                Stay organized and never miss an important recruitment update.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ApplicationsHero;