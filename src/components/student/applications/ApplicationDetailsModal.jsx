import {
  BriefcaseBusiness,
  CalendarDays,
  FileText,
  IndianRupee,
  LoaderCircle,
  MapPin,
  User,
  X,
  XCircle,
} from "lucide-react";

import ApplicationTimeline from "./ApplicationTimeline";

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

  return "Not disclosed";
}

function ApplicationDetailsModal({
  application,
  onClose,
  onWithdraw,
  isLoading,
  isWithdrawing,
}) {
  if (!application) {
    return null;
  }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-20 rounded-full bg-white/15 p-2 text-white hover:bg-white/25"
        >
          <X size={22} />
        </button>

        <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
          <h2 className="pr-12 text-3xl font-bold">
            {application.company
              ?.companyName}
          </h2>

          <p className="mt-2 text-lg text-blue-100">
            {application.job
              ?.jobTitle}
          </p>

          <span
            className={`mt-5 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
              statusStyles[
                application.status
              ] ||
              statusStyles.applied
            }`}
          >
            {application.statusLabel}
          </span>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-3 border-b bg-blue-50 px-6 py-4 font-semibold text-blue-700">
            <LoaderCircle
              size={19}
              className="animate-spin"
            />

            Refreshing application
            details
          </div>
        )}

        <div className="space-y-10 p-8">
          <section>
            <h3 className="mb-6 text-xl font-bold text-neutral-900">
              Application Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <InformationItem
                icon={
                  <MapPin size={20} />
                }
                title="Location"
                value={location}
              />

              <InformationItem
                icon={
                  <BriefcaseBusiness
                    size={20}
                  />
                }
                title="Work Mode"
                value={
                  application.job
                    ?.workMode
                }
              />

              <InformationItem
                icon={
                  <CalendarDays
                    size={20}
                  />
                }
                title="Applied Date"
                value={formatDate(
                  application.appliedAt
                )}
              />

              <InformationItem
                icon={
                  <User size={20} />
                }
                title="Recruiter"
                value={
                  application.company
                    ?.recruiterName ||
                  "Recruiter"
                }
              />

              <InformationItem
                icon={
                  <IndianRupee
                    size={20}
                  />
                }
                title="Salary"
                value={formatSalary(
                  application.job
                    ?.salaryMin,
                  application.job
                    ?.salaryMax
                )}
              />

              <InformationItem
                icon={
                  <FileText
                    size={20}
                  />
                }
                title="Resume"
                value={
                  application.resume
                    ?.fileName
                }
              />
            </div>
          </section>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xl font-bold text-neutral-900">
                Recruitment Progress
              </h3>

              <span className="font-bold text-blue-600">
                {application.progress}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-neutral-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
                style={{
                  width: `${application.progress}%`,
                }}
              />
            </div>
          </section>

          {application.coverNote && (
            <section>
              <h3 className="text-xl font-bold text-neutral-900">
                Cover Note
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-neutral-600">
                {application.coverNote}
              </p>
            </section>
          )}

          <ApplicationTimeline
            timeline={
              application.timeline
            }
          />

          {application.canWithdraw && (
            <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <h3 className="font-bold text-rose-800">
                Withdraw Application
              </h3>

              <p className="mt-2 text-sm leading-6 text-rose-700">
                Withdrawal cannot be
                reversed. You will not
                be able to apply for
                this same job again.
              </p>

              <button
                type="button"
                onClick={() =>
                  onWithdraw(
                    application
                  )
                }
                disabled={
                  isWithdrawing
                }
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {isWithdrawing ? (
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                ) : (
                  <XCircle
                    size={18}
                  />
                )}

                {isWithdrawing
                  ? "Withdrawing..."
                  : "Withdraw Application"}
              </button>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

function InformationItem({
  icon,
  title,
  value,
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-blue-600">
        {icon}
      </div>

      <div>
        <p className="text-sm text-neutral-500">
          {title}
        </p>

        <p className="font-semibold text-neutral-900">
          {value || "Not available"}
        </p>
      </div>
    </div>
  );
}

export default ApplicationDetailsModal;