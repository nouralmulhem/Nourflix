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
  );
}
