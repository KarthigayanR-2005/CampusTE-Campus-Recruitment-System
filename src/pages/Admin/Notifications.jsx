import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Bell,
  Building2,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  Eye,
  FilterX,
  GraduationCap,
  Mail,
  Megaphone,
  MessageSquareText,
  Plus,
  Search,
  Send,
  ShieldAlert,
  Trash2,
  UserCog,
  Users,
  UserSquare2,
  X,
} from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    title: "New institution registration",
    message:
      "Greenfield Institute of Technology has submitted its institution registration and accreditation documents for verification.",
    category: "Institution",
    priority: "High",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Institution Registration Service",
    timestamp: "20 Jul 2026, 5:42 PM",
    dateValue: "2026-07-20T17:42:00",
    actionLabel: "Review institution",
    referenceId: "GIT-SLM-014",
  },
  {
    id: 2,
    title: "Recruiter verification pending",
    message:
      "DataCraft Analytics has submitted company and recruiter documents. Administrator verification is required before recruitment access can be activated.",
    category: "Recruiter",
    priority: "High",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Recruiter Verification Service",
    timestamp: "20 Jul 2026, 5:18 PM",
    dateValue: "2026-07-20T17:18:00",
    actionLabel: "Review recruiter",
    referenceId: "REC-2026-0142",
  },
  {
    id: 3,
    title: "Placement officer account request",
    message:
      "Prof. Arun Kumar has requested placement officer access for Greenfield Institute of Technology.",
    category: "Placement Officer",
    priority: "Medium",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Account Management Service",
    timestamp: "20 Jul 2026, 4:52 PM",
    dateValue: "2026-07-20T16:52:00",
    actionLabel: "Review account",
    referenceId: "PO-2026-034",
  },
  {
    id: 4,
    title: "Suspicious login activity blocked",
    message:
      "Nine failed login attempts were detected for the DesignLoop Studios recruiter account. Access was temporarily blocked for security review.",
    category: "Security",
    priority: "Critical",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Security Monitoring Service",
    timestamp: "20 Jul 2026, 4:36 PM",
    dateValue: "2026-07-20T16:36:00",
    actionLabel: "View security event",
    referenceId: "SEC-2026-0842",
  },
  {
    id: 5,
    title: "Bulk student import completed",
    message:
      "CampusTE Institute of Technology successfully imported 242 student records. Six records were rejected due to validation errors.",
    category: "Student",
    priority: "Low",
    status: "Read",
    recipient: "System Administrators",
    sender: "Student Data Service",
    timestamp: "20 Jul 2026, 3:54 PM",
    dateValue: "2026-07-20T15:54:00",
    actionLabel: "View import summary",
    referenceId: "IMPORT-CSE-2026-07",
  },
  {
    id: 6,
    title: "File storage performance degraded",
    message:
      "The file storage service response time exceeded the configured threshold. Resume uploads remain available but may be slower than normal.",
    category: "System",
    priority: "High",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Infrastructure Monitor",
    timestamp: "20 Jul 2026, 3:28 PM",
    dateValue: "2026-07-20T15:28:00",
    actionLabel: "View system health",
    referenceId: "SYS-STORAGE-01",
  },
  {
    id: 7,
    title: "Recruiter account approved",
    message:
      "TechNova Solutions has completed verification. Recruiter access and job publishing permissions are active.",
    category: "Recruiter",
    priority: "Medium",
    status: "Read",
    recipient: "System Administrators",
    sender: "System Administrator",
    timestamp: "20 Jul 2026, 2:48 PM",
    dateValue: "2026-07-20T14:48:00",
    actionLabel: "View recruiter",
    referenceId: "REC-2026-0027",
  },
  {
    id: 8,
    title: "Placement drive published",
    message:
      "Infosphere Technologies published the Graduate Software Engineer 2026 placement drive for eight partner institutions.",
    category: "Recruitment",
    priority: "Low",
    status: "Read",
    recipient: "System Administrators",
    sender: "Recruitment Workflow Service",
    timestamp: "20 Jul 2026, 2:14 PM",
    dateValue: "2026-07-20T14:14:00",
    actionLabel: "View placement drive",
    referenceId: "DRV-2026-0186",
  },
  {
    id: 9,
    title: "Notification delivery partially failed",
    message:
      "Fourteen interview notification emails could not be delivered because recipient email addresses were unavailable.",
    category: "System",
    priority: "Medium",
    status: "Unread",
    recipient: "System Administrators",
    sender: "Notification Service",
    timestamp: "20 Jul 2026, 1:42 PM",
    dateValue: "2026-07-20T13:42:00",
    actionLabel: "Review delivery report",
    referenceId: "NTF-2026-7642",
  },
  {
    id: 10,
    title: "Administrator account created",
    message:
      "A new institution administrator account was created for Central Institute of Applied Sciences.",
    category: "User Management",
    priority: "Medium",
    status: "Read",
    recipient: "System Administrators",
    sender: "System Administrator",
    timestamp: "20 Jul 2026, 12:58 PM",
    dateValue: "2026-07-20T12:58:00",
    actionLabel: "View administrator",
    referenceId: "IA-2026-042",
  },
  {
    id: 11,
    title: "AI shortlisting completed",
    message:
      "The AI shortlisting engine processed 864 applications and recommended 218 candidates for the Software Engineer placement drive.",
    category: "Recruitment",
    priority: "Low",
    status: "Read",
    recipient: "System Administrators",
    sender: "AI Shortlisting Engine",
    timestamp: "19 Jul 2026, 6:44 PM",
    dateValue: "2026-07-19T18:44:00",
    actionLabel: "View shortlisting result",
    referenceId: "DRV-2026-0179",
  },
  {
    id: 12,
    title: "Institution access suspended",
    message:
      "Western Technical College platform access was suspended after an administrator compliance review.",
    category: "Institution",
    priority: "High",
    status: "Read",
    recipient: "System Administrators",
    sender: "System Administrator",
    timestamp: "19 Jul 2026, 5:26 PM",
    dateValue: "2026-07-19T17:26:00",
    actionLabel: "View institution",
    referenceId: "WTC-PNE-031",
  },
];

const emptyNotificationForm = {
  title: "",
  message: "",
  recipient: "All Platform Users",
  category: "Announcement",
  priority: "Medium",
  channel: "Portal Notification",
};

const categoryConfiguration = {
  Institution: {
    icon: Building2,
    className: "bg-purple-100 text-purple-700",
  },
  Recruiter: {
    icon: UserSquare2,
    className: "bg-blue-100 text-blue-700",
  },
  "Placement Officer": {
    icon: UserCog,
    className: "bg-amber-100 text-amber-700",
  },
  Security: {
    icon: ShieldAlert,
    className: "bg-rose-100 text-rose-700",
  },
  Student: {
    icon: GraduationCap,
    className: "bg-cyan-100 text-cyan-700",
  },
  System: {
    icon: AlertTriangle,
    className: "bg-orange-100 text-orange-700",
  },
  Recruitment: {
    icon: Megaphone,
    className: "bg-emerald-100 text-emerald-700",
  },
  "User Management": {
    icon: Users,
    className: "bg-indigo-100 text-indigo-700",
  },
  Announcement: {
    icon: Megaphone,
    className: "bg-fuchsia-100 text-fuchsia-700",
  },
};

const priorityStyles = {
  Low: "bg-neutral-100 text-neutral-600",
  Medium: "bg-blue-50 text-blue-700",
  High: "bg-amber-50 text-amber-700",
  Critical: "bg-rose-50 text-rose-700",
};

function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");
  const [statusFilter, setStatusFilter] =
    useState("All Statuses");
  const [priorityFilter, setPriorityFilter] =
    useState("All Priorities");
  const [selectedNotification, setSelectedNotification] =
    useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showComposeModal, setShowComposeModal] =
    useState(false);
  const [notificationForm, setNotificationForm] = useState(
    emptyNotificationForm
  );
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 6;

  const categories = useMemo(
    () => [
      "All Categories",
      ...new Set(
        notifications.map(
          (notification) => notification.category
        )
      ),
    ],
    [notifications]
  );

  const filteredNotifications = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title.toLowerCase().includes(query) ||
        notification.message.toLowerCase().includes(query) ||
        notification.sender.toLowerCase().includes(query) ||
        notification.referenceId.toLowerCase().includes(query);

      const matchesCategory =
        categoryFilter === "All Categories" ||
        notification.category === categoryFilter;

      const matchesStatus =
        statusFilter === "All Statuses" ||
        notification.status === statusFilter;

      const matchesPriority =
        priorityFilter === "All Priorities" ||
        notification.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesPriority
      );
    });
  }, [
    categoryFilter,
    notifications,
    priorityFilter,
    searchTerm,
    statusFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredNotifications.length / notificationsPerPage
    )
  );

  const startIndex = (currentPage - 1) * notificationsPerPage;

  const paginatedNotifications =
    filteredNotifications.slice(
      startIndex,
      startIndex + notificationsPerPage
    );

  const stats = {
    total: notifications.length,
    unread: notifications.filter(
      (notification) => notification.status === "Unread"
    ).length,
    highPriority: notifications.filter(
      (notification) =>
        notification.priority === "High" ||
        notification.priority === "Critical"
    ).length,
    security: notifications.filter(
      (notification) => notification.category === "Security"
    ).length,
  };

  const allVisibleSelected =
    paginatedNotifications.length > 0 &&
    paginatedNotifications.every((notification) =>
      selectedIds.includes(notification.id)
    );

  const showMessage = (text) => {
    setMessage(text);

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("All Categories");
    setStatusFilter("All Statuses");
    setPriorityFilter("All Priorities");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const toggleSelection = (notificationId) => {
    setSelectedIds((previousIds) =>
      previousIds.includes(notificationId)
        ? previousIds.filter(
            (id) => id !== notificationId
          )
        : [...previousIds, notificationId]
    );
  };

  const toggleVisibleSelection = () => {
    const visibleIds = paginatedNotifications.map(
      (notification) => notification.id
    );

    if (allVisibleSelected) {
      setSelectedIds((previousIds) =>
        previousIds.filter(
          (id) => !visibleIds.includes(id)
        )
      );

      return;
    }

    setSelectedIds((previousIds) => [
      ...new Set([...previousIds, ...visibleIds]),
    ]);
  };

  const updateNotificationStatus = (
    notificationId,
    status
  ) => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              status,
            }
          : notification
      )
    );

    setSelectedNotification((previousNotification) =>
      previousNotification?.id === notificationId
        ? {
            ...previousNotification,
            status,
          }
        : previousNotification
    );
  };

  const openNotification = (notification) => {
    updateNotificationStatus(notification.id, "Read");
    setSelectedNotification({
      ...notification,
      status: "Read",
    });
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
              status: "Read",
            }
          : notification
      )
    );

    setSelectedIds([]);
    showMessage("Selected notifications marked as read.");
  };

  const markAllAsRead = () => {
    setNotifications((previousNotifications) =>
      previousNotifications.map((notification) => ({
        ...notification,
        status: "Read",
      }))
    );

    setSelectedIds([]);
    showMessage("All notifications marked as read.");
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
        (notification) =>
          notification.id !== notificationId
      )
    );

    setSelectedIds((previousIds) =>
      previousIds.filter((id) => id !== notificationId)
    );

    setSelectedNotification(null);
    showMessage("Notification deleted successfully.");
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
        (notification) =>
          !selectedIds.includes(notification.id)
      )
    );

    setSelectedIds([]);
    showMessage(
      "Selected notifications deleted successfully."
    );
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setNotificationForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSendNotification = (event) => {
    event.preventDefault();

    if (
      !notificationForm.title.trim() ||
      !notificationForm.message.trim()
    ) {
      showMessage(
        "Enter a notification title and message."
      );
      return;
    }

    const newNotification = {
      id: Date.now(),
      title: notificationForm.title,
      message: notificationForm.message,
      category: notificationForm.category,
      priority: notificationForm.priority,
      status: "Read",
      recipient: notificationForm.recipient,
      sender: "System Administrator",
      timestamp: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date()),
      dateValue: new Date().toISOString(),
      actionLabel: "Administrator announcement",
      referenceId: `NTF-${Date.now()}`,
      channel: notificationForm.channel,
    };

    setNotifications((previousNotifications) => [
      newNotification,
      ...previousNotifications,
    ]);

    setNotificationForm(emptyNotificationForm);
    setShowComposeModal(false);
    setCurrentPage(1);
    showMessage("Notification sent successfully.");
  };

  const handleExport = () => {
    const headers = [
      "Title",
      "Message",
      "Category",
      "Priority",
      "Status",
      "Recipient",
      "Sender",
      "Timestamp",
      "Reference ID",
    ];

    const rows = filteredNotifications.map(
      (notification) => [
        notification.title,
        notification.message,
        notification.category,
        notification.priority,
        notification.status,
        notification.recipient,
        notification.sender,
        notification.timestamp,
        notification.referenceId,
      ]
    );

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map(
            (value) =>
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
    anchor.download = "campuste-admin-notifications.csv";
    anchor.click();

    URL.revokeObjectURL(downloadUrl);

    showMessage(
      "Notification history exported successfully."
    );
  };

  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                  <Bell size={26} />
                </div>

                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Communication Centre
                </p>
              </div>

              <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                Notifications
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-100 sm:text-base">
                Review platform alerts, security events,
                registration updates and administrator
                announcements.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={markAllAsRead}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/20"
              >
                <CheckCheck size={19} />
                Mark All Read
              </button>

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
                onClick={() => setShowComposeModal(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <Plus size={19} />
                Send Notification
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
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
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <AlertTriangle size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.highPriority}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            High-Priority Alerts
          </p>
        </article>

        <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <ShieldAlert size={22} />
          </div>

          <p className="mt-6 text-3xl font-bold text-neutral-900">
            {stats.security}
          </p>

          <p className="mt-1 text-sm font-medium text-neutral-600">
            Security Alerts
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
                Search and manage platform notifications and
                alerts.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 px-4 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-100"
            >
              <FilterX size={18} />
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
                placeholder="Search title, message, sender or reference ID..."
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
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setCurrentPage(1);
                setSelectedIds([]);
              }}
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Statuses</option>
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
              className="rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option>All Priorities</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-b border-neutral-200 bg-neutral-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={toggleVisibleSelection}
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
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-300 bg-white px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                <CheckCheck size={16} />
                Mark Read
              </button>

              <button
                type="button"
                onClick={deleteSelectedNotifications}
                className="inline-flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-100"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="divide-y divide-neutral-100">
          {paginatedNotifications.map((notification) => {
            const configuration =
              categoryConfiguration[
                notification.category
              ] || categoryConfiguration.Announcement;

            const CategoryIcon = configuration.icon;

            return (
              <article
                key={notification.id}
                className={`p-6 transition sm:px-8 ${
                  notification.status === "Unread"
                    ? "bg-blue-50/30"
                    : "bg-white"
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(
                      notification.id
                    )}
                    onChange={() =>
                      toggleSelection(notification.id)
                    }
                    className="mt-4 h-4 w-4 shrink-0 accent-blue-600"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      openNotification(notification)
                    }
                    className="flex min-w-0 flex-1 items-start gap-4 text-left"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${configuration.className}`}
                    >
                      <CategoryIcon size={22} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3
                              className={`text-base text-neutral-900 ${
                                notification.status === "Unread"
                                  ? "font-extrabold"
                                  : "font-bold"
                              }`}
                            >
                              {notification.title}
                            </h3>

                            {notification.status ===
                              "Unread" && (
                              <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                            )}
                          </div>

                          <p className="mt-2 max-w-4xl text-sm leading-6 text-neutral-600">
                            {notification.message}
                          </p>
                        </div>

                        <div className="shrink-0 text-left lg:text-right">
                          <p className="flex items-center gap-2 text-xs font-medium text-neutral-500 lg:justify-end">
                            <Clock3 size={14} />
                            {notification.timestamp}
                          </p>

                          <span
                            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                              priorityStyles[
                                notification.priority
                              ]
                            }`}
                          >
                            {notification.priority}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                        <span className="rounded-full bg-neutral-100 px-3 py-1 font-semibold text-neutral-600">
                          {notification.category}
                        </span>

                        <span className="rounded-full bg-neutral-100 px-3 py-1 font-semibold text-neutral-600">
                          From: {notification.sender}
                        </span>

                        <span className="rounded-full bg-neutral-100 px-3 py-1 font-semibold text-neutral-600">
                          {notification.referenceId}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="flex shrink-0 flex-col gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        openNotification(notification)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900"
                      aria-label="View notification"
                    >
                      <Eye size={19} />
                    </button>

                    {notification.status === "Unread" && (
                      <button
                        type="button"
                        onClick={() => {
                          updateNotificationStatus(
                            notification.id,
                            "Read"
                          );
                          showMessage(
                            "Notification marked as read."
                          );
                        }}
                        className="flex h-10 w-10 items-center justify-center rounded-xl text-emerald-600 transition hover:bg-emerald-50"
                        aria-label="Mark notification as read"
                      >
                        <Check size={19} />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        deleteNotification(notification.id)
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-rose-600 transition hover:bg-rose-50"
                      aria-label="Delete notification"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
              <Bell size={30} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-neutral-900">
              No notifications found
            </h3>

            <p className="mt-2 text-sm text-neutral-600">
              Try changing the search value or selected
              filters.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
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
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
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
          <div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex items-start gap-4">
                {(() => {
                  const configuration =
                    categoryConfiguration[
                      selectedNotification.category
                    ] ||
                    categoryConfiguration.Announcement;

                  const CategoryIcon = configuration.icon;

                  return (
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${configuration.className}`}
                    >
                      <CategoryIcon size={25} />
                    </div>
                  );
                })()}

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {selectedNotification.title}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                    <Clock3 size={15} />
                    {selectedNotification.timestamp}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-600">
                      {selectedNotification.category}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        priorityStyles[
                          selectedNotification.priority
                        ]
                      }`}
                    >
                      {selectedNotification.priority} priority
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close notification"
              >
                <X size={21} />
              </button>
            </div>

            <div className="space-y-7 p-6 sm:p-8">
              <section>
                <h3 className="text-lg font-bold text-neutral-900">
                  Notification Message
                </h3>

                <p className="mt-3 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 leading-7 text-neutral-600">
                  {selectedNotification.message}
                </p>
              </section>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Sender
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedNotification.sender}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Recipient
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedNotification.recipient}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Reference ID
                  </p>

                  <p className="mt-2 font-bold text-neutral-900">
                    {selectedNotification.referenceId}
                  </p>
                </div>

                <div className="rounded-2xl border border-neutral-200 p-5">
                  <p className="text-sm font-semibold text-neutral-500">
                    Notification Status
                  </p>

                  <p className="mt-2 font-bold text-emerald-700">
                    {selectedNotification.status}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <MessageSquareText
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <div>
                    <p className="font-bold text-blue-900">
                      Suggested action
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700">
                      {selectedNotification.actionLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() =>
                  deleteNotification(
                    selectedNotification.id
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl border border-rose-300 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
              >
                <Trash2 size={18} />
                Delete
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedNotification(null)
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <Check size={18} />
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
          <form
            onSubmit={handleSendNotification}
            className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  Send Notification
                </h2>

                <p className="mt-2 text-sm text-neutral-600">
                  Send a portal announcement or important update
                  to platform users.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowComposeModal(false);
                  setNotificationForm(
                    emptyNotificationForm
                  );
                }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-neutral-500 hover:bg-neutral-100"
                aria-label="Close notification form"
              >
                <X size={21} />
              </button>
            </div>

            <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Notification Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={notificationForm.title}
                  onChange={handleFormChange}
                  placeholder="Enter notification title"
                  className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Recipient Group
                </label>

                <select
                  name="recipient"
                  value={notificationForm.recipient}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>All Platform Users</option>
                  <option>All Students</option>
                  <option>All Recruiters</option>
                  <option>All Placement Officers</option>
                  <option>Institution Administrators</option>
                  <option>System Administrators</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Category
                </label>

                <select
                  name="category"
                  value={notificationForm.category}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Announcement</option>
                  <option>System</option>
                  <option>Security</option>
                  <option>Institution</option>
                  <option>Recruiter</option>
                  <option>Placement Officer</option>
                  <option>Student</option>
                  <option>Recruitment</option>
                  <option>User Management</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Priority
                </label>

                <select
                  name="priority"
                  value={notificationForm.priority}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Delivery Channel
                </label>

                <select
                  name="channel"
                  value={notificationForm.channel}
                  onChange={handleFormChange}
                  className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option>Portal Notification</option>
                  <option>Portal and Email</option>
                  <option>Email Only</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-neutral-700">
                  Message
                </label>

                <textarea
                  name="message"
                  value={notificationForm.message}
                  onChange={handleFormChange}
                  rows={6}
                  placeholder="Write the notification message..."
                  className="w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 leading-7 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="sm:col-span-2 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                <div className="flex items-start gap-3">
                  <Megaphone
                    size={21}
                    className="mt-0.5 shrink-0 text-blue-700"
                  />

                  <div>
                    <p className="font-bold text-blue-900">
                      Administrator announcement
                    </p>

                    <p className="mt-1 text-sm leading-6 text-blue-700">
                      The message will be delivered to the
                      selected user group through the chosen
                      communication channel.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
              <button
                type="button"
                onClick={() => {
                  setShowComposeModal(false);
                  setNotificationForm(
                    emptyNotificationForm
                  );
                }}
                className="rounded-xl border border-neutral-300 px-5 py-3 font-semibold text-neutral-700 hover:bg-neutral-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 px-5 py-3 font-semibold text-white hover:shadow-lg"
              >
                <Send size={18} />
                Send Notification
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Notifications;