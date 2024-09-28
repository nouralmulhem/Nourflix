import { Genre } from "@/utils/types";
import { create } from "zustand";

interface GenreState {
  genre: Genre;
  setGenre: (genre: Genre) => void;
}

export const useGenreStore = create<GenreState>((set) => ({
  genre: "popular",
  setGenre: (genre: Genre) => set({ genre }),
}));
