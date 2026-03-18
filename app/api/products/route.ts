//app\api\products\route.ts
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {

  const { searchParams } = new URL(request.url)

  const category_id = searchParams.get("category_id")
  const exclude_id = searchParams.get("exclude_id")
  const sort = searchParams.get("sort")

  try {

    let query = supabase
      .from("products")
      .select(`
        id,
        name,
        sp,
        image_url,
        category_id,
        categories:categories!products_category_id_fkey(name)
      `)

    /* ✅ CATEGORY FILTER (CORRECT WAY) */
    if (category_id) {
      query = query.eq("category_id", category_id)
    }

    /* ✅ EXCLUDE CURRENT PRODUCT */
    if (exclude_id) {
      query = query.neq("id", exclude_id)
    }

    /* ✅ SORTING */
    if (sort === "low") {
      query = query.order("sp", { ascending: true })
    }

    if (sort === "high") {
      query = query.order("sp", { ascending: false })
    }

    /* ✅ LIMIT */
    query = query.limit(10)

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