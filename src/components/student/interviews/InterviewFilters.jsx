function InterviewFilters({
    statusFilter,
    setStatusFilter,
    modeFilter,
    setModeFilter,
    roundFilter,
    setRoundFilter,
  }) {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="grid gap-5 md:grid-cols-3">
  
          {/* Status */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Interview Status
            </label>
  
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
              <option value="Missed">Missed</option>
            </select>
  
          </div>
  
          {/* Mode */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Interview Mode
            </label>
  
            <select
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Modes</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
              <option value="Hybrid">Hybrid</option>
            </select>
  
          </div>
  
          {/* Round */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Interview Round
            </label>
  
            <select
              value={roundFilter}
              onChange={(e) => setRoundFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Rounds</option>
              <option value="Technical Interview">
                Technical Interview
              </option>
              <option value="HR Interview">
                HR Interview
              </option>
              <option value="Managerial Interview">
                Managerial Interview
              </option>
            </select>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default InterviewFilters;