import JobCard from "./JobCard";

function JobGrid({
  jobs,
  onViewDetails,
}) {
  return (
    <section className="grid gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.jobId}
          job={job}
          onViewDetails={
            onViewDetails
          }
        />
      ))}
    </section>
  );
}

export default JobGrid;