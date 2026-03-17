import Image from "next/image";
import Link from "next/link";

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  "price": number;
  "currency": string;
  "stock": number;
  "sku": string;
  "category": string;
  "brand": string;
  "images": {
    "main": string;
    "gallery": string[];
  };
  "specs": Record<string, number | string | boolean | undefined>;
}

type ProductCardProp = {
  product: Product;
}

export default function ProductCard({product}: ProductCardProp) {
  const isStock = !!product.stock

  return (
    <Link href={`/detail/${product.slug}`}>
      <div className="bg-white border-4 rounded-3xl border-black">
        <div className="px-10 py-5">
          <Image
            src={product.images.main}
            alt={product.name}
            width={400}
            height={200}
          />
          <div className="flex flex-col text-black pt-6">
            <div>
              {product.name}
            </div>
            <div>
              {product.price} €
            </div>
            <div>
              {isStock ? 'En stock' : 'Pas de stock'}
            </div>
            <div className="flex flex-row pt-2 gap-1 items-center">
              Vers le detail
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}