'use client';

import Image from 'next/image';
//import dynamic from 'next/dynamic';
import styles from './MomTipCard.module.css';
// import React, { useEffect, useState } from 'react';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

interface MomTipCardData {
  categoryIconUrl: string;
  momDailyTips: string;
}

export default function MomTipCard({
  categoryIconUrl,
  momDailyTips,
}: MomTipCardData) {
  // const [data, setData] = useState<MomTipCardData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   fetch('/api/mom/tip-today')
  //     .then((res) => {
  //       if (!res.ok) throw new Error('Помилка завантаження поради');
  //       return res.json();
  //     })
  //     .then((json: MomTipCardData) => {
  //       setData(json);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading)
  //   return (
  //     <section className="block mom-tip-card">Завантаження поради...</section>
  //   );

  // if (error)
  //   return (
  //     <section className="block mom-tip-card" style={{ color: 'red' }}>
  //       Помилка: {error}
  //     </section>
  //   );

  // if (!data) return null;

  return (
    <section className={styles.momTipCard}>
      <h3 className={styles.momTipTitle}>Порада для мами</h3>
      <div className={styles.momTipContent}>
        {/* {categoryIconUrl ? (
          <Image
            src="/fork_spoon.png"
            alt="Іконка категорії поради"
            width={24}
            height={24}
          />
        ) : null} */}
        <Image
          src="/fork_spoon.png"
          alt="Іконка категорії поради"
          width={24}
          height={24}
        />
        {/* Example tip text */}
        <p className={styles.momTipText}>{momDailyTips}</p>
        {/* <img src={data.categoryIconUrl} alt="Іконка категорії поради" /> */}
        {/* <p>{data.tipText}</p> */}
      </div>
    </section>
  );
}
