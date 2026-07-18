import {
    LogOut,
    Trash2,
    AlertTriangle,
  } from "lucide-react";
  
  function DangerZone({
    onLogout,
    onDeleteAccount,
  }) {
    return (
      <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle size={28} />
          </div>
  
          <div>
            <h2 className="text-2xl font-bold text-red-700">
              Danger Zone
            </h2>
  
            <p className="mt-2 max-w-2xl text-neutral-600">
              These actions affect your account access and stored profile data.
              Review them carefully before continuing.
            </p>
          </div>
        </div>
  
        <div className="space-y-5">
          <div className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900">
                Log Out of CampusTE
              </h3>
  
              <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">
                End your current session on this device. You can sign in again
                anytime using your registered account.
              </p>
            </div>
  
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white px-5 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              <LogOut size={18} />
              Log Out
            </button>
          </div>
  
          <div className="flex flex-col gap-5 rounded-2xl border border-red-200 bg-red-50 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-700">
                Delete Account
              </h3>
  
              <p className="mt-2 max-w-2xl text-sm leading-6 text-red-600">
                Permanently delete your account, profile, applications, resume,
                interview records, and preferences. This action cannot be undone.
              </p>
            </div>
  
            <button
              type="button"
              onClick={onDeleteAccount}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 hover:shadow-lg"
            >
              <Trash2 size={18} />
              Delete Account
            </button>
          </div>
        </div>
  
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm leading-6 text-red-700">
            <strong>Important:</strong> Account deletion should later require
            password confirmation and backend verification before any data is
            permanently removed.
          </p>
        </div>
      </section>
    );
  }
  
  export default DangerZone;