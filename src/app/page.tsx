import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./page.module.css";
import NotificationContainer from "@/components/Notification/NotificationContainer";

export default function Home() {
  return (
    <>
      <NotificationContainer />
      <main className={styles.page}>
        <Dashboard />
      </main>
    </>
  );
}
