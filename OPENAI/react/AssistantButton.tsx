'use client';
import React from "react";
import { useAssistant } from "./AssistantContext";

export default function AssistantButton() {
  const { setOpen } = useAssistant();
  return (
    <button
      className="oa-fab"
      onClick={() => setOpen(true)}
      aria-label="Open AI Assistant"
      title="AI Помічник"
    >
      🤖
      <style>{`
        .oa-fab{position:fixed;right:20px;bottom:20px;width:56px;height:56px;border-radius:999px;border:1px solid #e0d6c7;background:#fff1e0;box-shadow:0 8px 20px rgba(0,0,0,.18);cursor:pointer;font-size:22px;z-index:9999}
        .oa-fab:hover{transform:translateY(-1px)}
      `}</style>
    </button>
  );
}
