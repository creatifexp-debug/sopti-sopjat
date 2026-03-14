export default function About() {

  return (

    <section className="py-28 px-6 bg-zinc-950">

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* Image */}

        <div className="relative h-[420px] rounded-2xl overflow-hidden">

          <img
            src="https://images.unsplash.com/photo-1520975954732-35dd22a6c7df?w=1200"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30"/>

        </div>



        {/* Content */}

        <div>

          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Our Story
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">

            SOPTI SOPJAT is more than a clothing brand.  
            It represents identity, culture, and self-expression.

          </p>

          <p className="text-gray-400 mt-4 leading-relaxed">

            Inspired by street culture and rooted in heritage, every piece
            we design carries meaning. From everyday essentials to bold
            statement pieces, our goal is simple — help you wear your identity.

          </p>



          {/* Stats */}

          <div className="grid grid-cols-3 gap-6 mt-10">

            <div>
              <h3 className="text-3xl font-bold text-cyan-400">
                100+
              </h3>
              <p className="text-gray-500 text-sm">
                Products
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-400">
                5k+
              </h3>
              <p className="text-gray-500 text-sm">
                Customers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-cyan-400">
                24/7
              </h3>
              <p className="text-gray-500 text-sm">
                Support
              </p>
            </div>

          </div>



          {/* Button */}

          <button className="mt-10 px-8 py-3 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition">

            Learn More

          </button>

        </div>

      </div>

    </section>

  )

}