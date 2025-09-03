"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function AuthButtons() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn("github")}
        className="px-4 py-2 rounded bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:opacity-90 transition"
      >
        Sign in with GitHub
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {session.user?.image && (
        <img
          src={session.user.image}
          alt="avatar"
          className="w-8 h-8 rounded-full border border-gray-700"
        />
      )}
      <span className="text-sm text-gray-200">
        {session.user?.name || session.user?.email}
      </span>
      <button
        onClick={() => signOut()}
        className="btn-plain"
      >
        Sign out
      </button>
    </div>
  );
}