import { Link } from "react-router-dom";

const highlights = [
  {
    value: "<24 Hrs",
    label: "Average Response Time",
  },
  {
    value: "100%",
    label: "Dedicated Support",
  },
  {
    value: "AI",
    label: "Powered Assistance",
  },
];

function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 py-20 sm:py-24 lg:py-28">
      {/* Background Glow */}

      <div
        aria-hidden="true"
        className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-white/10 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">

        <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
          Let's Build Better Placements Together
        </span>

        <h2 className="mt-8 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Ready to Experience
          <br />
          CampusTE?
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-blue-100">
          Whether you're a university, recruiter, placement officer, or
          student, our team is ready to help you transform campus
          recruitment with AI-powered automation and analytics.
        </p>

        {/* Highlights */}

        <div className="mt-14 grid gap-6 sm:grid-cols-3">

          {highlights.map((item) => (
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

          <a
            href="#contact-form"
            className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Contact Support
          </a>

          <Link
            to="/features"
            className="rounded-xl border border-white/30 bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
          >
            Explore Platform
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;