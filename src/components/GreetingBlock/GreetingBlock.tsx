'use client';

//import dynamic from 'next/dynamic';
import styles from './GreetingBlock.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function GreetingBlock() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Рендериться у разі, якщо запит за даними тижня пройшов успішно.
      </h1>
    </div>
  );
}
