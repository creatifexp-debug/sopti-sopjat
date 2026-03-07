"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"
import Link from "next/link"

export default function ProductsPage(){

const [products,setProducts] = useState<any[]>([])
const [categories,setCategories] = useState<any[]>([])
const [selectedCategory,setSelectedCategory] = useState("")

useEffect(()=>{
fetchProducts()
fetchCategories()
},[])


const fetchProducts = async()=>{

const {data,error} = await supabase
.from("products")
.select(`
id,
name,
sp,
stock,
image_url,
category_id,
categories(name),
sub_categories(name)
`)

console.log(data,error)

if(data) setProducts(data)

}


const fetchCategories = async()=>{

const {data,error} = await supabase
.from("categories")
.select("*")

console.log(data,error)

if(data) setCategories(data)

}


const deleteProduct = async(id:string)=>{

const confirmDelete = confirm("Delete this product?")

if(!confirmDelete) return

const {error} = await supabase
.from("products")
.delete()
.eq("id",id)

console.log(error)

if(!error){
alert("Product deleted")
fetchProducts()
}

}


return(

<div>

<h1 className="text-3xl font-bold mb-6 text-black">
Products
</h1>


{/* CATEGORY FILTER */}

<select
className="border p-2 mb-6 text-black"
onChange={(e)=>setSelectedCategory(e.target.value)}
>

<option value="">All Categories</option>

{categories.map((c)=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>



{/* PRODUCTS GRID */}

<div className="grid grid-cols-4 gap-6">

{products
.filter((p)=>
selectedCategory
? p.category_id === selectedCategory
: true
)
.map((p)=>(

<div
key={p.id}
className="border rounded-lg bg-white shadow p-4 text-black"
>

<img
src={p.image_url}
className="w-full h-40 object-cover mb-3"
/>

<h2 className="font-semibold">
{p.name}
</h2>

<p className="text-sm text-gray-600">
{p.categories?.name} / {p.sub_categories?.name}
</p>

<p className="mt-2 font-bold">
₹{p.sp}
</p>

<p className="text-sm">
Stock: {p.stock}
</p>


<Link
href={`/admin/products/edit/${p.id}`}
className="block mt-3 bg-black text-white text-center py-1 rounded"
>
Edit
</Link>


<button
onClick={()=>deleteProduct(p.id)}
className="mt-3 bg-red-500 text-white px-3 py-1 rounded"
>
Delete
</button>

</div>

))}

</div>

</div>

)

}