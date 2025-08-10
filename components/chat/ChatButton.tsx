// components/chat/ChatButton.tsx
"use client";
import { useState } from "react";
import ChatDrawer from "./ChatDrawer";

export default function ChatButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 rounded-full p-4 shadow-xl bg-indigo-600 hover:bg-indigo-500"
        aria-label="Chat"
      >💬</button>
      <ChatDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}