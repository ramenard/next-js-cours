"use server"

import {prisma} from "@/lib/prisma";
import {z} from "zod";

export type ProductState = {
  error?: string;
  success?: string;
};

const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  price: z.coerce.number().min(0).optional(),
  stock: z.coerce.number().min(0).optional(),
  category: z.string().min(1).optional(),
  brand: z.string().min(1).optional(),
});

export async function updateProductAction(
  id: string,
  _prev: ProductState,
  formData: FormData
): Promise<ProductState> {
  const parsed = updateProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    category: formData.get("category"),
    brand: formData.get("brand"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  await prisma.product.update({
    data: parsed.data,
    where: {id}
  });

  return { success: "product updated successfully" };
}