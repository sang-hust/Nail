import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="px-4">
        <div className="mx-auto max-w-4xl text-center pt-16 pb-24">
          <h1 className="text-5xl font-semibold mb-4">AI-driven tools for product teams</h1>
          <p className="text-white/70 mb-8">Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/booking" className="rounded-2xl px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-semibold shadow-lg">Start Building</Link>
            <Link href="/staff" className="rounded-2xl px-5 py-2.5 border border-white/10 hover:bg-white/10">Schedule Demo</Link>
          </div>
        </div>
      </section>

      {/* FEATURES ICON ROW */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 border-y border-white/5 py-8 text-center">
          {["Booking is so easy","Payments","Marketing & Sales","Business & Customer","Website & Widgets","Integrations"].map((t,i)=> (
            <div key={i} className="text-sm text-white/80">
              <div className="mx-auto h-10 w-10 rounded-xl bg-white/5 mb-2" />
              {t}
            </div>
          ))}
        </div>
      </section>

      {/* IMAGE + TEXT SECTION */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-10 py-16 items-center">
          <div className="h-64 md:h-80 rounded-2xl bg-white/5 border border-white/10" />
          <div>
            <h2 className="text-2xl font-semibold mb-3">Dynamic Booking & Business Management Solution</h2>
            <p className="text-white/70 mb-5">Explore features to attract new customers, retain existing ones, and run your business like a pro!</p>
            <div className="flex gap-3">
              <Link href="/features" className="rounded-full px-4 py-2 border border-white/10 hover:bg-white/10">View full list of features →</Link>
              <Link href="/sectors" className="rounded-full px-4 py-2 bg-white/10 hover:bg-white/20">Features by industry</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESERVATION EASY GRID */}
      <section className="px-4">
        <div className="mx-auto max-w-6xl py-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Reservation easy</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-2xl p-6 bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-xl bg-white/10 mb-3" />
                <div className="font-medium mb-1">Feature title {i}</div>
                <div className="text-white/70 text-sm">Short description of the reservation feature block.</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}