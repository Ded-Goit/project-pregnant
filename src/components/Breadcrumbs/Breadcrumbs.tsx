'use client';

//import dynamic from 'next/dynamic';
import styles from './Header.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function Breadcrumbs() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Компонент для навігації, що відображає поточний шлях користувача в
        ієрархії сайту. Відображається на всіх сторінках, окрім сторінок
        реєстрації та логінізації.
      </h1>
    </div>
  );
}
