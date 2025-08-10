// components/booking/TimeSlot.tsx
"use client";
export default function TimeSlot({ time, selected, onSelect }: { time: string; selected?: boolean; onSelect?: ()=>void }) {
  return (
    <button
      onClick={onSelect}
      className={`px-3 py-2 rounded-xl border text-sm ${selected?"bg-indigo-600 border-transparent":"border-white/10 hover:bg-white/10"}`}
    >{time}</button>
  );
}