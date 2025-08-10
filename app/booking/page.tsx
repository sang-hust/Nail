// app/booking/page.tsx
import BookingFlow from "@/components/booking/BookingFlow";

export default function BookingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Đặt lịch</h1>
      <BookingFlow />
    </div>
  );
}