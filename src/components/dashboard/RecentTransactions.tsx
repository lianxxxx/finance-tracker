import { Transaction } from "@/lib/types";
import {
  TbShoppingCart,
  TbCash,
  TbDeviceTv,
  TbBolt,
  TbCar,
  TbTag,
} from "react-icons/tb";
import { VscEmptyWindow } from "react-icons/vsc";
import React from "react";
import Link from "next/link";
const categoryIcon: Record<string, React.ReactElement> = {
  Food: <TbShoppingCart size={18} />,
  Salary: <TbCash size={18} />,
  Freelance: <TbCash size={18} />,
  Investment: <TbCash size={18} />,
  Entertainment: <TbDeviceTv size={18} />,
  Bills: <TbBolt size={18} />,
  Transport: <TbCar size={18} />,
  Shopping: <TbTag size={18} />,
};

const categoryColor: Record<string, string> = {
  Food: "bg-blue-50 dark:bg-blue-500/10 text-blue-500",
  Salary: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
  Freelance: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
  Investment: "bg-purple-50 dark:bg-purple-500/10 text-purple-500",
  Entertainment: "bg-red-50 dark:bg-red-500/10 text-red-500",
  Bills: "bg-amber-50 dark:bg-amber-500/10 text-amber-500",
  Transport: "bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500",
  Shopping: "bg-pink-50 dark:bg-pink-500/10 text-pink-500",
  Other: "bg-slate-100 dark:bg-slate-500/10 text-slate-500",
};

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  const recent = transactions.slice(0, 5);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mt-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
          Recent Transactions
        </h2>
        <Link
          href="/transactions"
          className="text-xs text-blue-500 hover:text-blue-600 font-medium"
        >
          View all
        </Link>
      </div>

      {/* Header - hidden on mobile */}
      <div className="hidden sm:grid grid-cols-3 px-4 mb-2">
        <p className="text-xs text-slate-400">Name</p>
        <p className="text-xs text-slate-400 text-center">Date</p>
        <p className="text-xs text-slate-400 text-right">Amount</p>
      </div>
      {recent.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-2 gap-2">
          <VscEmptyWindow
            size={35}
            className="text-slate-300 dark:text-slate-600"
          />
          <p className="text-sm font-medium text-center  text-slate-500 dark:text-slate-400">
            No transactions yet
          </p>
          <p className="text-xs text-center text-slate-400">
            Add your first transaction to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {recent.map((t: Transaction) => (
            <div
              key={t.id}
              className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {/* Left: icon + title + date (mobile) */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center ${categoryColor[t.category] || "bg-slate-100 dark:bg-slate-700 text-slate-500"}`}
                >
                  {categoryIcon[t.category] || <TbTag size={18} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    {t.title}
                  </p>
                  <p className="text-xs text-slate-400 sm:hidden">
                    {new Date(t.date).toLocaleDateString("en-PH", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Center: date - hidden on mobile */}
              <p className="hidden sm:block text-xs text-slate-400 text-center">
                {new Date(t.date).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* Right: amount */}
              <p
                className={`text-sm font-semibold shrink-0 ${t.type === "income" ? "text-emerald-500" : "text-red-400"}`}
              >
                {t.type === "income" ? "+" : "-"}₱{t.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
