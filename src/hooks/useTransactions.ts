"use client";

import { useState, useEffect, useCallback } from "react";
import { Transaction } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/context/ToastContext";

const PAGE_SIZE = 10;

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const { showToast } = useToast();

  const fetchTransactions = useCallback(async (currentPage: number) => {
    const from = (currentPage - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error, count } = await supabase
      .from("transactions")
      .select("*", { count: "exact" })
      .order("date", { ascending: false })
      .range(from, to);

    if (!error && data) {
      setTransactions(
        data.map((t) => ({
          id: t.id,
          title: t.title,
          amount: t.amount,
          type: t.type,
          category: t.category,
          date: t.date,
          note: t.note,
        })),
      );
      setTotalCount(count ?? 0);
    }
  }, []);

  useEffect(() => {
    fetchTransactions(page);
  }, [page, fetchTransactions]);

  const addTransaction = async (t: Omit<Transaction, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("transactions").insert({
      ...t,
      user_id: user?.id,
    });
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Transaction added.");
      fetchTransactions(page);
    }
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Transaction deleted.");
      fetchTransactions(page);
    }
  };

  const editTransaction = async (
    id: string,
    updated: Omit<Transaction, "id">,
  ) => {
    const { error } = await supabase
      .from("transactions")
      .update(updated)
      .eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Transaction updated.");
      fetchTransactions(page);
    }
  };

  return {
    transactions,
    totalCount,
    page,
    setPage,
    addTransaction,
    deleteTransaction,
    editTransaction,
  };
}
