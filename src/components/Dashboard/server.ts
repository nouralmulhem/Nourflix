import axios from "@/services/instance";

export const getMovies = async <T>(
  pageId: number | undefined,
  query: string | undefined,
  genre: string | undefined
): Promise<T> => {
  // const [data] = useFetch<user>(`movie/popular?language=en-US&page=${pageId}`);
  const url = query
    ? `search/movie?language=en-US&query=${query}&page=${pageId}`
    : `movie/${genre}?language=en-US&page=${pageId}`;

  const res = await axios.get(url);
  return res.data.results as T;
};
