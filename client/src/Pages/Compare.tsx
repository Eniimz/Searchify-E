//@ts-nocheck
// import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { CompareCard } from "@/components/comparisonPage/CompareCard"
import { div, p } from "framer-motion/client"
import { CompareFeatures } from "@/components/comparisonPage/CompareFeatures"
import { useSelector } from "react-redux"
import axios from 'axios'
import { ProductCardSkeleton } from "@/components/ui/product-card-skeleton"
import Loader from "@/components/loader"

export default function Compare() {
//   const searchParams = useSearchParams()
//   const productIds = searchParams.get("products")?.split(",").map(Number) || []
//   const selectedProducts = products.filter((product) => productIds.includes(product.id))

interface ProductFeature {
  feature: string
  details: string
}

interface Product {
  ProductTitle: string
  price: {
    listPrice: string
    currentPrice: string
    savings: string
  }
  sellerInfo: {
    sellerName: string
    sellerRating: number
    numReviews: number
  }
  customerReviews: {
    overallRating: number
    numReviews: number
  }
  productFeatures: ProductFeature[]
  shipping: string
  imageUrl?: string
}

const product1 = {
  name: "Premium Wireless Headphones",
  price: "$299.99",
  image: "/placeholder.svg?height=256&width=256",
  rating: 4,
  description: "High-quality sound with noise cancellation technology.",
  features: [
    {
      name: "Active Noise Cancellation",
      description:
        "Advanced ANC technology that adapts to your environment, blocking out unwanted noise for an immersive listening experience.",
    },
    {
      name: "40mm Dynamic Drivers",
      description:
        "Large, powerful drivers deliver rich, detailed sound across all frequencies, from deep bass to crisp highs.",
    },
    {
      name: "30-hour Battery Life",
      description:
        "Long-lasting battery provides up to 30 hours of playtime on a single charge, perfect for extended use and travel.",
    },
    {
      name: "Bluetooth 5.0",
      description:
        "Latest Bluetooth technology ensures stable, high-quality wireless connection with improved range and lower power consumption.",
    },
    {
      name: "Touch Controls",
      description:
        "Intuitive touch-sensitive controls on the earcup for easy management of music, calls, and voice assistant.",
    },
  ],
}

const product2 = {
  name: "Ultra-Light Running Shoes",
  price: "$129.99",
  image: "/placeholder.svg?height=256&width=256",
  rating: 5,
  description: "Engineered for speed and comfort during long runs.",
  features: [
    {
      name: "Breathable Mesh Upper",
      description:
        "Lightweight, breathable mesh material keeps your feet cool and dry during intense workouts or long-distance runs.",
    },
    {
      name: "Responsive Foam Midsole",
      description:
        "Proprietary foam technology provides excellent energy return and cushioning, reducing fatigue and enhancing performance.",
    },
    {
      name: "Durable Rubber Outsole",
      description:
        "High-traction rubber outsole offers excellent grip on various surfaces and enhanced durability for long-lasting wear.",
    },
    {
      name: "Reflective Details",
      description:
        "Strategically placed reflective elements improve visibility during low-light conditions for safer running.",
    },
    {
      name: "6.5 oz Weight",
      description:
        "Ultra-lightweight design at just 6.5 oz per shoe, reducing fatigue and allowing for faster, more efficient movement.",
    },
  ],
}

const { compareProducts } = useSelector(state => state.product)

const [compareCards, setCompareCards] = useState([])
const [productsInfo, setProductsInfo] = useState([])
const [isLoading, setIsLoading] = useState(false)

const getProductCards = async () => {

  setIsLoading(true)

  try{
    const res = await axios.post(`http://localhost:3000/api/products/compare`,
      compareProducts
      )

    const data = res.data
    
    console.log("The res received: ", data)

    setIsLoading(false)

    if(data){
      setCompareCards([data.compareProduct1, data.compareProduct2 ])

      const { product1, product2 } = data.AIResponse

      console.log("The product1: ", product1)
      console.log("The product2: ", product2)

      console.log("Both in array: ", [product1, product2 ])

      setProductsInfo([product1, product2])
    }



  }catch(err){
    setIsLoading(false)
    console.error("Err fetching compare products: ", err)
  }

}



  useEffect(() => {
    console.log("The compare products: ", compareProducts)
    getProductCards()
  }, [])


  const selectedProducts = [product1, product2]

  if (selectedProducts.length !== 2) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <Card className="p-8 bg-gray-800/50 border-gray-700">
          <h1 className="text-2xl font-bold text-gray-100 mb-4">Invalid Comparison</h1>
          <p className="text-gray-300 mb-6">Please select two products to compare.</p>
          <a href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Return to Products
            </Button>
          </a>
        </Card>
      </div>
    )
  }

  return (

    <div className="
    min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-8 ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">Product Comparison</h1>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-8">
            {isLoading  ?
            <div className="flex justify-center">
              <ProductCardSkeleton />
            </div>

            : 
            <div className="flex justify-center">
              <CompareCard product={compareCards[0]}/>
            </div>

            }
            <div>
              <h4 className="text-xl font-semibold mb-4">Features</h4>
              {isLoading ?
              
              <Loader />

              : <CompareFeatures features={productsInfo[0]?.features} />}
            </div>
          </div>  
          <div className="space-y-8">
          {isLoading  ?
            <div className="flex justify-center ">
              <ProductCardSkeleton />
            </div>

            : 
            <div className="flex justify-center">
              <CompareCard product={compareCards[1]} />
            </div>

            }
          <div>
              <h4 className="text-xl font-semibold mb-4">Features</h4>
              {isLoading  ?
              <Loader />
              :  <CompareFeatures features={ productsInfo[1]?.features} />}
            </div>
          </div>
        </div>
      </div>
      
    </div>

  )
}

