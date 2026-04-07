import { ProductDetail } from "@/app/components/ProductDetail";
import { getProducts } from "@/domains/catalog/repository/productRepository";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

// Slot principal (children dans le layout)
// loading.tsx de ce dossier fournit le Suspense automatiquement
export default async function ProductPage(props: PageProps<"/produit/[slug]">) {
  const { slug } = await props.params;
  return <ProductDetail slug={slug} />;
}