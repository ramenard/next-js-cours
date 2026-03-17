"use client"

import Image from "next/image";
import {Product} from "@/components/ProductCard";
import {useState} from "react";

export default function ImageDetail({product}: { product: Product }) {
  const [urlImage, setUrlImage] = useState<string>(product.images.gallery[0]);

  return (
    <div>
      <Image className="rounded-3xl" src={urlImage} alt={product.name} width={700} height={300}/>
      <div className="flex flex-row gap-10">
        {product.images.gallery.map((imageUrl) => (
          <Image src={imageUrl} alt={product.name} width={200} height={1} key={imageUrl}
                 onClick={() => setUrlImage(imageUrl)}/>
        ))}
      </div>
    </div>
  )
}