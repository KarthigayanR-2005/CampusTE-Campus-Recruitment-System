import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  GraduationCap,
  Mail,
  Search,
  Trash2,
  UserCheck,
  Users,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New recruiter registration",
    description:
      "DataCraft Analytics submitted a company and recruiter registration for placement verification.",
    category: "Recruiter",
    priority: "High",
    date: "2026-07-20",
    time: "10 minutes ago",
    read: false,
    actionLabel: "Review Recruiter",
  },
  {
    id: 2,
    title: "Placement drive registration closing",
    description:
      "Student registration for the TechNova Solutions drive closes tomorrow at 5:00 PM.",
    category: "Drive",
    priority: "High",
    date: "2026-07-20",
    time: "35 minutes ago",
    read: false,
    actionLabel: "View Drive",
  },
  {
    id: 3,
    title: "Student eligibility verification pending",
    description:
      "Rahul Menon's application requires academic and backlog verification.",
    category: "Application",
    priority: "Normal",
    date: "2026-07-20",
    time: "1 hour ago",
    read: false,
    actionLabel: "Verify Application",
  },
  {
    id: 4,
    title: "Interview schedule updated",
    description:
      "The technical interview for Divya Krishnan has been rescheduled to 24 July at 1:30 PM.",
    category: "Interview",
    priority: "Normal",
    date: "2026-07-20",
    time: "2 hours ago",
    read: false,
    actionLabel: "View Interview",
  },
  {
    id: 5,
    title: "Student selected",
    description:
      "Meera Nair was selected by SecureGrid Networks for the Cybersecurity Analyst role.",
    category: "Placement",
    priority: "High",
    date: "2026-07-20",
    time: "3 hours ago",
    read: true,
    actionLabel: "View Student",
  },
  {
    id: 6,
    title: "Placement offer uploaded",
    description:
      "Infosphere Technologies uploaded 12 new offer records for selected students.",
    category: "Placement",
    priority: "Normal",
    date: "2026-07-20",
    time: "5 hours ago",
    read: true,
    actionLabel: "Review Offers",
  },
  {
    id: 7,
    title: "Student profile incomplete",
    description:
      "18 placement-eligible students have profile completion below 70 percent.",
    category: "Student",
    priority: "Normal",
    date: "2026-07-19",
    time: "Yesterday",
    read: true,
    actionLabel: "View Students",
  },
  {
    id: 8,
    title: "Recruiter approved",
    description:
      "CloudAxis Systems was verified and approved for campus recruitment.",
    category: "Recruiter",
    priority: "Normal",
    date: "2026-07-19",
    time: "Yesterday",
    read: true,
    actionLabel: "View Recruiter",
  },
  {
    id: 9,
    title: "Interview cancelled",
    description:
      "Sneha Reddy's Cloud Support Associate interview was cancelled by the recruiter.",
    category: "Interview",
    priority: "High",
    date: "2026-07-19",
    time: "Yesterday",
    read: true,
    actionLabel: "Review Interview",
  },
  {
    id: 10,
    title: "Application volume increased",
    description:
      "The Software Development Engineer role has received more than 140 student applications.",
    category: "Application",
    priority: "Normal",
    date: "2026-07-18",
    time: "2 days ago",
    read: true,
    actionLabel: "View Applications",
  },
  {
    id: 11,
    title: "Placement drive completed",
    description:
      "The SecureGrid Networks placement drive was completed with 12 offers released.",
    category: "Drive",
    priority: "Normal",
    date: "2026-07-18",
    time: "2 days ago",
    read: true,
    actionLabel: "View Results",
  },
  {
    id: 12,
    title: "Weekly placement report ready",
    description:
      "The weekly placement analytics report is ready for review and export.",
    category: "System",
    priority: "Normal",
    date: "2026-07-17",
    time: "3 days ago",
    read: true,
    actionLabel: "View Analytics",
  },
  {
    id: 13,
    title: "Eligibility rule conflict",
    description:
      "Four applications do not satisfy the selected company's active backlog requirements.",
    category: "Alert",
    priority: "High",
    date: "2026-07-17",
    time: "3 days ago",
    read: true,
    actionLabel: "Review Applications",
  },
  {
    id: 14,
    title: "New student records imported",
    description:
      "126 student records were imported successfully into the placement portal.",
    category: "Student",
    priority: "Normal",
    date: "2026-07-16",
    time: "4 days ago",
    read: true,
    actionLabel: "View Students",
  },
];

const categoryConfig = {
  Recruiter: {
    icon: Building2,
    iconClass: "bg-purple-100 text-purple-700",
    badgeClass: "border-purple-200 bg-purple-50 text-purple-700",
  },
  Drive: {
    icon: BriefcaseBusiness,
    iconClass: "bg-blue-100 text-blue-700",
    badgeClass: "border-blue-200 bg-blue-50 text-blue-700",
  },
  Application: {
    icon: UserCheck,
    iconClass: "bg-cyan-100 text-cyan-700",
    badgeClass: "border-cyan-200 bg-cyan-50 text-cyan-700",
  },
  Interview: {
    icon: CalendarDays,
    iconClass: "bg-amber-100 text-amber-700",
    badgeClass: "border-amber-200 bg-amber-50 text-amber-700",
  },
  Placement: {
    icon: CheckCircle2,
    iconClass: "bg-emerald-100 text-emerald-700",
    badgeClass: "border-emerald-200 bg-emerald-50 text-emerald-700",
  },
  Student: {
    icon: GraduationCap,
    iconClass: "bg-indigo-100 text-indigo-700",
    badgeClass: "border-indigo-200 bg-indigo-50 text-indigo-700",
  },
  Alert: {
    icon: AlertTriangle,
    iconClass: "bg-rose-100 text-rose-700",
    badgeClass: "border-rose-200 bg-rose-50 text-rose-700",
  },
  System: {
    icon: Bell,
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
  const [priorityFilter, setPriorityFilter] = useState("All");
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

      const matchesPriority =
        priorityFilter === "All" ||
        notification.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRead &&
        matchesPriority
      );
    });
  }, [
    categoryFilter,
    notifications,
    priorityFilter,
    readFilter,
    searchTerm,
  ]);

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
    priority: notifications.filter(
      (notification) => notification.priority === "High"
    ).length,
    placement: notifications.filter(
      (notification) => notification.category === "Placement"
    ).length,
  };

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const openNotification = (notification) => {
    const updatedNotification = {
      ...notification,
      read: true,
    };

    setNotifications((previousNotifications) =>
      previousNotifications.map((item) =>
        item.id === notification.id
          ? updatedNotification
          : item
      )
    );

    setSelectedNotification(updatedNotification);
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

  const deleteNotification = (notificationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this notification?"
    );

    if (!confirmed) {
      return;
    }

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

  const toggleSelection = (notificationId) => {
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

  const markAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );

    showMessage("All notifications marked as read.");
  };

  const markSelectedAsRead = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        selectedIds.includes(notification.id)
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );

    setSelectedIds([]);
    showMessage("Selected notifications marked as read.");
  };

  const deleteSelectedNotifications = () => {
    if (selectedIds.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      `Delete ${selectedIds.length} selected notification(s)?`
    );

    if (!confirmed) {
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

  const handleNotificationAction = (notification) => {
    showMessage(`${notification.actionLabel} opened successfully.`);
    setSelectedNotification(null);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All");
    setReadFilter("All");
    setPriorityFilter("All");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleExport = () => {
    const headers = [
      "Title",
      "Description",
      "Category",
      "Priority",
      "Date",
      "Read Status",
    ];

    const rows = notifications.map((notification) => [
      notification.title,
      notification.description,
      notification.category,
      notification.priority,
      notification.date,
      notification.read ? "Read" : "Unread",
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const file = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const downloadUrl = URL.createObjectURL(file);
    const anchor = document.createElement("a");

    anchor.href = downloadUrl;
    anchor.download = "placement-notifications.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);
    showMessage("Notification report exported successfully.");
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-7 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bell size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Placement Updates
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Track important student, recruiter, application,
                interview and placement activity across the campus
                hiring portal.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <Download size={19} />
                Export
              </button>

              <button
                type="button"
                onClick={markAllAsRead}
                disabled={stats.unread === 0}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                <CheckCircle2 size={19} />
                Mark All Read
              </button>
            </div>
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
            Unread Notifications
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <AlertTriangle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.priority}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Priority Alerts
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <UserCheck size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.placement}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Placement Updates
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="border-b border-neutral-200 p-6 sm:p-8">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Notification Centre
              </h2>

              <p className="mt-1 text-sm text-neutral-600">
                Search, filter and manage placement portal
                notifications.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              Reset Filters
            </button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_220px_190px_190px]">
            <div className="relative">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                  setCurrentPage(1);
                  setSelectedIds([]);
                }}
                placeholder="Search notification title, category or description..."
                className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(event) => {
                setCategoryFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Recruiter</option>
              <option>Drive</option>
              <option>Application</option>
              <option>Interview</option>
              <option>Placement</option>
              <option>Student</option>
              <option>Alert</option>
              <option>System</option>
            </select>

            <select
              value={readFilter}
              onChange={(event) => {
                setReadFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>Unread</option>
              <option>Read</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(event) => {
                setPriorityFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All</option>
              <option>High</option>
              <option>Normal</option>
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
              <span className="text-sm font-bold text-blue-700">
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
                onClick={deleteSelectedNotifications}
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
                categoryConfig[notification.category] ||
                categoryConfig.System;

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
                        toggleSelection(notification.id)
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
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
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

                            <p className="mt-2 max-w-4xl text-sm leading-6 text-neutral-600">
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

                          <span className="text-xs font-medium text-neutral-400">
                            {notification.date}
                          </span>

                          <span className="text-xs font-semibold text-blue-700">
                            {notification.actionLabel}
                          </span>
                        </div>
                      </div>
                    </button>

                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => openNotification(notification)}
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
              Try changing the search query or selected filters.
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
                    categoryConfig[selectedNotification.category] ||
                    categoryConfig.System;

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
              <p className="leading-7 text-neutral-700">
                {selectedNotification.description}
              </p>

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
                    Read Status
                  </p>

                  <p
                    className={`mt-2 font-bold ${
                      selectedNotification.read
                        ? "text-emerald-700"
                        : "text-amber-700"
                    }`}
                  >
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
                  handleNotificationAction(selectedNotification)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 font-semibold text-white transition hover:shadow-lg"
              >
                <Eye size={18} />
                {selectedNotification.actionLabel}
              </button>

              <button
                type="button"
                onClick={() =>
                  deleteNotification(selectedNotification.id)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-5 py-3 font-semibold text-white transition hover:bg-rose-700"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notifications;