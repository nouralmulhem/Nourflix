// import Image from "next/image";
import Dashboard from "@/components/Dashboard/Dashboard";
import styles from "./page.module.css";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
