"use client";

import { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
// import { getMovies } from "./server";
import Image from "next/image";
import { data } from "./data";
import { Movie } from "@/utils/types";

export default function Dashboard() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [failure, setFailure] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        // const res = await getMovies<any>(1);
        // setMovies(res.results);
        setMovies(data);
      } catch {
        setFailure(true);
      }
    };

    fetchMovies();
  }, []);

  if (failure) {
    return <div>Failed to load movies.</div>;
  }

  return (
    <div className={styles.ctas}>
      <div>
        {movies.length > 0 ? (
          movies.map((movie) => {
            return (
              <div key={movie.id}>
                <div>{movie.title}</div>
                <Image
                  className={styles.logo}
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${movie.poster_path}`}
                  alt="Vercel logomark"
                  width={120}
                  height={100}
                />
              </div>
            );
          })
        ) : (
          <p>No movies found.</p>
        )}
      </div>
    </div>
  );
}
