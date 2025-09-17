'use client';

//import dynamic from 'next/dynamic';
import styles from './ProfileAvatar.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function ProfileAvatar() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображає поточний аватар користувача та основну інформацію.
      </h1>
    </div>
  );
}
