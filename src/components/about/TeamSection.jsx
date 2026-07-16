const stakeholders = [
    {
      title: "Students",
      icon: "🎓",
      description:
        "Build professional profiles, discover opportunities, receive AI-powered resume feedback, and track placement progress from one personalized dashboard.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Recruiters",
      icon: "💼",
      description:
        "Discover top talent, automate candidate shortlisting, manage interviews, and make data-driven hiring decisions with ease.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Placement Officers",
      icon: "🏛️",
      description:
        "Coordinate campus drives, monitor student eligibility, generate reports, and streamline placement operations through one centralized platform.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Universities",
      icon: "🏫",
      description:
        "Strengthen industry collaboration, improve placement outcomes, and gain valuable institutional insights through intelligent analytics.",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];
  
  function TeamSection() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
  
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Who We Serve
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Designed for Every Stakeholder
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE connects every participant in the campus recruitment
              ecosystem through one intelligent platform, ensuring a seamless,
              collaborative, and transparent placement experience.
            </p>
  
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
  
            {stakeholders.map((item) => (
  
              <article
                key={item.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
  
                <div
                  className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-4xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
  
                <h3 className="mt-6 text-2xl font-bold text-neutral-900">
                  {item.title}
                </h3>
  
                <p className="mt-5 leading-relaxed text-neutral-600">
                  {item.description}
                </p>
  
              </article>
  
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default TeamSection;