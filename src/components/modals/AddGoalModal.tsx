"use client";

import { useState } from "react";
import { Goal } from "@/lib/mockData";
import { TbX } from "react-icons/tb";

const categories = ["travel", "emergency", "gadget", "education", "other"];

interface Props {
  onClose: () => void;
}

export default function AddGoalModal({ onClose }: Props) {
  const [form, setForm] = useState({
    title: "",
    category: "other" as Goal["category"],
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });

  const handleSubmit = () => {
    if (!form.title || !form.targetAmount) return;
    console.log("New goal:", form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            Add Goal
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <TbX size={18} />
          </button>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Goal title (e.g. Japan Trip)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Goal["category"] })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            {categories.map((c) => (
              <option key={c} value={c} className="capitalize">
                {c}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Target Amount (₱)"
            value={form.targetAmount}
            onChange={(e) => setForm({ ...form, targetAmount: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Current Amount (₱)"
            value={form.currentAmount}
            onChange={(e) =>
              setForm({ ...form, currentAmount: e.target.value })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          Add Goal
        </button>
      </div>
    </div>
  );
}
