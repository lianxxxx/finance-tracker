"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types";
import { TbX } from "react-icons/tb";

const categories = ["travel", "emergency", "gadget", "education", "other"];

interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Goal, "id">) => void;
  editData?: Goal | null;
}

export default function AddGoalModal({ onClose, onSubmit, editData }: Props) {
  const [form, setForm] = useState({
    title: "",
    category: "travel" as Goal["category"], // ← dito palitan
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });
  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    if (editData) {
      const isCustom = ![
        "travel",
        "emergency",
        "gadget",
        "education",
        "other",
      ].includes(editData.category);
      setForm({
        title: editData.title,
        category: isCustom ? "other" : (editData.category as Goal["category"]),
        targetAmount: String(editData.targetAmount),
        currentAmount: String(editData.currentAmount),
        deadline: editData.deadline,
      });
      if (isCustom) setCustomCategory(editData.category);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (!form.title || !form.targetAmount) return;
    if (form.category === "other" && !customCategory) return;
    onSubmit({
      title: form.title,
      category: (form.category === "other"
        ? customCategory
        : form.category) as Goal["category"],
      targetAmount: Number(form.targetAmount),
      currentAmount: Number(form.currentAmount),
      deadline: form.deadline,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            {editData ? "Edit Goal" : "Add Goal"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <TbX size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Goal title (e.g. Japan Trip)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {form.category === "other" ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Type your category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  setForm({ ...form, category: "travel" });
                  setCustomCategory("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as Goal["category"],
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          )}

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

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          {editData ? "Save Changes" : "Add Goal"}
        </button>
      </div>
    </div>
  );
}
