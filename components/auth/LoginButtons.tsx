// components/auth/LoginButtons.tsx
"use client";

export default function LoginButtons() {
  function oauth(provider: string) {
    // Replace with your backend login endpoints later
    const redirect = encodeURIComponent(window.location.origin + "/auth/callback");
    window.location.href = `/auth/${provider}/login?redirect=${redirect}`; // placeholder
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => oauth("google")}
        className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20"
      >Google</button>
      <button
        onClick={() => oauth("facebook")}
        className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20"
      >Facebook</button>
      <button
        onClick={() => oauth("instagram")}
        className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20"
      >Instagram</button>
      <button
        onClick={() => alert("Phone OTP modal – implement later")}
        className="rounded-2xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 shadow-lg"
      >Số điện thoại</button>
    </div>
  );
}