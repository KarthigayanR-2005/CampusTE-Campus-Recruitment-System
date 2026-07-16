import {
    Bell,
    Briefcase,
    CalendarDays,
    Sparkles,
  } from "lucide-react";
  
  const notifications = [
    {
      title: "New Job Recommendation",
      description: "Google Software Engineer Internship matches your profile (98%).",
      time: "10 min ago",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Interview Scheduled",
      description: "Microsoft interview scheduled for 25 July at 10:00 AM.",
      time: "1 hour ago",
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "New Placement Drive",
      description: "TCS has opened registrations for the 2026 placement drive.",
      time: "Today",
      icon: Briefcase,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "System Notification",
      description: "Complete your certifications to improve your profile score.",
      time: "Yesterday",
      icon: Bell,
      color: "bg-yellow-100 text-yellow-600",
    },
  ];
  
  function NotificationsFeed() {
    return (
      <section className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
  
        <div className="mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            Notifications
          </h2>
  
          <p className="mt-1 text-neutral-600">
            Stay updated with your latest placement activities.
          </p>
        </div>
  
        <div className="space-y-5">
  
          {notifications.map((notification) => {
            const Icon = notification.icon;
  
            return (
              <div
                key={notification.title}
                className="flex gap-4 rounded-xl border border-neutral-100 p-4 transition hover:bg-neutral-50"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${notification.color}`}
                >
                  <Icon size={22} />
                </div>
  
                <div className="flex-1">
  
                  <div className="flex items-center justify-between">
  
                    <h3 className="font-semibold text-neutral-900">
                      {notification.title}
                    </h3>
  
                    <span className="text-xs text-neutral-500">
                      {notification.time}
                    </span>
  
                  </div>
  
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {notification.description}
                  </p>
  
                </div>
  
              </div>
            );
          })}
  
        </div>
  
      </section>
    );
  }
  
  export default NotificationsFeed;