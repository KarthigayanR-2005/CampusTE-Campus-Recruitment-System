import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Who can use CampusTE?",
    answer:
      "CampusTE is designed for students, recruiters, placement officers, and universities to simplify campus recruitment.",
  },
  {
    question: "Does CampusTE use Artificial Intelligence?",
    answer:
      "Yes. CampusTE leverages AI for resume analysis, intelligent candidate recommendations, and recruitment insights.",
  },
  {
    question: "Is CampusTE suitable for all universities?",
    answer:
      "Yes. The platform is scalable and can be customized to fit institutions of different sizes and placement processes.",
  },
  {
    question: "How can I request a demo?",
    answer:
      "Simply contact us through the contact form above or email us directly, and our team will arrange a personalized demonstration.",
  },
];

function FAQPreview() {
  return (
    <section className="bg-gradient-to-b from-blue-50/40 via-white to-white py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-16 text-center">

          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-3xl font-bold text-neutral-900 sm:text-4xl">
            Quick Answers
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
            Here are some of the most common questions about CampusTE.
          </p>

        </div>

        {/* FAQ Cards */}

        <div className="space-y-6">

          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-neutral-900">
                {faq.question}
              </h3>

              <p className="mt-3 leading-relaxed text-neutral-600">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>

        {/* Button */}

        <div className="mt-12 text-center">

          <Link
            to="/faq"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            View All FAQs
          </Link>

        </div>

      </div>
    </section>
  );
}

export default FAQPreview;