"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import ConfirmLogoutModal from "@/components/modals/ConfirmLogoutModal";
import { useToast } from "@/context/ToastContext";
import {
  TbUser,
  TbMoon,
  TbSun,
  TbCurrencyPeso,
  TbInfoCircle,
  TbChevronRight,
} from "react-icons/tb";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  const name = user?.user_metadata?.name || "User";
  const email = user?.email || "user@example.com";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("success", "You've been logged out.");
    router.push("/login");
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
                  {name}
                </p>
                <p className="text-xs text-slate-400"> {email}</p>
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
              className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-0.5 cursor-pointer"
            >
              {/* Sliding pill */}
              <span
                className={`absolute w-7 h-7 rounded-full transition-all duration-300 ease-in-out ${
                  isDark
                    ? "translate-x-7.5 bg-slate-700"
                    : "translate-x-0 bg-white shadow-sm"
                }`}
              />

              {/* Sun */}
              <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300">
                <MdOutlineWbSunny
                  size={15}
                  className={
                    !isDark
                      ? "text-amber-500"
                      : "text-slate-400 dark:text-slate-500"
                  }
                />
              </span>

              {/* Moon */}
              <span className="relative z-10 flex items-center justify-center w-7 h-7 rounded-full transition-colors duration-300">
                <IoMoonOutline
                  size={15}
                  className={isDark ? "text-blue-400" : "text-slate-400"}
                />
              </span>
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

        {/* Logout */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
              Account
            </p>
          </div>
          <button
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-5 py-4 w-full hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-400">
              <TbLogout size={18} />
            </div>
            <p className="text-sm font-medium text-red-400">Logout</p>
          </button>
        </div>
      </div>

      {showLogoutConfirm && (
        <ConfirmLogoutModal
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}
