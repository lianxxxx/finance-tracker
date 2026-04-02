"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { LuSettings } from "react-icons/lu";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";
import { navItems } from "@/lib/navItems";
import { User } from "@supabase/supabase-js";

interface Props {
  user: User;
}
export default function MobileNav({ user }: Props) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === "dark";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <div>
      {/* ===== MOBILE TOP HEADER ===== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-950 flex items-center justify-between px-4 py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <FaUserCircle size={32} className="text-slate-400" />
          <p className="text-sm text-slate-400 font-medium">
            {" "}
            Hi, {user.user_metadata?.name || user.email}!
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* Same toggle button mo sa settings — shared logic na */}
          <button
            onClick={toggleTheme}
            className="relative flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-1 gap-0.5 cursor-pointer"
          >
            <span
              className={`absolute w-7 h-7 rounded-full transition-all duration-300 ease-in-out ${
                isDark
                  ? "translate-x-7.5 bg-slate-700"
                  : "translate-x-0 bg-white shadow-sm"
              }`}
            />
            <span className="relative z-10 flex items-center justify-center w-7 h-7">
              <MdOutlineWbSunny
                size={15}
                className={!isDark ? "text-amber-500" : "text-slate-500"}
              />
            </span>
            <span className="relative z-10 flex items-center justify-center w-7 h-7">
              <IoMoonOutline
                size={15}
                className={isDark ? "text-blue-400" : "text-slate-400"}
              />
            </span>
          </button>

          <Link
            href="/settings"
            className="relative text-slate-400 hover:text-slate-600 transition-colors p-1"
          >
            <LuSettings size={21} />
          </Link>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around pt-4 pb-6">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-1 py-1 text-xs font-medium transition-colors
    ${isActive ? "text-blue-400" : "text-slate-500"}`}
            >
              <Icon size={20} />
              <span className="whitespace-nowrap text-[10px]">{label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
