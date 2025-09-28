'use client';

import Image from 'next/image';
import styles from './BabyTodayCard.module.css';

interface BabyTodayCardData {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
}

export default function BabyTodayCard({
  image,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
}: BabyTodayCardData) {
  return (
    <section className={styles.babyTodayCard}>
      <h3 className={styles.babyTodayTitle}>Малюк сьогодні</h3>
      <div className={styles.babyTodayContent}>
        {image ? (
          <Image
            className={styles.babyTodayImage}
            src={image}
            alt="Ілюстрація розміру дитини"
            width={287}
            height={216}
          />
        ) : null}
        <div className={styles.sizeDescription}>
          <p className={styles.sizeDescriptionTitle}>
            Розмір:{' '}
            <span className={styles.sizeDescriptionText}>{babySize}</span>
          </p>

          <p className={styles.sizeDescriptionTitle}>
            Вага:{' '}
            <span className={styles.sizeDescriptionText}>{babyWeight} г</span>
          </p>

          <p className={styles.sizeDescriptionTitle}>
            Активність:{' '}
            <span className={styles.sizeDescriptionText}>{babyActivity}</span>
          </p>
        </div>
      </div>
      <div className={styles.keyAchievementWrapper}>
        <p className={styles.keyAchievement}>{babyDevelopment}</p>
      </div>
    </section>
  );
}
