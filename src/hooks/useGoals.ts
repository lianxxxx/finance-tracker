"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types";
import { mockGoals } from "@/lib/mockData";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("goals");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGoals(JSON.parse(stored));
    } else {
      setGoals(mockGoals);
      localStorage.setItem("goals", JSON.stringify(mockGoals));
    }
  }, []);

  const save = (updated: Goal[]) => {
    setGoals(updated);
    localStorage.setItem("goals", JSON.stringify(updated));
  };

  const addGoal = (g: Omit<Goal, "id">) => {
    const newGoal: Goal = { ...g, id: crypto.randomUUID() };
    save([...goals, newGoal]);
  };

  const deleteGoal = (id: string) => {
    save(goals.filter((g) => g.id !== id));
  };

  const editGoal = (id: string, updated: Omit<Goal, "id">) => {
    save(goals.map((g) => (g.id === id ? { ...updated, id } : g)));
  };

  return { goals, addGoal, deleteGoal, editGoal };
}
