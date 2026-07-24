import {
  CalendarDays,
  Eye,
  MapPin,
  User,
} from "lucide-react";

const statusStyles = {
  applied:
    "bg-blue-100 text-blue-700",

  under_review:
    "bg-amber-100 text-amber-700",

  shortlisted:
    "bg-purple-100 text-purple-700",

  interview:
    "bg-cyan-100 text-cyan-700",

  selected:
    "bg-emerald-100 text-emerald-700",

  rejected:
    "bg-rose-100 text-rose-700",

  withdrawn:
    "bg-neutral-100 text-neutral-700",
};

function formatDate(value) {
  if (!value) {
    return "Not available";
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

  return "Not disclosed";
}

function ApplicationCard({
  application,
  onViewDetails,
}) {
  const location =
    application.job
      ?.workMode === "Remote"
      ? `Remote · ${
          application.job
            ?.country || ""
        }`
      : [
          application.job?.city,
          application.job
            ?.country,
        ]
          .filter(Boolean)
          .join(", ");

  return (
    <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-neutral-900">
            {application.company
              ?.companyName ||
              "Company"}
          </h2>

          <p className="mt-1 text-neutral-600">
            {application.job
              ?.jobTitle}
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
            statusStyles[
              application.status
            ] ||
            statusStyles.applied
          }`}
        >
          {application.statusLabel}
        </span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        <div className="flex items-center gap-2 text-neutral-600">
          <MapPin size={18} />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-neutral-600">
          <CalendarDays
            size={18}
          />

          <span>
            Applied{" "}
            {formatDate(
              application.appliedAt
            )}
          </span>
        </div>

        <div className="flex items-center gap-2 text-neutral-600">
          <User size={18} />

          <span>
            {application.company
              ?.recruiterName ||
              "Recruiter"}
          </span>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-neutral-700">
            Recruitment Progress
          </span>

          <span className="font-semibold text-blue-600">
            {application.progress}%
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all"
            style={{
              width: `${application.progress}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500">
            Salary
          </p>

          <h3 className="font-semibold text-neutral-900">
            {formatSalary(
              application.job
                ?.salaryMin,
              application.job
                ?.salaryMax
            )}
          </h3>
        </div>

        <button
          type="button"
          onClick={() =>
            onViewDetails(
              application
            )
          }
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02]"
        >
          <Eye size={18} />
          View Details
        </button>
      </div>
    </article>
  );
}

export default ApplicationCard;