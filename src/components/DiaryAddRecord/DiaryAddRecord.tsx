'use client';

import css from './DiaryAddRecord.module.css';
import { createPortal } from 'react-dom';
import { createDiary } from '@/lib/clientApi';
import React, { useEffect, useState } from 'react';
import { getEmotions } from '@/lib/clientApi';
import type { CreateDiaryRequest } from '@/lib/clientApi';
import type { Emotion } from '@/lib/clientApi';

interface ModalProps {
  onClose: () => void;
}

export default function DiaryAddRecord({ onClose }: ModalProps) {
  const [emotionsList, setEmotionsList] = useState<Emotion[]>([]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload: CreateDiaryRequest = {
      title: String(fd.get('title') ?? ''),
      emotions: fd.getAll('emotions').map((v) => String(v)),
      descr: String(fd.get('descr') ?? ''),
    };
    // createDiary(payload);
  };

const EmotionT = emotionsList.map(({_id, title}) => (
  <option key={_id} value={_id}>{title}</option>
));

useEffect(() => {
    const fetchData = async () => {
      const emotions = await getEmotions();
      setEmotionsList(emotions.data.data);
    };

    fetchData();
  }, []);

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button
          className={css.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>
        <h2>Новий запис</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Заголовок:</label>
            <input type="text" name="Заголовок"></input>
          </div>
          <div>
            <label>Теги:</label>
            {/* <input type="chekbox" /> */}
            <select name="Теги" multiselect>
              {EmotionT}
            </select>
          </div>
          <label>Запис:</label>
          <div>
            <textarea name="Запис"></textarea>
          </div>
          <button type="submit">Зберегти</button>
        </form>
      </div>
    </div>
  );
}