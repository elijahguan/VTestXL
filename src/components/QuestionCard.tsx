"use client";

import { useState } from "react";

export type Question = {
  topic: string;
  original_question: string;
  original_answer: string | null;
  explanation: string;
  flagged: boolean;
  flag_reason: string | null;
  variant_question: string;
  variant_choices: string[];
  variant_correct_index: number;
  variant_explanation: string;
};

export default function QuestionCard({ question }: { question: Question }) {
  const [showVariant, setShowVariant] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const [comment, setComment] = useState("");

  async function sendFeedback(rating: "up" | "down") {
    setFeedbackGiven(true);
    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: question.topic,
          questionPreview: question.original_question.slice(0, 90),
          rating,
          comment,
        }),
      });
    } catch {
      // Feedback is best-effort; a failed send shouldn't disrupt the user.
    }
  }

  const isCorrect = submitted && selected === question.variant_correct_index;

  return (
    <div className="bg-surface rounded-2xl shadow-sm border border-border p-5">
      {question.flagged && (
        <div className="bg-accent-light text-accent text-sm font-medium rounded-xl px-4 py-2.5 mb-3">
          ⚡ Watch out — {question.flag_reason}
        </div>
      )}

      <p className="font-semibold text-ink mb-2">{question.original_question}</p>

      {question.original_answer && (
        <p className="text-ink-muted text-sm mb-2">
          Answer: {question.original_answer}
        </p>
      )}

      <p className="text-ink-muted text-sm leading-relaxed">
        {question.explanation}
      </p>

      <div className="mt-4">
        {!showVariant ? (
          <button
            onClick={() => setShowVariant(true)}
            className="text-sm font-semibold text-primary bg-primary/10 rounded-full px-5 py-2.5 hover:bg-primary/15 transition-colors"
          >
            Try a similar question →
          </button>
        ) : (
          <div className="bg-bg rounded-xl p-4 sm:p-5 mt-2">
            <p className="font-semibold text-ink mb-3">{question.variant_question}</p>
            <div className="space-y-2">
              {question.variant_choices.map((choice, i) => {
                const isSelected = selected === i;
                const isCorrectChoice = i === question.variant_correct_index;
                let stateClasses = "border-border bg-surface";
                if (submitted && isCorrectChoice) {
                  stateClasses = "border-success bg-success-light";
                } else if (submitted && isSelected && !isCorrectChoice) {
                  stateClasses = "border-danger bg-danger-light";
                } else if (isSelected) {
                  stateClasses = "border-primary bg-primary/5";
                }
                return (
                  <button
                    key={i}
                    disabled={submitted}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3 text-sm transition-colors ${stateClasses} ${
                      !submitted ? "hover:border-primary/50" : "cursor-default"
                    }`}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>

            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                disabled={selected === null}
                className="mt-4 text-sm font-semibold bg-primary text-white rounded-full px-6 py-2.5 disabled:opacity-40"
              >
                Submit answer
              </button>
            ) : (
              <div className="mt-4">
                <p className={`font-semibold ${isCorrect ? "text-success" : "text-danger"}`}>
                  {isCorrect ? "Correct! 🎉" : "Not quite."}
                </p>
                <p className="text-ink-muted text-sm mt-1 leading-relaxed">
                  {question.variant_explanation}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-border">
        {!feedbackGiven ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-muted">Was this helpful?</span>
            <button
              onClick={() => sendFeedback("up")}
              className="text-base hover:scale-110 transition-transform"
              aria-label="Helpful"
            >
              👍
            </button>
            <button
              onClick={() => sendFeedback("down")}
              className="text-base hover:scale-110 transition-transform"
              aria-label="Not helpful"
            >
              👎
            </button>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Optional comment..."
              className="flex-1 text-xs bg-transparent border-b border-border focus:border-primary outline-none py-1"
            />
          </div>
        ) : (
          <span className="text-xs text-ink-muted">Thanks for the feedback 🙏</span>
        )}
      </div>
    </div>
  );
}
