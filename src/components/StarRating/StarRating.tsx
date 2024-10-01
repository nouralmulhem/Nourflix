import styles from "./star-rating.module.css";

export default function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.ratingContainer}>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            className={value <= rating / 2 ? styles.star : ""} // add the styles.star class if the value is less than or equal to the rating divided by 2
            data-value={value}
          >
            &#9733; {/* Render a star character */}
          </span>
        ))}
      </div>
      <div className={styles.ratingVal}>{rating.toFixed(1)}</div>{" "}
      {/* Display the rating value approximated */}
    </div>
  );
}
