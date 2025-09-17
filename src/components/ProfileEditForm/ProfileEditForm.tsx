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
        Форма, що надає можливість користувачу редагувати свої дані.
      </h1>
    </div>
  );
}
