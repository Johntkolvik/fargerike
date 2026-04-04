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
        className="w-full rounded-xl border border-warm-300 bg-white px-4 py-3 text-sm text-warm-900 placeholder-warm-400 outline-none focus:border-warm-900 focus:ring-1 focus:ring-warm-900"
      />
      {error && (
        <p className="text-sm text-red-600">Feil passord. Prøv igjen.</p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full rounded-xl bg-warm-900 py-3 text-sm font-semibold text-warm-50 transition-colors hover:bg-warm-800 disabled:opacity-50"
      >
        {loading ? "Logger inn..." : "Logg inn"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-warm-900">Fargerike</h1>
          <p className="mt-2 text-sm text-warm-500">Skriv inn passord for å se siden</p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
