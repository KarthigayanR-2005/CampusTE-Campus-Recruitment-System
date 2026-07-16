const values = [
    {
      title: "Innovation",
      icon: "💡",
      description:
        "We continuously embrace AI and modern technologies to improve the campus recruitment experience.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Student Success",
      icon: "🎓",
      description:
        "Every feature is designed to help students build stronger careers and discover better opportunities.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Collaboration",
      icon: "🤝",
      description:
        "We connect students, recruiters, universities, and placement officers on one unified platform.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Transparency",
      icon: "🔍",
      description:
        "Clear communication, real-time updates, and data-driven insights create a fair recruitment process.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      title: "Security",
      icon: "🛡️",
      description:
        "We prioritize privacy and secure handling of student and recruiter information at every stage.",
      gradient: "from-blue-600 to-indigo-600",
    },
    {
      title: "Excellence",
      icon: "⭐",
      description:
        "We strive to deliver a reliable, scalable, and world-class placement ecosystem for everyone.",
      gradient: "from-purple-600 to-indigo-600",
    },
  ];
  
  function CoreValues() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600">
              Our Core Values
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Principles That Guide Everything We Build
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE is built on values that inspire innovation, strengthen
              collaboration, and create meaningful opportunities for students and
              recruiters alike.
            </p>
          </div>
  
          {/* Value Cards */}
  
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
  
            {values.map((value) => (
              <article
                key={value.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {value.icon}
                </div>
  
                <h3 className="mt-6 text-2xl font-bold text-neutral-900">
                  {value.title}
                </h3>
  
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {value.description}
                </p>
              </article>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default CoreValues;