"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function GoalsSkeleton() {
  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Skeleton height={28} width={100} />
          <div className="mt-1">
            <Skeleton height={14} width={190} />
          </div>
        </div>
        <Skeleton height={40} width={108} borderRadius={12} />
      </div>

      {/* Goal cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
          >
            {/* Card header: icon + title + badge + menu */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <Skeleton width={40} height={40} borderRadius={12} />
                <div>
                  <Skeleton height={14} width={130} />
                  <div className="mt-1">
                    <Skeleton height={12} width={60} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <Skeleton height={24} width={72} borderRadius={20} />
                <Skeleton width={28} height={28} borderRadius={8} />
              </div>
            </div>

            {/* Progress section */}
            <div className="mb-3">
              <div className="flex justify-between mb-1.5">
                <Skeleton height={12} width={50} />
                <Skeleton height={12} width={32} />
              </div>
              <Skeleton height={8} borderRadius={99} />
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <Skeleton height={12} width={100} />
              <Skeleton height={12} width={90} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
