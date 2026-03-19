import { Transaction } from "@/lib/types";
import { TbTrendingUp, TbTrendingDown, TbWallet } from "react-icons/tb";

interface Props {
  transactions: Transaction[];
}

export default function StatsCards({ transactions }: Props) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const lastMonthTx = transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const currentIncome = currentMonthTx
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const lastIncome = lastMonthTx
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const currentExpenses = currentMonthTx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const lastExpenses = lastMonthTx
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const incomeChange =
    lastIncome === 0
      ? 0
      : Math.round(((currentIncome - lastIncome) / lastIncome) * 100);
  const expensesChange =
    lastExpenses === 0
      ? 0
      : Math.round(((currentExpenses - lastExpenses) / lastExpenses) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Balance */}
      <div className="bg-linear-to-br from-blue-400 to-blue-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-blue-100">Total Balance</p>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            <TbWallet size={18} className="text-white" />
          </div>
        </div>
        <p className="text-3xl font-bold text-white">
          ₱{totalBalance.toLocaleString()}
        </p>
        <p className="text-xs text-blue-100 mt-1">All time</p>
      </div>

      {/* Monthly Income */}
      <div className="bg-linear-to-br from-emerald-400 to-emerald-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-emerald-100">Monthly Income</p>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            {incomeChange >= 0 ? (
              <TbTrendingUp size={18} className="text-white" />
            ) : (
              <TbTrendingDown size={18} className="text-white" />
            )}
          </div>
        </div>
        <p className="text-3xl font-bold text-white">
          ₱{currentIncome.toLocaleString()}
        </p>
        <p className="text-xs text-emerald-100 mt-1">
          {incomeChange >= 0 ? "↑" : "↓"} {Math.abs(incomeChange)}% vs last
          month
        </p>
      </div>

      {/* Monthly Expenses */}
      <div className="bg-linear-to-br from-red-400 to-red-700 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm text-red-100">Monthly Expenses</p>
          <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
            {expensesChange <= 0 ? (
              <TbTrendingDown size={18} className="text-white" />
            ) : (
              <TbTrendingUp size={18} className="text-white" />
            )}
          </div>
        </div>
        <p className="text-3xl font-bold text-white">
          ₱{currentExpenses.toLocaleString()}
        </p>
        <p className="text-xs text-red-100 mt-1">
          {expensesChange >= 0 ? "↑" : "↓"} {Math.abs(expensesChange)}% vs last
          month
        </p>
      </div>
    </div>
  );
}
