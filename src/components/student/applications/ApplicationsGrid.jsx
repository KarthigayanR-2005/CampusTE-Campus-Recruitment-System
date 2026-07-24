import ApplicationCard from "./ApplicationCard";

function ApplicationsGrid({
  applications,
  onViewDetails,
}) {
  return (
    <section className="grid gap-6">
      {applications.map(
        (application) => (
          <ApplicationCard
            key={
              application.applicationId
            }
            application={
              application
            }
            onViewDetails={
              onViewDetails
            }
          />
        )
      )}
    </section>
  );
}

export default ApplicationsGrid;