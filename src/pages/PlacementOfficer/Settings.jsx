import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe2,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  MapPin,
  Palette,
  Phone,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Trash2,
  User,
  Users,
} from "lucide-react";

const tabs = [
  {
    id: "profile",
    label: "Officer Profile",
    icon: User,
  },
  {
    id: "institution",
    label: "Institution",
    icon: Building2,
  },
  {
    id: "rules",
    label: "Placement Rules",
    icon: SlidersHorizontal,
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

function PlacementOfficerSettings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [message, setMessage] = useState("");

  const [profile, setProfile] = useState({
    firstName: "Meenakshi",
    lastName: "Rao",
    email: "placement@campuste.edu",
    phone: "+91 98765 43210",
    designation: "Head of Training and Placement",
    department: "Placement and Career Services",
    employeeId: "PO-2026-001",
    location: "Coimbatore, Tamil Nadu",
    bio: "Placement officer responsible for campus recruitment, recruiter coordination, student eligibility management and institutional placement analytics.",
  });

  const [institution, setInstitution] = useState({
    institutionName: "CampusTE Institute of Technology",
    institutionCode: "CTE-CBE-001",
    university: "CampusTE University",
    website: "https://campuste.edu",
    officialEmail: "placements@campuste.edu",
    contactNumber: "+91 422 123 4567",
    address: "University Campus, Coimbatore, Tamil Nadu",
    academicYear: "2025 - 2026",
    placementSeason: "2026",
  });

  const [placementRules, setPlacementRules] = useState({
    minimumCgpa: "6.5",
    maximumBacklogs: "1",
    minimumAttendance: "75",
    dreamPackage: "10",
    superDreamPackage: "15",
    maximumActiveApplications: "5",
    offerPolicy: "Allow Multiple Offers",
    autoEligibility: true,
    verifyDocuments: true,
    allowPlacedStudents: false,
    allowDreamCompanyApplications: true,
    lockProfileAfterApplication: false,
    requireResumeApproval: true,
  });

  const [notifications, setNotifications] = useState({
    recruiterRegistration: true,
    placementDriveCreated: true,
    studentApplications: true,
    eligibilityConflicts: true,
    interviewUpdates: true,
    offerUpdates: true,
    profileIncomplete: true,
    weeklyAnalytics: true,
    systemUpdates: false,
    emailNotifications: true,
    portalNotifications: true,
    smsNotifications: false,
  });

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuthentication: false,
    loginAlerts: true,
    sessionTimeout: "30 Minutes",
  });

  const [appearance, setAppearance] = useState({
    theme: "Light",
    language: "English",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
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

  const handleInstitutionChange = (event) => {
    const { name, value } = event.target;

    setInstitution((previousInstitution) => ({
      ...previousInstitution,
      [name]: value,
    }));
  };

  const handlePlacementRuleChange = (event) => {
    const { name, value } = event.target;

    setPlacementRules((previousRules) => ({
      ...previousRules,
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

  const handleAppearanceChange = (event) => {
    const { name, value } = event.target;

    setAppearance((previousAppearance) => ({
      ...previousAppearance,
      [name]: value,
    }));
  };

  const updatePlacementRule = (name, value) => {
    setPlacementRules((previousRules) => ({
      ...previousRules,
      [name]: value,
    }));
  };

  const updateNotification = (name, value) => {
    setNotifications((previousNotifications) => ({
      ...previousNotifications,
      [name]: value,
    }));
  };

  const saveProfile = (event) => {
    event.preventDefault();

    if (
      !profile.firstName.trim() ||
      !profile.lastName.trim() ||
      !profile.email.trim() ||
      !profile.employeeId.trim()
    ) {
      showMessage("Complete all required officer profile fields.");
      return;
    }

    showMessage("Placement officer profile updated successfully.");
  };

  const saveInstitution = (event) => {
    event.preventDefault();

    if (
      !institution.institutionName.trim() ||
      !institution.institutionCode.trim() ||
      !institution.officialEmail.trim()
    ) {
      showMessage("Complete all required institution fields.");
      return;
    }

    showMessage("Institution settings updated successfully.");
  };

  const savePlacementRules = (event) => {
    event.preventDefault();

    const minimumCgpa = Number(placementRules.minimumCgpa);
    const maximumBacklogs = Number(placementRules.maximumBacklogs);
    const attendance = Number(placementRules.minimumAttendance);

    if (
      minimumCgpa < 0 ||
      minimumCgpa > 10 ||
      maximumBacklogs < 0 ||
      attendance < 0 ||
      attendance > 100
    ) {
      showMessage("Enter valid placement eligibility values.");
      return;
    }

    showMessage("Placement rules updated successfully.");
  };

  const saveNotifications = () => {
    showMessage("Notification preferences saved successfully.");
  };

  const updatePassword = (event) => {
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

  const saveAppearance = () => {
    showMessage("Portal appearance settings saved successfully.");
  };

  const handleDeactivateAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to request account deactivation?"
    );

    if (!confirmed) {
      return;
    }

    showMessage(
      "Account deactivation request submitted to the system administrator."
    );
  };

  const placementAutomationRules = [
    {
      name: "autoEligibility",
      title: "Automatic Eligibility Evaluation",
      description:
        "Automatically evaluate student eligibility using academic and backlog criteria.",
      icon: GraduationCap,
    },
    {
      name: "verifyDocuments",
      title: "Mandatory Document Verification",
      description:
        "Require academic documents to be verified before application approval.",
      icon: ShieldCheck,
    },
    {
      name: "allowPlacedStudents",
      title: "Allow Placed Students to Apply",
      description:
        "Permit already placed students to continue applying to regular companies.",
      icon: Users,
    },
    {
      name: "allowDreamCompanyApplications",
      title: "Allow Dream Company Applications",
      description:
        "Allow placed students to apply when the offered package meets the dream threshold.",
      icon: BriefcaseBusiness,
    },
    {
      name: "lockProfileAfterApplication",
      title: "Lock Profile After Application",
      description:
        "Prevent students from changing academic details after applying for a drive.",
      icon: Lock,
    },
    {
      name: "requireResumeApproval",
      title: "Resume Approval Required",
      description:
        "Require placement officer approval before a resume can be used for applications.",
      icon: CheckCircle2,
    },
  ];

  const notificationItems = [
    {
      name: "recruiterRegistration",
      title: "Recruiter Registrations",
      description:
        "Receive alerts when companies submit recruiter registration requests.",
      icon: Building2,
    },
    {
      name: "placementDriveCreated",
      title: "Placement Drive Updates",
      description:
        "Receive notifications when recruiters create or modify placement drives.",
      icon: BriefcaseBusiness,
    },
    {
      name: "studentApplications",
      title: "Student Applications",
      description:
        "Receive updates when students apply for placement opportunities.",
      icon: Users,
    },
    {
      name: "eligibilityConflicts",
      title: "Eligibility Conflicts",
      description:
        "Receive priority alerts for applications that violate placement criteria.",
      icon: AlertTriangle,
    },
    {
      name: "interviewUpdates",
      title: "Interview Schedule Updates",
      description:
        "Receive alerts for interview scheduling, rescheduling and cancellation.",
      icon: CalendarDays,
    },
    {
      name: "offerUpdates",
      title: "Offer and Selection Updates",
      description:
        "Receive alerts when recruiters release offers or selection results.",
      icon: CheckCircle2,
    },
    {
      name: "profileIncomplete",
      title: "Incomplete Student Profiles",
      description:
        "Receive reminders about eligible students with incomplete profiles.",
      icon: GraduationCap,
    },
    {
      name: "weeklyAnalytics",
      title: "Weekly Placement Analytics",
      description:
        "Receive a weekly placement performance and recruitment activity summary.",
      icon: Mail,
    },
    {
      name: "systemUpdates",
      title: "Platform and Maintenance Updates",
      description:
        "Receive information about platform features, upgrades and maintenance.",
      icon: Bell,
    },
  ];

  const deliveryChannels = [
    {
      name: "emailNotifications",
      title: "Email Notifications",
      description:
        "Receive placement alerts through the official placement email.",
      icon: Mail,
    },
    {
      name: "portalNotifications",
      title: "Portal Notifications",
      description:
        "Display notifications inside the Placement Officer Portal.",
      icon: Bell,
    },
    {
      name: "smsNotifications",
      title: "SMS Notifications",
      description:
        "Receive urgent placement and interview alerts through SMS.",
      icon: Phone,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <SlidersHorizontal size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Portal Configuration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Placement Officer Settings
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Manage your profile, institution details, placement
                policies, notification preferences and account security.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <CheckCircle2
                  size={21}
                  className="text-emerald-300"
                />

                <div>
                  <p className="text-sm text-blue-100">
                    Account Status
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Verified Administrator
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

      <div className="grid gap-8 xl:grid-cols-[290px_1fr]">
        <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm xl:sticky xl:top-24">
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
                Institution Verified
              </p>
            </div>

            <p className="mt-2 text-sm leading-6 text-blue-700">
              Placement operations are enabled for the active academic
              year.
            </p>
          </div>
        </aside>

        <main>
          {activeTab === "profile" && (
            <form onSubmit={saveProfile} className="space-y-8">
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 text-3xl font-bold text-white shadow-lg">
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Officer Profile
                    </h2>

                    <p className="mt-2 text-neutral-600">
                      Manage your personal and professional placement
                      officer information.
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          showMessage(
                            "Profile photo upload will be connected to backend storage."
                          )
                        }
                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Change Photo
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          showMessage("Profile photo removed.")
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
                    This information appears in placement records and
                    recruiter communications.
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
                      Official Email
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
                      <Phone
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
                      Employee ID
                    </label>

                    <input
                      type="text"
                      name="employeeId"
                      value={profile.employeeId}
                      onChange={handleProfileChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
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
                      Location
                    </label>

                    <div className="relative">
                      <MapPin
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type="text"
                        name="location"
                        value={profile.location}
                        onChange={handleProfileChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
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

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                    <Palette size={21} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Portal Appearance
                    </h2>

                    <p className="mt-2 text-neutral-600">
                      Configure the visual and regional preferences of
                      your portal.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Theme
                    </label>

                    <select
                      name="theme"
                      value={appearance.theme}
                      onChange={handleAppearanceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>Light</option>
                      <option>Dark</option>
                      <option>System</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Language
                    </label>

                    <select
                      name="language"
                      value={appearance.language}
                      onChange={handleAppearanceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                      value={appearance.timezone}
                      onChange={handleAppearanceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Date Format
                    </label>

                    <select
                      name="dateFormat"
                      value={appearance.dateFormat}
                      onChange={handleAppearanceChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={saveAppearance}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
                  >
                    <Save size={18} />
                    Save Appearance
                  </button>
                </div>
              </section>
            </form>
          )}

          {activeTab === "institution" && (
            <form onSubmit={saveInstitution} className="space-y-8">
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white shadow-lg">
                    <GraduationCap size={42} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Institution Branding
                    </h2>

                    <p className="mt-2 text-neutral-600">
                      Manage the institution identity shown to students
                      and recruiters.
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        showMessage(
                          "Institution logo upload will be connected to backend storage."
                        )
                      }
                      className="mt-4 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                      Change Institution Logo
                    </button>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Institution Information
                  </h2>

                  <p className="mt-2 text-sm text-neutral-600">
                    Configure the official details used throughout the
                    placement portal.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Institution Name
                    </label>

                    <input
                      type="text"
                      name="institutionName"
                      value={institution.institutionName}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Institution Code
                    </label>

                    <input
                      type="text"
                      name="institutionCode"
                      value={institution.institutionCode}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      University or Affiliation
                    </label>

                    <input
                      type="text"
                      name="university"
                      value={institution.university}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Institution Website
                    </label>

                    <div className="relative">
                      <Globe2
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                      />

                      <input
                        type="text"
                        name="website"
                        value={institution.website}
                        onChange={handleInstitutionChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Placement Email
                    </label>

                    <input
                      type="email"
                      name="officialEmail"
                      value={institution.officialEmail}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Contact Number
                    </label>

                    <input
                      type="text"
                      name="contactNumber"
                      value={institution.contactNumber}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Active Academic Year
                    </label>

                    <select
                      name="academicYear"
                      value={institution.academicYear}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>2025 - 2026</option>
                      <option>2026 - 2027</option>
                      <option>2027 - 2028</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Placement Season
                    </label>

                    <input
                      type="text"
                      name="placementSeason"
                      value={institution.placementSeason}
                      onChange={handleInstitutionChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Institution Address
                    </label>

                    <textarea
                      name="address"
                      value={institution.address}
                      onChange={handleInstitutionChange}
                      rows={4}
                      className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Institution
                  </button>
                </div>
              </section>
            </form>
          )}

          {activeTab === "rules" && (
            <form onSubmit={savePlacementRules} className="space-y-8">
              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Eligibility Criteria
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Configure the default eligibility rules used for
                    placement applications.
                  </p>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Minimum CGPA
                    </label>

                    <input
                      type="number"
                      name="minimumCgpa"
                      min="0"
                      max="10"
                      step="0.1"
                      value={placementRules.minimumCgpa}
                      onChange={handlePlacementRuleChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Maximum Active Backlogs
                    </label>

                    <input
                      type="number"
                      name="maximumBacklogs"
                      min="0"
                      value={placementRules.maximumBacklogs}
                      onChange={handlePlacementRuleChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Minimum Attendance %
                    </label>

                    <input
                      type="number"
                      name="minimumAttendance"
                      min="0"
                      max="100"
                      value={placementRules.minimumAttendance}
                      onChange={handlePlacementRuleChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Dream Package Threshold
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-neutral-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="dreamPackage"
                        min="0"
                        value={placementRules.dreamPackage}
                        onChange={handlePlacementRuleChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-9 pr-16 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                        LPA
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Super Dream Package
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-neutral-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        name="superDreamPackage"
                        min="0"
                        value={placementRules.superDreamPackage}
                        onChange={handlePlacementRuleChange}
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-9 pr-16 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                      />

                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500">
                        LPA
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Maximum Active Applications
                    </label>

                    <input
                      type="number"
                      name="maximumActiveApplications"
                      min="1"
                      value={placementRules.maximumActiveApplications}
                      onChange={handlePlacementRuleChange}
                      className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div className="md:col-span-2 xl:col-span-3">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Student Offer Policy
                    </label>

                    <select
                      name="offerPolicy"
                      value={placementRules.offerPolicy}
                      onChange={handlePlacementRuleChange}
                      className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>Allow Multiple Offers</option>
                      <option>Single Offer Only</option>
                      <option>
                        Allow Only Dream and Super Dream Offers
                      </option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Placement Automation
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Configure automated student and application
                    workflows.
                  </p>
                </div>

                <div className="mt-8 divide-y divide-neutral-100">
                  {placementAutomationRules.map((rule) => {
                    const Icon = rule.icon;

                    return (
                      <div
                        key={rule.name}
                        className="flex items-start justify-between gap-5 py-5 first:pt-0 last:pb-0"
                      >
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
                            <Icon size={20} />
                          </div>

                          <div>
                            <h3 className="font-bold text-neutral-900">
                              {rule.title}
                            </h3>

                            <p className="mt-1 text-sm leading-6 text-neutral-600">
                              {rule.description}
                            </p>
                          </div>
                        </div>

                        <ToggleSwitch
                          enabled={placementRules[rule.name]}
                          onChange={(value) =>
                            updatePlacementRule(rule.name, value)
                          }
                          label={rule.title}
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
                  >
                    <Save size={18} />
                    Save Placement Rules
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
                    Placement Notifications
                  </h2>

                  <p className="mt-2 text-neutral-600">
                    Select the events that should generate placement
                    officer notifications.
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
                    Select how placement alerts should be delivered.
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
                    onClick={saveNotifications}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
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
                onSubmit={updatePassword}
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
                      Use a strong password to protect placement and
                      student information.
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
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                        className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-12 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white hover:shadow-lg"
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
                    Configure additional security controls for your
                    account.
                  </p>
                </div>

                <div className="mt-8 divide-y divide-neutral-100">
                  <div className="flex items-start justify-between gap-5 pb-6">
                    <div>
                      <h3 className="font-bold text-neutral-900">
                        Two-Factor Authentication
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-600">
                        Require an additional verification code during
                        sign-in.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={security.twoFactorAuthentication}
                      onChange={(value) =>
                        setSecurity((previousSecurity) => ({
                          ...previousSecurity,
                          twoFactorAuthentication: value,
                        }))
                      }
                      label="Two-factor authentication"
                    />
                  </div>

                  <div className="flex items-start justify-between gap-5 py-6">
                    <div>
                      <h3 className="font-bold text-neutral-900">
                        New Login Alerts
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-600">
                        Receive an email when your account is accessed
                        from a new device.
                      </p>
                    </div>

                    <ToggleSwitch
                      enabled={security.loginAlerts}
                      onChange={(value) =>
                        setSecurity((previousSecurity) => ({
                          ...previousSecurity,
                          loginAlerts: value,
                        }))
                      }
                      label="New login alerts"
                    />
                  </div>

                  <div className="pt-6">
                    <label className="mb-2 block text-sm font-semibold text-neutral-700">
                      Automatic Session Timeout
                    </label>

                    <select
                      name="sessionTimeout"
                      value={security.sessionTimeout}
                      onChange={handleSecurityChange}
                      className="w-full max-w-md rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    >
                      <option>15 Minutes</option>
                      <option>30 Minutes</option>
                      <option>1 Hour</option>
                      <option>2 Hours</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-neutral-900">
                  Active Sessions
                </h2>

                <p className="mt-2 text-neutral-600">
                  Review devices currently signed in to your account.
                </p>

                <div className="mt-8 space-y-4">
                  <article className="flex flex-col gap-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-neutral-900">
                          Chrome on Windows
                        </p>

                        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
                          Current
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-neutral-600">
                        Coimbatore, India · Active now
                      </p>
                    </div>

                    <ShieldCheck
                      size={22}
                      className="text-emerald-700"
                    />
                  </article>

                  <article className="flex flex-col gap-4 rounded-2xl border border-neutral-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-bold text-neutral-900">
                        Android Mobile
                      </p>

                      <p className="mt-2 text-sm text-neutral-600">
                        Coimbatore, India · Last active 2 hours ago
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        showMessage(
                          "Mobile session signed out successfully."
                        )
                      }
                      className="rounded-xl border border-rose-300 px-4 py-2.5 text-sm font-semibold text-rose-700 hover:bg-rose-50"
                    >
                      Sign Out
                    </button>
                  </article>
                </div>
              </section>

              <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6 shadow-sm sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
                    <Trash2 size={21} />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-rose-900">
                      Deactivate Account
                    </h2>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-rose-700">
                      Deactivation removes your access to student,
                      recruiter and institutional placement records.
                      Administrator approval is required.
                    </p>

                    <button
                      type="button"
                      onClick={handleDeactivateAccount}
                      className="mt-5 inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
                    >
                      <Trash2 size={18} />
                      Request Deactivation
                    </button>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default PlacementOfficerSettings;