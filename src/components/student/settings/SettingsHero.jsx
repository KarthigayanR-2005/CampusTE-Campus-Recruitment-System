import {
    Settings,
    ShieldCheck,
    BellRing,
    UserRoundCheck,
  } from "lucide-react";
  
  function SettingsHero() {
    return (
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 text-white shadow-lg">
        <div
          aria-hidden="true"
          className="absolute -right-12 -top-16 h-52 w-52 rounded-full bg-white/10 blur-3xl"
        />
  
        <div
          aria-hidden="true"
          className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl"
        />
  
        <div className="relative flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
          <div>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur">
              <Settings size={20} />
  
              <span className="font-semibold">
                Student Account Settings
              </span>
            </div>
  
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight lg:text-5xl">
              Manage Your Account, Privacy and Preferences
            </h1>
  
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Update your account details, strengthen security, manage
              notifications, control privacy, and personalize your CampusTE
              experience.
            </p>
          </div>
  
          <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[420px] lg:grid-cols-1 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur">
              <UserRoundCheck className="mx-auto" size={28} />
  
              <p className="mt-3 text-xl font-bold">
                Complete
              </p>
  
              <p className="mt-1 text-sm text-blue-100">
                Account Profile
              </p>
            </div>
  
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur">
              <ShieldCheck className="mx-auto" size={28} />
  
              <p className="mt-3 text-xl font-bold">
                Secure
              </p>
  
              <p className="mt-1 text-sm text-blue-100">
                Account Status
              </p>
            </div>
  
            <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-center backdrop-blur">
              <BellRing className="mx-auto" size={28} />
  
              <p className="mt-3 text-xl font-bold">
                Enabled
              </p>
  
              <p className="mt-1 text-sm text-blue-100">
                Placement Alerts
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default SettingsHero;