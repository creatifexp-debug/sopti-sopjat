//app\products\[id]\page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MessageCircle } from "lucide-react"

import ProductGallery from "../../components/ProductGallery"
import ProductCard from "../../components/ProductCard"

export default function ProductPage() {

  const { id } = useParams()

  const [product, setProduct] = useState<any>(null)
  const [related, setRelated] = useState<any[]>([])

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {

    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then((data) => {

        setProduct(data)

        /* ✅ FIXED RELATED PRODUCTS (UUID BASED) */
        if (data?.category_id) {

          fetch(`/api/products?category_id=${data.category_id}`)
            .then(res => res.json())
            .then(items => {

              const filtered = items
                .filter((p: any) => p.id !== data.id)
                .slice(0, 10)

              setRelated(filtered)

            })
        }

      })

  }, [id])

  if (!product) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading...
      </div>
    )
  }

  /* ================= IMAGES ================= */

  const images = [
    product.image_url,
    ...(product.product_images?.map((i: any) => i.image_url) || [])
  ]

  /* ================= WHATSAPP ================= */

  const handleWhatsApp = () => {

      const phone = "916909277994" // 🔴 PUT YOUR NUMBER HERE

      const url = window.location.href

      const message = `Hello, I'm interested in this product 👇

  ${product.name}
  Price: ₹${product.sp}

  Link: ${url}`

      const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

      window.open(whatsappUrl, "_blank")
    }

  return (

    <div className="bg-white min-h-screen">

      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ================= GALLERY ================= */}

          <div>

            {/* 🔥 MOBILE SCROLL */}
            <div className="lg:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2">

              {images.map((img: string, index: number) => (

                <div
                  key={index}
                  className="min-w-full h-[320px] relative snap-center rounded-xl overflow-hidden bg-gray-100"
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

              ))}

            </div>

            {/* DESKTOP GALLERY */}
            <div className="hidden lg:block">
              <ProductGallery images={images} />
            </div>

          </div>

          {/* ================= DETAILS ================= */}

          <div className="flex flex-col justify-between">

            <div>

              <h1 className="text-2xl font-semibold text-gray-900 leading-snug">
                {product.name}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {product.categories?.name}
              </p>

              {/* PRICE */}
              <div className="mt-4 flex items-center gap-3">

                <span className="text-2xl font-bold text-black">
                  ₹{product.sp}
                </span>

                <span className="text-sm text-gray-400 line-through">
                  ₹{Math.round(product.sp * 1.4)}
                </span>

              </div>

              {/* DESCRIPTION */}
              <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                {product.description || "Premium quality product."}
              </p>

            </div>

            {/* WHATSAPP BUTTON */}
            <button
              onClick={handleWhatsApp}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white 
              bg-gradient-to-r from-green-500 via-green-600 to-green-500 
              hover:from-green-600 hover:to-green-700 
              active:scale-95 transition-all duration-200 shadow-md"
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </button>

          </div>

        </div>

        {/* ================= RELATED PRODUCTS ================= */}

        <div className="mt-10">

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Similar Products
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-2">

            {related.map((item) => (
              <div key={item.id} className="min-w-[160px]">
                <ProductCard product={item} />
              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}