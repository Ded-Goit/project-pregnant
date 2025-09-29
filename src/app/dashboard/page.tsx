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
    isAuthenticated ? '/api/weeks/dashboard' : '/api/public-dashboard',
    { baseURL: '' } // Use relative path, not the backend baseURL
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
        if (isAuthenticated) {
          const [dashboardData, userData] = await Promise.all([
            getDashboardData(true),
            getUserName(),
          ]);

          if (dashboardData && userData) {
            // Authenticated response has a nested `data.data` structure
            const data = dashboardData.data.data;
            setUserName(userData?.data?.name || 'Пані');
            setWeekNumber(data.weekNumber);
            setDaysLeft(data.daysLeft);
            setImage(data.baby.image);
            setBabySize(data.baby.babySize);
            setBabyWeight(data.baby.babyWeight);
            setBabyActivity(data.baby.babyActivity);
            setBabyDevelopment(data.baby.babyDevelopment);
            setMomDailyTips(data.baby.momDailyTips);
            setCategoryIconUrl(data.baby.categoryIconUrl);
          }
        } else {
          // Public response has a direct `data` structure
          const dashboardData = await getDashboardData(false);
          if (dashboardData) {
            const data = dashboardData.data;
            setUserName('Пані'); // Default name for public
            setWeekNumber(data.weekNumber);
            setDaysLeft(data.daysLeft);
            setImage(data.baby.image);
            setBabySize(data.baby.babySize);
            setBabyWeight(data.baby.babyWeight);
            setBabyActivity(data.baby.babyActivity);
            setBabyDevelopment(data.baby.babyDevelopment);
            setMomDailyTips(data.baby.momDailyTips);
            setCategoryIconUrl(data.baby.categoryIconUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
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
