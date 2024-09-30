"use client";

import { useNotificationStore } from "@/store/notification";
import Notification from "./Notification";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={removeNotification} // Pass the remove function
        />
      ))}
    </div>
  );
}
