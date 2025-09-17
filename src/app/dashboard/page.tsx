'use client';

//import dynamic from 'next/dynamic';
import styles from './dashboard.module.css';

/*const GreetingBlock = dynamic(
  () => import('@/components/dashboard/greeting-block')
);
const StatusBlock = dynamic(
  () => import('@/components/dashboard/status-block')
);
const BabyTodayCard = dynamic(
  () => import('@/components/dashboard/baby-today-card')
);
const MomTipCard = dynamic(() => import('@/components/dashboard/mom-tip-card'));
const TasksReminderCard = dynamic(
  () => import('@/components/dashboard/tasks-reminder-card')
);
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

export default function DashboardPage() {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>БЛОКИ сторінки Мій День</h1>
    </div>
  );
}
