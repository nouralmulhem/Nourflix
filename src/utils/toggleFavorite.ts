import { Movie } from "./types";

export const toggleFavorite = (
  favorites: Movie[],
  movie: Movie,
  setFavorites: (movies: Movie[]) => void
) => {
  let updatedFavorites;

  const isFavorite = favorites.some((favMovie) => favMovie.id === movie.id);

  if (isFavorite) {
    updatedFavorites = favorites.filter((favMovie) => favMovie.id !== movie.id);
  } else {
    updatedFavorites = [...favorites, movie];
  }

  setFavorites(updatedFavorites);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
};
