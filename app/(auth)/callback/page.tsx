// app/auth/callback/page.tsx
export default function AuthCallback() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold mb-2">Đang đăng nhập…</h1>
      <p className="text-white/70">Trang này sẽ xử lý kết quả OAuth từ backend sau này.</p>
    </div>
  );
}