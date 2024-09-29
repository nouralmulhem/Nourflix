import styles from "./spinner.module.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <div className={styles.doubleBounce1}></div>
        <div className={styles.doubleBounce2}></div>
      </div>
      <h3>Loading...</h3>
    </div>
  );
}
