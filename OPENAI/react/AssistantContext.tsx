'use client';
import React, { createContext, useContext, useMemo, useState } from "react";
import { chat, type ChatMsg } from "./api";

type AssistantCtx = {
  open: boolean;
  setOpen: (v: boolean) => void;
  send: (text: string) => Promise<void>;
  messages: ChatMsg[];
  pending: boolean;
  error?: string;
  systemPrompt?: string;
};

const Ctx = createContext<AssistantCtx | null>(null);

export function AssistantProvider({
  children,
  systemPrompt = "Ти — дружній і обережний помічник. Відповідай коротко українською."
}: { children: React.ReactNode; systemPrompt?: string }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "system", content: systemPrompt },
    { role: "assistant", content: "Привіт! Чим можу допомогти?" }
  ]);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { role: "user", content: text }]);
    setPending(true);
    setError(undefined);
    try {
      const history = messages.filter(m => m.role !== "system");
      const reply = await chat([...history, { role: "user", content: text }]);
      setMessages(m => [...m, { role: "assistant", content: reply }]);
    } catch (e: any) {
      setError(e.message || "Помилка");
      setMessages(m => [...m, { role: "assistant", content: "Сталася помилка. Спробуйте ще раз." }]);
    } finally {
      setPending(false);
    }
  };

  const value = useMemo<AssistantCtx>(() => ({ open, setOpen, send, messages, pending, error, systemPrompt }), [open, messages, pending, error, systemPrompt]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAssistant() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAssistant must be used within AssistantProvider");
  return v;
}
