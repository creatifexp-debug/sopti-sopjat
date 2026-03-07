//app\admin\add-product\page.tsx
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function AddProduct() {

  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [color,setColor] = useState("")
  const [cp,setCp] = useState("")
  const [sp,setSp] = useState("")
  const [stock,setStock] = useState("")

  const [images,setImages] = useState<File[]>([])

  const [categories,setCategories] = useState<any[]>([])
  const [subCategories,setSubCategories] = useState<any[]>([])
  const [sizes,setSizes] = useState<any[]>([])
  const [materials,setMaterials] = useState<any[]>([])

  const [selectedCategory,setSelectedCategory] = useState("")
  const [selectedSubCategory,setSelectedSubCategory] = useState("")
  const [selectedSize,setSelectedSize] = useState("")
  const [selectedMaterial,setSelectedMaterial] = useState("")

  useEffect(()=>{
    loadCategories()
    loadSizes()
    loadMaterials()
  },[])


  const loadCategories = async ()=>{

    const { data } = await supabase
      .from("categories")
      .select("*")

    if(data) setCategories(data)

  }


  const loadSubCategories = async(categoryId:string)=>{

    const { data } = await supabase
      .from("sub_categories")
      .select("*")
      .eq("category_id",categoryId)

    if(data) setSubCategories(data)

  }


  const loadSizes = async ()=>{

    const { data } = await supabase
      .from("sizes")
      .select("*")

    if(data) setSizes(data)

  }


  const loadMaterials = async ()=>{

    const { data } = await supabase
      .from("materials")
      .select("*")

    if(data) setMaterials(data)

  }



  const addProduct = async ()=>{

    try{

      const { data:product, error } = await supabase
        .from("products")
        .insert([{
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
        }])
        .select()
        .single()

      if(error){
        console.error(error)
        alert("Error creating product")
        return
      }

      const productId = product.id

      let mainImage = null

      if(images.length){

        const galleryRows:any[] = []

        for(let i=0;i<images.length;i++){

          const file = images[i]

          const filePath = `${productId}/${Date.now()}-${file.name}`

          const { error:uploadError } = await supabase.storage
            .from("product-images")
            .upload(filePath,file)

          if(uploadError){
            console.error(uploadError)
            continue
          }

          const { data } = supabase.storage
            .from("product-images")
            .getPublicUrl(filePath)

          const url = data.publicUrl

          if(i===0) mainImage = url

          galleryRows.push({
            product_id:productId,
            image_url:url,
            sort_order:i
          })

        }

        if(galleryRows.length){

          await supabase
            .from("product_images")
            .insert(galleryRows)

        }

      }

      if(mainImage){

        await supabase
          .from("products")
          .update({ image_url:mainImage })
          .eq("id",productId)

      }

      alert("Product Created")

    }catch(err){
      console.error(err)
    }

  }



  return(

    <div className="max-w-2xl text-black">

      <h1 className="text-3xl font-bold mb-6">
        Add Product
      </h1>

      <div className="flex flex-col gap-4">

        <input
          placeholder="Product Name"
          className="border p-2"
          onChange={(e)=>setName(e.target.value)}
        />

        <textarea
          placeholder="Description"
          className="border p-2"
          onChange={(e)=>setDescription(e.target.value)}
        />

        <select
          className="border p-2"
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
          placeholder="Color"
          className="border p-2"
          onChange={(e)=>setColor(e.target.value)}
        />

        <input
          placeholder="Cost Price"
          className="border p-2"
          onChange={(e)=>setCp(e.target.value)}
        />

        <input
          placeholder="Selling Price"
          className="border p-2"
          onChange={(e)=>setSp(e.target.value)}
        />

        <input
          placeholder="Stock"
          className="border p-2"
          onChange={(e)=>setStock(e.target.value)}
        />

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
          onClick={addProduct}
          className="bg-black text-white p-3"
        >
          Save Product
        </button>

      </div>

    </div>

  )

}