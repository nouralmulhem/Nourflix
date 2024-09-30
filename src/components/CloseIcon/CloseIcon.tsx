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
    <div onClick={handleBackClick}>
      <Image
        className={styles.closeIcon}
        src={"/close-option.png"}
        alt={"close-icon"}
        width={50}
        height={50}
      />
    </div>
  );
}
