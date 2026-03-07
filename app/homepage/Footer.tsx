export default function Footer(){

return(

<footer className="bg-black border-t border-zinc-800 py-16 px-6">

<div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">

<div className="col-span-2">

<h3 className="text-2xl font-bold text-white">
SOPTI-SOPJAT
</h3>

<p className="text-gray-400 mt-4 max-w-sm">
Premium streetwear brand combining heritage,
culture and modern urban fashion.
</p>

<div className="flex gap-6 mt-6 text-gray-400">

<span className="hover:text-white cursor-pointer">
Instagram
</span>

<span className="hover:text-white cursor-pointer">
Facebook
</span>

<span className="hover:text-white cursor-pointer">
YouTube
</span>

</div>

</div>

<div>

<h4 className="text-white font-semibold mb-4">
Shop
</h4>

<ul className="space-y-2 text-gray-400">

<li>Caps</li>
<li>Hoodies</li>
<li>T-Shirts</li>
<li>Accessories</li>

</ul>

</div>

<div>

<h4 className="text-white font-semibold mb-4">
Support
</h4>

<ul className="space-y-2 text-gray-400">

<li>Shipping</li>
<li>Returns</li>
<li>FAQs</li>
<li>Contact</li>

</ul>

</div>

</div>

<div className="text-center text-gray-500 text-sm mt-12 border-t border-zinc-800 pt-6">

© 2026 SOPTI-SOPJAT. All rights reserved.

</div>

</footer>

)

}