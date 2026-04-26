"use client";

import React, { useState } from "react";
import { Account } from "@/lib/types";
import { useAccounts } from "@/hooks/useAccounts";
import AddAccountModal from "@/components/modals/AddAccountModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import ActionMenu from "@/components/ui/ActionMenu";
import { TbBuildingBank, TbCreditCard, TbCash, TbPlus } from "react-icons/tb";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { VscEmptyWindow } from "react-icons/vsc";

const typeIcon: Record<string, React.ReactElement> = {
  cash: <TbCash size={22} />,
  bank: <TbBuildingBank size={22} />,
  ewallet: <RiMoneyDollarCircleLine size={22} />,
  credit: <TbCreditCard size={22} />,
};

const typeColor: Record<string, string> = {
  cash: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
  bank: "bg-blue-50 dark:bg-blue-500/10 text-blue-500",
  ewallet: "bg-sky-50 dark:bg-sky-500/10 text-sky-500",
  credit: "bg-purple-50 dark:bg-purple-500/10 text-purple-500",
};

const typeLabel: Record<string, string> = {
  cash: "Cash",
  bank: "Bank Account",
  ewallet: "E-Wallet",
  credit: "Credit Card",
};

export default function AccountPage() {
  const { accounts, addAccount, deleteAccount, editAccount } = useAccounts();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Account | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Accounts
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Overview of your accounts
          </p>
        </div>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <TbPlus size={18} />
          Add Account
        </button>
      </div>

      {/* Total Balance Card */}
      <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl p-6 mb-6 text-white">
        <p className="text-sm font-medium opacity-80 mb-1">Total Balance</p>
        <p className="text-4xl font-bold">₱{totalBalance.toLocaleString()}</p>
        <p className="text-sm opacity-70 mt-2">
          {accounts.length} accounts connected
        </p>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {accounts.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 gap-2">
            <VscEmptyWindow
              size={32}
              className="text-slate-300 dark:text-slate-600"
            />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No accounts yet
            </p>
            <p className="text-xs text-slate-400">
              Click Add Account to get started
            </p>
          </div>
        ) : (
          accounts.map((account) => (
            <div
              key={account.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-11 h-11 rounded-xl shrink-0 flex items-center justify-center ${typeColor[account.type]}`}
                >
                  {typeIcon[account.type]}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">
                    {account.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {typeLabel[account.type]}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <p
                  className={`text-base font-bold ${account.balance < 0 ? "text-red-400" : "text-slate-900 dark:text-slate-50"}`}
                >
                  {account.balance < 0 ? "-" : ""}₱
                  {Math.abs(account.balance).toLocaleString()}
                </p>
                <ActionMenu
                  onEdit={() => {
                    setEditTarget(account);
                    setShowModal(true);
                  }}
                  onDelete={() => setDeleteTarget({ id: account.id, name: account.name })}
                />
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <AddAccountModal
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          onSubmit={(data) => {
            if (editTarget) {
              editAccount(editTarget.id, data);
            } else {
              addAccount(data);
            }
            setShowModal(false);
            setEditTarget(null);
          }}
          editData={editTarget}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Account"
          description={`"${deleteTarget.name}" and all its data will be permanently removed.`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteAccount(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
