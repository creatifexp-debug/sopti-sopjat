"use client"

import { usePathname } from "next/navigation"
import Header from "../homepage/Header"

export default function HeaderWrapper() {

  const pathname = usePathname()

  // ❌ Hide on admin routes
  if (pathname.startsWith("/admin")) {
    return null
  }

  return <Header />
}