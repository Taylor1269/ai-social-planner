"use client";
import { AuthButtons } from "./AuthButtons";

export function Navbar() {
  return (
    <header className="border-b border-gray-800/60">
      <div className="container flex items-center justify-between py-4">
        <a href="/" className="text-2xl font-bold tracking-tight">Echo</a>
        <nav className="flex items-center gap-3">
          <a
            href="/pricing"
            className="px-3 py-1.5 rounded-lg border border-gray-700 text-gray-200 hover:bg-gray-800 transition"
          >
            Pricing
          </a>
          <a
            href="/pricing#early"
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:opacity-90 transition"
          >
            Get started
          </a>
          <AuthButtons />
        </nav>
      </div>
    </header>
  );
}