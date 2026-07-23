import {
  ArrowRight,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Clock3,
  IndianRupee,
  LockKeyhole,
  MapPin,
  Sparkles,
  XCircle,
} from "lucide-react";

function formatSalary(
  minimum,
  maximum
) {
  const min =
    minimum === "" ||
    minimum === null
      ? null
      : Number(minimum);

  const max =
    maximum === "" ||
    maximum === null
      ? null
      : Number(maximum);

  const formatter =
    new Intl.NumberFormat(
      "en-IN",
      {
        maximumFractionDigits: 0,
      }
    );

  if (
    min !== null &&
    max !== null
  ) {
    return `₹${formatter.format(
      min
    )} - ₹${formatter.format(
      max
    )} per year`;
  }

  if (min !== null) {
    return `From ₹${formatter.format(
      min
    )} per year`;
  }

  if (max !== null) {
    return `Up to ₹${formatter.format(
      max
    )} per year`;
  }

  return "Not disclosed";
}

function getLocation(job) {
  if (job.workMode === "Remote") {
    return `Remote · ${job.country}`;
  }

  return [
    job.city,
    job.country,
  ]
    .filter(Boolean)
    .join(", ");
}

function JobCard({
  job,
  onViewDetails,
}) {
  const eligibility =
    job.eligibility || {};

  const eligible =
    Boolean(
      eligibility.eligible
    );

  const matchPercentage =
    Number(
      eligibility.matchPercentage ||
        0
    );

  const description =
    job.jobDescription?.length >
    240
      ? `${job.jobDescription.slice(
          0,
          240
        )}...`
      : job.jobDescription ||
        "No job description provided.";

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <Building2
              size={32}
              className="text-blue-600"
            />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-neutral-900">
              {job.jobTitle}
            </h2>

            <p className="mt-1 text-neutral-600">
              {job.company
                ?.companyName ||
                "Company"}
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              {job.department}
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled
          title="Saved jobs will be added later"
          className="cursor-not-allowed rounded-lg p-2 text-neutral-300"
        >
          <Bookmark size={22} />
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          {job.employmentType}
        </span>

        <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
          {job.workMode}
        </span>

        <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700">
          Match {matchPercentage}%
        </span>

        <span
          className={
            eligible
              ? "inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700"
              : "inline-flex items-center gap-2 rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700"
          }
        >
          {eligible ? (
            <CheckCircle2
              size={16}
            />
          ) : (
            <XCircle size={16} />
          )}

          {eligible
            ? "Eligible"
            : "Not Eligible"}
        </span>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-2 text-neutral-600">
          <MapPin size={18} />
          {getLocation(job)}
        </div>

        <div className="flex items-center gap-2 text-neutral-600">
          <IndianRupee
            size={18}
          />
          {formatSalary(
            job.salaryMin,
            job.salaryMax
          )}
        </div>

        <div className="flex items-center gap-2 text-neutral-600">
          <Clock3 size={18} />
          {job.experience}
        </div>

        <div className="flex items-center gap-2 text-neutral-600">
          <BriefcaseBusiness
            size={18}
          />
          {job.openings} openings
        </div>
      </div>

      <p className="mt-6 leading-7 text-neutral-600">
        {description}
      </p>

      <div className="mt-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <div className="flex gap-3">
          <Sparkles size={22} />

          <div>
            <h4 className="font-semibold">
              Profile Match
            </h4>

            <p className="mt-1 text-sm text-indigo-100">
              You matched{" "}
              <strong>
                {eligibility
                  .skillMatch
                  ?.matchedCount || 0}
              </strong>{" "}
              of{" "}
              <strong>
                {eligibility
                  .skillMatch
                  ?.requiredCount || 0}
              </strong>{" "}
              required skills.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() =>
            onViewDetails(job)
          }
          className="rounded-xl border border-neutral-300 px-5 py-3 font-medium transition hover:bg-neutral-100"
        >
          View Details
        </button>

        <button
          type="button"
          disabled
          className="flex cursor-not-allowed items-center gap-2 rounded-xl bg-neutral-200 px-6 py-3 font-medium text-neutral-500"
        >
          <LockKeyhole size={18} />

          {eligible
            ? "Applications in Stage 8B"
            : "Not Eligible"}

          <ArrowRight size={18} />
        </button>
      </div>
    </article>
  );
}

export default JobCard;