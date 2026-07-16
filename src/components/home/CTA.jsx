import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 py-20 sm:py-24 lg:py-28">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Badge */}
        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-white backdrop-blur-sm">
          Ready to Transform Campus Recruitment?
        </span>

        {/* Heading */}
        <h2 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Start Your CampusTE Journey Today
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-blue-100">
          Join thousands of students, recruiters, and universities already
          modernizing campus placements with AI-powered automation,
          real-time analytics, and intelligent recruitment workflows.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Get Started Free
          </Link>

          <Link
            to="/features"
            className="rounded-xl border border-white/30 bg-white/10 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20"
          >
            Explore Features
          </Link>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div>
            <h3 className="text-3xl font-bold text-white">340+</h3>
            <p className="mt-2 text-sm text-blue-100">Universities</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">25K+</h3>
            <p className="mt-2 text-sm text-blue-100">Students</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">500+</h3>
            <p className="mt-2 text-sm text-blue-100">Recruiters</p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">96%</h3>
            <p className="mt-2 text-sm text-blue-100">Placement Success</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;