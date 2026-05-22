"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

export default function NotFound() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });
  }, []);

  const { label, href } = loading
    ? { label: "Go back", href: "/" }
    : user
      ? { label: "Back to dashboard", href: "/dashboard" }
      : { label: "Back to home", href: "/" };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-slate-50 dark:bg-slate-950">
      {/* Bars */}
      <div className="flex items-end gap-1.5 h-10">
        {[
          { color: "bg-blue-200", delay: "0s" },
          { color: "bg-blue-300", delay: "0.15s" },
          { color: "bg-blue-500", delay: "0.3s" },
          { color: "bg-blue-700", delay: "0.45s" },
        ].map((b, i) => (
          <span
            key={i}
            className={`block w-2 h-10 rounded-sm origin-bottom trackr-bar ${b.color}`}
            style={{ animationDelay: b.delay }}
          />
        ))}
      </div>

      {/* Heading + subtitle + button */}
      <div className="flex flex-col items-center gap-6">
        <div className="text-center space-y-2 max-w-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Page not found
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            This page doesn&apos;t exist or has moved.
          </p>
        </div>
        <Link
          href={href}
          className="inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          {label}
        </Link>
      </div>

      {/* Wordmark */}
      <em
        style={{ fontFamily: "var(--font-dm-serif)" }}
        className="text-2xl tracking-tight text-blue-500"
      >
        Trackr
      </em>

      <style>{`
        @keyframes trackrBarPulse {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .trackr-bar {
          animation: trackrBarPulse 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
