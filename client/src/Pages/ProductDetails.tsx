
import { useRef, useState } from "react"
import clsx from "clsx"
import Loader from "@/components/loader"
import { Button } from "@/components/ui/button"
import { GitCompareArrows } from "lucide-react"
import ProductCard from "@/components/global/Product-card"
import ProductSidebar from "@/components/Product-Details/ProductSidebar"
import { Product } from "../lib/types"
import { div } from "framer-motion/client"


const products: Product[] = [
    {
        id: '33',
        title: 'Govee RGBIC LED Strip Lights, Smart LED Lights Work with Alexa and Google Assistant, LED Lights for Bedroom WiFi App Control Segmented DIY Multiple Colors, Color Changing Light, NOT Waterproof',
        query: "laptop",
        price: 72.99,
        rating: 4.5,
        description: 'This product is certified by Amazon to work with Alexa. This product can be controlled with your voice through Alexa-enabled devices such as Amazon Echo and Amazon Tap.',
        imageUrl: 'https://m.media-amazon.com/images/I/71N76hGMHVL._AC_UL320_.jpg',
        link: 'https://amazon.com/Govee-Assistant-Segmented-Multiple-Changing/dp/B09VBZC2CX/ref=sr_1_21?dib=eyJ2IjoiMSJ9.miyEd6PjjUkcqYeE1UgHE_81RJonQp6649g5pijebcPrnv4FAnSVcHNCYM1Fa2N97QFTvTEUlcWiAwtQzmjZFXuMmh0mr2WiJq6BhM0h4kXLe-7mN_YPtOKmiNG27lRitjaOjZt5eCdT6EOXxLwrByCE5Sjc0StQR1qhmo9AuLwTJRQ_73AKRVZPcGTO52sdV-Efhtf3ro8-Ox4Krans-Xvl4LMqGyBggts0mk4PLdomGrVM6717k_iMUxLZNxO5kKHhzdNwBUZic4BcABvnH5-0z3EdCaMfou1L3odO0do.wwMB-7Tt2dSyJOycFO0Gpyd0LI62JzcJbpA0gDK9o7A&dib_tag=se&keywords=RGB+LED+lights&qid=1738770750&sr=8-21'
      },
      {
        id: '44',
        title: 'DAYBETTER LED Strip Lights 200 ft (2 Rolls of 100 ft), Smart App Control Lighting Bedroom Rome Decor with Remote, RGB Music Sync Color Changing LED Lights for Party',
        query: "laptops",
        price: 19.99,
        rating: 4.4,
        description: 'N/A',
        imageUrl: 'https://m.media-amazon.com/images/I/8106sr1+KlL._AC_UL320_.jpg',
        link: 'https://amazon.com/DAYBETTER-Control-Changing-Bedroom-Decoration/dp/B0BXP35GZQ/ref=sr_1_16?dib=eyJ2IjoiMSJ9.miyEd6PjjUkcqYeE1UgHE_81RJonQp6649g5pijebcPrnv4FAnSVcHNCYM1Fa2N97QFTvTEUlcWiAwtQzmjZFXuMmh0mr2WiJq6BhM0h4kXLe-7mN_YPtOKmiNG27lRitjaOjZt5eCdT6EOXxLwrByCE5Sjc0StQR1qhmo9AuLwTJRQ_73AKRVZPcGTO52sdV-Efhtf3ro8-Ox4Krans-Xvl4LMqGyBggts0mk4PLdomGrVM6717k_iMUxLZNxO5kKHhzdNwBUZic4BcABvnH5-0z3EdCaMfou1L3odO0do.wwMB-7Tt2dSyJOycFO0Gpyd0LI62JzcJbpA0gDK9o7A&dib_tag=se&keywords=RGB+LED+lights&qid=1738770750&sr=8-16'
      }
]



export default function ProductDetails() {

    const [isCompareMode, setCompareMode] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState<string[]>([])

    const productsRef = useRef<HTMLDivElement | null>(null)

    const flexOrGrid = clsx({

        'flex justify-center': products.length === 0,
        
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ': products.length > 0
        
      })  

     const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
     const [loading, setLoading] = useState(false)


     const toggleCompareMode = () => {
        setCompareMode((prevValue) => !prevValue)
      }
  
      const handleSelectedProducts = (id: string) => {
  
        setSelectedProducts((prevProducts) => {
          if(prevProducts.length >= 2){
            return prevProducts.filter(p_id => p_id !== id) 
          }else{
            return [...prevProducts, id]
          }
        })
  
      }

  return (
    <div className="flex flex-col md:flex-row justify-between h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <section className="w-[45%]">
        {/* <div className="container mx-auto max-w-6xl"> */}
          <div className="flex justify-between items-center px-16 mb-12 pt-6">
        
            <h2 className="text-2xl md:text-3xl font-bold text-gray-100">Featured Products</h2>
            
            <Button
              onClick={toggleCompareMode}
              className={`${
                isCompareMode
                  ? "bg-red-500/30 hover:bg-red-600/30"
                  : "bg-gradient-to-r from-green-500/30 to-blue-500/30 hover:from-green-600/30 hover:to-blue-600/30"
              } text-white border border-white/30 sticky`}
            >
              {isCompareMode ? "Cancel Compare" : `Compare`} <GitCompareArrows />
            </Button>

          </div>
          <div className={`flex justify-between p-5`} ref={productsRef} >
            {
            loading ? 

              <Loader /> :

              (products.map((product, index) => (
                <ProductCard key={index} product = {product} index = {index} 
                isSelected = {selectedProducts.includes(product.id)}
                isCompareMode = {isCompareMode}
                setSelectedProducts = {handleSelectedProducts}
                />
            

            )))

            }
          </div>
        {/* </div> */}
      </section>
      <div className="border-l overflow-auto w-[55%]">
        <ProductSidebar  />
      </div>
    </div>
  )
}

