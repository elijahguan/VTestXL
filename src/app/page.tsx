import Link from "next/link";

export default function Landing() {
  return (
    <main className="min-h-screen bg-bg">
      {/* Nav */}
      <nav className="max-w-5xl mx-auto px-5 sm:px-6 py-6 flex items-center justify-between">
        <span className="font-display font-extrabold text-xl text-ink">TestXL</span>
        <Link
          href="/demo"
          className="text-sm font-semibold text-primary bg-primary/10 rounded-full px-5 py-2 hover:bg-primary/15 transition-colors"
        >
          Try the demo →
        </Link>
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
      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20">
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
    </main>
  );
}
