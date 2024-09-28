import styles from "./movies.module.css";

import Image from "next/image";
import { Movie } from "@/utils/types";
import { useRouter } from "next/navigation";
import { usePageStore } from "@/store";

export default function Movies({ movies }: { movies: Movie[] }) {
  const setPage = usePageStore((state) => state.setPage);
  const page = usePageStore((state) => state.page);

  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <>
      <div className={styles.movieGrid}>
        {movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => handleClick(movie.id)}
            >
              <div>{movie.title}</div>
              <div>{movie.release_date}</div>
              <div>{movie.vote_average}</div>
              <Image
                className={styles.logo}
                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                alt={`${movie.title} poster`}
                width={120}
                height={200}
              />
            </div>
          );
        })}
      </div>
      <div className={styles.ctas}>
        <button
          className={styles.secondary}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          className={styles.primary}
          onClick={() => setPage(page + 1)}
          disabled={page === 20}
        >
          Next Page
        </button>
      </div>
    </>
  );
}
