"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function AccountsSkeleton() {
  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton height={28} width={120} />
          <div className="mt-1">
            <Skeleton height={14} width={200} />
          </div>
        </div>
        <Skeleton height={40} width={128} borderRadius={12} />
      </div>

      {/* Total balance card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6">
        <Skeleton height={14} width={100} />
        <div className="mt-1">
          <Skeleton height={40} width={200} />
        </div>
        <div className="mt-2">
          <Skeleton height={12} width={140} />
        </div>
      </div>

      {/* Account cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-4 min-w-0">
              <Skeleton width={44} height={44} borderRadius={12} />
              <div>
                <Skeleton height={14} width={120} />
                <div className="mt-1">
                  <Skeleton height={12} width={80} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Skeleton height={20} width={80} />
              <Skeleton width={28} height={28} borderRadius={8} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
