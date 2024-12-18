import { useEffect, useState, useContext } from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import UserContext from "../../utils/dataStore";

function Notification({
  newNotification,
  setNewNotification,
  globalNotification,
  setGlobalNotification,
}) {
  const [notification, setNotification] = useState([]);
  const { user } = useContext(UserContext);

  const sortNotification = (userNotification, globalNotification) => {
    const notifications = [...userNotification, ...globalNotification];
    notifications.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    return notifications;
  };

  useEffect(() => {
    // Check if newNotification has valid properties
    if (newNotification.title) {
      if (newNotification.date !== globalNotification[0]?.date) {
        setNotification([newNotification, ...notification]);
        setGlobalNotification([newNotification, ...globalNotification]);
        setNewNotification({});
      }
    } else {
      if (!user.notifications || user.notifications.length === 0) {
        setNotification(
          sortNotification(user.notifications || [], globalNotification)
        );
      } else {
        setNotification(
          sortNotification(user.notifications, globalNotification)
        );
      }
    }
  }, [newNotification]);

  return (
    <div className="container py-5 mx-auto px-[3.5rem]">
      <h1
        className="text-2xl font-bold text-800 mb-6"
        style={{ color: "#6153CD" }}
      >
        Notifications
      </h1>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {notification.map((item, index) => (
          <NotificationCard
            key={index}
            title={item.title}
            description={item.description}
            date={item.date}
            type={item.type || "info"} // Default to "info" if type is not provided
          />
        ))}
      </div>
    </div>
  );
}

export default Notification;
