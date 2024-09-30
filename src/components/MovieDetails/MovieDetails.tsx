"use client";

import Image from "next/image";
import styles from "./movie.module.css";

// types
import { MovieDetailsType } from "@/utils/types";

// components
import EmptyState from "@/components/EmptyState/EmptyState";

import { useRouter } from "next/navigation";
import NotificationContainer from "@/components/Notification/NotificationContainer";

type MovieDetailsProps = {
  movie: MovieDetailsType;
};

export default function MovieDetails(props: MovieDetailsProps) {
  const { movie } = props;

  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  if (!movie) {
    return <EmptyState message="Movie not Found." />;
  }

  const backdropUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`;
  const posterUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`;

  return (
    <>
      <NotificationContainer />

      <div onClick={handleBackClick}>
        <Image
          className={styles.closeIcon}
          src={"/close-option.png"}
          alt={"close-icon"}
          width={50}
          height={50}
        />
      </div>

      <div
        className={styles.movieContainer}
        style={{
          backgroundImage: `url(${backdropUrl})`, // Set backdrop image via inline style
        }}
      >
        <Image
          className={styles.poster}
          src={posterUrl}
          alt={`${movie.title} poster`}
          width={400}
          height={600}
        />

        <div className={styles.movieDetails}>
          <h1>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          <p>Synopsis: {movie.overview}</p>
          <p>Genre: {movie.genres.map((e) => e.name + ", ")}</p>
          <p>RunTime: {movie.runtime}</p>
          <p>Cast: {movie.credits.cast.map((e) => e.name + ", ")}</p>
          <p>
            Director:{" "}
            {movie.credits?.crew?.filter((e) => e.job === "Director")[0]
              ?.name || "Unknown"}
          </p>
        </div>
      </div>
    </>
  );
}
