import { CheckCircle2, Circle } from "lucide-react";

function InterviewTimeline({ timeline }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">

      <h3 className="mb-6 text-xl font-semibold text-neutral-800">
        Recruitment Timeline
      </h3>

      <div className="space-y-6">

        {timeline.map((step, index) => (
          <div
            key={index}
            className="relative flex items-start gap-4"
          >
            {/* Vertical Line */}

            {index !== timeline.length - 1 && (
              <div
                className={`absolute left-[15px] top-8 h-10 w-0.5 ${
                  step.completed
                    ? "bg-green-500"
                    : "bg-neutral-300"
                }`}
              />
            )}

            {/* Timeline Icon */}

            <div
              className={`z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                step.completed
                  ? "bg-green-100 text-green-600"
                  : "bg-neutral-100 text-neutral-400"
              }`}
            >
              {step.completed ? (
                <CheckCircle2 size={18} />
              ) : (
                <Circle size={16} />
              )}
            </div>

            {/* Timeline Content */}

            <div>

              <h4 className="font-semibold text-neutral-800">
                {step.stage}
              </h4>

              <p className="mt-1 text-sm text-neutral-500">
                {step.date}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default InterviewTimeline;