import { Movie } from "./types";

// we also can store this list in zustand store and that will be efficient
// but for the sake of change, we will use local storage
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
