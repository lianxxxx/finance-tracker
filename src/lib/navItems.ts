import { RxDashboard } from "react-icons/rx";
import { HiOutlineArrowsRightLeft } from "react-icons/hi2";
import { PiWallet } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { LuSparkles } from "react-icons/lu";
import { IconType } from "react-icons";

export interface NavItem {
  label: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: RxDashboard },
  {
    label: "Transactions",
    href: "/transactions",
    icon: HiOutlineArrowsRightLeft,
  },
  { label: "Accounts", href: "/account", icon: PiWallet },
  { label: "Goals", href: "/goals", icon: GoGoal },
  { label: "AI Insights", href: "/insights", icon: LuSparkles },
];
