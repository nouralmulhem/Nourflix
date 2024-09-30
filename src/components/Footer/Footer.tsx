import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.linkedin.com/in/nour-almulhem-1817251b0/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my LinkedIn profile"
      >
        <Image
          aria-hidden="true"
          src="/linkedin.png"
          alt=""
          width={16}
          height={16}
        />
        Linkedin
      </a>
      <a
        href="https://github.com/nouralmulhem"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visit my GitHub profile"
      >
        <Image
          aria-hidden="true"
          src="/github.png"
          alt=""
          width={16}
          height={16}
        />
        GitHub →
      </a>
    </footer>
  );
}
