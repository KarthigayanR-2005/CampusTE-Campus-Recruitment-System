import { Filter, RotateCcw } from "lucide-react";

function JobFilters({
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
      location: "",
      type: "",
      mode: "",
      experience: "",
      category: "",
    });
  };

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

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

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        <select
          value={filters.type}
          onChange={(e) => handleChange("type", e.target.value)}
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">Job Type</option>
          <option>Internship</option>
          <option>Full Time</option>
          <option>Part Time</option>
        </select>

        <select
          value={filters.mode}
          onChange={(e) => handleChange("mode", e.target.value)}
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">Work Mode</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>

        <select
          value={filters.experience}
          onChange={(e) => handleChange("experience", e.target.value)}
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">Experience</option>
          <option>Fresher</option>
          <option>0-2 Years</option>
          <option>2-5 Years</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="rounded-xl border border-neutral-300 p-3"
        >
          <option value="">Category</option>
          <option>Software Development</option>
          <option>Artificial Intelligence</option>
          <option>UI/UX</option>
        </select>

        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => handleChange("location", e.target.value)}
          className="rounded-xl border border-neutral-300 p-3"
        />

      </div>

    </section>
  );
}

export default JobFilters;