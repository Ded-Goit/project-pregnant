'use client';

import dynamic from 'next/dynamic';
import styles from './dashboard.module.css';
import React, { useEffect, useState } from 'react';
// import type { DashboardResponse } from '../../types/note';
// import axios from 'axios';
import { useAuthStore } from '@/hooks/useAuthStore'; // ✅ підключаємо
import { nextServer } from '@/lib/api';

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

export async function getDashboardData(isAuthenticated: boolean) {
  const response = await nextServer.get(
    isAuthenticated ? '/weeks/dashboard' : '/weeks/public/dashboard'
  );
  return response.data;
}

export async function getUserName() {
  const response = await nextServer.get('/users/currentUser');
  return response.data;
}

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore(); // ✅ беремо стан із стора

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
        const [dashboardData, userData] = await Promise.all([
          getDashboardData(isAuthenticated),
          getUserName(),
        ]);

        if (dashboardData && userData) {
          setUserName(userData?.data?.name || 'Пані');
          setWeekNumber(dashboardData.data.data.weekNumber);
          setDaysLeft(dashboardData.data.data.daysLeft);
          setImage(dashboardData.data.data.baby.image);
          setBabySize(dashboardData.data.data.baby.babySize);
          setBabyWeight(dashboardData.data.data.baby.babyWeight);
          setBabyActivity(dashboardData.data.data.baby.babyActivity);
          setBabyDevelopment(dashboardData.data.data.baby.babyDevelopment);
          setMomDailyTips(dashboardData.data.data.baby.momDailyTips);
          setCategoryIconUrl(dashboardData.data.data.baby.categoryIconUrl);
        } else {
          setUserName('Пані');
        }
      } catch {
        setUserName('Пані');
      }
    };

    fetchData();
  }, [isAuthenticated, user]);

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
          <TasksReminderCard />
          <FeelingCheckCard />
        </div>
      </div>
    </main>
  );
}
