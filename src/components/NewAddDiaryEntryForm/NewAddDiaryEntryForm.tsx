'use client';

import React, { useEffect, useRef, useState } from 'react';
// import * as Yup from 'yup';
import styles from './NewAddDiaryEntryForm.module.css';
import Button from '../UI/Buttons/Buttons';
import { Diary } from '@/lib/clientApi';
import { ErrorValodationProps } from '@/app/diary/page';

interface AddDiaryEntryFormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  initialData?: Diary;
  errorValidation?: ErrorValodationProps | null;
}

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
    // вложенный data: {...}
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

const FALLBACK: Option[] = [
  'Радість',
  'Сум',
  'Стрес',
  'Спокій',
  'Втома',
  'Щастя',
].map((x) => ({
  value: x,
  label: x,
}));

export default function NewAddDiaryEntryForm({
  onSubmit,
  initialData,
  errorValidation,
}: AddDiaryEntryFormProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [selected, setSelected] = useState<string[]>(
    initialData?.emotions ? initialData.emotions.map((e) => e._id) : []
  );
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fieldData, setFieldData] = useState<Diary | null>(null);
  const comboRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFieldData(initialData || null);
  }, [initialData]);

  useEffect(() => {
    let aborted = false;

    const DEBUG = false;
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(
      /\/+$/,
      ''
    );
    const sources: string[] = [
      '/api/emotions', // локальный Next API
      ...(BACKEND_URL ? [`${BACKEND_URL}/api/emotions`] : []),
      'https://project-pregnant-back.onrender.com/api/emotions', // резервный Render
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
      let lastErr: unknown = null;

      for (const url of sources) {
        if (aborted) return;
        try {
          DEBUG && console.debug('[Emotions] trying:', url);
          const res = await fetchWithTimeout(url, 8000);
          if (!res.ok) {
            DEBUG && console.debug('[Emotions] non-OK:', res.status, url);
            lastErr = new Error(`HTTP ${res.status} @ ${url}`);
            continue;
          }
          const data: unknown = await res.json();
          const mapped = normalizeEmotions(data);
          DEBUG && console.debug('[Emotions] normalized:', mapped);
          if (mapped.length > 0) {
            if (!aborted) {
              setOptions(mapped);
              setLoading(false);
              setLoadError(null);
            }
            return;
          } else {
            lastErr = new Error(`Empty/Unrecognized payload @ ${url}`);
          }
        } catch (err) {
          lastErr = err;
          DEBUG && console.debug('[Emotions] failed:', url, err);
          continue;
        }
      }

      if (!aborted) {
        setOptions(FALLBACK);
        setLoading(false);
        setLoadError('Не вдалося завантажити категорії, показані стандартні.');
        DEBUG &&
          console.debug('[Emotions] fallback used. Last error:', lastErr);
      }
    })();

    return () => {
      aborted = true;
    };
  }, []);

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

  const toggleEmotion = (value: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return Array.from(next);
    });
  };
  const removeChip = (value: string) =>
    setSelected((prev) => prev.filter((v) => v !== value));

  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label);

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
          placeholder="Введіть заголовок запису"
          defaultValue={fieldData?.title}
        />
        {errorValidation && errorValidation.field === 'title' && (
          <div className={styles.ermessage}>{errorValidation.message}</div>
        )}
      </div>

      <div className={styles.fieldContainer}>
        <span className={styles.fieldLabel}>Категорії</span>

        <div className={styles.combo} ref={comboRef}>
          <div
            className={styles.trigger}
            role="button"
            tabIndex={0}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-disabled={loading ? true : undefined}
            onClick={() => {
              if (!loading) setOpen((v) => !v);
            }}
            onKeyDown={(e) => {
              if (loading) return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen((v) => !v);
              }
            }}
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
                  <label
                    key={opt.value}
                    htmlFor={id}
                    className={styles.radioOption}
                  >
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

        {loadError && <p className={styles.helperError}>{loadError}</p>}
        {errorValidation && errorValidation.field === 'emotions' && (
          <div>{errorValidation.message}</div>
        )}
      </div>

      <div className={styles.ContainerTitle}>
        <label className={styles.fieldLabel} htmlFor="content">
          Запис
        </label>
        <textarea
          className={styles.fieldTextInput}
          id="content"
          name="descr"
          rows={6}
          placeholder="Запишіть, як ви себе відчуваєте"
          defaultValue={fieldData?.descr}
        />
        {errorValidation && errorValidation.field === 'descr' && (
          <div>{errorValidation.message}</div>
        )}
      </div>

      <Button type="submit" variant="primary" size="large">
        Зберегти
      </Button>
    </form>
  );
}
