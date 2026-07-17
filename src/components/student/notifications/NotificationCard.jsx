import {
    Bell,
    Building2,
    CalendarDays,
    Clock3,
    Eye,
  } from "lucide-react";
  
  function NotificationCard({
    notification,
    onViewDetails,
  }) {
    const getPriorityStyle = (priority) => {
      switch (priority) {
        case "High":
          return "bg-red-100 text-red-700";
  
        case "Medium":
          return "bg-yellow-100 text-yellow-700";
  
        case "Low":
          return "bg-green-100 text-green-700";
  
        default:
          return "bg-neutral-100 text-neutral-700";
      }
    };
  
    const getStatusStyle = (status) => {
      return status === "Unread"
        ? "bg-blue-100 text-blue-700"
        : "bg-neutral-100 text-neutral-700";
    };
  
    return (
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
  
        {/* Header */}
  
        <div className="flex items-start justify-between">
  
          <div className="flex items-center gap-3">
  
            <div className="rounded-2xl bg-blue-100 p-3">
  
              <Bell
                className="text-blue-600"
                size={22}
              />
  
            </div>
  
            <div>
  
              <h2 className="text-lg font-bold text-neutral-800">
                {notification.title}
              </h2>
  
              <div className="mt-1 flex items-center gap-2 text-sm text-neutral-500">
  
                <Building2 size={16} />
  
                {notification.company}
  
              </div>
  
            </div>
  
          </div>
  
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
              notification.status
            )}`}
          >
            {notification.status}
          </span>
  
        </div>
  
        {/* Message */}
  
        <p className="mt-5 line-clamp-3 text-neutral-600">
          {notification.message}
        </p>
  
        {/* Badges */}
  
        <div className="mt-5 flex flex-wrap gap-3">
  
          <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700">
            {notification.category}
          </span>
  
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityStyle(
              notification.priority
            )}`}
          >
            {notification.priority}
          </span>
  
        </div>
  
        {/* Footer */}
  
        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5">
  
          <div className="space-y-2 text-sm text-neutral-500">
  
            <div className="flex items-center gap-2">
  
              <CalendarDays size={16} />
  
              {notification.date}
  
            </div>
  
            <div className="flex items-center gap-2">
  
              <Clock3 size={16} />
  
              {notification.time}
  
            </div>
  
          </div>
  
          <button
            onClick={() => onViewDetails(notification)}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 font-semibold text-white transition hover:scale-105"
          >
  
            <Eye size={18} />
  
            View
  
          </button>
  
        </div>
  
      </div>
    );
  }
  
  export default NotificationCard;