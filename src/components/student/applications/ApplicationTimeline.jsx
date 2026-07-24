import {
  CheckCircle2,
  Circle,
} from "lucide-react";

function formatDate(value) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function ApplicationTimeline({
  timeline = [],
}) {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold text-neutral-800">
        Recruitment Timeline
      </h3>

      <div className="relative">
        {timeline.map(
          (step, index) => (
            <div
              key={`${step.stage}-${index}`}
              className="relative flex items-start gap-4 pb-8 last:pb-0"
            >
              {index !==
                timeline.length - 1 && (
                <div
                  className={`absolute left-[15px] top-8 h-full w-0.5 ${
                    step.completed
                      ? "bg-green-500"
                      : "bg-neutral-300"
                  }`}
                />
              )}

              <div
                className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                  step.completed
                    ? "bg-green-100"
                    : "bg-neutral-100"
                }`}
              >
                {step.completed ? (
                  <CheckCircle2
                    size={18}
                    className="text-green-600"
                  />
                ) : (
                  <Circle
                    size={16}
                    className="text-neutral-500"
                  />
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h4
                    className={`font-semibold ${
                      step.completed
                        ? "text-neutral-900"
                        : "text-neutral-500"
                    }`}
                  >
                    {step.stage}
                  </h4>

                  <span className="text-sm text-neutral-500">
                    {formatDate(
                      step.date
                    )}
                  </span>
                </div>

                {step.current && (
                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    Current stage
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default ApplicationTimeline;