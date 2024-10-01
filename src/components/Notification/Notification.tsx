import { useEffect } from "react";
import styles from "./notification.module.css";

type NotificationProps = {
  id: number; 
  message: string;
  type: "success" | "error";
  onClose: (id: number) => void; 
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
    <div
      className={`${styles.notification} ${styles[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <p>{message}</p>
      <button
        className={styles.closeButton}
        onClick={() => onClose(id)}
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
}
