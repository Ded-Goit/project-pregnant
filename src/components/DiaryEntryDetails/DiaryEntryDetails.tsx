'use client';

//import dynamic from 'next/dynamic';
import styles from './DiaryEntryDetails.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function DiaryEntryDetails() {
  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Відображає повну інформацію обраного запису. На мобілці/планшеті є
        окремою сторінкою.
      </h1>
    </div>
  );
}
