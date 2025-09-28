'use client';

import React, { useEffect, useState } from 'react';
import { nextServer } from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './JourneyDetailsMom.module.css';
import toast from 'react-hot-toast';
import Preloader from '../Preloader/Preloader';

interface WeekData {
  analogy: string | null;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
}

interface Props {
  currentWeek?: number | null;
}

export default function JourneyDetailsBaby({ currentWeek }: Props) {
  const { user } = useAuthStore();
  const [data, setData] = useState<WeekData | null>(null);


useEffect(() => {
    const route = user ? `/weeks/${currentWeek}/baby` : '/weeks/public/dashboard';

    nextServer.defaults.baseURL = 'https://project-pregnant-back.onrender.com/api';

    async function fetchData() {
      try {
        const res = await nextServer.get(route);
        setData(res.data.baby ?? null);
      } catch {
        toast.error("Не вдалося завантажити інформацію по тижню");
      } 
    }

    fetchData();
}, [user, currentWeek]);
  

if (!data) return <div><Preloader /></div>; 

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>

        <div className={styles.left}>
          {data.image ? (
            <div className={styles.imageCard}>
              <img src={data.image} alt={data.analogy ?? 'Week image'} />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>Немає зображення</div>
          )}
          <p className={styles.imageCaption}>{data.analogy ?? ''}</p>
        </div>


        <div className={styles.right}>
          <p className={styles.description}>
            {data.babyActivity}
          </p>
          <p className={styles.description}>
            {data.babyDevelopment}
          </p>

          {/* <div className={styles.factBox}>
            <div>
              <h3 className={styles.factTitle}>Цікавий факт тижня</h3>
              <p className={styles.factText}>{data.interestingFact}</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
    
  );
}