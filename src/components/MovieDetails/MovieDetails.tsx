"use client";

import { mock_movie } from "@/mock/movie";
import { getMovieById } from "@/services/getMovieById";
import { MovieDetailsType } from "@/utils/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./movie.module.css";
import Spinner from "../Spinner/Spinner";
import EmptyState from "../EmptyState/EmptyState";
import { useNotificationStore } from "@/store/notification";

export default function MovieDetails({ id }: { id: string }) {
  const [movie, setMovie] = useState<MovieDetailsType | undefined>(undefined);
  const [failure, setFailure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAddNotification = () => {
    const { addNotification } = useNotificationStore.getState();
    addNotification("Error Fetching Movie", "error");
  };

  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      if (isFetchingRef.current) return; // Prevent multiple fetch calls
      isFetchingRef.current = true;
      setLoading(true);

      try {
        const response = await getMovieById<MovieDetailsType>(id);
        setMovie(response);
        // setMovie(mock_movie);
      } catch {
        setFailure(true);
        handleAddNotification();
      } finally {
        setLoading(false);
        isFetchingRef.current = false; // Reset the ref
      }
    };

    fetchMovie();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps
  // I ignored the eslint warning here because I don't want to add setShowNotification to the dependency array (It doesn't make sense in real application

  if (loading) {
    return <Spinner />;
  }

  if (failure) {
    return <EmptyState message="Failed to Load The Movie." />;
  }

  if (movie === undefined) {
    return <EmptyState message="Movie not Found." />;
  }

  const backdropUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`;
  const posterUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`;

  return (
    <div
      className={styles.movieContainer}
      style={{
        backgroundImage: `url(${backdropUrl})`, // Set backdrop image via inline style
      }}
    >
      <Image
        className={styles.poster}
        src={posterUrl}
        alt={`${movie.title} poster`}
        width={400}
        height={600}
      />

      <div className={styles.movieDetails}>
        <h1>{movie.title}</h1>
        <p>{movie.release_date}</p>
        <p>Rating: {movie.vote_average}</p>
        <p>Synopsis: {movie.overview}</p>
        <p>Genre: {movie.genres.map((e) => e.name + ", ")}</p>
        <p>RunTime: {movie.runtime}</p>
        <p>Cast: {movie.credits.cast.map((e) => e.name + ", ")}</p>
        <p>
          Director:{" "}
          {movie.credits?.crew?.filter((e) => e.job === "Director")[0]?.name ||
            "Unknown"}
        </p>
      </div>
    </div>
  );
}
