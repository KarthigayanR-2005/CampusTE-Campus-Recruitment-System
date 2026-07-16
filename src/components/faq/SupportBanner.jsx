import { Link } from "react-router-dom";

function SupportBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="rounded-3xl border border-white/20 bg-white/10 p-10 backdrop-blur-sm">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            {/* Left */}

            <div>

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                Need More Help?
              </span>

              <h2 className="mt-6 text-4xl font-bold text-white">
                Can't Find
                <br />
                Your Answer?
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100">
                Our support team is always ready to assist students,
                recruiters, placement officers, and universities.
                Reach out anytime and we'll help you as quickly as possible.
              </p>

            </div>

            {/* Right */}

            <div className="grid gap-5">

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                <h3 className="text-lg font-semibold text-white">
                  📧 Email Support
                </h3>

                <p className="mt-2 text-blue-100">
                  support@campuste.ai
                </p>

              </div>

              <div className="rounded-2xl bg-white/10 p-6 backdrop-blur">

                <h3 className="text-lg font-semibold text-white">
                  📞 Phone Support
                </h3>

                <p className="mt-2 text-blue-100">
                  +91 XXXXX XXXXX
                </p>

              </div>

              <div className="mt-4">

                <Link
                  to="/contact"
                  className="inline-flex rounded-xl bg-white px-8 py-4 text-sm font-semibold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  Contact Support
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default SupportBanner;