import {
    CalendarClock,
    CheckCircle2,
    XCircle,
    Award,
  } from "lucide-react";
  
  function InterviewStats({ interviews }) {
    const upcoming = interviews.filter(
      (interview) => interview.status === "Upcoming"
    ).length;
  
    const completed = interviews.filter(
      (interview) => interview.status === "Completed"
    ).length;
  
    const missed = interviews.filter(
      (interview) => interview.status === "Missed"
    ).length;
  
    const offers = interviews.filter((interview) =>
      interview.timeline.some(
        (step) =>
          step.stage === "Offer" && step.completed
      )
    ).length;
  
    const stats = [
      {
        title: "Upcoming",
        value: upcoming,
        icon: CalendarClock,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Completed",
        value: completed,
        icon: CheckCircle2,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "Missed",
        value: missed,
        icon: XCircle,
        color: "bg-red-100 text-red-600",
      },
      {
        title: "Offers",
        value: offers,
        icon: Award,
        color: "bg-yellow-100 text-yellow-600",
      },
    ];
  
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
  
                <div>
  
                  <p className="text-sm text-neutral-500">
                    {stat.title}
                  </p>
  
                  <h2 className="mt-2 text-3xl font-bold text-neutral-800">
                    {stat.value}
                  </h2>
  
                </div>
  
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={28} />
                </div>
  
              </div>
            </div>
          );
        })}
      </section>
    );
  }
  
  export default InterviewStats;