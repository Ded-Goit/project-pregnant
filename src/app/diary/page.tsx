'use client';

import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import GreetingBlock from "../../components/GreetingBlock/GreetingBlock";
import DiaryList from "../../components/DiaryList/DiaryList";
import DiaryEntryDetails from "../../components/DiaryEntryDetails/DiaryEntryDetails";
import AddDiaryEntryModal from "../../components/AddDiaryEntryModal/AddDiaryEntryModal";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import type { DiaryEntry } from "../../components/DiaryEntryCard/DiaryEntryCard";
import styles from "./diary.module.css";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE || 'https://project-pregnant-back.onrender.com';

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editInitial, setEditInitial] = useState<DiaryEntry | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDelete, setToDelete] = useState<DiaryEntry | null>(null);

  const router = useRouter();

  const isDesktop = useMemo(
    () => (typeof window !== 'undefined' ? window.matchMedia('(min-width: 1024px)').matches : true),
    []
  );

  useEffect(() => {
    axios.get('/api/diary')
      .then((r) => setEntries(r.data || []))
      .catch((e) => setError(e?.message || 'Помилка завантаження'))
      .finally(() => setLoading(false));
  }, []);

  const selected = useMemo(
    () => entries.find(e => e.id === selectedId) || entries[0] || null,
    [entries, selectedId]
  );

  function openNew(){ setEditInitial(null); setModalOpen(true); }
  function openEdit(entry: DiaryEntry){ setEditInitial(entry); setModalOpen(true); }
  function requestDelete(entry: DiaryEntry){ setToDelete(entry); setConfirmOpen(true); }

  async function handleSubmit(payload: { title: string; content: string; tags: string[] }){
    if(editInitial){
      const r = await axios.put(`/api/diary/${editInitial.id}`, payload);
      const upd = r.data as DiaryEntry;
      setEntries(prev => prev.map(e => e.id === upd.id ? upd : e));
    } else {
      const r = await axios.post('/api/diary', payload);
      const created = r.data as DiaryEntry;
      setEntries(prev => [created, ...prev]);
      setSelectedId(created.id);
    }
    setModalOpen(false); setEditInitial(null);
  }

  async function handleConfirmDelete(){
    if(!toDelete) return;
    await axios.delete(`/api/diary/${toDelete.id}`);
    setEntries(prev => prev.filter(e => e.id !== toDelete.id));
    setConfirmOpen(false); setToDelete(null);
    setSelectedId(prev => prev === toDelete!.id ? null : prev);
  }

  if (loading) return <div className="container">Завантаження…</div>;
  if (error) return <div className="container" style={{ color: 'red' }}>{error}</div>;

  if (!isDesktop) {
    // Mobile/Tablet: only list at /diary
    return (
      <div className="container">
        <div className="row">
          <div className={styles.greetingFixed}><GreetingBlock userName="Пані" /></div>
          <section className="card">
            <DiaryList entries={entries} onNew={openNew} onSelect={(id)=>router.push(`/diary/${id}`)} />
          </section>
        </div>
        <AddDiaryEntryModal open={modalOpen} onClose={()=>setModalOpen(false)} initial={editInitial ?? undefined} onSubmit={handleSubmit} />
      </div>
    );
  }

  // Desktop: all blocks with fixed heights
  return (
    <div className="container">
      <div className="row">
        <div className={styles.greetingFixed}><GreetingBlock userName="Пані" /></div>
        <div className="row row-lg">
          <div className={styles.panelFixed} style={{ gridColumn: 'span 5' }}>
            <DiaryList entries={entries} onNew={openNew} onSelect={setSelectedId} />
          </div>
          <div className={styles.panelFixed} style={{ gridColumn: 'span 7' }}>
            <DiaryEntryDetails entry={selected || null} onEdit={()=>selected && openEdit(selected)} onDelete={()=>selected && requestDelete(selected)} />
          </div>
        </div>
      </div>

      <AddDiaryEntryModal open={modalOpen} onClose={()=>setModalOpen(false)} initial={editInitial ?? undefined} onSubmit={handleSubmit} />
      <ConfirmationModal open={confirmOpen} onClose={()=>setConfirmOpen(false)} onConfirm={handleConfirmDelete} text="Видалити цей запис назавжди?" />
    </div>
  );
}

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