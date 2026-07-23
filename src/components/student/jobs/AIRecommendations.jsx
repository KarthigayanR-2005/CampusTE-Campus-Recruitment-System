import {
  ArrowRight,
  Sparkles,
} from "lucide-react";

function AIRecommendations({
  jobs = [],
  student,
}) {
  const averageMatch =
    jobs.length === 0
      ? 0
      : Math.round(
          jobs.reduce(
            (total, job) =>
              total +
              Number(
                job.eligibility
                  ?.matchPercentage || 0
              ),
            0
          ) / jobs.length
        );

  const eligibleCount =
    jobs.filter(
      (job) =>
        job.eligibility?.eligible
    ).length;

  const scrollToJobs = () => {
    document
      .getElementById(
        "student-job-results"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-lg">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">
            <Sparkles size={18} />
            Profile Match Assistant
          </div>

          <h2 className="text-3xl font-bold">
            Eligibility and Match
            Insights
          </h2>

          <p className="mt-4 max-w-2xl text-indigo-100">
            Your profile currently has{" "}
            <strong>
              {student?.skillCount || 0}
            </strong>{" "}
            skills, a CGPA of{" "}
            <strong>
              {student?.cgpa ??
                "not provided"}
            </strong>{" "}
            and graduation year{" "}
            <strong>
              {student?.graduationYear ??
                "not provided"}
            </strong>
            .
          </p>

          <p className="mt-3 text-indigo-100">
            You are academically
            eligible for{" "}
            <strong>
              {eligibleCount}
            </strong>{" "}
            published{" "}
            {eligibleCount === 1
              ? "job"
              : "jobs"}
            .
          </p>
        </div>

        <div className="text-center">
          <div className="text-6xl font-bold">
            {averageMatch}%
          </div>

          <p className="mt-2 text-indigo-100">
            Average profile match
          </p>

          <button
            type="button"
            onClick={scrollToJobs}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:scale-105"
          >
            Explore Matches
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

export default AIRecommendations;