import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 py-24 sm:py-28">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center">

        {/* Badge */}

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide text-white backdrop-blur">
          🚀 Ready to Modernize Campus Recruitment?
        </span>

        {/* Heading */}

        <h2 className="mt-8 text-4xl font-bold leading-tight text-white sm:text-5xl">
          Transform Your Placement Process
          <span className="block">
            with CampusTE
          </span>
        </h2>

        {/* Description */}

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-blue-100">
          Join universities, recruiters, and thousands of students using
          AI-powered recruitment to simplify hiring, improve placement
          success, and build stronger campus-industry connections.
        </p>

        {/* Buttons */}

        <div className="mt-12 flex flex-col justify-center gap-5 sm:flex-row">

          <Link
            to="/register"
            className="rounded-xl bg-white px-8 py-4 text-base font-semibold text-blue-700 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Get Started Free
          </Link>

          <Link
            to="/contact"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all duration-300 hover:bg-white/20"
          >
            Schedule a Demo
          </Link>

        </div>

        {/* Divider */}

        <div className="mx-auto mt-20 h-px w-full max-w-4xl bg-white/20" />

        {/* Stats */}

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-4">

          <div>
            <h3 className="text-4xl font-bold text-white">500+</h3>
            <p className="mt-2 text-sm text-blue-100">
              Recruiters
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">25K+</h3>
            <p className="mt-2 text-sm text-blue-100">
              Students
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">340+</h3>
            <p className="mt-2 text-sm text-blue-100">
              Universities
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-white">96%</h3>
            <p className="mt-2 text-sm text-blue-100">
              Placement Success
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default CTA;