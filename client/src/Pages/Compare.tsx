// import Image from "next/image"
//@ts-nocheck
import { ArrowRight, Star } from "lucide-react"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Loader from "@/components/loader"

interface Product {
  name: string
  image: string
  price: string
  description: string
}

interface FeatureComparison {
  name: string
  description1: string
  description2: string
}

const product1: Product = {
  name: "Premium Smartwatch",
  image: "/placeholder.svg?height=400&width=400",
  price: "$299.99",
  description: "Advanced smartwatch with comprehensive health tracking and extended battery life.",
}

const product2: Product = {
  name: "Fitness Tracker Pro",
  image: "/placeholder.svg?height=400&width=400",
  price: "$149.99",
  description: "Lightweight fitness tracker focusing on essential health features and long-lasting battery.",
}

const featureComparisons: FeatureComparison[] = [
  {
    name: "Health Monitoring",
    description1:
      "Comprehensive health suite including ECG, blood oxygen monitoring, and stress tracking. Provides detailed insights and personalized recommendations.",
    description2:
      "Basic health tracking with step counting and heart rate monitoring. Offers general activity insights and daily goals.",
  },
  {
    name: "Battery Life",
    description1:
      "Up to 5 days of battery life with typical use. Fast charging capability provides a full day's charge in just 30 minutes.",
    description2:
      "Extended 7-day battery life. Low power consumption allows for longer use between charges, ideal for extended trips.",
  },
  {
    name: "Display",
    description1:
      '1.4" AMOLED display with always-on capability. Vibrant colors and high contrast ratio for excellent visibility in all lighting conditions.',
    description2:
      '0.95" OLED display. Energy-efficient screen that provides clear visibility of essential information at a glance.',
  },
  {
    name: "Water Resistance",
    description1:
      "5 ATM water resistance. Suitable for swimming and water sports, can withstand depths up to 50 meters.",
    description2:
      "IP67 water resistance. Protected against splashes and brief immersion, suitable for rain and hand washing.",
  },
]

export default function ModernProductComparison() {

  const { compareProducts } = useSelector(state => state.product)

  const [compareCards, setCompareCards] = useState([])
  const [product1Features, setProduct1Features] = useState([])
  const [product2Features, setProduct2Features] = useState([])

  const [AIRecommendations, setAIRecommendations] = useState({})

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
  
      console.log("The compare products: ", compareProducts)

      if(data){
        setCompareCards([data.compareProduct1, data.compareProduct2 ])
        
        const { AIResponse } = data

        const { product1, product2 } = AIResponse


        setProduct1Features(product1.features)
        setProduct2Features(product2.features)

        
  
        console.log("The AI data: ", data)
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



  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl text-center mb-12
        font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 text-transparent bg-clip-text
        ">
          Product Comparison
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16">
          <ProductCard product={compareCards[0]} />
          <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground" />
          <ProductCard product={compareCards[1]} />
        </div>

        <div className="space-y-8">
          {isLoading ?
          <Loader /> :
          product1Features?.map((feature, index) => {
          const feature2 = product2Features[index]
          return(
          <FeatureComparisonCard key={index} 
            product1 = {AIRecommendations.product1}
            product2 = {AIRecommendations.product2}
            product1Title = { compareProducts[0].title } 
            product2Title = { compareProducts[1].title }
            feature1={feature} 
            feature2={feature2}
            
            isReversed={index % 2 !== 0} />

          )})
          
          }
          {/* {!isLoading &&
            <Card>
            <CardContent className="relative
            bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden
            p-6">
              
              <h3 className="text-2xl font-semibold mb-4 text-center">{`AI Recommendations`}</h3>
              <div className={`flex flex-col ${5 % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} gap-6`}>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                    <Star className="text-yellow-400" fill/>
                    {AIRecommendations?.product1?.ai_rating}
                    </h4>
                  <p className="text-muted-foreground">{AIRecommendations?.product1?.ai_recommendation}</p>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                   
                    <Star className="text-yellow-400" fill/>
                    {AIRecommendations?.product2?.ai_rating}
                  
                  </h4>
                  <p className="text-muted-foreground">{AIRecommendations?.product2?.ai_recommendation}</p>
                </div>
              </div>
            </CardContent>
          </Card>} */}
        </div>
      </div>


    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="text-center h-fit flex flex-col items-center">
      <img
        src={product?.imageUrl || "/placeholder.svg"}
        alt={product?.title}
        width={200}
        height={200}
        className="mx-auto mb-4 rounded-full shadow-lg"
      />
      <h2 className="text-2xl font-semibold mb-2 w-[300px]">{product?.title}</h2>
      <p className="text-xl font-bold mb-4">{product?.price}</p>
      <p className="text-muted-foreground mb-4 w-[200px]">{product?.description}</p>
      <Button
      variant={"custom"}
      >
        Learn More
      </Button>
    </div>
  )
}

function FeatureComparisonCard({ feature, isReversed, 
  product1Title, 
  product2Title, 
  product1,
  product2,
  feature1,
  feature2
}) {
  return (
    <Card>
      <CardContent className="
      bg-gray-900/40 backdrop-blur-xl rounded-xl border border-gray-800/50 overflow-hidden
      p-6">
        <h3 className="text-2xl font-semibold mb-4 text-center">{feature1?.feature}</h3>
        <div className={`flex flex-col ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} gap-6`}>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">{product1Title}</h4>
            <p className="text-muted-foreground">{feature1?.details}</p>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2">{product2Title}</h4>
            <p className="text-muted-foreground">{feature2?.details}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

