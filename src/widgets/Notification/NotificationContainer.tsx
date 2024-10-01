"use client";

import Notification from "./Notification";

// store
import { useNotificationStore } from "@/store/notification";

export default function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div aria-live="polite">
      {/* Render each notification */}
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={removeNotification}
        />
      ))}
    </div>
  );
}
