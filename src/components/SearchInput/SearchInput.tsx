"use client";
import { useRouter } from "next/navigation";
import { KeyboardEvent } from "react";
import styles from "./search.module.css";

export default function SearchInput() {
  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      router.push(`/search/${event.currentTarget.value}`);
    }
  };

  return (
    <input
      placeholder="Search ..."
      onKeyDown={handleKeyDown}
      className={styles.input}
    />
  );
}
