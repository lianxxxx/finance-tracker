"use client";

import { useEffect, useState } from "react";
import { TbCircleCheck, TbAlertCircle, TbX } from "react-icons/tb";
import { Toast } from "@/lib/types";

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    const exitTimer = setTimeout(() => setVisible(false), 2700);
    const removeTimer = setTimeout(onDismiss, 3000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onDismiss]);

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl px-4 py-3 w-72 transition-all duration-300 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
      }`}
    >
      <div
        className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center ${
          isSuccess
            ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500"
            : "bg-red-50 dark:bg-red-500/10 text-red-500"
        }`}
      >
        {isSuccess ? (
          <TbCircleCheck size={16} />
        ) : (
          <TbAlertCircle size={16} />
        )}
      </div>
      <p className="flex-1 text-sm font-medium text-slate-700 dark:text-slate-200 leading-snug">
        {toast.message}
      </p>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onDismiss, 300);
        }}
        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer shrink-0"
      >
        <TbX size={14} />
      </button>
    </div>
  );
}

export default function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 md:top-6 md:right-6 z-[60] flex flex-col gap-2 items-end pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onDismiss={() => onDismiss(toast.id)} />
        </div>
      ))}
    </div>
  );
}
