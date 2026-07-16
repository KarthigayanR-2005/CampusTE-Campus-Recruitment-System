const aiFeatures = [
    {
      title: "AI Resume Analyzer",
      description:
        "Automatically evaluates resumes, identifies missing skills, and provides actionable suggestions to improve ATS compatibility.",
      badge: "Resume AI",
    },
    {
      title: "Smart Candidate Matching",
      description:
        "Matches students with the most suitable jobs based on skills, interests, academic performance, and recruiter requirements.",
      badge: "Matching AI",
    },
    {
      title: "Skill Gap Analysis",
      description:
        "Identifies missing technical and soft skills and recommends personalized learning paths before placement drives.",
      badge: "Skill AI",
    },
    {
      title: "Interview Intelligence",
      description:
        "Analyzes interview performance, provides preparation insights, and recommends areas for improvement.",
      badge: "Interview AI",
    },
    {
      title: "Predictive Analytics",
      description:
        "Forecasts placement trends and student success probabilities using historical recruitment data.",
      badge: "Predictive AI",
    },
    {
      title: "AI Career Recommendations",
      description:
        "Suggests companies, job roles, certifications, and career paths tailored to every student's profile.",
      badge: "Career AI",
    },
  ];
  
  function AIFeatures() {
    return (
      <section className="bg-gradient-to-b from-blue-50/40 via-white to-purple-50/40 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
  
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-600">
              Artificial Intelligence
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              AI That Powers Every Placement Decision
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE uses advanced AI to simplify recruitment,
              improve student outcomes, and help universities make
              smarter placement decisions.
            </p>
  
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
  
            {aiFeatures.map((feature) => (
  
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-2xl"
              >
  
                {/* Gradient Circle */}
  
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-200 opacity-40 blur-2xl transition-all duration-300 group-hover:scale-125"
                />
  
                <span className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-3 py-1 text-xs font-semibold text-white">
                  {feature.badge}
                </span>
  
                <h3 className="mt-6 text-xl font-bold text-neutral-900">
                  {feature.title}
                </h3>
  
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {feature.description}
                </p>
  
                <button
                  className="mt-8 font-semibold text-blue-600 transition-colors duration-300 hover:text-purple-600"
                  type="button"
                >
                  Learn More →
                </button>
  
              </article>
  
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default AIFeatures;