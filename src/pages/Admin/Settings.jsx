import { useState } from "react";
import {
  AlertTriangle,
  Bell,
  Bot,
  CheckCircle2,
  Clock3,
  Cloud,
  Database,
  Download,
  Eye,
  EyeOff,
  FileLock2,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  Network,
  RefreshCw,
  Save,
  Server,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Smartphone,
  Trash2,
  Upload,
  UserCog,
  Users,
  Webhook,
  X,
} from "lucide-react";

const tabs = [
  {
    name: "General",
    description: "Platform identity and regional settings",
    icon: Settings2,
  },
  {
    name: "Access",
    description: "Registration and account permissions",
    icon: Users,
  },
  {
    name: "Security",
    description: "Authentication and session policies",
    icon: ShieldCheck,
  },
  {
    name: "Notifications",
    description: "Email and portal communication rules",
    icon: Bell,
  },
  {
    name: "AI & Automation",
    description: "AI scoring and automation preferences",
    icon: Bot,
  },
  {
    name: "Data & Backup",
    description: "Retention, backup and storage settings",
    icon: Database,
  },
  {
    name: "Integrations",
    description: "Connected external platform services",
    icon: Network,
  },
];

const defaultSettings = {
  platformName: "CampusTE",
  platformTagline:
    "Campus Talent Ecosystem for intelligent placement management",
  supportEmail: "support@campuste.edu",
  administratorEmail: "admin@campuste.edu",
  platformUrl: "https://campuste.example.com",
  defaultLanguage: "English",
  timezone: "Asia/Kolkata",
  dateFormat: "DD/MM/YYYY",
  currency: "INR",
  maintenanceMode: false,
  displaySystemStatus: true,

  studentRegistration: true,
  recruiterRegistration: true,
  institutionRegistration: true,
  placementOfficerRegistration: true,
  requireStudentVerification: true,
  requireRecruiterVerification: true,
  requireInstitutionVerification: true,
  requireOfficerVerification: true,
  allowMultipleInstitutionAdmins: true,
  inactiveAccountDays: 90,

  minimumPasswordLength: 10,
  maximumLoginAttempts: 5,
  accountLockDuration: 30,
  sessionTimeout: 60,
  requireAdminMfa: true,
  requireOfficerMfa: false,
  requireRecruiterMfa: false,
  forcePasswordRotation: true,
  passwordRotationDays: 90,
  allowConcurrentSessions: false,
  logSecurityEvents: true,
  blockSuspiciousLocations: true,

  emailNotifications: true,
  portalNotifications: true,
  smsNotifications: false,
  institutionAlerts: true,
  recruiterAlerts: true,
  placementOfficerAlerts: true,
  securityAlerts: true,
  systemHealthAlerts: true,
  dailySummary: true,
  weeklyAnalytics: true,
  failedDeliveryRetry: true,
  notificationRetryCount: 3,

  enableResumeParsing: true,
  enableAiShortlisting: true,
  enableJobMatching: true,
  enableSkillRecommendations: true,
  showAiExplanation: true,
  allowAiAutoShortlisting: false,
  minimumAiConfidence: 75,
  shortlistThreshold: 70,
  maximumRecommendations: 20,
  aiModelVersion: "CampusTE Intelligence v2.4",
  humanApprovalRequired: true,

  automaticBackup: true,
  backupFrequency: "Daily",
  backupTime: "02:00",
  backupRetentionDays: 30,
  auditRetentionDays: 365,
  notificationRetentionDays: 180,
  inactiveUserRetentionDays: 730,
  encryptBackups: true,
  allowManualBackup: true,
  automaticCleanup: true,
  storageWarningThreshold: 80,
};

const initialIntegrations = [
  {
    id: 1,
    name: "Google Workspace",
    description:
      "Email delivery, calendar scheduling and institution communication.",
    icon: Mail,
    connected: true,
    lastSync: "20 Jul 2026, 5:42 PM",
    account: "admin@campuste.edu",
  },
  {
    id: 2,
    name: "Google Calendar",
    description:
      "Interview scheduling, placement events and calendar invitations.",
    icon: Clock3,
    connected: true,
    lastSync: "20 Jul 2026, 5:18 PM",
    account: "placements@campuste.edu",
  },
  {
    id: 3,
    name: "Cloud Storage",
    description:
      "Secure storage for resumes, documents and placement reports.",
    icon: Cloud,
    connected: true,
    lastSync: "20 Jul 2026, 4:58 PM",
    account: "CampusTE Production Storage",
  },
  {
    id: 4,
    name: "SMS Gateway",
    description:
      "Critical alerts, interview reminders and emergency communication.",
    icon: Smartphone,
    connected: false,
    lastSync: "Not connected",
    account: "No account configured",
  },
  {
    id: 5,
    name: "Webhook Service",
    description:
      "Send platform events to approved external applications.",
    icon: Webhook,
    connected: false,
    lastSync: "Not connected",
    account: "No endpoint configured",
  },
  {
    id: 6,
    name: "Analytics Warehouse",
    description:
      "Export anonymised platform data for advanced reporting.",
    icon: Server,
    connected: true,
    lastSync: "20 Jul 2026, 3:46 PM",
    account: "CampusTE Analytics",
  },
];

function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition ${
        checked ? "bg-blue-600" : "bg-neutral-300"
      }`}
      aria-label={label}
      aria-pressed={checked}
    >
      <span
        className={`inline-block h-5 w-5 rounded-full bg-white shadow transition ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingToggle({
  title,
  description,
  checked,
  onChange,
  icon: Icon,
}) {
  return (
    <div className="flex items-start justify-between gap-5 rounded-2xl border border-neutral-200 p-5">
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <Icon size={19} />
          </div>
        )}

        <div>
          <p className="font-bold text-neutral-900">{title}</p>

          <p className="mt-1 text-sm leading-6 text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      <Toggle
        checked={checked}
        onChange={onChange}
        label={title}
      />
    </div>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("General");
  const [settings, setSettings] = useState(defaultSettings);
  const [integrations, setIntegrations] =
    useState(initialIntegrations);
  const [message, setMessage] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] =
    useState(false);
  const [lastSaved, setLastSaved] = useState(
    "20 Jul 2026, 5:30 PM"
  );

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const updateSetting = (field, value) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [field]: value,
    }));
  };

  const saveSettings = () => {
    setLastSaved(
      new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date())
    );

    showMessage(`${activeTab} settings saved successfully.`);
  };

  const resetSettings = () => {
    const confirmed = window.confirm(
      "Reset all administrator settings to their default values?"
    );

    if (!confirmed) {
      return;
    }

    setSettings(defaultSettings);
    setIntegrations(initialIntegrations);
    showMessage("Administrator settings restored to defaults.");
  };

  const exportSettings = () => {
    const exportData = {
      exportedAt: new Date().toISOString(),
      platform: "CampusTE",
      settings,
      integrations: integrations.map((integration) => ({
        name: integration.name,
        connected: integration.connected,
        account: integration.account,
        lastSync: integration.lastSync,
      })),
    };

    const file = new Blob(
      [JSON.stringify(exportData, null, 2)],
      {
        type: "application/json;charset=utf-8;",
      }
    );

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "campuste-admin-settings.json";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Administrator settings exported successfully.");
  };

  const toggleIntegration = (integrationId) => {
    setIntegrations((previousIntegrations) =>
      previousIntegrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              connected: !integration.connected,
              lastSync: !integration.connected
                ? "Connected just now"
                : "Not connected",
              account: !integration.connected
                ? "Administrator configured account"
                : "No account configured",
            }
          : integration
      )
    );

    showMessage("Integration status updated.");
  };

  const syncIntegration = (integrationId) => {
    setIntegrations((previousIntegrations) =>
      previousIntegrations.map((integration) =>
        integration.id === integrationId
          ? {
              ...integration,
              lastSync: "Synced just now",
            }
          : integration
      )
    );

    showMessage("Integration synchronised successfully.");
  };

  const runManualBackup = () => {
    showMessage(
      "Manual backup completed and encrypted successfully."
    );
  };

  const clearTemporaryData = () => {
    const confirmed = window.confirm(
      "Clear cached and temporary platform files?"
    );

    if (!confirmed) {
      return;
    }

    showMessage("Temporary platform data cleared successfully.");
  };

  const enableMaintenanceMode = () => {
    updateSetting("maintenanceMode", true);
    setShowMaintenanceDialog(false);
    showMessage("Platform maintenance mode enabled.");
  };

  const renderGeneralSettings = () => (
    <div className="space-y-8">
      <section>
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Platform Identity
          </h2>

          <p className="mt-1 text-sm text-neutral-600">
            Configure the public platform name and support
            information.
          </p>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Platform Name
            </label>

            <input
              type="text"
              value={settings.platformName}
              onChange={(event) =>
                updateSetting(
                  "platformName",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Platform URL
            </label>

            <div className="relative">
              <Globe2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={settings.platformUrl}
                onChange={(event) =>
                  updateSetting(
                    "platformUrl",
                    event.target.value
                  )
                }
                className="w-full rounded-xl border border-neutral-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Platform Tagline
            </label>

            <textarea
              rows={3}
              value={settings.platformTagline}
              onChange={(event) =>
                updateSetting(
                  "platformTagline",
                  event.target.value
                )
              }
              className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Support Email
            </label>

            <input
              type="email"
              value={settings.supportEmail}
              onChange={(event) =>
                updateSetting(
                  "supportEmail",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Administrator Email
            </label>

            <input
              type="email"
              value={settings.administratorEmail}
              onChange={(event) =>
                updateSetting(
                  "administratorEmail",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Regional Preferences
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Control the default language, timezone and formatting.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Language
            </label>

            <select
              value={settings.defaultLanguage}
              onChange={(event) =>
                updateSetting(
                  "defaultLanguage",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Tamil</option>
              <option>Malayalam</option>
              <option>Telugu</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Timezone
            </label>

            <select
              value={settings.timezone}
              onChange={(event) =>
                updateSetting("timezone", event.target.value)
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>Asia/Kolkata</option>
              <option>Asia/Dubai</option>
              <option>Europe/London</option>
              <option>America/New_York</option>
              <option>America/Los_Angeles</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Date Format
            </label>

            <select
              value={settings.dateFormat}
              onChange={(event) =>
                updateSetting(
                  "dateFormat",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Currency
            </label>

            <select
              value={settings.currency}
              onChange={(event) =>
                updateSetting("currency", event.target.value)
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option value="INR">INR — Indian Rupee</option>
              <option value="USD">USD — US Dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — British Pound</option>
            </select>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Platform Availability
        </h2>

        <div className="mt-6 space-y-4">
          <SettingToggle
            title="Display System Status"
            description="Show platform availability and service health information to users."
            checked={settings.displaySystemStatus}
            onChange={(value) =>
              updateSetting("displaySystemStatus", value)
            }
            icon={Server}
          />

          <div
            className={`rounded-2xl border p-5 ${
              settings.maintenanceMode
                ? "border-amber-300 bg-amber-50"
                : "border-neutral-200"
            }`}
          >
            <div className="flex items-start justify-between gap-5">
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    settings.maintenanceMode
                      ? "bg-amber-100 text-amber-700"
                      : "bg-neutral-100 text-neutral-600"
                  }`}
                >
                  <AlertTriangle size={19} />
                </div>

                <div>
                  <p className="font-bold text-neutral-900">
                    Maintenance Mode
                  </p>

                  <p className="mt-1 text-sm leading-6 text-neutral-500">
                    Temporarily restrict platform access to system
                    administrators while maintenance is performed.
                  </p>
                </div>
              </div>

              <Toggle
                checked={settings.maintenanceMode}
                onChange={(value) => {
                  if (value) {
                    setShowMaintenanceDialog(true);
                  } else {
                    updateSetting(
                      "maintenanceMode",
                      false
                    );
                    showMessage(
                      "Platform maintenance mode disabled."
                    );
                  }
                }}
                label="Maintenance Mode"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderAccessSettings = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900">
          Registration Access
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Control which platform roles may create new accounts.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Student Registration"
            description="Allow students to create career profiles and apply for placement opportunities."
            checked={settings.studentRegistration}
            onChange={(value) =>
              updateSetting("studentRegistration", value)
            }
            icon={Users}
          />

          <SettingToggle
            title="Recruiter Registration"
            description="Allow company representatives to submit recruiter registration requests."
            checked={settings.recruiterRegistration}
            onChange={(value) =>
              updateSetting("recruiterRegistration", value)
            }
            icon={UserCog}
          />

          <SettingToggle
            title="Institution Registration"
            description="Allow educational institutions to request onboarding to CampusTE."
            checked={settings.institutionRegistration}
            onChange={(value) =>
              updateSetting(
                "institutionRegistration",
                value
              )
            }
            icon={Globe2}
          />

          <SettingToggle
            title="Placement Officer Registration"
            description="Allow placement officers to request access through their institution."
            checked={settings.placementOfficerRegistration}
            onChange={(value) =>
              updateSetting(
                "placementOfficerRegistration",
                value
              )
            }
            icon={UserCog}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Verification Requirements
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Define which accounts require administrator approval.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Verify Students"
            description="Require email and institution identity validation before student activation."
            checked={settings.requireStudentVerification}
            onChange={(value) =>
              updateSetting(
                "requireStudentVerification",
                value
              )
            }
            icon={ShieldCheck}
          />

          <SettingToggle
            title="Verify Recruiters"
            description="Require company and recruiter documentation before job publishing access."
            checked={settings.requireRecruiterVerification}
            onChange={(value) =>
              updateSetting(
                "requireRecruiterVerification",
                value
              )
            }
            icon={ShieldCheck}
          />

          <SettingToggle
            title="Verify Institutions"
            description="Require accreditation and administrator validation before institution activation."
            checked={settings.requireInstitutionVerification}
            onChange={(value) =>
              updateSetting(
                "requireInstitutionVerification",
                value
              )
            }
            icon={ShieldCheck}
          />

          <SettingToggle
            title="Verify Placement Officers"
            description="Require institution confirmation before placement officer access is granted."
            checked={settings.requireOfficerVerification}
            onChange={(value) =>
              updateSetting(
                "requireOfficerVerification",
                value
              )
            }
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Account Policies
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SettingToggle
            title="Multiple Institution Administrators"
            description="Permit an institution to assign more than one administrator account."
            checked={
              settings.allowMultipleInstitutionAdmins
            }
            onChange={(value) =>
              updateSetting(
                "allowMultipleInstitutionAdmins",
                value
              )
            }
            icon={Users}
          />

          <div className="rounded-2xl border border-neutral-200 p-5">
            <label className="block font-bold text-neutral-900">
              Inactive Account Threshold
            </label>

            <p className="mt-1 text-sm leading-6 text-neutral-500">
              Flag accounts with no activity after the selected
              number of days.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min="30"
                value={settings.inactiveAccountDays}
                onChange={(event) =>
                  updateSetting(
                    "inactiveAccountDays",
                    Number(event.target.value)
                  )
                }
                className="w-36 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="font-semibold text-neutral-600">
                days
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900">
          Password Policy
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Define password strength and account protection rules.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Minimum Length
            </label>

            <input
              type="number"
              min="8"
              max="32"
              value={settings.minimumPasswordLength}
              onChange={(event) =>
                updateSetting(
                  "minimumPasswordLength",
                  Number(event.target.value)
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Maximum Login Attempts
            </label>

            <input
              type="number"
              min="3"
              max="15"
              value={settings.maximumLoginAttempts}
              onChange={(event) =>
                updateSetting(
                  "maximumLoginAttempts",
                  Number(event.target.value)
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Lock Duration
            </label>

            <div className="relative">
              <input
                type="number"
                min="5"
                value={settings.accountLockDuration}
                onChange={(event) =>
                  updateSetting(
                    "accountLockDuration",
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-20 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                minutes
              </span>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Password Rotation
            </label>

            <div className="relative">
              <input
                type="number"
                min="30"
                value={settings.passwordRotationDays}
                onChange={(event) =>
                  updateSetting(
                    "passwordRotationDays",
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                days
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Force Password Rotation"
            description="Require users to update passwords after the configured period."
            checked={settings.forcePasswordRotation}
            onChange={(value) =>
              updateSetting("forcePasswordRotation", value)
            }
            icon={KeyRound}
          />

          <SettingToggle
            title="Block Suspicious Locations"
            description="Automatically restrict sign-in attempts from unusual or high-risk locations."
            checked={settings.blockSuspiciousLocations}
            onChange={(value) =>
              updateSetting(
                "blockSuspiciousLocations",
                value
              )
            }
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Multi-Factor Authentication
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <SettingToggle
            title="Administrators"
            description="Require MFA for all system administrator accounts."
            checked={settings.requireAdminMfa}
            onChange={(value) =>
              updateSetting("requireAdminMfa", value)
            }
            icon={LockKeyhole}
          />

          <SettingToggle
            title="Placement Officers"
            description="Require MFA for institution placement officer accounts."
            checked={settings.requireOfficerMfa}
            onChange={(value) =>
              updateSetting("requireOfficerMfa", value)
            }
            icon={LockKeyhole}
          />

          <SettingToggle
            title="Recruiters"
            description="Require MFA for verified recruiter accounts."
            checked={settings.requireRecruiterMfa}
            onChange={(value) =>
              updateSetting("requireRecruiterMfa", value)
            }
            icon={LockKeyhole}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Session Security
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <label className="block font-bold text-neutral-900">
              Session Timeout
            </label>

            <p className="mt-1 text-sm text-neutral-500">
              Automatically sign out inactive users.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min="15"
                value={settings.sessionTimeout}
                onChange={(event) =>
                  updateSetting(
                    "sessionTimeout",
                    Number(event.target.value)
                  )
                }
                className="w-36 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="font-semibold text-neutral-600">
                minutes
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <SettingToggle
              title="Allow Concurrent Sessions"
              description="Allow one user account to remain active on multiple devices."
              checked={settings.allowConcurrentSessions}
              onChange={(value) =>
                updateSetting(
                  "allowConcurrentSessions",
                  value
                )
              }
              icon={Smartphone}
            />

            <SettingToggle
              title="Log Security Events"
              description="Record authentication, permission and account-security events."
              checked={settings.logSecurityEvents}
              onChange={(value) =>
                updateSetting("logSecurityEvents", value)
              }
              icon={FileLock2}
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Platform API Key
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Used by authorised services communicating with the
          CampusTE platform.
        </p>

        <div className="mt-5 flex max-w-2xl gap-3">
          <div className="relative flex-1">
            <input
              type={showApiKey ? "text" : "password"}
              readOnly
              value="cte_live_8f3c42ab916d73418e6f"
              className="w-full rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3 pr-12 font-mono text-sm outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowApiKey((previousValue) => !previousValue)
              }
              className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-neutral-500 hover:bg-neutral-200"
              aria-label="Toggle API key visibility"
            >
              {showApiKey ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() =>
              showMessage(
                "A new platform API key was generated."
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            <RefreshCw size={17} />
            Regenerate
          </button>
        </div>
      </section>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900">
          Delivery Channels
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Select the communication channels available to the
          platform.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <SettingToggle
            title="Email Notifications"
            description="Send account, recruitment and security updates through email."
            checked={settings.emailNotifications}
            onChange={(value) =>
              updateSetting("emailNotifications", value)
            }
            icon={Mail}
          />

          <SettingToggle
            title="Portal Notifications"
            description="Display alerts within the CampusTE notification centre."
            checked={settings.portalNotifications}
            onChange={(value) =>
              updateSetting("portalNotifications", value)
            }
            icon={Bell}
          />

          <SettingToggle
            title="SMS Notifications"
            description="Send urgent interview and security messages through SMS."
            checked={settings.smsNotifications}
            onChange={(value) =>
              updateSetting("smsNotifications", value)
            }
            icon={Smartphone}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Administrator Alerts
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Institution Alerts"
            description="Receive alerts for new institution registrations and verification changes."
            checked={settings.institutionAlerts}
            onChange={(value) =>
              updateSetting("institutionAlerts", value)
            }
            icon={Globe2}
          />

          <SettingToggle
            title="Recruiter Alerts"
            description="Receive recruiter registration, verification and policy notifications."
            checked={settings.recruiterAlerts}
            onChange={(value) =>
              updateSetting("recruiterAlerts", value)
            }
            icon={UserCog}
          />

          <SettingToggle
            title="Placement Officer Alerts"
            description="Receive placement officer registration and account-change updates."
            checked={settings.placementOfficerAlerts}
            onChange={(value) =>
              updateSetting(
                "placementOfficerAlerts",
                value
              )
            }
            icon={Users}
          />

          <SettingToggle
            title="Security Alerts"
            description="Receive immediate notifications for blocked logins and suspicious activity."
            checked={settings.securityAlerts}
            onChange={(value) =>
              updateSetting("securityAlerts", value)
            }
            icon={ShieldCheck}
          />

          <SettingToggle
            title="System Health Alerts"
            description="Receive service availability, performance and infrastructure warnings."
            checked={settings.systemHealthAlerts}
            onChange={(value) =>
              updateSetting("systemHealthAlerts", value)
            }
            icon={Server}
          />

          <SettingToggle
            title="Failed Delivery Retry"
            description="Automatically retry unsuccessful email or SMS notification delivery."
            checked={settings.failedDeliveryRetry}
            onChange={(value) =>
              updateSetting(
                "failedDeliveryRetry",
                value
              )
            }
            icon={RefreshCw}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Scheduled Reports
        </h2>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Daily Administrator Summary"
            description="Receive a daily summary of registrations, approvals and platform alerts."
            checked={settings.dailySummary}
            onChange={(value) =>
              updateSetting("dailySummary", value)
            }
            icon={Mail}
          />

          <SettingToggle
            title="Weekly Analytics Report"
            description="Receive a weekly report covering platform growth and placement performance."
            checked={settings.weeklyAnalytics}
            onChange={(value) =>
              updateSetting("weeklyAnalytics", value)
            }
            icon={Database}
          />

          <div className="rounded-2xl border border-neutral-200 p-5 lg:col-span-2">
            <label className="block font-bold text-neutral-900">
              Maximum Delivery Retry Attempts
            </label>

            <p className="mt-1 text-sm text-neutral-500">
              Number of retries for a failed notification.
            </p>

            <input
              type="number"
              min="1"
              max="10"
              value={settings.notificationRetryCount}
              onChange={(event) =>
                updateSetting(
                  "notificationRetryCount",
                  Number(event.target.value)
                )
              }
              className="mt-4 w-36 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>
    </div>
  );

  const renderAiSettings = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900">
          AI Intelligence Features
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Control AI-assisted recruitment and student career
          services.
        </p>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Resume Parsing"
            description="Extract education, skills, projects and experience from uploaded resumes."
            checked={settings.enableResumeParsing}
            onChange={(value) =>
              updateSetting("enableResumeParsing", value)
            }
            icon={Bot}
          />

          <SettingToggle
            title="AI Shortlisting"
            description="Score applicants against job requirements and eligibility criteria."
            checked={settings.enableAiShortlisting}
            onChange={(value) =>
              updateSetting("enableAiShortlisting", value)
            }
            icon={Bot}
          />

          <SettingToggle
            title="Job Matching"
            description="Recommend suitable opportunities based on student skills and profile."
            checked={settings.enableJobMatching}
            onChange={(value) =>
              updateSetting("enableJobMatching", value)
            }
            icon={Bot}
          />

          <SettingToggle
            title="Skill Recommendations"
            description="Suggest relevant skills and learning improvements for students."
            checked={settings.enableSkillRecommendations}
            onChange={(value) =>
              updateSetting(
                "enableSkillRecommendations",
                value
              )
            }
            icon={Bot}
          />

          <SettingToggle
            title="AI Explanation"
            description="Show confidence, contributing factors and recommendation reasons."
            checked={settings.showAiExplanation}
            onChange={(value) =>
              updateSetting("showAiExplanation", value)
            }
            icon={Eye}
          />

          <SettingToggle
            title="Human Approval Required"
            description="Require recruiter or placement officer approval before final shortlisting."
            checked={settings.humanApprovalRequired}
            onChange={(value) =>
              updateSetting(
                "humanApprovalRequired",
                value
              )
            }
            icon={ShieldCheck}
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Decision Thresholds
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <label className="font-bold text-neutral-900">
              Minimum AI Confidence
            </label>

            <p className="mt-1 text-sm text-neutral-500">
              Minimum confidence required to display an AI
              recommendation.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <input
                type="range"
                min="50"
                max="100"
                value={settings.minimumAiConfidence}
                onChange={(event) =>
                  updateSetting(
                    "minimumAiConfidence",
                    Number(event.target.value)
                  )
                }
                className="flex-1 accent-blue-600"
              />

              <span className="w-14 rounded-lg bg-blue-50 px-2 py-1 text-center font-bold text-blue-700">
                {settings.minimumAiConfidence}%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <label className="font-bold text-neutral-900">
              Shortlist Score
            </label>

            <p className="mt-1 text-sm text-neutral-500">
              Default score required for a candidate to be
              recommended.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <input
                type="range"
                min="40"
                max="100"
                value={settings.shortlistThreshold}
                onChange={(event) =>
                  updateSetting(
                    "shortlistThreshold",
                    Number(event.target.value)
                  )
                }
                className="flex-1 accent-purple-600"
              />

              <span className="w-14 rounded-lg bg-purple-50 px-2 py-1 text-center font-bold text-purple-700">
                {settings.shortlistThreshold}%
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <label className="font-bold text-neutral-900">
              Maximum Recommendations
            </label>

            <p className="mt-1 text-sm text-neutral-500">
              Maximum opportunities suggested per student.
            </p>

            <input
              type="number"
              min="5"
              max="100"
              value={settings.maximumRecommendations}
              onChange={(event) =>
                updateSetting(
                  "maximumRecommendations",
                  Number(event.target.value)
                )
              }
              className="mt-5 w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          AI Automation
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <SettingToggle
            title="Automatic Shortlisting"
            description="Automatically move candidates above the configured score into the shortlist."
            checked={settings.allowAiAutoShortlisting}
            onChange={(value) =>
              updateSetting(
                "allowAiAutoShortlisting",
                value
              )
            }
            icon={SlidersHorizontal}
          />

          <div className="rounded-2xl border border-neutral-200 p-5">
            <p className="font-bold text-neutral-900">
              Active AI Model
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Current model used for platform intelligence
              features.
            </p>

            <div className="mt-4 flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4">
              <div>
                <p className="font-bold text-neutral-900">
                  {settings.aiModelVersion}
                </p>

                <p className="mt-1 text-xs text-emerald-700">
                  Operational and monitored
                </p>
              </div>

              <CheckCircle2
                size={22}
                className="text-emerald-600"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderDataSettings = () => (
    <div className="space-y-8">
      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Backup Configuration
            </h2>

            <p className="mt-1 text-sm text-neutral-600">
              Protect platform records using scheduled encrypted
              backups.
            </p>
          </div>

          <button
            type="button"
            onClick={runManualBackup}
            disabled={!settings.allowManualBackup}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Upload size={18} />
            Run Manual Backup
          </button>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <SettingToggle
            title="Automatic Backup"
            description="Create scheduled backups of platform databases and configuration."
            checked={settings.automaticBackup}
            onChange={(value) =>
              updateSetting("automaticBackup", value)
            }
            icon={Cloud}
          />

          <SettingToggle
            title="Encrypt Backups"
            description="Encrypt backup archives before transferring them to storage."
            checked={settings.encryptBackups}
            onChange={(value) =>
              updateSetting("encryptBackups", value)
            }
            icon={FileLock2}
          />

          <SettingToggle
            title="Allow Manual Backup"
            description="Allow administrators to create an immediate backup."
            checked={settings.allowManualBackup}
            onChange={(value) =>
              updateSetting("allowManualBackup", value)
            }
            icon={Upload}
          />

          <SettingToggle
            title="Automatic Cleanup"
            description="Remove expired temporary files and outdated backup archives."
            checked={settings.automaticCleanup}
            onChange={(value) =>
              updateSetting("automaticCleanup", value)
            }
            icon={Trash2}
          />
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Backup Frequency
            </label>

            <select
              value={settings.backupFrequency}
              onChange={(event) =>
                updateSetting(
                  "backupFrequency",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>Every 6 Hours</option>
              <option>Every 12 Hours</option>
              <option>Daily</option>
              <option>Weekly</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Backup Time
            </label>

            <input
              type="time"
              value={settings.backupTime}
              onChange={(event) =>
                updateSetting(
                  "backupTime",
                  event.target.value
                )
              }
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Backup Retention
            </label>

            <div className="relative">
              <input
                type="number"
                min="7"
                value={settings.backupRetentionDays}
                onChange={(event) =>
                  updateSetting(
                    "backupRetentionDays",
                    Number(event.target.value)
                  )
                }
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-16 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-500">
                days
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Data Retention
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Define how long operational and compliance information is
          retained.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <p className="font-bold text-neutral-900">
              Audit Logs
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Security and administrator events.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min="90"
                value={settings.auditRetentionDays}
                onChange={(event) =>
                  updateSetting(
                    "auditRetentionDays",
                    Number(event.target.value)
                  )
                }
                className="w-32 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="font-semibold text-neutral-500">
                days
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <p className="font-bold text-neutral-900">
              Notifications
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Platform notification history.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min="30"
                value={settings.notificationRetentionDays}
                onChange={(event) =>
                  updateSetting(
                    "notificationRetentionDays",
                    Number(event.target.value)
                  )
                }
                className="w-32 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="font-semibold text-neutral-500">
                days
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 p-5">
            <p className="font-bold text-neutral-900">
              Inactive User Records
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Archived inactive account information.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <input
                type="number"
                min="365"
                value={settings.inactiveUserRetentionDays}
                onChange={(event) =>
                  updateSetting(
                    "inactiveUserRetentionDays",
                    Number(event.target.value)
                  )
                }
                className="w-32 rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />

              <span className="font-semibold text-neutral-500">
                days
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Storage Management
        </h2>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div className="rounded-2xl border border-neutral-200 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-bold text-neutral-900">
                  Storage Usage
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  642 GB of 1 TB platform storage used.
                </p>
              </div>

              <span className="font-bold text-blue-700">64.2%</span>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full w-[64.2%] rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-neutral-700">
                Warning Threshold
              </label>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="60"
                  max="95"
                  value={settings.storageWarningThreshold}
                  onChange={(event) =>
                    updateSetting(
                      "storageWarningThreshold",
                      Number(event.target.value)
                    )
                  }
                  className="max-w-md flex-1 accent-blue-600"
                />

                <span className="w-14 rounded-lg bg-blue-50 px-2 py-1 text-center font-bold text-blue-700">
                  {settings.storageWarningThreshold}%
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={clearTemporaryData}
            className="inline-flex h-fit items-center justify-center gap-2 rounded-xl border border-rose-300 px-5 py-3 font-semibold text-rose-700 hover:bg-rose-50"
          >
            <Trash2 size={18} />
            Clear Temporary Data
          </button>
        </div>
      </section>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-neutral-900">
          Connected Services
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Manage external services used by the CampusTE platform.
        </p>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {integrations.map((integration) => {
            const IntegrationIcon = integration.icon;

            return (
              <article
                key={integration.id}
                className="rounded-2xl border border-neutral-200 p-5"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                        integration.connected
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      <IntegrationIcon size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-neutral-900">
                        {integration.name}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-neutral-500">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      integration.connected
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-neutral-100 text-neutral-600"
                    }`}
                  >
                    {integration.connected
                      ? "Connected"
                      : "Disconnected"}
                  </span>
                </div>

                <div className="mt-5 rounded-xl bg-neutral-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    Connected Account
                  </p>

                  <p className="mt-1 font-semibold text-neutral-800">
                    {integration.account}
                  </p>

                  <p className="mt-2 text-xs text-neutral-500">
                    Last sync: {integration.lastSync}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap justify-end gap-3">
                  {integration.connected && (
                    <button
                      type="button"
                      onClick={() =>
                        syncIntegration(integration.id)
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
                    >
                      <RefreshCw size={16} />
                      Sync
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      toggleIntegration(integration.id)
                    }
                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                      integration.connected
                        ? "border border-rose-300 text-rose-700 hover:bg-rose-50"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {integration.connected
                      ? "Disconnect"
                      : "Connect"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-neutral-200 pt-8">
        <h2 className="text-2xl font-bold text-neutral-900">
          Webhook API
        </h2>

        <p className="mt-1 text-sm text-neutral-600">
          Configure a secure endpoint for selected CampusTE
          platform events.
        </p>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-semibold text-neutral-700">
              Webhook Endpoint
            </label>

            <input
              type="url"
              placeholder="https://your-domain.com/api/campuste-events"
              className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="button"
            onClick={() =>
              showMessage(
                "Webhook endpoint test completed successfully."
              )
            }
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100"
          >
            <Webhook size={18} />
            Test Endpoint
          </button>
        </div>
      </section>
    </div>
  );

  const renderActiveContent = () => {
    switch (activeTab) {
      case "General":
        return renderGeneralSettings();
      case "Access":
        return renderAccessSettings();
      case "Security":
        return renderSecuritySettings();
      case "Notifications":
        return renderNotificationSettings();
      case "AI & Automation":
        return renderAiSettings();
      case "Data & Backup":
        return renderDataSettings();
      case "Integrations":
        return renderIntegrations();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Settings2 size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Platform Configuration
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Administrator Settings
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Configure platform identity, access policies,
                security, communication, AI services and data
                management.
              </p>

              <p className="mt-4 flex items-center gap-2 text-sm text-blue-100">
                <Clock3 size={16} />
                Last saved: {lastSaved}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={exportSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={18} />
                Export Settings
              </button>

              <button
                type="button"
                onClick={resetSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <RefreshCw size={18} />
                Reset Defaults
              </button>

              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Save size={18} />
                Save Settings
              </button>
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

      <div className="grid gap-8 xl:grid-cols-[300px_1fr]">
        <aside className="h-fit rounded-3xl border border-neutral-200 bg-white p-4 shadow-sm xl:sticky xl:top-6">
          <div className="px-3 py-3">
            <h2 className="font-bold text-neutral-900">
              Settings Sections
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              Select a configuration category.
            </p>
          </div>

          <nav className="mt-2 space-y-2">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.name;

              return (
                <button
                  key={tab.name}
                  type="button"
                  onClick={() => setActiveTab(tab.name)}
                  className={`flex w-full items-start gap-3 rounded-2xl px-4 py-4 text-left transition ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <TabIcon
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <span>
                    <span className="block font-bold">
                      {tab.name}
                    </span>

                    <span
                      className={`mt-1 block text-xs leading-5 ${
                        isActive
                          ? "text-blue-100"
                          : "text-neutral-500"
                      }`}
                    >
                      {tab.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-5 rounded-2xl bg-neutral-950 p-5 text-white">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <ShieldCheck size={20} />
            </div>

            <p className="mt-4 font-bold">
              Protected Configuration
            </p>

            <p className="mt-2 text-xs leading-5 text-neutral-300">
              All administrator setting changes should be recorded
              in platform audit logs.
            </p>
          </div>
        </aside>

        <main className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-8 flex flex-col gap-4 border-b border-neutral-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">
                {activeTab}
              </p>

              <h2 className="mt-2 text-3xl font-bold text-neutral-900">
                {activeTab} Settings
              </h2>
            </div>

            <button
              type="button"
              onClick={saveSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>

          {renderActiveContent()}

          <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-neutral-500">
              Changes apply to the entire CampusTE platform.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={resetSettings}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Reset Defaults
              </button>

              <button
                type="button"
                onClick={saveSettings}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Save size={18} />
                Save Settings
              </button>
            </div>
          </div>
        </main>
      </div>

      {showMaintenanceDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <AlertTriangle size={23} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    Enable Maintenance Mode?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-neutral-600">
                    Students, recruiters, placement officers and
                    institution administrators will temporarily lose
                    access to the platform.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowMaintenanceDialog(false)
                }
                className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close maintenance confirmation"
              >
                <X size={20} />
              </button>
            </div>

            <div className="rounded-2xl bg-amber-50 p-5 mx-6 mt-6">
              <p className="font-bold text-amber-900">
                Administrator access remains available
              </p>

              <p className="mt-1 text-sm leading-6 text-amber-700">
                Only authorised system administrators will be able
                to access the platform until maintenance mode is
                disabled.
              </p>
            </div>

            <div className="flex justify-end gap-3 p-6">
              <button
                type="button"
                onClick={() =>
                  setShowMaintenanceDialog(false)
                }
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={enableMaintenanceMode}
                className="rounded-xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
              >
                Enable Maintenance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;