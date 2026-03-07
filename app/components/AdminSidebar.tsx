"use client"

import Link from "next/link"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminSidebar(){

 const router = useRouter()

 const logout = async () => {
  await supabase.auth.signOut()
  router.push("/admin/login")
 }

 return (

  <div className="w-64 h-screen bg-gray-100 border-r p-6 text-black">

   <h2 className="text-xl font-bold mb-8">
   SOPTI ADMIN
   </h2>

   <nav className="flex flex-col gap-4">

    <Link href="/admin" className="hover:font-semibold">
     Dashboard
    </Link>

    <Link href="/admin/products" className="hover:font-semibold">
     Products
    </Link>

    <Link href="/admin/add-product" className="hover:font-semibold">
     Add Product
    </Link>

    <button
     onClick={logout}
     className="text-left text-red-600 mt-10"
    >
     Logout
    </button>

   </nav>

  </div>

 )

}