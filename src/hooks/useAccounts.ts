"use client";

import { useState, useEffect } from "react";
import { Account } from "@/lib/types";
import { mockAccounts } from "@/lib/mockData";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("accounts");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAccounts(JSON.parse(stored));
    } else {
      setAccounts(mockAccounts);
      localStorage.setItem("accounts", JSON.stringify(mockAccounts));
    }
  }, []);

  const save = (updated: Account[]) => {
    setAccounts(updated);
    localStorage.setItem("accounts", JSON.stringify(updated));
  };

  const addAccount = (a: Omit<Account, "id">) => {
    const newAccount: Account = { ...a, id: crypto.randomUUID() };
    save([...accounts, newAccount]);
  };

  const deleteAccount = (id: string) => {
    save(accounts.filter((a) => a.id !== id));
  };

  const editAccount = (id: string, updated: Omit<Account, "id">) => {
    save(accounts.map((a) => (a.id === id ? { ...updated, id } : a)));
  };

  return { accounts, addAccount, deleteAccount, editAccount };
}
