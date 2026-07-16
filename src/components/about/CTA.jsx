import { Link } from "react-router-dom";

const stats = [
  {
    value: "4",
    label: "User Portals",
  },
  {
    value: "AI",
    label: "Smart Automation",
  },
  {
    value: "24/7",
    label: "Platform Availability",
  },
];

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 sm:py-24 lg:py-28">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          Ready to Transform Campus Recruitment?
        </span>

        <h2 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Build Smarter Careers
          <br />
          with CampusTE
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-blue-100">
          Join the next generation of intelligent campus recruitment.
          Connect students, recruiters, placement officers, and
          universities through one AI-powered ecosystem designed for
          speed, transparency, and success.
        </p>

        {/* Stats */}

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">

          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
            >
              <h3 className="text-4xl font-bold text-white">
                {item.value}
              </h3>

              <p className="mt-2 text-blue-100">
                {item.label}
              </p>
            </div>
          ))}

        </div>

        {/* Buttons */}

        <div className="mt-14 flex flex-col justify-center gap-5 sm:flex-row">

          <Link
            to="/features"
            className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore Features
          </Link>

          <Link
            to="/contact"
            className="rounded-xl border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Contact Us
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;