function FAQHero() {
    return (
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50/40 py-20 sm:py-24 lg:py-32">
  
        {/* Background Blur */}
  
        <div
          aria-hidden="true"
          className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl"
        />
  
        <div
          aria-hidden="true"
          className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-purple-400/20 blur-3xl"
        />
  
        <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
  
          <span className="inline-flex rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            Frequently Asked Questions
          </span>
  
          <h1 className="mt-8 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            How Can
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We Help You?
            </span>
          </h1>
  
          <p className="mx-auto mt-8 max-w-3xl text-lg leading-relaxed text-neutral-600">
            Find answers to the most commonly asked questions about CampusTE,
            recruitment workflows, AI features, student services, recruiter
            tools, and platform support.
          </p>
  
        </div>
  
      </section>
    );
  }
  
  export default FAQHero;