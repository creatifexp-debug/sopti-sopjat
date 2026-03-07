"use client";

import { useState } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[color:var(--color-dark-bg)] text-white overflow-x-hidden">

      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] flex items-center justify-center">
              <span className="font-bold text-black">S</span>
            </div>
            <span className="font-bold text-lg tracking-widest neon-text hidden sm:block">
              SOPTI-SOPJAT
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-sm uppercase tracking-wide">
            {["Mens","Womens","Kids","Accessories"].map((item)=>(
              <a key={item} className="text-gray-300 hover:text-white transition">
                {item}
              </a>
            ))}

            <a className="px-4 py-2 rounded-full bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] text-black font-semibold shadow-lg">
              Tynrai
            </a>

            <a className="text-gray-300 hover:text-white transition">
              Contact Us
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[color:var(--color-dark-surface)] border-t border-white/5 p-4 space-y-3">
            {["Mens","Womens","Kids","Accessories","Tynrai","Contact Us"].map((item)=>(
              <div key={item} className="text-gray-300">
                {item}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Spacer */}
      <div className="pt-16" />
            {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen flex items-center px-6">

        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-30 bg-[color:var(--color-neon-purple)] animate-pulse" />
          <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20 bg-[color:var(--color-neon-cyan)] animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left Content */}
          <div className="space-y-6 text-center lg:text-left">

            <div className="inline-block px-4 py-1 rounded-full border border-[color:var(--color-neon-cyan)]/40 bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)] text-sm">
              ✨ New Collection 2026
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight">
              <span className="block text-white">REDEFINE</span>
              <span className="block neon-text">
                YOUR STYLE
              </span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl mx-auto lg:mx-0">
              Premium streetwear for bold personalities. Discover exclusive drops,
              limited editions, and timeless classics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <button className="px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] hover:scale-105 transition duration-300">
                Shop Now
              </button>
              <button className="px-8 py-4 border border-[color:var(--color-neon-cyan)] rounded-full font-bold text-[color:var(--color-neon-cyan)] hover:bg-[color:var(--color-neon-cyan)]/10 transition duration-300">
                Explore Collection
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center lg:justify-start gap-8 pt-8">
              {[
                { value: "50K+", label: "Happy Customers" },
                { value: "200+", label: "Products" },
                { value: "4.9★", label: "Rating" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <div className="text-2xl font-bold text-[color:var(--color-neon-cyan)]">
                    {item.value}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Grid */}
          <div className="grid grid-cols-2 gap-4">

            <img
              src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400"
              className="rounded-2xl object-cover h-48 sm:h-64 hover:scale-105 transition duration-500"
            />

            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"
              className="rounded-2xl object-cover h-32 sm:h-40 mt-8 hover:scale-105 transition duration-500"
            />

            <img
              src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400"
              className="rounded-2xl object-cover h-32 sm:h-40 hover:scale-105 transition duration-500"
            />

            <img
              src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400"
              className="rounded-2xl object-cover h-48 sm:h-64 hover:scale-105 transition duration-500"
            />

          </div>

        </div>
      </section>
            {/* ================= NEW DROPS ================= */}
      <section className="py-20 px-6 bg-[color:var(--color-dark-bg)]">

        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[color:var(--color-neon-magenta)]/10 text-[color:var(--color-neon-magenta)] text-sm mb-4">
              🔥 HOT RIGHT NOW
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-white">NEW </span>
              <span className="neon-text">DROPS</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Fresh arrivals just landed. Get them before they're gone.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Urban Streetwear Tee",
                price: "$49.99",
                tag: "NEW",
                color: "bg-[color:var(--color-neon-cyan)]"
              },
              {
                title: "Neon Snapback Cap",
                price: "$39.99",
                tag: "TRENDING",
                color: "bg-[color:var(--color-neon-magenta)]"
              },
              {
                title: "Cyber Graphic Hoodie",
                price: "$89.99",
                tag: "EXCLUSIVE",
                color: "bg-[color:var(--color-neon-purple)]"
              },
              {
                title: "Minimalist Black Tee",
                price: "$34.99",
                tag: "BESTSELLER",
                color: "bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)]"
              },
            ].map((product, index) => (

              <div
                key={index}
                className="relative bg-[color:var(--color-dark-card)] rounded-2xl overflow-hidden border border-white/5 hover:-translate-y-2 hover:shadow-xl hover:shadow-[color:var(--color-neon-cyan)]/20 transition duration-500"
              >

                {/* Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-black rounded-full ${product.color}`}>
                  {product.tag}
                </div>

                {/* Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400"
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white truncate">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[color:var(--color-neon-cyan)] font-bold">
                      {product.price}
                    </span>

                    <button className="w-10 h-10 rounded-full bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] text-black font-bold hover:scale-110 transition">
                      +
                    </button>
                  </div>
                </div>

              </div>

            ))}

          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-[color:var(--color-neon-cyan)] rounded-full font-semibold text-[color:var(--color-neon-cyan)] hover:bg-[color:var(--color-neon-cyan)]/10 transition duration-300">
              View All Products →
            </button>
          </div>

        </div>

      </section>
            {/* ================= FLASH SALE ================= */}
      <section className="relative py-10 overflow-hidden">

        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-neon-purple)] via-[color:var(--color-neon-magenta)] to-[color:var(--color-neon-cyan)] opacity-90" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">

            {/* Left Side */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl backdrop-blur-md">
                🎉
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  FLASH SALE - UP TO 50% OFF
                </h3>
                <p className="text-white/80">
                  Limited time offer on selected items
                </p>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-6 text-white font-bold text-xl">

              <div className="text-center">
                <div>23</div>
                <div className="text-xs text-white/70">HOURS</div>
              </div>

              <div>:</div>

              <div className="text-center">
                <div>45</div>
                <div className="text-xs text-white/70">MINS</div>
              </div>

              <div>:</div>

              <div className="text-center">
                <div>32</div>
                <div className="text-xs text-white/70">SECS</div>
              </div>

            </div>

            {/* Button */}
            <button className="px-8 py-3 bg-white rounded-full font-bold text-black hover:scale-105 transition duration-300">
              Shop Sale
            </button>

          </div>

        </div>

      </section>
            {/* ================= BRAND STORY ================= */}
      <section className="py-20 px-6 bg-[color:var(--color-dark-surface)] relative overflow-hidden">

        {/* Soft Background Glow */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-[color:var(--color-neon-cyan)] via-transparent to-[color:var(--color-neon-purple)]" />

        <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div>

            <span className="inline-block px-4 py-1 rounded-full bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)] text-sm mb-6">
              EST. 2026
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">THE </span>
              <span className="neon-text">SOPTI-SOPJAT</span>
              <span className="text-white"> STORY</span>
            </h2>

            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Born from the streets of culture and identity, SOPTI-SOPJAT blends
              tradition with modern fashion. Every piece carries meaning —
              confidence, heritage, and bold individuality.
            </p>

            <p className="text-gray-400 mb-8">
              We don't follow trends. We define them.
            </p>

            {/* Feature Points */}
            <div className="space-y-4">
              {[
                "Premium Quality Fabrics",
                "Limited Edition Drops",
                "Modern Tribal Fusion Design"
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-[color:var(--color-neon-cyan)] flex items-center justify-center text-black text-sm">
                    ✓
                  </div>
                  {feature}
                </div>
              ))}
            </div>

          </div>

          {/* Right Image Section */}
          <div className="relative">

            <div className="rounded-3xl overflow-hidden border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] flex items-center justify-center shadow-xl">
              <div className="text-center text-black font-bold">
                <div className="text-3xl">10+</div>
                <div className="text-xs">YEARS</div>
              </div>
            </div>

          </div>

        </div>
      </section>
            {/* ================= FEATURED CATEGORIES ================= */}
      <section className="py-20 px-6 bg-[color:var(--color-dark-bg)]">

        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-[color:var(--color-neon-purple)]/10 text-[color:var(--color-neon-purple)] text-sm mb-4">
              EXPLORE
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="text-white">SHOP BY </span>
              <span className="neon-text">CATEGORY</span>
            </h2>

            <p className="text-gray-400 mt-4">
              Find exactly what you're looking for
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

            {[
              { name: "Hoodies", img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
              { name: "Caps", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" },
              { name: "Jerseys", img: "https://images.unsplash.com/photo-1580087256394-dc596e1c8f4f?w=400" },
              { name: "T-Shirts", img: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400" },
              { name: "Accessories", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400" },
              { name: "Socks", img: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=400" },
            ].map((cat) => (

              <div
                key={cat.name}
                className="relative group rounded-2xl overflow-hidden border border-white/5 aspect-square cursor-pointer"
              >
                <img
                  src={cat.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">
                    {cat.name}
                  </h3>
                  <span className="text-sm text-[color:var(--color-neon-cyan)] opacity-0 group-hover:opacity-100 transition">
                    Shop Now →
                  </span>
                </div>
              </div>

            ))}

            {/* Jackets (Large Card) */}
            <div className="relative group rounded-2xl overflow-hidden border border-white/5 col-span-2 lg:col-span-2 aspect-[2/1] cursor-pointer">

              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white flex items-center justify-between w-full pr-6">
                <div>
                  <h3 className="text-2xl font-bold">
                    Jackets
                  </h3>
                  <p className="text-gray-400 text-sm">
                    22 Products
                  </p>
                </div>

                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] flex items-center justify-center text-black opacity-0 group-hover:opacity-100 transition">
                  →
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
            {/* ================= NEWSLETTER ================= */}
      <section className="py-20 px-6 bg-[color:var(--color-dark-surface)] relative overflow-hidden">

        {/* Soft Neon Glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[color:var(--color-neon-purple)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[color:var(--color-neon-cyan)]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">

          <span className="inline-block px-4 py-2 rounded-full bg-[color:var(--color-neon-cyan)]/10 text-[color:var(--color-neon-cyan)] text-sm mb-6">
            Newsletter
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">JOIN THE </span>
            <span className="neon-text">MOVEMENT</span>
          </h2>

          <p className="text-gray-400 mb-8">
            Subscribe to get exclusive drops, special offers, and insider content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-[color:var(--color-dark-card)] border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-[color:var(--color-neon-cyan)]"
            />

            <button className="px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-[color:var(--color-neon-cyan)] to-[color:var(--color-neon-purple)] hover:scale-105 transition duration-300">
              Subscribe
            </button>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            No spam. Unsubscribe anytime.
          </p>

        </div>

      </section>
            {/* ================= FOOTER ================= */}
      <footer className="bg-[color:var(--color-dark-bg)] border-t border-white/5 py-12 px-6">

        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold neon-text mb-4">
              SOPTI-SOPJAT
            </h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Premium streetwear blending culture and modern fashion.
            </p>

            <div className="flex space-x-4 text-gray-400">
              <span className="hover:text-[color:var(--color-neon-cyan)] cursor-pointer">Instagram</span>
              <span className="hover:text-[color:var(--color-neon-magenta)] cursor-pointer">Facebook</span>
              <span className="hover:text-[color:var(--color-neon-purple)] cursor-pointer">YouTube</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-bold mb-4 text-white">SHOP</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mens</li>
              <li>Womens</li>
              <li>Kids</li>
              <li>Accessories</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-4 text-white">HELP</h4>
            <ul className="space-y-2 text-gray-400">
              <li>FAQs</li>
              <li>Shipping</li>
              <li>Returns</li>
              <li>Contact</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="text-center text-gray-500 text-sm mt-10 border-t border-white/5 pt-6">
          © 2026 SOPTI-SOPJAT. All rights reserved.
        </div>

      </footer>

    </main>
  );
}