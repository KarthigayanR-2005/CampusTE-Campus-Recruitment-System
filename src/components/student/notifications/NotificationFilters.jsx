function NotificationFilters({
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    statusFilter,
    setStatusFilter,
  }) {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="grid gap-5 md:grid-cols-3">
  
          {/* Category */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Category
            </label>
  
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="Interview">Interview</option>
              <option value="Application">Application</option>
              <option value="Placement Drive">Placement Drive</option>
              <option value="Resume">Resume</option>
              <option value="AI Recommendation">AI Recommendation</option>
              <option value="Profile">Profile</option>
              <option value="Assessment">Assessment</option>
              <option value="Offer">Offer</option>
              <option value="System">System</option>
            </select>
  
          </div>
  
          {/* Priority */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Priority
            </label>
  
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
  
          </div>
  
          {/* Status */}
  
          <div>
  
            <label className="mb-2 block text-sm font-medium text-neutral-700">
              Status
            </label>
  
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>
  
          </div>
  
        </div>
  
      </section>
    );
  }
  
  export default NotificationFilters;