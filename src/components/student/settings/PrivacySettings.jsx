import { useState } from "react";
import {
  Shield,
  UserRound,
  FileText,
  MessageCircle,
} from "lucide-react";

function PrivacySettings({ settings }) {
  const [privacy, setPrivacy] = useState(settings.privacy);

  const togglePrivacySetting = (key) => {
    setPrivacy((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  const privacyOptions = [
    {
      key: "profileVisible",
      title: "Profile Visibility",
      description:
        "Allow recruiters and placement officers to view your student profile.",
      icon: UserRound,
    },
    {
      key: "resumeVisible",
      title: "Resume Visibility",
      description:
        "Allow eligible recruiters to access your latest uploaded resume.",
      icon: FileText,
    },
    {
      key: "recruiterContact",
      title: "Allow Recruiter Contact",
      description:
        "Permit recruiters to contact you regarding relevant job opportunities.",
      icon: MessageCircle,
    },
  ];

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-600">
          <Shield size={28} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Privacy Settings
          </h2>

          <p className="mt-2 text-neutral-600">
            Control who can view your profile, resume, and contact details.
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {privacyOptions.map((option) => {
          const Icon = option.icon;

          return (
            <div
              key={option.key}
              className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition hover:border-blue-300 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {option.title}
                  </h3>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">
                    {option.description}
                  </p>

                  <p
                    className={`mt-2 text-xs font-semibold ${
                      privacy[option.key]
                        ? "text-green-600"
                        : "text-neutral-500"
                    }`}
                  >
                    {privacy[option.key] ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => togglePrivacySetting(option.key)}
                aria-pressed={privacy[option.key]}
                aria-label={`Toggle ${option.title}`}
                className={`relative h-7 w-14 shrink-0 rounded-full transition ${
                  privacy[option.key] ? "bg-blue-600" : "bg-neutral-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
                    privacy[option.key] ? "left-8" : "left-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <p className="text-sm leading-6 text-blue-700">
          <strong>Privacy note:</strong> Your email address, phone number, and
          sensitive account information will never be displayed publicly.
          Visibility settings only control access for authorized CampusTE
          users.
        </p>
      </div>
    </section>
  );
}

export default PrivacySettings;