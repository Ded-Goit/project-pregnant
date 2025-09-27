'use client';

//import dynamic from 'next/dynamic';

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

import styles from "./journeypage.module.css"
import GreetingBlock from "@/components/GreetingBlock/GreetingBlock";
import WeekSelector from "@/components/WeekSelector/WeekSelector";


export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.greetingWeekContainer}>
        <GreetingBlock userName="Пані" />
      </div>
      <WeekSelector total={42} startAt={1}/>
    </div>
  );
}
