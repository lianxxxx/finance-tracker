"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .order("date", { ascending: false });

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
    }
  };

  const addTransaction = async (t: Omit<Transaction, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("transactions").insert({
      ...t,
      user_id: user?.id,
    });
    if (!error) fetchTransactions();
  };

  const deleteTransaction = async (id: string) => {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (!error) fetchTransactions();
  };

  const editTransaction = async (
    id: string,
    updated: Omit<Transaction, "id">,
  ) => {
    const { error } = await supabase
      .from("transactions")
      .update(updated)
      .eq("id", id);
    if (!error) fetchTransactions();
  };

  return { transactions, addTransaction, deleteTransaction, editTransaction };
}
