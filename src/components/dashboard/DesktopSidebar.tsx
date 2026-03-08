"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { PiWallet } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { LuSettings } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";

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

export default function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 z-40">
      {/* User */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-200 dark:border-slate-800">
        <FaUserCircle size={36} className="text-slate-400" />
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Hi, Lian!
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Finance/Expense Tracker
          </p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800">
        <Link
          href="/settings"
          className={`flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-colors
            ${
              pathname === "/settings"
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          <LuSettings size={18} />
          Settings
        </Link>
      </div>
    </aside>
  );
}
