import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import MobileNav from "@/components/dashboard/MobileNav";

export default function Home() {
  return (
    <div>
      <MobileNav />
      <DesktopSidebar />
    </div>
  );
}
