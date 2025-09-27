'use client';

import styles from './WeekSelector.module.css';
import React, { useRef, useEffect, useState } from 'react';
import { nextServer } from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '@/hooks/useAuthStore';

type Props = {
  total?: number;
  startAt?: number;
};

export default function WeekSelector({ total = 42, startAt = 1 }: Props) {
  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    async function loadWeek() {
      try {
        let route = '';

        if (user) {
          route = '/dashboard';
        } else {
          route = '/public/dashboard';
        }

        const res = await nextServer.get(route);
        setCurrentWeek(res.data.weekNumber);
      } catch {
        toast.error('Не вдалося завантажити поточний тиждень');
      }
    }

    loadWeek();
  }, [user]);

  useEffect(() => {
    if (!currentWeek) return;
    const el = containerRef.current;
    const currentCard = el?.querySelector(`[data-week="${currentWeek}"]`);
    if (currentCard) {
      (currentCard as HTMLElement).scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [currentWeek]);

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
            if (n === currentWeek) className += ` ${styles.current}`;
            else if (n > currentWeek) className += ` ${styles.future}`;
          }
          return (
            <div
              key={n}
              className={className}
              data-week={n}
              role="listitem"
              tabIndex={0}
            >
              <div className={styles.number}>{n}</div>
              <div className={styles.label}>Тиждень</div>
            </div>
          );
        })}
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
