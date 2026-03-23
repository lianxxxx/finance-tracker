"use client";

import { useTransactions } from "@/hooks/useTransactions";
import StatsCards from "@/components/dashboard/StatsCards";
import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import RecentTransactions from "@/components/dashboard/RecentTransactions";

export default function DashboardPage() {
  const { transactions } = useTransactions();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome back, User!
      </h1>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-6">
        Finance/Expense Tracker Dashboard
      </p>
      <StatsCards transactions={transactions} />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2">
          <IncomeExpenseChart />
        </div>
        <div className="w-full md:w-1/2">
          <SpendingBreakdown transactions={transactions} />
        </div>
      </div>
      <RecentTransactions transactions={transactions} />
    </div>
  );
}
