//app\admin\products\edit\[id]\page.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../../../lib/supabase"
import { useParams, useRouter } from "next/navigation"

export default function EditProduct(){

const { id } = useParams()
const router = useRouter()

const [name,setName] = useState("")
const [description,setDescription] = useState("")
const [color,setColor] = useState("")
const [cp,setCp] = useState("")
const [sp,setSp] = useState("")
const [stock,setStock] = useState("")

const [images,setImages] = useState<File[]>([])
const [gallery,setGallery] = useState<any[]>([])

const [categories,setCategories] = useState<any[]>([])
const [subCategories,setSubCategories] = useState<any[]>([])
const [sizes,setSizes] = useState<any[]>([])
const [materials,setMaterials] = useState<any[]>([])

const [selectedCategory,setSelectedCategory] = useState("")
const [selectedSubCategory,setSelectedSubCategory] = useState("")
const [selectedSize,setSelectedSize] = useState("")
const [selectedMaterial,setSelectedMaterial] = useState("")


useEffect(()=>{

loadProduct()
loadGallery()
loadCategories()
loadSizes()
loadMaterials()

},[])



const loadProduct = async()=>{

const {data,error} = await supabase
.from("products")
.select("*")
.eq("id",id)
.single()

if(error){
console.error(error)
return
}

setName(data.name)
setDescription(data.description || "")
setColor(data.color || "")
setCp(data.cp)
setSp(data.sp)
setStock(data.stock)

setSelectedCategory(data.category_id)
setSelectedSubCategory(data.sub_category_id)
setSelectedSize(data.size_id)
setSelectedMaterial(data.material_id)

loadSubCategories(data.category_id)

}



const loadGallery = async()=>{

const {data,error} = await supabase
.from("product_images")
.select("*")
.eq("product_id",id)
.order("sort_order",{ascending:true})

if(error){
console.error(error)
return
}

setGallery(data)

}



const loadCategories = async()=>{

const {data} = await supabase
.from("categories")
.select("*")

if(data) setCategories(data)

}



const loadSubCategories = async(categoryId:string)=>{

const {data} = await supabase
.from("sub_categories")
.select("*")
.eq("category_id",categoryId)

if(data) setSubCategories(data)

}



const loadSizes = async()=>{

const {data} = await supabase
.from("sizes")
.select("*")

if(data) setSizes(data)

}



const loadMaterials = async()=>{

const {data} = await supabase
.from("materials")
.select("*")

if(data) setMaterials(data)

}



const uploadImages = async()=>{

if(!images.length) return

const rows:any[] = []
let mainImage = null

for(let i=0;i<images.length;i++){

const file = images[i]

const filePath = `${id}/${Date.now()}-${file.name}`

const {error} = await supabase.storage
.from("product-images")
.upload(filePath,file)

if(error){
console.error(error)
continue
}

const {data} = supabase.storage
.from("product-images")
.getPublicUrl(filePath)

const url = data.publicUrl

if(i===0 && gallery.length===0){
mainImage = url
}

rows.push({
product_id:id,
image_url:url,
sort_order:gallery.length+i
})

}

if(rows.length){

await supabase
.from("product_images")
.insert(rows)

}

if(mainImage){

await supabase
.from("products")
.update({image_url:mainImage})
.eq("id",id)

}

loadGallery()

}



const deleteImage = async(imageId:string)=>{

const confirmDelete = confirm("Delete this image?")

if(!confirmDelete) return

await supabase
.from("product_images")
.delete()
.eq("id",imageId)

loadGallery()

}



const updateProduct = async()=>{

const {error} = await supabase
.from("products")
.update({

name:name,
description:description,
category_id:selectedCategory,
sub_category_id:selectedSubCategory,
size_id:selectedSize,
material_id:selectedMaterial,
color:color,
cp:Number(cp),
sp:Number(sp),
stock:Number(stock)

})
.eq("id",id)

if(error){
console.error(error)
alert("Update failed")
return
}

await uploadImages()

alert("Product Updated")

router.push("/admin/products")

}



return(

<div className="max-w-2xl text-black">

<h1 className="text-3xl font-bold mb-6">
Edit Product
</h1>


<div className="flex flex-col gap-4">

<input
className="border p-2"
value={name}
placeholder="Product Name"
onChange={(e)=>setName(e.target.value)}
/>


<textarea
className="border p-2"
value={description}
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
/>


<select
className="border p-2"
value={selectedCategory}
onChange={(e)=>{
setSelectedCategory(e.target.value)
loadSubCategories(e.target.value)
}}
>

<option>Select Category</option>

{categories.map((c)=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>



<select
className="border p-2"
value={selectedSubCategory}
onChange={(e)=>setSelectedSubCategory(e.target.value)}
>

<option>Select Sub Category</option>

{subCategories.map((sc)=>(
<option key={sc.id} value={sc.id}>
{sc.name}
</option>
))}

</select>



<select
className="border p-2"
value={selectedSize}
onChange={(e)=>setSelectedSize(e.target.value)}
>

<option>Select Size</option>

{sizes.map((s)=>(
<option key={s.id} value={s.id}>
{s.name}
</option>
))}

</select>



<select
className="border p-2"
value={selectedMaterial}
onChange={(e)=>setSelectedMaterial(e.target.value)}
>

<option>Select Material</option>

{materials.map((m)=>(
<option key={m.id} value={m.id}>
{m.name}
</option>
))}

</select>



<input
className="border p-2"
value={color}
placeholder="Color"
onChange={(e)=>setColor(e.target.value)}
/>


<input
className="border p-2"
value={cp}
placeholder="Cost Price"
onChange={(e)=>setCp(e.target.value)}
/>


<input
className="border p-2"
value={sp}
placeholder="Selling Price"
onChange={(e)=>setSp(e.target.value)}
/>


<input
className="border p-2"
value={stock}
placeholder="Stock"
onChange={(e)=>setStock(e.target.value)}
/>



<h2 className="font-semibold mt-6">
Product Images
</h2>


<div className="grid grid-cols-4 gap-4">

{gallery.map((img)=>(
<div key={img.id} className="relative">

<img
src={img.image_url}
className="w-full h-24 object-cover"
/>

<button
onClick={()=>deleteImage(img.id)}
className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2"
>
X
</button>

</div>
))}

</div>



<input
type="file"
multiple
accept="image/png,image/jpeg,image/webp"
onChange={(e)=>{
if(e.target.files){
setImages(Array.from(e.target.files))
}
}}
/>



<button
onClick={updateProduct}
className="bg-black text-white p-3 mt-4"
>
Update Product
</button>


</div>

</div>

)

}