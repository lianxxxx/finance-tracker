"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuSettings } from "react-icons/lu";
import { FaUserCircle } from "react-icons/fa";
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarLeftExpandFilled,
} from "react-icons/tb";
import { navItems } from "@/lib/navItems";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { TbLogout } from "react-icons/tb";
import { useToast } from "@/context/ToastContext";

const ConfirmLogoutModal = dynamic(
  () => import("@/components/modals/ConfirmLogoutModal"),
  { ssr: false },
);
interface Props {
  user: User;
}

export default function DesktopSidebar({ user }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCollapsed(JSON.parse(stored));
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(next));
    window.dispatchEvent(new Event("sidebar-toggle"));
  }

  const router = useRouter();
  const { showToast } = useToast();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    showToast("success", "You've been logged out.");
    router.push("/login");
  };

  return (
    <>
    <aside
      className={`hidden md:flex flex-col h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 fixed left-0 top-0 z-40 transition-all duration-300 
    ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Toggle button */}
      <button
        onClick={toggle}
        title={collapsed ? "Expand" : "Collapse"}
        className="absolute -right-3 top-7 z-50 w-6 h-6   flex items-center justify-center text-slate-500  dark:text-slate-300 hover:text-blue-500 dark:hover:text-blue-400  transition-colors  cursor-pointer"
      >
        {collapsed ? (
          <TbLayoutSidebarLeftCollapseFilled size={21} />
        ) : (
          <TbLayoutSidebarLeftExpandFilled size={21} />
        )}
      </button>

      {/* User */}
      <div
        className={`flex items-center gap-3 px-4 py-6 border-b border-slate-200 dark:border-slate-800 ${collapsed ? "justify-center" : ""}`}
      >
        <FaUserCircle size={36} className="text-slate-400 shrink-0" />
        {!collapsed && (
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">
              Hi, {user.user_metadata?.name || user.email}!
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
              Finance/Expense Tracker
            </p>
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-6 flex flex-col gap-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors
                ${collapsed ? "justify-center" : ""}
                ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                }`}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && label}
            </Link>
          );
        })}
      </nav>

      {/* Settings  */}
      <div className="px-3 py-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
        <Link
          href="/settings"
          title={collapsed ? "Settings" : undefined}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors
            ${collapsed ? "justify-center" : ""}
            ${
              pathname === "/settings"
                ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          <LuSettings size={18} className="shrink-0" />
          {!collapsed && "Settings"}
        </Link>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          title={collapsed ? "Logout" : undefined}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 w-full cursor-pointer
    ${collapsed ? "justify-center" : ""}`}
        >
          <TbLogout size={18} className="shrink-0" />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>

    {showLogoutConfirm && (
      <ConfirmLogoutModal
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    )}
    </>
  );
}
