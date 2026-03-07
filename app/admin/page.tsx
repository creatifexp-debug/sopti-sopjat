"use client"

import { useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminDashboard(){

 const router = useRouter()

 useEffect(()=>{

  const checkUser = async () => {

   const { data } = await supabase.auth.getUser()

   if(!data.user){
    router.push("/admin/login")
   }

  }

  checkUser()

 },[])

 return (

  <div>

   <h1 className="text-3xl font-bold mb-6">
   Dashboard
   </h1>

   <div className="grid grid-cols-3 gap-6">

    <div className="border p-6 rounded-lg bg-white shadow">
     <h2 className="text-lg font-semibold">Total Products</h2>
     <p className="text-2xl mt-2">--</p>
    </div>

    <div className="border p-6 rounded-lg bg-white shadow">
     <h2 className="text-lg font-semibold">Orders</h2>
     <p className="text-2xl mt-2">--</p>
    </div>

    <div className="border p-6 rounded-lg bg-white shadow">
     <h2 className="text-lg font-semibold">Revenue</h2>
     <p className="text-2xl mt-2">--</p>
    </div>

   </div>

  </div>

 )

}