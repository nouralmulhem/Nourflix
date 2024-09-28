import axios from "@/services/instance";

export const getMovieById = async <T>(id: number): Promise<T> => {
  const url = `/movie/${id}?language=en-US`;

  const res = await axios.get(url);
  return res.data as T;
};
