'use client';

import styles from './Header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname();

  const hideBurger = ['/auth/login', '/auth/register', '/profile/edit'];
  const shouldHideBurger = hideBurger.includes(pathname);
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

      {!shouldHideBurger && (
        <button onClick={onMenuClick} className={styles.burgerBtn}>
          <Image
            src="/icons/burger_menu.svg"
            alt="company logo"
            width={32}
            height={32}
          />
        </button>
      )}
    </header>
  );
}
