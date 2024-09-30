import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./movies.module.css";

// types
import { Movie } from "@/utils/types";

// utils
import { toggleFavorite } from "@/utils/toggleFavorite";

// store
import { useNotificationStore } from "@/store";
import Link from "next/link";
import PageControllers from "../PageControllers/PageControllers";

type MoviesProps = {
  movies: Movie[];
};

export default function Movies(props: MoviesProps) {
  const { movies } = props;

  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  const handleAddNotification = (errMsg: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(errMsg, "success");
  };

  return (
    <>
      <div className={styles.movieGrid}>
        {movies.map((movie) => {
          const isFavorite = favorites.some(
            (favMovie) => favMovie.id === movie.id
          );

          return (
            <Link
              href={`/movie/${movie.id}`}
              key={movie.id}
              className={styles.movieItem}
            >
              <div className={styles.overview}>
                <div className={styles.info}>
                  <div>{movie.title}</div>
                  <div>{movie.release_date}</div>
                  <div>{movie.vote_average}</div>
                </div>
                <div
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
                    alt={`${movie.title} fav`}
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={120}
                height={200}
              />
            </Link>
          );
        })}
      </div>
      <PageControllers />
    </>
  );
}
