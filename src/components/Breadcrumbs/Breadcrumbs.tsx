'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Розбиваємо шлях на сегменти
  const segments = pathname.split('/').filter(Boolean);

  // Сторінки, де breadcrumbs не потрібен
  if (pathname.startsWith('/auth')) {
    return null;
  }

  if (pathname === '/') {
    return (
      <nav className={styles.breadcrumbs}>
        <ul>
          <li>
            <Link href="/">Лелека</Link>
          </li>
          <li>
            <span>Мій день</span>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className={styles.breadcrumbs}>
      <ul>
        <li>
          <Link href="/">Лелека</Link>
        </li>

        {segments.map((segment, index) => {
          // шлях до поточного сегмента
          const href = '/' + segments.slice(0, index + 1).join('/');

          // робимо "читабельну" назву
          const nameMap: Record<string, string> = {
            diary: 'Щоденник',
            profile: 'Профіль',
            journey: 'Подорож',
            new: 'Новий запис',
          };
          const label = nameMap[segment] || segment;

          // якщо останній — не робимо посилання
          const isLast = index === segments.length - 1;

          return (
            <li key={href}>
              {isLast ? <span>{label}</span> : <Link href={href}>{label}</Link>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
