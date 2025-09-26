'use client';
import React, { useRef, useEffect } from "react";
import { useAssistant } from "./AssistantContext";

export default function ModalAssistant() {
  const { open, setOpen, messages, send, pending, error } = useAssistant();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, pending]);

  if (!open) return null;

  return (
    <div className="oa-overlay" onClick={() => setOpen(false)}>
      <div className="oa-modal" onClick={e => e.stopPropagation()}>
        <div className="oa-header">
          <div className="oa-title">AI Помічник <span className="oa-badge">BETA</span></div>
          <button className="oa-close" onClick={() => setOpen(false)}>×</button>
        </div>

        <div className="oa-tabs">
          <button className="oa-tab oa-tab--active">Чат</button>
        </div>

        <div className="oa-body">
          <div className="oa-messages" ref={listRef}>
            {messages.filter(m => m.role !== "system").map((m, i) => (
              <div key={i} className={`oa-msg ${m.role === "user" ? "oa-msg--user" : "oa-msg--assistant"}`}>
                {m.content}
              </div>
            ))}
            {pending && <div className="oa-msg oa-msg--assistant">Думаю…</div>}
          </div>

          {error && <div className="oa-error">Помилка: {error}</div>}

          <div className="oa-composer">
            <input
              ref={inputRef}
              placeholder="Напишіть ваше питання…"
              onKeyDown={e => {
                if (e.key === "Enter") {
                  const v = (e.target as HTMLInputElement).value;
                  (e.target as HTMLInputElement).value = "";
                  send(v);
                }
              }}
            />
            <button onClick={() => {
              const v = inputRef.current?.value || "";
              if (inputRef.current) inputRef.current.value = "";
              send(v);
            }}>Надіслати</button>
          </div>
        </div>
      </div>
      <style>{styles}</style>
    </div>
  );
}

const styles = `
.oa-overlay{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999}
.oa-modal{width:min(720px,92vw);background:#fff1e0;border:1px solid #f0e0cc;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.2);overflow:hidden}
.oa-header{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;background:#fdebd2}
.oa-title{font-weight:700}
.oa-badge{font-size:12px;padding:2px 8px;border-radius:999px;background:#ffe7bf;margin-left:6px}
.oa-close{border:none;background:transparent;font-size:22px;cursor:pointer}
.oa-tabs{display:flex;gap:8px;padding:10px 12px;background:#fff7ec}
.oa-tab{padding:8px 12px;border-radius:999px;border:1px solid #f1dac2;background:#fff}
.oa-tab--active{background:#ffe7bf}
.oa-body{padding:12px}
.oa-messages{height:360px;overflow:auto;padding:8px;border-radius:12px;background:#fff;border:1px solid #f0e0cc}
.oa-msg{padding:10px 12px;border-radius:12px;margin:8px 0;max-width:85%}
.oa-msg--user{background:#e6f3ff;margin-left:auto}
.oa-msg--assistant{background:#fffbe6;border:1px solid #f5e6b8}
.oa-error{color:#b00020;margin:8px 0}
.oa-composer{display:flex;gap:8px;margin-top:10px}
.oa-composer input{flex:1;padding:12px;border-radius:12px;border:1px solid #e0d6c7}
.oa-composer button{padding:12px 16px;border-radius:12px;border:1px solid #e0d6c7;background:#fff;cursor:pointer}
`;
