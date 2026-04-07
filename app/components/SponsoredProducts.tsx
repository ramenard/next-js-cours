import { getSponsoredProducts } from "@/domains/sponsored/sponsoredProduct";
import { SponsoredProductCard } from "@/app/components/SponsoredProductCard";

// Composant async → peut être wrappé dans <Suspense>
export async function SponsoredProducts() {
  const products = await getSponsoredProducts();

  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Produits sponsorisés
        </h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
          Partenaires
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <SponsoredProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}