"use client";

import { TbLogout, TbX } from "react-icons/tb";

interface Props {
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmLogoutModal({ onClose, onConfirm }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
              <TbLogout size={15} className="text-red-400" />
            </div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
              Log out?
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
          >
            <TbX size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          You&apos;ll be signed out and returned to the login page.
        </p>

        <div className="flex gap-2">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            Log out
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2.5 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
