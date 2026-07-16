import JobCard from "./JobCard";

function JobGrid({ jobs, onViewDetails }) {
  return (
    <section className="grid gap-6">

      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onViewDetails={onViewDetails}
        />
      ))}

    </section>
  );
}

export default JobGrid;