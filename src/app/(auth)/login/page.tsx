"use client";

import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TbEye, TbEyeOff } from "react-icons/tb";
import { useToast } from "@/context/ToastContext";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });
    if (error) {
      showToast("error", error.message);
    } else {
      showToast("success", "Welcome back!");
      router.push("/dashboard");
    }
    setLoading(false);
  };
  const inputClass =
    "peer w-full border border-slate-200 dark:border-slate-700 rounded-xl px-4 pt-5 pb-2 text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 outline-none focus:border-blue-300 transition-colors placeholder-transparent";

  return (
    <div
      style={{ fontFamily: "var(--font-dm-sans)" }}
      className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-5"
    >
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl px-8 py-10">
        {/* Logo */}
        <div className="mb-8 text-center">
          <em
            style={{ fontFamily: "var(--font-dm-serif)" }}
            className="text-3xl tracking-tight text-blue-300"
          >
            Trackr
          </em>
          <p className="text-sm text-slate-400 mt-1">Welcome back</p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
            <label
              htmlFor="email"
              className="absolute left-3 px-1 text-slate-400 bg-white dark:bg-slate-900 transition-all duration-200
                top-3.5 text-sm
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={`${inputClass} pr-11`}
            />
            <label
              htmlFor="password"
              className="absolute left-3 px-1 text-slate-400 bg-white dark:bg-slate-900 transition-all duration-200
                top-3.5 text-sm
                peer-focus:-top-2 peer-focus:text-xs peer-focus:text-blue-400
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors cursor-pointer"
            >
              {showPassword ? <TbEyeOff size={18} /> : <TbEye size={18} />}
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-2 bg-blue-500 hover:opacity-75 disabled:opacity-50 transition-opacity text-white text-sm font-medium rounded-full py-3 cursor-pointer"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 hover:opacity-75 transition-opacity"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
