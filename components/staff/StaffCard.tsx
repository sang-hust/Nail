// components/staff/StaffCard.tsx
"use client";
import Link from "next/link";
import type { Staff } from "@/lib/api";

export default function StaffCard({ staff }: { staff: Staff }) {
  return (
    <div className="rounded-2xl p-5 border border-white/10 bg-white/5 hover:bg-white/10 transition">
      <div className="flex items-center gap-4 mb-4">
        <div className="h-12 w-12 rounded-full bg-white/10" />
        <div>
          <div className="font-semibold">{staff.name}</div>
          <div className="text-white/70 text-sm">{staff.role}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Link href={`/booking?staff=${staff.id}`} className="rounded-xl px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-500">Xem lịch rảnh</Link>
        <Link href={`/booking?staff=${staff.id}`} className="rounded-xl px-4 py-2 text-sm border border-white/10 hover:bg-white/10">Đặt lịch</Link>
      </div>
    </div>
  );
}