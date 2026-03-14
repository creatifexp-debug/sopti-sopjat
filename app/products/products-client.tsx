"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "../components/ProductCard"

export default function ProductsClient() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const categoryParam = searchParams.get("category")

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(categoryParam)
  const [sort, setSort] = useState<string>("")



  /* ---------------- FETCH PRODUCTS ---------------- */

  const fetchProducts = async () => {

    let url = "/api/products?"

    if (activeCategory) {
      url += `category=${encodeURIComponent(activeCategory)}&`
    }

    if (sort) {
      url += `sort=${sort}`
    }

    try {

      const res = await fetch(url)
      const data = await res.json()

      if (Array.isArray(data)) {
        setProducts(data)
      } else {
        console.error("Products API error:", data)
        setProducts([])
      }

    } catch (error) {

      console.error("Fetch failed:", error)
      setProducts([])

    }

  }



  /* ---------------- FETCH PRODUCTS WHEN FILTER CHANGES ---------------- */

  useEffect(() => {

    fetchProducts()

  }, [activeCategory, sort])



  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {

    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {

        if (Array.isArray(data)) {
          setCategories(data)
        } else {
          setCategories([])
        }

      })
      .catch(() => setCategories([]))

  }, [])



  /* ---------------- SYNC URL ---------------- */

  useEffect(() => {

    if (activeCategory) {

      router.push(`/products?category=${encodeURIComponent(activeCategory)}`)

    } else {

      router.push("/products")

    }

  }, [activeCategory, router])



  return (

    <div className="bg-black text-white min-h-screen px-6 py-24">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

          <h1 className="text-4xl font-bold">
            Products
          </h1>

          {/* Sort */}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 px-4 py-2 rounded-lg text-white"
          >

            <option value="">
              Sort
            </option>

            <option value="low">
              Price: Low → High
            </option>

            <option value="high">
              Price: High → Low
            </option>

          </select>

        </div>



        {/* Category Filters */}

        <div className="flex flex-wrap gap-3 mb-10 overflow-x-auto pb-2">

          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
              activeCategory === null
                ? "bg-white text-black"
                : "border-zinc-700 text-gray-300"
            }`}
          >
            All
          </button>


          {categories.map((cat: any) => {

            const name = cat.name

            return (

              <button
                key={name}
                onClick={() => setActiveCategory(name)}
                className={`px-4 py-2 rounded-full border text-sm whitespace-nowrap ${
                  activeCategory === name
                    ? "bg-white text-black"
                    : "border-zinc-700 text-gray-300"
                }`}
              >
                {name}
              </button>

            )

          })}

        </div>



        {/* Products Grid */}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {Array.isArray(products) && products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>



        {/* Empty State */}

        {products.length === 0 && (

          <div className="text-center text-gray-500 mt-20">

            No products found

          </div>

        )}

      </div>

    </div>

  )

}