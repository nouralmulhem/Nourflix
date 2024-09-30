"use client";

import { useEffect, useState } from "react";
import { Movie } from "@/utils/types"; // Assuming you have a Movie type definition
import Favorite from "@/components/Favorite/Favorite";

export default function Page() {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  // Load favorite movies from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    setFavoriteMovies(storedFavorites);
  }, []);

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
