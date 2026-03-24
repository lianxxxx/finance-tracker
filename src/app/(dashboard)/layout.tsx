"use client";

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

  return (
    <div className="font-(family-name:--font-geist-sans) min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <DesktopSidebar />
      <MobileNav />
      <main
        className={`ml-0 px-4 pt-20 pb-28 md:px-8 md:pt-8 md:pb-8
    ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >
        {children}
      </main>
    </div>
  );
}
