import styles from "./page-controllers.module.css";

// store
import { usePageStore } from "@/store";

export default function PageControllers() {
  const { page, setPage } = usePageStore();

  return (
    <div className={styles.ctas}>
      <button
        className={styles.secondary}
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-disabled={page === 1}
        aria-label="Go to the previous page"
      >
        Previous Page
      </button>
      <button
        className={styles.primary}
        onClick={() => setPage(page + 1)}
        disabled={page === 20}
        aria-disabled={page === 20}
        aria-label="Go to the next page"
      >
        Next Page
      </button>
    </div>
  );
}
