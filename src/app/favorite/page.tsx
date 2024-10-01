"use client";

import { useEffect, useState } from "react";

// types
import { Movie } from "@/utils/types";

// components
import Favorite from "@/components/Favorite/Favorite";

export default function Page() {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  // Load favorite movies from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoriteMovies(storedFavorites);
  }, []);

  // Update the state and ensure the UI reflects the updated favorite movies
  const updateFavoriteMovies = (newFavoriteMovies: Movie[]) => {
    setFavoriteMovies(newFavoriteMovies);
  };

  return (
    <Favorite
      favoriteMovies={favoriteMovies}
      updateFavoriteMovies={updateFavoriteMovies}
    />
  );
}
