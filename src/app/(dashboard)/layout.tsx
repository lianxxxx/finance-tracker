import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopSidebar />
      <MobileNav />
      <main className="ml-0 md:ml-64 px-4 pt-20 pb-28 md:px-8 md:pt-8 md:pb-8">
        {children}
      </main>
    </>
  );
}
