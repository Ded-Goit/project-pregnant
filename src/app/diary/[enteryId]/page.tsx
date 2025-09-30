'use client';

import React, { useEffect, useState } from 'react';
import s from './entry.module.css';
import { useParams, useRouter } from 'next/navigation';
import {
  CreateDiaryRequest,
  delDiaries,
  Diary,
  GetDiaryRec,
  updateDiary,
} from '@/lib/clientApi';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import NewAddDiaryEntryModal from '@/components/NewAddDiaryEntryModal/NewAddDiaryEntryModal';

export default function DiaryEntryRoute() {
  const { enteryId } = useParams<{ enteryId: string }>();
  const [diaryRec, setDiaryRec] = useState<Diary | undefined>(undefined);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openConfirm = () => setConfirmOpen(true);
  const closeConfirm = () => setConfirmOpen(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
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
      const apiRes = await updateDiary(enteryId, payload);
      router.push('/diary');
    } catch (error) {
      console.error(error);
    }

    closeModal();
  };

  const handleDeleteClick = async () => {
    if (!diaryRec) return;
    await delDiaries(diaryRec?._id);
    setConfirmOpen(false);
    router.push('/diary');
  };

  useEffect(() => {
    async function fetchDiary() {
      try {
        const res = await GetDiaryRec(enteryId);
        console.log(res.data);
        setDiaryRec(res.data);
      } catch (err) {
        console.error('Failed to fetch diary:', err);
      }
    }

    fetchDiary();
  }, [enteryId]);
  return (
    <div className={s.wrap}>
      <button className={s.backBtn} onClick={() => history.back()}>
        ← До списку
      </button>
      <section className={s.detailsCard}>
        <div className={s.detailsInner}>
          {!diaryRec && <div>Запис не знайдено</div>}
          {diaryRec && (
            <div className={s.detailsTop}>
              <div className={s.detailsTitleRow}>
                <h3 className={s.detailsTitle}>{diaryRec?.title}</h3>
                <button
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border: '1px solid var(--color-scheme-border)',
                  }}
                  onClick={openModal}>
                  ✎
                </button>
              </div>
              <div className={s.detailsActions}>
                <div className={s.detailsDate}>
                  {diaryRec?.createdAt.slice(0, 10)}
                </div>
                <button
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 999,
                    border: '1px solid var(--color-scheme-border)',
                  }}
                  onClick={openConfirm}
                >
                  🗑️
                </button>
              </div>
            </div>
          )}

          <div className={s.detailsBody}>
            <article
              style={{
                whiteSpace: 'pre-wrap',
                lineHeight: 1.55,
                color: 'var(--color-neutral-darker)',
              }}
            >
              {diaryRec?.descr}
            </article>
          </div>
          <div>
            <ul>
              {diaryRec?.emotions.map((emotion) => (
                <li key={emotion._id}>{emotion.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {isConfirmOpen && (
        <ConfirmationModal
          title="Видалити цей запис назавжди?"
          onConfirm={handleDeleteClick}
          onCancel={closeConfirm}
          cancelButtonText="Скасувати"
          confirmButtonText="Видалити"
        ></ConfirmationModal>
      )}
      {isModalOpen && (
        <NewAddDiaryEntryModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={diaryRec}
        ></NewAddDiaryEntryModal>
      )}
    </div>
  );
}
