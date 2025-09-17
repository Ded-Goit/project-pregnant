'use client';

//import dynamic from 'next/dynamic';
import styles from './WeekSelector.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function WeekSelector() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Візуальна шкала для вибору тижня вагітності.
      </h1>
    </div>
  );
}
