"use client";

import { TbAlertTriangle, TbRefresh } from "react-icons/tb";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
  title?: string;
}

export default function ErrorFallback({ error, reset, title }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500 mb-4">
        <TbAlertTriangle size={28} />
      </div>
      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
        {title ?? "Something went wrong"}
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
        {error.message ||
          "An unexpected error occurred. You can try again, or come back later."}
      </p>
      <button
        onClick={reset}
        className="mt-5 inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
      >
        <TbRefresh size={16} />
        Try again
      </button>
    </div>
  );
}
