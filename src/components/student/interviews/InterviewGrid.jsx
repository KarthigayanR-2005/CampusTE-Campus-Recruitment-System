import InterviewCard from "./InterviewCard";
import EmptyInterviews from "./EmptyInterviews";

function InterviewGrid({
  interviews,
  onViewDetails,
}) {
  if (interviews.length === 0) {
    return <EmptyInterviews />;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {interviews.map((interview) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onViewDetails={onViewDetails}
        />
      ))}

    </section>
  );
}

export default InterviewGrid;