"use client";

import { Transaction } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { RiBarChartBoxAiLine } from "react-icons/ri";

interface Props {
  transactions: Transaction[];
}
export default function IncomeExpenseChart({ transactions }: Props) {
  // Group by month
  const monthlyData = transactions.reduce(
    (acc, t) => {
      const month = new Date(t.date).toLocaleString("en-PH", {
        month: "short",
      });
      if (!acc[month]) acc[month] = { month, income: 0, expenses: 0 };
      if (t.type === "income") acc[month].income += t.amount;
      else acc[month].expenses += t.amount;
      return acc;
    },
    {} as Record<string, { month: string; income: number; expenses: number }>,
  );

  const data = Object.values(monthlyData);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6">
      <h2 className="text-base sm:text-left font-semibold text-slate-900 dark:text-slate-50 mb-6">
        Income vs Expense
      </h2>
      {data.length === 0 ? (
        <div className="h-62.5 flex flex-col items-center justify-center gap-2">
          <RiBarChartBoxAiLine size={40} />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No data yet
          </p>
          <p className="text-xs text-center  text-slate-400">
            Add transactions to see your chart
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} barGap={4}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e2e8f0"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value) => [`₱${Number(value).toLocaleString()}`, ""]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#f87171"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
