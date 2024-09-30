import Image from "next/image";
import styles from "./movie.module.css";
import React from "react";

// types
import { MovieDetailsType } from "@/utils/types";

// components
import EmptyState from "@/components/EmptyState/EmptyState";
import CloseIcon from "@/components/CloseIcon/CloseIcon";

type MovieDetailsProps = {
  movie: MovieDetailsType | undefined;
};

export default function MovieDetails(props: MovieDetailsProps) {
  const { movie } = props;

  if (!movie) {
    return (
      <>
        <CloseIcon />
        <EmptyState message="Movie not found." />
      </>
    );
  }

  const backdropUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`;
  const posterUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`;

  return (
    <>
      <CloseIcon />

      <article
        className={styles.movieContainer}
        style={{
          backgroundImage: `url(${backdropUrl})`, // Set backdrop image via inline style
        }}
      >
        <Image
          className={styles.poster}
          src={posterUrl}
          alt={`Poster of ${movie.title}`}
          width={400}
          height={600}
        />

        <section className={styles.movieDetails}>
          <h1>{movie.title}</h1>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <p>
            <strong>Synopsis:</strong> {movie.overview}
          </p>
          <p>
            <strong>Genres:</strong>
            {movie.genres.map((e) => e.name).join(", ")}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} minutes
          </p>
          <p>
            <strong>Cast:</strong>
            {movie.credits.cast.map((e) => e.name).join(", ")}
          </p>
          <p>
            <strong>Director:</strong>
            {movie.credits?.crew?.filter((e) => e.job === "Director")[0]
              ?.name || "Unknown"}
          </p>
        </section>
      </article>
    </>
  );
}
