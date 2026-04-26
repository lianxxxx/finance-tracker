"use client";

import { useState, useEffect } from "react";
import { Account } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/context/ToastContext";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    const { data, error } = await supabase
      .from("accounts")
      .select("*")
      .order("created_at", { ascending: true });

    if (!error && data) {
      setAccounts(
        data.map((a) => ({
          id: a.id,
          name: a.name,
          type: a.type,
          balance: a.balance,
        })),
      );
    }
    setLoading(false);
  };

  const addAccount = async (a: Omit<Account, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("accounts").insert({
      ...a,
      user_id: user?.id,
    });
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Account added.");
      fetchAccounts();
    }
  };

  const deleteAccount = async (id: string) => {
    const { error } = await supabase.from("accounts").delete().eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Account deleted.");
      fetchAccounts();
    }
  };

  const editAccount = async (id: string, updated: Omit<Account, "id">) => {
    const { error } = await supabase
      .from("accounts")
      .update(updated)
      .eq("id", id);
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Account updated.");
      fetchAccounts();
    }
  };

  return { accounts, loading, addAccount, deleteAccount, editAccount };
}
