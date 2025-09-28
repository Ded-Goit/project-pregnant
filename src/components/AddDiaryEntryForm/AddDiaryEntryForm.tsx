'use client';

import styles from './AddDiaryEntryForm.module.css';
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from '../UI/Buttons/Buttons';
import { getErrorMessage } from '../../lib/errorUtils';
import axios from 'axios';
import { Diary, Emotion } from '@/lib/clientApi';

interface AddDiaryEntryFormProps {
  initialEntry?: Diary;
  onSubmit: (entry: Diary) => void;
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
  categories: Yup.array()
    .of(Yup.string())
    .min(1, 'Оберіть щонайменше одну категорію'),
  content: Yup.string()
    .min(5, 'Запис має бути не менше 5 символів')
    .required('Обов’язкове поле'),
});

export async function saveDiaryEntry(
  id: string | undefined,
  data: Omit<Diary, 'id' | 'createdAt'>
): Promise<Diary> {
  if (id) {
    const response = await axios.put(`/api/diary/${id}`, data);
    return response.data;
  } else {
    const response = await axios.post('/api/diary', data);
    return response.data;
  }
}

// Компонент для помилок
const ErrorText = ({ children }: { children: React.ReactNode }) => (
  <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>
    {children}
  </div>
);

export default function AddDiaryEntryForm({
  initialEntry,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          title: initialEntry?.title || '',
          emotions: initialEntry?.emotions || [],
          descr: initialEntry?.descr || '',
        }}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const savedEntry = await saveDiaryEntry(initialEntry?._id, values);
            setSubmitting(false);
            onSubmit(savedEntry);
          } catch (error) {
            setStatus(getErrorMessage(error));
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue, status }) => {
          const toggleCategory = (category: string) => {
            const titles = values.emotions.map((e: Emotion) => e.title);
            if (titles.includes(category)) {
              setFieldValue(
                'categories',
                values.emotions.filter((c) => c.title !== category)
              );
            } else {
              setFieldValue('categories', [...values.emotions, category]);
            }
          };

          return (
            <Form className={styles.diaryForm}>
              <div className={styles.fieldContainer}>
                <label className={styles.fieldLabel} htmlFor="title">
                  Заголовок
                </label>
                <Field
                  className={styles.fieldInput}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Введіть заголовок запису "
                />
                <ErrorMessage name="title">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </div>

              <div className={styles.fieldContainer} ref={dropdownRef}>
                <label className={styles.fieldLabel} htmlFor="categories">
                  Категорії
                </label>
                <div
                  className={
                    dropdownOpen
                      ? styles.fieldInputCheckboxOpen
                      : styles.fieldInputCheckboxClosed
                  }
                  tabIndex={0}
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setDropdownOpen(false);
                    }
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setDropdownOpen((prev) => !prev);
                    }
                  }}
                  role="button"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  {values.emotions.length > 0
                    ? values.emotions.join(', ')
                    : 'Оберіть категорії…'}
                </div>

                {dropdownOpen && (
                  <div
                    className={styles.dropDown}
                    role="listbox"
                    aria-multiselectable="true"
                  >
                    {categoriesOptions.map((category) => (
                      <label className={styles.taskLabel} key={category}>
                        <input
                          type="checkbox"
                          checked={
                            false ||
                            values.emotions.some((v) => v.title === category)
                          }
                          onChange={() => toggleCategory(category)}
                        />
                        <span className={styles.customCheckbox}></span>
                        <span className={styles.checkmark}>{category}</span>
                      </label>
                    ))}
                  </div>
                )}

                <ErrorMessage name="categories">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </div>

              <div>
                <label className={styles.fieldLabel} htmlFor="content">
                  Запис
                </label>
                <Field
                  className={styles.fieldTextInput}
                  as="textarea"
                  id="content"
                  name="content"
                  rows={4}
                  placeholder="Запишіть, як ви себе відчуваєте"
                />
                <ErrorMessage name="content">
                  {(msg) => <ErrorText>{msg}</ErrorText>}
                </ErrorMessage>
              </div>

              {status && <ErrorText>{status}</ErrorText>}

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isSubmitting}
              >
                Зберегти
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
