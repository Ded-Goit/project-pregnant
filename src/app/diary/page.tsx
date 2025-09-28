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
  delDiaries,
  Diary,
  getDiaries,
  updateDiary,
} from '@/lib/clientApi';
import { useAuthStore } from '@/hooks/useAuthStore';
import ConfirmationModal from '@/components/ConfirmationModal/ConfirmationModal';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Заголовок має бути не менше 3 символів')
    .max(30, 'Заголовок занадто довгий')
    .required('Обов’язкове поле'),
  emotions: Yup.array()
    .of(Yup.string())
    .min(1, 'Оберіть щонайменше одну категорію'),
  descr: Yup.string()
    .min(5, 'Запис має бути не менше 5 символів')
    .required('Обов’язкове поле'),
});

export interface ErrorValodationProps {
  field?: string;
  message: string;
}

export default function DiaryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [entries, setEntries] = useState<Diary[]>([]);
  const [selected, setSelected] = useState<Diary | undefined>(undefined);
  const [errorValidation, setErrorValidation] =
    useState<ErrorValodationProps | null>(null);
  const { user } = useAuthStore();

  const router = useRouter();
  const openModal = (mode: boolean) => {
    setIsEdit(mode);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setErrorValidation(null);
  };
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
      await validationSchema.validate(payload);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        setErrorValidation({
          field: err.path,
          message: err.message,
        });
        return;
      }
    }

    if (!isEdit) {
      try {
        const apiRes = await createDiary(payload);
        if (apiRes.data?.data) {
          setEntries((prev) => [...prev, apiRes.data.data]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (isEdit) {
      try {
        const apiRes = await updateDiary(selected?._id, payload);
        setSelected(apiRes.data);
        setEntries((prev) =>
          prev.map((e) => (e._id === selected?._id ? apiRes.data : e))
        );
      } catch (error) {
        console.error(error);
      }
    }
    closeModal();
  };

  const handleSelectClick = (event: React.MouseEvent) => {
    const id = event.currentTarget.id;
    const selectedEntry: Diary | undefined = entries.find(
      (entry) => entry._id === id
    );
    setSelected(selectedEntry);
    if (window.innerWidth < 1440) {
      router.push(`/diary/${id}`);
      return;
    }
  };

  const handleDeleteClick = async () => {
    if (!selected?._id) return;
    await delDiaries(selected?._id);
    setEntries((prev) => {
      const filtered = prev.filter((e) => e._id !== selected._id);
      setSelected(filtered[0]);
      return filtered;
    });
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

  return (
    <div className={styles.layout} data-theme="pink">
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
            <DiaryEntryDetails
              entry={selected}
              onEdit={openModal}
              onDelete={openConfirm}
            />
          </section>
        </div>
      </main>
      {isModalOpen && (
        <NewAddDiaryEntryModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={isEdit ? selected : undefined}
          errorValidation={errorValidation}
        ></NewAddDiaryEntryModal>
      )}
      {isConfirmOpen && (
        <ConfirmationModal
          title="Видалити цей запис назавжди?"
          onConfirm={handleDeleteClick}
          onCancel={closeConfirm}
          cancelButtonText="Скасувати"
          confirmButtonText="Видалити"
        ></ConfirmationModal>
      )}
    </div>
  );
}
