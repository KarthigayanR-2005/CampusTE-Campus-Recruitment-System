import { Filter, RotateCcw } from "lucide-react";

function ApplicationFilters({
  filters,
  setFilters,
}) {
  const handleChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      mode: "",
      location: "",
    });
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <Filter
            className="text-blue-600"
            size={22}
          />

          <h2 className="text-xl font-bold">
            Filters
          </h2>

        </div>

        <button
          onClick={resetFilters}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >

          <RotateCcw size={16} />

          Reset Filters

        </button>

      </div>

      {/* Filters */}

      <div className="grid gap-5 md:grid-cols-3">

        {/* Status */}

        <select
          value={filters.status}
          onChange={(e) =>
            handleChange("status", e.target.value)
          }
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">All Status</option>
          <option>Applied</option>
          <option>Resume Shortlisted</option>
          <option>Assessment</option>
          <option>Technical Interview</option>
          <option>HR Interview</option>
          <option>Offer Released</option>
          <option>Rejected</option>
        </select>

        {/* Work Mode */}

        <select
          value={filters.mode}
          onChange={(e) =>
            handleChange("mode", e.target.value)
          }
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">All Work Modes</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>

        {/* Location */}

        <input
          type="text"
          placeholder="Filter by Location"
          value={filters.location}
          onChange={(e) =>
            handleChange("location", e.target.value)
          }
          className="rounded-xl border border-neutral-300 p-3"
        />

      </div>

    </section>
  );
}

export default ApplicationFilters;