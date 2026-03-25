"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function InsightsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Score + summary skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          {/* Circle skeleton */}
          <Skeleton circle width={130} height={130} />

          <div className="flex-1 w-full space-y-2">
            <Skeleton height={12} width={120} />
            <Skeleton height={16} />
            <Skeleton height={16} width="90%" />
            <Skeleton height={16} width="70%" />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3"
          >
            <Skeleton height={16} width={150} />
            <Skeleton height={14} />
            <Skeleton height={14} width="80%" />

            {/* Tip style */}
            {i >= 3 &&
              [1, 2, 3].map((j) => (
                <div key={j} className="flex gap-2">
                  <Skeleton circle width={20} height={20} />
                  <Skeleton height={14} width="90%" />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
