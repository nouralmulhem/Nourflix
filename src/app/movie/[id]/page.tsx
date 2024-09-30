import MovieDetails from "@/components/MovieDetails/MovieDetails";
import styles from "./page.module.css";
import { getMovieById } from "@/services/getMovieById";
import { MovieDetailsType } from "@/utils/types";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const movie = await getMovieById<MovieDetailsType>(params.id);

  return (
    <div className={styles.page}>
      <MovieDetails movie={movie} />
    </div>
  );
}
