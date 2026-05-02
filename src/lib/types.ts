export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Transport"
  | "Shopping"
  | "Bills"
  | "Health"
  | "Entertainment"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Other"
  | string;

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string;
  note?: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface Account {
  id: string;
  name: string;
  type: "bank" | "ewallet" | "cash" | "credit";
  balance: number;
}

export interface Goal {
  id: string;
  title: string;
  category: "travel" | "emergency" | "gadget" | "education" | "other" | string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
}

export interface LogoutConfirm {
  onClose: () => void;
  onConfirm: () => void;
}

export interface DeleteConfirm {
  title: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export const isAccountType = (v: string): v is Account["type"] =>
  v === "bank" || v === "ewallet" || v === "cash" || v === "credit";
