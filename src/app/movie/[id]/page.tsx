"use client";

import MovieDetails from "@/components/MovieDetails/MovieDetails";
import styles from "./page.module.css";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <div className={styles.page}>
      <MovieDetails id={params.id} />
    </div>
  );
}
