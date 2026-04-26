"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800">
        <Skeleton height={11} width={70} />
      </div>
      {children}
    </div>
  );
}

export default function SettingsSkeleton() {
  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <Skeleton height={28} width={120} />
        <div className="mt-1">
          <Skeleton height={14} width={210} />
        </div>
      </div>

      <div className="flex flex-col gap-4 max-w-lg">
        {/* Profile */}
        <SettingsCard>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <Skeleton width={36} height={36} borderRadius={12} />
              <div>
                <Skeleton height={14} width={110} />
                <div className="mt-1">
                  <Skeleton height={12} width={160} />
                </div>
              </div>
            </div>
            <Skeleton width={18} height={18} />
          </div>
        </SettingsCard>

        {/* Appearance */}
        <SettingsCard>
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <Skeleton width={36} height={36} borderRadius={12} />
              <Skeleton height={14} width={90} />
            </div>
            <Skeleton height={36} width={68} borderRadius={99} />
          </div>
        </SettingsCard>

        {/* Currency */}
        <SettingsCard>
          <div className="flex items-center px-5 py-4 gap-3">
            <Skeleton width={36} height={36} borderRadius={12} />
            <div>
              <Skeleton height={14} width={70} />
              <div className="mt-1">
                <Skeleton height={12} width={140} />
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* About */}
        <SettingsCard>
          <div className="flex items-center px-5 py-4 gap-3">
            <Skeleton width={36} height={36} borderRadius={12} />
            <div>
              <Skeleton height={14} width={110} />
              <div className="mt-1">
                <Skeleton height={12} width={80} />
              </div>
            </div>
          </div>
        </SettingsCard>

        {/* Account / logout */}
        <SettingsCard>
          <div className="flex items-center px-5 py-4 gap-3">
            <Skeleton width={36} height={36} borderRadius={12} />
            <Skeleton height={14} width={60} />
          </div>
        </SettingsCard>
      </div>
    </div>
  );
}
