"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types";
import { TbX, TbPencil } from "react-icons/tb";
import { MdAdd } from "react-icons/md";

const categories = ["travel", "emergency", "gadget", "education", "other"];

interface Props {
  onClose: () => void;
  onSubmit: (data: Omit<Goal, "id">) => void;
  editData?: Goal | null;
}

export default function AddGoalModal({ onClose, onSubmit, editData }: Props) {
  const [form, setForm] = useState({
    title: "",
    category: "travel" as Goal["category"],
    targetAmount: "",
    currentAmount: "",
    deadline: "",
  });
  const [customCategory, setCustomCategory] = useState("");
  const [displayTarget, setDisplayTarget] = useState("");
  const [displayCurrent, setDisplayCurrent] = useState("");

  useEffect(() => {
    if (!editData) return;
    const isCustom = ![
      "travel",
      "emergency",
      "gadget",
      "education",
      "other",
    ].includes(editData.category);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      title: editData.title,
      category: isCustom ? "other" : (editData.category as Goal["category"]),
      targetAmount: String(editData.targetAmount),
      currentAmount: String(editData.currentAmount),
      deadline: editData.deadline,
    });
    if (isCustom) setCustomCategory(editData.category);
    setDisplayTarget(Number(editData.targetAmount).toLocaleString("en-PH"));
    setDisplayCurrent(Number(editData.currentAmount).toLocaleString("en-PH"));
  }, [editData]);

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "targetAmount" | "currentAmount",
    setDisplay: (v: string) => void,
  ) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setForm((prev) => ({ ...prev, [field]: raw }));
    if (!raw) {
      setDisplay("");
      return;
    }
    const [intPart, decPart] = raw.split(".");
    const formatted =
      Number(intPart).toLocaleString("en-PH") +
      (decPart !== undefined ? "." + decPart : "");
    setDisplay(formatted);
  };

  const handleSubmit = () => {
    if (!form.title || !form.targetAmount) return;
    if (form.category === "other" && !customCategory) return;
    if (Number(form.currentAmount) > Number(form.targetAmount)) return;
    onSubmit({
      title: form.title,
      category: (form.category === "other"
        ? customCategory
        : form.category) as Goal["category"],
      targetAmount: Number(form.targetAmount),
      currentAmount: Number(form.currentAmount),
      deadline: form.deadline,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                {editData ? (
                  <TbPencil
                    size={15}
                    className="text-slate-500 dark:text-slate-400"
                  />
                ) : (
                  <MdAdd
                    size={17}
                    className="text-slate-500 dark:text-slate-400"
                  />
                )}
              </div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                {editData ? "Edit Goal" : "Add Goal"}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {editData
                ? "Update the details of your goal."
                : "Set a new financial goal to track."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
          >
            <TbX size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Goal title (e.g. Japan Trip)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {form.category === "other" ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Type your category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={() => {
                  setForm({ ...form, category: "travel" });
                  setCustomCategory("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>
          ) : (
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as Goal["category"],
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c}
                </option>
              ))}
            </select>
          )}

          <input
            type="text"
            inputMode="decimal"
            placeholder="Target Amount (₱)"
            value={displayTarget}
            onChange={(e) =>
              handleAmountChange(e, "targetAmount", setDisplayTarget)
            }
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div>
            <input
              type="text"
              inputMode="decimal"
              placeholder="Current Amount (₱)"
              value={displayCurrent}
              onChange={(e) =>
                handleAmountChange(e, "currentAmount", setDisplayCurrent)
              }
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {Number(form.currentAmount) > Number(form.targetAmount) &&
              form.currentAmount &&
              form.targetAmount && (
                <p className="text-xs text-red-400 mt-1 px-1">
                  Current amount cannot exceed target amount!
                </p>
              )}
          </div>

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            {editData ? "Save Changes" : "Add Goal"}
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm font-medium py-2.5 rounded-xl transition-colors border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
}
