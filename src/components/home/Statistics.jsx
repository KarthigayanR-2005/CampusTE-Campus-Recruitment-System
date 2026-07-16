const stats = [
    {
      value: "340+",
      title: "Universities",
      description: "Connected nationwide",
    },
    {
      value: "25K+",
      title: "Students",
      description: "Actively using CampusTE",
    },
    {
      value: "500+",
      title: "Recruiters",
      description: "Hiring every semester",
    },
    {
      value: "96%",
      title: "Placement Success",
      description: "Average hiring rate",
    },
  ];
  
  function Statistics() {
    return (
      <section className="bg-gradient-to-b from-white to-blue-50/40 py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-semibold text-blue-600">
              Platform Impact
            </span>
  
            <h2 className="mt-5 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Trusted Across Campuses
            </h2>
  
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              CampusTE powers recruitment across universities using AI-driven
              automation, intelligent analytics, and seamless collaboration
              between students, recruiters, and placement officers.
            </p>
          </div>
  
          {/* Stats */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl"
              >
                <h3 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-5xl font-extrabold text-transparent transition-transform duration-300 group-hover:scale-105">
                  {item.value}
                </h3>
  
                <h4 className="mt-5 text-lg font-semibold text-neutral-900">
                  {item.title}
                </h4>
  
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Statistics;