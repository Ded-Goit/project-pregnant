'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import styles from './NewAddDiaryEntryForm.module.css';
import Button from '../UI/Buttons/Buttons';

interface AddDiaryEntryFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
}

export const validationSchema = Yup.object().shape({
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

type EmotionRecord = {
  id?: string | number;
  _id?: string | number;
  emotionId?: string | number;
  value?: string | number;
  name?: string;
  title?: string;
  label?: string;
  text?: string;
  [k: string]: unknown;
};

type RawEmotion = string | EmotionRecord;

type ApiPayload =
  | RawEmotion[]
  | {
      emotions?: RawEmotion[];
      data?: unknown;
      items?: unknown;
      results?: unknown;
      categories?: RawEmotion[];
    }
  | Record<string, unknown>
  | unknown;

export type Option = { value: string; label: string };
type FormErrors = Partial<Record<'title' | 'emotions' | 'descr', string>>;

/* ---------- helpers ---------- */
function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}
function extractArray(payload: unknown): RawEmotion[] {
  if (Array.isArray(payload)) return payload as RawEmotion[];
  if (isObject(payload)) {
    const keys = ['emotions', 'categories', 'items', 'results'] as const;
    for (const key of keys) {
      const maybe = (payload as Record<string, unknown>)[key];
      if (Array.isArray(maybe)) return maybe as RawEmotion[];
    }
    const data = (payload as Record<string, unknown>)['data'];
    if (Array.isArray(data)) return data as RawEmotion[];
    if (isObject(data)) return extractArray(data);
  }
  return [];
}
function pickId(o: Record<string, unknown>): string | number | undefined {
  const keys = ['id', '_id', 'emotionId', 'value'] as const;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string' || typeof v === 'number') return v;
  }
  return undefined;
}
function pickLabel(o: Record<string, unknown>): string | undefined {
  const keys = ['name', 'title', 'label', 'text'] as const;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === 'string') return v;
  }
  return undefined;
}
function toOption(item: RawEmotion): Option | null {
  if (typeof item === 'string') return { value: item, label: item };
  if (isObject(item)) {
    const id = pickId(item);
    const label = pickLabel(item);
    if (id !== undefined && label !== undefined) {
      return { value: String(id), label };
    }
  }
  return null;
}
function normalizeEmotions(payload: ApiPayload): Option[] {
  const src = extractArray(payload);
  const out: Option[] = [];
  for (const it of src) {
    const opt = toOption(it);
    if (opt) out.push(opt);
  }
  return out;
}

const FALLBACK: Option[] = ['Радість', 'Сум', 'Стрес', 'Спокій', 'Втома', 'Щастя'].map((x) => ({
  value: x,
  label: x,
}));

export default function NewAddDiaryEntryForm({ onSubmit }: AddDiaryEntryFormProps) {
  // form state
  const [title, setTitle] = useState<string>('');
  const [descr, setDescr] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);

  // emotions data
  const [options, setOptions] = useState<Option[]>(FALLBACK);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // UI
  const [open, setOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const comboRef = useRef<HTMLDivElement>(null);

  // fetch emotions
  useEffect(() => {
    let aborted = false;

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, '');
    const sources: string[] = [
      '/api/emotions',
      ...(BACKEND_URL ? [`${BACKEND_URL}/api/emotions`] : []),
      'https://project-pregnant-back.onrender.com/api/emotions',
    ];

    const fetchWithTimeout = (url: string, ms = 8000) => {
      const ctrl = new AbortController();
      const id = setTimeout(() => ctrl.abort('timeout'), ms);
      return fetch(url, {
        signal: ctrl.signal,
        cache: 'no-store',
        credentials: 'include',
        mode: 'cors',
      }).finally(() => clearTimeout(id));
    };

    (async () => {
      setLoading(true);
      setLoadError(null);

      let applied = false;
      for (const url of sources) {
        if (aborted) return;
        try {
          const res = await fetchWithTimeout(url, 8000);
          if (!res.ok) continue;
          const data: unknown = await res.json();
          const mapped = normalizeEmotions(data);
          if (mapped.length > 0) {
            if (!aborted) {
              setOptions(mapped);
              setLoading(false);
              setLoadError(null);
            }
            applied = true;
            break;
          }
        } catch {
          // try next
        }
      }

      if (!applied && !aborted) {
        setOptions(FALLBACK);
        setLoading(false);
        setLoadError('Не вдалося завантажити категорії, показані стандартні.');
      }
    })();

    return () => {
      aborted = true;
    };
  }, []);

  // close dropdown on outside click / Esc
  useEffect(() => {
    const onDocMouseDown = (event: MouseEvent) => {
      if (!comboRef.current) return;
      if (!comboRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // validation
  const validateAll = async () => {
    try {
      await validationSchema.validate({ title, emotions: selected, descr }, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const next: FormErrors = {};
      if (err instanceof Yup.ValidationError) {
        if (Array.isArray(err.inner) && err.inner.length) {
          for (const e of err.inner) {
            if (e.path && !next[e.path as 'title' | 'emotions' | 'descr']) {
              next[e.path as 'title' | 'emotions' | 'descr'] = e.message;
            }
          }
        } else if (err.path) {
          next[err.path as 'title' | 'emotions' | 'descr'] = err.message;
        }
      }
      setErrors(next);
      return false;
    }
  };

  const validateField = async (path: 'title' | 'descr', value: string) => {
    const snapshot = { title, emotions: selected, descr };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore — индексируем по union ключей
    snapshot[path] = value;
    try {
      await validationSchema.validateAt(path, snapshot);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[path];
        return copy;
      });
    } catch (err) {
      const msg = err instanceof Yup.ValidationError ? err.message : 'Некоректне значення';
      setErrors((prev) => ({ ...prev, [path]: msg }));
    }
  };

  // handlers
  const toggleEmotion = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      const arr = Array.from(next);
      setErrors((prevErr) => (arr.length > 0 ? { ...prevErr, emotions: undefined } : prevErr));
      return arr;
    });
  };

  const removeChip = (value: string) => {
    setSelected((prev) => {
      const arr = prev.filter((v) => v !== value);
      setErrors((prevErr) => (arr.length > 0 ? { ...prevErr, emotions: undefined } : prevErr));
      return arr;
    });
  };

  const selectedLabels = options.filter((o) => selected.includes(o.value)).map((o) => o.label);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ok = await validateAll();
    if (!ok) return;
    if (onSubmit) {
      await onSubmit(e);
    }
  };

  // ВЫНЕСЕННЫЙ обработчик, чтобы не было Parsing error в JSX:
  const onTriggerKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (loading) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((v) => !v);
    }
  };

  return (
    <form className={styles.diaryForm} onSubmit={handleSubmit}>
      <div className={styles.fieldContainer}>
        <label className={styles.fieldLabel} htmlFor="title">
          Заголовок
        </label>
        <input
          className={styles.fieldInput}
          type="text"
          id="title"
          name="title"
          placeholder="Введіть заголовок запису"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          onBlur={(ev) => validateField('title', ev.target.value)}
          aria-invalid={Boolean(errors.title) || undefined}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className={styles.helperError}>
            {errors.title}
          </p>
        )}
      </div>

      <div className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Категорії</span>

        <div className={styles.combo} ref={comboRef}>
          <div
            id="emotions-select-trigger"
            className={styles.trigger}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-disabled={loading ? true : undefined}
            onClick={() => {
              if (!loading) setOpen((v) => !v);
            }}
            onKeyDown={onTriggerKeyDown}
          >
            <div className={styles.triggerContent}>
              {loading ? (
                <span className={styles.placeholder}>Завантаження…</span>
              ) : selectedLabels.length === 0 ? (
                <span className={styles.placeholder}>Обрати категорії</span>
              ) : (
                <div className={styles.chips}>
                  {selectedLabels.map((label) => {
                    const opt = options.find((o) => o.label === label);
                    const val = opt ? opt.value : label;
                    return (
                      <span className={styles.chip} key={val}>
                        {label}
                        <button
                          type="button"
                          className={styles.chipRemove}
                          aria-label={`Прибрати ${label}`}
                          onClick={(ev) => {
                            ev.stopPropagation();
                            removeChip(val);
                          }}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            <svg
              className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                d="M7 10l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className={`${styles.panelOverlay} ${open ? styles.panelOpen : ''}`}
            role="listbox"
            aria-multiselectable="true"
          >
            <div className={styles.radioList}>
              {options.map((opt) => {
                const id = `emotion-${opt.value}`;
                const checked = selected.includes(opt.value);
                return (
                  <label key={opt.value} htmlFor={id} className={styles.radioOption}>
                    <input
                      id={id}
                      type="checkbox"
                      className={styles.radioControl}
                      name="emotions"
                      value={opt.value}
                      checked={checked}
                      onChange={() => toggleEmotion(opt.value)}
                    />
                    <span className={styles.radioLabel}>{opt.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {errors.emotions && <p className={styles.helperError}>{errors.emotions}</p>}
        {loadError && <p className={styles.helperError}>{loadError}</p>}
      </div>

      <div className={`${styles.fieldContainer} ${styles.ContainerTitle}`}>
        <label className={styles.fieldLabel} htmlFor="content">
          Запис
        </label>
        <textarea
          className={styles.fieldTextInput}
          id="content"
          name="descr"
          rows={6}
          placeholder="Запишіть, як ви себе відчуваєте"
          value={descr}
          onChange={(ev) => setDescr(ev.target.value)}
          onBlur={(ev) => validateField('descr', ev.target.value)}
          aria-invalid={Boolean(errors.descr) || undefined}
          aria-describedby={errors.descr ? 'descr-error' : undefined}
        />
        {errors.descr && (
          <p id="descr-error" className={styles.helperError}>
            {errors.descr}
          </p>
        )}
      </div>

      <Button type="submit" variant="primary" size="large">
        Зберегти
      </Button>
    </form>
  );
}

// 'use client';

// import styles from './NewAddDiaryEntryForm.module.css';
// import React from 'react';
// import * as Yup from 'yup';
// import Button from '../UI/Buttons/Buttons';

// interface AddDiaryEntryFormProps {
//   onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
// }

// const categoriesOptions = [
//   'Радість',
//   'Сум',
//   'Стрес',
//   'Спокій',
//   'Втома',
//   'Щастя',
// ];

// const validationSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, 'Заголовок має бути не менше 3 символів')
//     .max(255, 'Заголовок занадто довгий')
//     .required('Обов’язкове поле'),
//   emotions: Yup.array()
//     .of(Yup.string())
//     .min(1, 'Оберіть щонайменше одну категорію'),
//   descr: Yup.string()
//     .min(5, 'Запис має бути не менше 5 символів')
//     .required('Обов’язкове поле'),
// });

// const ErrorText = ({ children }: { children: React.ReactNode }) => (
//   <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>
//     {children}
//   </div>
// );

// export default function NewAddDiaryEntryForm({
//   onSubmit,
// }: AddDiaryEntryFormProps) {
//   return (
//     <form className={styles.diaryForm} onSubmit={onSubmit}>
//       <div className={styles.fieldContainer}>
//         <label className={styles.fieldLabel} htmlFor="title">
//           Заголовок
//         </label>
//         <input
//           className={styles.fieldInput}
//           type="text"
//           id="title"
//           name="title"
//           placeholder="Введіть заголовок запису "
//         />
//       </div>

//       <div className={styles.fieldContainer}>
//         <label className={styles.fieldLabel} htmlFor="emotions">
//           Категорії
//         </label>
//         <select
//           className={styles.fieldSelect}
//           id="emotions"
//           name="emotions"
//           multiple
//           size={categoriesOptions.length}
//         >
//           {categoriesOptions.map((option) => (
//             <option key={option} value={option}>
//               {option}
//             </option>
//           ))}
//         </select>

//       </div>

//       <div>
//         <label className={styles.fieldLabel} htmlFor="content">
//           Запис
//         </label>
//         <textarea
//           className={styles.fieldTextInput}
//           id="content"
//           name="descr"
//           rows={4}
//           placeholder="Запишіть, як ви себе відчуваєте"
//         />
//       </div>

//       <Button type="submit" variant="primary" size="large">
//         Зберегти
//       </Button>
//     </form>
//   );
// }
