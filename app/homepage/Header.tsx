"use client"

import Link from "next/link"

export default function Header() {

  return (

    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-center items-center">

        <Link href="/" className="group">

          <h1 className="text-2xl sm:text-3xl font-bold tracking-[3px] text-gray-900 transition">

            SOPTI SOPJAT

          </h1>

          {/* subtle underline hover */}
          <div className="h-[2px] w-0 bg-gradient-to-r from-black to-gray-500 group-hover:w-full transition-all duration-300 mx-auto mt-1" />

        </Link>

      </div>

    </header>

  )
}