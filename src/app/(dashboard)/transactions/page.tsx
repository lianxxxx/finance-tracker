"use client";

import { useState } from "react";
import { Transaction } from "@/lib/types";
import { useTransactions } from "@/hooks/useTransactions";
import AddTransactionModal from "@/components/modals/AddTransactionModal";
import ActionMenu from "@/components/ui/ActionMenu";
import React from "react";
import {
  TbShoppingCart,
  TbCash,
  TbDeviceTv,
  TbBolt,
  TbCar,
  TbTag,
  TbPlus,
} from "react-icons/tb";

const categoryIcon: Record<string, React.ReactElement> = {
  Food: <TbShoppingCart size={16} />,
  Salary: <TbCash size={16} />,
  Freelance: <TbCash size={16} />,
  Investment: <TbCash size={16} />,
  Entertainment: <TbDeviceTv size={16} />,
  Bills: <TbBolt size={16} />,
  Transport: <TbCar size={16} />,
  Shopping: <TbTag size={16} />,
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
};

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Transaction | null>(null);
  const { transactions, addTransaction, deleteTransaction, editTransaction } =
    useTransactions();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Transactions
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your transactions
          </p>
        </div>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors"
        >
          <TbPlus size={18} />
          Add Transaction
        </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1fr_1fr_1fr_120px_60px] px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <p className="text-xs font-medium text-slate-400">Name</p>
          <p className="text-xs font-medium text-slate-400">Category</p>
          <p className="text-xs font-medium text-slate-400 hidden md:block">
            Date
          </p>
          <p className="text-xs font-medium text-slate-400 text-left">Amount</p>
          <p className="text-xs font-medium text-slate-400 text-right">
            Actions
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {transactions.map((t: Transaction) => (
            <div
              key={t.id}
              className="grid grid-cols-[1fr_1fr_auto_auto] md:grid-cols-[1fr_1fr_1fr_120px_60px] items-center px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              {/* Name */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${categoryColor[t.category] || "bg-slate-100 text-slate-500"}`}
                >
                  {categoryIcon[t.category] || <TbTag size={16} />}
                </div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50 truncate">
                  {t.title}
                </p>
              </div>

              {/* Category */}
              <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                {t.category}
              </p>

              {/* Date */}
              <p className="text-sm text-slate-500 dark:text-slate-400 hidden md:block">
                {new Date(t.date).toLocaleDateString("en-PH", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* Amount */}
              <p
                className={`text-sm font-semibold text-left ${t.type === "income" ? "text-emerald-500" : "text-red-400"}`}
              >
                {t.type === "income" ? "+" : "-"}₱{t.amount.toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex justify-end">
                <ActionMenu
                  onEdit={() => {
                    setEditTarget(t);
                    setShowModal(true);
                  }}
                  onDelete={() => deleteTransaction(t.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <AddTransactionModal
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          onSubmit={(data) => {
            if (editTarget) {
              editTransaction(editTarget.id, data);
            } else {
              addTransaction(data);
            }
            setShowModal(false);
            setEditTarget(null);
          }}
          editData={editTarget}
        />
      )}
    </div>
  );
}
