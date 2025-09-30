'use client';

import styles from './FeelingCheckCard.module.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../UI/Buttons/Buttons';
import { useAuthStore } from '@/hooks/useAuthStore';
import NewAddDiaryEntryModal from '../NewAddDiaryEntryModal/NewAddDiaryEntryModal';
import {
  createDiary,
  CreateDiaryRequest,
  Diary,
  updateDiary,
} from '@/lib/clientApi';
import { ErrorValodationProps, validationSchema } from '@/app/diary/page';
import * as Yup from 'yup';

export default function FeelingCheckCard() {
  const { isAuthenticated } = useAuthStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [entries, setEntries] = useState<Diary[]>([]);
  const [selected, setSelected] = useState<Diary | undefined>(undefined);
  const [errorValidation, setErrorValidation] =
    useState<ErrorValodationProps | null>(null);
  const router = useRouter();

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      router.push('/auth/register');
    } else {
      setModalOpen(true);
    }
  };

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

  const closeModal = () => setModalOpen(false);

  return (
    <section className={styles.feelingCheckCard}>
      <h3 className={styles.feelingCheckTitle}>Як ви себе почуваєте?</h3>
      <p className={styles.feelingCheckRecommendation}>
        Рекомендація на сьогодні:
      </p>
      <p className={styles.feelingCheckNote}>
        {' '}
        Занотуйте незвичні відчуття у тілі.
      </p>
      <Button variant="primary" size="large" onClick={handleButtonClick}>
        Зробити запис у щоденник
      </Button>

      {modalOpen && (
        <NewAddDiaryEntryModal
          onClose={closeModal}
          onSubmit={handleSubmit}
          errorValidation={errorValidation}
        ></NewAddDiaryEntryModal>
      )}
    </section>
  );
}
