import { NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAI } from "../../../../OPENAI/lib/openai";
export const runtime = "nodejs";      
export const dynamic = "force-dynamic"; 
export const maxDuration = 30;          
const ChatBody = z.object({
  messages: z.array(
    z.object({
      role: z.enum(["system", "user", "assistant"]),
      content: z.string()
    })
  ),
  temperature: z.number().min(0).max(2).optional(),
  max_tokens: z.number().int().positive().optional(),
  model: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = ChatBody.parse(json);

    const openai = getOpenAI();
    const model = parsed.model || "gpt-3.5-turbo";

    const completion = await openai.chat.completions.create({
      model,
      messages: parsed.messages,
      temperature: parsed.temperature ?? 0.7,
      max_tokens: parsed.max_tokens ?? 512
    });

    const text = completion.choices?.[0]?.message?.content ?? "";
    return NextResponse.json({ ok: true, text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 400 }
    );
  }
}
