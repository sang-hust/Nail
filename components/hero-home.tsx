"use client";

import VideoThumb from "@/public/images/hero-image-01.jpg";

export default function HeroHome() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950">
      {/* Spotlight gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,rgba(120,119,198,0.25),transparent)]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Hero content */}
        <div className="py-14 md:py-24 text-center">
          <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-indigo-200),var(--color-gray-50),var(--color-indigo-300),var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
            Nâng tầm phong cách tại HS Salon
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lg md:text-xl text-indigo-200/70">
            Đội ngũ stylist dày dặn kinh nghiệm, kỹ thuật hiện đại, không gian
            thư giãn. Khám phá dịch vụ, đội ngũ và sản phẩm chuẩn salon.
          </p>

          {/* CTA */}
          <div className="mx-auto flex max-w-none justify-center gap-3">
            <a
              href="/booking"
              className="btn group bg-linear-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
            >
              <span className="relative inline-flex items-center">
                Đặt lịch ngay
                <span className="ml-1 text-white/50 transition-transform group-hover:translate-x-0.5">
                  -&gt;
                </span>
              </span>
            </a>
            <a
              href="/products"
              className="btn bg-linear-to-b from-gray-800 to-gray-800/60 text-gray-300"
            >
              Xem sản phẩm
            </a>
          </div>
        </div>

        {/* Video hiển thị trực tiếp */}
        <div className="mt-10">
          <video
            className="w-full rounded-2xl ring-1 ring-white/20"
            width={1920}
            height={1080}
            autoPlay
            loop
            muted
            playsInline
            controls
            poster={VideoThumb.src}
          >
            <source src="/videos/salon.mp4" type="video/mp4" />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
      </div>
    </section>
  );
}
