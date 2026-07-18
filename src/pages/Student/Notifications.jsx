import { useMemo, useState } from "react";

import { notifications } from "../../data/notifications";

import NotificationsHero from "../../components/student/notifications/NotificationsHero";
import NotificationStats from "../../components/student/notifications/NotificationStats";
import NotificationSearch from "../../components/student/notifications/NotificationSearch";
import NotificationFilters from "../../components/student/notifications/NotificationFilters";
import NotificationList from "../../components/student/notifications/NotificationList";
import NotificationPagination from "../../components/student/notifications/NotificationPagination";
import NotificationDetailsModal from "../../components/student/notifications/NotificationDetailsModal";

function Notifications() {
  const [searchTerm, setSearchTerm] = useState("");

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedNotification, setSelectedNotification] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const notificationsPerPage = 6;

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        `${notification.title} ${notification.company} ${notification.message}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        notification.category === categoryFilter;

      const matchesPriority =
        priorityFilter === "All" ||
        notification.priority === priorityFilter;

      const matchesStatus =
        statusFilter === "All" ||
        notification.status === statusFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    categoryFilter,
    priorityFilter,
    statusFilter,
  ]);

  const totalPages = Math.ceil(
    filteredNotifications.length / notificationsPerPage
  );

  const paginatedNotifications = filteredNotifications.slice(
    (currentPage - 1) * notificationsPerPage,
    currentPage * notificationsPerPage
  );

  return (
    <div className="space-y-8">

      <NotificationsHero />

      <NotificationStats
        notifications={notifications}
      />

      <NotificationSearch
        searchTerm={searchTerm}
        setSearchTerm={(value) => {
          setSearchTerm(value);
          setCurrentPage(1);
        }}
      />

      <NotificationFilters
        categoryFilter={categoryFilter}
        setCategoryFilter={(value) => {
          setCategoryFilter(value);
          setCurrentPage(1);
        }}
        priorityFilter={priorityFilter}
        setPriorityFilter={(value) => {
          setPriorityFilter(value);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        setStatusFilter={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}
      />

      <NotificationList
        notifications={paginatedNotifications}
        onViewDetails={setSelectedNotification}
      />

      <NotificationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />

      <NotificationDetailsModal
        notification={selectedNotification}
        onClose={() => setSelectedNotification(null)}
      />

    </div>
  );
}

export default Notifications;