'use client';

// import styles from './AddDiaryEntryModal.module.css';
import React, { useEffect, useState } from 'react';

export default function AddDiaryEntryModal({
  open,
  onClose,
  initial,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  initial?: { title?: string; content?: string; tags?: string[] };
  onSubmit: (payload: { title: string; content: string; tags: string[] }) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [content, setContent] = useState(initial?.content ?? '');
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));

  useEffect(() => {
    setTitle(initial?.title ?? '');
    setContent(initial?.content ?? '');
    setTags((initial?.tags ?? []).join(', '));
  }, [initial, open]);

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <h3 className="text-lg font-semibold">{initial ? 'Редагувати запис' : 'Новий запис'}</h3>
          <button className="btn" onClick={onClose}>Закрити</button>
        </header>
        <div className="body">
          <div className="row">
            <label>
              <div className="text-sm" style={{ color: '#52525b' }}>Заголовок</div>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
            </label>
            <label>
              <div className="text-sm" style={{ color: '#52525b' }}>Категорії (через кому)</div>
              <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="Натхнення, Енергія" />
            </label>
            <label>
              <div className="text-sm" style={{ color: '#52525b' }}>Запис</div>
              <textarea value={content} onChange={e => setContent(e.target.value)} required placeholder="Запишіть, як ви себе відчуваєте" />
            </label>
          </div>
        </div>
        <div className="actions">
          <button className="btn" onClick={onClose}>Скасувати</button>
          <button className="btn btn-primary" onClick={() => {
            const payload = { title: title.trim(), content: content.trim(), tags: tags.split(',').map(s => s.trim()).filter(Boolean) };
            if (!payload.title || !payload.content) return;
            onSubmit(payload);
          }}>Зберегти</button>
        </div>
      </div>
    </div>
  );
}



//import dynamic from 'next/dynamic';

/*
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/