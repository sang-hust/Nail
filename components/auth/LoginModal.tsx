"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";

const COUNTRIES = [
  { code: "VN", dial: "+84", label: "Vietnam (+84)" },
  { code: "TH", dial: "+66", label: "Thailand (+66)" },
  { code: "US", dial: "+1",  label: "United States (+1)" },
];

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [dial, setDial] = useState(COUNTRIES[0].dial);
  const [phone, setPhone] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => { setReady(true); }, []);
  useEffect(() => {
    if (!open) return;
    setMounted(true);
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && handleClose();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);
    return () => {
      window.removeEventListener("keydown", onEsc);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  if (!open || !ready) return null;

  const digits = (s: string) => s.replace(/\D/g, "");
  const fullPhone = `${dial}${digits(phone).replace(/^0+/, "")}`;
  const phoneValid = digits(phone).length >= 8;
  const pwValid = pw.length >= 6;
  const canSubmit = phoneValid && pwValid;

  function handleClose() {
    setMounted(false);
    setTimeout(() => onClose(), 250);
  }

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      {/* nền mờ */}
      <div className={`fixed inset-0 bg-black/80 transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`} />
      {/* wrapper full-screen: click để đóng */}
      <div onClick={handleClose} className="fixed inset-0 flex items-center justify-center p-4">
        {/* chặn click bên trong modal */}
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-[420px] rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 shadow-2xl transition duration-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h3 className="text-lg font-semibold mb-4">Login</h3>

          <div className="space-y-3">
            <div className="flex gap-2">
              <select
                value={dial}
                onChange={(e) => setDial(e.target.value)}
                className="shrink-0 rounded-xl bg-white/5 border border-white/10 px-3 py-2"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.dial}>{c.label}</option>
                ))}
              </select>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Số điện thoại"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
              />
            </div>
            {!phoneValid && phone.length > 0 && (
              <div className="text-amber-400 text-xs">Vui lòng nhập số hợp lệ.</div>
            )}

            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Mật khẩu (≥ 6 ký tự)"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
            />

            {err && <div className="text-red-400 text-sm">{err}</div>}

            <button
              disabled={!canSubmit}
              onClick={async () => {
                try {
                  setErr(null);
                  await api.login(fullPhone, pw);
                  handleClose();
                } catch (e: any) {
                  setErr(e.message || "Không đăng nhập được");
                }
              }}
              className={`w-full rounded-2xl px-4 py-2 font-semibold shadow-lg ${
                canSubmit ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/10 text-white/50 cursor-not-allowed"
              }`}
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
