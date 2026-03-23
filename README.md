# Trackr 💸

A personal finance tracker built with Next.js, TypeScript, and Tailwind CSS. Track income, expenses, and goals — with AI-powered insights powered by multiple LLMs via OpenRouter.

🔗 **Live demo:** [trackrph.vercel.app](https://trackrph.vercel.app)

---

## Features

- 📊 **Dashboard** — Overview of balance, income, expenses, and spending breakdown
- 💸 **Transactions** — Log, edit, and delete income/expense entries with categories
- 🏦 **Accounts** — Manage multiple accounts (bank, e-wallet, cash, credit)
- 🎯 **Goals** — Set financial goals and track progress
- 🤖 **AI Insights** — Multi-model AI analysis with smart fallback (GPT-OSS 120B, LLaMA 3.3 70B, and more)
- 🌙 **Dark mode** — System-aware theme toggle
- 📱 **Responsive** — Mobile and desktop friendly

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** React Icons
- **AI:** OpenRouter API (multi-model with smart fallback)
- **Storage:** localStorage (Supabase integration coming soon)

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/               # Login & register pages
│   ├── (dashboard)/          # Main app pages
│   │   ├── dashboard/
│   │   ├── transactions/
│   │   ├── account/
│   │   ├── goals/
│   │   ├── insights/         # AI Insights page
│   │   └── settings/
│   └── api/
│       └── insights/         # OpenRouter API route
├── components/
│   ├── dashboard/            # Dashboard components
│   ├── modals/               # Add/edit modals
│   └── ui/                   # Shared UI components
├── hooks/                    # Custom React hooks
└── lib/                      # Types, mock data, utilities
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/lianxxxx/finance-tracker.git
cd finance-tracker

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenRouter API key

# Run development server
npm run dev
```

---

## Environment Variables

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key
```

Get your free API key at [openrouter.ai](https://openrouter.ai).

---

## Roadmap

- [ ] Supabase integration (real database + auth)
- [ ] Filipino language toggle for AI Insights
- [ ] Floating label inputs

---
