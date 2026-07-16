const categories = [
    {
      title: "Students",
      icon: "🎓",
      description:
        "Resume building, job applications, interview preparation, placements, and profile management.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Recruiters",
      icon: "💼",
      description:
        "Job postings, candidate management, interviews, AI shortlisting, and hiring workflows.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Universities",
      icon: "🏫",
      description:
        "Placement drives, student eligibility, reports, recruiter collaboration, and administration.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "AI Features",
      icon: "🤖",
      description:
        "AI resume analysis, smart recommendations, analytics, automation, and insights.",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      title: "Account & Security",
      icon: "🔒",
      description:
        "Login, password reset, account settings, authentication, and data protection.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      title: "Platform Support",
      icon: "⚙️",
      description:
        "Technical support, troubleshooting, platform updates, and contact information.",
      gradient: "from-orange-500 to-red-500",
    },
  ];
  
  function FAQCategories() {
    return (
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
  
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
              Browse by Category
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Find Answers Faster
            </h2>
  
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              Choose a category below to quickly find answers related to your role
              and platform usage.
            </p>
  
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  
            {categories.map((category) => (
              <article
                key={category.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {category.icon}
                </div>
  
                <h3 className="mt-6 text-xl font-bold text-neutral-900">
                  {category.title}
                </h3>
  
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {category.description}
                </p>
  
              </article>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default FAQCategories;