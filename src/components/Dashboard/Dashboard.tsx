"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import { Movie } from "@/utils/types";

// mock data
import { mock_movies } from "../../mock/movies";

// store functions
import { usePageStore, useQueryStore, useGenreStore } from "@/store";
import Movies from "../Movies/Movies";

// endpoints
// import { getMovies } from "@/services";

export default function Dashboard() {
  const genre = useGenreStore((state) => state.genre);
  const query = useQueryStore((state) => state.query);
  const page = usePageStore((state) => state.page);

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

  if (failure) {
    return <div>Failed to load movies.</div>;
  }

  if (loading) {
    return <div>Loading Movies!</div>;
  }

  return (
    <div className={styles.container}>
      {movies.length > 0 ? <Movies movies={movies} /> : <p>No movies found.</p>}
    </div>
  );
}
