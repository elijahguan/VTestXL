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
    <main className="min-h-screen bg-paper">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-10">
          <h1 className="font-display text-4xl font-semibold text-forest mb-3">
            Turn your questions into real understanding.
          </h1>
          <p className="text-ink-muted max-w-xl leading-relaxed">
            Paste what you&apos;re studying. TestXL sorts it by topic, tests it a
            different way, and shows you exactly where to focus — instead of
            just repeating the same questions back at you.
          </p>
        </header>

        <section className="bg-paper-raised rounded-lg p-6 mb-12">
          <textarea
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            placeholder={
              "1. What is escrow?\nA) ...\nB) ...\nC) ...\nCorrect answer: B\n\n2. ..."
            }
            rows={10}
            className="w-full rounded-md border border-rule px-4 py-3 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-forest/20 resize-y"
          />

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <label htmlFor="language" className="text-sm text-ink-muted">
                Answer language
              </label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-sm border border-rule rounded-md px-3 py-1.5 bg-paper-raised outline-none focus:border-forest"
              >
                <option value="English">English</option>
                <option value="Chinese">Chinese</option>
              </select>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="bg-forest text-paper-raised font-medium rounded-md px-6 py-2.5 hover:bg-forest-light transition-colors disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze"}
            </button>
          </div>

          {error && <p className="text-brick text-sm mt-3">{error}</p>}
        </section>

        {questions && (
          <section>
            <p className="text-sm text-ink-muted mb-8">
              {questions.length} question{questions.length !== 1 ? "s" : ""} across{" "}
              {topics.size} topic{topics.size !== 1 ? "s" : ""}
            </p>

            {Array.from(topics.entries()).map(([topic, qs]) => (
              <div key={topic} className="mb-10">
                <h2 className="font-display text-xl font-semibold text-forest mb-1">
                  {topic}
                </h2>
                <div className="h-px bg-rule mb-4" />
                <div className="space-y-6">
                  {qs.map((q, i) => (
                    <QuestionCard key={i} question={q} />
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
