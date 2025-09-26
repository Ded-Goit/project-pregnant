'use client';
import React from "react";
import { AssistantProvider } from "../../../OPENAI/react";
import { AssistantButton, ModalAssistant } from "../../../OPENAI/react";

export default function AssistantClient() {
  return (
    <AssistantProvider>
      <AssistantButton />
      <ModalAssistant />
    </AssistantProvider>
  );
}
