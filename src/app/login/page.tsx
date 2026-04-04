"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(from);
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Passord"
        autoFocus
        className="w-full rounded-xl border border-[#d4cbc0] bg-white px-4 py-3 text-sm text-[#1a1715] placeholder-[#a89f94] outline-none focus:border-[#1a1715] focus:ring-1 focus:ring-[#1a1715]"
      />
      {error && (
        <p className="text-sm text-red-600">Feil passord. Prøv igjen.</p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full rounded-xl bg-[#1a1715] py-3 text-sm font-semibold text-[#faf8f5] transition-colors hover:bg-[#2a2623] disabled:opacity-50"
      >
        {loading ? "Logger inn..." : "Logg inn"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-[#1a1715]">Fargerike</h1>
          <p className="mt-2 text-sm text-[#7a7269]">Skriv inn passord for å se siden</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
