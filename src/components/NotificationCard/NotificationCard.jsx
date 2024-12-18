import React from "react";
import { FiBell, FiClock } from "react-icons/fi";

function NotificationCard({ title, description, date, type = "info" }) {
  const timeAgo = (date) => {
    const notificationDate = new Date(date);
    const currentUTC = new Date();
    const currentIST = new Date(currentUTC.getTime() + 5.5 * 60 * 60 * 1000);
    const diffInSeconds = Math.floor((currentIST.getTime() - notificationDate.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
    return `${Math.floor(diffInSeconds / 86400)} days`;
  };

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100";
      case "warning":
        return "bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100";
      case "error":
        return "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100";
      default:
        return "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100";
    }
  };

  return (
    <div className={`rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:shadow-lg dark:shadow-gray-700 ${getTypeStyles()}`}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <FiBell className="h-5 w-5" />
      </div>
      <p className="mt-2 text-sm">{description}</p>
      <div className="mt-4 flex items-center justify-end text-xs">
        <FiClock className="mr-1 h-4 w-4" />
        <span>{timeAgo(date)} ago</span>
      </div>
    </div>
  );
}

export default NotificationCard;
