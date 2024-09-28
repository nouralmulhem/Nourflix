"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import Image from "next/image";
import { Movie } from "@/utils/types";

// mock data
import { mock_movies } from "../../mock/movies";

// store functions
import { usePageStore, useQueryStore, useGenreStore } from "@/store";

// endpoints
// import { getMovies } from "@/services";

export default function Dashboard() {
  const genre = useGenreStore((state) => state.genre);
  const query = useQueryStore((state) => state.query);
  const page = usePageStore((state) => state.page);

  const setPage = usePageStore((state) => state.setPage);

  const router = useRouter();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [failure, setFailure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovies = async () => {
      try {
        // const response = await getMovies<Movie[]>(page, query, genre);
        // setMovies(response);
        setMovies(mock_movies);
        setLoading(false);
      } catch {
        setFailure(true);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, query, genre]);

  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  if (failure) {
    return <div>Failed to load movies.</div>;
  }

  if (loading) {
    return <div>Loading Movies!</div>;
  }

  return (
    <div className={styles.container}>
      {movies.length > 0 ? (
        <div className={styles.movieGrid}>
          {movies.map((movie) => {
            return (
              <div
                key={movie.id}
                className={styles.movieItem}
                onClick={() => handleClick(movie.id)}
              >
                <div>{movie.title}</div>
                <div>{movie.release_date}</div>
                <div>{movie.vote_average}</div>
                <Image
                  className={styles.logo}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                  alt={`${movie.title} poster`}
                  width={120}
                  height={200}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
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
    </div>
  );
}
