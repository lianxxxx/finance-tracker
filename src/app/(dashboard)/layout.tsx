import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-(family-name:--font-geist-sans) min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <DesktopSidebar />

      <MobileNav />
      <main className="ml-0 md:ml-64 px-4 pt-20 pb-28 md:px-8 md:pt-8 md:pb-8">
        {children}
      </main>
    </div>
  );
}
