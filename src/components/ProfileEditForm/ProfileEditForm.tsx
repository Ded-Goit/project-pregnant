'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import styles from './ProfileEditForm.module.css';

// Виправлена іконка для select
const KeyboardArrowDownIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={styles.selectIcon}
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

interface ProfileFormData {
  name: string;
  email: string;
  childGender?: string;
  dueDate?: string;
}

interface ProfileEditFormProps {
  initialData: ProfileFormData;
  onSubmit: (values: ProfileFormData) => Promise<void>;
}

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
    .max(32, "Ім'я не може перевищувати 32 символи"),
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий")
    .max(64, 'Email не може перевищувати 64 символи'),
  childGender: Yup.string()
    .nullable()
    .oneOf(['male', 'female', ''], 'Оберіть коректну стать'),
  dueDate: Yup.date()
    .nullable()
    .min(getMinDueDate(), 'Дата повинна бути щонайменше через тиждень')
    .max(getMaxDueDate(), 'Дата не може перевищувати 40 тижнів'),
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
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        await onSubmit(values);
        resetForm({ values });
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

  const isFormValid = formik.isValid && hasChanges;

  return (
    <div className={styles.component}>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        {/* Fields Group 1 */}
        <div className={styles.fields}>
          <div className={styles.content}>
            {/* Ім'я */}
            <div className={styles.inputGroup}>
              <label htmlFor="name" className={styles.label}>
                Ім`я *
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className={`${styles.input} ${
                    formik.touched.name && formik.errors.name
                      ? styles.inputError
                      : ''
                  }`}
                  placeholder="Введіть ваше ім'я"
                  maxLength={32}
                  disabled={isLoading}
                />
              </div>
              {formik.touched.name && formik.errors.name && (
                <div className={styles.error}>{formik.errors.name}</div>
              )}
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>
                Пошта *
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  className={`${styles.input} ${
                    formik.touched.email && formik.errors.email
                      ? styles.inputError
                      : ''
                  }`}
                  placeholder="Введіть вашу пошту"
                  maxLength={64}
                  disabled={isLoading}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className={styles.error}>{formik.errors.email}</div>
              )}
            </div>
          </div>
        </div>

        {/* Fields Group 2 */}
        <div className={styles.fields}>
          <div className={styles.content}>
            {/* Стать дитини */}
            <div className={styles.inputGroup}>
              <label htmlFor="childGender" className={styles.label}>
                Стать дитини
              </label>
              <div className={styles.selectWrapper}>
                <select
                  id="childGender"
                  name="childGender"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.childGender || ''}
                  className={`${styles.select} ${
                    formik.touched.childGender && formik.errors.childGender
                      ? styles.inputError
                      : ''
                  }`}
                  disabled={isLoading}
                >
                  <option value="">Оберіть стать</option>
                  <option value="female">Дівчинка</option>
                  <option value="male">Хлопчик</option>
                </select>
                <KeyboardArrowDownIcon />
              </div>
              {formik.touched.childGender && formik.errors.childGender && (
                <div className={styles.error}>{formik.errors.childGender}</div>
              )}
            </div>

            {/* Дата пологів */}
            <div className={styles.inputGroup}>
              <label htmlFor="dueDate" className={styles.label}>
                Планова дата пологів
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.dueDate || ''}
                  className={`${styles.input} ${
                    formik.touched.dueDate && formik.errors.dueDate
                      ? styles.inputError
                      : ''
                  }`}
                  min={getMinDueDate()}
                  max={getMaxDueDate()}
                  disabled={isLoading}
                />
              </div>
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className={styles.error}>{formik.errors.dueDate}</div>
              )}
            </div>
          </div>
        </div>

        {/* Actions - Кнопки */}
        <div className={styles.actions}>
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
                <div className={styles.spinner} />
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
