'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { User, UserUpdateData } from '@/types/user';
import styles from './ProfileEditForm.module.css';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

interface ProfileEditFormProps {
  initialData: User;
  onSubmit?: (values: UserUpdateData) => Promise<void>;
}

// Функції для валідації дати
const getMinDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date.toISOString().split('T')[0];
};

const getMaxDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 280);
  return date.toISOString().split('T')[0];
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Ім'я обов'язкове")
    .max(32, "Ім'я не може перевищувати 32 символи")
    .matches(/^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'-\s]+$/, "Ім'я містить недопустимі символи"),
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий")
    .max(64, 'Email не може перевищувати 64 символи'),
  childGender: Yup.string()
    .nullable()
    .oneOf(['boy', 'girl', null], 'Оберіть коректну стать'),
  dueDate: Yup.date()
    .nullable()
    .min(getMinDueDate(), 'Дата повинна бути щонайменше через тиждень')
    .max(getMaxDueDate(), 'Дата не може перевищувати 40 тижнів')
    .transform((value, originalValue) => originalValue === '' ? null : value),
});

export default function ProfileEditForm({ initialData, onSubmit }: ProfileEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialValues] = useState({
    name: initialData.name,
    email: initialData.email,
    childGender: initialData.childGender || '',
    dueDate: initialData.dueDate || ''
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setIsLoading(true);
      setSubmitting(true);
      
      try {
        const submitData: UserUpdateData = {
          name: values.name,
          email: values.email,
          childGender: values.childGender === 'null' ? null : values.childGender as 'boy' | 'girl' | null,
          dueDate: values.dueDate || undefined
        };

        if (onSubmit) {
          await onSubmit(submitData);
        }
        
        resetForm({ values });
      } catch (error) {
        console.error('Помилка збереження:', error);
        throw error;
      } finally {
        setIsLoading(false);
        setSubmitting(false);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm({ values: initialValues });
  };

  const hasChanges = JSON.stringify(formik.values) !== JSON.stringify(initialValues);
  const isFormValid = formik.isValid && hasChanges;

  return (
    <div className={styles.component}>
      <h1 className={styles.title}>
        Форма, що надає можливість користувачу редагувати свої дані.
      </h1>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Ім'я *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`${styles.input} ${
              formik.touched.name && formik.errors.name ? styles.inputError : ''
            }`}
            placeholder="Введіть ваше ім'я"
            maxLength={32}
            disabled={isLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.error}>{formik.errors.name}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Пошта *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email ? styles.inputError : ''
            }`}
            placeholder="Введіть вашу пошту"
            maxLength={64}
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="childGender" className={styles.label}>
            Стать дитини
          </label>
          <select
            id="childGender"
            name="childGender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.childGender}
            className={styles.select}
            disabled={isLoading}
          >
            <option value="">Оберіть стать</option>
            <option value="girl">Дівчинка</option>
            <option value="boy">Хлопчик</option>
            <option value="null">Ще не знаємо</option>
          </select>
          {formik.touched.childGender && formik.errors.childGender && (
            <div className={styles.error}>{formik.errors.childGender}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="dueDate" className={styles.label}>
            Планова дата пологів
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dueDate}
            className={`${styles.input} ${
              formik.touched.dueDate && formik.errors.dueDate ? styles.inputError : ''
            }`}
            min={getMinDueDate()}
            max={getMaxDueDate()}
            disabled={isLoading}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className={styles.error}>{formik.errors.dueDate}</div>
          )}
        </div>

        <div className={styles.buttons}>
          <button
            type="button"
            onClick={handleCancel}
            disabled={!hasChanges || isLoading}
            className={styles.cancelButton}
          >
            Відмінити зміни
          </button>
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner} />
                Збереження...
              </>
            ) : (
              'Зберегти зміни'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}