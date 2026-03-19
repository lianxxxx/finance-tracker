import { Transaction } from "@/lib/types";
import { TbTrendingUp, TbTrendingDown, TbWallet } from "react-icons/tb";

interface Props {
  transactions: Transaction[];
}

export default function StatsCards({ transactions }: Props) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Total Balance
          </p>
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
            <TbWallet size={18} className="text-blue-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          ₱{totalBalance.toLocaleString()}
        </p>
        <p className="text-xs text-emerald-500 mt-1">↑ +12% this month</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Income
          </p>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
            <TbTrendingUp size={18} className="text-emerald-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          ₱{totalIncome.toLocaleString()}
        </p>
        <p className="text-xs text-emerald-500 mt-1">↑ +8% vs last month</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monthly Expenses
          </p>
          <div className="w-9 h-9 rounded-xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <TbTrendingDown size={18} className="text-red-500" />
          </div>
        </div>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">
          ₱{totalExpenses.toLocaleString()}
        </p>
        <p className="text-xs text-red-400 mt-1">↑ +3% vs last month</p>
      </div>
    </div>
  );
}
