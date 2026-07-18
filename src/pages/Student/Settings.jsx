import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { settings } from "../../data/settings";

import SettingsHero from "../../components/student/settings/SettingsHero";
import AccountSettings from "../../components/student/settings/AccountSettings";
import SecuritySettings from "../../components/student/settings/SecuritySettings";
import NotificationSettings from "../../components/student/settings/NotificationSettings";
import AppearanceSettings from "../../components/student/settings/AppearanceSettings";
import PrivacySettings from "../../components/student/settings/PrivacySettings";
import ConnectedAccounts from "../../components/student/settings/ConnectedAccounts";
import DangerZone from "../../components/student/settings/DangerZone";
import LogoutModal from "../../components/student/settings/LogoutModal";

function Settings() {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(false);

    // Later, clear JWT/token and user context here.
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    console.log("Delete account requested");

    // Later, open a dedicated account deletion confirmation modal
    // and connect it to the backend API.
  };

  return (
    <div className="space-y-8">
      <SettingsHero />

      <AccountSettings account={settings.account} />

      <SecuritySettings />

      <NotificationSettings settings={settings} />

      <AppearanceSettings settings={settings} />

      <PrivacySettings settings={settings} />

      <ConnectedAccounts settings={settings} />

      <DangerZone
        onLogout={() => setShowLogoutModal(true)}
        onDeleteAccount={handleDeleteAccount}
      />

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default Settings;