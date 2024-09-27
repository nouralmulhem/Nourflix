import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import SearchInput from "../SearchInput/SearchInput";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <div className={styles.home}>
          <Image src="/popcorn.png" alt="Logo" width={50} height={50} />
          <h2>Nourflix</h2>
        </div>
      </Link>
      <div className={styles.navigators}>
        <Link href={"/favorite"}>Favorite List</Link>
        <SearchInput />
      </div>
    </div>
  );
}
