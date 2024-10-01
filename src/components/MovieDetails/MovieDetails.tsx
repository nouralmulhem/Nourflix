import Image from "next/image";
import styles from "./movie.module.css";
import React from "react";

// types
import { MovieData } from "@/utils/types";

// utils
import { convertMinutesToHours } from "@/utils/convertToHours";

// components
import CloseIcon from "@/components/CloseIcon/CloseIcon";
import StarRating from "@/components/StarRating/StarRating";
import dynamic from "next/dynamic";

const EmptyState = dynamic(() => import("@/components/EmptyState/EmptyState"));

type MovieDetailsProps = {
  movie: MovieData | undefined;
};

export default function MovieDetails(props: MovieDetailsProps) {
  const { movie } = props;

  if (!movie) {
    return (
      <>
        <CloseIcon />
        <EmptyState message="Movie not found." />{" "}
        {/* Show empty state if movie is undefined */}
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
        <div className={styles.poster}>
          <Image src={posterUrl} alt={`Poster of ${movie.title}`} fill />
        </div>

        <section className={styles.movieDetails}>
          <section className={styles.firstSection}>
            <h1>{movie.title}</h1>
            <div className={styles.subtitle}>
              <h4>{movie.tagline}</h4>
              <div className={styles.rating}>
                <StarRating rating={movie.vote_average} />
                {"|"}
                <p>{movie.release_date.slice(0, 4)}</p>
              </div>
            </div>
          </section>
          <section className={styles.secondSection}>
            <h3>Overview:</h3>
            <p>{movie.overview}</p>

            <section className={styles.subSection}>
              <div>
                <h3>Genres:</h3>
                <p>
                  {movie.genres
                    .slice(0, 2)
                    .map((e) => e.name)
                    .join(", ")}{" "}
                  {/* Display first two genres */}
                </p>
              </div>

              <div>
                <h3>Runtime:</h3>
                <p>{convertMinutesToHours(movie.runtime)} hours</p>
              </div>

              <div>
                <h3>Director:</h3>
                <p>
                  {movie.credits?.crew?.filter((e) => e.job === "Director")[0]
                    ?.name || "Unknown"}{" "}
                  {/* Display director's name or "Unknown" */}
                </p>
              </div>
            </section>

            <h3>Cast:</h3>
            <div className={styles.castContainer}>
              {movie.credits.cast.slice(0, 10).map((e) => (
                <div key={e.id} className={styles.castMember} title={e.name}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${e.profile_path}`}
                    alt={`Profile of ${e.name}`}
                    className={styles.castImage}
                    width={40}
                    height={60}
                  />
                </div>
              ))}
              {/* Display first 10 cast members */}
            </div>
          </section>
        </section>
      </article>
    </>
  );
}
