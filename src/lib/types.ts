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
  | "Other";

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
