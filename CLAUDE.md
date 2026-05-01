# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Next.js dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

**Trackr** is a personal finance tracker built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Supabase (auth + PostgreSQL), and OpenRouter AI.

### Route Structure

```
src/app/
  (auth)/         # login, register — unauthenticated routes
  (dashboard)/    # protected routes: dashboard, transactions, account, goals, insights, settings
  api/insights/   # POST — AI insight generation via OpenRouter
```

Route protection is handled inside each page using the `useAuth()` hook, which redirects to `/login` if the session is absent.

### Data Layer

All CRUD lives in custom hooks under `src/hooks/`:
- `useAuth()` — Supabase session & user state
- `useTransactions()` — transactions table
- `useAccounts()` — accounts table
- `useGoals()` — goals table

Each hook calls the Supabase client directly (no API layer between the browser and Supabase). All tables are scoped by `user_id`.

Core types are in `src/lib/types.ts`: `Transaction`, `Account`, `Goal`, `Category`. Categories are a fixed enum (Food, Transport, Shopping, Bills, Health, Entertainment, Salary, Freelance, Investment, Other).

### AI Insights

`POST /api/insights` tries 7 free OpenRouter models sequentially, returning the first successful response. The model list and fallback logic live in `src/app/api/insights/route.ts`.

### UI Patterns

- All interactive components are `"use client"` — no server components in the dashboard
- Modal-based data entry: `AddTransactionModal`, `AddAccountModal`, `AddGoalModal` in `src/components/modals/`
- Dashboard charts use Recharts; skeleton loaders (`InsightsSkeleton`) cover async states
- Dark/light theming via `next-themes`
- Responsive layout: `DesktopSidebar` (collapsible) + `MobileNav` bottom tab bar

### Path Alias

`@/*` maps to `src/*` — use this for all internal imports.

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_OPENROUTER_API_KEY
```
