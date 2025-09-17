'use client';

//import dynamic from 'next/dynamic';
import styles from './TasksReminderCard.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function TasksReminderCard() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Компонент, що відображає персоналізоване привітання. Буде
        перевикористовуватись на інших сторінках.
      </h1>
    </div>
  );
}
