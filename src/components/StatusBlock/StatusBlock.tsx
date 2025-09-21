'use client';

//import dynamic from 'next/dynamic';
import styles from './StatusBlock.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

import React, { useEffect, useState } from 'react';

// interface StatusBlockProps {}

export default function StatusBlock() {
  const [week, setWeek] = useState<number | null>(1);
  const [daysLeft, setDaysLeft] = useState<number | null>(250);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch('/api/user/pregnancy-status')
  //     .then((res) => {
  //       if (!res.ok) {
  //         throw new Error('Помилка завантаження статусу вагітності');
  //       }
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setWeek(data.week);
  //       setDaysLeft(data.daysLeft);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <section className="block status-block">Завантаження...</section>;
  // }

  // if (error) {
  //   return (
  //     <section className="block status-block">
  //       <p>Помилка: {error}</p>
  //     </section>
  //   );
  // }

  return (
    <section className={styles.statusBlock}>
      <div className={styles.status}>
        <h3 className={styles.statusTitle}>Тиждень</h3>
        <p className={styles.statusItem}>{week}</p>
      </div>
      <div className={styles.status}>
        <h3 className={styles.statusTitle}>Днів до зустрічі</h3>
        <p className={styles.statusItem}>~{daysLeft}</p>
      </div>
    </section>
  );
}
