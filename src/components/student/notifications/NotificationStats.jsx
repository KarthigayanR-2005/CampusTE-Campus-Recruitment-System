import {
    Bell,
    MailOpen,
    AlertTriangle,
    CalendarDays,
  } from "lucide-react";
  
  function NotificationStats({ notifications }) {
    const totalNotifications = notifications.length;
  
    const unreadNotifications = notifications.filter(
      (notification) => notification.status === "Unread"
    ).length;
  
    const highPriorityNotifications = notifications.filter(
      (notification) => notification.priority === "High"
    ).length;
  
    const todayNotifications = notifications.filter(
      (notification) => notification.date === "25 Jul 2026"
    ).length;
  
    const stats = [
      {
        title: "Total Notifications",
        value: totalNotifications,
        icon: Bell,
        color: "bg-blue-100 text-blue-600",
      },
      {
        title: "Unread",
        value: unreadNotifications,
        icon: MailOpen,
        color: "bg-green-100 text-green-600",
      },
      {
        title: "High Priority",
        value: highPriorityNotifications,
        icon: AlertTriangle,
        color: "bg-red-100 text-red-600",
      },
      {
        title: "Today's Alerts",
        value: todayNotifications,
        icon: CalendarDays,
        color: "bg-purple-100 text-purple-600",
      },
    ];
  
    return (
      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
  
          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
  
                <div>
  
                  <p className="text-sm text-neutral-500">
                    {stat.title}
                  </p>
  
                  <h2 className="mt-2 text-3xl font-bold text-neutral-800">
                    {stat.value}
                  </h2>
  
                </div>
  
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
                >
                  <Icon size={28} />
                </div>
  
              </div>
            </div>
          );
        })}
      </section>
    );
  }
  
  export default NotificationStats;