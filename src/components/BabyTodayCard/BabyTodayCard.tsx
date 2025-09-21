'use client';

//import dynamic from 'next/dynamic';
import styles from './BabyTodayCard.module.css';
import React, { useEffect, useState } from 'react';

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
  imageUrl: string;
  sizeDescription: string;
  keyAchievement: string;
}

export default function BabyTodayCard() {
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
        <img
          className={styles.babyTodayImage}
          src="/frame_14.png"
          alt="Ілюстрація розміру дитини"
        />
        {/* <p>{data.sizeDescription}</p> */}
        <div className={styles.sizeDescription}>
          <p className={styles.sizeDescriptionTitle}>
            Розмір:{' '}
            <span className={styles.sizeDescriptionText}>Приблизно 12 см</span>
          </p>

          <p className={styles.sizeDescriptionTitle}>
            Вага:{' '}
            <span className={styles.sizeDescriptionText}>
              Близько 45 грамів.
            </span>
          </p>

          <p className={styles.sizeDescriptionTitle}>
            Активність:{' '}
            <span className={styles.sizeDescriptionText}>
              М'язи обличчя вже працюють! Малюк вчиться хмуритися, мружитись і
              навіть може зловити гикавку.
            </span>
          </p>
        </div>
      </div>
      {/* <strong>{data.keyAchievement}</strong> */}
      <div className={styles.keyAchievementWrapper}>
        <p className={styles.keyAchievement}>
          У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним
          пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи — все
          більш скоординованими. Хоч ви ще не відчуваєте цих кульбітів, знайте:
          всередині вас відбувається справжнє диво!
        </p>
      </div>
    </section>
  );
}
