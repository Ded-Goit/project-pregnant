'use client';

import dynamic from 'next/dynamic';
import styles from './dashboard.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import SpinnerFlowersLine from '@/components/SpinnerFlowersLine/SpinnerFlowersLine';

axios.defaults.baseURL = 'https://project-pregnant-back.onrender.com';

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

// export default function DashboardPage() {
//   return (
//     <div className={styles.pageWrapper}>
//       <h1 className={styles.title}>БЛОКИ сторінки Мій День</h1>
//     </div>
//   );
// }
export default function DashboardPage() {
  // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // тут ваша логіка аутентифікації
  // const [userName, setUserName] = useState<string>('Пані');

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
        // Визначте свій спосіб перевірки авторизації користувача
        // Нижче просто приклад жорсткого коду
        const auth = false; // або отримати з контексту, cookie тощо
        // setIsAuthenticated(auth);

        const response = await axios.get(
          auth ? '/api/weeks/dashboard' : '/api/weeks/public/dashboard'
        );
        console.log('Отримані дані:', response.data);

        if (response.data) {
          // setUserName(response.data.name);
          setWeekNumber(response.data.weekNumber);
          setDaysLeft(response.data.daysLeft);
          setImage(response.data.baby.image);
          setBabySize(response.data.baby.babySize);
          setBabyWeight(response.data.baby.babyWeight);
          setBabyActivity(response.data.baby.babyActivity);
          setBabyDevelopment(response.data.baby.babyDevelopment);
          setMomDailyTips(response.data.baby.momDailyTips);
          setCategoryIconUrl(response.data.baby.categoryIconUrl);
        } else {
          // setUserName('Пані'); // якщо ім'я не прийшло
        }
      } catch (error) {
        // setUserName('Пані'); // обробка помилки, якщо не вдалось запитати
      }
    };

    fetchData();
  }, []);

  return (
    <main className={styles.dashboardGrid}>
      <GreetingBlock userName="Пані" />
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
          <TasksReminderCard isAuthenticated={true} />
          <FeelingCheckCard isAuthenticated={true} />
        </div>
      </div>
    </main>
  );
}
