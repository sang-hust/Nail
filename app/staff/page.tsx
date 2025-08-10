// app/staff/page.tsx
import { api } from "@/lib/api";
import StaffCard from "@/components/staff/StaffCard";

export const dynamic = "force-dynamic"; // keep simple for now

export default async function StaffPage() {
  const staff = await api.listStaff();
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Đội ngũ của chúng tôi</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map(s => <StaffCard key={s.id} staff={s} />)}
      </div>
    </div>
  );
}