'use client';

//import dynamic from 'next/dynamic';
import styles from './journeypage.module.css';

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

export default function JorneyPage() {
  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>
        `Блок `Подорож вагітності` | JourneyPage | route: /journey/[weekNumber]`
        URL сторінки змінюється на /journey/[weekNumber] відповідного тижня.
      </h1>
    </div>
  );
}
