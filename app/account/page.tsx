// app/account/page.tsx
export default function AccountPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Tài khoản</h1>
      <div className="rounded-2xl p-5 border border-white/10 bg-white/5">
        <p className="text-white/80">Tại đây bạn sẽ cập nhật số điện thoại và xác thực OTP (sau khi có backend).</p>
        <div className="mt-4 flex gap-2">
          <input placeholder="Số điện thoại" className="rounded-xl bg-white/5 border border-white/10 px-3 py-2 w-full" />
          <button className="rounded-xl px-4 py-2 bg-indigo-600 hover:bg-indigo-500">Nhận mã</button>
        </div>
      </div>
    </div>
  );
}