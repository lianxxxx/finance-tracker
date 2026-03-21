import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 w-full max-w-md border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            💰 Finance Tracker
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back!
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            href="/(dashboard)/dashboard"
            className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl transition-colors text-center"
          >
            Login
          </Link>
        </div>

        <p className="text-xs text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/(auth)/register"
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
