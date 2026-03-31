//app\products\products-client.tsx
"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import ProductCard from "../components/ProductCard"

export default function ProductsClient() {

  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get("category_id")

  useEffect(() => {
    setActiveCategory(categoryParam || null)
  }, [categoryParam])

  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryParam || null
  )
  const [sort, setSort] = useState<string>("")

  /* ================= FETCH PRODUCTS ================= */

  const fetchProducts = async () => {

    let url = "/api/products?"

    if (activeCategory) {
      url += `category_id=${activeCategory}&`
    }

    if (sort) {
      url += `sort=${sort}`
    }

    console.log("Fetching:", url)

    try {
      const res = await fetch(url)
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      setProducts([])
    }
  }

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {

    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(Array.isArray(data) ? data : [])
      })
      .catch(() => setCategories([]))

  }, [])

  /* ================= FETCH PRODUCTS ================= */

  useEffect(() => {
    fetchProducts()
  }, [activeCategory, sort])

  /* ================= URL SYNC ================= */

  useEffect(() => {

    if (activeCategory) {
      router.push(`/products?category_id=${activeCategory}`)
    } else {
      router.push("/products")
    }

  }, [activeCategory, router])

  /* ================= UI ================= */

  return (

    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-4 sm:px-6 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Explore Products
            </h1>
            <p className="text-gray-500 mt-1">
              Discover curated collections
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm text-gray-700 focus:outline-none"
          >
            <option value="">Sort</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>

        </div>

        {/* STICKY CATEGORY BAR */}
        <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl p-3 mb-8 shadow-sm">

          <div className="flex gap-3 overflow-x-auto no-scrollbar">

            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                activeCategory === null
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>

            {categories.map((cat: any) => (

              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition ${
                  activeCategory === cat.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat.name}
              </button>

            ))}

          </div>

        </div>

        {/* PRODUCTS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>

        {/* EMPTY STATE */}
        {products.length === 0 && (
          <div className="text-center text-gray-400 mt-20">
            No products found
          </div>
        )}

      </div>

    </div>
  )
}