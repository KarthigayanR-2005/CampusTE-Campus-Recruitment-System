import { useState } from "react";

import jobsData from "../../data/jobs";

import JobsHero from "../../components/student/jobs/JobsHero";
import JobSearch from "../../components/student/jobs/JobSearch";
import JobFilters from "../../components/student/jobs/JobFilters";
import AIRecommendations from "../../components/student/jobs/AIRecommendations";
import SavedJobs from "../../components/student/jobs/SavedJobs";
import JobGrid from "../../components/student/jobs/JobGrid";
import JobPagination from "../../components/student/jobs/JobPagination";
import JobDetailsModal from "../../components/student/jobs/JobDetailsModal";
import EmptyJobs from "../../components/student/jobs/EmptyJobs";

function Jobs() {
  // ===============================
  // Search State
  // ===============================

  const [search, setSearch] = useState("");

  // ===============================
  // Filters State
  // ===============================

  const [filters, setFilters] = useState({
    location: "",
    type: "",
    mode: "",
    experience: "",
    category: "",
  });

  // ===============================
  // Selected Job
  // ===============================

  const [selectedJob, setSelectedJob] = useState(null);

  // ===============================
  // Filter Logic
  // ===============================

  const filteredJobs = jobsData.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      filters.location === "" ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesType =
      filters.type === "" ||
      job.type === filters.type;

    const matchesMode =
      filters.mode === "" ||
      job.mode === filters.mode;

    const matchesExperience =
      filters.experience === "" ||
      job.experience === filters.experience;

    const matchesCategory =
      filters.category === "" ||
      job.category === filters.category;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesType &&
      matchesMode &&
      matchesExperience &&
      matchesCategory
    );
  });

  return (
    <div className="space-y-8">

      <JobsHero />

      <JobSearch
        search={search}
        setSearch={setSearch}
      />

      <JobFilters
        filters={filters}
        setFilters={setFilters}
      />

      <AIRecommendations />

      <SavedJobs />

      {filteredJobs.length > 0 ? (
        <JobGrid
          jobs={filteredJobs}
          onViewDetails={setSelectedJob}
        />
      ) : (
        <EmptyJobs />
      )}

      {filteredJobs.length > 0 && (
        <JobPagination />
      )}

      {selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}

    </div>
  );
}

export default Jobs;