"use client";

import MovieDetails from "@/components/MovieDetails/MovieDetails";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NotificationContainer from "@/components/Notification/NotificationContainer";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className={styles.page}>
      <div onClick={handleBackClick}>
        <Image
          className={styles.closeIcon}
          src={"/close-option.png"}
          alt={"close-icon"}
          width={50}
          height={50}
        />
      </div>
      <NotificationContainer />

      <MovieDetails id={params.id} />
    </div>
  );
}
