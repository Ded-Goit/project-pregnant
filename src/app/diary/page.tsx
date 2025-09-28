'use client';

import React, { useEffect, useState } from 'react';
import styles from './diary.module.css';
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import DiaryList from '../../components/DiaryList/DiaryList';
import DiaryEntryDetails from '../../components/DiaryEntryDetails/DiaryEntryDetails';
import type { DiaryEntry } from '../../components/DiaryEntryCard/DiaryEntryCard';
import NewAddDiaryEntryModal from '@/components/NewAddDiaryEntryModal/NewAddDiaryEntryModal';
import { CreateDiaryRequest, getEmotions } from '@/lib/clientApi';
// import dynamic from 'next/dynamic';
// import {DashboardResponse} from '../../types/note';
// import axios from 'axios';
// import { useAuthStore } from '@/hooks/useAuthStore';

// const GreetingBlock = dynamic(
//   () => import('@/components/GreetingBlock/GreetingBlock')
// );

const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

const ENTRIES: DiaryEntry[] = [
  {
    id: '1',
    title: 'Перший привіт',
    content: '...',
    tags: ['натхнення', 'вдячність'],
    createdAt: '2025-07-15T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Дивне бажання',
    content: '...',
    tags: ['Любов', 'дивні бажання'],
    createdAt: '2025-07-09T00:00:00.000Z',
  },
  {
    id: '3',
    title: 'Дивне бажання',
    content: '...',
    tags: ['енергія', 'дивні бажання'],
    createdAt: '2025-07-09T00:00:00.000Z',
  },
  {
    id: '4',
    title: 'Дивне бажання',
    content: '...',
    tags: ['нудота', 'тривога'],
    createdAt: '2025-07-09T00:00:00.000Z',
  },
  {
    id: '5',
    title: 'Дивне бажання',
    content: '...',
    tags: ['апетит', 'дивні бажання'],
    createdAt: '2025-07-09T00:00:00.000Z',
  },
  {
    id: '6',
    title: 'Дивне бажання',
    content: '...',
    tags: ['радість', 'щастя'],
    createdAt: '2025-07-09T00:00:00.000Z',
  },
];

const SELECTED: DiaryEntry = {
  id: 's1',
  title: 'Перший привіт',
  content: "Це сталося! Сьогодні ввечері, коли я спокійно дивилась фільм, я це відчула...",
  tags: ['натхнення', 'вдячність'],
  createdAt: '2025-07-15T00:00:00.000Z',
};

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: CreateDiaryRequest = {
      title: String(fd.get('title') ?? ''),
      emotions: fd.getAll('emotions').map((v) => String(v)),
      descr: String(fd.get('descr') ?? ''),
    };
    // createDiary(payload);
    console.log(payload);
  };

  useEffect(() => {
    const fetchData = async () => {
      const emotions = await getEmotions();
      console.log(emotions.data.data);
    };

    fetchData();
  }, []);


// async function getDiaryData(isAuthenticated: boolean) {
//   const response = await axios.get(
//     isAuthenticated ? '/api/weeks/diary' : '/api/weeks/public/diary'
//   );
//   return response.data;
// }

  // function DiaryPage() {
  // const { isAuthenticated, user } = useAuthStore(); 

  // const [userName, setUserName] = useState<string>('Пані');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const data: DashboardResponse = await getDiaryData(isAuthenticated);

  //       if (data) {
  //         setUserName(user?.name || data.name || 'Пані');
  //       } else {
  //         setUserName('Пані');
  //       }
  //     } catch {
  //       setUserName('Пані');
  //     }
  //   };

  //   fetchData();
  // },[isAuthenticated, user]);

  return (
    <div className={styles.pageWrapper}>
      {/* Main */}
      <main className={styles.main}>
        <header className={styles.pageHeader}>
          <div className={styles.breadcrumbs}>
            <nav className={styles.breadcrumbs}>
              <span className={styles.breadcrumbText}>Лелека</span>
              <ChevronRightIcon />
              <span className={styles.breadcrumbCurrent}>Профіль</span>
           </nav>
          </div>
          {/* <GreetingBlock userName={userName}/> */}
          <GreetingBlock userName="Ганна" />
        </header>

        <div className={styles.contentRow}>
          {/* LIST — всегда виден (desktop & mobile/tablet) */}
          <section className={styles.listCard}>
            <DiaryList
              entries={ENTRIES}
              onAddClick={openModal}
              onSelect={() => {
                /* id на десктопе можно подставлять запись в детали справа */
              }}
            />
          </section>
          {/* DETAILS — только на десктопе (на мобиле — /diary/[entryId]) */}
          <section className={styles.detailsCard}>
            <div className={styles.detailsInner}>
            <DiaryEntryDetails
              entry={SELECTED}
              onEdit={() => {}}
              onDelete={() => {}}
            />
            </div>
          </section>
        </div>
      </main>
      {isModalOpen && (
        <NewAddDiaryEntryModal
          onClose={closeModal}
          onSubmit={handleSubmit}
        ></NewAddDiaryEntryModal>
      )}
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
//         Блок Сторінка щоденника | DiaryPage | route: /diary
//       </h1>
//     </div>
//   );
// }