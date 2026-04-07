import { getSimilarProducts } from "@/domains/catalog/repository/productRepository";
import { ProductCard } from "@/app/components/ProductCard";

type Props = { slug: string };

export async function SimilarProducts({ slug }: Props) {
  const products = await getSimilarProducts(slug);
  if (products.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
        Produits similaires
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}