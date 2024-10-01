import { create } from "zustand";

interface Notification {
  id: number; // Unique identifier for each notification
  message: string;
  type: "success" | "error";
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (message: string, type: "success" | "error") => void;
  removeNotification: (id: number) => void;
}

let nextId = 1; // To generate unique IDs for notifications

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (message: string, type: "success" | "error") => {
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: nextId++, message, type }, // Add new notification with unique ID
      ],
    }));
  },
  removeNotification: (id: number) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (notification) => notification.id !== id // Remove notification with the given ID
      ),
    }));
  },
}));
