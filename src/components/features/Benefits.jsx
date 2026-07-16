const benefits = [
    {
      title: "For Students",
      icon: "🎓",
      items: [
        "AI-powered resume analysis",
        "Personalized job recommendations",
        "Application tracking dashboard",
        "Interview scheduling & reminders",
        "Skill gap analysis with learning suggestions",
      ],
    },
    {
      title: "For Recruiters",
      icon: "💼",
      items: [
        "AI-based candidate shortlisting",
        "Easy job posting and drive management",
        "Interview scheduling",
        "Real-time applicant tracking",
        "Hiring analytics and reports",
      ],
    },
    {
      title: "For Universities",
      icon: "🏛️",
      items: [
        "Placement drive management",
        "Student eligibility monitoring",
        "Placement statistics dashboard",
        "Automated notifications",
        "Comprehensive placement reports",
      ],
    },
  ];
  
  function Benefits() {
    return (
      <section className="bg-gradient-to-b from-white via-blue-50/40 to-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm font-semibold text-purple-600">
              Platform Benefits
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Designed for Everyone in the Placement Ecosystem
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE delivers value to every stakeholder by simplifying
              recruitment workflows, improving collaboration, and leveraging AI
              for smarter decision-making.
            </p>
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-8 lg:grid-cols-3">
  
            {benefits.map((benefit) => (
              <article
                key={benefit.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110">
                  {benefit.icon}
                </div>
  
                <h3 className="mb-6 text-2xl font-bold text-neutral-900">
                  {benefit.title}
                </h3>
  
                <ul className="space-y-4">
                  {benefit.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-neutral-700"
                    >
                      <span className="mt-1 text-green-500">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Benefits;