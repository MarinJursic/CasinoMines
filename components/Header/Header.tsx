"use client";

import { usePathname, useRouter } from "next/navigation";
import styles from "./Header.module.scss";
import { ChevronLeft } from "lucide-react";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {!isHome && <ChevronLeft onClick={() => router.back()} />}
      </div>

      <div className={styles.balanceContainer}>
        <p className={styles.balanceLabel}>Balance</p>
        <p className={styles.balanceAmount}>$352.24</p>
      </div>
    </header>
  );
}
