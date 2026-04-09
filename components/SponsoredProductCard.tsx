import Image from "next/image";
import Link from "next/link";
import type { SponsoredProduct } from "@/domains/sponsored/sponsoredProduct";

function formatSponsoredPrice(product: SponsoredProduct): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: product.currencyCode,
  }).format(parseFloat(product.price));
}

export function SponsoredProductCard({ product }: { product: SponsoredProduct }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-amber-200 bg-white shadow-sm transition hover:border-amber-400 hover:shadow-md dark:border-amber-900/50 dark:bg-zinc-900 dark:hover:border-amber-700">
      {/* Badge Sponsorisé */}
      <span className="absolute right-3 top-3 z-10 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
        Sponsorisé
      </span>

      <Link href={`/sponsored/${product.handle}`} className="flex flex-col flex-1">
        <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-zinc-200 dark:bg-zinc-700" />
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h2 className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {product.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
          <div className="mt-auto pt-4">
            <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatSponsoredPrice(product)}
            </p>
            <span className="mt-2 inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400">
              Voir le produit
              <svg className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}