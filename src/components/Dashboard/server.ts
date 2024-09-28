import axios from "@/services/instance";

export const getMovies = async <T>(pageId: number | undefined): Promise<T> => {
  // const [data] = useFetch<user>(`movie/popular?language=en-US&page=${pageId}`);
  const res = await axios.get(`movie/popular?language=en-US&page=${pageId}`);
  return res.data as T;
};
