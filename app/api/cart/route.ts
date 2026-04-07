import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOrCreateCart, addProductToCart } from "@/domains/catalog/data/cartData";

export async function POST(request: Request) {
  const { slug } = await request.json() as { slug: string };

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  const cart = await getOrCreateCart(cartId);
  await addProductToCart(cart.id, slug);

  const response = NextResponse.json({ success: true, cartId: cart.id });
  response.cookies.set("cartId", cart.id, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 jours
    sameSite: "lax",
  });
  return response;
}