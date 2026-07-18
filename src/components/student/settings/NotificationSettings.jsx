import { useState } from "react";
import {
  Bell,
  Briefcase,
  CalendarClock,
  Mail,
  Smartphone,
  GraduationCap,
} from "lucide-react";

function NotificationSettings({ settings }) {
  const [preferences, setPreferences] = useState(
    settings.notifications
  );

  const togglePreference = (key) => {
    setPreferences((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const notificationOptions = [
    {
      key: "jobAlerts",
      title: "Job Alerts",
      description:
        "Receive notifications about new jobs matching your profile.",
      icon: Briefcase,
    },
    {
      key: "interviewAlerts",
      title: "Interview Alerts",
      description:
        "Get reminders and updates about your scheduled interviews.",
      icon: CalendarClock,
    },
    {
      key: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive important updates directly to your email inbox.",
      icon: Mail,
    },
    {
      key: "pushNotifications",
      title: "Push Notifications",
      description:
        "Receive instant notifications on your mobile device.",
      icon: Smartphone,
    },
    {
      key: "placementUpdates",
      title: "Placement Updates",
      description:
        "Stay informed about placement drives and campus announcements.",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">

          <Bell size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-neutral-900">
            Notification Preferences
          </h2>

          <p className="mt-2 text-neutral-600">
            Choose which notifications you would like to receive.
          </p>

        </div>

      </div>

      {/* Notification Options */}

      <div className="space-y-5">

        {notificationOptions.map((option) => {
          const Icon = option.icon;

          return (
            <div
              key={option.key}
              className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-blue-300 md:flex-row md:items-center md:justify-between"
            >

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">

                  <Icon size={24} />

                </div>

                <div>

                  <h3 className="font-semibold text-neutral-900">
                    {option.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    {option.description}
                  </p>

                </div>

              </div>

              {/* Toggle */}

              <button
                type="button"
                onClick={() => togglePreference(option.key)}
                aria-pressed={preferences[option.key]}
                className={`relative h-7 w-14 rounded-full transition ${
                  preferences[option.key]
                    ? "bg-blue-600"
                    : "bg-neutral-300"
                }`}
              >

                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    preferences[option.key]
                      ? "left-8"
                      : "left-1"
                  }`}
                />

              </button>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default NotificationSettings;