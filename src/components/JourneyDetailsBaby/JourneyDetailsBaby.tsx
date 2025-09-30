'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './JourneyDetailsBaby.module.css';
import toast from 'react-hot-toast';
import Preloader from '../Preloader/Preloader';
import Image from 'next/image';
import { getBabyWeek } from '@/lib/clientApi';

interface WeekDataForBaby {
  analogy: string | null;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
}

interface Props {
  currentWeek: number;
}

export default function JourneyDetailsBaby({ currentWeek }: Props) {
  const { user } = useAuthStore();
  const [data, setData] = useState<WeekDataForBaby | null>(null);

  useEffect(() => {
    const route = user?.currentWeek.weekNumber ? `${currentWeek}` : 'public';

    async function fetchData() {
      try {
        const res = await getBabyWeek(route);
        setData(res.data);
      } catch {
        toast.error('Не вдалося завантажити інформацію по тижню');
      }
    }

    fetchData();
  }, [user, currentWeek]);

  if (!data)
    return (
      <div>
        <Preloader />
      </div>
    );

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.left}>
          {data.image ? (
            <div className={styles.imageCard}>
              <Image
                src={data.image ?? ''}
                alt={data.analogy ?? 'Week image'}
                width={500}
                height={500}
              />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>Немає зображення</div>
          )}
          <p className={styles.imageCaption}>{data.analogy ?? ''}</p>
        </div>

        <div className={styles.right}>
          <p className={styles.description}>{data.babyActivity}</p>
          <p className={styles.description}>{data.babyDevelopment}</p>

          <div className={styles.factBox}>
            <div>
              <h3 className={styles.factTitle}>
                <svg className="starShine" width={24} height={24}>
                  <use href="/journeyIcon.svg#star_shine" />
                </svg>
                Цікавий факт тижня
              </h3>
              <p className={styles.factText}>{data.interestingFact}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
