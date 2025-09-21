'use client';

//import dynamic from 'next/dynamic';
import styles from './FeelingCheckCard.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AddDiaryEntryModal from '../AddDiaryEntryModal/AddDiaryEntryModal';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

interface FeelingCheckCardProps {
  isAuthenticated: boolean;
}

export default function FeelingCheckCard({
  isAuthenticated,
}: FeelingCheckCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  // const router = useRouter();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      setModalOpen(true);
    } else {
      // router.push('/auth/register');
    }
  };

  const closeModal = () => setModalOpen(false);

  return (
    <section className={styles.feelingCheckCard}>
      <h3 className={styles.feelingCheckTitle}>Як ви себе почуваєте?</h3>
      <p className={styles.feelingCheckRecommendation}>
        Рекомендація на сьогодні:
      </p>
      <p className={styles.feelingCheckNote}>
        {' '}
        Занотуйте незвичні відчуття у тілі.
      </p>
      <button className={styles.feelingCheckBtn} onClick={handleButtonClick}>
        Зробити запис у щоденник
      </button>

      {modalOpen && (
        <AddDiaryEntryModal
          onClose={closeModal}
          onSubmit={(entry) => {
            closeModal();
          }}
        />
      )}
    </section>
  );
}
