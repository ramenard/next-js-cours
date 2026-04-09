import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSponsoredProductByHandle } from "@/domains/sponsored/sponsoredProduct";

function formatPrice(amount: string, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
  }).format(parseFloat(amount));
}

export default async function SponsoredProductPage(
  props: PageProps<"/sponsored/[handle]">
) {
  const { handle } = await props.params;
  const product = await getSponsoredProductByHandle(handle);

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-200">
          Accueil
        </Link>
        <span className="mx-2">/</span>
        <span className="text-amber-600 dark:text-amber-400">Sponsorisé</span>
        <span className="mx-2">/</span>
        <span className="text-zinc-900 dark:text-zinc-200">{product.title}</span>
      </nav>

      {/* Badge sponsorisé */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        Produit sponsorisé — Partenaire
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-800">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.imageAlt ?? product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-zinc-200 dark:bg-zinc-700" />
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>

          <div className="mt-6">
            <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
              {formatPrice(product.price, product.currencyCode)}
            </span>
          </div>

          {/* Pas de bouton "Ajouter au panier" pour les produits sponsorisés */}
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-900/20 dark:text-amber-300">
            Ce produit est vendu par un partenaire externe. Pour l&apos;acheter,
            rendez-vous directement sur le site du partenaire.
          </div>

          <Link
            href="/"
            className="mt-6 inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg className="mr-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}