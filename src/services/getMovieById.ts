import axios from "@/services/instance";

export const getMovieById = async <T>(id: string): Promise<T> => {
  const url = `/movie/${id}?language=en-US&append_to_response=credits`;

  try {
    const res = await axios.get(url);
    return res.data as T;
  } catch {
    return undefined as T;
  }
};
