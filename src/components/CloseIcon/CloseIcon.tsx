"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./close-icon.module.css";

export default function CloseIcon() {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
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
