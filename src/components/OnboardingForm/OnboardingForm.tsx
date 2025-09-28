'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useRef } from 'react';
import styles from './OnboardingForm.module.css';
import Button from '@/components/UI/Buttons/Buttons';

export interface OnboardingFormData {
  name: string;
  email: string;
  childGender: string;
  dueDate: string;
  avatarUrl: string;
}

export interface OnboardingFormProps {
  initialData: OnboardingFormData;
  onSubmit: (values: OnboardingFormData) => Promise<void>;
  onAvatarUpload: (file: File) => Promise<string>;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Ім'я обов'язкове")
    .max(32, "Ім'я не може перевищувати 32 символи"),
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий"),
  childGender: Yup.string().required("Стать дитини обов'язкова"),
  dueDate: Yup.date()
    .required("Дата пологів обов'язкова")
    .min(new Date(), 'Дата пологів не може бути в минулому'),
});

export default function OnboardingForm({
  initialData,
  onSubmit,
  onAvatarUpload,
}: OnboardingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Валідація файлу
    if (file.size > 5 * 1024 * 1024) {
      alert('Максимальний розмір файлу: 5MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Будь ласка, виберіть зображення (JPEG, PNG, WebP)');
      return;
    }

    try {
      // Створюємо попередній перегляд
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);

      // Завантажуємо на сервер
      const avatarUrl = await onAvatarUpload(file);
      formik.setFieldValue('avatarUrl', avatarUrl);
    } catch (error) {
      console.error('Помилка завантаження аватара:', error);
      alert('Помилка завантаження фото. Спробуйте ще раз.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className={styles.card}>
      <form onSubmit={formik.handleSubmit} className={styles.form} noValidate>
        {/* Аватар секція */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarContainer}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Аватар" className={styles.avatar} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                {getInitials(formik.values.name)}
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleAvatarChange}
            className={styles.fileInput}
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={triggerFileInput}
            variant="secondary"
            size="large"
            disabled={isLoading}
          >
            Обрати фото профілю
          </Button>
        </div>

        <div className={styles.fields}>
          {/* Ім'я */}
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              Ваше ім&apos;я
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.input} ${
                formik.touched.name && formik.errors.name
                  ? styles.errorInput
                  : ''
              }`}
              placeholder="Введіть ваше ім'я"
              disabled={isLoading}
            />
            {formik.touched.name && formik.errors.name && (
              <div className={styles.error}>{formik.errors.name}</div>
            )}
          </div>

          {/* Пошта */}
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              Електронна пошта
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
              placeholder="example@gmail.com"
              disabled={isLoading}
            />
            {formik.touched.email && formik.errors.email && (
              <div className={styles.error}>{formik.errors.email}</div>
            )}
          </div>

          {/* Стать дитини */}
          <div className={styles.inputGroup}>
            <label htmlFor="childGender" className={styles.label}>
              Стать дитини
            </label>
            <select
              id="childGender"
              name="childGender"
              value={formik.values.childGender}
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
              <option value="female">Дівчинка</option>
              <option value="male">Хлопчик</option>
              <option value="unknown">Ще не знаю</option>
            </select>
            {formik.touched.childGender && formik.errors.childGender && (
              <div className={styles.error}>{formik.errors.childGender}</div>
            )}
          </div>

          {/* Планова дата пологів */}
          <div className={styles.inputGroup}>
            <label htmlFor="dueDate" className={styles.label}>
              Планова дата пологів
            </label>
            <input
              id="dueDate"
              name="dueDate"
              type="date"
              value={formik.values.dueDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`${styles.input} ${
                formik.touched.dueDate && formik.errors.dueDate
                  ? styles.errorInput
                  : ''
              }`}
              disabled={isLoading}
              min={new Date().toISOString().split('T')[0]}
            />
            {formik.touched.dueDate && formik.errors.dueDate && (
              <div className={styles.error}>{formik.errors.dueDate}</div>
            )}
          </div>
        </div>

        {/* Кнопка завершення онбордингу */}
        <div className={styles.actions}>
          <Button
            type="submit"
            disabled={isLoading || !formik.isValid}
            variant="primary"
            size="large"
          >
            {isLoading ? 'Збереження...' : 'Почати користування'}
          </Button>
        </div>
      </form>
    </div>
  );
}
