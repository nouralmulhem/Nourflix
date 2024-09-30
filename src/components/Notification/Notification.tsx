import { useEffect } from "react";
import styles from "./notification.module.css";

type NotificationProps = {
  id: number; // Unique ID for the notification
  message: string;
  type: "success" | "error";
  onClose: (id: number) => void; // Function to close the notification
};

export default function Notification(props: NotificationProps) {
  const { id, message, type, onClose } = props;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id); // Close the notification after 5 seconds
    }, 5000);

    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <p>{message}</p>
    </div>
  );
}
