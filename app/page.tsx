import { ChevronRight } from "lucide-react";
import Link from "next/link";
import styles from "@/styles/Home.module.scss";

export default function Home() {
  return (
    <div className={styles.home}>
      <Link href="/mines" className={styles.link}>
        <h4>Mines</h4>
        <ChevronRight />
      </Link>
    </div>
  );
}
