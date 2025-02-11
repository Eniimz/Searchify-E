//@ts-nocheck
// import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowUpRightFromSquare, Star } from "lucide-react"

// interface ProductCardProps {
//   name: string
//   price: string
//   image: string
//   rating: number
//   description: string
// }





export function CompareCard({ product }) {
  return (
    <div className="flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden h-[500px] w-md">
      <div className="relative h-64 w-full flex justify-center">
        <img src={product?.imageUrl || "/placeholder.svg"} alt={product?.title} className="object-contain w-full" />
      </div>
      <div className="flex flex-col space-y-1.5 p-6 text-white">
        <h3 className="text-2xl font-semibold">{product?.title}</h3>
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">{product?.price}</span>
          <div className="flex items-center text-lg">
            {/* {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))} */}
            <Star className="text-yellow-300" /> {product?.rating}
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{product?.description}</p>
      </div>
      <div className="mt-auto p-6 pt-0">
        <Button className="w-full flex ">More Details <ArrowUpRightFromSquare /> </Button>
      </div>

    </div>
  )
}

