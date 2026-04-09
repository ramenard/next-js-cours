import { notFound } from "next/navigation";
import Link from "next/link";
import { findProductById } from "@/domains/catalog/data/productData";
import { EditProductForm } from "./EditProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await findProductById(id);

  if (!product) notFound();

  return (
    <div className="max-w-2xl">
      <div className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
        <Link href="/admin/produits" className="hover:text-zinc-300">
          Produits
        </Link>
        <span>/</span>
        <span className="text-zinc-300">{product.name}</span>
      </div>

      <h1 className="mb-6 text-2xl font-semibold text-white">
        Modifier le produit
      </h1>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}