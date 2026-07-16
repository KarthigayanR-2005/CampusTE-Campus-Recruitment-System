const testimonials = [
    {
      name: "Priya Sharma",
      role: "Computer Science Student",
      initials: "PS",
      rating: 5,
      review:
        "CampusTE made my placement journey effortless. The AI resume suggestions and application tracking helped me secure my dream internship.",
      gradient: "from-blue-500 to-purple-600",
    },
    {
      name: "Rahul Verma",
      role: "Recruitment Manager • Infosys",
      initials: "RV",
      rating: 5,
      review:
        "Managing campus hiring has never been easier. The platform helped us shortlist quality candidates in minutes instead of days.",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      name: "Dr. Meenakshi Iyer",
      role: "Placement Officer",
      initials: "MI",
      rating: 5,
      review:
        "CampusTE provides complete visibility into placement activities. The analytics dashboard has transformed how we manage drives.",
      gradient: "from-purple-500 to-pink-600",
    },
  ];
  
  function Testimonials() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Testimonials
            </p>
  
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Loved by Students, Recruiters & Universities
            </h2>
  
            <p className="mt-5 text-lg leading-relaxed text-neutral-600">
              Discover how CampusTE is transforming campus recruitment through
              intelligent automation and seamless collaboration.
            </p>
          </div>
  
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.name}
                className="group rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-purple-300 hover:shadow-xl"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${item.gradient} font-bold text-white`}
                  >
                    {item.initials}
                  </div>
  
                  <div>
                    <h3 className="font-semibold text-neutral-900">
                      {item.name}
                    </h3>
  
                    <p className="text-sm text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </div>
  
                <div className="mb-5 flex text-yellow-400">
                  {"★★★★★"}
                </div>
  
                <p className="leading-relaxed text-neutral-600">
                  "{item.review}"
                </p>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  
  export default Testimonials;