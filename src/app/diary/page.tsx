'use client';

import s from './diary.module.css';
import React from 'react';


type Entry = { id:string; title:string; createdAt:string; tags:string[]; content:string };

const ENTRIES: Entry[] = [
  { id:'1', title:'Дивне бажання', createdAt:'2025-07-09T00:00:00.000Z', tags:['Натхнення','дивні бажання'], content:'...' },
];

const SELECTED: Entry = {
  id:'s1',
  title:'Дивне бажання',
  createdAt:'2025-07-09T00:00:00.000Z',
  tags:['Натхнення','дивні бажання'],
  content:`Це сталося! Сьогодні ввечері...`,
};

export default function DiaryPage(){
  return (
    <div className={s.layout}>
      {/* Sidebar */}
      <aside className={s.sidebar}>
        <div className={s.brand}>
          <div style={{width:28,height:28,borderRadius:14,background:'var(--color-scheme-accent)'}} aria-hidden />
          <span>Лелека</span>
        </div>

        <nav className={s.navBox}>
          <a className={s.navItem} href="#"> Мій день</a>
          <a className={s.navItem} href="#"> Подорож</a>
          <a className={s.navItem} href="#"> Щоденник</a>
          <a className={s.navItem} href="#"> Профіль</a>
        </nav>

        <div className={s.emailBox}>
          <div style={{width:36,height:36,borderRadius:18,background:'#ddd'}} aria-hidden />
          <div>
            <div style={{fontWeight:600}}>Ганна</div>
            <div style={{fontSize:12,color:'var(--color-neutral)'}}>hanna@gmail.com</div>
          </div>
          <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>↗</button>
        </div>
      </aside>

      {/* Main */}
      <main className={s.main}>
        <header className={s.pageHeader}>
          <div className={s.breadcrumbs}>
            Лелека <span>›</span> <span className={s.current}>Щоденник</span>
          </div>
          <h1 className={s.greeting}>Доброго ранку, Ганна!</h1>
        </header>

        <div className={s.contentRow}>
          {/* Список */}
          <section className={s.listCard}>
            <div className={s.listHeader}>
              <h2 className={s.listTitle}>Ваші записи</h2>
              <div className={s.listTools}>
                <span>Новий запис</span>
                <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>＋</button>
              </div>
            </div>

            <div className={s.listBody}>
              {ENTRIES.map((e) => (
                <article key={e.id} className={s.entryCard}>
                  <div className={s.entryHead}>
                    <h3 className={s.entryTitle}>Дивне бажання</h3>
                    <span className={s.entryDate}>
                      {new Date(e.createdAt).toLocaleDateString('uk-UA',{year:'numeric',month:'long',day:'numeric'})}
                    </span>
                  </div>
                  <div className={s.entryTags}>
                    {e.tags.map((t,i)=>(<span key={i} className={s.chip}>{t}</span>))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Детали */}
          <section className={s.detailsCard}>
            <div className={s.detailsInner}>
              <div className={s.detailsTop}>
                <div>
                  <h3 className={s.detailsTitle}>{SELECTED.title}</h3>
                  <div className={s.detailsDate}>
                    {new Date(SELECTED.createdAt).toLocaleDateString('uk-UA',{year:'numeric',month:'long',day:'numeric'})}
                  </div>
                </div>
                <div className={s.detailsActions}>
                  <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>🖉</button>
                  <button style={{width:28,height:28,borderRadius:999,border:'1px solid var(--color-scheme-border)'}}>🗑</button>
                </div>
              </div>

              <div className={s.detailsBody}>
                <div className={s.entryTags}>
                  {SELECTED.tags.map((t,i)=>(<span key={i} className={s.chip}>{t}</span>))}
                </div>
                <article className={s.detailsText}>{SELECTED.content}</article>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}















// import styles from "./diary.module.css";
//import dynamic from 'next/dynamic';

/*const GreetingBlock = dynamic(
  () => import('@/components/dashboard/greeting-block')
);
const StatusBlock = dynamic(
  () => import('@/components/dashboard/status-block')
);
const BabyTodayCard = dynamic(
  () => import('@/components/dashboard/baby-today-card')
);
const MomTipCard = dynamic(() => import('@/components/dashboard/mom-tip-card'));
const TasksReminderCard = dynamic(
  () => import('@/components/dashboard/tasks-reminder-card')
);
const FeelingCheckCard = dynamic(
  () => import('@/components/dashboard/feeling-check-card')
);*/

// export default function DiaryPage() {
//   return (
//     <div className={styles.pageWrapper}>
//       <h1 className={styles.title}>
//         Блок `Сторінка щоденника` | DiaryPage | route: /diary
//       </h1>
//     </div>
//   );
// }