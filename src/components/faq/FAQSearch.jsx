function FAQSearch() {
    return (
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
  
          <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg">
  
            <div className="text-center">
  
              <h2 className="text-3xl font-bold text-neutral-900">
                Search the Knowledge Base
              </h2>
  
              <p className="mt-4 text-neutral-600">
                Quickly find answers to your questions about CampusTE,
                recruitment workflows, AI features, and platform support.
              </p>
  
            </div>
  
            <div className="mt-10">
  
              <div className="relative">
  
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  className="w-full rounded-2xl border border-neutral-300 py-4 pl-6 pr-36 text-neutral-700 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
  
                <button
                  className="absolute right-2 top-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2.5 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Search
                </button>
  
              </div>
  
            </div>
  
            <div className="mt-8 flex flex-wrap justify-center gap-3">
  
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                AI Resume
              </span>
  
              <span className="rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-600">
                Placements
              </span>
  
              <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                Recruiters
              </span>
  
              <span className="rounded-full bg-cyan-50 px-4 py-2 text-sm font-medium text-cyan-600">
                Dashboard
              </span>
  
              <span className="rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-600">
                Analytics
              </span>
  
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  
  export default FAQSearch;