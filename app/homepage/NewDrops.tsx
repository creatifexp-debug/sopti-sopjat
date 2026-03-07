"use client"

import { useEffect,useState } from "react"

export default function NewDrops(){

const [products,setProducts] = useState<any[]>([])

useEffect(()=>{

fetch("/api/products")
.then(res=>res.json())
.then(data=>setProducts(data))

},[])

return(

<section className="py-20 px-6">

<div className="max-w-7xl mx-auto">

<h2 className="text-4xl font-bold mb-12 text-center">
New Drops
</h2>

<div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

{products.map((product)=>(

<div
key={product.id}
className="bg-black rounded-xl overflow-hidden border border-gray-800"
>

<img
src={product.image_url || "https://placehold.co/600x600"}
className="w-full h-60 object-cover"
/>

<div className="p-4">

<h3 className="text-white">
{product.name}
</h3>

<div className="flex justify-between mt-3">

<span className="text-cyan-400 font-bold">
₹{product.sp}
</span>

<button className="text-white">
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