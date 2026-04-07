"use client";

import { useTransition } from "react";
import { revalidateSponsoredAction } from "@/app/actions/revalidateSponsored";

export function RevalidateSponsoredButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      await revalidateSponsoredAction();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="flex items-center gap-1.5 rounded-full border border-amber-300 bg-white px-3 py-1 text-xs font-medium text-amber-700 transition hover:bg-amber-50 disabled:opacity-50 dark:border-amber-700 dark:bg-zinc-900 dark:text-amber-400 dark:hover:bg-amber-900/20"
    >
      <svg
        className={`h-3.5 w-3.5 ${isPending ? "animate-spin" : ""}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
      {isPending ? "Actualisation…" : "Actualiser"}
    </button>
  );
}