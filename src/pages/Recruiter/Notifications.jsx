import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Eye,
  Mail,
  MessageSquare,
  Search,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New application received",
    description:
      "Arjun Kumar applied for the Software Development Engineer position.",
    category: "Application",
    time: "10 minutes ago",
    date: "2026-07-20",
    read: false,
    priority: "Normal",
  },
  {
    id: 2,
    title: "Interview scheduled",
    description:
      "Rahul Menon's technical interview is scheduled for 22 July at 10:00 AM.",
    category: "Interview",
    time: "35 minutes ago",
    date: "2026-07-20",
    read: false,
    priority: "High",
  },
  {
    id: 3,
    title: "Candidate accepted invitation",
    description:
      "Priya Sharma accepted your invitation for the Frontend Developer Intern role.",
    category: "Candidate",
    time: "1 hour ago",
    date: "2026-07-20",
    read: false,
    priority: "Normal",
  },
  {
    id: 4,
    title: "Job closing soon",
    description:
      "The Frontend Developer Intern position will close in three days.",
    category: "Job",
    time: "2 hours ago",
    date: "2026-07-20",
    read: true,
    priority: "High",
  },
  {
    id: 5,
    title: "High application volume",
    description:
      "The Software Development Engineer role has received more than 100 applications.",
    category: "Alert",
    time: "3 hours ago",
    date: "2026-07-20",
    read: true,
    priority: "High",
  },
  {
    id: 6,
    title: "Interview reminder",
    description:
      "Vikram Singh's backend development interview begins tomorrow at 2:30 PM.",
    category: "Interview",
    time: "5 hours ago",
    date: "2026-07-20",
    read: true,
    priority: "High",
  },
  {
    id: 7,
    title: "Applicant shortlisted",
    description:
      "Meera Nair has been shortlisted for the Cybersecurity Analyst position.",
    category: "Candidate",
    time: "Yesterday",
    date: "2026-07-19",
    read: true,
    priority: "Normal",
  },
  {
    id: 8,
    title: "New application received",
    description:
      "Divya Krishnan applied for the Frontend Developer Intern position.",
    category: "Application",
    time: "Yesterday",
    date: "2026-07-19",
    read: true,
    priority: "Normal",
  },
  {
    id: 9,
    title: "Job published successfully",
    description:
      "The Cybersecurity Analyst opening is now visible to eligible students.",
    category: "Job",
    time: "2 days ago",
    date: "2026-07-18",
    read: true,
    priority: "Normal",
  },
  {
    id: 10,
    title: "Interview cancelled",
    description:
      "Rohit Kumar's Cloud Support Associate interview was cancelled.",
    category: "Alert",
    time: "2 days ago",
    date: "2026-07-18",
    read: true,
    priority: "High",
  },
  {
    id: 11,
    title: "Candidate profile updated",
    description:
      "Lakshmi Narayanan added new skills and updated the latest resume.",
    category: "Candidate",
    time: "3 days ago",
    date: "2026-07-17",
    read: true,
    priority: "Normal",
  },
  {
    id: 12,
    title: "Weekly recruitment summary",
    description:
      "Your weekly hiring summary is ready with applicant and interview analytics.",
    category: "System",
    time: "4 days ago",
    date: "2026-07-16",
    read: true,
    priority: "Normal",
  },
];

const categoryStyles = {
  Application: {
    icon: BriefcaseBusiness,
    iconClass: "bg-blue-100 text-blue-700",
    badgeClass: "border-blue-200 bg-blue-50 text-blue-700",
  },
  Interview: {
    icon: CalendarDays,
    iconClass: "bg-purple-100 text-purple-700",
    badgeClass: "border-purple-200 bg-purple-50 text-purple-700",
  },
  Candidate: {
    icon: UserCheck,
    iconClass: "bg-emerald-100 text-emerald-700",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  Job: {
    icon: BriefcaseBusiness,
    iconClass: "bg-cyan-100 text-cyan-700",
    badgeClass: "border-cyan-200 bg-cyan-50 text-cyan-700",
  },
  Alert: {
    icon: AlertTriangle,
    iconClass: "bg-rose-100 text-rose-700",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
  },
  System: {
    icon: MessageSquare,
    iconClass: "bg-neutral-100 text-neutral-700",
    badgeClass: "border-neutral-200 bg-neutral-100 text-neutral-700",
  },
};

function Notifications() {
  const [notifications, setNotifications] =
    useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [readFilter, setReadFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedNotification, setSelectedNotification] =
    useState(null);
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 6;

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(query) ||
        notification.description.toLowerCase().includes(query) ||
        notification.category.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        notification.category === categoryFilter;

      const matchesRead =
        readFilter === "All" ||
        (readFilter === "Unread" && !notification.read) ||
        (readFilter === "Read" && notification.read);

      return matchesSearch && matchesCategory && matchesRead;
    });
  }, [categoryFilter, notifications, readFilter, searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredNotifications.length / notificationsPerPage)
  );

  const startIndex = (currentPage - 1) * notificationsPerPage;

  const paginatedNotifications = filteredNotifications.slice(
    startIndex,
    startIndex + notificationsPerPage
  );

  const stats = {
    total: notifications.length,
    unread: notifications.filter(
      (notification) => !notification.read
    ).length,
    interviews: notifications.filter(
      (notification) => notification.category === "Interview"
    ).length,
    alerts: notifications.filter(
      (notification) => notification.priority === "High"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleCategoryFilter = (category) => {
    setCategoryFilter(category);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleReadFilter = (value) => {
    setReadFilter(value);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const markAsRead = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );

    setSelectedNotification((previousNotification) =>
      previousNotification?.id === notificationId
        ? { ...previousNotification, read: true }
        : previousNotification
    );
  };

  const toggleReadStatus = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              read: !notification.read,
            }
          : notification
      )
    );

    setSelectedNotification((previousNotification) =>
      previousNotification?.id === notificationId
        ? {
            ...previousNotification,
            read: !previousNotification.read,
          }
        : previousNotification
    );
  };

  const openNotification = (notification) => {
    setSelectedNotification({
      ...notification,
      read: true,
    });

    markAsRead(notification.id);
  };

  const deleteNotification = (notificationId) => {
    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );

    setSelectedIds((previousIds) =>
      previousIds.filter((id) => id !== notificationId)
    );

    if (selectedNotification?.id === notificationId) {
      setSelectedNotification(null);
    }

    showMessage("Notification deleted successfully.");
  };

  const toggleNotificationSelection = (notificationId) => {
    setSelectedIds((previousIds) =>
      previousIds.includes(notificationId)
        ? previousIds.filter((id) => id !== notificationId)
        : [...previousIds, notificationId]
    );
  };

  const allVisibleSelected =
    paginatedNotifications.length > 0 &&
    paginatedNotifications.every((notification) =>
      selectedIds.includes(notification.id)
    );

  const toggleSelectVisible = () => {
    const visibleIds = paginatedNotifications.map(
      (notification) => notification.id
    );

    if (allVisibleSelected) {
      setSelectedIds((previousIds) =>
        previousIds.filter((id) => !visibleIds.includes(id))
      );
      return;
    }

    setSelectedIds((previousIds) => [
      ...new Set([...previousIds, ...visibleIds]),
    ]);
  };

  const markSelectedAsRead = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        selectedIds.includes(notification.id)
          ? { ...notification, read: true }
          : notification
      )
    );

    setSelectedIds([]);
    showMessage("Selected notifications marked as read.");
  };

  const deleteSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const shouldDelete = window.confirm(
      `Delete ${selectedIds.length} selected notification(s)?`
    );

    if (!shouldDelete) {
      return;
    }

    setNotifications((previousNotifications) =>
      previousNotifications.filter(
        (notification) => !selectedIds.includes(notification.id)
      )
    );

    setSelectedIds([]);
    showMessage("Selected notifications deleted successfully.");
  };

  const markAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    showMessage("All notifications marked as read.");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setReadFilter("All");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bell size={25} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Notification Centre
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Stay updated on applications, interviews, candidates,
                job activity and important recruitment alerts.
              </p>
            </div>

            <button
              type="button"
              onClick={markAllAsRead}
              disabled={stats.unread === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
            >
              <CheckCircle2 size={19} />
              Mark All as Read
            </button>
          </div>
        </div>

        {message && (
          <div className="flex items-center gap-3 border-t border-neutral-200 bg-emerald-50 px-6 py-4 text-sm font-semibold text-emerald-800 sm:px-8">
            <CheckCircle2 size={19} />
            {message}
          </div>
        )}
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-700">
            <Bell size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.total}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Total Notifications
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Mail size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.unread}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Unread
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
            <CalendarDays size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.interviews}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Interview Updates
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <AlertTriangle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.alerts}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Priority Alerts
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Notification Inbox
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, filter and manage all recruitment notifications.
              </p>
            </div>

            <div className="relative w-full xl:max-w-md">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search notifications..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-3">
              {[
                "All",
                "Application",
                "Interview",
                "Candidate",
                "Job",
                "Alert",
                "System",
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => handleCategoryFilter(category)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    categoryFilter === category
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-neutral-300 bg-white text-neutral-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <select
              value={readFilter}
              onChange={(event) =>
                handleReadFilter(event.target.value)
              }
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 lg:w-40"
            >
              <option>All</option>
              <option>Unread</option>
              <option>Read</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleSelectVisible}
              className="h-4 w-4 accent-blue-600"
            />

            <span className="text-sm font-semibold text-neutral-700">
              Select visible notifications
            </span>
          </label>

          {selectedIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold text-blue-700">
                {selectedIds.length} selected
              </span>

              <button
                type="button"
                onClick={markSelectedAsRead}
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm font-semibold text-neutral-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              >
                <CheckCircle2 size={16} />
                Mark Read
              </button>

              <button
                type="button"
                onClick={deleteSelected}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        {paginatedNotifications.length > 0 ? (
          <div className="divide-y divide-neutral-100">
            {paginatedNotifications.map((notification) => {
              const category =
                categoryStyles[notification.category] ||
                categoryStyles.System;

              const NotificationIcon = category.icon;

              return (
                <article
                  key={notification.id}
                  className={`relative px-6 py-6 transition hover:bg-neutral-50 sm:px-8 ${
                    notification.read
                      ? "bg-white"
                      : "bg-blue-50/40"
                  }`}
                >
                  {!notification.read && (
                    <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
                  )}

                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(notification.id)}
                      onChange={() =>
                        toggleNotificationSelection(notification.id)
                      }
                      className="mt-4 h-4 w-4 shrink-0 accent-blue-600"
                    />

                    <button
                      type="button"
                      onClick={() => openNotification(notification)}
                      className="flex min-w-0 flex-1 items-start gap-4 text-left"
                    >
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.iconClass}`}
                      >
                        <NotificationIcon size={22} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <h3
                                className={`font-bold ${
                                  notification.read
                                    ? "text-neutral-800"
                                    : "text-neutral-950"
                                }`}
                              >
                                {notification.title}
                              </h3>

                              {!notification.read && (
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                              )}

                              {notification.priority === "High" && (
                                <span className="rounded-full bg-rose-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-700">
                                  Priority
                                </span>
                              )}
                            </div>

                            <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                              {notification.description}
                            </p>
                          </div>

                          <p className="flex shrink-0 items-center gap-2 text-xs font-medium text-neutral-500">
                            <Clock3 size={14} />
                            {notification.time}
                          </p>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <span
                            className={`rounded-full border px-3 py-1 text-xs font-bold ${category.badgeClass}`}
                          >
                            {notification.category}
                          </span>

                          <span className="text-xs text-neutral-400">
                            {notification.date}
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          openNotification(notification)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                        aria-label="View notification"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          toggleReadStatus(notification.id)
                        }
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl transition ${
                          notification.read
                            ? "bg-amber-50 text-amber-700 hover:bg-amber-100"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                        }`}
                        aria-label={
                          notification.read
                            ? "Mark as unread"
                            : "Mark as read"
                        }
                      >
                        {notification.read ? (
                          <Mail size={17} />
                        ) : (
                          <CheckCircle2 size={17} />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteNotification(notification.id)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-100"
                        aria-label="Delete notification"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Bell size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No notifications found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search term or selected filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}

        {filteredNotifications.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm text-neutral-600">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-neutral-900">
                {Math.min(
                  startIndex + notificationsPerPage,
                  filteredNotifications.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-neutral-900">
                {filteredNotifications.length}
              </span>{" "}
              notifications
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) => Math.max(page - 1, 1))
                }
                disabled={currentPage === 1}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={19} />
              </button>

              <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-700">
                Page {currentPage} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-700 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={19} />
              </button>
            </div>
          </div>
        )}
      </section>

      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                {(() => {
                  const category =
                    categoryStyles[selectedNotification.category] ||
                    categoryStyles.System;

                  const NotificationIcon = category.icon;

                  return (
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.iconClass}`}
                    >
                      <NotificationIcon size={22} />
                    </div>
                  );
                })()}

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedNotification.title}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                    <Clock3 size={15} />
                    {selectedNotification.time}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotification(null)}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100"
                aria-label="Close notification"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <p className="leading-7 text-neutral-700">
                  {selectedNotification.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Category
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedNotification.category}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Date
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedNotification.date}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Priority
                  </p>

                  <p
                    className={`mt-2 font-bold ${
                      selectedNotification.priority === "High"
                        ? "text-rose-700"
                        : "text-neutral-900"
                    }`}
                  >
                    {selectedNotification.priority}
                  </p>
                </div>

                <div className="rounded-2xl bg-neutral-50 p-4">
                  <p className="text-sm font-semibold text-neutral-500">
                    Status
                  </p>

                  <p className="mt-2 font-bold text-emerald-700">
                    {selectedNotification.read ? "Read" : "Unread"}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  toggleReadStatus(selectedNotification.id)
                }
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50"
              >
                <Mail size={18} />
                {selectedNotification.read
                  ? "Mark as Unread"
                  : "Mark as Read"}
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteNotification(selectedNotification.id)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
              >
                <Trash2 size={18} />
                Delete Notification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;