"use client";

import { useState, useEffect } from "react";
import { TransactionType, Category, Transaction } from "@/lib/types";
import { TbX } from "react-icons/tb";

const expenseCategories: Category[] = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Health",
  "Entertainment",
  "Other",
];

const incomeCategories: Category[] = [
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Transaction, "id">) => void;
  editData?: Transaction | null;
}

export default function AddTransactionModal({
  onClose,
  onSubmit,
  editData,
}: Props) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense" as TransactionType,
    category: "Food" as Category,
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [customCategory, setCustomCategory] = useState("");

  useEffect(() => {
    if (editData) {
      const isCustom =
        !expenseCategories.includes(editData.category as Category) &&
        !incomeCategories.includes(editData.category as Category);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: editData.title,
        amount: String(editData.amount),
        type: editData.type,
        category: isCustom ? "Other" : editData.category,
        date: editData.date,
        note: editData.note || "",
      });
      if (isCustom) setCustomCategory(editData.category);
    }
  }, [editData]);

  const handleSubmit = () => {
    if (!form.title || !form.amount) return;
    if (form.category === "Other" && !customCategory) return;

    onSubmit({
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category:
        form.category === "Other"
          ? (customCategory as Category)
          : form.category,
      date: form.date,
      note: form.note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
            {editData ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <TbX size={18} />
          </button>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-4">
          <button
            onClick={() =>
              setForm({ ...form, type: "expense", category: "Food" })
            }
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors
              ${form.type === "expense" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm" : "text-slate-500"}`}
          >
            Expense
          </button>
          <button
            onClick={() =>
              setForm({ ...form, type: "income", category: "Salary" })
            }
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors
              ${form.type === "income" ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-50 shadow-sm" : "text-slate-500"}`}
          >
            Income
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Amount (₱)"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {form.category === "Other" ? (
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
                  setForm({ ...form, category: "Food" });
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
                setForm({ ...form, category: e.target.value as Category })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {(form.type === "income"
                ? incomeCategories
                : expenseCategories
              ).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          )}
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Note (optional)"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            rows={2}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          {editData ? "Save Changes" : "Add Transaction"}
        </button>
      </div>
    </div>
  );
}
