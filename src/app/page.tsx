"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="min-h-screen bg-white dark:bg-slate-950 text-[#0f0f0f] dark:text-slate-50"
    >
      {/* Nav */}
      <nav className="flex items-center justify-between md:px-30 sm:px-10 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
        <em
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-3xl tracking-tight text-blue-300"
        >
          Trackr
        </em>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <Link
            href="#features"
            className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors hidden md:block"
          >
            Features
          </Link>
          <Link
            href="/login"
            className="text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors hidden md:block"
          >
            Login
          </Link>

          {/* Theme toggle */}
          <button onClick={toggleTheme} className="cursor-pointer pl-4">
            {/* Mobile — icon only */}
            <span className="md:hidden flex items-center justify-center w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 ">
              {isDark ? (
                <IoMoonOutline size={13} className="text-blue-400" />
              ) : (
                <MdOutlineWbSunny size={13} className="text-amber-500" />
              )}
            </span>

            {/* Desktop — full slider */}
            <span className="hidden md:relative md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-0.5">
              <span
                className={`absolute w-6 h-6 rounded-full transition-all duration-300 ease-in-out ${
                  isDark
                    ? "translate-x-6.5 bg-slate-700"
                    : "translate-x-0 bg-white shadow-sm"
                }`}
              />
              <span className="relative z-10 flex items-center justify-center w-6 h-6">
                <MdOutlineWbSunny
                  size={15}
                  className={!isDark ? "text-amber-500" : "text-slate-500"}
                />
              </span>
              <span className="relative z-10 flex items-center justify-center w-6 h-6">
                <IoMoonOutline
                  size={15}
                  className={isDark ? "text-blue-400" : "text-slate-400"}
                />
              </span>
            </span>
          </button>

          <Link
            href="/register"
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
          className="md:text-6xl text-4xl sm:text-5xl leading-[1.08] tracking-tight text-[#0f0f0f] dark:text-slate-50 mb-6"
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
            href="/register"
            className="text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-full px-5 sm:px-8 py-2.5 sm:py-3 hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            Start tracking
          </Link>
          <Link
            href="/dashboard"
            className="text-xs sm:text-sm text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors whitespace-nowrap"
          >
            <span className="flex items-center gap-1 text-sm">
              See what&apos;s inside <IoArrowForward className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </section>

      {/* Trackr Info */}

      <div className="flex justify-end md:px-30 sm:px-10 px-5 md:pt-16 ">
        <div className="max-w-md text-right pt-8">
          <h1
            style={{ fontFamily: "var(--font-dm-serif)" }}
            className="md:text-6xl text-4xl sm:text-5xl leading-[1.08] tracking-tigh text-blue-300 mb-6"
          >
            Trackr <br />
            <em className=" text-[#0f0f0f]  dark:text-slate-50 ">without e.</em>
          </h1>

          <p className="text-sm font-light text-slate-400 leading-relaxed my-3">
            No subscriptions. No data selling. Just a clean space to understand
            your finances —{" "}
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              built for people who want clarity, not clutter.
            </span>
          </p>
          <div className="flex items-center justify-end gap-4 mt-9">
            <span className="text-xs text-blue-400 font-medium tracking-wide uppercase">
              Free
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-blue-400 font-medium tracking-wide uppercase">
              Open source
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-blue-400 font-medium tracking-wide uppercase">
              No ads
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div
        id="features"
        className="md:mx-30 sm:px-10 px-5 my-16 border border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3"
      >
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
            title: "AI-Powered Insights",
            desc: "Let AI analyze your finances and give you recommendations.",
          },
        ].map((f) => (
          <div
            key={f.num}
            className="p-8 border-b sm:border-b-0 border-r-0 sm:border-r border-slate-100 dark:border-slate-800 last:border-0"
          >
            <p className="text-xs font-medium tracking-widest text-blue-200 mb-6">
              {f.num}
            </p>
            <p className="text-lg text-[#0f0f0f] dark:text-slate-50 mb-2 leading-snug">
              {f.title}
            </p>
            <p className="text-xs font-light text-slate-400 leading-relaxed">
              {f.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="md:px-30 sm:px-10 px-5 py-12 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <p
          style={{ fontFamily: "var(--font-dm-serif)" }}
          className="text-lg sm:text-2xl md:text-3xl tracking-tight dark:text-slate-50"
        >
          Your money, <em className="text-blue-300">clearly yours.</em>
        </p>
        <Link
          href="/dashboard"
          className="text-xs sm:text-sm font-medium text-white bg-blue-500 rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:opacity-75 transition-opacity whitespace-nowrap"
        >
          <span className="flex items-center gap-1 text-sm">
            Open Dashboard
            <IoArrowForward className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="md:px-30 sm:px-10 px-5 py-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-center sm:justify-between gap-y-2 gap-x-4 text-center sm:text-left">
        <p className="text-xs text-slate-300 dark:text-slate-600">
          © 2026 Trackr. All rights reserved.
        </p>
        <p className="text-xs text-slate-300 dark:text-slate-600">
          Built by{" "}
          <a
            href="https://github.com/lianxxxx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-500 transition-colors"
          >
            LM
          </a>
        </p>
      </footer>
    </div>
  );
}
