"use client";

import React, { useState } from "react";
import styles from "./favorite.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";

// types
import { Movie } from "@/utils/types";

// utils
import { toggleFavorite } from "@/utils/toggleFavorite";

// store
import { useNotificationStore } from "@/store/notification";

// components
import CloseIcon from "@/components/CloseIcon/CloseIcon";
import StarRating from "@/components/StarRating/StarRating";
import EmptyState from "@/components/EmptyState/EmptyState";

type FavoriteProps = {
  favoriteMovies: Movie[];
  updateFavoriteMovies: (newFavoriteMovies: Movie[]) => void;
};

export default function Favorite(props: FavoriteProps) {
  const { favoriteMovies, updateFavoriteMovies } = props;
  const [removingMovies, setRemovingMovies] = useState<number[]>([]);
  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`); // Navigate to the movie details page
  };

  const handleAddNotification = (title: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(`${title} has been removed from favorites`, "success"); // Show success notification on movie removal
  };

  const handleRemoveMovie = (movie: Movie) => {
    setRemovingMovies((prev) => [...prev, movie.id]); // Mark the movie as being removed
    setTimeout(() => {
      toggleFavorite(favoriteMovies, movie, updateFavoriteMovies); // toggle the favorite status
      handleAddNotification(movie.title);
      setRemovingMovies((prev) => prev.filter((id) => id !== movie.id)); // remove movie from removing state
    }, 500);
  };

  if (!favoriteMovies.length) {
    return <EmptyState message="You have no favorite movies." />; // show empty state if there are no favorite movies
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
