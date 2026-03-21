"use client";

import { useState, useEffect } from "react";
import { Account } from "@/lib/types";
import { TbX, TbPencil } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Account, "id">) => void;
  editData?: Account | null;
}

export default function AddAccountModal({
  onClose,
  onSubmit,
  editData,
}: Props) {
  const [form, setForm] = useState({
    name: "",
    type: "bank" as Account["type"],
    balance: "",
  });

  useEffect(() => {
    if (!editData) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      name: editData.name,
      type: editData.type,
      balance: String(editData.balance),
    });
  }, [editData]);

  const handleSubmit = () => {
    if (!form.name || !form.balance) return;
    onSubmit({
      name: form.name,
      type: form.type,
      balance: Number(form.balance),
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
                {editData ? "Edit Account" : "Add Account"}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {editData
                ? "Update the details of your account."
                : "Add a new bank, e-wallet, or cash account."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
          >
            <TbX size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Account name (e.g. BPI Savings)"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={form.type}
            onChange={(e) =>
              setForm({ ...form, type: e.target.value as Account["type"] })
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="bank">Bank Account</option>
            <option value="ewallet">E-Wallet</option>
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
          </select>
          <div>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Current Balance (₱)"
              value={
                form.balance
                  ? Number(form.balance.replace(/,/g, "")).toLocaleString()
                  : ""
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/,/g, "");
                if (!isNaN(Number(raw))) setForm({ ...form, balance: raw });
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            {editData ? "Save Changes" : "Add Account"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2.5 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
