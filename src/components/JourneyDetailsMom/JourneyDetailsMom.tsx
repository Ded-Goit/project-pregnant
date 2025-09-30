'use client';

import React, { useEffect, useState } from 'react';
import { nextServer } from '@/lib/api';
import { useAuthStore } from '@/hooks/useAuthStore';
import styles from './JourneyDetailsMom.module.css';
import toast from 'react-hot-toast';
import Preloader from '../Preloader/Preloader';
import TasksReminderCard from '../TasksReminderCard/TasksReminderCard';
import { getMomWeek } from '@/lib/clientApi';

interface WeekDataForMom {
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: {
    category: string;
    tip: string;
  }[];
}

interface Props {
  currentWeek?: number | null;
}

export default function JourneyDetailsBaby({ currentWeek }: Props) {
  const { user } = useAuthStore();
  const [data, setData] = useState<WeekDataForMom | null>(null);

  useEffect(() => {
    const route = user?.currentWeek.weekNumber ? `${currentWeek}` : 'public';

    async function fetchData() {
      try {
        const res = await getMomWeek(route);

        setData(res.data);
      } catch {
        toast.error('Не вдалося завантажити інформацію по тижню');
      }
    }

    fetchData();
  }, [user, currentWeek]);

  const categoryIconMap: Record<string, string> = {
    Харчування: 'fork_spoon',
    Активність: 'fitness_center',
    'Відпочинок та комфорт': 'chair',
  };

  if (!data)
    return (
      <div>
        <Preloader />
      </div>
    );

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.state}>
          <h3 className={styles.titleState}>Як ви можете почуватись</h3>
          <ul className={styles.listState}>
            {data.feelings.states.map((state, index) => (
              <li className={styles.listItemState} key={index}>
                {state}
              </li>
            ))}
          </ul>
          <p className={styles.sensationDescr}>
            {data.feelings.sensationDescr}
          </p>
        </div>
        <div className={styles.advice}>
          <h3 className={styles.adviceTitle}>Поради для вашого комфорту</h3>
          <ul className={styles.adviceTips}>
            {data?.comfortTips.map((tip, index) => {
              const iconId = categoryIconMap[tip.category];
              return (
                <li key={index} className={styles.adviceTipsItem}>
                  <div className={styles.containerTitleTips}>
                    {iconId && (
                      <svg className={styles.tipIcon} width={24} height={24}>
                        <use href={`/journeyIcon.svg#${iconId}`} />
                      </svg>
                    )}
                    <h4 className={styles.adviceTipsTitle}>{tip.category}</h4>
                  </div>
                  <p className={styles.categoryTipsText}>{tip.tip}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.gridBlock}>
          <TasksReminderCard />
        </div>
      </div>
    </section>
  );
}
