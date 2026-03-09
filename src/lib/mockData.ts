import { Transaction, MonthlyData } from "./types";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 50000,
    type: "income",
    category: "Salary",
    date: "2026-03-01",
  },
  {
    id: "2",
    title: "Groceries",
    amount: 1500,
    type: "expense",
    category: "Food",
    date: "2026-03-02",
  },
  {
    id: "3",
    title: "Netflix",
    amount: 549,
    type: "expense",
    category: "Entertainment",
    date: "2026-03-03",
  },
  {
    id: "4",
    title: "Freelance Project",
    amount: 15000,
    type: "income",
    category: "Freelance",
    date: "2026-03-04",
  },
  {
    id: "5",
    title: "Electricity Bill",
    amount: 2300,
    type: "expense",
    category: "Bills",
    date: "2026-03-05",
  },
  {
    id: "6",
    title: "Grab",
    amount: 350,
    type: "expense",
    category: "Transport",
    date: "2026-03-06",
  },
  {
    id: "7",
    title: "Shopee",
    amount: 1200,
    type: "expense",
    category: "Shopping",
    date: "2026-03-07",
  },
  {
    id: "8",
    title: "Investment Returns",
    amount: 3000,
    type: "income",
    category: "Investment",
    date: "2026-03-08",
  },
];

export const mockMonthlyData: MonthlyData[] = [
  { month: "Oct", income: 55000, expenses: 18000 },
  { month: "Nov", income: 48000, expenses: 22000 },
  { month: "Dec", income: 62000, expenses: 35000 },
  { month: "Jan", income: 50000, expenses: 20000 },
  { month: "Feb", income: 58000, expenses: 19000 },
  { month: "Mar", income: 68000, expenses: 5899 },
];

export const totalIncome = mockTransactions
  .filter((t) => t.type === "income")
  .reduce((sum, t) => sum + t.amount, 0);

export const totalExpenses = mockTransactions
  .filter((t) => t.type === "expense")
  .reduce((sum, t) => sum + t.amount, 0);

export const totalBalance = totalIncome - totalExpenses;
