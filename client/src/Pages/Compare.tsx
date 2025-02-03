
// import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
// import Image from "next/image"
// import Link from "next/link"

const products = [
  {
    id: 1,
    title: "12 Pack Plastic Fidget Spinners",
    rating: 4.4,
    price: 19.99,
    description:
      "Colorful collection of 12 plastic fidget spinners. Perfect for party favors and bulk purchases. Each spinner features smooth bearings for extended spin time.",
    image: "https://i.ebayimg.com/images/g/vhwAAOSwWohnGpIy/s-l140.webp",
    material: "Plastic",
    quantity: 12,
    ageRange: "6+",
  },
  {
    id: 2,
    title: "FREELOVE Metal Fidget Spinner",
    rating: 4.5,
    price: 29.99,
    description:
      "Premium metal fidget spinner with ultra-durable construction. Features precision bearings for the longest possible spin times. Elegant gold finish.",
    image: "https://i.ebayimg.com/images/g/vhwAAOSwWohnGpIy/s-l140.webp",
    material: "Metal",
    quantity: 1,
    ageRange: "12+",
  },

]

export default function ComparePage() {
//   const searchParams = useSearchParams()
//   const productIds = searchParams.get("products")?.split(",").map(Number) || []
//   const selectedProducts = products.filter((product) => productIds.includes(product.id))

    const selectedProducts = products;



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
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-center text-gray-100 mb-8">Product Comparison</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {selectedProducts.map((product) => (
            <Card key={product.id} className="bg-gray-800/50 border-gray-700 p-6">
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                <img src={product.image || "/placeholder.svg"} alt={product.title} className="object-cover" />
              </div>
              <h2 className="text-xl font-bold text-gray-100 mb-2">{product.title}</h2>
              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="font-semibold">Price:</span> ${product.price}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> {product.rating}/5
                </p>
                <p>
                  <span className="font-semibold">Material:</span> {product.material}
                </p>
                <p>
                  <span className="font-semibold">Quantity:</span> {product.quantity}
                </p>
                <p>
                  <span className="font-semibold">Age Range:</span> {product.ageRange}
                </p>
                <p className="text-sm">{product.description}</p>
              </div>
              <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                Buy Now
              </Button>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <a href="/">
            <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
              Back to Products
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

