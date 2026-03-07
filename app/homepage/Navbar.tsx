"use client"

import { useState } from "react"

export default function Navbar(){

const [menuOpen,setMenuOpen] = useState(false)

return(

<nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">

<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

<div className="flex items-center space-x-3">

<div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center">
<span className="font-bold text-black">S</span>
</div>

<span className="font-bold text-lg tracking-widest hidden sm:block">
SOPTI-SOPJAT
</span>

</div>

<div className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-wide">

<a className="text-gray-300 hover:text-white">Mens</a>
<a className="text-gray-300 hover:text-white">Womens</a>
<a className="text-gray-300 hover:text-white">Kids</a>
<a className="text-gray-300 hover:text-white">Accessories</a>

</div>

<button
onClick={()=>setMenuOpen(!menuOpen)}
className="lg:hidden text-2xl"
>
☰
</button>

</div>

{menuOpen && (
<div className="lg:hidden bg-black p-4 space-y-3">

<div>Mens</div>
<div>Womens</div>
<div>Kids</div>
<div>Accessories</div>

</div>
)}

</nav>

)

}