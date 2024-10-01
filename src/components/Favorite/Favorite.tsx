"use client";

import React from "react";
import styles from "./favorite.module.css";
import Image from "next/image";
import { Movie } from "@/utils/types"; // Assuming you have a Movie type definition
import { useRouter } from "next/navigation"; // For navigating to individual movie pages
import { toggleFavorite } from "@/utils/toggleFavorite";
import { useNotificationStore } from "@/store/notification";
import { useState } from "react";
import CloseIcon from "../CloseIcon/CloseIcon";
import StarRating from "../StarRating/StarRating";
import EmptyState from "../EmptyState/EmptyState";

type FavoriteProps = {
  favoriteMovies: Movie[];
  updateFavoriteMovies: (newFavoriteMovies: Movie[]) => void;
};

export default function Favorite(props: FavoriteProps) {
  const { favoriteMovies, updateFavoriteMovies } = props;
  const [removingMovies, setRemovingMovies] = useState<number[]>([]);
  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const handleAddNotification = (title: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(`${title} has been removed from favorites`, "success");
  };

  const handleRemoveMovie = (movie: Movie) => {
    setRemovingMovies((prev) => [...prev, movie.id]);
    setTimeout(() => {
      toggleFavorite(favoriteMovies, movie, updateFavoriteMovies);
      handleAddNotification(movie.title);
      setRemovingMovies((prev) => prev.filter((id) => id !== movie.id));
    }, 500); // CSS fade-out duration
  };

  if (!favoriteMovies.length) {
    return <EmptyState message="You have no favorite movies." />;
  }

  return (
    <>
      <CloseIcon />

      <section
        className={styles.favoriteMoviesContainer}
        aria-label="Favorite Movies Section"
      >
        <h1 className={styles.pageTitle}>Your Favorite Movies</h1>

        <ul aria-label="Favorite Movies List" className={styles.moviesList}>
          {favoriteMovies.map((movie, index) => (
            <li key={movie.id}>
              <article
                className={`${styles.movieItem} ${
                  removingMovies.includes(movie.id) ? styles.fadeOut : ""
                }`}
                role="button"
                aria-label={`View details for ${movie.title}`}
                onClick={() => handleMovieClick(movie.id)}
              >
                <Image
                  className={styles.poster}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width={100}
                  height={150}
                />
                <div className={styles.details}>
                  <h2>{movie.title}</h2>
                  <p>{movie.overview}</p>
                  <div className={styles.rating}>
                    <StarRating rating={movie.vote_average} />
                    {"|"}
                    <p>{movie.release_date.slice(0, 4)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMovie(movie);
                  }}
                  className={styles.favoriteIcon}
                  aria-label={`Remove ${movie.title} from favorites`}
                >
                  <Image
                    className={`${styles.heart}${styles.favorite}`}
                    src="/heart-full.png"
                    alt="Remove from favorites"
                    width={20}
                    height={20}
                  />
                </button>
              </article>
              {index < favoriteMovies.length - 1 && (
                <hr className={styles.separator} />
              )}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
