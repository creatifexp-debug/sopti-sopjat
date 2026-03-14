//app\homepage\Categories.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Category = {
  id?: string
  name: string
}

export default function Categories() {

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const fetchCategories = async () => {
      try {

        const res = await fetch("/api/categories")
        const data = await res.json()

        if (Array.isArray(data)) {
          setCategories(data)
        }

      } catch (error) {
        console.error("Failed to load categories", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()

  }, [])



  const categoryImages: Record<string, string> = {

    Caps:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800",

    Hoodies:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",

    "T-Shirts":
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800",

    Jackets:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",

    Shorts:
      "https://images.unsplash.com/photo-1516826957135-700dedea698c?w=800",

    Accessories:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",

  }



  if (loading) {

    return (

      <section className="py-24 px-6 bg-black">

        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

            {Array.from({ length: 6 }).map((_, i) => (

              <div
                key={i}
                className="aspect-square bg-zinc-900 rounded-2xl animate-pulse"
              />

            ))}

          </div>

        </div>

      </section>

    )

  }



  return (

    <section className="py-24 px-6 bg-black">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-14">

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Shop by Category
          </h2>

          <p className="text-gray-400 mt-3">
            Find your style in our latest collections
          </p>

        </div>



        {/* Grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

          {categories.map((cat) => {

            const name = cat.name
            const image =
              categoryImages[name] ||
              "https://placehold.co/600x600"

            return (

              <Link
                key={name}
                href={`/products?category=${encodeURIComponent(name)}`}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-400 transition duration-300"
              >

                {/* Image */}

                <div className="aspect-square overflow-hidden">

                  <Image
                    src={image}
                    alt={name}
                    fill
                    sizes="(max-width:768px) 50vw, (max-width:1200px) 33vw, 16vw"
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>



                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />



                {/* Text */}

                <div className="absolute bottom-4 left-4 text-white">

                  <h3 className="font-semibold text-lg">
                    {name}
                  </h3>

                  <p className="text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                    Explore →
                  </p>

                </div>

              </Link>

            )

          })}

        </div>

      </div>

    </section>

  )

}