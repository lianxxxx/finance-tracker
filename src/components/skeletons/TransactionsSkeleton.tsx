"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function TransactionsSkeleton() {
  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton height={28} width={160} />
          <div className="mt-1">
            <Skeleton height={14} width={190} />
          </div>
        </div>
        <Skeleton height={40} width={148} borderRadius={12} />
      </div>

      {/* Table card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
        {/* Column header row — desktop */}
        <div className="hidden sm:flex items-center gap-4 px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <Skeleton height={12} width={16} />
          <div className="flex-1">
            <Skeleton height={12} width={40} />
          </div>
          <div className="w-32">
            <Skeleton height={12} width={60} />
          </div>
          <div className="w-32">
            <Skeleton height={12} width={36} />
          </div>
          <div className="w-28">
            <Skeleton height={12} width={52} />
          </div>
          <div className="w-12">
            <Skeleton height={12} width={48} />
          </div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 sm:px-6 py-4 gap-4"
            >
              {/* Row number — desktop */}
              <div className="hidden sm:block w-6 shrink-0">
                <Skeleton height={12} width={16} />
              </div>

              {/* Icon + name */}
              <div className="flex items-center gap-3 flex-1">
                <Skeleton circle width={32} height={32} />
                <div className="flex-1">
                  <Skeleton height={14} width={130} />
                  <div className="mt-1 sm:hidden">
                    <Skeleton height={11} width={100} />
                  </div>
                </div>
              </div>

              {/* Category — desktop */}
              <div className="hidden sm:block w-32">
                <Skeleton height={14} width={70} />
              </div>

              {/* Date — desktop */}
              <div className="hidden sm:block w-32">
                <Skeleton height={14} width={90} />
              </div>

              {/* Amount */}
              <div className="w-24 shrink-0">
                <Skeleton height={14} width={72} />
              </div>

              {/* Actions */}
              <div className="w-6 shrink-0">
                <Skeleton height={24} width={24} borderRadius={8} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
