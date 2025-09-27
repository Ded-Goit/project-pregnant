'use client';

import Link from 'next/link';
import styles from './SideBar.module.css';
import Image from 'next/image';
import { useAuthStore, useWeekStore } from '@/hooks/useAuthStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export default function SideBar({ isOpen, onClose, onLogout }: SidebarProps) {
  const { currentWeek } = useWeekStore();
  const { user, isAuthenticated } = useAuthStore();
  return (
    <>
      {isOpen && <div className={styles.backdrop} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div>
          {/* Logo */}
          <div className={styles.sideBarHeader}>
            <Link href="/">
              <Image
                src="/icons/company_logo.svg"
                alt="company logo"
                width={105}
                height={45}
              />
            </Link>
            <button className={styles.closeBtn} onClick={onClose}>
              <Image
                src="/icons/close.svg"
                alt="company logo"
                width={32}
                height={32}
              />
            </button>
          </div>
          {/* Navidatoin */}
          <ul className={styles.navList}>
            {isAuthenticated ? (
              <>
                <li className={styles.navItem}>
                  <Link href="/" className={styles.navLink}>
                    <Image
                      src="/icons/today.svg"
                      alt="calendar icon"
                      width={24}
                      height={24}
                    />
                    Мій день
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href={currentWeek ? `/journey/${currentWeek}` : '#'} className={styles.navLink}>
                    <Image
                      src="/icons/conversion_path.svg"
                      alt="journey icon"
                      width={24}
                      height={24}
                    />
                    Подорож
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/diary" className={styles.navLink}>
                    <Image
                      src="/icons/book_2.svg"
                      alt="diary icon"
                      width={24}
                      height={24}
                    />
                    Щоденник
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/profile" className={styles.navLink}>
                    <Image
                      src="/icons/account_circle.svg"
                      alt="account circle"
                      width={24}
                      height={24}
                    />
                    Профіль
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.navItem}>
                  <Link href="/auth/register" className={styles.navLink}>
                    <Image
                      src="/icons/today.svg"
                      alt="calendar icon"
                      width={24}
                      height={24}
                    />
                    Мій день
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/auth/register" className={styles.navLink}>
                    <Image
                      src="/icons/conversion_path.svg"
                      alt="journey icon"
                      width={24}
                      height={24}
                    />
                    Подорож
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/auth/register" className={styles.navLink}>
                    <Image
                      src="/icons/book_2.svg"
                      alt="diary icon"
                      width={24}
                      height={24}
                    />
                    Щоденник
                  </Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/auth/register" className={styles.navLink}>
                    <Image
                      src="/icons/account_circle.svg"
                      alt="account circle"
                      width={24}
                      height={24}
                    />
                    Профіль
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* User info and logout/login */}
        <div className={styles.navBottom}>
          {isAuthenticated ? (
            <>
              <div className={styles.userInfo}>
                <Image
                  src={user?.photo ?? '/account_circle.svg'}
                  alt="avatar"
                  width={40}
                  height={40}
                  className={styles.navAvatar}
                ></Image>
                <div>
                  <p>{user?.name}</p>
                  <p>{user?.email}</p>
                </div>
              </div>

              <button onClick={onLogout}>
                <Image
                  src="/icons/logout.svg"
                  alt="logout icon"
                  width={24}
                  height={24}
                ></Image>
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className={styles.bottomLink}>
                Увійти
              </Link>
              <Link href="/auth/register" className={styles.bottomLink}>
                Зареєструватися
              </Link>
            </>
          )}
        </div>
      </aside>
    </>
  );
}
