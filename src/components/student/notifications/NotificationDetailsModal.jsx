import {
    X,
    Bell,
    Building2,
    CalendarDays,
    Clock3,
    AlertTriangle,
    Tag,
    MailOpen,
    ExternalLink,
  } from "lucide-react";
  
  function NotificationDetailsModal({
    notification,
    onClose,
  }) {
    if (!notification) return null;
  
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
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
  
        <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
  
          {/* Close Button */}
  
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full p-2 transition hover:bg-neutral-100"
          >
            <X size={22} />
          </button>
  
          {/* Header */}
  
          <div className="rounded-t-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white">
  
            <div className="flex items-center gap-4">
  
              <div className="rounded-2xl bg-white/20 p-4">
  
                <Bell size={30} />
  
              </div>
  
              <div>
  
                <h2 className="text-3xl font-bold">
                  {notification.title}
                </h2>
  
                <p className="mt-2 text-blue-100">
                  {notification.company}
                </p>
  
              </div>
  
            </div>
  
          </div>
  
          {/* Body */}
  
          <div className="space-y-8 p-8">
  
            {/* Message */}
  
            <section>
  
              <h3 className="mb-4 text-xl font-bold text-neutral-800">
                Notification Message
              </h3>
  
              <div className="rounded-2xl bg-neutral-50 p-5 text-neutral-700 leading-7">
                {notification.message}
              </div>
  
            </section>
  
            {/* Information */}
  
            <section>
  
              <h3 className="mb-5 text-xl font-bold text-neutral-800">
                Details
              </h3>
  
              <div className="grid gap-6 md:grid-cols-2">
  
                <div className="flex items-center gap-3">
  
                  <Building2
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Company
                    </p>
  
                    <p className="font-semibold">
                      {notification.company}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <Tag
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Category
                    </p>
  
                    <p className="font-semibold">
                      {notification.category}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <AlertTriangle
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Priority
                    </p>
  
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getPriorityStyle(
                        notification.priority
                      )}`}
                    >
                      {notification.priority}
                    </span>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <MailOpen
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Status
                    </p>
  
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusStyle(
                        notification.status
                      )}`}
                    >
                      {notification.status}
                    </span>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <CalendarDays
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Date
                    </p>
  
                    <p className="font-semibold">
                      {notification.date}
                    </p>
  
                  </div>
  
                </div>
  
                <div className="flex items-center gap-3">
  
                  <Clock3
                    className="text-blue-600"
                    size={20}
                  />
  
                  <div>
  
                    <p className="text-sm text-neutral-500">
                      Time
                    </p>
  
                    <p className="font-semibold">
                      {notification.time}
                    </p>
  
                  </div>
  
                </div>
  
              </div>
  
            </section>
  
            {/* Action */}
  
            <section>
  
              <h3 className="mb-4 text-xl font-bold text-neutral-800">
                Recommended Action
              </h3>
  
              <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white transition hover:scale-105">
  
                <ExternalLink size={18} />
  
                {notification.action}
  
              </button>
  
            </section>
  
          </div>
  
        </div>
  
      </div>
    );
  }
  
  export default NotificationDetailsModal;