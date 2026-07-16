import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

const completion = 85;

const checklist = [
  { title: "Basic Information", completed: true },
  { title: "Resume Uploaded", completed: true },
  { title: "Skills Added", completed: true },
  { title: "Projects Added", completed: true },
  { title: "Certifications", completed: false },
];

function ProfileCompletion() {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-neutral-900">
            Profile Completion
          </h2>

          <p className="mt-1 text-neutral-600">
            Complete your profile to improve job recommendations.
          </p>

        </div>

        <span className="text-3xl font-bold text-blue-600">
          {completion}%
        </span>

      </div>

      {/* Progress Bar */}

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-neutral-200">

        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
          style={{ width: `${completion}%` }}
        />

      </div>

      {/* Checklist */}

      <div className="mt-8 space-y-4">

        {checklist.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3"
          >
            {item.completed ? (
              <CheckCircle2
                size={20}
                className="text-green-500"
              />
            ) : (
              <Circle
                size={20}
                className="text-neutral-400"
              />
            )}

            <span
              className={
                item.completed
                  ? "font-medium text-neutral-900"
                  : "text-neutral-500"
              }
            >
              {item.title}
            </span>
          </div>
        ))}

      </div>

      {/* Button */}

      <button
        className="mt-8 flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-medium text-white transition hover:scale-[1.02]"
      >
        Complete Profile

        <ArrowRight size={18} />
      </button>

    </section>
  );
}

export default ProfileCompletion;