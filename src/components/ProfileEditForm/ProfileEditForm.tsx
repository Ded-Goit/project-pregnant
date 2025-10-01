'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import styles from './ProfileEditForm.module.css';
import Button from '@/components/UI/Buttons/Buttons';

export interface ProfileFormData {
  name: string;
  email: string;
  childGender?: string;
  dueDate?: string;
}

export interface ProfileEditFormProps {
  initialData: ProfileFormData;
  onSubmit: (values: ProfileFormData) => Promise<void>;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Ім'я обов'язкове")
    .max(32, "Ім'я не може перевищувати 32 символи"),
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий"),
  childGender: Yup.string().nullable(),
  dueDate: Yup.date().nullable(),
});

export default function ProfileEditForm({
  initialData,
  onSubmit,
}: ProfileEditFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialData,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Помилка збереження:', error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCancel = () => {
    formik.resetForm({ values: initialData });
  };

  const hasChanges =
    formik.values.name !== initialData.name ||
    formik.values.email !== initialData.email ||
    formik.values.childGender !== initialData.childGender ||
    formik.values.dueDate !== initialData.dueDate;

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
      <div className={styles.fields}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Ім&apos;я
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.name && formik.errors.name ? styles.errorInput : ''
            }`}
            placeholder="Ганна"
            disabled={isLoading}
          />
          {formik.touched.name && formik.errors.name && (
            <div className={styles.error}>{formik.errors.name}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Пошта
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.email && formik.errors.email
                ? styles.errorInput
                : ''
            }`}
            placeholder="hanna@gmail.com"
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email && (
            <div className={styles.error}>{formik.errors.email}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="childGender" className={styles.label}>
            Стать дитини
          </label>
          <select
            id="childGender"
            name="childGender"
            value={formik.values.childGender || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.select} ${
              formik.touched.childGender && formik.errors.childGender
                ? styles.errorInput
                : ''
            }`}
            disabled={isLoading}
          >
            <option value="">Оберіть стать</option>
            <option value="girl">Дівчинка</option>
            <option value="boy">Хлопчик</option>
          </select>
          {formik.touched.childGender && formik.errors.childGender && (
            <div className={styles.error}>{formik.errors.childGender}</div>
          )}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="dueDate" className={styles.label}>
            Планова дата пологів
          </label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formik.values.dueDate || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${styles.input} ${
              formik.touched.dueDate && formik.errors.dueDate
                ? styles.errorInput
                : ''
            }`}
            disabled={isLoading}
          />
          {formik.touched.dueDate && formik.errors.dueDate && (
            <div className={styles.error}>{formik.errors.dueDate}</div>
          )}
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          onClick={handleCancel}
          disabled={!hasChanges || isLoading}
          variant="secondary"
          size="large"
        >
          Відмінити зміни
        </Button>
        <Button
          type="submit"
          disabled={isLoading || !hasChanges}
          variant="primary"
          size="large"
        >
          {isLoading ? 'Збереження...' : 'Зберегти зміни'}
        </Button>
      </div>
    </form>
  );
}
