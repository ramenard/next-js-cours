"use client";

import {useActionState, useEffect} from "react";
import { updateProductAction, type ProductState } from "@/app/actions/product";
import Link from "next/link";
import type { Product } from "@/domains/catalog/entity/product";
import {useRouter} from "next/navigation";

export function EditProductForm({ product }: { product: Product }) {
  const router = useRouter();
  const updateWithId = updateProductAction.bind(null, product.id);
  const [state, formAction, pending] = useActionState<ProductState, FormData>(
    updateWithId,
    {}
  );

  useEffect(() => {
    if (state.error) {
      return;
    }

    if (!state.success) {
      return;
    }

    router.push(`/admin/produits/`);
  })

  return (
    <form action={formAction} className="space-y-5">

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Nom</label>
        <input
          name="name"
          defaultValue={product.name}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm text-zinc-400 mb-1">Description</label>
        <textarea
          name="description"
          defaultValue={product.description}
          rows={4}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Prix (€)</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={product.price}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Stock</label>
          <input
            name="stock"
            type="number"
            defaultValue={product.stock}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Catégorie</label>
          <input
            name="category"
            defaultValue={product.category}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Marque</label>
          <input
            name="brand"
            defaultValue={product.brand}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {state.error && (
        <p className="rounded-lg border border-red-800 bg-red-900/30 px-4 py-2 text-sm text-red-400">
          {state.error}
        </p>
      )}
      {state.success && (
        <p className="rounded-lg border border-emerald-800 bg-emerald-900/30 px-4 py-2 text-sm text-emerald-400">
          {state.success}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
        >
          {pending ? "Enregistrement…" : "Enregistrer"}
        </button>
        <Link
          href="/admin/produits"
          className="text-sm text-zinc-400 hover:text-zinc-300"
        >
          Annuler
        </Link>
      </div>
    </form>
  );
}