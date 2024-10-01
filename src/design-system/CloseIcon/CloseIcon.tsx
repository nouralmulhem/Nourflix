"use client";

import styles from "./close-icon.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CloseIcon() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back(); // Navigate back to the previous page
  };

  return (
    <button
      onClick={handleBackClick}
      className={styles.closeIcon}
      aria-label="Go back to the previous page"
    >
      <Image src="/close.png" alt="Close icon" width={50} height={50} />
    </button>
  );
}
