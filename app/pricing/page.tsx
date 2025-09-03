// app/pricing/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function Notice() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("success") === "1") setMsg("✅ Payment successful. Welcome aboard!");
    if (p.get("canceled") === "1") setMsg("❕ Checkout canceled. You can try again anytime.");
  }, []);
  if (!msg) return null;
  return (
    <div className="mx-auto max-w-4xl mb-6 rounded-lg border border-white/10 bg-emerald-500/10 p-3 text-sm">
      {msg}
    </div>
  );
}

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="text-3xl font-semibold">Pricing</h1>
      <p className="mt-2 text-zinc-300">
        Founding members get a locked £19/mo plan. Standard includes a 7-day free trial.
      </p>

      <Notice />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Early Access */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold">Early Access</h3>
          <p className="mt-1 text-zinc-300">£19 / month — limited to first 1,000 users</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            <li>All core features</li>
            <li>Locked pricing for life</li>
            <li>Priority support</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/api/checkout?plan=early"
              className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              Subscribe £19/mo
            </Link>
          </div>
        </div>

        {/* Standard */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-xl font-semibold">Standard</h3>
          <p className="mt-1 text-zinc-300">£24 / month — 7-day free trial</p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-300">
            <li>All core features</li>
            <li>Cancel anytime</li>
            <li>AI improvements included</li>
          </ul>
          <div className="mt-6">
            <Link
              href="/api/checkout?plan=standard"
              className="inline-flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-500"
            >
              Start 7-day free trial
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-zinc-400">
        Questions?{" "}
        <Link className="underline hover:text-zinc-200" href="mailto:tayloremwc@gmail.com">
          Contact support
        </Link>
      </div>
    </div>
  );
}