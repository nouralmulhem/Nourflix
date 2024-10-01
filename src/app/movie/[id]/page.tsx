import styles from "./page.module.css";
import { getMovieById } from "@/services/getMovieById";
import { MovieDetailsType } from "@/utils/types";
import MovieDetails from "@/components/MovieDetails/MovieDetails";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const movie = await getMovieById<MovieDetailsType | undefined>(params.id);

  return (
    <div className={styles.page}>
      <MovieDetails movie={movie} />
    </div>
  );
}
