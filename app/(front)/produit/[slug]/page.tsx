import { Suspense } from "react";
import { ProductDetail } from "@/app/components/ProductDetail";
import { SimilarProducts } from "@/app/components/SimilarProducts";
import { SponsoredProducts } from "@/app/components/SponsoredProducts";
import { getProducts } from "@/domains/catalog/repository/productRepository";

// PPR activé globalement via cacheComponents: true dans next.config.ts
// Shell statique généré au build, <Suspense> dynamiques streamés à la requête.

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Skeletons pour les fallbacks des Suspense dynamiques
function SimilarSkeleton() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mb-6 h-7 w-48 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-xl bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

function SponsoredSkeleton() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mb-6 h-7 w-56 rounded bg-amber-100 dark:bg-amber-900/30" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-2xl bg-amber-100 dark:bg-amber-900/20" />
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/*
        STATIQUE — rendu au build via generateStaticParams.
        ProductDetail utilise Prisma, mais dans le contexte statique du build
        (pas de connection() nécessaire ici).
      */}
      <ProductDetail slug={slug} />

      {/*
        DYNAMIQUE — streamé à chaque requête.
        SimilarProducts appelle connection() car Prisma n'est pas auto-détecté.
      */}
      <Suspense fallback={<SimilarSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>

      {/*
        DYNAMIQUE ISR — fetch() avec revalidate + tag "sponsored".
        Next.js auto-détecte le caractère dynamique via fetch.
      */}
      <Suspense fallback={<SponsoredSkeleton />}>
        <SponsoredProducts />
      </Suspense>
    </div>
  );
}