"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";

// types
import { Movie } from "@/utils/types";

// mock data
import { mock_movies } from "../../mock/movies";

// store functions
import {
  usePageStore,
  useQueryStore,
  useGenreStore,
  useNotificationStore,
} from "@/store";

// services
import { getMovies } from "@/services";

// components
import EmptyState from "@/components/EmptyState/EmptyState";
import Movies from "@/components/Movies/Movies";
import Spinner from "@/components/Spinner/Spinner";

export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failure, setFailure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const isFetchingRef = useRef(false);

  const genre = useGenreStore((state) => state.genre);
  const query = useQueryStore((state) => state.query);
  const page = usePageStore((state) => state.page);

  const handleAddNotification = () => {
    const { addNotification } = useNotificationStore.getState();
    addNotification("Error Fetching Movies", "error");
  };

  useEffect(() => {
    const fetchMovies = async () => {
      if (isFetchingRef.current) return; // Prevent multiple fetch calls
      isFetchingRef.current = true;
      setLoading(true);

      try {
        // const response = await getMovies<Movie[]>(page, query, genre);
        // setMovies(response);
        setMovies(mock_movies);
      } catch {
        setFailure(true);
        handleAddNotification();
      } finally {
        setLoading(false);
        isFetchingRef.current = false; // Reset the ref
      }
    };

    fetchMovies();
  }, [page, query, genre]); // eslint-disable-line react-hooks/exhaustive-deps
  // I ignored the eslint warning here because I don't want to add setShowNotification to the dependency array (It doesn't make sense in real application)

  if (loading) {
    return <Spinner />;
  }

  if (failure) {
    return <EmptyState message="Empty List." />;
  }

  if (movies.length === 0) {
    return <EmptyState message="No Movies Found." />;
  }

  return (
    <div className={styles.container}>
      <Movies movies={movies} />
    </div>
  );
}
