const cards = [
    {
      title: "Our Mission",
      icon: "🎯",
      gradient: "from-blue-600 to-indigo-600",
      description:
        "To empower students, universities, and recruiters with an AI-driven platform that simplifies campus recruitment, improves transparency, and creates better career opportunities through intelligent automation.",
    },
    {
      title: "Our Vision",
      icon: "🚀",
      gradient: "from-purple-600 to-pink-600",
      description:
        "To become the world's most trusted AI-powered campus recruitment ecosystem, connecting talent with opportunity while transforming the future of education and hiring.",
    },
  ];
  
  function MissionVision() {
    return (
      <section className="bg-gradient-to-b from-slate-50 via-white to-blue-50/30 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Mission & Vision
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Driving Innovation in Campus Recruitment
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Every decision we make is guided by a clear mission and an ambitious
              vision to redefine how students, universities, and recruiters
              connect.
            </p>
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-10 lg:grid-cols-2">
  
            {cards.map((card) => (
  
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Decorative Glow */}
  
                <div
                  aria-hidden="true"
                  className={`absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gradient-to-br ${card.gradient} opacity-10 blur-3xl transition-all duration-300 group-hover:scale-125`}
                />
  
                {/* Icon */}
  
                <div
                  className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} text-4xl shadow-lg`}
                >
                  {card.icon}
                </div>
  
                <h3 className="mt-8 text-3xl font-bold text-neutral-900">
                  {card.title}
                </h3>
  
                <p className="mt-6 text-lg leading-relaxed text-neutral-600">
                  {card.description}
                </p>
  
              </article>
  
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default MissionVision;