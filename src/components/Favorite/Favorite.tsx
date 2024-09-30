"use client";

import styles from "./favorite.module.css";
import Image from "next/image";
import { Movie } from "@/utils/types"; // Assuming you have a Movie type definition
import { useRouter } from "next/navigation"; // For navigating to individual movie pages
import { toggleFavorite } from "@/utils/toggleFavorite";
import NotificationContainer from "@/components/Notification/NotificationContainer";
import { useNotificationStore } from "@/store/notification";

type FavoriteProps = {
  favoriteMovies: Movie[];
  updateFavoriteMovies: (newFavoriteMovies: Movie[]) => void;
};

export default function Favorite(props: FavoriteProps) {
  const { favoriteMovies, updateFavoriteMovies } = props;

  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handleAddNotification = (title: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(`${title} has been removed from favorites`, "success");
  };

  return (
    <>
      <div onClick={handleBackClick}>
        <Image
          className={styles.closeIcon}
          src={"/close-option.png"}
          alt={`close-icon`}
          width={50}
          height={50}
        />
      </div>
      <NotificationContainer />

      <div className={styles.favoriteMoviesContainer}>
        <p className={styles.pageTitle}>Your Favorite Movies</p>

        {favoriteMovies.length === 0 ? (
          <p>You have no favorite movies yet.</p>
        ) : (
          favoriteMovies.map((movie, index) => (
            <div key={movie.id}>
              <div
                className={styles.movieItem}
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
                    toggleFavorite(favoriteMovies, movie, updateFavoriteMovies);
                    handleAddNotification(movie.title);
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
