import { Link } from "react-router-dom";

function FeatureHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50/40 py-20 sm:py-24 lg:py-32">
      {/* Background Blur */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Left Side */}
        <div>

          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            CampusTE Features
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Everything You Need for
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Modern Campus Recruitment
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
            CampusTE combines AI-powered resume analysis, recruiter management,
            placement automation, analytics, and collaboration tools into one
            intelligent platform built for universities and companies.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-neutral-300 bg-white px-8 py-4 text-center text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
            >
              Contact Sales
            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="relative">

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  CampusTE Dashboard
                </h3>

                <p className="text-sm text-neutral-500">
                  AI Recruitment Overview
                </p>

              </div>

              <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                Live
              </div>

            </div>

            <div className="space-y-5">

              <div className="rounded-xl bg-blue-50 p-5">
                <div className="flex justify-between">
                  <span className="font-medium text-neutral-700">
                    AI Resume Score
                  </span>

                  <span className="font-bold text-blue-600">
                    94%
                  </span>
                </div>

                <div className="mt-3 h-2 rounded-full bg-blue-100">
                  <div className="h-2 w-[94%] rounded-full bg-gradient-to-r from-blue-600 to-purple-600"></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-purple-50 p-5">

                  <p className="text-sm text-neutral-500">
                    Applications
                  </p>

                  <h4 className="mt-2 text-3xl font-bold text-purple-600">
                    1,248
                  </h4>

                </div>

                <div className="rounded-xl bg-blue-50 p-5">

                  <p className="text-sm text-neutral-500">
                    Interviews
                  </p>

                  <h4 className="mt-2 text-3xl font-bold text-blue-600">
                    324
                  </h4>

                </div>

              </div>

              <div className="rounded-xl border border-neutral-200 p-5">

                <div className="mb-3 flex items-center justify-between">

                  <span className="font-medium text-neutral-700">
                    Placement Success
                  </span>

                  <span className="font-bold text-green-600">
                    96%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-neutral-200">
                  <div className="h-2 w-[96%] rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default FeatureHero;