const milestones = [
    {
      year: "Today",
      title: "Fragmented Placement Process",
      description:
        "Universities, students, and recruiters often rely on disconnected tools, manual processes, and scattered communication.",
    },
    {
      year: "Our Vision",
      title: "Unified AI Platform",
      description:
        "CampusTE combines every stakeholder into one intelligent ecosystem powered by automation and AI-driven insights.",
    },
    {
      year: "Future",
      title: "Smarter Career Ecosystem",
      description:
        "Our goal is to make campus recruitment faster, fairer, and more data-driven while helping students build successful careers.",
    },
  ];
  
  function OurStory() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
  
          {/* Left Side */}
  
          <div>
  
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Our Story
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Why We Built CampusTE
            </h2>
  
            <p className="mt-8 text-lg leading-relaxed text-neutral-600">
              Campus recruitment has evolved rapidly, but many institutions still
              depend on spreadsheets, emails, paperwork, and disconnected systems.
              These outdated workflows make recruitment slower and reduce
              opportunities for students.
            </p>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              CampusTE was created to transform this experience by bringing
              students, recruiters, placement officers, and universities onto a
              single AI-powered platform that simplifies every stage of the
              placement journey.
            </p>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              By combining automation, analytics, and artificial intelligence,
              CampusTE enables smarter decisions, faster hiring, and better career
              opportunities for everyone involved.
            </p>
  
          </div>
  
          {/* Right Side */}
  
          <div className="space-y-8">
  
            {milestones.map((item) => (
  
              <div
                key={item.title}
                className="rounded-3xl border border-neutral-200 bg-gradient-to-r from-white to-blue-50/40 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              >
  
                <span className="inline-flex rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1 text-sm font-semibold text-white">
                  {item.year}
                </span>
  
                <h3 className="mt-5 text-2xl font-bold text-neutral-900">
                  {item.title}
                </h3>
  
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {item.description}
                </p>
  
              </div>
  
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default OurStory;