"use client";

import styles from "./favorite.module.css";
import Image from "next/image";
import { Movie } from "@/utils/types"; // Assuming you have a Movie type definition
import { useRouter } from "next/navigation"; // For navigating to individual movie pages
import { toggleFavorite } from "@/utils/toggleFavorite";
import NotificationContainer from "@/components/Notification/NotificationContainer";
import { useNotificationStore } from "@/store/notification";
import { useState } from "react";
import CloseIcon from "../CloseIcon/CloseIcon";

type FavoriteProps = {
  favoriteMovies: Movie[];
  updateFavoriteMovies: (newFavoriteMovies: Movie[]) => void;
};

export default function Favorite(props: FavoriteProps) {
  const { favoriteMovies, updateFavoriteMovies } = props;

  // State to manage which movies are fading out
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
    setRemovingMovies((prev) => [...prev, movie.id]); // Start fading out
    setTimeout(() => {
      toggleFavorite(favoriteMovies, movie, updateFavoriteMovies);
      handleAddNotification(movie.title);
      setRemovingMovies((prev) => prev.filter((id) => id !== movie.id)); // Remove from fading state
    }, 500); // Match this duration with your fade-out CSS duration
  };

  return (
    <>
      <CloseIcon />

      <NotificationContainer />

      <div className={styles.favoriteMoviesContainer}>
        <p className={styles.pageTitle}>Your Favorite Movies</p>

        {favoriteMovies.length === 0 ? (
          <p>You have no favorite movies yet.</p>
        ) : (
          favoriteMovies.map((movie, index) => (
            <div key={movie.id}>
              <div
                className={`${styles.movieItem} ${
                  removingMovies.includes(movie.id) ? styles.fadeOut : ""
                }`}
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
                  <p>{new Date(movie.release_date).getFullYear()}</p>
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveMovie(movie); // Update to use the new remove handler
                  }}
                  className={styles.favoriteIcon}
                >
                  <Image
                    className={`${styles.heart}${styles.favorite}`}
                    src="/heart-full.png"
                    alt={`${movie.title} fav`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              {/* Add separator after each movie except the last one */}
              {index < favoriteMovies.length - 1 && (
                <hr className={styles.separator} />
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
