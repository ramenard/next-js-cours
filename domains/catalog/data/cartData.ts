import { prisma } from "@/lib/prisma";
import type { Cart, CartItem } from "@/generated/prisma";

export type CartWithItems = Cart & { items: CartItem[] };

export async function getCartWithItems(cartId: string): Promise<CartWithItems | null> {
  return prisma.cart.findUnique({
    where: { id: cartId },
    include: { items: true },
  });
}

export async function getOrCreateCart(cartId?: string): Promise<CartWithItems> {
  if (cartId) {
    const existing = await prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });
    if (existing) return existing;
  }

  return prisma.cart.create({
    data: {},
    include: { items: true },
  });
}

export async function addProductToCart(cartId: string, productSlug: string): Promise<CartWithItems> {
  const product = await prisma.product.findUniqueOrThrow({ where: { slug: productSlug } });

  await prisma.cartItem.upsert({
    where: { cartId_productId: { cartId, productId: product.id } },
    update: { quantity: { increment: 1 } },
    create: {
      cartId,
      productId: product.id,
      quantity: 1,
      name: product.name,
      price: product.price,
      currency: product.currency,
    },
  });

  return prisma.cart.findUniqueOrThrow({
    where: { id: cartId },
    include: { items: true },
  });
}