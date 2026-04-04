"use client";

import { useState } from "react";
import { TbDots, TbPencil, TbTrash } from "react-icons/tb";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ActionMenu({ onEdit, onDelete }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors cursor-pointer"
      >
        <TbDots size={16} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-50 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden w-32">
            <button
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
            >
              <TbPencil size={15} />
              Edit
            </button>
            <button
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 cursor-pointer"
            >
              <TbTrash size={15} />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
