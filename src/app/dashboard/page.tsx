'use client';

import dynamic from 'next/dynamic';
import styles from './dashboard.module.css';
import React, { useEffect, useState } from 'react';
import { getDashboardData } from '../../lib/clientApi';
import type { DashboardResponse } from '../../types/note';

const GreetingBlock = dynamic(
  () => import('@/components/GreetingBlock/GreetingBlock')
);
const StatusBlock = dynamic(
  () => import('@/components/StatusBlock/StatusBlock')
);
const BabyTodayCard = dynamic(
  () => import('@/components/BabyTodayCard/BabyTodayCard')
);
const MomTipCard = dynamic(() => import('@/components/MomTipCard/MomTipCard'));
const TasksReminderCard = dynamic(
  () => import('@/components/TasksReminderCard/TasksReminderCard')
);
const FeelingCheckCard = dynamic(
  () => import('@/components/FeelingCheckCard/FeelingCheckCard')
);

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Пані');

  const [weekNumber, setWeekNumber] = useState<number>(5);
  const [daysLeft, setDaysLeft] = useState<number>(250);

  const [image, setImage] = useState<string>('');
  const [babySize, setBabySize] = useState<number>(0);
  const [babyWeight, setBabyWeight] = useState<number>(0);
  const [babyActivity, setBabyActivity] = useState<string>('');
  const [babyDevelopment, setBabyDevelopment] = useState<string>('');
  const [momDailyTips, setMomDailyTips] = useState<string>('');
  const [categoryIconUrl, setCategoryIconUrl] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Тут має бути ваша логіка визначення аутентифікації
        const auth = false; // Наприклад, отримати з контексту або cookie
        setIsAuthenticated(auth);

        const data: DashboardResponse = await getDashboardData(auth);

        if (data) {
          setUserName(data.name);
          setWeekNumber(data.weekNumber);
          setDaysLeft(data.daysLeft);
          setImage(data.baby.image);
          setBabySize(data.baby.babySize);
          setBabyWeight(data.baby.babyWeight);
          setBabyActivity(data.baby.babyActivity);
          setBabyDevelopment(data.baby.babyDevelopment);
          setMomDailyTips(data.baby.momDailyTips);
          setCategoryIconUrl(data.baby.categoryIconUrl);
        } else {
          setUserName('Пані');
        }
      } catch {
        setUserName('Пані');
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.dashboardGrid}>
      <GreetingBlock userName={userName} />
      <div className={styles.dashboardContainer}>
        <div className={styles.statusContainer}>
          <StatusBlock weekNumber={weekNumber} daysLeft={daysLeft} />
          <BabyTodayCard
            image={image}
            babySize={babySize}
            babyWeight={babyWeight}
            babyActivity={babyActivity}
            babyDevelopment={babyDevelopment}
          />
          <MomTipCard
            categoryIconUrl={categoryIconUrl}
            momDailyTips={momDailyTips}
          />
        </div>
        <div className={styles.taskContainer}>
          <TasksReminderCard isAuthenticated={isAuthenticated} />
          <FeelingCheckCard isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </main>
  );
}
