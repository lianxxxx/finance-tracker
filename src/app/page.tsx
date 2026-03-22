import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="min-h-screen bg-white text-[#0f0f0f]"
    >
      {/* Nav */}
      <nav className="flex items-center justify-between md:px-30 sm:px-10 px-5 py-4 border-b border-slate-100">
        <em
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-3xl tracking-tight text-blue-300"
        >
          Trackr
        </em>
        <div className="flex items-center gap-8 ">
          <Link
            href="#"
            className="text-sm text-slate-400 hover:text-slate-900 transition-colors hidden md:block"
          >
            Features
          </Link>
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 hover:text-slate-900 transition-colors hidden md:block"
          >
            Login
          </Link>
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="md:px-30 sm:px-10 px-5 pt-24 pb-16 max-w-3xl">
        <p className="text-xs font-medium tracking-widest uppercase text-blue-500 mb-6">
          Personal Finance
        </p>
        <h1
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="md:text-6xl text-4xl sm:text-5xl  leading-[1.08] tracking-tight text-[#0f0f0f] mb-6"
        >
          Know where your <br />
          <em className="text-blue-300">money actually goes.</em>
        </h1>
        <p className="text-base font-light text-slate-400 leading-relaxed max-w-md mb-10">
          A quiet, focused tool for tracking income, expenses, and goals —
          without distractions.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-full px-5 sm:px-8 py-2.5 sm:py-3 hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            Start for free
          </Link>
          <Link
            href="#"
            className="text-xs sm:text-sm text-slate-400 hover:text-slate-900 transition-colors whitespace-nowrap"
          >
            See how it works →
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <div className="md:mx-30 sm:px-10 px-5 my-16 border border-slate-100 grid grid-cols-1 sm:grid-cols-3">
        {[
          {
            num: "01",
            title: "Track every peso",
            desc: "Log income and expenses in seconds. Categorized, searchable, always in sync.",
          },
          {
            num: "02",
            title: "Visualize patterns",
            desc: "Charts that make your spending habits impossible to ignore.",
          },
          {
            num: "03",
            title: "Set real goals",
            desc: "Define targets and watch your progress — week by week, peso by peso.",
          },
        ].map((f) => (
          <div
            key={f.num}
            className="p-8 border-b sm:border-b-0 border-r-0 sm:border-r border-slate-100 last:border-0"
          >
            <p className="text-xs font-medium tracking-widest text-blue-200 mb-6">
              {f.num}
            </p>
            <p className="text-lg text-[#0f0f0f] mb-2 leading-snug">
              {f.title}
            </p>
            <p className="text-xs font-light text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="md:px-30 sm:px-10 px-5 py-12 border-t border-slate-100 flex items-center justify-between gap-4">
        <p
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-lg sm:text-2xl tracking-tight"
        >
          Your money, <em className="text-blue-300">clearly yours.</em>
        </p>
        <Link
          href="/dashboard"
          className="text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          Open dashboard →
        </Link>
      </div>
      {/* Footer */}
      <footer className="md:px-30 sm:px-10 px-5 py-6 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-4 text-center sm:text-left">
        <p className="text-xs text-slate-300">
          © 2026 Trackr. All rights reserved.
        </p>

        <p className="text-xs text-slate-300">
          Built by{" "}
          <a
            href="https://github.com/lianxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-500 transition-colors "
          >
            Leyanne Mayo
          </a>
        </p>
      </footer>
    </div>
  );
}
