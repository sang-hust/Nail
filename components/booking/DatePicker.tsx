// components/booking/DatePicker.tsx
"use client";
export default function DatePicker({ value, onChange }: { value: string; onChange: (v: string)=>void }) {
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      className="rounded-xl bg-white/5 border border-white/10 px-3 py-2"
    />
  );
}