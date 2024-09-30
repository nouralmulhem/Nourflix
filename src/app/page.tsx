import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import NotificationContainer from "@/components/Notification/NotificationContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <NotificationContainer />

      <Header />

      <main className={styles.main}>
        <Dashboard />
      </main>
    </div>
  );
}
