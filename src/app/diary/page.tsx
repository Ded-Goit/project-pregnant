'use client';

import React, { useEffect, useState } from 'react';
import styles from './diary.module.css';
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import DiaryList from '../../components/DiaryList/DiaryList';
import DiaryEntryDetails from '../../components/DiaryEntryDetails/DiaryEntryDetails';
import NewAddDiaryEntryModal from '@/components/NewAddDiaryEntryModal/NewAddDiaryEntryModal';
import {
  createDiary,
  CreateDiaryRequest,
  Diary,
  getDiaries,
} from '@/lib/clientApi';
import { useAuthStore } from '@/hooks/useAuthStore';

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<Diary[]>([]);
  const [selected, setSelected] = useState<Diary | undefined>(undefined);
  const { user } = useAuthStore();
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

    try {
      const apiRes = await createDiary(payload);
      if (apiRes.data?.data) {
        setEntries((prev) => [...prev, apiRes.data.data]);
        closeModal();
      }
    } catch {}
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    const selectedEntry: Diary | undefined = entries.find(
      (entry) => entry._id === id
    );
    setSelected(selectedEntry);
    console.log(selectedEntry);
  };

  useEffect(() => {
    const fetchData = async () => {
      const diaries = await getDiaries();
      setEntries(diaries.data.data);
      setSelected(diaries.data.data[0]);
    };

    fetchData();
  }, [setEntries]);

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
            <span className={styles.current}>Лелека</span>{' '}
            <span className={styles.span}>›</span> Щоденник
          </div>
          <GreetingBlock userName={user?.name} />
        </header>

        <div className={styles.contentRow}>
          {/* LIST — всегда виден (desktop & mobile/tablet) */}
          <section className={styles.listCard}>
            <DiaryList
              entries={entries}
              onAddClick={openModal}
              onSelect={handleSelectClick}
            />
          </section>
          {/* DETAILS — только на десктопе (на мобиле — /diary/[entryId]) */}
          <section className={styles.detailsCard}>
            <DiaryEntryDetails
              entry={selected}
              onEdit={() => {}}
              onDelete={() => {}}
            />
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
