'use client';

import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/icons/company_logo.svg"
          alt="company logo"
          width={84}
          height={36}
        />
      </Link>

      <button onClick={onMenuClick}>
        <Image
          src="/icons/burger_menu.svg"
          alt="company logo"
          width={32}
          height={32}
        />
      </button>
    </header>
  );
}
