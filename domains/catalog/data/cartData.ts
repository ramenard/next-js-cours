import {prisma} from "@/lib/prisma";
import {Cart, Product} from "@/generated/prisma";
import {NotFoundError} from "@humanfs/core";

export async function getCartById(cartId: string): Promise<Cart> {
  const cart = await prisma.cart.findUnique({where: {id: cartId}, include: {items: true}})

  if (!cart) {
    throw new NotFoundError('Cart not found');
  }

  return cart;
}

export async function addItemToCartInDB(slugItem: string, cartId?: string): Promise<Cart> {
  if (!cartId) {
    const item: Product = await prisma.product.findUniqueOrThrow({where: {slug: slugItem}})
    const createdCart: Cart = await prisma.cart.create({data: {items: [item]}});
  }

  const cart = await prisma.cart.findUnique({where: {id: cartId}});

  if (!cart) {
    await prisma.cart.create({data: {}});
  }
}
