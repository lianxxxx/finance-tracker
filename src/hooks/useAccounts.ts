"use client";

import { useState, useEffect } from "react";
import { Account } from "@/lib/types";
import { supabase } from "@/lib/supabase";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

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
  };

  const addAccount = async (a: Omit<Account, "id">) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("accounts").insert({
      ...a,
      user_id: user?.id,
    });
    if (!error) fetchAccounts();
  };

  const deleteAccount = async (id: string) => {
    const { error } = await supabase.from("accounts").delete().eq("id", id);
    if (!error) fetchAccounts();
  };

  const editAccount = async (id: string, updated: Omit<Account, "id">) => {
    const { error } = await supabase
      .from("accounts")
      .update(updated)
      .eq("id", id);
    if (!error) fetchAccounts();
  };

  return { accounts, addAccount, deleteAccount, editAccount };
}
