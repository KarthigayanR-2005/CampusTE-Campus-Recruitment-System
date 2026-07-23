import {
  Filter,
  RotateCcw,
} from "lucide-react";

function JobFilters({
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
      <div className="mb-6 flex items-center justify-between gap-4">
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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <select
          value={filters.type}
          onChange={(event) =>
            handleChange(
              "type",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            All employment types
          </option>
          <option value="Full-time">
            Full-time
          </option>
          <option value="Part-time">
            Part-time
          </option>
          <option value="Internship">
            Internship
          </option>
          <option value="Contract">
            Contract
          </option>
          <option value="Graduate Trainee">
            Graduate Trainee
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
          <option value="On-site">
            On-site
          </option>
          <option value="Hybrid">
            Hybrid
          </option>
          <option value="Remote">
            Remote
          </option>
        </select>

        <select
          value={
            filters.experience
          }
          onChange={(event) =>
            handleChange(
              "experience",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            All experience levels
          </option>
          <option value="Fresher">
            Fresher
          </option>
          <option value="0 - 1 Year">
            0 - 1 Year
          </option>
          <option value="1 - 2 Years">
            1 - 2 Years
          </option>
          <option value="2 - 4 Years">
            2 - 4 Years
          </option>
          <option value="4+ Years">
            4+ Years
          </option>
        </select>

        <select
          value={
            filters.eligibility
          }
          onChange={(event) =>
            handleChange(
              "eligibility",
              event.target.value
            )
          }
          className="rounded-xl border border-neutral-300 bg-white p-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        >
          <option value="">
            All eligibility results
          </option>
          <option value="eligible">
            Eligible
          </option>
          <option value="not_eligible">
            Not eligible
          </option>
        </select>
      </div>
    </section>
  );
}

export default JobFilters;