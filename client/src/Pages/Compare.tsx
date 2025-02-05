
// import { useSearchParams } from "next/navigation"
import { DetailCard } from "@/components/comparisonPage/Detail-Card";
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react";
// import Image from "next/image"
// import Link from "next/link"
export default function ComparePage() {
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

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])


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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      {
        selectedProducts.map((product) => (
          <DetailCard product={product}/>
        ))
      }
    </div>
  )
}

