# TestXL (Next.js / Vercel)

Paste in practice exam questions. TestXL sorts them by topic, generates an
interactive variant question for each one to test real understanding, and
flags concepts worth extra attention.

This is the Next.js/Vercel version of the app, built after validating the
core mechanic in a Streamlit prototype. The functionality is the same; this
version exists because the feedback from testers was that the product needed
to feel more polished and consumer-grade.

## Design direction

The visual identity is deliberately a "workbook," not a generic SaaS
dashboard: topic sections are separated by a rule and heading rather than
boxed into identical cards, and flagged (commonly-confused) questions get a
colored margin bar — like a highlighter mark — instead of a boxed warning
banner. Typography pairs a display serif (Fraunces) for headings with a
clean sans (Inter) for body/UI text.

## Why it's structured this way

- **API key never reaches the browser.** The Gemini call happens entirely in
  a server-side API route (`src/app/api/analyze/route.ts`), unlike the
  Streamlit version where the whole script (including the API call) runs in
  one process. This is a meaningful security improvement, not just a
  framework swap.
- **Passcode gate via `proxy.ts`** (Next.js 16's replacement for
  `middleware.ts`) checks for an auth cookie on every route except the gate
  page and its verification endpoint, and redirects unauthenticated visitors
  to `/gate`. The cookie is `httpOnly`, so it can't be read or tampered with
  from client-side JavaScript.
- **No database yet.** Feedback and usage logging currently go to
  `console.log`, which lands in Vercel's function logs — visible in your
  dashboard, but not queryable or durable in the way a real database would
  be. This mirrors the same "good enough for now" tradeoff the Streamlit
  version made with local CSV files. Worth upgrading once you have enough
  testers that eyeballing logs stops being practical.

## Local setup

```
npm install
cp .env.example .env.local
# fill in GEMINI_API_KEY and BETAUSERS in .env.local
npm run dev
```

Note: `next/font/google` fetches font files at build time, which requires
outbound access to fonts.googleapis.com. If you're developing somewhere with
restricted network access, the build will fail on the font step specifically
— this is expected to work fine on Vercel's build servers, which have full
internet access.

## Deploying to Vercel

1. Push this repo to GitHub and import it into Vercel
   (https://vercel.com/new).
2. In the Vercel project's **Settings → Environment Variables**, add:
   - `GEMINI_API_KEY`
   - `BETAUSERS`
3. Deploy. Vercel auto-detects Next.js — no extra build configuration
   needed.

Anyone with the URL will land on `/gate` until they enter the `BETAUSERS`
passcode — share that separately from the link itself.

## What's intentionally not built yet

- User accounts / persistent history across sessions
- A real database for feedback/usage data (currently console logs only)
- Objective-mapped generation mode (BYO-content only for now)
- Rate limiting beyond what Gemini's own API returns
