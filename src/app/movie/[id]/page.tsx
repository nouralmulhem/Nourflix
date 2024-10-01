import styles from "./page.module.css";

// services
import { getMovieById } from "@/services";

// types
import { MovieData } from "@/utils/types";

// components
import MovieDetails from "@/components/MovieDetails/MovieDetails";

interface PageProps {
  params: {
    id: string; // Movie ID passed through the route params
  };
}

export default async function Page({ params }: PageProps) {
  const movie = await getMovieById<MovieData | undefined>(params.id);

  return (
    <div className={styles.page}>
      <MovieDetails movie={movie} />
    </div>
  );
}
