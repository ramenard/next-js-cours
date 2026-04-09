"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import {AuthState, loginAction} from "@/app/actions/auth";

const initialState = {};

export default function LoginPage() {
  const [state, action, isPending] = useActionState<AuthState, FormData>(loginAction, initialState);
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Se connecter
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Pas encore de compte ?{" "}
        <Link href="/register" className="font-medium text-zinc-900 underline dark:text-zinc-100">
          S&apos;inscrire
        </Link>
      </p>

      {registered && (
        <p className="mt-4 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
          Compte créé ! Vous pouvez maintenant vous connecter.
        </p>
      )}

      <form action={action} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Mot de passe
          </label>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm shadow-sm focus:border-zinc-500 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
          />
        </div>

        {state?.error && (
          <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isPending ? "Connexion…" : "Se connecter"}
        </button>
      </form>
    </div>
  );
}