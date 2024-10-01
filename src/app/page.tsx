import React from "react";
import styles from "./page.module.css";

// components
import Dashboard from "@/components/Dashboard/Dashboard";

export default function Home() {
  return (
    <main className={styles.page}>
      <Dashboard />
    </main>
  );
}
