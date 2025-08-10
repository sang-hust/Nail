"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { api } from "@/lib/api";

type Step = 1 | 2 | 3; // phone -> otp -> password
const COUNTRIES = [
  { code: "VN", dial: "+84", label: "Vietnam (+84)" },
  { code: "TH", dial: "+66", label: "Thailand (+66)" },
  { code: "US", dial: "+1",  label: "United States (+1)" },
];

export default function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<Step>(1);
  const [dial, setDial] = useState(COUNTRIES[0].dial);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
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
  const otpValid = /^\d{6}$/.test(otp);
  const pwValid = pw.length >= 6;

  function reset() { setStep(1); setDial(COUNTRIES[0].dial); setPhone(""); setOtp(""); setPw(""); setErr(null); }
  function handleClose() { setMounted(false); setTimeout(() => { reset(); onClose(); }, 250); }

  return createPortal(
    <div className="fixed inset-0 z-[1000]">
      {/* nền mờ */}
      <div className={`fixed inset-0 bg-black/80 transition-opacity duration-200 ${mounted ? "opacity-100" : "opacity-0"}`} />
      {/* wrapper full-screen: click để đóng */}
      <div onClick={handleClose} className="fixed inset-0 flex items-center justify-center p-4">
        {/* chặn click trong modal */}
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
          className={`w-full max-w-[480px] rounded-2xl border border-white/10 bg-[#0B0B0F] p-6 shadow-2xl transition duration-200 ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <h3 className="text-lg font-semibold mb-1">Register your business</h3>
          <p className="text-white/70 mb-5">Chỉ cần số điện thoại (có mã quốc gia), xác nhận OTP và tạo mật khẩu.</p>

          {step === 1 && (
            <div className="space-y-3">
              <label className="text-sm text-white/80">Số điện thoại</label>
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
                  placeholder="VD: 0912 345 678"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
                />
              </div>
              {!phoneValid && phone.length > 0 && (
                <div className="text-amber-400 text-xs">Vui lòng nhập số hợp lệ.</div>
              )}
              {err && <div className="text-red-400 text-sm">{err}</div>}
              <div className="flex justify-end">
                <button
                  disabled={!phoneValid}
                  onClick={async () => {
                    try {
                      setErr(null);
                      await api.requestOtp(fullPhone);
                      setStep(2);
                    } catch (e: any) {
                      setErr(e.message || "Không gửi được OTP");
                    }
                  }}
                  className={`rounded-2xl px-5 py-2.5 font-semibold ${
                    phoneValid ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  Tiếp tục
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3">
              <div className="text-sm">Nhập mã OTP đã gửi tới <span className="font-medium">{fullPhone}</span></div>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Nhập mã 6 số (mock: 123456)"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 tracking-[0.3em] text-center"
              />
              {!otpValid && otp.length > 0 && (
                <div className="text-amber-400 text-xs">OTP phải gồm 6 chữ số.</div>
              )}
              {err && <div className="text-red-400 text-sm">{err}</div>}
              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="rounded-2xl px-4 py-2 border border-white/10 hover:bg-white/10">
                  Quay lại
                </button>
                <button
                  disabled={!otpValid}
                  onClick={async () => {
                    try {
                      setErr(null);
                      await api.verifyOtp(fullPhone, otp);
                      setStep(3);
                    } catch (e: any) {
                      setErr(e.message || "OTP không đúng");
                    }
                  }}
                  className={`rounded-2xl px-5 py-2.5 font-semibold ${
                    otpValid ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  Xác nhận
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3">
              <label className="text-sm text-white/80">Tạo mật khẩu</label>
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Ít nhất 6 ký tự"
                className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2"
              />
              {pw.length > 0 && pw.length < 6 && (
                <div className="text-amber-400 text-xs">Mật khẩu tối thiểu 6 ký tự.</div>
              )}
              {err && <div className="text-red-400 text-sm">{err}</div>}
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="rounded-2xl px-4 py-2 border border-white/10 hover:bg-white/10">
                  Quay lại
                </button>
                <button
                  disabled={pw.length < 6}
                  onClick={async () => {
                    try {
                      setErr(null);
                      await api.register(fullPhone, pw);
                      handleClose();
                    } catch (e: any) {
                      setErr(e.message || "Không đăng ký được");
                    }
                  }}
                  className={`rounded-2xl px-5 py-2.5 font-semibold ${
                    pw.length >= 6 ? "bg-indigo-600 hover:bg-indigo-500" : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  Hoàn tất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
