"use server"

import {prisma} from "@/lib/prisma";

export type ProductState = {
  error?: string;
  success?: string;
};

export async function updateProductAction(
  id: string,
  _prev: ProductState,
  formData: FormData
): Promise<ProductState> {
  const name = formData.get("name") as string | null;
  const description = formData.get("description") as string | null;
  const price = formData.get("price") as string | null;
  const stock = formData.get("stock") as string | null;
  const category = formData.get("category") as string | null;
  const brand = formData.get("brand") as string | null;

  await prisma.product.update({
    data: {
      name: name || undefined,
      description: description || undefined,
      price: (price && Number(price) >= 0) ? Number(price) : undefined,
      stock: (stock && Number(stock) >= 0) ? Number(stock) : undefined,
      category: category || undefined,
      brand: brand || undefined,
    },
    where: {id}
  });

  return { success: "product updated successfully" };
}