// components/chat/ChatDrawer.tsx
"use client";
import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatDrawer({ open, onClose }: { open: boolean; onClose: ()=>void }) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { if(open) setTimeout(()=>ref.current?.scrollTo({top:99999, behavior:"smooth"}), 50); }, [open, messages.length]);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-96 bg-[#0B0B0F] border-l border-white/10 flex flex-col">
        <header className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Hỗ trợ</div>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </header>
        <div ref={ref} className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m,i)=> (
            <div key={i} className={`max-w-[80%] rounded-2xl px-3 py-2 ${m.role==="user"?"ml-auto bg-indigo-600":"bg-white/5 border border-white/10"}`}>{m.content}</div>
          ))}
          {messages.length===0 && <div className="text-white/60 text-sm">Hãy đặt câu hỏi về dịch vụ, giá, lịch rảnh…</div>}
        </div>
        <form className="p-3 border-t border-white/10 flex gap-2"
          onSubmit={(e)=>{ e.preventDefault(); if(!text.trim()) return; setMessages(prev=>[...prev, {role:"user", content:text}]); setText(""); /* later: call /chat/send */ }}>
          <input value={text} onChange={e=>setText(e.target.value)} placeholder="Nhập câu hỏi…"
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2" />
          <button className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500">Gửi</button>
        </form>
      </aside>
    </div>
  );
}   