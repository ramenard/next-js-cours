import {Suspense} from "react";
import {ProductCard} from "@/components/ProductCard";
import {SponsoredProducts} from "@/components/SponsoredProducts";
import {getProducts} from "@/domains/catalog/repository/productRepository";
import {Product} from "@/domains/catalog/entity/product";

function SponsoredSkeleton() {
  return (
    <div className="mt-16 animate-pulse">
      <div className="mb-6 h-7 w-56 rounded bg-zinc-200 dark:bg-zinc-700"/>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({length: 4}).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square rounded-2xl bg-zinc-200 dark:bg-zinc-700"/>
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700"/>
            <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-14 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-5xl">
          Nos produits
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Découvrez une sélection soignée pour le bureau, l&apos;audio et le quotidien.
        </p>
      </section>

      <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </section>

      {/*
        Suspense : les produits sponsorisés viennent d'une API externe (mock.shop).
        Ils streament indépendamment des produits locaux.
      */}
      <Suspense fallback={<SponsoredSkeleton/>}>
        <SponsoredProducts/>
      </Suspense>
    </div>
  );
}