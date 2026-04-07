import { Suspense } from "react";
import { ProductDetail } from "@/app/components/ProductDetail";
import { SimilarProducts } from "@/app/components/SimilarProducts";
import { getProducts } from "@/domains/catalog/repository/productRepository";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Skeletons pour les fallbacks Suspense
function ProductDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2 animate-pulse">
      <div className="aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-700" />
      <div className="space-y-4">
        <div className="h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-24 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-10 w-1/4 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="h-12 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}

function SimilarProductsSkeleton() {
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

export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/*
        Suspense #1 : détail du produit (stream après ~1s)
        Le shell de la page (div container) s'affiche immédiatement.
        Le skeleton remplace le contenu le temps du fetch.
      */}
      <Suspense fallback={<ProductDetailSkeleton />}>
        <ProductDetail slug={slug} />
      </Suspense>

      {/*
        Suspense #2 : produits similaires (stream après ~2s)
        Indépendant du Suspense ci-dessus → s'affiche dès que ses données arrivent,
        sans bloquer le rendu du détail produit.
      */}
      <Suspense fallback={<SimilarProductsSkeleton />}>
        <SimilarProducts slug={slug} />
      </Suspense>
    </div>
  );
}
