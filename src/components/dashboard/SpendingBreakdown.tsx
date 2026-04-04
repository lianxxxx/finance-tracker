"use client";

import { Transaction } from "@/lib/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { TbChartDonut } from "react-icons/tb";
const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f87171",
  "#f59e0b",
  "#a855f7",
  "#06b6d4",
];

interface Props {
  transactions: Transaction[];
}

export default function SpendingBreakdown({ transactions }: Props) {
  const categoryData = Object.entries(
    transactions
      .filter((t) => t.type === "expense")
      .reduce(
        (acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        },
        {} as Record<string, number>,
      ),
  ).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 mb-6">
      <h2 className="text-base  sm:text-left font-semibold text-slate-900 dark:text-slate-50 mb-6">
        Spending Breakdown
      </h2>
      {categoryData.length === 0 ? (
        <div className="h-62.5 flex flex-col items-center justify-center gap-2">
          <TbChartDonut size={40} />
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No data yet
          </p>
          <p className="text-xs text-center text-slate-400">
            Add transactions to see your chart
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`₱${Number(value).toLocaleString()}`, ""]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                fontSize: "12px",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "16px" }} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
