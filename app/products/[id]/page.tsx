"use client"

import { useEffect,useState } from "react"
import { useParams } from "next/navigation"

import ProductGallery from "../../components/ProductGallery"
import WhatsappButton from "../../components/WhatsappButton"
//import RelatedProducts from "../../components/RelatedProducts"

export default function ProductPage(){

const { id } = useParams()

const [product,setProduct] = useState<any>(null)

useEffect(()=>{

fetch(`/api/product/${id}`)
.then(res=>res.json())
.then(data=>setProduct(data))

},[id])

if(!product){

return(
<div className="text-white p-20">
Loading...
</div>
)

}

const images = [

product.image_url,
...(product.product_images?.map((i:any)=>i.image_url) || [])

]

return(

<div className="bg-black text-white min-h-screen px-6 py-24">

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

<ProductGallery images={images}/>

<div>

<h1 className="text-4xl font-bold">
{product.name}
</h1>

<p className="text-gray-400 mt-3">
{product.categories?.name}
</p>

<div className="text-3xl font-bold text-cyan-400 mt-6">
₹{product.sp}
</div>

<p className="text-gray-400 mt-6 leading-relaxed">
{product.description || "Premium streetwear item."}
</p>

<div className="mt-10">

<WhatsappButton product={product}/>

</div>

</div>

</div>


</div>

)

}