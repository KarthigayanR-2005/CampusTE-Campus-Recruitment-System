import {
  Award,
  Bell,
  Briefcase,
  CheckCircle2,
  FileText,
  FolderGit2,
  User,
} from "lucide-react";

const activityStyles = {
  profile: {
    icon: User,
    color:
      "bg-blue-100 text-blue-600",
  },

  skill: {
    icon: CheckCircle2,
    color:
      "bg-cyan-100 text-cyan-600",
  },

  project: {
    icon: FolderGit2,
    color:
      "bg-purple-100 text-purple-600",
  },

  experience: {
    icon: Briefcase,
    color:
      "bg-indigo-100 text-indigo-600",
  },

  certification: {
    icon: Award,
    color:
      "bg-emerald-100 text-emerald-600",
  },

  resume: {
    icon: FileText,
    color:
      "bg-amber-100 text-amber-600",
  },
};

function formatActivityTime(
  dateValue
) {
  const activityDate =
    new Date(dateValue);

  if (
    Number.isNaN(
      activityDate.getTime()
    )
  ) {
    return "";
  }

  const difference =
    Date.now() -
    activityDate.getTime();

  const minutes =
    Math.floor(
      difference / 60000
    );

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours =
    Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} ${
      hours === 1 ? "hour" : "hours"
    } ago`;
  }

  const days =
    Math.floor(hours / 24);

  if (days < 7) {
    return `${days} ${
      days === 1 ? "day" : "days"
    } ago`;
  }

  return activityDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

function NotificationFeed({
  activities = [],
}) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-neutral-900">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Your latest profile changes
          and uploads.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="rounded-xl border border-dashed border-neutral-300 px-5 py-9 text-center">
          <Bell
            size={30}
            className="mx-auto text-neutral-400"
          />

          <h3 className="mt-3 font-semibold text-neutral-800">
            No recent activity
          </h3>

          <p className="mt-1 text-sm text-neutral-500">
            Your profile updates will
            appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map(
            (activity) => {
              const style =
                activityStyles[
                  activity.type
                ] || {
                  icon: Bell,
                  color:
                    "bg-neutral-100 text-neutral-600",
                };

              const Icon = style.icon;

              return (
                <div
                  key={
                    activity.activityId
                  }
                  className="flex gap-4 rounded-xl border border-neutral-100 p-4 transition hover:bg-neutral-50"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${style.color}`}
                  >
                    <Icon size={21} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                      <h3 className="font-semibold text-neutral-900">
                        {activity.title}
                      </h3>

                      <span className="shrink-0 text-xs text-neutral-500">
                        {formatActivityTime(
                          activity.occurredAt
                        )}
                      </span>
                    </div>

                    <p className="mt-2 break-words text-sm leading-relaxed text-neutral-600">
                      {
                        activity.description
                      }
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}
    </section>
  );
}

export default NotificationFeed;