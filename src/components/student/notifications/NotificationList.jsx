import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

function NotificationList({
  notifications,
  onViewDetails,
}) {
  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onViewDetails={onViewDetails}
        />
      ))}

    </section>
  );
}

export default NotificationList;