import { Link } from "react-router-dom";

function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50/40 py-20 sm:py-24 lg:py-32">
      {/* Background Effects */}
      <div
        aria-hidden="true"
        className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-purple-400/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* Left */}

        <div>

          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            Contact CampusTE
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            We'd Love
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              to Hear From You
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-neutral-600">
            Have questions about CampusTE? Need assistance with campus
            recruitment or want to collaborate? Our team is here to help you
            every step of the way.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              to="/features"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-center text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Explore Features
            </Link>

            <a
              href="#contact-form"
              className="rounded-xl border border-neutral-300 bg-white px-8 py-4 text-center text-sm font-semibold text-neutral-700 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:text-purple-700"
            >
              Send Message
            </a>

          </div>

        </div>

        {/* Right */}

        <div className="relative">

          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-2xl">

            <div className="space-y-6">

              <div className="rounded-2xl bg-blue-50 p-6">
                <h3 className="text-lg font-bold text-neutral-900">
                  📧 Email
                </h3>
                <p className="mt-2 text-neutral-600">
                  support@campuste.ai
                </p>
              </div>

              <div className="rounded-2xl bg-purple-50 p-6">
                <h3 className="text-lg font-bold text-neutral-900">
                  📞 Phone
                </h3>
                <p className="mt-2 text-neutral-600">
                  +91 XXXXX XXXXX
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-6">
                <h3 className="text-lg font-bold text-neutral-900">
                  🕒 Working Hours
                </h3>
                <p className="mt-2 text-neutral-600">
                  Monday – Friday
                  <br />
                  9:00 AM – 6:00 PM
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactHero;