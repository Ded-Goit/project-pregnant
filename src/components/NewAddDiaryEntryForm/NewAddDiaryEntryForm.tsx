'use client';

import styles from './NewAddDiaryEntryForm.module.css';
import React from 'react';
import * as Yup from 'yup';
import Button from '../UI/Buttons/Buttons';

interface AddDiaryEntryFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

const categoriesOptions = [
  'Радість',
  'Сум',
  'Стрес',
  'Спокій',
  'Втома',
  'Щастя',
];

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Заголовок має бути не менше 3 символів')
    .max(255, 'Заголовок занадто довгий')
    .required('Обов’язкове поле'),
  emotions: Yup.array()
    .of(Yup.string())
    .min(1, 'Оберіть щонайменше одну категорію'),
  descr: Yup.string()
    .min(5, 'Запис має бути не менше 5 символів')
    .required('Обов’язкове поле'),
});

const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>
    {children}
  </div>
);

export default function NewAddDiaryEntryForm({
  onSubmit,
}: AddDiaryEntryFormProps) {
  return (
    <form className={styles.diaryForm} onSubmit={onSubmit}>
      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel} htmlFor="title">
          Заголовок
        </label>
        <input
          className={styles.fieldInput}
          type="text"
          id="title"
          name="title"
          placeholder="Введіть заголовок запису "
        />
      </div>

      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel} htmlFor="emotions">
          Категорії
        </label>
      </div>

      <div>
        <label className={styles.fieldLabel} htmlFor="content">
          Запис
        </label>
        <textarea
          className={styles.fieldTextInput}
          id="content"
          name="descr"
          rows={4}
          placeholder="Запишіть, як ви себе відчуваєте"
        />
      </div>

      <Button type="submit" variant="primary" size="large">
        Зберегти
      </Button>
    </form>
  );
}