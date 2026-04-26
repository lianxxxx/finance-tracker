"use client";

import { useState } from "react";
import { useGoals } from "@/hooks/useGoals";
import { Goal } from "@/lib/types";
import AddGoalModal from "@/components/modals/AddGoalModal";
import ConfirmDeleteModal from "@/components/modals/ConfirmDeleteModal";
import ActionMenu from "@/components/ui/ActionMenu";
import React from "react";
import {
  TbPlaneTilt,
  TbShieldCheck,
  TbDeviceLaptop,
  TbBook,
  TbTargetArrow,
} from "react-icons/tb";
import { VscEmptyWindow } from "react-icons/vsc";

const categoryIcon: Record<string, React.ReactElement> = {
  travel: <TbPlaneTilt size={20} />,
  emergency: <TbShieldCheck size={20} />,
  gadget: <TbDeviceLaptop size={20} />,
  education: <TbBook size={20} />,
  other: <TbTargetArrow size={20} />,
};

const categoryColor: Record<string, string> = {
  travel: "bg-blue-50 dark:bg-blue-500/10 text-blue-500",
  emergency: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500",
  gadget: "bg-purple-50 dark:bg-purple-500/10 text-purple-500",
  education: "bg-amber-50 dark:bg-amber-500/10 text-amber-500",
  other: "bg-slate-50 dark:bg-slate-500/10 text-slate-500",
};

const progressColor: Record<string, string> = {
  travel: "bg-blue-500",
  emergency: "bg-emerald-500",
  gadget: "bg-purple-500",
  education: "bg-amber-500",
  other: "bg-slate-500",
};

export default function GoalsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<Goal | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);
  const { goals, addGoal, deleteGoal, editGoal } = useGoals();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            Goals
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track your financial goals
          </p>
        </div>
        <button
          onClick={() => {
            setEditTarget(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          + Add Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10 gap-2">
            <VscEmptyWindow
              size={32}
              className="text-slate-300 dark:text-slate-600"
            />
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              No goals yet
            </p>
            <p className="text-xs text-slate-400">
              Click Add Goal to get started
            </p>
          </div>
        ) : (
          goals.map((goal) => {
            const progress = Math.min(
              (goal.currentAmount / goal.targetAmount) * 100,
              100,
            );
            const isComplete = progress >= 100;
            const daysLeft = Math.ceil(
              (new Date(goal.deadline).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24),
            );

            return (
              <div
                key={goal.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center ${categoryColor[goal.category]}`}
                    >
                      {categoryIcon[goal.category]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-50 truncate">
                        {goal.title}
                      </p>
                      <p className="text-xs text-slate-400 capitalize">
                        {goal.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    {isComplete ? (
                      <span className="text-xs font-medium bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 px-2.5 py-1 rounded-full">
                        Completed! 🎉
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400 whitespace-nowrap">
                        {daysLeft > 0 ? `${daysLeft} days left` : "Overdue"}
                      </span>
                    )}
                    <ActionMenu
                      onEdit={() => {
                        setEditTarget(goal);
                        setShowModal(true);
                      }}
                      onDelete={() => setDeleteTarget({ id: goal.id, name: goal.title })}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex justify-between mb-1.5">
                    <p className="text-xs text-slate-400">Progress</p>
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-50">
                      {Math.round(progress)}%
                    </p>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${progressColor[goal.category]}`}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    ₱{goal.currentAmount.toLocaleString()} saved
                  </p>
                  <p className="text-xs text-slate-400">
                    Target: ₱{goal.targetAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showModal && (
        <AddGoalModal
          onClose={() => {
            setShowModal(false);
            setEditTarget(null);
          }}
          onSubmit={(data) => {
            if (editTarget) {
              editGoal(editTarget.id, data);
            } else {
              addGoal(data);
            }
            setShowModal(false);
            setEditTarget(null);
          }}
          editData={editTarget}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          title="Delete Goal"
          description={`"${deleteTarget.name}" will be permanently removed.`}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            deleteGoal(deleteTarget.id);
            setDeleteTarget(null);
          }}
        />
      )}
    </div>
  );
}
