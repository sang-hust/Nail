// components/booking/BookingFlow.tsx
"use client";
import { useEffect, useMemo, useState } from "react";
import { api, type Staff } from "@/lib/api";
import DatePicker from "./DatePicker";
import TimeSlot from "./TimeSlot";

export default function BookingFlow() {
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0,10));
  const [staff, setStaff] = useState<Staff | null>(null);
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [slots, setSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => { api.listStaff().then(setStaffList); }, []);

  useEffect(() => {
    if (!staff) { setSlots([]); return; }
    api.availability(staff.id, date).then(setSlots);
  }, [staff, date]);

  const canSubmit = useMemo(() => !!(staff && selectedSlot), [staff, selectedSlot]);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <h3 className="font-semibold mb-3">Chọn ngày</h3>
          <DatePicker value={date} onChange={setDate} />
        </section>

        <section className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <h3 className="font-semibold mb-4">Chọn nhân viên</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {staffList.map(s => (
              <button
                key={s.id}
                onClick={() => setStaff(s)}
                className={`rounded-xl px-4 py-3 text-left border border-white/10 hover:bg-white/10 ${staff?.id===s.id?"bg-indigo-600 border-transparent":""}`}
              >
                <div className="font-medium">{s.name}</div>
                <div className="text-white/70 text-sm">{s.role}</div>
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <h3 className="font-semibold mb-4">Lịch rảnh</h3>
          {staff ? (
            <div className="flex flex-wrap gap-2">
              {slots.map(t => (
                <TimeSlot key={t} time={t} selected={selectedSlot===t} onSelect={() => setSelectedSlot(t)} />
              ))}
              {slots.length===0 && <div className="text-white/70">Không có khung giờ phù hợp.</div>}
            </div>
          ) : (
            <div className="text-white/70">Hãy chọn nhân viên để xem lịch rảnh.</div>
          )}
        </section>

        <section className="rounded-2xl p-5 border border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold">Tóm tắt</div>
              <div className="text-white/70 text-sm">{date} · {staff? staff.name: "Chưa chọn"} · {selectedSlot || "--:--"}</div>
            </div>
            <button disabled={!canSubmit} className={`rounded-2xl px-5 py-2.5 text-sm font-semibold shadow-lg ${canSubmit?"bg-indigo-600 hover:bg-indigo-500":"bg-white/10 text-white/50 cursor-not-allowed"}`}
              onClick={() => alert("Submit sẽ gọi POST /appointments sau này")}
            >Xác nhận đặt lịch</button>
          </div>
        </section>
      </div>
    </div>
  );
}