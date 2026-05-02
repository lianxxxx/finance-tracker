"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/context/ToastContext";

export interface UseGoalsResult {
  goals: Goal[];
  loading: boolean;
  addGoal: (g: Omit<Goal, "id">) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
  editGoal: (id: string, updated: Omit<Goal, "id">) => Promise<void>;
}

export function useGoals(): UseGoalsResult {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const { data, error } = await supabase
      .from("goals")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setGoals(
        data.map((g) => ({
          id: g.id,
          title: g.title,
          category: g.category,
          targetAmount: g.target_amount,
          currentAmount: g.current_amount,
          deadline: g.deadline,
        })),
      );
    }
    setLoading(false);
  };

  const addGoal = async (g: Omit<Goal, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("goals").insert({
      title: g.title,
      category: g.category,
      target_amount: g.targetAmount,
      current_amount: g.currentAmount,
      deadline: g.deadline,
      user_id: user?.id,
    });
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Goal added.");
      fetchGoals();
    }
  };

  const deleteGoal = async (id: string) => {
    const { error } = await supabase.from("goals").delete().eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Goal deleted.");
      fetchGoals();
    }
  };

  const editGoal = async (id: string, updated: Omit<Goal, "id">) => {
    const { error } = await supabase
      .from("goals")
      .update({
        title: updated.title,
        category: updated.category,
        target_amount: updated.targetAmount,
        current_amount: updated.currentAmount,
        deadline: updated.deadline,
      })
      .eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Goal updated.");
      fetchGoals();
    }
  };

  return { goals, loading, addGoal, deleteGoal, editGoal };
}
