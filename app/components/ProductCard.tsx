"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

export default function ProductCard({ product }: any) {

  const router = useRouter()

  return (

    <div
      onClick={() => router.push(`/products/${product.id}`)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition cursor-pointer overflow-hidden"
    >

      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">

        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition duration-300"
        />

      </div>

      <div className="p-4">

        <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-lg font-semibold text-black mt-2">
          ₹{product.sp}
        </p>

      </div>

    </div>
  )
}