//app\api\products\route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const sort = searchParams.get("sort")

  try {

    let query = supabase
      .from("products")
      .select(`
        id,
        name,
        sp,
        image_url,
        categories:categories!products_category_id_fkey(name)
      `)

    /* CATEGORY FILTER */

    if (category) {
      query = query.eq("categories.name", category)
    }

    /* SORTING */

    if (sort === "low") {
      query = query.order("sp", { ascending: true })
    }

    if (sort === "high") {
      query = query.order("sp", { ascending: false })
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])

  } catch (err) {

    console.error("Server error:", err)

    return NextResponse.json([], { status: 200 })

  }

}