import Navbar from "./homepage/Navbar"
import Hero from "./homepage/Hero"
import NewDrops from "./homepage/NewDrops"
import Categories from "./homepage/Categories"
import BrandStory from "./homepage/BrandStory"
import ClearanceSale from "./homepage/ClearanceSale"
import Footer from "./homepage/Footer"

export default function Home(){

return(

<main className="bg-black text-white">

<Navbar/>

<div className="pt-16"/>

<Hero/>

<NewDrops/>

<Categories/>

<BrandStory/>

<ClearanceSale/>

<Footer/>

</main>

)

}