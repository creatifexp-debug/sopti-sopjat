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
        categories(name)
      `)
      .eq("active", true)

    /* ✅ UUID SAFE FILTER */
    if (category_id) {
      query = query.eq("category_id", category_id)
    }

    /* ✅ SORT */
    if (sort === "low") {
      query = query.order("sp", { ascending: true })
    }

    if (sort === "high") {
      query = query.order("sp", { ascending: false })
    }

    const { data, error } = await query.limit(50)

    if (error) {
      console.error(error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data ?? [])

  } catch (err) {

    console.error(err)
    return NextResponse.json([], { status: 200 })

  }
}