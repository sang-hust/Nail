"use client";
import { useState } from "react";
import LoginModal from "@/components/auth/LoginModal";
import RegisterModal from "@/components/auth/RegisterModal";

export default function AuthButtons() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [regOpen, setRegOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setLoginOpen(true)}
        className="rounded-2xl px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20"
      >
        Login
      </button>
      <button
        onClick={() => setRegOpen(true)}
        className="rounded-2xl px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 shadow-lg"
      >
        Register
      </button>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      <RegisterModal open={regOpen} onClose={() => setRegOpen(false)} />
    </>
  );
}
