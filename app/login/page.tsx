"use client"

import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useRouter } from "next/navigation"

export default function AdminLogin() {

  const router = useRouter()

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async () => {

    console.log("Login attempt:", email)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log("Supabase response:", data)
    console.log("Supabase error:", error)

    if(error){
      alert(error.message)
      return
    }

    console.log("Login successful")

    router.push("/admin")

  }

  return (

    <div className="flex h-screen items-center justify-center bg-gray-100">

      <div className="border bg-white p-8 rounded-lg w-80 shadow text-black">

        <h1 className="text-xl font-semibold mb-4 text-black">
          Admin Login
        </h1>

        <input
          className="border w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border w-full p-2 mb-3 text-black"
          placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-black text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  )
}