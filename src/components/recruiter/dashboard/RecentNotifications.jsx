import {
    Bell,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    AlertTriangle,
    UserPlus,
  } from "lucide-react";
  
  const notifications = [
    {
      id: 1,
      title: "New Application Received",
      message: "Karthigayan R applied for Frontend Developer.",
      time: "5 min ago",
      icon: UserPlus,
      color: "bg-blue-100 text-blue-700",
    },
    {
      id: 2,
      title: "Interview Reminder",
      message: "Interview with Priya Sharma starts in 30 minutes.",
      time: "30 min ago",
      icon: CalendarDays,
      color: "bg-purple-100 text-purple-700",
    },
    {
      id: 3,
      title: "Offer Accepted",
      message: "Rahul Verma has accepted the Software Engineer offer.",
      time: "2 hrs ago",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-700",
    },
    {
      id: 4,
      title: "Job Closing Soon",
      message: "Backend Developer posting closes tomorrow.",
      time: "Today",
      icon: AlertTriangle,
      color: "bg-orange-100 text-orange-700",
    },
    {
      id: 5,
      title: "High Application Volume",
      message: "UI/UX Designer role has crossed 150 applicants.",
      time: "Today",
      icon: BriefcaseBusiness,
      color: "bg-pink-100 text-pink-700",
    },
  ];
  
  function RecentNotifications() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Recent Notifications
            </h2>
  
            <p className="mt-2 text-neutral-500">
              Stay updated with your recruitment activities.
            </p>
          </div>
  
          <Bell className="text-blue-600" size={28} />
        </div>
  
        <div className="space-y-5">
          {notifications.map((notification) => {
            const Icon = notification.icon;
  
            return (
              <div
                key={notification.id}
                className="flex items-start gap-4 rounded-xl border border-neutral-200 p-4 transition hover:border-blue-300 hover:bg-neutral-50"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${notification.color}`}
                >
                  <Icon size={22} />
                </div>
  
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">
                    {notification.title}
                  </h3>
  
                  <p className="mt-1 text-sm leading-6 text-neutral-600">
                    {notification.message}
                  </p>
  
                  <span className="mt-2 inline-block text-xs text-neutral-400">
                    {notification.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  
  export default RecentNotifications;