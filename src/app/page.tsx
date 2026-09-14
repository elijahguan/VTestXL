"use client";

import { useState } from "react";
import QuestionCard, { Question } from "@/components/QuestionCard";

export default function Home() {
  const [rawText, setRawText] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);

  async function handleAnalyze() {
    if (!rawText.trim()) {
      setError("Paste in some questions first.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText, language }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
      } else {
        setQuestions(data.questions || []);
      }
    } catch {
      setError("Something went wrong reaching the server.");
    } finally {
      setLoading(false);
    }
  }

  const topics = new Map<string, Question[]>();
  (questions || []).forEach((q) => {
    const key = q.topic || "Uncategorized";
    if (!topics.has(key)) topics.set(key, []);
    topics.get(key)!.push(q);
  });

  return (
    <main className="min-h-screen bg-bg">
      <div className="max-w-2xl mx-auto px-5 sm:px-6 py-10 sm:py-14">
        <header className="mb-8 text-center sm:text-left">
          <span className="inline-block bg-accent-light text-accent font-semibold text-xs px-3 py-1 rounded-full mb-4">
            Private beta
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-3">
            Study smarter, not harder.
          </h1>
          <p className="text-ink-muted text-base leading-relaxed">
            Paste in what you&apos;re studying — we&apos;ll sort it, quiz you a
            different way, and point out exactly what to focus on.
          </p>
        </header>

        <section className="bg-surface rounded-2xl shadow-sm border border-border p-5 sm:p-6 mb-10">
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={
              "1. What is escrow?\nA) ...\nB) ...\nC) ...\nCorrect answer: B\n\n2. ..."
            }
            rows={9}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 resize-y"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="language" className="text-sm text-ink-muted">
                Answer in
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-border rounded-full px-4 py-2 bg-surface outline-none focus:border-primary"
              >
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full sm:w-auto bg-primary text-white font-semibold rounded-full px-8 py-3 hover:bg-primary-dark transition-colors disabled:opacity-50 shadow-sm"
            >
              {loading ? "Analyzing..." : "Analyze my questions"}
            </button>
          </div>

          {error && <p className="text-danger text-sm mt-3">{error}</p>}
        </section>

        {questions && (
          <section>
            <p className="text-sm font-medium text-ink-muted mb-6">
              {questions.length} question{questions.length !== 1 ? "s" : ""} across{" "}
              {topics.size} topic{topics.size !== 1 ? "s" : ""}
            </p>

            <div className="space-y-8">
              {Array.from(topics.entries()).map(([topic, qs]) => (
                <div key={topic}>
                  <h2 className="font-display text-lg font-bold text-ink mb-3">
                    {topic}
                  </h2>
                  <div className="space-y-4">
                    {qs.map((q, i) => (
                      <QuestionCard key={i} question={q} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
