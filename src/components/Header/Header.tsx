"use client";

import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";

// components
import SearchInput from "@/components/SearchInput/SearchInput";

// store
import { useGenreStore } from "@/store/genre";

// types
import { Genre } from "@/utils/types";

import { useRouter } from "next/navigation";

const genreMap: Record<Genre, string> = {
  popular: "Popular",
  top_rated: "Top Rated",
  upcoming: "Upcoming",
};

export default function Header() {
  const genre = useGenreStore((state) => state.genre);
  const setGenre = useGenreStore((state) => state.setGenre);
  const router = useRouter();

  const isSelected = (_genre: Genre) => {
    return genre === _genre ? styles.selected : "";
  };

  const handleClicked = (_genre: Genre) => {
    router.push("/");
    setGenre(_genre);
  };

  const renderGenres = () => {
    return Object.keys(genreMap).map((key) => {
      const typedKey = key as Genre;

      return (
        <h4
          key={typedKey}
          className={isSelected(typedKey)}
          onClick={() => handleClicked(typedKey)}
          aria-label={`View ${genreMap[typedKey]} movies`}
        >
          {genreMap[typedKey]}
        </h4>
      );
    });
  };

  const renderGenresForMobile = () => {
    return (
      <div className={styles.genreContainer}>
        <button className={styles.dropdownIcon}>
          <Image src="/ddl.png" alt="Dropdown Icon" height={20} width={20} />{" "}
        </button>
        <div className={styles.ddl}>
          {Object.keys(genreMap).map((key) => {
            const typedKey = key as Genre;

            return (
              <a
                onClick={() => handleClicked(typedKey)}
                data-genre={typedKey}
                key={typedKey}
              >
                {genreMap[typedKey]}
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <header className={styles.container}>
      <div className={styles.home}>
        <Image src="/popcorn.png" alt="Nourflix logo" width={50} height={50} />
        <h2>Nourflix</h2>
      </div>

      <nav className={styles.navigators} aria-label="Main navigation">
        <div className={styles.genre}>{renderGenres()}</div>
        <div className={styles.genreMobile}>{renderGenresForMobile()}</div>

        <Link
          className={styles.favoriteContainer}
          href="/favorite"
          aria-label="View your favorite movies"
        >
          <h4>Favorites</h4>
          <Image
            src={"/heart-full.png"}
            alt={"Heart icon"}
            width={15}
            height={15}
          />
        </Link>

        <SearchInput aria-label="Search for movies" />
      </nav>
    </header>
  );
}
