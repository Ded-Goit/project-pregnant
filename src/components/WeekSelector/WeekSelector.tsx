'use client';

import styles from './WeekSelector.module.css';
import React, { useRef, useEffect, useState } from "react";
import { nextServer } from '@/lib/api';
import toast from "react-hot-toast";
import { useAuthStore } from '@/hooks/useAuthStore';

interface Props {
  total?: number;
  startAt?: number;
  onWeekChange?: (week: number) => void;
}


export default function WeekSelector({ total = 42, startAt = 1, onWeekChange }: Props) {

  const [currentWeek, setCurrentWeek] = useState<number | null>(null);
  const { user } = useAuthStore();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    nextServer.defaults.baseURL = 'https://project-pregnant-back.onrender.com/api';
    async function loadWeek() {

      try {
        const route = user ? `/weeks/dashboard` : '/weeks/public/dashboard';
        const res = await nextServer.get(route);
        setCurrentWeek(res.data.weekNumber);
        onWeekChange?.(res.data.weekNumber);
      } catch {
        toast.error("Не вдалося завантажити поточний тиждень");
      }
    }
    loadWeek();
  }, [user, onWeekChange, setCurrentWeek]);


  
useEffect(() => {
  if (currentWeek === null) return;
  const el = containerRef.current;
  const currentCard = el?.querySelector(`[data-week="${currentWeek}"]`);
  if (currentCard) {
    (currentCard as HTMLElement).scrollIntoView({ behavior: "smooth", inline: "center" });
  }
}, [currentWeek]);
  
  const handleWeekClick = (week: number) => {
    if (!currentWeek) return;
    if (week <= currentWeek) {
      onWeekChange?.(week);
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
            else if (n > Number(currentWeek)) className += ` ${styles.future}`;
          }
          return (
            <div
              key={n}
              className={className}
              data-week={n}
              role="listitem"
              tabIndex={0}
              onClick={() => handleWeekClick(n)}
              style={{ cursor: n <= (currentWeek ?? 0) ? "pointer" : "not-allowed" }}
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