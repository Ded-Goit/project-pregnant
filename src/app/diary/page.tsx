'use client';

import React from 'react';
import styles from './diary.module.css';
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import DiaryList from '../../components/DiaryList/DiaryList';
import DiaryEntryDetails from '../../components/DiaryEntryDetails/DiaryEntryDetails';
import type { DiaryEntry } from '../../components/DiaryEntryCard/DiaryEntryCard';

const ENTRIES: DiaryEntry[] = [
  { id:'1', title:'Перший привіт', content:'...', tags:['натхнення','вдячність'], createdAt:'2025-07-15T00:00:00.000Z'},
  { id:'2', title:'Дивне бажання', content:'...', tags:['Любов','дивні бажання'], createdAt:'2025-07-09T00:00:00.000Z' },
  { id:'3', title:'Дивне бажання', content:'...', tags:['енергія','дивні бажання'], createdAt:'2025-07-09T00:00:00.000Z' },
  { id:'4', title:'Дивне бажання', content:'...', tags:['нудота','тривога'], createdAt:'2025-07-09T00:00:00.000Z' },
  { id:'5', title:'Дивне бажання', content:'...', tags:['апетит','дивні бажання'], createdAt:'2025-07-09T00:00:00.000Z' },
  { id:'6', title:'Дивне бажання', content:'...', tags:['радість','щастя'], createdAt:'2025-07-09T00:00:00.000Z' },
];

const SELECTED: DiaryEntry = {
  id:'s1',
  title:'Перший привіт',
  content:`Це сталося! Сьогодні ввечері, коли я спокійно дивилась фільм, я це відчула...`,
  tags:['натхнення','вдячність'],
  createdAt:'2025-07-15T00:00:00.000Z',
};

export default function DiaryPage(){
  return (
    <div className={styles.layout} data-theme="pink">
<div className={styles.topbar}>
  <div className={styles.topbarBrand}>
    <div className={styles.logo} aria-hidden />
    <span>Лелека</span>
  </div>

  {/* бургер-иконка справа */}
  <button className={styles.menuBtn} type="button" aria-label="Меню">
    <span className={styles.menuIcon} aria-hidden="true">
      <span className={styles.menuBar}></span>
    </span>
  </button>
</div>

      {/* Main */}
      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.breadcrumbs}>
           <span className={styles.current}>Лелека</span> <span className={styles.span}>›</span> Щоденник
          </div>
          <GreetingBlock userName="Ганна" />
        </header>

        <div className={styles.contentRow}>
          {/* LIST — всегда виден (desktop & mobile/tablet) */}
          <section className={styles.listCard}>
            <DiaryList
              entries={ENTRIES}
              onAddClick={() => {}}
              onSelect={() => { /* id на десктопе можно подставлять запись в детали справа */ }}
            />
          </section>

          {/* DETAILS — только на десктопе (на мобиле — /diary/[entryId]) */}
          <section className={styles.detailsCard}>
            <DiaryEntryDetails
              entry={SELECTED}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          </section>
        </div>
      </main>
    </div>
  );
}













// import styles from "./diary.module.css";
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

// export default function DiaryPage() {
//   return (
//     <div className={styles.pageWrapper}>
//       <h1 className={styles.title}>
//         Блок `Сторінка щоденника` | DiaryPage | route: /diary
//       </h1>
//     </div>
//   );
// }