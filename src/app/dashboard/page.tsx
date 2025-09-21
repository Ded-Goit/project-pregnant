'use client';

import dynamic from 'next/dynamic';
import styles from './dashboard.module.css';
import SpinnerFlowersLine from '@/components/SpinnerFlowersLine/SpinnerFlowersLine';
import React, { useEffect, useState } from 'react';

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
  return (
    <main className={styles.dashboardGrid}>
      <GreetingBlock />
      <div className={styles.dashboardContainer}>
        <div className={styles.statusContainer}>
          <StatusBlock />
          <BabyTodayCard />
          <MomTipCard />
        </div>
        <div className={styles.taskContainer}>
          <TasksReminderCard isAuthenticated={true} />
          <FeelingCheckCard isAuthenticated={true} />
        </div>
      </div>
    </main>
  );
}
