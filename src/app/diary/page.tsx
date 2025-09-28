'use client';

import React, { useEffect, useState } from 'react';
import styles from './diary.module.css';
import GreetingBlock from '../../components/GreetingBlock/GreetingBlock';
import DiaryList from '../../components/DiaryList/DiaryList';
import DiaryEntryDetails from '../../components/DiaryEntryDetails/DiaryEntryDetails';
import NewAddDiaryEntryModal from '@/components/NewAddDiaryEntryModal/NewAddDiaryEntryModal';
// import { ChevronRightIcon } from '@heroicons/react/24/solid';

import {
  createDiary,
  CreateDiaryRequest,
  delDiaries,
  Diary,
  getDiaries,
} from '@/lib/clientApi';
import { useAuthStore } from '@/hooks/useAuthStore';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [entries, setEntries] = useState<Diary[]>([]);
  const [selected, setSelected] = useState<Diary | undefined>(undefined);
  const { user } = useAuthStore();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);

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
  };

  const handleDeleteClick = async () => {
    if (!selected?._id) return;
    await delDiaries(selected?._id);
    setEntries((prev) => prev.filter((e) => e._id !== selected?._id));
    setSelected(entries[0]);
    setConfirmOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const diaries = await getDiaries();
      setEntries(diaries.data.data);
      setSelected(diaries.data.data[0]);
    };

    fetchData();
  }, [setEntries]);


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
            <div className={styles.detailsInner}>
            <DiaryEntryDetails
              entry={selected}
              onEdit={() => {}}
              onDelete={openConfirm}
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
      {isConfirmOpen && (
        <ConfirmationModal
          message="Видалити цей запис назавжди?"
          onConfirm={handleDeleteClick}
          onClose={closeConfirm}
        ></ConfirmationModal>
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
