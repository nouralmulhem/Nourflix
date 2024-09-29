"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import { Movie } from "@/utils/types";

// mock data
import { mock_movies } from "../../mock/movies";

// store functions
import { usePageStore, useQueryStore, useGenreStore } from "@/store";
import Movies from "../Movies/Movies";
import Spinner from "../Spinner/Spinner";

// endpoints
import { getMovies } from "@/services";
import EmptyState from "../EmptyState/EmptyState";
import { useNotificationStore } from "@/store/notification";

export default function Dashboard() {
  const genre = useGenreStore((state) => state.genre);
  const query = useQueryStore((state) => state.query);
  const page = usePageStore((state) => state.page);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [failure, setFailure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddNotification = () => {
    const { addNotification } = useNotificationStore.getState();
    addNotification("Error Fetching Movies", "error");
  };

  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchMovies = async () => {
      if (isFetchingRef.current) return; // Prevent multiple fetch calls
      isFetchingRef.current = true;
      setLoading(true);

      try {
        const response = await getMovies<Movie[]>(page, query, genre);
        setMovies(response);
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
