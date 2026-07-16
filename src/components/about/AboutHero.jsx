import { Link } from "react-router-dom";

function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50/40 py-20 sm:py-24 lg:py-32">
      {/* Background Blur Effects */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-purple-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Left Content */}

        <div>

          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            About CampusTE
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Building the Future of
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Campus Recruitment
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
            CampusTE is designed to bridge the gap between students,
            universities, recruiters, and placement officers through one
            intelligent platform that simplifies hiring, enhances collaboration,
            and empowers better career opportunities.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/features"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Features
            </Link>

            <Link
              to="/contact"
              className="rounded-xl border border-neutral-300 bg-white px-8 py-4 text-center text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
            >
              Contact Us
            </Link>

          </div>

        </div>

        {/* Right Illustration */}

        <div className="relative">

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">

            <div className="mb-8">

              <h3 className="text-xl font-bold text-neutral-900">
                CampusTE Ecosystem
              </h3>

              <p className="text-sm text-neutral-500">
                Connecting every stakeholder
              </p>

            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-blue-50 p-6 text-center">
                <div className="text-4xl">🎓</div>
                <h4 className="mt-3 font-semibold text-neutral-900">
                  Students
                </h4>
              </div>

              <div className="rounded-2xl bg-purple-50 p-6 text-center">
                <div className="text-4xl">💼</div>
                <h4 className="mt-3 font-semibold text-neutral-900">
                  Recruiters
                </h4>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-6 text-center">
                <div className="text-4xl">🏛️</div>
                <h4 className="mt-3 font-semibold text-neutral-900">
                  Universities
                </h4>
              </div>

              <div className="rounded-2xl bg-cyan-50 p-6 text-center">
                <div className="text-4xl">🤖</div>
                <h4 className="mt-3 font-semibold text-neutral-900">
                  AI Engine
                </h4>
              </div>

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center text-white">

              <h4 className="text-lg font-bold">
                One Unified Platform
              </h4>

              <p className="mt-2 text-sm text-blue-100">
                Smarter Hiring • Better Careers • Stronger Universities
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutHero;