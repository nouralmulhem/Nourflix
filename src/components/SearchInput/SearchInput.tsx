import { KeyboardEvent } from "react";
import styles from "./search.module.css";
import { useQueryStore } from "@/store/query";
import { usePageStore } from "@/store/page";
import { useRouter } from "next/navigation";

export default function SearchInput() {
  const setQuery = useQueryStore((state) => state.setQuery);
  const setPage = usePageStore((state) => state.setPage);

  const router = useRouter();

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setQuery(event.currentTarget.value);
      router.push("/");
      setPage(1);
    }
  };

  return (
    <form role="search" onSubmit={(e) => e.preventDefault()}>
      <input
        id="search-input"
        placeholder="Search ..."
        onKeyDown={handleKeyDown}
        className={styles.input}
        aria-label="Search movies"
      />
    </form>
  );
}
