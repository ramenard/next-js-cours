import { cacheLife } from "next/cache";

// 'use cache' → Cache Component : Next.js met en cache le rendu côté serveur.
// cacheLife('weeks') → indique la durée de vie du cache (l'année change rarement).
// Sans ça, new Date() dans un Server Component déclencherait une erreur PPR
// car Next.js ne saurait pas si la valeur est deterministe ou non.
export async function Footer() {
  "use cache";
  cacheLife("weeks");

  return (
    <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        © {new Date().getFullYear()} News App. Tous droits réservés.
      </div>
    </footer>
  );
}
