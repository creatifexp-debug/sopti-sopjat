import { Suspense } from "react"
import ProductsClient from "./products-client"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading products...</div>}>
      <ProductsClient />
    </Suspense>
  )
}