import { useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  KeyRound,
  Lock,
  Mail,
  Monitor,
  Moon,
  Palette,
  Save,
  ShieldCheck,
  Smartphone,
  Sun,
  Trash2,
  User,
  Users,
} from "lucide-react";

const tabs = [
  {
    id: "profile",
    label: "Recruiter Profile",
    icon: User,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: Palette,
  },
];

function ToggleSwitch({ enabled, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition ${
        enabled ? "bg-blue-600" : "bg-neutral-300"
      }`}
      role="switch"
      aria-checked={enabled}
      aria-label={label}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    firstName: "Ananya",
    lastName: "Sharma",
    email: "ananya.sharma@technova.com",
    phone: "+91 98765 43210",
    designation: "Senior Talent Acquisition Manager",
    department: "Human Resources",
    company: "TechNova Solutions",
    location: "Bengaluru, Karnataka",
    bio: "Talent acquisition professional focused on campus hiring, technology recruitment and building strong university partnerships.",
  });

  const [notifications, setNotifications] = useState({
    newApplications: true,
    interviewReminders: true,
    candidateUpdates: true,
    jobDeadlines: true,
    weeklyReports: true,
    systemUpdates: false,
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    loginAlerts: true,
  });

  const [preferences, setPreferences] = useState({
    theme: "Light",
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    defaultCandidateView: "Table",
    automaticResumeRanking: true,
    showAiRecommendations: true,
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleSecurityChange = (event) => {
    const { name, value } = event.target;

    setSecurity((previousSecurity) => ({
      ...previousSecurity,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (event) => {
    const { name, value } = event.target;

    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [name]: value,
    }));
  };

  const updateNotification = (name, value) => {
    setNotifications((previousNotifications) => ({
      ...previousNotifications,
      [name]: value,
    }));
  };

  const updatePreference = (name, value) => {
    setPreferences((previousPreferences) => ({
      ...previousPreferences,
      [name]: value,
    }));
  };

  const handleProfileSave = (event) => {
    event.preventDefault();

    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.email.trim()
    ) {
      showMessage("Complete all required profile fields.");
      return;
    }

    showMessage("Recruiter profile updated successfully.");
  };

  const handleNotificationSave = () => {
    showMessage("Notification preferences saved successfully.");
  };

  const handlePasswordUpdate = (event) => {
    event.preventDefault();

    if (
      !security.currentPassword ||
      !security.newPassword ||
      !security.confirmPassword
    ) {
      showMessage("Complete all password fields.");
      return;
    }

    if (security.newPassword.length < 8) {
      showMessage("New password must contain at least 8 characters.");
      return;
    }

    if (security.newPassword !== security.confirmPassword) {
      showMessage("New password and confirmation do not match.");
      return;
    }

    setSecurity((previousSecurity) => ({
      ...previousSecurity,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));

    showMessage("Password updated successfully.");
  };

  const handlePreferencesSave = () => {
    showMessage("Portal preferences saved successfully.");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to request account deletion? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    showMessage(
      "Account deletion request submitted. Administrator approval is required."
    );
  };

  const notificationItems = [
    {
      name: "newApplications",
      title: "New Applications",
      description:
        "Receive an alert whenever a candidate applies for a job.",
      icon: Users,
    },
    {
      name: "interviewReminders",
      title: "Interview Reminders",
      description:
        "Receive reminders before scheduled candidate interviews.",
      icon: Bell,
    },
    {
      name: "candidateUpdates",
      title: "Candidate Updates",
      description:
        "Get notified when candidates update profiles or resumes.",
      icon: User,
    },
    {
      name: "jobDeadlines",
      title: "Job Deadline Alerts",
      description:
        "Receive alerts when active job openings are about to close.",
      icon: Building2,
    },
    {
      name: "weeklyReports",
      title: "Weekly Recruitment Report",
      description:
        "Receive weekly applicant, interview and hiring analytics.",
      icon: Mail,
    },
    {
      name: "systemUpdates",
      title: "Platform Updates",
      description:
        "Receive notifications about new features and maintenance.",
      icon: Globe,
    },
  ];

  const deliveryChannels = [
    {
      name: "emailNotifications",
      title: "Email Notifications",
      description: "Receive recruitment notifications through email.",
      icon: Mail,
    },
    {
      name: "pushNotifications",
      title: "Push Notifications",
      description: "Receive notifications inside the CampusTE portal.",
      icon: Bell,
    },
    {
      name: "smsNotifications",
      title: "SMS Notifications",
      description: "Receive urgent interview and hiring alerts by SMS.",
      icon: Smartphone,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <ShieldCheck size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Account Management
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Recruiter Settings
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage your recruiter profile, account security,
                notifications and portal preferences.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={21} className="text-emerald-300" />

                <div>
                  <p className="text-sm text-blue-100">
                    Account Status
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Verified Recruiter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}
      </section>

      <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm xl:sticky xl:top-6">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Icon size={19} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck size={20} className="text-blue-700" />

              <p className="font-bold text-blue-900">
                Secure Account
              </p>
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-700">
              Your recruiter account and company profile are verified.
            </p>
          </div>
        </aside>

        <main>
          {activeTab === "profile" && (
            <form
              onSubmit={handleProfileSave}
              className="space-y-8"
            >
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl font-bold text-white shadow-lg">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Recruiter Profile
                    </h2>

                    <p className="mt-2 text-neutral-600">
                      Update your personal and professional information.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          showMessage(
                            "Profile image upload will be connected with backend storage."
                          )
                        }
                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Change Photo
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          showMessage("Profile image removed.")
                        }
                        className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-neutral-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Personal Information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-600">
                    This information appears on your recruiter profile.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      First Name
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Smartphone
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type="text"
                        name="phone"
                        value={profile.phone}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Designation
                    </label>

                    <input
                      type="text"
                      name="designation"
                      value={profile.designation}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Department
                    </label>

                    <input
                      type="text"
                      name="department"
                      value={profile.department}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Company
                    </label>

                    <div className="relative">
                      <Building2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type="text"
                        name="company"
                        value={profile.company}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Location
                    </label>

                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Professional Bio
                    </label>

                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleProfileChange}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Profile
                  </button>
                </div>
              </section>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-8">
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Recruitment Notifications
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Choose which recruitment events should notify you.
                  </p>
                </div>

                <div className="mt-8 divide-y divide-neutral-100">
                  {notificationItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-5 py-5 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <Icon size={20} />
                          </div>

                          <div>
                            <h3 className="font-bold text-neutral-900">
                              {item.title}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-neutral-600">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        <ToggleSwitch
                          enabled={notifications[item.name]}
                          onChange={(value) =>
                            updateNotification(item.name, value)
                          }
                          label={item.title}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Delivery Channels
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Select how you want to receive notifications.
                  </p>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-3">
                  {deliveryChannels.map((channel) => {
                    const Icon = channel.icon;
                    const enabled = notifications[channel.name];

                    return (
                      <article
                        key={channel.name}
                        className={`rounded-2xl border p-5 transition ${
                          enabled
                            ? "border-blue-300 bg-blue-50"
                            : "border-neutral-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                              enabled
                                ? "bg-blue-600 text-white"
                                : "bg-neutral-100 text-neutral-600"
                            }`}
                          >
                            <Icon size={20} />
                          </div>

                          <ToggleSwitch
                            enabled={enabled}
                            onChange={(value) =>
                              updateNotification(
                                channel.name,
                                value
                              )
                            }
                            label={channel.title}
                          />
                        </div>

                        <h3 className="mt-5 font-bold text-neutral-900">
                          {channel.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-neutral-600">
                          {channel.description}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNotificationSave}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Notifications
                  </button>
                </div>
              </section>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8">
              <form
                onSubmit={handlePasswordUpdate}
                className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <KeyRound size={21} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Change Password
                    </h2>

                    <p className="mt-2 text-neutral-600">
                      Use a strong password that you do not use elsewhere.
                    </p>
                  </div>
                </div>

                <div className="mt-8 max-w-2xl space-y-6">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Current Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type={
                          showPasswords.current
                            ? "text"
                            : "password"
                        }
                        name="currentPassword"
                        value={security.currentPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((previousState) => ({
                            ...previousState,
                            current: !previousState.current,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        aria-label="Toggle current password"
                      >
                        {showPasswords.current ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      New Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type={
                          showPasswords.new ? "text" : "password"
                        }
                        name="newPassword"
                        value={security.newPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((previousState) => ({
                            ...previousState,
                            new: !previousState.new,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        aria-label="Toggle new password"
                      >
                        {showPasswords.new ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Confirm New Password
                    </label>

                    <div className="relative">
                      <Lock
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type={
                          showPasswords.confirm
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={security.confirmPassword}
                        onChange={handleSecurityChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((previousState) => ({
                            ...previousState,
                            confirm: !previousState.confirm,
                          }))
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                        aria-label="Toggle password confirmation"
                      >
                        {showPasswords.confirm ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    <KeyRound size={18} />
                    Update Password
                  </button>
                </div>
              </form>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Account Protection
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Add additional protection to your recruiter account.
                  </p>
                </div>

                <div className="mt-8 divide-y divide-neutral-100">
                  <div className="flex items-start justify-between gap-5 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <Smartphone size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900">
                          Two-Factor Authentication
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-neutral-600">
                          Require an additional verification code when
                          signing in.
                        </p>
                      </div>
                    </div>

                    <ToggleSwitch
                      enabled={security.twoFactorEnabled}
                      onChange={(value) =>
                        setSecurity((previousSecurity) => ({
                          ...previousSecurity,
                          twoFactorEnabled: value,
                        }))
                      }
                      label="Two-factor authentication"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-5 pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                        <Bell size={20} />
                      </div>

                      <div>
                        <h3 className="font-bold text-neutral-900">
                          Login Alerts
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-neutral-600">
                          Receive an email whenever a new device signs
                          into your account.
                        </p>
                      </div>
                    </div>

                    <ToggleSwitch
                      enabled={security.loginAlerts}
                      onChange={(value) =>
                        setSecurity((previousSecurity) => ({
                          ...previousSecurity,
                          loginAlerts: value,
                        }))
                      }
                      label="Login alerts"
                    />
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 size={21} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-rose-900">
                      Delete Account
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-700">
                      Deleting your recruiter account removes access to
                      jobs, candidates, interviews and company hiring
                      data.
                    </p>

                    <button
                      type="button"
                      onClick={handleDeleteAccount}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
                    >
                      <Trash2 size={18} />
                      Request Account Deletion
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="space-y-8">
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Appearance
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Choose how the recruiter portal should appear.
                  </p>
                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-3">
                  {[
                    {
                      name: "Light",
                      icon: Sun,
                    },
                    {
                      name: "Dark",
                      icon: Moon,
                    },
                    {
                      name: "System",
                      icon: Monitor,
                    },
                  ].map((theme) => {
                    const Icon = theme.icon;
                    const selected =
                      preferences.theme === theme.name;

                    return (
                      <button
                        key={theme.name}
                        type="button"
                        onClick={() =>
                          updatePreference("theme", theme.name)
                        }
                        className={`rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-blue-600 bg-blue-50 ring-4 ring-blue-100"
                            : "border-neutral-200 hover:border-blue-300"
                        }`}
                      >
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                            selected
                              ? "bg-blue-600 text-white"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <Icon size={21} />
                        </div>

                        <p className="mt-5 font-bold text-neutral-900">
                          {theme.name}
                        </p>

                        <p className="mt-1 text-sm text-neutral-600">
                          {theme.name === "System"
                            ? "Follow your device preference."
                            : `Use the ${theme.name.toLowerCase()} interface.`}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Regional Preferences
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Configure language, timezone and date formatting.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Language
                    </label>

                    <select
                      name="language"
                      value={preferences.language}
                      onChange={handlePreferenceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Tamil</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Timezone
                    </label>

                    <select
                      name="timezone"
                      value={preferences.timezone}
                      onChange={handlePreferenceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option value="Asia/Kolkata">
                        India Standard Time
                      </option>

                      <option value="Asia/Singapore">
                        Singapore Time
                      </option>

                      <option value="Europe/London">
                        London Time
                      </option>

                      <option value="America/New_York">
                        New York Time
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Date Format
                    </label>

                    <select
                      name="dateFormat"
                      value={preferences.dateFormat}
                      onChange={handlePreferenceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Default Candidate View
                    </label>

                    <select
                      name="defaultCandidateView"
                      value={preferences.defaultCandidateView}
                      onChange={handlePreferenceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>Table</option>
                      <option>Cards</option>
                      <option>Compact List</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    AI Preferences
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Configure how AI assistance appears during hiring.
                  </p>
                </div>

                <div className="mt-8 divide-y divide-neutral-100">
                  <div className="flex items-start justify-between gap-5 pb-6">
                    <div>
                      <h3 className="font-bold text-neutral-900">
                        Automatic Resume Ranking
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-600">
                        Rank candidates automatically using role and
                        skill relevance.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={
                        preferences.automaticResumeRanking
                      }
                      onChange={(value) =>
                        updatePreference(
                          "automaticResumeRanking",
                          value
                        )
                      }
                      label="Automatic resume ranking"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-5 pt-6">
                    <div>
                      <h3 className="font-bold text-neutral-900">
                        AI Candidate Recommendations
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-600">
                        Display recommended candidates based on job
                        requirements.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={
                        preferences.showAiRecommendations
                      }
                      onChange={(value) =>
                        updatePreference(
                          "showAiRecommendations",
                          value
                        )
                      }
                      label="AI candidate recommendations"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handlePreferencesSave}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Preferences
                  </button>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Settings;