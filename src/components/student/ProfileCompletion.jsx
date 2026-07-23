import {
  ArrowRight,
  CheckCircle2,
  Circle,
} from "lucide-react";

import {
  useNavigate,
} from "react-router-dom";

function ProfileCompletion({
  completion,
}) {
  const navigate = useNavigate();

  const percentage =
    Number(
      completion.percentage
    ) || 0;

  const sections =
    Array.isArray(
      completion.sections
    )
      ? completion.sections
      : [];

  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            Profile Completion
          </h2>

          <p className="mt-1 text-sm text-neutral-600">
            Complete your profile to
            improve future job
            recommendations.
          </p>
        </div>

        <span className="text-3xl font-bold text-blue-600">
          {percentage}%
        </span>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="mt-2 text-xs text-neutral-500">
        {completion.completedSections ||
          0}{" "}
        of{" "}
        {completion.totalSections || 8}{" "}
        sections complete
      </p>

      <div className="mt-7 space-y-4">
        {sections.map((section) => {
          const completed =
            section.status ===
            "completed";

          return (
            <div
              key={section.key}
              className="flex items-center gap-3"
            >
              {completed ? (
                <CheckCircle2
                  size={20}
                  className="shrink-0 text-green-500"
                />
              ) : (
                <Circle
                  size={20}
                  className="shrink-0 text-neutral-400"
                />
              )}

              <span
                className={
                  completed
                    ? "min-w-0 flex-1 font-medium text-neutral-900"
                    : "min-w-0 flex-1 text-neutral-500"
                }
              >
                {section.label}
              </span>

              <span className="text-xs font-semibold text-neutral-500">
                {section.percentage}%
              </span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() =>
          navigate(
            "/student/profile"
          )
        }
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
      >
        Complete Profile

        <ArrowRight size={18} />
      </button>
    </section>
  );
}

export default ProfileCompletion;