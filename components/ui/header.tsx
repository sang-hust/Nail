"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthButtons from "@/components/auth/AuthButtons";

const nav = [
  { href: "/booking", label: "Đặt lịch" },
  { href: "/staff", label: "Đội ngũ" },
  { href: "/products", label: "Sản phẩm" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-indigo-500 inline-block" />
          <span className="font-semibold">Falcon Salon</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={
                "text-sm/6 hover:text-white transition " +
                (pathname === n.href ? "text-white" : "text-white/70")
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}