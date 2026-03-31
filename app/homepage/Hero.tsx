"use client"

import Image from "next/image"

export default function Hero() {

  const images = [
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/file_000000000e7472089d221d9e6f802c10.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/file_0000000027c871fa8239f47ebbd1a362.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/file_00000000b028720bb53fb1af3b0b3d0b.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/ChatGPT%20Image%20Mar%2015,%202026,%2007_09_53%20PM.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/ChatGPT%20Image%20Mar%2015,%202026,%2007_11_23%20PM.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/ChatGPT%20Image%20Mar%2015,%202026,%2006_46_35%20PM.png",
    "https://bdqrqumyubnyqtafzpcr.supabase.co/storage/v1/object/public/assets/ChatGPT%20Image%20Mar%2015,%202026,%2007_06_28%20PM.png",
  ]

  return (

    <section className="py-6 bg-white">

      <div className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory no-scrollbar">

        {images.map((img, index) => (

          <div
            key={index}
            className="
              snap-center 
              min-w-[70%] sm:min-w-[45%] lg:min-w-[28%] xl:min-w-[22%]
              aspect-[3/4] 
              relative 
              rounded-xl 
              overflow-hidden 
              bg-gray-100
              group
            "
          >

            <Image
              src={img}
              alt={`poster-${index}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-500"
              priority={index === 0}
            />

          </div>

        ))}

      </div>

    </section>
  )
}