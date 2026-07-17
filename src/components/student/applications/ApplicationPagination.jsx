function ApplicationPagination() {
    return (
      <section className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-6 py-4 shadow-sm">
  
        {/* Left */}
  
        <p className="text-sm text-neutral-500">
          Showing
          <span className="mx-1 font-semibold text-neutral-800">
            1–4
          </span>
          of
          <span className="mx-1 font-semibold text-neutral-800">
            4
          </span>
          applications
        </p>
  
        {/* Right */}
  
        <div className="flex items-center gap-2">
  
          <button
            disabled
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-400 cursor-not-allowed"
          >
            Previous
          </button>
  
          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-semibold text-white">
            1
          </button>
  
          <button
            disabled
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm text-neutral-400 cursor-not-allowed"
          >
            Next
          </button>
  
        </div>
  
      </section>
    );
  }
  
  export default ApplicationPagination;