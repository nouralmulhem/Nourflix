// list movies
export type Movie = {
  adult: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview?: string;
  popularity: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video: boolean;
  vote_average?: number;
  vote_count: number;
};

// genre to filter
export type Genre = "upcoming" | "popular" | "top_rated";

// movie details
type Type = {
  id: number;
  name: string;
};

type Cast = {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string | null;
  popularity: number;
  profile_path: string | null;
};

type Crew = {
  adult: boolean;
  credit_id: string;
  department: string;
  job: string;
  id: number;
  gender: number;
  known_for_department: string;
  name: string;
  original_name: string | null;
  popularity: number;
  profile_path: string | null;
};

type Credits = {
  cast: Cast[];
  crew: Crew[];
};

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Type[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: Credits;
};
