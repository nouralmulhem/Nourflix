import { mock_movie } from "@/mock/movie";
import { getMovieById } from "@/services/getMovieById";
import { MovieDetailsType } from "@/utils/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./movie.module.css";
import Link from "next/link";

export default function MovieDetails({ id }: { id: string }) {
  const [movie, setMovie] = useState<MovieDetailsType | undefined>(undefined);
  const [failure, setFailure] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const fetchMovie = async () => {
      try {
        // const response = await getMovieById<MovieDetailsType>(id);
        // setMovie(response);
        setMovie(mock_movie);
        setLoading(false);
      } catch {
        setFailure(true);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (failure) {
    return <div>Failed to load movie.</div>;
  }

  if (loading) {
    return <div>Loading Movie!</div>;
  }

  if (movie === undefined) {
    return <div>Movie not found</div>;
  }

  const backdropUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.backdrop_path}`;
  const posterUrl = `${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`;

  return (
    <>
      <Link href={"/"}>
        <Image
          className={styles.closeIcon}
          src={"/close-option.png"}
          alt={`${movie.title} close-icon`}
          width={50}
          height={50}
        />
      </Link>

      <div
        className={styles.movieContainer}
        style={{
          backgroundImage: `url(${backdropUrl})`, // Set backdrop image via inline style
        }}
      >
        <Image
          className={styles.poster}
          src={posterUrl}
          alt={`${movie.title} poster`}
          width={400}
          height={600}
        />

        <div className={styles.movieDetails}>
          <h1>{movie.title}</h1>
          <p>{movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
          <p>Synopsis: {movie.overview}</p>
          <p>Genre: {movie.genres.map((e) => e.name + ", ")}</p>
          <p>RunTime: {movie.runtime}</p>
          <p>Cast: {movie.credits.cast.map((e) => e.name + ", ")}</p>
          <p>
            Director:{" "}
            {movie.credits?.crew?.filter((e) => e.job === "Director")[0]
              ?.name || "Unknown"}
          </p>
        </div>
      </div>
    </>
  );
}
