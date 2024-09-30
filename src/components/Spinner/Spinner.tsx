import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container} role="alert" aria-live="assertive">
      <div className={styles.spinner} aria-busy="true" aria-label="Loading">
        <div className={styles.doubleBounce1}></div>
        <div className={styles.doubleBounce2}></div>
      </div>
      <h3>Loading...</h3>
    </div>
  );
}
