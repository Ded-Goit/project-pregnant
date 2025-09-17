'use client';

//import dynamic from 'next/dynamic';
import styles from './ConfirmationModal.module.css';

/*const GreetingBlock = dynamic(
  () => import('@/components/dashboard/greeting-block')
);*/

export default function ConfirmationModal() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Блок `Універсальне модальне вікно підтвердження` | ConfirmationModal
      </h1>
    </div>
  );
}
