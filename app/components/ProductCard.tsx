"use client"

import Link from "next/link"

export default function ProductCard({product}:any){

return(

<Link
href={`/products/${product.id}`}
className="group block bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-cyan-400 transition duration-300"
>

<div className="aspect-square overflow-hidden">

<img
src={product.image_url || "https://placehold.co/600x600"}
className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
/>

</div>

<div className="p-4">

<h3 className="text-white text-sm font-medium truncate">
{product.name}
</h3>

<p className="text-cyan-400 font-bold mt-2">
₹{product.sp}
</p>

</div>

</Link>

)

}