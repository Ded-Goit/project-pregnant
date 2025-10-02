'use client';

import styles from './WeekSelector.module.css';
import React, { useRef, useEffect } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import { useRouter } from 'next/navigation';

interface Props {
  total?: number;
  startAt?: number;
  currentWeek?: number | null;
}

export default function WeekSelector({
  total = 42,
  startAt = 1,
  currentWeek,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((state) => state.user);
  const currentUserWeek = user?.currentWeek?.weekNumber ?? 1;
  const router = useRouter();

  useEffect(() => {
    if (currentWeek === 1) return;
    const el = containerRef.current;
    const currentCard = el?.querySelector(`[data-week="${currentWeek}"]`);
    if (currentCard) {
      (currentCard as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [currentWeek]);

  const handleWeekClick = (week: number) => {
    if (!currentUserWeek) return;
    if (week <= currentUserWeek) {
      router.push(`/journey/${week}`);
    }
  };

  const items = Array.from({ length: total }, (_, i) => i + startAt);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.container}
        ref={containerRef}
        role="list"
        aria-label="Weeks"
      >
        {items.map((n) => {
          let className = styles.card;
          if (currentWeek !== null) {
            if (n === Number(currentWeek)) className += ` ${styles.current}`;
            else if (n > Number(currentUserWeek))
              className += ` ${styles.future}`;
          }
          return (
            <div
              key={n}
              className={className}
              data-week={n}
              role="listitem"
              tabIndex={0}
              onClick={() => handleWeekClick(n)}
              style={{
                cursor: n <= (currentUserWeek ?? 0) ? 'pointer' : 'not-allowed',
              }}
            >
              <div className={styles.number}>{n}</div>
              <div className={styles.label}>Тиждень</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
