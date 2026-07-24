import {
  BriefcaseBusiness,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  ExternalLink,
  GraduationCap,
  IndianRupee,
  LoaderCircle,
  LockKeyhole,
  MapPin,
  Send,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";

function formatDate(value) {
  if (!value) {
    return "Not provided";
  }

  const date =
    new Date(
      `${String(value).slice(
        0,
        10
      )}T00:00:00`
    );

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "long",
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

function JobDetailsModal({
  job,
  onClose,
  onApply,
  isLoading,
  isApplied,
}) {
  if (!job) {
    return null;
  }

  const eligibility =
    job.eligibility || {};

  const skillMatch =
    eligibility.skillMatch || {
      matchedCount: 0,
      requiredCount: 0,
      percentage: 0,
      matchedSkills: [],
      missingSkills: [],
    };

  const eligible =
    Boolean(
      eligibility.eligible
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
              <Building2
                className="text-blue-600"
                size={32}
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                {job.jobTitle}
              </h2>

              <p className="text-neutral-500">
                {job.company
                  ?.companyName}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-neutral-100"
          >
            <X />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 border-b bg-blue-50 px-6 py-4 font-semibold text-blue-700">
            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Refreshing job details
          </div>
        )}

        <div className="space-y-8 p-8">
          <section
            className={
              eligible
                ? "rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
                : "rounded-2xl border border-rose-200 bg-rose-50 p-6"
            }
          >
            <div className="flex items-start gap-4">
              {eligible ? (
                <CheckCircle2
                  size={28}
                  className="shrink-0 text-emerald-600"
                />
              ) : (
                <XCircle
                  size={28}
                  className="shrink-0 text-rose-600"
                />
              )}

              <div>
                <h3
                  className={
                    eligible
                      ? "text-xl font-bold text-emerald-800"
                      : "text-xl font-bold text-rose-800"
                  }
                >
                  {eligible
                    ? "You are academically eligible"
                    : "You are currently not eligible"}
                </h3>

                <p className="mt-2 text-neutral-700">
                  Profile match:{" "}
                  <strong>
                    {eligibility.matchPercentage ||
                      0}
                    %
                  </strong>
                </p>
              </div>
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={
                <MapPin size={20} />
              }
              title="Location"
              value={
                job.workMode ===
                "Remote"
                  ? `Remote · ${job.country}`
                  : [
                      job.city,
                      job.country,
                    ]
                      .filter(Boolean)
                      .join(", ")
              }
            />

            <InfoCard
              icon={
                <IndianRupee
                  size={20}
                />
              }
              title="Salary"
              value={formatSalary(
                job.salaryMin,
                job.salaryMax
              )}
            />

            <InfoCard
              icon={
                <BriefcaseBusiness
                  size={20}
                />
              }
              title="Employment Type"
              value={
                job.employmentType
              }
            />

            <InfoCard
              icon={
                <Clock3 size={20} />
              }
              title="Experience"
              value={job.experience}
            />

            <InfoCard
              icon={
                <Calendar size={20} />
              }
              title="Deadline"
              value={formatDate(
                job.applicationDeadline
              )}
            />

            <InfoCard
              icon={
                <GraduationCap
                  size={20}
                />
              }
              title="Minimum CGPA"
              value={
                job.minimumCgpa
              }
            />
          </div>

          <section>
            <h3 className="mb-4 text-xl font-bold text-neutral-900">
              Eligibility Checks
            </h3>

            <div className="space-y-3">
              {(eligibility.checks ||
                []).map((check) => (
                <div
                  key={check.key}
                  className={
                    check.passed
                      ? "flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4"
                      : "flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4"
                  }
                >
                  {check.passed ? (
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                  ) : (
                    <XCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-rose-600"
                    />
                  )}

                  <div>
                    <h4 className="font-semibold text-neutral-900">
                      {check.label}
                    </h4>

                    <p className="mt-1 text-sm text-neutral-600">
                      {check.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex gap-4">
              <Sparkles size={28} />

              <div>
                <h3 className="text-xl font-bold">
                  Skill Match
                </h3>

                <p className="mt-2">
                  You matched{" "}
                  <strong>
                    {skillMatch.matchedCount}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {skillMatch.requiredCount}
                  </strong>{" "}
                  required skills.
                </p>

                <p className="mt-1 text-blue-100">
                  Skill match score:{" "}
                  {skillMatch.percentage}%
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="mb-4 text-xl font-bold text-neutral-900">
              Required Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {(job.requiredSkills ||
                []).map((skill) => {
                const matched =
                  skillMatch.matchedSkills?.some(
                    (
                      matchedSkill
                    ) =>
                      matchedSkill.toLowerCase() ===
                      skill.toLowerCase()
                  );

                return (
                  <span
                    key={skill}
                    className={
                      matched
                        ? "rounded-full bg-emerald-100 px-4 py-2 font-medium text-emerald-700"
                        : "rounded-full bg-rose-100 px-4 py-2 font-medium text-rose-700"
                    }
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </section>

          <TextSection
            title="Job Description"
            content={
              job.jobDescription
            }
          />

          <TextSection
            title="Key Responsibilities"
            content={
              job.responsibilities
            }
          />

          <TextSection
            title="Candidate Requirements"
            content={
              job.requirements
            }
          />

          <section className="rounded-2xl border border-neutral-200 p-6">
            <h3 className="text-xl font-bold text-neutral-900">
              Company Information
            </h3>

            <p className="mt-3 font-semibold text-neutral-800">
              {job.company
                ?.companyName}
            </p>

            <p className="mt-1 text-neutral-600">
              {job.company?.industry}
            </p>

            <p className="mt-1 text-neutral-600">
              {job.company
                ?.headquarters}
            </p>

            {job.company?.website && (
              <a
                href={
                  job.company.website
                }
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-700"
              >
                Visit company website

                <ExternalLink
                  size={16}
                />
              </a>
            )}
          </section>
        </div>

        <div className="sticky bottom-0 flex flex-col justify-end gap-4 border-t bg-white p-6 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-6 py-3 hover:bg-neutral-100"
          >
            Close
          </button>

          {isApplied ? (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-emerald-100 px-6 py-3 font-semibold text-emerald-700"
            >
              <CheckCircle2
                size={18}
              />

              Already Applied
            </button>
          ) : eligible ? (
            <button
              type="button"
              onClick={() =>
                onApply(job)
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white hover:shadow-lg"
            >
              <Send size={18} />
              Apply Now
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-200 px-6 py-3 font-semibold text-neutral-500"
            >
              <LockKeyhole
                size={18}
              />

              Not Eligible
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4">
      <div className="text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-neutral-500">
          {title}
        </p>

        <p className="font-semibold text-neutral-900">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

function TextSection({
  title,
  content,
}) {
  return (
    <section>
      <h3 className="mb-3 text-xl font-bold text-neutral-900">
        {title}
      </h3>

      <p className="whitespace-pre-line leading-8 text-neutral-600">
        {content ||
          "No information provided."}
      </p>
    </section>
  );
}

export default JobDetailsModal;