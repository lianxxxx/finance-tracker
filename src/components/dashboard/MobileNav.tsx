"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { PiWallet } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { FaUserCircle } from "react-icons/fa";
import { TbBell } from "react-icons/tb";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMoonOutline } from "react-icons/io5";

const navItems = [
  { label: "Dashboard", href: "/", icon: RxDashboard },
  {
    label: "Transactions",
    href: "/transactions",
    icon: HiOutlineArrowsRightLeft,
  },
  { label: "Accounts", href: "/accounts", icon: PiWallet },
  { label: "Goals", href: "/goals", icon: GoGoal },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div>
      {/* ===== MOBILE TOP HEADER ===== */}
      <header className="md:hidden fixed top-2 left-4 right-4 z-40 flex items-center justify-between  pt-4 pb-2">
        <div className="flex items-center gap-2">
          <FaUserCircle size={32} className="text-slate-400" />
          <p className="text-sm text-slate-400 font-medium">Hi, Lian!</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <div className="flex items-center bg-slate-800 rounded-full p-1 gap-0.5">
            <button className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-700 text-amber-400 transition-all">
              <MdOutlineWbSunny size={14} />
            </button>
            <button className="flex items-center justify-center w-5 h-5 rounded-full text-slate-500 transition-all">
              <IoMoonOutline size={14} />
            </button>
          </div>
          {/* Bell */}
          <button className="relative text-slate-400 hover:text-slate-200 transition-colors p-1">
            <TbBell size={21} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 dark:border-slate-800 dark:bg-slate-900 flex justify-around pt-4 pb-6">
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
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
