export default function WhatsappButton({product}:any){

const phone="917000000000"

const message = `Hello, I'm interested in this product: ${product.name}`

const link=`https://wa.me/${phone}?text=${encodeURIComponent(message)}`

return(

<a
href={link}
target="_blank"
className="block w-full text-center py-4 rounded-full font-semibold text-white bg-green-500 hover:bg-green-600 transition"
>

Buy via WhatsApp

</a>

)

}