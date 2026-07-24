import {
  Filter,
  RotateCcw,
} from "lucide-react";

function ApplicationFilters({
  filters,
  setFilters,
  onReset,
}) {
  const handleChange = (
    field,
    value
  ) => {
    setFilters(
      (previousFilters) => ({
        ...previousFilters,
        [field]: value,
      })
    );
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Filter
            className="text-blue-600"
            size={22}
          />

          <h2 className="text-xl font-bold text-neutral-900">
            Filters
          </h2>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <select
          value={filters.status}
          onChange={(event) =>
            handleChange(
              "status",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            All statuses
          </option>
          <option value="applied">
            Applied
          </option>
          <option value="under_review">
            Under Review
          </option>
          <option value="shortlisted">
            Shortlisted
          </option>
          <option value="interview">
            Interview
          </option>
          <option value="selected">
            Selected
          </option>
          <option value="rejected">
            Rejected
          </option>
          <option value="withdrawn">
            Withdrawn
          </option>
        </select>

        <select
          value={filters.mode}
          onChange={(event) =>
            handleChange(
              "mode",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            All work modes
          </option>
          <option value="Remote">
            Remote
          </option>
          <option value="Hybrid">
            Hybrid
          </option>
          <option value="On-site">
            On-site
          </option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={filters.location}
          onChange={(event) =>
            handleChange(
              "location",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </section>
  );
}

export default ApplicationFilters;