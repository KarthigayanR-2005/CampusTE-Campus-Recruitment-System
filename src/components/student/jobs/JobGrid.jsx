import JobCard from "./JobCard";

function JobGrid({
  jobs,
  appliedJobIds,
  onViewDetails,
  onApply,
}) {
  return (
    <section className="grid gap-6">
      {jobs.map((job) => (
        <JobCard
          key={job.jobId}
          job={job}
          isApplied={appliedJobIds.includes(
            String(job.jobId)
          )}
          onViewDetails={
            onViewDetails
          }
          onApply={onApply}
        />
      ))}
    </section>
  );
}

export default JobGrid;