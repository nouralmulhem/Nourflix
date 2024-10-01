import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./movies.module.css";
import { useRouter } from "next/navigation";

// types
import { Movie } from "@/utils/types";

// utils
import { toggleFavorite } from "@/utils/toggleFavorite";

// store
import { useNotificationStore } from "@/store";

// components
import PageControllers from "@/components/PageControllers/PageControllers";
import StarRating from "@/components/StarRating/StarRating";

type MoviesProps = {
  movies: Movie[];
};

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  const [favorites, setFavorites] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    // Load favorites from local storage on component mount
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleMovieClick = (id: number) => {
    // Navigate to movie details page
    router.push(`/movie/${id}`);
  };

  const handleAddNotification = (errMsg: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(errMsg, "success");
  };

  return (
    <>
      <section className={styles.movieGrid} role="list">
        {movies.map((movie) => {
          const isFavorite = favorites.some(
            (favMovie) => favMovie.id === movie.id // Check if movie is in favorites
          );

          return (
            <article
              key={movie.id}
              className={styles.movieItem}
              role="listitem"
              onClick={() => handleMovieClick(movie.id)}
              aria-label={`View details of ${movie.title}`}
            >
              <div className={styles.overview}>
                <div className={styles.info}>
                  <h3 title={movie.title}>{movie.title}</h3>
                  <StarRating rating={movie.vote_average} />
                </div>
                <div
                  aria-label={
                    isFavorite
                      ? `Remove ${movie.title} from favorites`
                      : `Add ${movie.title} to favorites`
                  }
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent event from bubbling up
                    toggleFavorite(favorites, movie, setFavorites);
                    handleAddNotification(
                      isFavorite
                        ? "Removed from Favorites" // notification for removal
                        : "Added to Favorites" // notification for addition
                    );
                  }}
                >
                  <Image
                    className={`${styles.heart}${
                      isFavorite ? ` ${styles.favorite}` : ""
                    }`}
                    src={isFavorite ? "/heart-full.png" : "/heart-empty.png"}
                    alt={`Favorite icon for ${movie.title}`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className={styles.poster}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                  alt={`Poster of ${movie.title}`}
                  fill
                />
              </div>
              <p>{movie.release_date?.slice(0, 4)}</p>
            </article>
          );
        })}
      </section>
      <PageControllers /> {/* Pagination controls */}
    </>
  );
}
