import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Nav with centered tabs */}
      <nav className="max-w-5xl mx-auto px-5 sm:px-6 py-6 grid grid-cols-2 sm:grid-cols-3 items-center">
        <span className="font-display font-extrabold text-xl text-ink">TestXL</span>

        <div className="hidden sm:flex items-center justify-center gap-6 text-sm font-medium text-ink-muted">
          <a href="#how-it-works" className="hover:text-ink transition-colors">
            How it works
          </a>
          <a href="#why-testxl" className="hover:text-ink transition-colors">
            Why TestXL
          </a>
          <a href="#faq" className="hover:text-ink transition-colors">
            FAQ
          </a>
        </div>

        <div className="justify-self-end">
          <Link
            href="/demo"
            className="text-sm font-semibold text-primary bg-primary/10 rounded-full px-5 py-2 hover:bg-primary/15 transition-colors"
          >
            Try the demo →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-16 text-center">
        <span className="inline-block bg-accent-light text-accent font-semibold text-xs px-3 py-1 rounded-full mb-5">
          Private beta
        </span>
        <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-ink leading-tight mb-4">
          Study smarter, not harder.
        </h1>
        <p className="text-ink-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
          Paste in whatever you&apos;re studying — TestXL sorts it by topic, quizzes
          you a different way, and shows you exactly where to focus, instead of
          just handing you the same questions back.
        </p>
        <Link
          href="/demo"
          className="inline-block bg-primary text-white font-semibold rounded-full px-8 py-3.5 hover:bg-primary-dark transition-colors shadow-sm"
        >
          Try the demo
        </Link>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-4xl mx-auto px-5 sm:px-6 pb-20 scroll-mt-20">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-8">
          How it works
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary mb-4">
              1
            </div>
            <h3 className="font-display font-bold text-ink mb-2">Paste your questions</h3>
            <p className="text-ink-muted text-sm leading-relaxed">
              Your own notes, practice questions, or study guide — however
              messy, TestXL sorts it out.
            </p>
          </div>
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary mb-4">
              2
            </div>
            <h3 className="font-display font-bold text-ink mb-2">Get quizzed differently</h3>
            <p className="text-ink-muted text-sm leading-relaxed">
              Each question gets a fresh variant — so you&apos;re proving you
              understand it, not just recognizing it.
            </p>
          </div>
          <div className="bg-surface rounded-2xl shadow-sm border border-border p-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary mb-4">
              3
            </div>
            <h3 className="font-display font-bold text-ink mb-2">See what to focus on</h3>
            <p className="text-ink-muted text-sm leading-relaxed">
              Commonly-confused concepts get flagged automatically, so you know
              exactly where to spend your study time.
            </p>
          </div>
        </div>
      </section>

      {/* Why TestXL */}
      <section id="why-testxl" className="bg-surface border-y border-border scroll-mt-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-16">
          <h2 className="font-display text-2xl font-bold text-ink text-center mb-4">
            Why TestXL
          </h2>
          <p className="text-ink-muted text-center leading-relaxed max-w-xl mx-auto">
            Most practice tools just replay the same question bank until you&apos;ve
            memorized the answers — not the concept. TestXL is built around
            genuine understanding: every question comes with an explanation, every
            explanation gets tested a different way, and the concepts you actually
            struggle with get called out instead of buried in a big pile of
            questions you&apos;ll never see again.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-2xl mx-auto px-5 sm:px-6 py-16 scroll-mt-20">
        <h2 className="font-display text-2xl font-bold text-ink text-center mb-8">
          FAQ
        </h2>
        <div className="space-y-3">
          <details className="bg-surface rounded-2xl shadow-sm border border-border p-5 group">
            <summary className="font-semibold text-ink cursor-pointer list-none flex items-center justify-between">
              What kind of questions can I paste in?
              <span className="text-ink-muted group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-muted text-sm mt-3 leading-relaxed">
              Your own notes, practice questions, or study material for any exam
              or certification — the more context you include (like answer
              choices or explanations), the better the results.
            </p>
          </details>
          <details className="bg-surface rounded-2xl shadow-sm border border-border p-5 group">
            <summary className="font-semibold text-ink cursor-pointer list-none flex items-center justify-between">
              Is this free to use?
              <span className="text-ink-muted group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-muted text-sm mt-3 leading-relaxed">
              TestXL is currently in a private beta with a small group of
              testers. Pricing hasn&apos;t been finalized yet.
            </p>
          </details>
          <details className="bg-surface rounded-2xl shadow-sm border border-border p-5 group">
            <summary className="font-semibold text-ink cursor-pointer list-none flex items-center justify-between">
              How do I get access?
              <span className="text-ink-muted group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-ink-muted text-sm mt-3 leading-relaxed">
              Access is currently invite-only during the beta. If you were given
              a passcode, click &quot;Try the demo&quot; above to get started.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
