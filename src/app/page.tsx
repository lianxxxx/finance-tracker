import IncomeExpenseChart from "@/components/dashboard/IncomeExpenseChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import SpendingBreakdown from "@/components/dashboard/SpendingBreakdown";
import StatsCards from "@/components/dashboard/StatsCards";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
        Welcome back, Lian!
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Finance/Expense Tracker Dashboard
      </p>
      <StatsCards />
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/2">
          <IncomeExpenseChart />
        </div>
        <div className="w-full lg:w-1/2">
          <SpendingBreakdown />
        </div>
      </div>
      <RecentTransactions />
    </div>
  );
}
