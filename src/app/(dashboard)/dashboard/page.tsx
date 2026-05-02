"use client";

import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "@/hooks/useAuth";
import { useTransactions } from "@/hooks/useTransactions";
import StatsCards from "@/components/dashboard/StatsCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import DashboardSkeleton from "@/components/skeletons/DashboardSkeleton";

const ChartCardSkeleton = () => (
  <div className="w-full bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
    <div className="mb-6">
      <Skeleton height={16} width={160} />
    </div>
    <Skeleton height={250} />
  </div>
);

const IncomeExpenseChart = dynamic(
  () => import("@/components/dashboard/IncomeExpenseChart"),
  { ssr: false, loading: () => <ChartCardSkeleton /> },
);
const SpendingBreakdown = dynamic(
  () => import("@/components/dashboard/SpendingBreakdown"),
  { ssr: false, loading: () => <ChartCardSkeleton /> },
);

export default function DashboardPage() {
  const { user } = useAuth();
  const { transactions, loading } = useTransactions();

  if (loading) return <DashboardSkeleton />;
  const name = user?.user_metadata?.name || user?.email || "User";

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome back, {name}!
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
        Finance/Expense Tracker Dashboard
      </p>
      <StatsCards transactions={transactions} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <IncomeExpenseChart transactions={transactions} />
        </div>
        <div className="w-full md:w-1/2">
          <SpendingBreakdown transactions={transactions} />
        </div>
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
