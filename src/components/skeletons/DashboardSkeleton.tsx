"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function DashboardSkeleton() {
  return (
    <div>
      {/* Header */}
      <Skeleton height={28} width={260} />
      <div className="mt-1 mb-6">
        <Skeleton height={14} width={210} />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <Skeleton height={14} width={110} />
              <Skeleton width={36} height={36} borderRadius={10} />
            </div>
            <Skeleton height={32} width={150} />
            <div className="mt-1">
              <Skeleton height={12} width={90} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="flex flex-col md:flex-row gap-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="w-full md:w-1/2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6"
          >
            <div className="mb-6">
              <Skeleton height={16} width={160} />
            </div>
            <Skeleton height={250} />
          </div>
        ))}
      </div>

      {/* Recent transactions */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mt-4">
        <div className="flex items-center justify-between mb-6">
          <Skeleton height={16} width={160} />
          <Skeleton height={12} width={50} />
        </div>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton circle width={36} height={36} />
                <div>
                  <Skeleton height={14} width={120} />
                  <div className="mt-1">
                    <Skeleton height={11} width={80} />
                  </div>
                </div>
              </div>
              <Skeleton height={14} width={70} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
