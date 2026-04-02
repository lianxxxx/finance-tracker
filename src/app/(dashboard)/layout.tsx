"use client";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebar-collapsed");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCollapsed(JSON.parse(stored));

    const handler = () => {
      const updated = localStorage.getItem("sidebar-collapsed");
      if (updated) setCollapsed(JSON.parse(updated));
    };

    window.addEventListener("sidebar-toggle", handler);
    return () => window.removeEventListener("sidebar-toggle", handler);
  }, []);

  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    );

  if (!user) return null;
  return (
    <div className="font-(family-name:--font-geist-sans) min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <DesktopSidebar user={user} />
      <MobileNav user={user} />

      <main
        className={`ml-0 px-4 pt-20 pb-28 md:px-8 md:pt-8 md:pb-8
    ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
}
