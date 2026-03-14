"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Product = {
  id: string
  name: string
  sp: number
  image_url?: string
}

export default function NewDrops() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const res = await fetch("/api/products")
        const data = await res.json()

        if (Array.isArray(data)) {
          setProducts(data.slice(0,10))
        }

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }

    }

    fetchProducts()

  }, [])



  return (

    <section className="py-28 px-6 bg-[#fafafa]">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-16">

          <h2 className="text-4xl lg:text-5xl font-semibold text-zinc-900">
            New Drops
          </h2>

          <p className="text-zinc-500 mt-4">
            Discover the newest additions to the collection
          </p>

        </div>



        {/* Grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">

          {loading &&

            Array.from({ length: 10 }).map((_, i) => (

              <div
                key={i}
                className="aspect-[3/4] bg-white rounded-2xl animate-pulse border border-zinc-100"
              />

            ))

          }



          {!loading && products.map((product) => (

            <div
              key={product.id}
              className="group bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-lg transition duration-300"
            >

              {/* Image */}

              <div className="relative h-64 overflow-hidden bg-zinc-100">

                <Image
                  src={product.image_url || "/placeholder.png"}
                  alt={product.name}
                  fill
                  sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />

              </div>



              {/* Content */}

              <div className="p-5">

                <h3 className="text-zinc-900 font-medium text-sm lg:text-base line-clamp-2">
                  {product.name}
                </h3>



                <div className="flex items-center justify-between mt-4">

                  <span className="text-lg font-semibold text-zinc-900">
                    ₹{product.sp}
                  </span>



                  <button className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-300 text-zinc-700 hover:bg-black hover:text-white transition">

                    +

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}