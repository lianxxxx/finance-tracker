"use client";

import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import { Transaction, MonthlyData } from "@/lib/types";
import InsightsSkeleton from "@/components/ui/InsightsSkeleton";
import {
  TbTrendingUp,
  TbTrendingDown,
  TbBulb,
  TbChartBar,
  TbSparkles,
  TbRefresh,
  TbChevronDown,
  TbChevronUp,
  TbWallet,
  TbShoppingCart,
  TbCalendar,
  TbTarget,
} from "react-icons/tb";

// ─── helpers ─────────────────────────────────────────────────────────────────

function buildPrompt(transactions: Transaction[], monthly: MonthlyData[]) {
  const expenses = transactions.filter((t) => t.type === "expense");
  const income = transactions.filter((t) => t.type === "income");

  const totalExpenses = expenses.reduce((s, t) => s + t.amount, 0);
  const totalIncome = income.reduce((s, t) => s + t.amount, 0);

  const byCategory = expenses.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>,
  );

  const topCategory = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  const lastTwo = monthly.slice(-2);
  const prevMonth = lastTwo[0];
  const currMonth = lastTwo[1];

  return `You are a helpful personal finance assistant. Analyze this user's financial data and respond in JSON only — no markdown, no backticks, no explanation outside the JSON.

Financial Data:
- Total Income this month: ₱${totalIncome.toLocaleString()}
- Total Expenses this month: ₱${totalExpenses.toLocaleString()}
- Net Savings: ₱${(totalIncome - totalExpenses).toLocaleString()}
- Top Spending Category: ${topCategory ? topCategory[0] + " (₱" + topCategory[1].toLocaleString() + ")" : "N/A"}
- Category Breakdown: ${JSON.stringify(byCategory)}
- Last month income: ₱${prevMonth?.income?.toLocaleString() ?? "N/A"}, expenses: ₱${prevMonth?.expenses?.toLocaleString() ?? "N/A"}
- Current month income: ₱${currMonth?.income?.toLocaleString() ?? "N/A"}, expenses: ₱${currMonth?.expenses?.toLocaleString() ?? "N/A"}

Return ONLY a JSON object with this exact shape:
{
  "summary": "2-3 sentence overview of the month in plain English, friendly and direct",
  "spendingPattern": "1-2 sentences about spending behavior this month",
  "monthOverMonth": "1-2 sentences comparing this month to last month",
  "budgetRecommendations": ["tip 1", "tip 2", "tip 3"],
  "savingsTips": ["tip 1", "tip 2", "tip 3"],
  "scoreLabel": "Poor | Fair | Good | Excellent",
  "score": <number 0-100>
}`;
}

// ─── types ────────────────────────────────────────────────────────────────────

interface InsightData {
  summary: string;
  spendingPattern: string;
  monthOverMonth: string;
  budgetRecommendations: string[];
  savingsTips: string[];
  scoreLabel: string;
  score: number;
}

// ─── sub-components ───────────────────────────────────────────────────────────

function ScoreRing({ score, label }: { score: number; label: string }) {
  const radius = 54;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 60
        ? "#3b82f6"
        : score >= 40
          ? "#f59e0b"
          : "#f87171";

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="relative flex items-center justify-center">
        <svg width={130} height={130} className="-rotate-90">
          <circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={10}
            className="text-slate-200 dark:text-slate-700"
          />
          <circle
            cx={65}
            cy={65}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={10}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-3xl font-bold text-slate-900 dark:text-slate-50">
            {score}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            /100
          </span>
        </div>
      </div>
      <span className="text-sm font-semibold" style={{ color }}>
        {label}
      </span>
    </div>
  );
}

function InsightCard({
  icon,
  title,
  children,
  accent,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: string;
}) {
  const [open, setOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <button
        onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${accent ?? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"}`}
          >
            {icon}
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {title}
          </span>
        </div>
        {open ? (
          <TbChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <TbChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800">
          {children}
        </div>
      )}
    </div>
  );
}

function TipList({ tips }: { tips: string[] }) {
  return (
    <ul className="space-y-2 mt-3">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold  shrink-0">
            {i + 1}
          </span>
          <span className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            {tip}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "trackr.lastInsights";

interface StoredInsights {
  insights: InsightData;
  generatedAt: number;
}

export default function InsightsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [insights, setInsights] = useState<InsightData | null>(null);
  const [generatedAt, setGeneratedAt] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: StoredInsights = JSON.parse(stored);
        setInsights(parsed.insights);
        setGeneratedAt(parsed.generatedAt);
        setGenerated(true);
      } catch {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
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

    fetchTransactions();
  }, []);

  async function generateInsights() {
    setLoading(true);
    setError(null);
    setInsights(null);

    try {
      const response = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: buildPrompt(transactions, []),
        }),
      });

      const data = await response.json();
      const raw = data.result;

      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed: InsightData = JSON.parse(clean);
      const ts = Date.now();
      setInsights(parsed);
      setGeneratedAt(ts);
      setGenerated(true);
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ insights: parsed, generatedAt: ts }),
      );
    } catch {
      setError("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const net = totalIncome - totalExpenses;
  const lastTwo = transactions.reduce(
    (acc, t) => {
      const month = new Date(t.date).toLocaleString("en-PH", {
        month: "short",
      });
      if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
      if (t.type === "income") acc[month].income += t.amount;
      else acc[month].expenses += t.amount;
      return acc;
    },
    {} as Record<string, { income: number; expenses: number }>,
  );

  const monthValues = Object.values(lastTwo);
  const momChange =
    monthValues.length >= 2
      ? (
          ((monthValues[monthValues.length - 1].expenses -
            monthValues[monthValues.length - 2].expenses) /
            monthValues[monthValues.length - 2].expenses) *
          100
        ).toFixed(1)
      : null;
  return (
    <div className="min-h-screen space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          AI Insights
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Powered by GPT-OSS, LLaMA 3.3 & more with smart fallback for reliable
          insights.
        </p>
      </div>

      {/* Quick stat strip */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-3">
        {[
          {
            label: "Income",
            value: `₱${totalIncome.toLocaleString()}`,
            icon: <TbTrendingUp className="w-4 h-4" />,
            color:
              "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
          },
          {
            label: "Expenses",
            value: `₱${totalExpenses.toLocaleString()}`,
            icon: <TbShoppingCart className="w-4 h-4" />,
            color:
              "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400",
          },
          {
            label: "Net",
            value: `₱${net.toLocaleString()}`,
            icon: <TbWallet className="w-4 h-4" />,
            color:
              net >= 0
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex flex-col gap-2"
          >
            <span
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}
            >
              {s.icon}
            </span>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {s.label}
              </p>
              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-50 mt-0.5 truncate">
                {s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Generate button */}
      <div className="flex justify-center">
        <button
          onClick={generateInsights}
          disabled={loading}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-semibold text-sm transition-all
      bg-blue-600 hover:bg-blue-700 active:scale-[0.98] cursor-pointer text-white
      disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <TbRefresh className="w-4 h-4 animate-spin" />
              Analyzing your finances…
            </>
          ) : (
            <>
              <TbSparkles className="w-4 h-4" />
              {generated ? "Regenerate Insights" : "Generate AI Insights"}
            </>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 text-sm text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      {loading ? (
        <InsightsSkeleton />
      ) : insights ? (
        <div className="space-y-4">
          {generatedAt && (
            <p className="text-xs text-slate-400">
              Last generated:{" "}
              {new Date(generatedAt).toLocaleString("en-PH", {
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          )}
          {/* Score + summary */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex  shrink-0">
                <ScoreRing score={insights.score} label={insights.scoreLabel} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Monthly Overview
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {insights.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Spending Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InsightCard
              icon={<TbChartBar className="w-4 h-4" />}
              title="Spending Pattern"
              accent="bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                {insights.spendingPattern}
              </p>
            </InsightCard>
            {/* Month over Month */}
            <InsightCard
              icon={
                momChange && parseFloat(momChange) > 0 ? (
                  <TbTrendingUp className="w-4 h-4" />
                ) : (
                  <TbTrendingDown className="w-4 h-4" />
                )
              }
              title="Month-over-Month"
              accent="bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-3">
                {insights.monthOverMonth}
              </p>
              {momChange && (
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      parseFloat(momChange) > 0
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400"
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {parseFloat(momChange) > 0 ? "↑" : "↓"}{" "}
                    {Math.abs(parseFloat(momChange))}% vs last month
                  </span>
                  <span className="text-xs text-slate-400">in spending</span>
                </div>
              )}
            </InsightCard>
            {/* Budget Recommendations */}
            <InsightCard
              icon={<TbTarget className="w-4 h-4" />}
              title="Budget Recommendations"
              accent="bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400"
            >
              <TipList tips={insights.budgetRecommendations} />
            </InsightCard>
            {/* Savings Tips */}
            <InsightCard
              icon={<TbBulb className="w-4 h-4" />}
              title="Savings Tips"
              accent="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400"
            >
              <TipList tips={insights.savingsTips} />
            </InsightCard>
          </div>

          {/* Future: Language toggle note */}
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <TbCalendar className="w-4 h-4 text-slate-400 flex shrink-0" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Coming soon:
              </span>{" "}
              Filipino/Taglish language toggle for more relatable insights. 🇵🇭
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
