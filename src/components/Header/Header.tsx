"use client";

import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "../SearchInput/SearchInput";
import { useGenreStore } from "@/store/genre";
import { Genre } from "@/utils/types";

export default function Header() {
  const genre = useGenreStore((state) => state.genre);
  const setGenre = useGenreStore((state) => state.setGenre);

  const isSelected = (_genre: Genre) => {
    return genre === _genre ? styles.selected : "";
  };

  const handleClicked = (_genre: Genre) => {
    setGenre(_genre);
  };

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <div className={styles.home}>
          <Image src="/popcorn.png" alt="Logo" width={50} height={50} />
          <h2>Nourflix</h2>
        </div>
      </Link>
      <div className={styles.navigators}>
        <div className={styles.genre}>
          <h4
            className={isSelected("popular")}
            onClick={() => {
              handleClicked("popular");
            }}
          >
            Popular
          </h4>
          <h4
            className={isSelected("top_rated")}
            onClick={() => {
              handleClicked("top_rated");
            }}
          >
            Top Rated
          </h4>
          <h4
            className={isSelected("upcoming")}
            onClick={() => {
              handleClicked("upcoming");
            }}
          >
            Upcoming
          </h4>
        </div>
        <Link href={"/favorite"}>Favorite List →</Link>
        <SearchInput />
      </div>
    </div>
  );
}
