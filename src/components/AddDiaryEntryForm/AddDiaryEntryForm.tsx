'use client';

import styles from './AddDiaryEntryForm.module.css';

import React, { useState, useRef, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Button from '../UI/Buttons/Buttons';

// Тип даних запису
export interface DiaryEntry {
  id?: string;
  title: string;
  categories: string[];
  content: string;
  createdAt?: string;
}

interface AddDiaryEntryFormProps {
  initialEntry?: DiaryEntry;
  onSubmit: (entry: DiaryEntry) => void;
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
  categories: Yup.array().min(1, 'Оберіть щонайменше одну категорію'),
  content: Yup.string()
    .min(5, 'Запис має бути не менше 5 символів')
    .required('Обов’язкове поле'),
});

export default function AddDiaryEntryForm({
  initialEntry,
  onSubmit,
}: AddDiaryEntryFormProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Обробник кліку поза компонентом
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div>
      <Formik
        initialValues={{
          title: initialEntry?.title || '',
          categories: initialEntry?.categories || [],
          content: initialEntry?.content || '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const response = initialEntry?.id
              ? await axios.put(`/api/diary/${initialEntry.id}`, values)
              : await axios.post('/api/diary', values);
            setSubmitting(false);
            onSubmit(response.data);
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setStatus(
                error.response?.data?.message || 'Помилка при збереженні'
              );
            } else {
              setStatus('Сталася невідома помилка');
            }
            setSubmitting(false);
          }
        }}
      >
        {({ values, isSubmitting, setFieldValue, status }) => {
          const toggleCategory = (category: string) => {
            if (values.categories.includes(category)) {
              setFieldValue(
                'categories',
                values.categories.filter((c) => c !== category)
              );
            } else {
              setFieldValue('categories', [...values.categories, category]);
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
                <ErrorMessage
                  name="title"
                  render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                />
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
                  role="button"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                >
                  {values.categories.length > 0
                    ? values.categories.join(', ')
                    : 'Оберіть категорії…'}
                </div>

                {dropdownOpen && (
                  <div className={styles.dropDown} role="listbox">
                    {categoriesOptions.map((category) => (
                      <label className={styles.taskLabel} key={category}>
                        <input
                          type="checkbox"
                          checked={values.categories.includes(category)}
                          onChange={() => toggleCategory(category)}
                        />
                        <span className={styles.customCheckbox}></span>
                        <span className={styles.checkmark}>{category}</span>
                      </label>
                    ))}
                  </div>
                )}

                <ErrorMessage
                  name="categories"
                  render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                />
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
                <ErrorMessage
                  name="content"
                  render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                />
              </div>

              {status && <div style={{ color: 'red' }}>{status}</div>}

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
