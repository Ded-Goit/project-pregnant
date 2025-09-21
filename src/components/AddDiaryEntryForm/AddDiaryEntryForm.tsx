'use client';

//import dynamic from 'next/dynamic';
import styles from './AddDiaryEntryForm.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function AddDiaryEntryForm() {
//   return (
//     <div className={styles.component}>
//       <h1 className={styles.title}>
//         Блок `Модальне вікно створення/редагування запису в щоденник` |
//         AddDiaryEntryModal
//       </h1>
//     </div>
//   );
// }
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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
  return (
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
        } catch (error: any) {
          setStatus(error.response?.data?.message || 'Помилка при збереженні');
          setSubmitting(false);
        }
      }}
    >
      {({ values, isSubmitting, setFieldValue, status }) => (
        <Form>
          <div>
            <label htmlFor="title">Заголовок</label>
            <Field type="text" id="title" name="title" />
            <ErrorMessage
              name="title"
              render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
            />
          </div>

          <div>
            <label>Категорії (емоції)</label>
            {categoriesOptions.map((category) => (
              <label key={category} style={{ display: 'block' }}>
                <Field
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={values.categories.includes(category)}
                  onChange={() => {
                    if (values.categories.includes(category)) {
                      setFieldValue(
                        'categories',
                        values.categories.filter((c) => c !== category)
                      );
                    } else {
                      setFieldValue('categories', [
                        ...values.categories,
                        category,
                      ]);
                    }
                  }}
                />
                {category}
              </label>
            ))}
            <ErrorMessage
              name="categories"
              render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
            />
          </div>

          <div>
            <label htmlFor="content">Запис</label>
            <Field as="textarea" id="content" name="content" rows={4} />
            <ErrorMessage
              name="content"
              render={(msg) => <div style={{ color: 'red' }}>{msg}</div>}
            />
          </div>

          {status && <div style={{ color: 'red' }}>{status}</div>}

          <button type="submit" disabled={isSubmitting}>
            Зберегти
          </button>
        </Form>
      )}
    </Formik>
  );
}
