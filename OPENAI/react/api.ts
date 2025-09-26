export type ChatMsg = { role: "system" | "user" | "assistant"; content: string };

const ENDPOINT = "/api/chat";

export async function chat(messages: ChatMsg[]) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages })
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || "Chat error");
  return String(data.text ?? "");
}
