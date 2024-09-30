import styles from "./star-rating.module.css";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.ratingContainer}>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= rating / 2 ? styles.star : ""}
            data-value={value}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className={styles.ratingVal}>{rating.toFixed(1)}</div>
    </div>
  );
}
