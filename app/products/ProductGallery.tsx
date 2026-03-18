//app\products\ProductGallery.tsx
"use client"

import { useState } from "react"

export default function ProductGallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState(images[0])
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-3">

        {/* MAIN IMAGE */}
        <div
          className="w-full aspect-square bg-gray-100 rounded-xl overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <img
            src={selected}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        {/* THUMBNAILS */}
        <div className="flex gap-2 overflow-x-auto">

          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelected(img)}
              className={`w-16 h-16 object-cover rounded-md cursor-pointer ${
                selected === img ? "ring-2 ring-black" : ""
              }`}
            />
          ))}

        </div>
      </div>

      {/* FULLSCREEN VIEWER */}
      {open && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <img
            src={selected}
            className="max-h-[90%] max-w-[90%] object-contain"
          />
        </div>
      )}
    </>
  )
}