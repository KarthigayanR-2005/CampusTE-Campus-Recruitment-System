import ApplicationCard from "./ApplicationCard";

function ApplicationsGrid({
  applications,
  onViewDetails,
}) {
  return (
    <section className="grid gap-6">

      {applications.map((application) => (
        <ApplicationCard
          key={application.id}
          application={application}
          onViewDetails={onViewDetails}
        />
      ))}

    </section>
  );
}

export default ApplicationsGrid;