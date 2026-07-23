import {
  Award,
  Briefcase,
  CheckCircle2,
  FileText,
  FolderGit2,
  Globe,
  GraduationCap,
  LoaderCircle,
  Sparkles,
  User,
} from "lucide-react";

function getInitials(
  fullName
) {
  if (!fullName) {
    return "ST";
  }

  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) =>
      word
        .charAt(0)
        .toUpperCase()
    )
    .join("");
}

function getSectionIcon(
  sectionKey
) {
  switch (sectionKey) {
    case "personalInfo":
      return <User size={18} />;

    case "education":
      return (
        <GraduationCap
          size={18}
        />
      );

    case "socialLinks":
      return <Globe size={18} />;

    case "skills":
      return (
        <CheckCircle2
          size={18}
        />
      );

    case "projects":
      return (
        <FolderGit2
          size={18}
        />
      );

    case "experience":
      return (
        <Briefcase
          size={18}
        />
      );

    case "certifications":
      return <Award size={18} />;

    case "resume":
      return (
        <FileText
          size={18}
        />
      );

    default:
      return <User size={18} />;
  }
}

function getStatusLabel(
  section
) {
  if (
    section.status ===
    "completed"
  ) {
    return "Complete";
  }

  if (
    section.status ===
    "in_progress"
  ) {
    return `${section.percentage}%`;
  }

  return "Not started";
}

function ProfileSidebar({
  profile,
  completion,
  isCompletionLoading,
  completionError,
  onRetryCompletion,
}) {
  const percentage =
    Number(
      completion?.percentage
    ) || 0;

  const completedSections =
    Number(
      completion
        ?.completedSections
    ) || 0;

  const totalSections =
    Number(
      completion?.totalSections
    ) || 8;

  const sections =
    Array.isArray(
      completion?.sections
    )
      ? completion.sections
      : [];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-3xl font-bold text-white">
          {getInitials(
            profile.fullName
          )}
        </div>

        <h2 className="mt-4 text-xl font-bold text-neutral-900">
          {profile.fullName ||
            "Student"}
        </h2>

        <p className="text-sm text-neutral-500">
          {profile.department ||
            profile.degree ||
            "Student Profile"}
        </p>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium text-neutral-800">
            Profile Completion
          </span>

          {isCompletionLoading ? (
            <LoaderCircle
              size={19}
              className="animate-spin text-blue-600"
            />
          ) : (
            <span className="font-bold text-blue-600">
              {percentage}%
            </span>
          )}
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
            style={{
              width:
                `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-2 text-xs text-neutral-500">
          {completedSections} of{" "}
          {totalSections} sections
          complete
        </p>

        {completionError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            <p>
              {completionError}
            </p>

            <button
              type="button"
              onClick={
                onRetryCompletion
              }
              className="mt-2 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-2">
        {sections.map(
          (section) => (
            <SidebarItem
              key={section.key}
              icon={getSectionIcon(
                section.key
              )}
              label={section.label}
              status={section.status}
              statusLabel={getStatusLabel(
                section
              )}
            />
          )
        )}

        <div className="mt-4 border-t border-neutral-200 pt-4">
          <SidebarItem
            icon={
              <Sparkles
                size={18}
              />
            }
            label="AI Score"
            status="coming_soon"
            statusLabel="Soon"
          />
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  status,
  statusLabel,
}) {
  const statusClass =
    status === "completed"
      ? "text-emerald-600"
      : status ===
          "in_progress"
        ? "text-amber-600"
        : status ===
            "coming_soon"
          ? "text-purple-600"
          : "text-neutral-400";

  return (
    <div className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-neutral-100">
      <span className="shrink-0 text-neutral-700">
        {icon}
      </span>

      <span className="min-w-0 flex-1 text-sm font-medium text-neutral-800">
        {label}
      </span>

      <span
        className={`shrink-0 text-xs font-semibold ${statusClass}`}
      >
        {status ===
        "completed" ? (
          <CheckCircle2
            size={18}
          />
        ) : (
          statusLabel
        )}
      </span>
    </div>
  );
}

export default ProfileSidebar;