//app\homepage\Categories.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"

type Category = {
  id: string
  name: string
  image_url?: string
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

  if (loading) {
    return (
      <section className="py-24 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900 rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (

    <section className="py-24 px-6 bg-black">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-14">
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Shop by Category
          </h2>
          <p className="text-gray-400 mt-3">
            Find your style in our latest collections
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">

          {categories.map((cat) => {

            const image =
              cat.image_url || "https://placehold.co/600x600"

            return (

              <Link
                key={cat.id}
                href={`/products?category_id=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden border border-zinc-800 hover:border-cyan-400 transition duration-300"
              >

                {/* IMAGE */}
                <div className="aspect-square relative overflow-hidden">

                  <Image
                    src={image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* TEXT */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">
                    {cat.name}
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