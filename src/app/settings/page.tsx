"use client";

import { useState } from "react";
import {
  TbUser,
  TbMoon,
  TbSun,
  TbCurrencyPeso,
  TbInfoCircle,
  TbChevronRight,
} from "react-icons/tb";

export default function SettingsPage() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    setIsDark(!isDark);
    localStorage.setItem("theme", isDark ? "light" : "dark");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Settings
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage your preferences
        </p>
      </div>

      <div className="flex flex-col gap-4 max-w-lg">
        {/* Profile */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Profile
            </p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                <TbUser size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  Lian
                </p>
                <p className="text-xs text-slate-400">lian@email.com</p>
              </div>
            </div>
            <TbChevronRight size={18} className="text-slate-400" />
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Appearance
            </p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                {isDark ? <TbMoon size={18} /> : <TbSun size={18} />}
              </div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                {isDark ? "Dark Mode" : "Light Mode"}
              </p>
            </div>
            {/* Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-11 h-6 rounded-full transition-colors relative ${isDark ? "bg-blue-500" : "bg-slate-200"}`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${isDark ? "left-5" : "left-0.5"}`}
              />
            </button>
          </div>
        </div>

        {/* Currency */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Preferences
            </p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <TbCurrencyPeso size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  Currency
                </p>
                <p className="text-xs text-slate-400">Philippine Peso (₱)</p>
              </div>
            </div>
            <TbChevronRight size={18} className="text-slate-400" />
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              About
            </p>
          </div>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-500">
                <TbInfoCircle size={18} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                  Finance Tracker
                </p>
                <p className="text-xs text-slate-400">Version 1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
