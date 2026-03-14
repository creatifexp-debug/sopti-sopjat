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

  const [mainImage,setMainImage] = useState<File | null>(null)
  const [gallery,setGallery] = useState<File[]>([])

  const [loading,setLoading] = useState(false)

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
    const { data } = await supabase.from("categories").select("*")
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
    const { data } = await supabase.from("sizes").select("*")
    if(data) setSizes(data)
  }

  const loadMaterials = async ()=>{
    const { data } = await supabase.from("materials").select("*")
    if(data) setMaterials(data)
  }



  const uploadImage = async(productId:string,file:File)=>{

    const filePath = `${productId}/${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("product-images")
      .upload(filePath,file)

    if(error) throw error

    const { data } = supabase.storage
      .from("product-images")
      .getPublicUrl(filePath)

    return data.publicUrl

  }



  const addProduct = async ()=>{

    setLoading(true)

    try{

      const { data:product,error } = await supabase
        .from("products")
        .insert([{
          name,
          description,
          category_id:selectedCategory,
          sub_category_id:selectedSubCategory,
          size_id:selectedSize,
          material_id:selectedMaterial,
          color,
          cp:Number(cp),
          sp:Number(sp),
          stock:Number(stock)
        }])
        .select()
        .single()

      if(error){
        alert("Error creating product")
        console.error(error)
        return
      }

      const productId = product.id

      let mainImageUrl = null

      if(mainImage){
        mainImageUrl = await uploadImage(productId,mainImage)
      }

      if(mainImageUrl){

        await supabase
          .from("products")
          .update({ image_url:mainImageUrl })
          .eq("id",productId)

      }

      if(gallery.length){

        const galleryRows:any[] = []

        for(let i=0;i<gallery.length;i++){

          const url = await uploadImage(productId,gallery[i])

          galleryRows.push({
            product_id:productId,
            image_url:url,
            sort_order:i
          })

        }

        await supabase
          .from("product_images")
          .insert(galleryRows)

      }

      alert("Product Created Successfully")

    }catch(err){

      console.error(err)

    }

    setLoading(false)

  }



  return(

    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl font-semibold mb-8">
        Add Product
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <input
          placeholder="Product Name"
          className="border rounded-lg p-3"
          onChange={(e)=>setName(e.target.value)}
        />

        <input
          placeholder="Color"
          className="border rounded-lg p-3"
          onChange={(e)=>setColor(e.target.value)}
        />

        <input
          placeholder="Cost Price"
          className="border rounded-lg p-3"
          onChange={(e)=>setCp(e.target.value)}
        />

        <input
          placeholder="Selling Price"
          className="border rounded-lg p-3"
          onChange={(e)=>setSp(e.target.value)}
        />

        <input
          placeholder="Stock"
          className="border rounded-lg p-3"
          onChange={(e)=>setStock(e.target.value)}
        />

      </div>


      <textarea
        placeholder="Product Description"
        className="border rounded-lg p-3 w-full mt-6"
        onChange={(e)=>setDescription(e.target.value)}
      />


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        <select
          className="border rounded-lg p-3"
          onChange={(e)=>{
            setSelectedCategory(e.target.value)
            loadSubCategories(e.target.value)
          }}
        >
          <option>Select Category</option>
          {categories.map((c)=>(
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>


        <select
          className="border rounded-lg p-3"
          onChange={(e)=>setSelectedSubCategory(e.target.value)}
        >
          <option>Select Sub Category</option>
          {subCategories.map((sc)=>(
            <option key={sc.id} value={sc.id}>{sc.name}</option>
          ))}
        </select>


        <select
          className="border rounded-lg p-3"
          onChange={(e)=>setSelectedSize(e.target.value)}
        >
          <option>Select Size</option>
          {sizes.map((s)=>(
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>


        <select
          className="border rounded-lg p-3"
          onChange={(e)=>setSelectedMaterial(e.target.value)}
        >
          <option>Select Material</option>
          {materials.map((m)=>(
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>

      </div>



      <div className="mt-8">

        <label className="block font-medium mb-2">
          Main Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e)=>{
            if(e.target.files){
              setMainImage(e.target.files[0])
            }
          }}
        />

      </div>



      <div className="mt-6">

        <label className="block font-medium mb-2">
          Gallery Images
        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e)=>{
            if(e.target.files){
              setGallery(Array.from(e.target.files))
            }
          }}
        />

      </div>



      <button
        onClick={addProduct}
        disabled={loading}
        className="mt-10 bg-black text-white px-6 py-3 rounded-lg"
      >

        {loading ? "Saving..." : "Save Product"}

      </button>

    </div>

  )

}