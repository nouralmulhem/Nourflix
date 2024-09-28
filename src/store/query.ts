import { create } from "zustand";

interface QueryState {
  query: string | undefined;
  setQuery: (query: string) => void;
}

export const useQueryStore = create<QueryState>((set) => ({
  query: undefined,
  setQuery: (query: string) => set({ query }),
}));
