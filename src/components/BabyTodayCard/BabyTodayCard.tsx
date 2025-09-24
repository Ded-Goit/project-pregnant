'use client';

import Image from 'next/image';
//import dynamic from 'next/dynamic';
import styles from './BabyTodayCard.module.css';
// import React, { useEffect, useState } from 'react';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function BabyTodayCard() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Відображення інформації про розвиток дитини на поточному тижні.
//       </h1>
//     </div>
//   );
// }

interface BabyTodayCardData {
  image: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  // sizeDescription: string;
  // keyAchievement: string;
}

export default function BabyTodayCard({
  image,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
}: BabyTodayCardData) {
  // const [data, setData] = useState<BabyTodayCardData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch('/api/baby/today')
  //     .then((res) => {
  //       if (!res.ok)
  //         throw new Error('Помилка завантаження інформації про дитину');
  //       return res.json();
  //     })
  //     .then((json: BabyTodayCardData) => {
  //       setData(json);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading)
  //   return <section className="block baby-today-card">Завантаження...</section>;
  // if (error)
  //   return (
  //     <section className="block baby-today-card" style={{ color: 'red' }}>
  //       Помилка: {error}
  //     </section>
  //   );

  // if (!data) return null;

  return (
    <section className={styles.babyTodayCard}>
      <h3 className={styles.babyTodayTitle}>Малюк сьогодні</h3>
      {/* <img src={data.imageUrl} alt="Ілюстрація розміру дитини" /> */}
      <div className={styles.babyTodayContent}>
        {image ? (
          <Image
            className={styles.babyTodayImage}
            src="/frame_14.png" /*{image}*/
            alt="Ілюстрація розміру дитини"
            width={287}
            height={216}
          />
        ) : null}
        {/* <p>{data.sizeDescription}</p> */}
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
      {/* <strong>{data.keyAchievement}</strong> */}
      <div className={styles.keyAchievementWrapper}>
        <p className={styles.keyAchievement}>{babyDevelopment}</p>
      </div>
    </section>
  );
}
