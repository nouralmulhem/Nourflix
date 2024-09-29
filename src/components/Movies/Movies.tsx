import styles from "./movies.module.css";

import Image from "next/image";
import { Movie } from "@/utils/types";
import { useRouter } from "next/navigation";
import { usePageStore } from "@/store";
import { useEffect, useState } from "react";
import { toggleFavorite } from "@/utils/toggleFavorite";
import { useNotificationStore } from "@/store/notification";

export default function Movies({ movies }: { movies: Movie[] }) {
  const setPage = usePageStore((state) => state.setPage);
  const page = usePageStore((state) => state.page);

  const router = useRouter();

  const handleAddNotification = (errMsg: string) => {
    const { addNotification } = useNotificationStore.getState();
    addNotification(errMsg, "error");
  };

  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavorites(storedFavorites);
  }, []);

  return (
    <>
      <div className={styles.movieGrid}>
        {movies.map((movie) => {
          const isFavorite = favorites.some(
            (favMovie) => favMovie.id === movie.id
          );

          return (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleClick(movie.id)}
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
            </div>
          );
        })}
      </div>
      <div className={styles.ctas}>
        <button
          className={styles.secondary}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className={styles.primary}
          onClick={() => setPage(page + 1)}
          disabled={page === 20}
        >
          Next Page
        </button>
      </div>
    </>
  );
}
