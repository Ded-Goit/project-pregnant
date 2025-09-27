'use client';

import React from 'react';
import s from './entry.module.css';

export default function DiaryEntryRoute(){
  const createdAt = '2025-07-15T00:00:00.000Z';
  return (
    <div className={s.wrap}>
      <button className={s.backBtn} onClick={() => history.back()}>← До списку</button>

      <section className={s.detailsCard}>
        <div className={s.detailsInner}>
          <div className={s.detailsTop}>
            <div>
              <h3 className={s.detailsTitle}>Перший привіт</h3>
              <div className={s.detailsDate}>
                {new Date(createdAt).toLocaleDateString('uk-UA',{year:'numeric',month:'long',day:'numeric'})}
              </div>
            </div>
            <div className={s.detailsActions}>
              <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>🖉</button>
              <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>🗑</button>
            </div>
          </div>

          <div className={s.detailsBody}>
            <article style={{whiteSpace:'pre-wrap', lineHeight:1.55, color:'var(--color-neutral-darker)'}}>
              Повний текст запису ...
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
