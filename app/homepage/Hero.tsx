export default function Hero(){

return(

<section className="min-h-screen flex items-center px-6">

<div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

<div>

<h1 className="text-6xl font-black">

<span className="block">REDEFINE</span>
<span className="block text-cyan-400">YOUR STYLE</span>

</h1>

<p className="text-gray-400 mt-6">
Premium streetwear for bold personalities.
</p>

<button className="mt-8 px-8 py-4 bg-cyan-400 text-black rounded-full font-bold">
Shop Now
</button>

</div>

<div className="grid grid-cols-2 gap-4">

<img src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?w=400" className="rounded-xl"/>
<img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400" className="rounded-xl"/>
<img src="https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400" className="rounded-xl"/>
<img src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=400" className="rounded-xl"/>

</div>

</div>

</section>

)

}