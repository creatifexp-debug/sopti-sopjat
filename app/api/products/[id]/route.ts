import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(
request:Request,
{ params }: { params: { id:string } }
){

const { data,error } = await supabase
.from("products")
.select(`
id,
name,
description,
sp,
image_url,
categories(name),
product_images(image_url)
`)
.eq("id",params.id)
.single()

if(error){

return NextResponse.json({error:error.message},{status:500})

}

return NextResponse.json(data)

}