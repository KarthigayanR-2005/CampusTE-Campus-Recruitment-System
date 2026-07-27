import {
    useCallback,
    useEffect,
    useMemo,
    useState,
  } from "react";
  
  import {
    AlertCircle,
    Bell,
    BriefcaseBusiness,
    CalendarDays,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    ExternalLink,
    Eye,
    FileText,
    Inbox,
    LoaderCircle,
    Mail,
    MessageSquare,
    Search,
    ShieldCheck,
    Trash2,
    X,
  } from "lucide-react";
  
  import {
    useNavigate,
  } from "react-router-dom";
  
  import {
    useAuth,
  } from "../../context/AuthContext";
  
  import {
    deleteNotificationRequest,
    getNotificationRequest,
    getNotificationsRequest,
    markAllNotificationsReadRequest,
    markNotificationReadRequest,
    publishNotificationCount,
  } from "../../services/notificationService";
  
  const categoryInformation = {
    application: {
      label: "Application",
      icon: FileText,
      iconClass:
        "bg-blue-100 text-blue-700",
      badgeClass:
        "border-blue-200 bg-blue-50 text-blue-700",
    },
  
    interview: {
      label: "Interview",
      icon: CalendarDays,
      iconClass:
        "bg-purple-100 text-purple-700",
      badgeClass:
        "border-purple-200 bg-purple-50 text-purple-700",
    },
  
    job: {
      label: "Job",
      icon: BriefcaseBusiness,
      iconClass:
        "bg-cyan-100 text-cyan-700",
      badgeClass:
        "border-cyan-200 bg-cyan-50 text-cyan-700",
    },
  
    account: {
      label: "Account",
      icon: ShieldCheck,
      iconClass:
        "bg-emerald-100 text-emerald-700",
      badgeClass:
        "border-emerald-200 bg-emerald-50 text-emerald-700",
    },
  
    system: {
      label: "System",
      icon: MessageSquare,
      iconClass:
        "bg-neutral-100 text-neutral-700",
      badgeClass:
        "border-neutral-200 bg-neutral-100 text-neutral-700",
    },
  };
  
  const categoryFilters = [
    {
      value: "all",
      label: "All",
    },
    {
      value: "application",
      label: "Applications",
    },
    {
      value: "interview",
      label: "Interviews",
    },
    {
      value: "job",
      label: "Jobs",
    },
    {
      value: "account",
      label: "Account",
    },
    {
      value: "system",
      label: "System",
    },
  ];
  
  function getCategoryInformation(
    category
  ) {
    return (
      categoryInformation[
        category
      ] ||
      categoryInformation.system
    );
  }
  
  function formatDateTime(value) {
    if (!value) {
      return "Date unavailable";
    }
  
    const date =
      new Date(value);
  
    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return String(value);
    }
  
    return date.toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
  }
  
  function formatRelativeTime(value) {
    if (!value) {
      return "Recently";
    }
  
    const date =
      new Date(value);
  
    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Recently";
    }
  
    const difference =
      Date.now() -
      date.getTime();
  
    if (difference < 0) {
      return formatDateTime(
        value
      );
    }
  
    const minute =
      60 * 1000;
  
    const hour =
      60 * minute;
  
    const day =
      24 * hour;
  
    if (difference < minute) {
      return "Just now";
    }
  
    if (difference < hour) {
      const minutes =
        Math.floor(
          difference /
            minute
        );
  
      return `${minutes} minute${
        minutes === 1
          ? ""
          : "s"
      } ago`;
    }
  
    if (difference < day) {
      const hours =
        Math.floor(
          difference /
            hour
        );
  
      return `${hours} hour${
        hours === 1
          ? ""
          : "s"
      } ago`;
    }
  
    const days =
      Math.floor(
        difference /
          day
      );
  
    if (days <= 7) {
      return `${days} day${
        days === 1
          ? ""
          : "s"
      } ago`;
    }
  
    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }
  
  function NotificationCenter({
    portalLabel,
    description,
  }) {
    const navigate =
      useNavigate();
  
    const {
      token,
      logout,
    } = useAuth();
  
    const [
      notifications,
      setNotifications,
    ] = useState([]);
  
    const [
      unreadCount,
      setUnreadCount,
    ] = useState(0);
  
    const [
      searchTerm,
      setSearchTerm,
    ] = useState("");
  
    const [
      categoryFilter,
      setCategoryFilter,
    ] = useState("all");
  
    const [
      readFilter,
      setReadFilter,
    ] = useState("all");
  
    const [
      selectedNotification,
      setSelectedNotification,
    ] = useState(null);
  
    const [
      currentPage,
      setCurrentPage,
    ] = useState(1);
  
    const [
      isLoading,
      setIsLoading,
    ] = useState(true);
  
    const [
      isDetailsLoading,
      setIsDetailsLoading,
    ] = useState(false);
  
    const [
      activeActionId,
      setActiveActionId,
    ] = useState(null);
  
    const [
      isMarkingAll,
      setIsMarkingAll,
    ] = useState(false);
  
    const [
      errorMessage,
      setErrorMessage,
    ] = useState("");
  
    const [
      successMessage,
      setSuccessMessage,
    ] = useState("");
  
    const notificationsPerPage =
      6;
  
    const handleAuthenticationError =
      useCallback(
        (error) => {
          if (
            error.status !== 401
          ) {
            return false;
          }
  
          logout();
  
          navigate(
            "/login",
            {
              replace: true,
            }
          );
  
          return true;
        },
        [
          logout,
          navigate,
        ]
      );
  
    const showSuccess =
      useCallback(
        (message) => {
          setSuccessMessage(
            message
          );
  
          window.setTimeout(
            () => {
              setSuccessMessage(
                ""
              );
            },
            3000
          );
        },
        []
      );
  
    const loadNotifications =
      useCallback(async () => {
        if (!token) {
          setIsLoading(false);
          return;
        }
  
        setIsLoading(true);
        setErrorMessage("");
  
        try {
          const response =
            await getNotificationsRequest({
              token,
              filter: "all",
              limit: 100,
            });
  
          const receivedNotifications =
            Array.isArray(
              response.notifications
            )
              ? response.notifications
              : [];
  
          const receivedUnreadCount =
            Number(
              response.unreadCount ||
              0
            );
  
          setNotifications(
            receivedNotifications
          );
  
          setUnreadCount(
            receivedUnreadCount
          );
  
          publishNotificationCount(
            receivedUnreadCount
          );
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }
  
          setErrorMessage(
            error.message ||
              "Unable to retrieve notifications."
          );
        } finally {
          setIsLoading(false);
        }
      }, [
        token,
        handleAuthenticationError,
      ]);
  
    useEffect(() => {
      loadNotifications();
    }, [loadNotifications]);
  
    const filteredNotifications =
      useMemo(() => {
        const search =
          searchTerm
            .trim()
            .toLowerCase();
  
        return notifications.filter(
          (notification) => {
            const searchText = [
              notification.title,
              notification.message,
              notification.category,
              notification.type,
              notification.actor
                ?.fullName,
              notification.metadata
                ?.companyName,
              notification.metadata
                ?.jobTitle,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();
  
            const matchesSearch =
              !search ||
              searchText.includes(
                search
              );
  
            const matchesCategory =
              categoryFilter ===
                "all" ||
              notification.category ===
                categoryFilter;
  
            const matchesRead =
              readFilter ===
                "all" ||
              (
                readFilter ===
                  "unread" &&
                !notification.isRead
              ) ||
              (
                readFilter ===
                  "read" &&
                notification.isRead
              );
  
            return (
              matchesSearch &&
              matchesCategory &&
              matchesRead
            );
          }
        );
      }, [
        notifications,
        searchTerm,
        categoryFilter,
        readFilter,
      ]);
  
    const statistics =
      useMemo(
        () => ({
          total:
            notifications.length,
  
          unread:
            unreadCount,
  
          interviews:
            notifications.filter(
              (notification) =>
                notification.category ===
                "interview"
            ).length,
  
          applications:
            notifications.filter(
              (notification) =>
                notification.category ===
                "application"
            ).length,
        }),
        [
          notifications,
          unreadCount,
        ]
      );
  
    const totalPages =
      Math.max(
        1,
        Math.ceil(
          filteredNotifications.length /
            notificationsPerPage
        )
      );
  
    useEffect(() => {
      setCurrentPage(1);
    }, [
      searchTerm,
      categoryFilter,
      readFilter,
    ]);
  
    useEffect(() => {
      setCurrentPage(
        (previousPage) =>
          Math.min(
            previousPage,
            totalPages
          )
      );
    }, [totalPages]);
  
    const startIndex =
      (
        currentPage -
        1
      ) *
      notificationsPerPage;
  
    const paginatedNotifications =
      filteredNotifications.slice(
        startIndex,
        startIndex +
          notificationsPerPage
      );
  
    const replaceNotification = (
      updatedNotification
    ) => {
      setNotifications(
        (
          previousNotifications
        ) =>
          previousNotifications.map(
            (notification) =>
              notification.notificationId ===
              updatedNotification.notificationId
                ? updatedNotification
                : notification
          )
      );
  
      setSelectedNotification(
        (
          previousNotification
        ) =>
          previousNotification
            ?.notificationId ===
          updatedNotification.notificationId
            ? updatedNotification
            : previousNotification
      );
    };
  
    const handleMarkRead =
      async (notification) => {
        if (
          notification.isRead
        ) {
          return notification;
        }
  
        setActiveActionId(
          notification.notificationId
        );
  
        setErrorMessage("");
  
        try {
          const response =
            await markNotificationReadRequest({
              token,
  
              notificationId:
                notification.notificationId,
            });
  
          replaceNotification(
            response.notification
          );
  
          setUnreadCount(
            Number(
              response.unreadCount ||
              0
            )
          );
  
          return response.notification;
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return null;
          }
  
          setErrorMessage(
            error.message ||
              "Unable to mark the notification as read."
          );
  
          return null;
        } finally {
          setActiveActionId(
            null
          );
        }
      };
  
    const handleOpenNotification =
      async (notification) => {
        setSelectedNotification(
          notification
        );
  
        setIsDetailsLoading(
          true
        );
  
        setErrorMessage("");
  
        try {
          const response =
            await getNotificationRequest({
              token,
  
              notificationId:
                notification.notificationId,
            });
  
          let detailedNotification =
            response.notification;
  
          if (
            !detailedNotification.isRead
          ) {
            const readResponse =
              await markNotificationReadRequest({
                token,
  
                notificationId:
                  notification.notificationId,
              });
  
            detailedNotification =
              readResponse.notification;
  
            setUnreadCount(
              Number(
                readResponse.unreadCount ||
                0
              )
            );
          }
  
          replaceNotification(
            detailedNotification
          );
  
          setSelectedNotification(
            detailedNotification
          );
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }
  
          setErrorMessage(
            error.message ||
              "Unable to retrieve notification details."
          );
        } finally {
          setIsDetailsLoading(
            false
          );
        }
      };
  
    const handleMarkAllRead =
      async () => {
        if (
          unreadCount === 0
        ) {
          return;
        }
  
        setIsMarkingAll(true);
        setErrorMessage("");
  
        try {
          const response =
            await markAllNotificationsReadRequest({
              token,
            });
  
          setNotifications(
            (
              previousNotifications
            ) =>
              previousNotifications.map(
                (notification) => ({
                  ...notification,
                  isRead: true,
  
                  readAt:
                    notification.readAt ||
                    new Date()
                      .toISOString(),
                })
              )
          );
  
          setSelectedNotification(
            (
              previousNotification
            ) =>
              previousNotification
                ? {
                    ...previousNotification,
                    isRead: true,
  
                    readAt:
                      previousNotification.readAt ||
                      new Date()
                        .toISOString(),
                  }
                : null
          );
  
          setUnreadCount(
            Number(
              response.unreadCount ||
              0
            )
          );
  
          showSuccess(
            response.message ||
              "All notifications were marked as read."
          );
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }
  
          setErrorMessage(
            error.message ||
              "Unable to update notifications."
          );
        } finally {
          setIsMarkingAll(
            false
          );
        }
      };
  
    const handleDelete =
      async (notification) => {
        const confirmed =
          window.confirm(
            "Delete this notification?"
          );
  
        if (!confirmed) {
          return;
        }
  
        setActiveActionId(
          notification.notificationId
        );
  
        setErrorMessage("");
  
        try {
          const response =
            await deleteNotificationRequest({
              token,
  
              notificationId:
                notification.notificationId,
            });
  
          setNotifications(
            (
              previousNotifications
            ) =>
              previousNotifications.filter(
                (currentNotification) =>
                  currentNotification.notificationId !==
                  notification.notificationId
              )
          );
  
          setSelectedNotification(
            (
              previousNotification
            ) =>
              previousNotification
                ?.notificationId ===
              notification.notificationId
                ? null
                : previousNotification
          );
  
          setUnreadCount(
            Number(
              response.unreadCount ||
              0
            )
          );
  
          showSuccess(
            response.message ||
              "Notification deleted successfully."
          );
        } catch (error) {
          if (
            handleAuthenticationError(
              error
            )
          ) {
            return;
          }
  
          setErrorMessage(
            error.message ||
              "Unable to delete the notification."
          );
        } finally {
          setActiveActionId(
            null
          );
        }
      };
  
    const handleOpenAction = (
      notification
    ) => {
      const actionUrl =
        String(
          notification.actionUrl ||
          ""
        ).trim();
  
      if (!actionUrl) {
        return;
      }
  
      setSelectedNotification(
        null
      );
  
      if (
        actionUrl.startsWith(
          "/"
        )
      ) {
        navigate(
          actionUrl
        );
  
        return;
      }
  
      if (
        /^https?:\/\//i.test(
          actionUrl
        )
      ) {
        window.open(
          actionUrl,
          "_blank",
          "noopener,noreferrer"
        );
      }
    };
  
    const resetFilters = () => {
      setSearchTerm("");
      setCategoryFilter(
        "all"
      );
      setReadFilter(
        "all"
      );
      setCurrentPage(1);
    };
  
    if (isLoading) {
      return (
        <div className="flex min-h-[500px] flex-col items-center justify-center rounded-3xl border border-neutral-200 bg-white">
          <LoaderCircle
            size={42}
            className="animate-spin text-blue-700"
          />
  
          <h2 className="mt-5 text-xl font-bold text-neutral-900">
            Loading notifications
          </h2>
  
          <p className="mt-2 text-neutral-600">
            Retrieving notification
            activity from MySQL.
          </p>
        </div>
      );
    }
  
    return (
      <>
        <div className="space-y-8">
          {successMessage && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 font-semibold text-emerald-700"
            >
              <CheckCircle2
                size={20}
              />
  
              {successMessage}
            </div>
          )}
  
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-5 py-4 font-semibold text-rose-700"
            >
              <AlertCircle
                size={20}
                className="mt-0.5 shrink-0"
              />
  
              <div className="flex-1">
                <p>
                  {errorMessage}
                </p>
  
                <button
                  type="button"
                  onClick={() =>
                    setErrorMessage(
                      ""
                    )
                  }
                  className="mt-2 text-sm underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
  
          <section className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 px-6 py-10 text-white sm:px-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                      <Bell
                        size={25}
                      />
                    </div>
  
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
                      {portalLabel}
                    </p>
                  </div>
  
                  <h1 className="mt-5 text-3xl font-bold sm:text-4xl">
                    Notifications
                  </h1>
  
                  <p className="mt-3 max-w-2xl text-blue-100">
                    {description}
                  </p>
                </div>
  
                <button
                  type="button"
                  onClick={
                    handleMarkAllRead
                  }
                  disabled={
                    unreadCount ===
                      0 ||
                    isMarkingAll
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isMarkingAll ? (
                    <LoaderCircle
                      size={19}
                      className="animate-spin"
                    />
                  ) : (
                    <CheckCircle2
                      size={19}
                    />
                  )}
  
                  Mark All as Read
                </button>
              </div>
            </div>
          </section>
  
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatisticCard
              icon={Bell}
              label="Total Notifications"
              value={
                statistics.total
              }
              style="bg-blue-100 text-blue-700"
            />
  
            <StatisticCard
              icon={Mail}
              label="Unread"
              value={
                statistics.unread
              }
              style="bg-amber-100 text-amber-700"
            />
  
            <StatisticCard
              icon={
                CalendarDays
              }
              label="Interview Updates"
              value={
                statistics.interviews
              }
              style="bg-purple-100 text-purple-700"
            />
  
            <StatisticCard
              icon={FileText}
              label="Application Updates"
              value={
                statistics.applications
              }
              style="bg-emerald-100 text-emerald-700"
            />
          </section>
  
          <section className="rounded-3xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 p-6 sm:p-8">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    Notification Inbox
                  </h2>
  
                  <p className="mt-1 text-sm text-neutral-600">
                    Search and manage
                    your account
                    notifications.
                  </p>
                </div>
  
                <div className="relative w-full xl:max-w-md">
                  <Search
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                  />
  
                  <input
                    type="text"
                    value={
                      searchTerm
                    }
                    onChange={(
                      event
                    ) =>
                      setSearchTerm(
                        event.target
                          .value
                      )
                    }
                    placeholder="Search notifications"
                    className="w-full rounded-xl border border-neutral-300 py-3 pl-12 pr-4 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                  />
                </div>
              </div>
  
              <div className="mt-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-3">
                  {categoryFilters.map(
                    (category) => (
                      <button
                        key={
                          category.value
                        }
                        type="button"
                        onClick={() =>
                          setCategoryFilter(
                            category.value
                          )
                        }
                        className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                          categoryFilter ===
                          category.value
                            ? "bg-blue-600 text-white"
                            : "border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50"
                        }`}
                      >
                        {
                          category.label
                        }
                      </button>
                    )
                  )}
                </div>
  
                <select
                  value={
                    readFilter
                  }
                  onChange={(
                    event
                  ) =>
                    setReadFilter(
                      event.target
                        .value
                    )
                  }
                  className="rounded-xl border border-neutral-300 bg-white px-4 py-3 font-semibold text-neutral-700 outline-none"
                >
                  <option value="all">
                    All Statuses
                  </option>
  
                  <option value="unread">
                    Unread
                  </option>
  
                  <option value="read">
                    Read
                  </option>
                </select>
              </div>
            </div>
  
            {paginatedNotifications.length >
            0 ? (
              <div className="divide-y divide-neutral-100">
                {paginatedNotifications.map(
                  (
                    notification
                  ) => {
                    const category =
                      getCategoryInformation(
                        notification.category
                      );
  
                    const NotificationIcon =
                      category.icon;
  
                    const isWorking =
                      activeActionId ===
                      notification.notificationId;
  
                    return (
                      <article
                        key={
                          notification.notificationId
                        }
                        className={`relative px-6 py-6 transition hover:bg-neutral-50 sm:px-8 ${
                          notification.isRead
                            ? "bg-white"
                            : "bg-blue-50/40"
                        }`}
                      >
                        {!notification.isRead && (
                          <span className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
                        )}
  
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                          <button
                            type="button"
                            onClick={() =>
                              handleOpenNotification(
                                notification
                              )
                            }
                            className="flex min-w-0 flex-1 items-start gap-4 text-left"
                          >
                            <div
                              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.iconClass}`}
                            >
                              <NotificationIcon
                                size={22}
                              />
                            </div>
  
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col gap-2 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="font-bold text-neutral-900">
                                      {
                                        notification.title
                                      }
                                    </h3>
  
                                    {!notification.isRead && (
                                      <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                                    )}
                                  </div>
  
                                  <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-600">
                                    {
                                      notification.message
                                    }
                                  </p>
                                </div>
  
                                <p className="flex shrink-0 items-center gap-2 text-xs font-medium text-neutral-500">
                                  <Clock3
                                    size={14}
                                  />
  
                                  {formatRelativeTime(
                                    notification.createdAt
                                  )}
                                </p>
                              </div>
  
                              <div className="mt-4 flex flex-wrap items-center gap-3">
                                <span
                                  className={`rounded-full border px-3 py-1 text-xs font-bold ${category.badgeClass}`}
                                >
                                  {
                                    category.label
                                  }
                                </span>
  
                                {notification.actor
                                  ?.fullName && (
                                  <span className="text-xs text-neutral-500">
                                    From{" "}
                                    {
                                      notification.actor.fullName
                                    }
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
  
                          <div className="flex shrink-0 items-center justify-end gap-2">
                            {isWorking ? (
                              <LoaderCircle
                                size={20}
                                className="animate-spin text-blue-600"
                              />
                            ) : (
                              <>
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenNotification(
                                      notification
                                    )
                                  }
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-300 text-neutral-600 hover:bg-blue-50 hover:text-blue-700"
                                  aria-label="View notification"
                                >
                                  <Eye
                                    size={17}
                                  />
                                </button>
  
                                {!notification.isRead && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleMarkRead(
                                        notification
                                      )
                                    }
                                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                    aria-label="Mark as read"
                                  >
                                    <CheckCircle2
                                      size={17}
                                    />
                                  </button>
                                )}
  
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      notification
                                    )
                                  }
                                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100"
                                  aria-label="Delete notification"
                                >
                                  <Trash2
                                    size={17}
                                  />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  }
                )}
              </div>
            ) : (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-500">
                  <Inbox
                    size={30}
                  />
                </div>
  
                <h3 className="mt-5 text-xl font-bold text-neutral-900">
                  No notifications found
                </h3>
  
                <p className="mt-2 text-neutral-600">
                  No notifications
                  currently match the
                  selected filters.
                </p>
  
                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}
  
            {filteredNotifications.length >
              0 && (
              <div className="flex flex-col gap-4 border-t border-neutral-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                <p className="text-sm text-neutral-600">
                  Showing{" "}
                  {startIndex + 1}{" "}
                  to{" "}
                  {Math.min(
                    startIndex +
                      notificationsPerPage,
                    filteredNotifications.length
                  )}{" "}
                  of{" "}
                  {
                    filteredNotifications.length
                  }
                </p>
  
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            page - 1,
                            1
                          )
                      )
                    }
                    className="rounded-xl border border-neutral-300 p-2 disabled:opacity-40"
                    aria-label="Previous page"
                  >
                    <ChevronLeft
                      size={19}
                    />
                  </button>
  
                  <span className="rounded-xl bg-neutral-100 px-4 py-2 text-sm font-semibold">
                    Page{" "}
                    {currentPage}{" "}
                    of {totalPages}
                  </span>
  
                  <button
                    type="button"
                    disabled={
                      currentPage ===
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            page + 1,
                            totalPages
                          )
                      )
                    }
                    className="rounded-xl border border-neutral-300 p-2 disabled:opacity-40"
                    aria-label="Next page"
                  >
                    <ChevronRight
                      size={19}
                    />
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
  
        {selectedNotification && (
          <NotificationDetailsModal
            notification={
              selectedNotification
            }
            isLoading={
              isDetailsLoading
            }
            onClose={() =>
              setSelectedNotification(
                null
              )
            }
            onDelete={
              handleDelete
            }
            onOpenAction={
              handleOpenAction
            }
          />
        )}
      </>
    );
  }
  
  function StatisticCard({
    icon: Icon,
    label,
    value,
    style,
  }) {
    return (
      <article className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${style}`}
        >
          <Icon size={22} />
        </div>
  
        <p className="mt-6 text-3xl font-bold text-neutral-900">
          {value}
        </p>
  
        <p className="mt-1 text-sm font-medium text-neutral-600">
          {label}
        </p>
      </article>
    );
  }
  
  function NotificationDetailsModal({
    notification,
    isLoading,
    onClose,
    onDelete,
    onOpenAction,
  }) {
    const category =
      getCategoryInformation(
        notification.category
      );
  
    const NotificationIcon =
      category.icon;
  
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/60 p-4 backdrop-blur-sm">
        <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
          <div className="flex items-start justify-between border-b border-neutral-200 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${category.iconClass}`}
              >
                <NotificationIcon
                  size={22}
                />
              </div>
  
              <div>
                <h2 className="text-2xl font-bold text-neutral-900">
                  {notification.title}
                </h2>
  
                <p className="mt-2 flex items-center gap-2 text-sm text-neutral-500">
                  <Clock3
                    size={15}
                  />
  
                  {formatDateTime(
                    notification.createdAt
                  )}
                </p>
              </div>
            </div>
  
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl p-2 text-neutral-500 hover:bg-neutral-100"
              aria-label="Close notification"
            >
              <X size={21} />
            </button>
          </div>
  
          {isLoading && (
            <div className="flex items-center justify-center gap-3 border-b bg-blue-50 px-6 py-4 font-semibold text-blue-700">
              <LoaderCircle
                size={19}
                className="animate-spin"
              />
  
              Loading complete details
            </div>
          )}
  
          <div className="space-y-6 p-6 sm:p-8">
            <p className="leading-7 text-neutral-700">
              {notification.message}
            </p>
  
            <div className="grid gap-4 sm:grid-cols-2">
              <InformationCard
                title="Category"
                value={
                  category.label
                }
              />
  
              <InformationCard
                title="Status"
                value={
                  notification.isRead
                    ? "Read"
                    : "Unread"
                }
              />
  
              <InformationCard
                title="Sent By"
                value={
                  notification.actor
                    ?.fullName ||
                  "CampusTE System"
                }
              />
  
              <InformationCard
                title="Reference"
                value={
                  notification.reference
                    ?.type
                    ? `${notification.reference.type} #${
                        notification.reference.id ||
                        ""
                      }`
                    : "General notification"
                }
              />
  
              {notification.metadata
                ?.companyName && (
                <InformationCard
                  title="Company"
                  value={
                    notification.metadata.companyName
                  }
                />
              )}
  
              {notification.metadata
                ?.jobTitle && (
                <InformationCard
                  title="Position"
                  value={
                    notification.metadata.jobTitle
                  }
                />
              )}
            </div>
          </div>
  
          <div className="flex flex-wrap justify-end gap-3 border-t border-neutral-200 p-6 sm:px-8">
            <button
              type="button"
              onClick={() =>
                onDelete(
                  notification
                )
              }
              className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-3 font-semibold text-rose-700 hover:bg-rose-50"
            >
              <Trash2
                size={18}
              />
  
              Delete
            </button>
  
            {notification.actionUrl && (
              <button
                type="button"
                onClick={() =>
                  onOpenAction(
                    notification
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                <ExternalLink
                  size={18}
                />
  
                Open Related Page
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  function InformationCard({
    title,
    value,
  }) {
    return (
      <div className="rounded-2xl bg-neutral-50 p-4">
        <p className="text-sm font-semibold text-neutral-500">
          {title}
        </p>
  
        <p className="mt-2 font-medium text-neutral-900">
          {value ||
            "Not provided"}
        </p>
      </div>
    );
  }
  
  export default NotificationCenter;