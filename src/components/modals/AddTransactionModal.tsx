"use client";

import { useState, useEffect } from "react";
import { TransactionType, Category, Transaction } from "@/lib/types";
import {
  TbX,
  TbNotes,
  TbPencil,
  TbTrendingUp,
  TbTrendingDown,
} from "react-icons/tb";
import { MdAdd } from "react-icons/md";

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
  const [displayAmount, setDisplayAmount] = useState("");

  useEffect(() => {
    if (editData) {
      const isCustom =
        !expenseCategories.includes(editData.category) &&
        !incomeCategories.includes(editData.category);
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
      setDisplayAmount(Number(editData.amount).toLocaleString("en-PH"));
    }
  }, [editData]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    const parts = raw.split(".");
    const sanitized =
      parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : raw;

    setForm({ ...form, amount: sanitized });

    if (sanitized === "" || sanitized === ".") {
      setDisplayAmount(sanitized);
      return;
    }
    const [intPart, decPart] = sanitized.split(".");
    const formatted =
      Number(intPart).toLocaleString("en-PH") +
      (decPart !== undefined ? "." + decPart : "");
    setDisplayAmount(formatted);
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount) return;
    if (form.category === "Other" && !customCategory) return;

    onSubmit({
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category:
        form.category === "Other" ? customCategory : form.category,
      date: form.date,
      note: form.note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {editData ? (
                  <TbPencil
                    size={15}
                    className="text-slate-500 dark:text-slate-400"
                  />
                ) : (
                  <MdAdd
                    size={17}
                    className="text-slate-500 dark:text-slate-400"
                  />
                )}
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {editData ? "Edit Transaction" : "Add Transaction"}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {editData
                ? "Update the details of your transaction."
                : "Record a new income or expense."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
          >
            <TbX size={18} />
          </button>
        </div>

        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-4">
          <button
            onClick={() =>
              setForm({ ...form, type: "expense", category: "Food" })
            }
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer
              ${
                form.type === "expense"
                  ? "bg-white dark:bg-slate-700 text-red-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
          >
            <TbTrendingDown size={15} />
            Expense
          </button>
          <button
            onClick={() =>
              setForm({ ...form, type: "income", category: "Salary" })
            }
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer
              ${
                form.type === "income"
                  ? "bg-white dark:bg-slate-700 text-emerald-500 shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
          >
            <TbTrendingUp size={15} />
            Income
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative">
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="peer w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 pb-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 outline-none focus:border-blue-300 transition-colors placeholder-transparent"
            />
            <label
              htmlFor="title"
              className="absolute left-3 px-1 text-slate-400 bg-white dark:bg-slate-900 transition-all duration-200
      top-2.5 text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
      peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Title
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="amount"
              inputMode="decimal"
              placeholder="Amount (₱)"
              value={displayAmount}
              onChange={handleAmountChange}
              className="peer w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3  pb-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 outline-none focus:border-blue-300 transition-colors placeholder-transparent"
            />
            <label
              htmlFor="amount"
              className="absolute left-3 px-1 text-slate-400 bg-white dark:bg-slate-900 transition-all duration-200
      top-2.5 text-sm
      peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-500
      peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Amount
            </label>
          </div>
          {form.category === "Other" ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Type your category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-300"
              />
              <button
                onClick={() => {
                  setForm({ ...form, category: "Food" });
                  setCustomCategory("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none  focus:border-blue-300 cursor-pointer"
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
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none  focus:border-blue-300 cursor-pointer"
          />
          <div className="relative">
            <TbNotes
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <textarea
              placeholder="Note (optional)"
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              rows={2}
              className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50  placeholder:text-slate-400 focus:outline-none  focus:border-blue-300 transition-colors resize-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2.5 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
