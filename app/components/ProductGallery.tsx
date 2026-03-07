"use client"

import { useState } from "react"

export default function ProductGallery({images}:any){

const [active,setActive] = useState(images?.[0])

return(

<div>

<img
src={active}
className="w-full rounded-xl object-cover"
/>

<div className="flex gap-3 mt-4 overflow-x-auto">

{images?.map((img:any)=>(
<img
key={img}
src={img}
onClick={()=>setActive(img)}
className={`w-20 h-20 rounded-lg object-cover cursor-pointer border ${
active===img ? "border-cyan-400" : "border-zinc-700"
}`}
/>
))}

</div>

</div>

)

}