import { Bell, CheckCircle2 } from "lucide-react";

function NotificationsHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-8 py-12 text-white shadow-lg">

      {/* Background Decorations */}

      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-12 left-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">

        {/* Left Section */}

        <div>

          <div className="mb-5 inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 backdrop-blur">

            <Bell size={20} />

            <span className="font-semibold">
              Student Notification Center
            </span>

          </div>

          <h1 className="max-w-2xl text-4xl font-bold leading-tight lg:text-5xl">

            Stay Updated with Every Placement Activity

          </h1>

          <p className="mt-5 max-w-2xl text-lg text-blue-100">

            Receive instant updates about interviews,
            applications, placement drives, AI recommendations,
            offers, assessments, and important announcements—
            all in one centralized dashboard.

          </p>

        </div>

        {/* Right Section */}

        <div className="grid grid-cols-2 gap-5">

          <div className="rounded-2xl bg-white/15 p-5 text-center backdrop-blur">

            <Bell
              className="mx-auto mb-3"
              size={30}
            />

            <h2 className="text-3xl font-bold">
              24
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Total Notifications
            </p>

          </div>

          <div className="rounded-2xl bg-white/15 p-5 text-center backdrop-blur">

            <CheckCircle2
              className="mx-auto mb-3"
              size={30}
            />

            <h2 className="text-3xl font-bold">
              10
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Unread Alerts
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default NotificationsHero;