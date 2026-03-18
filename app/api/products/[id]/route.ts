// app/api/products/[id]/route.ts

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      sp,
      image_url,
      category_id,
      categories:categories!products_category_id_fkey(name),
      product_images(image_url)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error(error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}