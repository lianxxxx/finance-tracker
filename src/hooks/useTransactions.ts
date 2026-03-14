"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/lib/types";
import { mockTransactions } from "@/lib/mockData";

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTransactions(JSON.parse(stored));
    } else {
      setTransactions(mockTransactions);
      localStorage.setItem("transactions", JSON.stringify(mockTransactions));
    }
  }, []);

  // Save to localStorage whenever transactions change
  const save = (updated: Transaction[]) => {
    setTransactions(updated);
    localStorage.setItem("transactions", JSON.stringify(updated));
  };

  // Add
  const addTransaction = (t: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...t,
      id: crypto.randomUUID(),
    };
    save([newTransaction, ...transactions]);
  };

  // Delete
  const deleteTransaction = (id: string) => {
    save(transactions.filter((t) => t.id !== id));
  };

  // Edit
  const editTransaction = (id: string, updated: Omit<Transaction, "id">) => {
    save(transactions.map((t) => (t.id === id ? { ...updated, id } : t)));
  };

  return { transactions, addTransaction, deleteTransaction, editTransaction };
}
