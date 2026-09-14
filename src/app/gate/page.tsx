"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GatePage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/verify-passcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (res.ok) {
        router.push("/demo");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Incorrect passcode.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm bg-surface rounded-2xl shadow-sm border border-border p-6">
        <h1 className="font-display text-2xl font-extrabold text-ink mb-2">
          TestXL
        </h1>
        <p className="text-ink-muted text-sm mb-6">
          This is a private beta. Enter the passcode you were given to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            autoFocus
            className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          />
          {error && <p className="text-danger text-sm">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !passcode}
            className="w-full rounded-full bg-primary px-4 py-3 text-white font-semibold transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {submitting ? "Checking..." : "Continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
