// import Image from "next/image"
import { ArrowBigLeftDash, ArrowBigLeftIcon, ArrowLeft, ArrowLeftIcon, ArrowLeftToLine, ArrowUpRightFromSquareIcon, LucideArrowBigLeft, LucideArrowLeft, Star, Truck } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface ProductFeature {
  feature: string
  details: string
}

interface Product {
  ProductTitle: string,
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

export function DetailCard({ product }: { product: Product }) {

  const handleBack = () => {

  }

  return (
    <div className="flex flex-col w-full overflow-hidden transition-all duration-300">

      <div className="px-6 pt-6">
        <Button variant="ghost" className="mb-4 text-white font-bold text-lg hover:bg-gray-800/80" onClick={handleBack}>
            <LucideArrowLeft className="mr-2 h-4 w-4 text-white text-lg font-bold" size={20} />
            Product Overview
        </Button>
      </div>

      <div className="flex justify-left rounded-md p-6">
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.ProductTitle} className="object-cover rounded-md" />
      </div>
      <div className="p-6">
        <h2
        className="text-2xl font-bold mb-2 text-gray-100 flex  gap-2 line-clamp-3">
          
          <ArrowUpRightFromSquareIcon size={'50'}/>
        
          <span>{product.ProductTitle}</span>
         
        </h2>
        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold text-gray-200">{product.customerReviews.overallRating.toFixed(1)}</span>
          </div>
          <span className="text-gray-400">({product.customerReviews.numReviews} reviews)</span>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-100">${product.price.currentPrice}</span>
          <span className="ml-2 text-lg text-gray-500 line-through">${product.price.listPrice}</span>
          <Badge variant="destructive" className="ml-2 bg-red-500/20 text-red-300">
            Save ${product.price.savings}
          </Badge>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2 text-gray-200">Product Features:</h3>
          <ul className="list-disc pl-5 space-y-1">
            {product.productFeatures.map((feature, index) => (
              <li key={index} className="text-sm text-gray-300">
                <span className="font-medium">{feature.feature}:</span> {feature.details}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center mb-4">
          <Truck className="w-5 h-5 mr-2 text-green-400" />
          <span className="text-sm text-gray-300">{product.shipping}</span>
        </div>
        <div className="text-sm text-gray-400">
          <span className="font-semibold">Sold by:</span> {product.sellerInfo.sellerName}
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{product.sellerInfo.sellerRating.toFixed(1)}</span>
            <span className="ml-1">({product.sellerInfo.numReviews} reviews)</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

