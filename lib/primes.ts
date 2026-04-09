import { unstable_cache } from "next/cache";

export function computePrimes(limit: number): {
  count: number;
  sum: number;
  limit: number;
} {
  const isPrime = new Uint8Array(limit + 1).fill(1);
  isPrime[0] = isPrime[1] = 0;
  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = 0;
      }
    }
  }
  let count = 0;
  let sum = 0;
  for (let i = 2; i <= limit; i++) {
    if (isPrime[i]) {
      count++;
      sum += i;
    }
  }
  return { count, sum, limit };
}

// Version mémoïsée avec unstable_cache.
// - Le résultat est mis en cache côté serveur (Data Cache de Next.js).
// - Le cache est partagé entre toutes les requêtes.
// - revalidate: 3600 → invalide le cache après 1h.
// - tags: ["primes"] → permet revalidateTag("primes") pour invalider manuellement.
export const computePrimesCached = unstable_cache(
  async (limit: number) => computePrimes(limit),
  ["primes"], // clé de cache unique
  { revalidate: 3600, tags: ["primes"] }
);