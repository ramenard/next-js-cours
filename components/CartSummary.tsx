import { cookies } from "next/headers";
import { getCartWithItems } from "@/domains/catalog/data/cartData";

export async function CartSummary() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  const cart = await getCartWithItems(cartId);
  if (!cart || cart.items.length === 0) return null;

  const totalArticles = cart.items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const currency = cart.items[0]?.currency ?? "EUR";

  return (
    <span className="rounded-full bg-zinc-200 px-3 py-1.5 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-200">
      {totalArticles} article{totalArticles > 1 ? "s" : ""} · {totalPrice.toFixed(2)} {currency}
    </span>
  );
}