import { computePrimes, computePrimesCached } from "@/lib/primes";

const LIMIT = 10_000_000; // 10 millions

// Mesure le temps d'exécution d'une fonction async
async function timed<T>(fn: () => Promise<T>): Promise<{ result: T; ms: number }> {
  const start = performance.now();
  const result = await fn();
  return { result, ms: performance.now() - start };
}

export default async function PrimesPage() {
  // Sans cache — recalcul à chaque requête
  const uncached = await timed(() =>
    Promise.resolve(computePrimes(LIMIT))
  );

  // Avec unstable_cache — servi depuis le cache Data dès le 2ème appel
  const cached = await timed(() => computePrimesCached(LIMIT));

  const improvement =
    cached.ms > 0
      ? ((uncached.ms - cached.ms) / uncached.ms) * 100
      : 100;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
        Crible d&apos;Ératosthène — unstable_cache
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Nombres premiers jusqu&apos;à{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
          {LIMIT.toLocaleString("fr-FR")}
        </code>
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {/* Sans cache */}
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <h2 className="font-semibold text-red-800 dark:text-red-300">
              Sans cache
            </h2>
          </div>
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            computePrimes() — recalcul à chaque requête
          </p>

          <div className="mt-4 space-y-2">
            <Stat label="Temps" value={`${uncached.ms.toFixed(2)} ms`} highlight />
            <Stat label="Nombres premiers" value={uncached.result.count.toLocaleString("fr-FR")} />
            <Stat label="Somme" value={uncached.result.sum.toLocaleString("fr-FR")} />
          </div>
        </div>

        {/* Avec cache */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/50 dark:bg-emerald-900/10">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <h2 className="font-semibold text-emerald-800 dark:text-emerald-300">
              Avec unstable_cache
            </h2>
          </div>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">
            computePrimesCached() — résultat mis en cache
          </p>

          <div className="mt-4 space-y-2">
            <Stat label="Temps" value={`${cached.ms.toFixed(2)} ms`} highlight />
            <Stat label="Nombres premiers" value={cached.result.count.toLocaleString("fr-FR")} />
            <Stat label="Somme" value={cached.result.sum.toLocaleString("fr-FR")} />
          </div>
        </div>
      </div>

      {/* Comparaison */}
      <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">
          Comparaison
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {uncached.ms.toFixed(0)} ms
            </p>
            <p className="text-xs text-zinc-500">Sans cache</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {cached.ms.toFixed(0)} ms
            </p>
            <p className="text-xs text-zinc-500">Avec cache</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              {improvement > 0 ? `${improvement.toFixed(0)}%` : "—"}
            </p>
            <p className="text-xs text-zinc-500">Plus rapide</p>
          </div>
        </div>
      </div>

      {/* Explication */}
      <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-900/10">
        <h2 className="font-semibold text-amber-900 dark:text-amber-300">
          Comment ça marche ?
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-amber-800 dark:text-amber-300">
          <li>
            <strong>1ère requête :</strong> les deux colonnes ont un temps similaire
            — le cache est froid, unstable_cache calcule et stocke.
          </li>
          <li>
            <strong>Requêtes suivantes :</strong> la colonne &quot;Avec cache&quot;
            affiche ~0 ms — le résultat est lu depuis le Data Cache de Next.js,
            sans recalcul.
          </li>
          <li>
            <strong>La colonne &quot;Sans cache&quot;</strong> recalcule toujours
            — elle représente le coût réel à chaque requête.
          </li>
          <li>
            <strong>revalidate: 3600</strong> → le cache expire après 1h.
            Utilisez <code className="rounded bg-amber-100 px-1 dark:bg-amber-900">revalidateTag(&quot;primes&quot;)</code> pour
            l&apos;invalider manuellement.
          </li>
        </ul>
      </div>

      <p className="mt-4 text-xs text-zinc-400">
        Rechargez la page plusieurs fois pour observer l&apos;effet du cache.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">{label}</span>
      <span
        className={`font-mono text-sm font-semibold ${
          highlight
            ? "text-zinc-900 dark:text-zinc-100"
            : "text-zinc-700 dark:text-zinc-300"
        }`}
      >
        {value}
      </span>
    </div>
  );
}