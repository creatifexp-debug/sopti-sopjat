import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request:Request){

const { searchParams } = new URL(request.url)

const category = searchParams.get("category")

let query = supabase
.from("products")
.select(`
id,
name,
sp,
image_url,
categories(name)
`)

if(category){

query = query.eq("categories.name",category)

}

const { data,error } = await query

if(error){

return NextResponse.json({error:error.message},{status:500})

}

return NextResponse.json(data)

}