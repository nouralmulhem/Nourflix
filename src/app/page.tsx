import React from "react";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <Dashboard />
    </main>
  );
}
