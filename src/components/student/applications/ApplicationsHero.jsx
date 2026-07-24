import {
  BriefcaseBusiness,
  Sparkles,
} from "lucide-react";

function ApplicationsHero({
  totalApplications = 0,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 backdrop-blur">
            <BriefcaseBusiness
              size={18}
            />

            Student Recruitment Portal
          </div>

          <h1 className="text-4xl font-bold lg:text-5xl">
            My Applications
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-blue-100">
            Track submitted
            applications, monitor
            recruitment progress, and
            review important updates.
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">
          <div className="flex items-center gap-3">
            <Sparkles
              className="text-yellow-300"
              size={26}
            />

            <div>
              <p className="text-4xl font-bold">
                {totalApplications}
              </p>

              <p className="text-blue-100">
                Total applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ApplicationsHero;