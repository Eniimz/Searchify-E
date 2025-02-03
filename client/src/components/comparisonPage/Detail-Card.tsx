// import Image from "next/image"
import { Star, Truck } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

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

export function DetailCard({ product }: { product: Product }) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="relative aspect-square">
        <img src={product.imageUrl || "/placeholder.svg"} alt={product.ProductTitle} className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-100">{product.ProductTitle}</h2>
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
      </CardContent>
      <CardFooter className="bg-gray-800/80 p-6">
        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

