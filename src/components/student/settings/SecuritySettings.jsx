import { useState } from "react";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  ShieldCheck,
  Smartphone,
  Monitor,
  Save,
} from "lucide-react";

function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;

    setPasswordData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    console.log("Password change submitted:", passwordData);
  };

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
          <LockKeyhole size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-neutral-900">
            Security Settings
          </h2>

          <p className="mt-2 text-neutral-600">
            Manage your password, two-factor authentication, and active login
            sessions.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <PasswordField
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            placeholder="Enter current password"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            showPassword={showCurrentPassword}
            onToggle={() =>
              setShowCurrentPassword((previousValue) => !previousValue)
            }
          />

          <PasswordField
            id="newPassword"
            name="newPassword"
            label="New Password"
            placeholder="Enter new password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            showPassword={showNewPassword}
            onToggle={() =>
              setShowNewPassword((previousValue) => !previousValue)
            }
          />

          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            showPassword={showConfirmPassword}
            onToggle={() =>
              setShowConfirmPassword((previousValue) => !previousValue)
            }
          />
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg"
          >
            <Save size={18} />
            Update Password
          </button>
        </div>
      </form>

      <div className="my-10 border-t border-neutral-200" />

      <div className="flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-600">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-neutral-900">
              Two-Factor Authentication
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600">
              Add an extra layer of security by requiring a verification code
              when signing in from a new device.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setTwoFactorEnabled((previousValue) => !previousValue)
          }
          aria-pressed={twoFactorEnabled}
          className={`relative h-7 w-14 rounded-full transition ${
            twoFactorEnabled ? "bg-blue-600" : "bg-neutral-300"
          }`}
        >
          <span
            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
              twoFactorEnabled ? "left-8" : "left-1"
            }`}
          />
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-neutral-900">
          Recent Login Activity
        </h3>

        <p className="mt-1 text-sm text-neutral-600">
          Review devices that recently accessed your account.
        </p>

        <div className="mt-5 space-y-4">
          <LoginActivityItem
            icon={Monitor}
            device="Windows Desktop"
            location="Coimbatore, India"
            time="Current session"
            current
          />

          <LoginActivityItem
            icon={Smartphone}
            device="Android Mobile"
            location="Chennai, India"
            time="2 days ago"
          />
        </div>
      </div>
    </section>
  );
}

function PasswordField({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  showPassword,
  onToggle,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-neutral-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-blue-600"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function LoginActivityItem({
  icon: Icon,
  device,
  location,
  time,
  current = false,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
          <Icon size={21} />
        </div>

        <div>
          <h4 className="font-semibold text-neutral-900">
            {device}
          </h4>

          <p className="mt-1 text-sm text-neutral-500">
            {location}
          </p>
        </div>
      </div>

      <div className="sm:text-right">
        {current && (
          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Current
          </span>
        )}

        <p className="mt-1 text-sm text-neutral-500">
          {time}
        </p>
      </div>
    </div>
  );
}

export default SecuritySettings;