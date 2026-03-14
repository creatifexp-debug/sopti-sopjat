//app\admin\products\page.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

type Product = {
  id: string
  name: string
  sp: number
  stock: number
  image_url?: string
  category?: string
  sub_category?: string
}

export default function ProductsPage(){

const [products,setProducts] = useState<Product[]>([])
const [loading,setLoading] = useState(true)
const [search,setSearch] = useState("")

useEffect(()=>{
fetchProducts()
},[])


/* ---------------- FETCH PRODUCTS ---------------- */

const fetchProducts = async()=>{

setLoading(true)

const {data,error} = await supabase
.from("products_view")
.select("*")
.order("id",{ascending:false})

console.log("Supabase data:",data)

if(error){
console.error("Error fetching products:",error.message)
}

if(data){
setProducts(data)
}

setLoading(false)

}



/* ---------------- DELETE PRODUCT ---------------- */

const deleteProduct = async(id:string)=>{

const confirmDelete = confirm("Delete this product?")

if(!confirmDelete) return

const {error} = await supabase
.from("products")
.delete()
.eq("id",id)

if(error){

alert("Error deleting product")
console.error(error)

return

}

setProducts(products.filter(p=>p.id!==id))

}



/* ---------------- SEARCH FILTER ---------------- */

const filteredProducts = products.filter((p)=>{

if(!search) return true

return p.name.toLowerCase().includes(search.toLowerCase())

})



return(

<div className="max-w-7xl mx-auto px-6 py-10 text-black">


{/* HEADER */}

<div className="flex items-center justify-between mb-8">

<h1 className="text-3xl font-semibold">
Products
</h1>

<Link
href="/admin/add-product"
className="bg-black text-white px-5 py-2 rounded-lg"
>
+ Add Product
</Link>

</div>



{/* SEARCH */}

<input
placeholder="Search products..."
className="border rounded-lg px-4 py-2 w-full md:w-80 mb-10"
onChange={(e)=>setSearch(e.target.value)}
/>



{/* LOADING */}

{loading && (

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

{Array.from({length:10}).map((_,i)=>(

<div
key={i}
className="h-64 bg-gray-200 rounded-xl animate-pulse"
/>

))}

</div>

)}



{/* PRODUCTS GRID */}

{!loading && (

<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

{filteredProducts.map((p)=>(

<div
key={p.id}
className="border rounded-xl bg-white shadow-sm hover:shadow-md transition overflow-hidden"
>

<img
src={p.image_url || "https://placehold.co/600x600"}
className="w-full h-40 object-cover"
/>


<div className="p-4">

<h2 className="font-medium text-sm line-clamp-2">
{p.name}
</h2>


<p className="text-xs text-gray-500 mt-1">
{p.category} / {p.sub_category}
</p>


<p className="mt-2 font-semibold">
₹{p.sp}
</p>


<p className="text-xs text-gray-500">
Stock: {p.stock}
</p>


<div className="flex gap-2 mt-3">

<Link
href={`/admin/products/edit/${p.id}`}
className="flex-1 bg-black text-white text-xs py-1 rounded text-center"
>
Edit
</Link>


<button
onClick={()=>deleteProduct(p.id)}
className="flex-1 bg-red-500 text-white text-xs py-1 rounded"
>
Delete
</button>

</div>

</div>

</div>

))}



{filteredProducts.length===0 && (

<div className="col-span-full text-center py-20 text-gray-500">

No products found

</div>

)}

</div>

)}

</div>

)

}