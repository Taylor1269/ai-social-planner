"use client";

export default function PricingPage() {
  // 🔢 Change this number any time to update the “spots left” banner.
  // Later we can fetch this from your DB.
  const totalSpots = 1000;
  const spotsLeft = 742; // <-- update manually for now
  const claimed = totalSpots - spotsLeft;
  const claimedPct = Math.max(0, Math.min(100, Math.round((claimed / totalSpots) * 100)));

  return (
    <div className="container py-12">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Simple pricing</h1>
        <p className="text-gray-400 mt-3">
          Lock in <span className="text-white font-semibold">£19/month</span> for the first 1,000 users — or try free for 7 days (card required),
          then <span className="text-white font-semibold">£24/month</span>.
        </p>
      </div>

      {/* Early access banner + progress */}
      <div className="max-w-2xl mx-auto mb-10 p-4 rounded-2xl border border-cyan-500/50 bg-gradient-to-b from-purple-900/30 to-cyan-900/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-200">
            <div className="font-semibold text-white">Early Access: £19/month</div>
            <div className="text-gray-300">First 1,000 subscribers</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Spots left</div>
            <div className="text-xl font-bold text-white">{spotsLeft}</div>
          </div>
        </div>
        <div className="mt-3 h-2 rounded-full bg-gray-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-400"
            style={{ width: `${claimedPct}%` }}
            aria-label={`Claimed ${claimed} of ${totalSpots}`}
          />
        </div>
        <div className="mt-2 text-xs text-gray-400">
          {claimed.toLocaleString()} claimed · {spotsLeft.toLocaleString()} left
        </div>
      </div>

      {/* Two cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Early Access £19 */}
        <div className="p-6 rounded-2xl border border-cyan-400/60 bg-gradient-to-b from-purple-900/40 to-cyan-900/20 shadow-xl">
          <div className="text-xs inline-block px-2 py-1 rounded-full border border-cyan-400/50 text-cyan-200 mb-3">
            Limited — {spotsLeft} left
          </div>
          <h2 className="text-2xl font-semibold mb-1">Early Access</h2>
          <p className="text-4xl font-bold mb-4">£19<span className="text-lg text-gray-300">/month</span></p>
          <ul className="space-y-2 text-gray-200 mb-6">
            <li>✓ Unlimited posts</li>
            <li>✓ 100 images / month</li>
            <li>✓ Save history & export CSV</li>
            <li>✓ Priority generation</li>
          </ul>
          <a
            href="#"
            className="block w-full text-center py-2 rounded font-medium bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:opacity-90 transition"
          >
            Lock in £19
          </a>
          <p className="text-xs text-gray-400 mt-2">
            Price locked for life while active. Limited to the first 1,000 subscribers.
          </p>
        </div>

        {/* Standard £24 with 7-day trial */}
        <div className="p-6 rounded-2xl border border-gray-700 bg-gray-900">
          <div className="text-xs inline-block px-2 py-1 rounded-full border border-gray-700 text-gray-300 mb-3">
            7-day trial · card required
          </div>
          <h2 className="text-2xl font-semibold mb-1">Standard</h2>
          <p className="text-4xl font-bold mb-4">£24<span className="text-lg text-gray-300">/month</span></p>
          <ul className="space-y-2 text-gray-200 mb-6">
            <li>✓ Unlimited posts</li>
            <li>✓ 100 images / month</li>
            <li>✓ Save history & export CSV</li>
            <li>✓ Priority generation</li>
          </ul>
          <a
            href="#"
            className="block w-full text-center py-2 rounded font-medium bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            Start 7-day trial
          </a>
          <p className="text-xs text-gray-400 mt-2">
            Auto-charges £24 after 7 days unless cancelled during trial.
          </p>
        </div>
      </div>

      {/* FAQ snippet */}
      <div className="max-w-3xl mx-auto mt-12 text-sm text-gray-300">
        <h3 className="text-lg font-semibold mb-3">FAQs</h3>
        <details className="mb-2">
          <summary className="cursor-pointer text-gray-200">Can I cancel during the trial?</summary>
          <p className="mt-2 text-gray-400">Yes — cancel any time in the first 7 days to avoid being charged.</p>
        </details>
        <details className="mb-2">
          <summary className="cursor-pointer text-gray-200">What happens after early access fills?</summary>
          <p className="mt-2 text-gray-400">New signups move to the Standard plan at £24/month. Existing early access users keep £19/month while active.</p>
        </details>
      </div>
    </div>
  );
}