const contactDetails = [
    {
      title: "Email Us",
      icon: "📧",
      value: "support@campuste.ai",
      description: "Send us your questions anytime. We usually respond within 24 hours.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Call Us",
      icon: "📞",
      value: "+91 XXXXX XXXXX",
      description: "Available Monday to Friday, 9:00 AM – 6:00 PM IST.",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Visit Us",
      icon: "📍",
      value: "Chennai, Tamil Nadu, India",
      description: "Meet our team and discuss your recruitment needs.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Working Hours",
      icon: "🕒",
      value: "Mon – Fri | 9:00 AM – 6:00 PM",
      description: "We're here to support students, recruiters, and universities.",
      gradient: "from-cyan-500 to-blue-600",
    },
  ];
  
  function ContactInfo() {
    return (
      <section className="bg-white py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  
          {/* Heading */}
  
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
              Get in Touch
            </span>
  
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              Multiple Ways to Reach Us
            </h2>
  
            <p className="mt-6 text-lg leading-relaxed text-neutral-600">
              Whether you're a student, recruiter, placement officer, or
              university representative, we're always ready to help.
            </p>
          </div>
  
          {/* Cards */}
  
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
  
            {contactDetails.map((item) => (
              <article
                key={item.title}
                className="group rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl"
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} text-3xl shadow-lg transition-transform duration-300 group-hover:scale-110`}
                >
                  {item.icon}
                </div>
  
                <h3 className="mt-6 text-xl font-bold text-neutral-900">
                  {item.title}
                </h3>
  
                <p className="mt-3 font-semibold text-blue-600">
                  {item.value}
                </p>
  
                <p className="mt-4 leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </article>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default ContactInfo;