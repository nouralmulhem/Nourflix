import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./movies.module.css";

// types
import { Movie } from "@/utils/types";

// utils
import { toggleFavorite } from "@/utils/toggleFavorite";

// store
import { useNotificationStore } from "@/store";
import PageControllers from "../PageControllers/PageControllers";
import { useRouter } from "next/navigation";
import React from "react";

type MoviesProps = {
  movies: Movie[];
};

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  const [favorites, setFavorites] = useState<Movie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleMovieClick = (id: number) => {
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
            (favMovie) => favMovie.id === movie.id
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
                  <h2>{movie.title}</h2>
                  <p>{movie.release_date}</p>
                  <p>Rating: {movie.vote_average}</p>
                </div>
                <div
                  aria-label={
                    isFavorite
                      ? `Remove ${movie.title} from favorites`
                      : `Add ${movie.title} to favorites`
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(favorites, movie, setFavorites);
                    handleAddNotification(
                      isFavorite
                        ? "Removed from Favorites"
                        : "Added to Favorites"
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
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                alt={`Poster of ${movie.title}`}
                width={120}
                height={200}
              />
            </article>
          );
        })}
      </section>
      <PageControllers />
    </>
  );
}
