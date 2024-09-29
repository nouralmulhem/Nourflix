import Image from "next/image";
import styles from "./empty-state.module.css";

type EmptyStateProps = {
  message: string;
};

export default function EmptyState(props: EmptyStateProps) {
  const { message } = props;

  return (
    <div className={styles.emptyState}>
      <Image
        src="/sad.png" // Store the image in the public folder
        alt="Sad face"
        className={styles.image}
        width={60}
        height={60}
      />
      <h2>{message}</h2>
    </div>
  );
}
